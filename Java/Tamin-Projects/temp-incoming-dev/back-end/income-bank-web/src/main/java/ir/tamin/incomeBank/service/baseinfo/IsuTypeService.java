/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package ir.tamin.incomeBank.service.baseinfo;

import ir.tamin.incomeBank.model.baseinfo.IsuType;
import ir.tamin.framework.ws.rest.json.Filter;
import ir.tamin.framework.ws.rest.json.FilterWrapper;
import ir.tamin.framework.ws.rest.json.Sort;
import static ir.tamin.framework.ws.rest.json.Sort.Direction.ASC;
import ir.tamin.framework.ws.rest.json.SortWrapper;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.HashSet;
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
public class IsuTypeService {

    @Inject
    private EntityManager entityManager;

    public Map<String, Object> getAll(FilterWrapper filter, Integer start, Integer limit, SortWrapper sort) {

        Map<String, Object> map = new HashMap<String, Object>();
        map.put("list", getList(filter, start, limit, sort));
        map.put("total", getCount(filter));
        return map;
    }

    private List<IsuType> getList(FilterWrapper filter, Integer start, Integer limit, SortWrapper sort) {

        TypedQuery query = entityManager.createQuery(getQuery(filter, sort));

        List<IsuType> isuTypeList = new ArrayList<>();

        if (start != null && limit != null) {
            isuTypeList = query.setFirstResult(start).setMaxResults(limit).getResultList();
        } else if (start == null && limit != null) {
            isuTypeList = query.setMaxResults(limit).getResultList();
        } else if (start != null && limit == null) {
            isuTypeList = query.setFirstResult(start).getResultList();
        } else if (start == null && limit == null) {
            isuTypeList = query.getResultList();
        }
        return isuTypeList;

    }

    private Integer getCount(FilterWrapper filter) {

        Integer count = 0;
        TypedQuery query = entityManager.createQuery(getQuery(filter, null));
        count = query.getResultList().size();
        return count;
    }

    private CriteriaQuery getQuery(FilterWrapper filterWrapper, SortWrapper sort) {
        try {
            CriteriaBuilder criteriaBuilder = entityManager.getCriteriaBuilder();
            CriteriaQuery query = criteriaBuilder.createQuery();
            Root<IsuType> isuTypeFrom = query.from(IsuType.class);
            Metamodel metamodel = entityManager.getMetamodel();
            EntityType<IsuType> isuTypeEntityType = metamodel.entity(IsuType.class);
            List<Predicate> predicates = new ArrayList<>();

            if (filterWrapper != null && filterWrapper.getFilters() != null) {
                for (Filter filter : filterWrapper.getFilters()) {

                    String field = filter.getProperty();
                    Object value = filter.getValue();
                    Filter.Operator operator = filter.getOperator();
                    String[] f = field.split("\\.");
                    Predicate predicate = null;

                    switch (operator) {
                        case LIKE:
                            predicates.add(criteriaBuilder.like(isuTypeFrom.get(isuTypeEntityType.getDeclaredSingularAttribute(field, String.class)), "%" + value + "%"));
                            break;
                        case EQUAL:
                            javax.persistence.criteria.Path path = isuTypeFrom.get(f[0]);
                            for (int j = 1; j < f.length; j++) {
                                path = path.get(f[j]);
                            }
                            predicate = criteriaBuilder.equal(path, value);
                            predicates.add(predicate);
                            break;
                        case BEFORE:
                            path = isuTypeFrom.get(f[0]);
                            for (int j = 1; j < f.length; j++) {
                                path = path.get(f[j]);
                            }

                            predicate = criteriaBuilder.lessThan(path, (Comparable) value);
                            predicates.add(predicate);
                            break;
                        default:
                            break;
                    }
                }

                query.where(predicates.toArray(new Predicate[]{}));
            }
            if (sort != null) {
                List<Order> orders = new ArrayList<>();
                for (Sort sortSet : sort.getSortSet()) {
                    Order order = null;
                    String[] sortProperties = sortSet.getProperty().split("\\.");

                    javax.persistence.criteria.Path path = isuTypeFrom.get(sortProperties[0]);
                    for (int j = 1; j < sortProperties.length; j++) {
                        path = path.get(sortProperties[j]);
                    }
                    if (sortSet.getDirection().getName().equals(Sort.Direction.DESC.getName())) {
                        order = criteriaBuilder.desc(isuTypeFrom.get(sortProperties[0]));
                    } else {
                        order = criteriaBuilder.asc(isuTypeFrom.get(sortProperties[0]));
                    }
                    orders.add(order);
                }

                if (!orders.isEmpty()) {
                    query.orderBy(orders);
                }
            }

            query.select(isuTypeFrom);
            return query;
        } catch (Exception ex) {
            Logger.getLogger(IsuType.class.getName()).log(Level.SEVERE, ex.getMessage(), ex);
            return null;
        }
    }

    public Map<String, Object> getItemPage(String code, FilterWrapper filter, Integer start, Integer limit, SortWrapper sortWrapper) {
        Map<String, Object> map = new HashMap<>();

        if (code == null) {
            map.put("filter", filter);
            map.put("start", start);
            map.put("limit", limit);
            map.put("sort", sortWrapper);
            return map;
        }
        if (limit == null) {
            limit = 10;
        }
        Integer countResult = getPageNumber(code);
        Integer pageNumber = countResult / limit;
        start = pageNumber * limit;
        map.put("filter", filter);
        map.put("start", start);
        map.put("limit", limit);
        map.put("sort", sortWrapper);
        return map;
    }

    public Integer getPageNumber(String code) {
        FilterWrapper searchFilterWrapper = new FilterWrapper();

        searchFilterWrapper.setFilters(new HashSet<Filter>());
        Filter fltr2 = new Filter();
        fltr2.setOperator(Filter.Operator.BEFORE);
        fltr2.setValue(code);
        fltr2.setProperty("isutypecode");
        searchFilterWrapper.getFilters().add(fltr2);

        SortWrapper sortwr = new SortWrapper();
        sortwr.setSortSet(new HashSet<Sort>());
        Sort sort = new Sort();
        sort.setProperty("isutypecode");
        sort.setDirection(ASC);
        sortwr.getSortSet().add(sort);
        Integer countResult;
        TypedQuery query = entityManager.createQuery(getQuery(searchFilterWrapper, sortwr));
        countResult = query.getResultList().size();
        return countResult;

    }
}
