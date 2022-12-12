/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package ir.tamin.insurance.technical.business.workshop;

import ir.tamin.framework.cdi.event.ProxyMethod;
import ir.tamin.framework.domain.CollectionData;
import ir.tamin.framework.domain.proxy.ProxyProcessingException;
import ir.tamin.framework.ws.rest.json.Filter;
import ir.tamin.framework.ws.rest.json.FilterWrapper;
import ir.tamin.framework.ws.rest.json.SortWrapper;
import ir.tamin.framework.ws.rest.proxy.AbstractEntityProxy;
import ir.tamin.framework.ws.rest.proxy.EntityProxy;
import ir.tamin.framework.ws.rest.security.TokenContext;
import ir.tamin.insurance.technical.business.user.UserManager;
import ir.tamin.insurance.technical.model.user.OrgUser;
import ir.tamin.insurance.technical.model.workshop.Workshop;

import javax.ejb.Stateless;
import javax.inject.Inject;
import java.lang.reflect.InvocationTargetException;
import java.util.List;
import java.util.stream.Collectors;

/**
 *
 * @author s_naghavi
 */
@Stateless
public class WorkshopManager extends AbstractEntityProxy implements EntityProxy {

    @Inject
    private TokenContext tokenContext;

    @Inject
    private UserManager um;

    @Override
    @ProxyMethod
    public CollectionData search(Class clazz, FilterWrapper fw, SortWrapper sw, Integer start, Integer limit, boolean includeCount) throws ProxyProcessingException {
        String operation = "";
        String agreementCategoryId = "";
        Filter operationFilter = returnFilterByProperty(fw, "operation");
        Filter agreementCategoryIdFilter = returnFilterByProperty(fw, "agreementCategoryId");

        OrgUser curentUser = um.getUserByName(tokenContext.getCurrentUser().getUsername());
        String org = curentUser.getOrganization().getCode();
        
        if (operationFilter != null) {
            operation = operationFilter.getValue();
        }
        if (agreementCategoryIdFilter != null) {
            agreementCategoryId = agreementCategoryIdFilter.getValue();
        }
        if (operation.equals("1")) {
            List<Workshop> result = entityManager.createNamedQuery("Workshop.AllowedWorkshop")
                    .setParameter("agreementCategoryId", agreementCategoryId)
                    .getResultList();
            return new CollectionData(result, result != null ? result.size() : 0);
        }
        if (operation.equals("2")) {
            if (org != null && fw != null) {
                if (!org.equals("0000")) {
                    fw.addFilter("branchCode", Filter.Operator.EQUAL, org);
                }
            }
            if (org != null && fw == null) {
                if (!org.equals("0000")) {
                    FilterWrapper filterWrapper = FilterWrapper.createWrapperWithFilter("branchCode", Filter.Operator.EQUAL, org);
                    fw = filterWrapper;
                }
            }
            fw.removeFilter("operation", Filter.Operator._EQUAL);
        }
        if (operation.equals("3")) {
            List<Workshop> result = null;
            int resultCount;
            Filter subCodeFilter = returnFilterByProperty(fw, "subCode");
            Filter branchCodeFilter = returnFilterByProperty(fw, "branchCode");

            if (subCodeFilter != null && subCodeFilter.getValue().length() == 3 && branchCodeFilter != null) {
                result = entityManager.createNamedQuery("Workshop.AllowedWorkshopBySubCode")
                        .setParameter("workshopSubCode", subCodeFilter.getValue())
                        .setParameter("branchCode", branchCodeFilter.getValue())
                        .getResultList();

                /*result = entityManager.createNamedQuery("Workshop.AllowedWorkshopBySubCode")
                        .setParameter("workshopSubCode", subCodeFilter.getValue())
                        .setParameter("branchCode",branchCodeFilter.getValue())
                        .setFirstResult(start)
                        .setMaxResults(limit)
                        .getResultList();*/

                fw.removeFilter("operation", Filter.Operator._EQUAL);
                fw.removeFilter("subCode", Filter.Operator._EQUAL);
                fw.removeFilter("branchCode", Filter.Operator._EQUAL);

                if (fw != null) {
                    FilterWrapper filters = new FilterWrapper();
                    filters.setFilters(fw.getFilters());
                    result = result.stream().filter(item -> {
                        boolean equals = true;
                        for (Filter filter : filters.getFilters()) {
                            filter.setProperty(filter.getProperty().substring(0, 1).toUpperCase() + filter.getProperty().substring(1));
                            try {
                                equals = item.getClass().getMethod("get" + filter.getProperty()).invoke(item).toString().matches(".*" + filter.getValue() + ".*");
                            } catch (NoSuchMethodException e) {
                                e.printStackTrace();
                            } catch (IllegalAccessException e) {
                                e.printStackTrace();
                            } catch (InvocationTargetException e) {
                                e.printStackTrace();
                            }
                            if (!equals) {
                                return false;
                            }
                        }
                        return true;
                    }).collect(Collectors.toList());
                }
            }
            resultCount = result.size();
            result = result.subList(start, Math.min(start + limit, result.size()));
            return new CollectionData(result, resultCount);
        }

        return super.search(clazz, fw, sw, start, limit, includeCount); //To change body of generated methods, choose Tools | Templates.}
    }

    private Filter returnFilterByProperty(FilterWrapper fw, String property) {
        if (fw != null && fw.getFilters() != null && fw.getFilters().size() > 0) {
            for (Filter filter
                    : fw.getFilters()) {
                if (filter.getProperty().toUpperCase().contains(property.toUpperCase())) {
                    return filter;
                }
            }
        }
        return null;
    }
}
