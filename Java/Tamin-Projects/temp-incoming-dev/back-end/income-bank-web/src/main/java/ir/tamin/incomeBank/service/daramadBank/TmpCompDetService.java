/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package ir.tamin.incomeBank.service.daramadBank;

import ir.tamin.incomeBank.model.daramadBank.TmpCompDet;
import ir.tamin.incomeBank.service.identityManager.UserBean;
import ir.tamin.incomeBank.util.DateUtils;
import ir.tamin.framework.cdi.util.MessageBundle;
import ir.tamin.framework.core.util.Bundle;
import ir.tamin.framework.ws.rest.json.Filter;
import ir.tamin.framework.ws.rest.json.FilterWrapper;
import ir.tamin.framework.ws.rest.json.Sort;
import ir.tamin.framework.ws.rest.json.SortWrapper;
import java.util.ArrayList;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
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

/**
 *
 * @author f_fotuhi
 */
public class TmpCompDetService {

    @Inject
    private EntityManager em;
    @Inject
    UserBean userBean;
    @Inject
    @MessageBundle
    Bundle messageBundle;

    public Map<String, Object> getAll(FilterWrapper filter, Integer start, Integer limit, SortWrapper sort) {

        Map<String, Object> map = new HashMap<>();
        map.put("list", getList(filter, start, limit, sort));
        map.put("total", getCount(filter));
        return map;
    }

    public List<TmpCompDet> getList(FilterWrapper filterWrapper, Integer start, Integer limit, SortWrapper sort) {

        TypedQuery createQuery = em.createQuery(getQuery(filterWrapper, sort));

        List<TmpCompDet> tmpCompDetList = new ArrayList<>();
        List<TmpCompDet> noLimitList = new ArrayList<>();
        if (start != null && limit != null) {
            tmpCompDetList = createQuery.setFirstResult(start).setMaxResults(limit).getResultList();
        }
        if (start == null && limit != null) {
            tmpCompDetList = createQuery.setMaxResults(limit).getResultList();
        }
        if (start != null && limit == null) {
            tmpCompDetList = createQuery.setFirstResult(start).getResultList();
        }
        if (start == null && limit == null) {
            tmpCompDetList = createQuery.getResultList();
        }
        TypedQuery createQueryNoLimit = em.createQuery(getQuery(filterWrapper, sort));
        noLimitList = createQueryNoLimit.getResultList();
        Long sumPrice = 0L;
        if (noLimitList.size() > 0) {
            for (TmpCompDet item : noLimitList) {
                sumPrice += item.getTmpcompPrice();
            }
            tmpCompDetList.get(0).setSum(sumPrice);
        }

        return tmpCompDetList;
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
            Root<TmpCompDet> tmpCompDetFrom = criteriaQuery.from(TmpCompDet.class);
            List<Predicate> predicates = new ArrayList<Predicate>();
            Metamodel metamodel = em.getMetamodel();
            EntityType<TmpCompDet> tmpCompDetEntityType = metamodel.entity(TmpCompDet.class);
            if (filterWrapper != null && filterWrapper.getFilters() != null) {
                for (Filter filter : filterWrapper.getFilters()) {

                    Object value = filter.getValue();
                    String field = filter.getProperty();
                    Filter.Operator operator = filter.getOperator();

                    if (field.equals("drmdComparePK.compMdate")) {
                        field = "tmpcompMDate";
                    }
                    if (field.equals("drmdComparePK.brchCode")) {
                        field = "tmpCompDetPK.brchCode";
                    }

                    if (!(field.equals("tmpcompMDate")) && field.toLowerCase().contains("date")) {

                        Date reqDate = DateUtils.convertDateStringToDate(value.toString().replace("/", ""));
                        value = DateUtils.format(reqDate, "yyyyMMdd");
                    }

                    String[] f = field.split("\\.");

                    Predicate predicate = null;
                    switch (operator) {

                        case EQUAL:
                            javax.persistence.criteria.Path path = tmpCompDetFrom.get(f[0]);
                            for (int j = 1; j < f.length; j++) {
                                path = path.get(f[j]);
                            }
                            predicate = criteriaBuilder.equal(path, value);
                            predicates.add(predicate);
                            break;
                        case LIKE:

                            predicates.add(criteriaBuilder.like(tmpCompDetFrom.get(tmpCompDetEntityType.getDeclaredSingularAttribute(field, String.class)), "%" + value + "%"));

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

                    javax.persistence.criteria.Path path = tmpCompDetFrom.get(sortProperties[0]);
                    for (int j = 1; j < sortProperties.length; j++) {
                        path = path.get(sortProperties[j]);
                    }
                    if (sortProperties.length > 0) {
                        if (sortSet.getDirection().getName().equals(Sort.Direction.DESC.getName())) {
                            order = criteriaBuilder.desc(tmpCompDetFrom.get(sortProperties[0]));
                        } else {
                            order = criteriaBuilder.asc(tmpCompDetFrom.get(sortProperties[0]));
                        }
                    }
                    orders.add(order);
                }

                if (!orders.isEmpty()) {
                    criteriaQuery.orderBy(orders);
                }
            }

            criteriaQuery.select(tmpCompDetFrom);
            return criteriaQuery;

        } catch (Exception e) {
            return null;
        }
    }
}
