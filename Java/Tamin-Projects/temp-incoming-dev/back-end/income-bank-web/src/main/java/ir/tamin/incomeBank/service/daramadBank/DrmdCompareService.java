/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package ir.tamin.incomeBank.service.daramadBank;

import ir.tamin.incomeBank.model.daramadBank.DrmdCompare;
import ir.tamin.incomeBank.model.daramadBank.DrmdComparePK;
import ir.tamin.incomeBank.service.identityManager.UserBean;
import ir.tamin.incomeBank.service.jdbc.StoredProcedure;
import ir.tamin.framework.cdi.util.MessageBundle;
import ir.tamin.framework.core.util.Bundle;
import ir.tamin.incomeBank.util.ServiceUtils;
import ir.tamin.framework.ws.rest.json.Filter;
import ir.tamin.framework.ws.rest.json.FilterWrapper;
import ir.tamin.framework.ws.rest.json.Sort;
import ir.tamin.framework.ws.rest.json.SortWrapper;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.logging.Level;
import java.util.logging.Logger;
import javax.ejb.Stateless;
import javax.inject.Inject;
import javax.persistence.EntityManager;
import javax.persistence.TypedQuery;
import javax.persistence.criteria.CriteriaBuilder;
import javax.persistence.criteria.CriteriaQuery;
import javax.persistence.criteria.Order;
import javax.persistence.criteria.Predicate;
import javax.persistence.criteria.Root;
import javax.persistence.metamodel.EntityType;
import javax.persistence.metamodel.Metamodel;
import javax.ws.rs.WebApplicationException;
import javax.ws.rs.core.Response;

/**
 *
 * @author m_salami
 */
@Stateless
public class DrmdCompareService {

    @Inject
    private EntityManager em;
    @Inject
    UserBean userBean;
    @Inject
    ServiceUtils serviceUtils;
    @Inject
    private StoredProcedure procedure;
    @Inject
    @MessageBundle
    Bundle messageBundle;

    public Map<String, Object> getAll(FilterWrapper filter, Integer start, Integer limit, SortWrapper sort) {

        Map<String, Object> map = new HashMap<>();
        map.put("list", getList(filter, start, limit, sort));
        map.put("total", getCount(filter));
        return map;
    }

    public List<DrmdCompare> getList(FilterWrapper filterWrapper, Integer start, Integer limit, SortWrapper sort) {

        TypedQuery createQuery = em.createQuery(getQuery(filterWrapper, sort));

        List<DrmdCompare> bankList = new ArrayList<>();
        if (start != null && limit != null) {
            bankList = createQuery.setFirstResult(start).setMaxResults(limit).getResultList();
        }
        if (start == null && limit != null) {
            bankList = createQuery.setMaxResults(limit).getResultList();
        }
        if (start != null && limit == null) {
            bankList = createQuery.setFirstResult(start).getResultList();
        }
        if (start == null && limit == null) {
            bankList = createQuery.getResultList();
        }
        for (DrmdCompare item : bankList) {
            item.setCreateDate(serviceUtils.decodeDateForDB(item.getCreatedt()));
            item.setDecodeVouchDate(serviceUtils.decodeDateForDB(item.getVouchDate()));
        }
        return bankList;
    }

    public Integer getCount(FilterWrapper filter) {
        Integer qcount = 0;
        TypedQuery createQuery = em.createQuery(getQuery(filter, null));
        qcount = createQuery.getResultList().size();
        return qcount;
    }

    private CriteriaQuery getQuery(FilterWrapper filterWrapper, SortWrapper sortWrapper) {
        try {
            CriteriaBuilder criteriaBuilder = em.getCriteriaBuilder();
            CriteriaQuery criteriaQuery = criteriaBuilder.createQuery();
            Root<DrmdCompare> drmdCompareFrom = criteriaQuery.from(DrmdCompare.class);
            List<Predicate> predicates = new ArrayList<Predicate>();
            Metamodel metamodel = em.getMetamodel();
            EntityType<DrmdCompare> drmdCompareEntityType = metamodel.entity(DrmdCompare.class);
            if (filterWrapper != null && filterWrapper.getFilters() != null) {
                for (Filter filter : filterWrapper.getFilters()) {

                    Object value = filter.getValue();
                    String field = filter.getProperty();
                    Filter.Operator operator = filter.getOperator();
                    String[] f = field.split("\\.");

                    Predicate predicate = null;
                    switch (operator) {

                        case EQUAL:
                            javax.persistence.criteria.Path path = drmdCompareFrom.get(f[0]);
                            for (int j = 1; j < f.length; j++) {
                                path = path.get(f[j]);
                            }
                            predicate = criteriaBuilder.equal(path, value);
                            predicates.add(predicate);
                            break;
                        case LIKE:

                            predicates.add(criteriaBuilder.like(drmdCompareFrom.get(drmdCompareEntityType.getDeclaredSingularAttribute(field, String.class)), "%" + value + "%"));

                            break;
                        default:
                            break;
                    }
                }
                criteriaQuery.where(predicates.toArray(new Predicate[]{}));
            }

            if (sortWrapper != null) {
                List<Order> orders = new ArrayList<>();
                for (Sort sortSet : sortWrapper.getSortSet()) {
                    Order order = null;
                    String[] sortProperties = sortSet.getProperty().split("\\.");

                    javax.persistence.criteria.Path path = drmdCompareFrom.get(sortProperties[0]);
                    for (int j = 1; j < sortProperties.length; j++) {
                        path = path.get(sortProperties[j]);
                    }
                    if (sortProperties.length > 0) {
                        if (sortSet.getDirection().getName().equals(Sort.Direction.DESC.getName())) {
                            order = criteriaBuilder.desc(drmdCompareFrom.get(sortProperties[0]));
                        } else {
                            order = criteriaBuilder.asc(drmdCompareFrom.get(sortProperties[0]));
                        }
                    }
                    orders.add(order);
                }

                if (!orders.isEmpty()) {
                    criteriaQuery.orderBy(orders);
                }
            }

            criteriaQuery.select(drmdCompareFrom);
            return criteriaQuery;

        } catch (Exception e) {
            return null;
        }
    }

    public boolean isIssued(String brchCode, String yearMon) {
        FilterWrapper fw = ServiceUtils.createOrAddToFilterWrapper(null, "drmdComparePK.compMdate", yearMon, Filter.Operator.EQUAL);
        fw = ServiceUtils.createOrAddToFilterWrapper(fw, "drmdComparePK.brchCode", brchCode, Filter.Operator.EQUAL);
        fw = ServiceUtils.createOrAddToFilterWrapper(fw, "vouchFlag", "1", Filter.Operator.EQUAL);
        SortWrapper sw = ServiceUtils.createOrAddToSortWrapper(null, null, null);
        List<DrmdCompare> list = getList(fw, 0, 1, sw);
        if (!list.isEmpty()) {
            return true;
        }
        return false;
    }

    public String update(DrmdComparePK drmdComparePK) {

        DrmdCompare drmdCompare = get(drmdComparePK);
        drmdCompare.setVouchDate(null);
        drmdCompare.setVouchFlag(null);
        drmdCompare.setVouchUid(null);

        try {

            em.merge(drmdCompare);
            String saveMessage = "برگشت سند با موفقیت انجام شد";
            return saveMessage;
        } catch (Exception ex) {
            Logger.getLogger(DrmdCompare.class
                    .getName()).log(Level.SEVERE, null, ex);
            Response response = Response.status(Response.Status.NOT_ACCEPTABLE).entity(messageBundle.getProperty("coreAccount.common.EXC_UNKNOWN_ERROR")).build();

            throw new WebApplicationException(response);
        }
    }

    public DrmdCompare get(DrmdComparePK drmdComparePK) {
        DrmdCompare drmdCompare = new DrmdCompare(drmdComparePK);
        drmdCompare = em.find(DrmdCompare.class, drmdComparePK);
        return drmdCompare;
    }
}
