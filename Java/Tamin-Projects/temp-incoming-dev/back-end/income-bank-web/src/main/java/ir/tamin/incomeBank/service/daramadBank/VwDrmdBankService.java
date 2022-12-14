/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package ir.tamin.incomeBank.service.daramadBank;

import ir.tamin.incomeBank.model.daramadBank.VwDrmdBank;
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

/**
 *
 * @author h_riazat
 */
@Stateless
public class VwDrmdBankService {

    @Inject
    private EntityManager entityManager;

    public VwDrmdBank get(String pk) {
        VwDrmdBank vwDrmdBank = entityManager.find(VwDrmdBank.class, pk);
        return vwDrmdBank;
    }

    public Map<String, Object> getAll(FilterWrapper filterWrapper, Integer start, Integer limit, SortWrapper sortWrapper) {
        Map<String, Object> map = new HashMap<>();
        List<VwDrmdBank> vwDrmdBank = new ArrayList<>();
        vwDrmdBank = getList(filterWrapper, start, limit, sortWrapper);
        map.put("list", vwDrmdBank);
        List<VwDrmdBank> vwDrmdBankAll = getListAll(filterWrapper);
        Integer count = getCount(vwDrmdBankAll);
        map.put("count", count);
        return map;
    }

    private List<VwDrmdBank> getList(FilterWrapper filterWrapper, Integer start, Integer limit, SortWrapper sortWrapper) {
        TypedQuery createQuery = entityManager.createQuery(getQuery(filterWrapper, sortWrapper));
        List<VwDrmdBank> vwDrmdBank = new ArrayList<>();
        if (start != null && limit != null) {
            vwDrmdBank = createQuery.setFirstResult(start).setMaxResults(limit).getResultList();
        } else if (start == null && limit != null) {
            vwDrmdBank = createQuery.setMaxResults(limit).getResultList();
        } else if (start != null && limit == null) {
            vwDrmdBank = createQuery.setFirstResult(start).getResultList();
        } else if (start == null && limit == null) {
            vwDrmdBank = createQuery.getResultList();
        }
        return vwDrmdBank;
    }

    private CriteriaQuery getQuery(FilterWrapper filterWrapper, SortWrapper sortWrapper) {
        try {
            CriteriaBuilder criteriaBuilder = entityManager.getCriteriaBuilder();
            CriteriaQuery criteriaQuery = criteriaBuilder.createQuery();
            Root<VwDrmdBank> vwDrmdBankFrom = criteriaQuery.from(VwDrmdBank.class);
            List<Predicate> predicates = new ArrayList<>();
            Metamodel metamodel = entityManager.getMetamodel();
            EntityType<VwDrmdBank> vwDrmdBankEntityType = metamodel.entity(VwDrmdBank.class);
            if (filterWrapper != null && filterWrapper.getFilters() != null) {
                for (Filter filter : filterWrapper.getFilters()) {
                    String field = filter.getProperty();
                    Object value = filter.getValue();
                    Filter.Operator operator = filter.getOperator();
                    String[] f = field.split("\\.");
                    Predicate predicate = null;
                    switch (operator) {
                        case EQUAL:
                            javax.persistence.criteria.Path path = vwDrmdBankFrom.get(f[0]);
                            for (int j = 1; j < f.length; j++) {
                                path = path.get(f[j]);
                            }
                            predicate = criteriaBuilder.equal(path, value);
                            predicates.add(predicate);
                            break;
                        case LIKE:
                            predicates.add(criteriaBuilder.like(vwDrmdBankFrom.get(vwDrmdBankEntityType.getDeclaredSingularAttribute(field, String.class)), "%" + value + "%"));
                            break;
                        case AFTER:
                            path = vwDrmdBankFrom.get(f[0]);
                            for (int j = 1; j < f.length; j++) {
                                path = path.get(f[j]);
                            }
                            predicates.add(
                                    criteriaBuilder.greaterThanOrEqualTo(path, (Comparable) value));
                            break;
                        case BEFORE:
                            path = vwDrmdBankFrom.get(f[0]);
                            for (int j = 1; j < f.length; j++) {
                                path = path.get(f[j]);
                            }
                            predicates.add(
                                    criteriaBuilder.lessThanOrEqualTo(path, (Comparable) value));
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
                    if (sortSet.getDirection().getName().equals(Sort.Direction.DESC.getName())) {
                        order = criteriaBuilder.desc(vwDrmdBankFrom.get(sortProperties[0]));
                    } else {
                        order = criteriaBuilder.asc(vwDrmdBankFrom.get(sortProperties[0]));
                    }
                    orders.add(order);
                }
                if (!orders.isEmpty()) {
                    criteriaQuery.orderBy(orders);
                }
            }
            criteriaQuery.select(vwDrmdBankFrom);
            return criteriaQuery;
        } catch (Exception ex) {
            Logger.getLogger(VwDrmdBankService.class.getName()).log(Level.SEVERE, ex.getMessage(), ex);
            return null;
        }
    }

    private List<VwDrmdBank> getListAll(FilterWrapper filter) {
        TypedQuery createQuery = entityManager.createQuery(getQuery(filter, null));
        List<VwDrmdBank> vwDrmdBankAll = createQuery.getResultList();
        return vwDrmdBankAll;
    }

    private Integer getCount(List<VwDrmdBank> vwDrmdBankAll) {
        Integer count = 0;
        count = vwDrmdBankAll.size();
        return count;
    }

}
