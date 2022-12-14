/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package ir.tamin.incomeBank.service.centralPayment;

import ir.tamin.incomeBank.model.centralPayment.LogDetail;
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
public class LogDetailService {

    @Inject
    private EntityManager entityManager;

    public Map<String, Object> getAll(FilterWrapper filterWrapper, Integer start, Integer limit, SortWrapper sort) {
        Map<String, Object> map = new HashMap<>();
        map.put("list", getList(filterWrapper, start, limit, sort));
        map.put("total", getCount(filterWrapper));

        return map;

    }

    private Integer getCount(FilterWrapper filter) {
        Integer count = 0;
        TypedQuery createQuery = entityManager.createQuery(getQuery(filter, null));
        count = createQuery.getResultList().size();
        return count;

    }

    private List<LogDetail> getList(FilterWrapper filter, Integer start, Integer limit, SortWrapper sort) {
        TypedQuery createQuery = entityManager.createQuery(getQuery(filter, sort));
        List<LogDetail> logDetailList = new ArrayList<>();

        if (start != null && limit != null) {
            logDetailList = createQuery.setFirstResult(start).setMaxResults(limit).getResultList();
        } else if (start == null && limit != null) {
            logDetailList = createQuery.setMaxResults(limit).getResultList();
        } else if (start != null && limit == null) {
            logDetailList = createQuery.setFirstResult(start).getResultList();
        } else if (start == null && limit == null) {
            logDetailList = createQuery.getResultList();
        }

        return logDetailList;

    }

    private CriteriaQuery getQuery(FilterWrapper filterWrapper, SortWrapper sortWrapper) {
        try {
            CriteriaBuilder criteriaBuilder = entityManager.getCriteriaBuilder();
            CriteriaQuery criteriaQuery = criteriaBuilder.createQuery();
            Root<LogDetail> logDetailFrom = criteriaQuery.from(LogDetail.class);
            List<Predicate> predicates = new ArrayList<>();
            Metamodel metamodel = entityManager.getMetamodel();
            EntityType<LogDetail> entityType = metamodel.entity(LogDetail.class);
            if (filterWrapper != null && filterWrapper.getFilters() != null) {

                Object[] filterArray = filterWrapper.getFilters().toArray();

                for (int i = 0; i < filterArray.length; i++) {
                    Filter filter = (Filter) filterArray[i];
                    String field = filter.getProperty();
                    Object value = filter.getValue();
                    Filter.Operator operator = filter.getOperator();

                    String[] f = field.split("\\.");

                    Predicate predicate = null;
                    javax.persistence.criteria.Path path;
                    switch (operator) {
                        case LIKE:
                            predicates.add(criteriaBuilder.like(logDetailFrom.get(entityType.getDeclaredSingularAttribute(field, String.class)), "%" + value.toString().replace(" ", "") + "%"));

                            break;
                        case EQUAL:

                            path = logDetailFrom.get(f[0]);
                            for (int j = 1; j < f.length; j++) {
                                path = path.get(f[j]);
                            }

                            predicate = criteriaBuilder.equal(path, value);
                            predicates.add(predicate);

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
                    if (sortSet.getDirection().getName().equals(Sort.Direction.DESC.getName())) {
                        order = criteriaBuilder.desc(logDetailFrom.get(sortProperties[0]));
                    } else {
                        order = criteriaBuilder.asc(logDetailFrom.get(sortProperties[0]));
                    }

                    orders.add(order);
                }
                if (!orders.isEmpty()) {
                    criteriaQuery.orderBy(orders);
                }
            }
            criteriaQuery.select(logDetailFrom);
            return criteriaQuery;
        } catch (Exception e) {
            Logger.getLogger(LogDetail.class.getName()).log(Level.SEVERE, e.getMessage(), e);
            return null;
        }
    }
}
