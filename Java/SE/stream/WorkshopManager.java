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
import ir.tamin.insurance.technical.business.service.InsuranceAgreementRequestService;
import ir.tamin.insurance.technical.business.user.UserManager;
import ir.tamin.insurance.technical.model.user.OrgUser;
import ir.tamin.insurance.technical.model.workshop.Workshop;

import javax.ejb.Stateless;
import javax.inject.Inject;
import java.lang.reflect.InvocationTargetException;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.logging.Level;
import java.util.logging.Logger;
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

    @Inject
    private InsuranceAgreementRequestService insuranceAgreementRequestService;

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
            List<Workshop> result = new ArrayList<>();
            Map<String, Object> response = new HashMap<>();
            List<ArrayList<String>> workshopList;
            Filter workshopIdFilter = returnFilterByProperty(fw, "workshopId");
            String workshopId = workshopIdFilter != null ? workshopIdFilter.getValue() : null;
            Filter nationalCodeFilter = returnFilterByProperty(fw, "nationalCode");
            int resultCount;

            try {
                response = insuranceAgreementRequestService.getAllWorkshopInfo(nationalCodeFilter.getValue());
            } catch (Exception ex) {
                Logger.getLogger(WorkshopManager.class.getName()).log(Level.SEVERE, null, ex);
            }

            fw.removeFilter("operation", Filter.Operator._EQUAL);
            fw.removeFilter("nationalCode", Filter.Operator._EQUAL);

            if (response != null && response.size() != 0) {
                workshopList = (List<ArrayList<String>>) response.get("list");
                for (ArrayList<String> workshop : workshopList) {
                    Workshop rcrd = new Workshop();
                    rcrd.setWorkshopId(workshop.get(0));
                    rcrd.setBranchCode(workshop.get(2));
                    rcrd.setWorkshopName(workshop.get(1));
                    result.add(rcrd);
                }
                fw.addFilter("workshopId", Filter.Operator.EQUAL, workshopList.stream().map(t -> t.get(0)).collect(Collectors.joining( "," )));
            }
            if (fw != null) {
                FilterWrapper filters = new FilterWrapper();
                filters.setFilters(fw.getFilters());
                result = ((ArrayList<Workshop>)super.search(clazz, fw, sw, start, limit, includeCount).getList()).stream().filter(item -> {
                    boolean equals = true;
                    for (Filter filter : filters.getFilters()) {
                        switch (filter.getProperty()) {
                            case "subCode":
                                equals = filter.getValue().equals(item.getWorkshopId().substring(3, 6));
                                break;
                            default:
                                if (workshopId != null && workshopId.equals(item.getWorkshopId())) {
                                    equals = true;
                                }
                            /*case "activity.activityCode":
                                if (item.getActivity() != null) {
                                    equals = filter.getValue().equals(item.getActivity().getActivityCode());
                                } else {
                                    equals = false;
                                }
                                break;
                            default:
                                filter.setProperty(filter.getProperty().substring(0, 1).toUpperCase() + filter.getProperty().substring(1));
                                try {
                                    Object value = item.getClass().getMethod("get" +
                                            filter.getProperty()).invoke(item);
                                    if (value != null) {
                                        equals = value.toString().matches(".*" + filter.getValue() + ".*");
                                    } else {
                                        equals = false;
                                    }
                                } catch (Exception e) {
                                    return false;
                                }*/
                        }
                        if (!equals) {
                            return false;
                        }
                    }
                    return true;
                }).collect(Collectors.toList());
            }
            resultCount = result.size();
            result = result.subList(start, Math.min(start + limit, result.size()));
            return new CollectionData(result, resultCount);
        }
        return super.search(clazz, fw, sw, start, limit, includeCount); //To change body of generated methods, choose Tools | Templates.}
    }

    private Filter returnFilterByProperty(FilterWrapper fw, String property) {
        if (fw != null && fw.getFilters() != null && fw.getFilters().size() > 0) {
            for (Filter filter: fw.getFilters()) {
                if (filter.getProperty().toUpperCase().contains(property.toUpperCase())) {
                    return filter;
                }
            }
        }
        return null;
    }
}
