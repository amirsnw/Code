/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package ir.tamin.incomeBank.service.centralPayment;

import ir.tamin.incomeBank.model.centralPayment.CalcSubsystemReturnModel;
import ir.tamin.incomeBank.model.centralPayment.GlSubsystemType;
import ir.tamin.framework.ws.rest.json.Filter;
import ir.tamin.framework.ws.rest.json.FilterWrapper;
import ir.tamin.framework.ws.rest.json.Sort;
import ir.tamin.framework.ws.rest.json.SortWrapper;
import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.HashSet;
import java.util.List;
import java.util.Map;
import java.util.Set;
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
 * @author s_maknooni
 */
@Stateless
public class SubSystemService {

    @Inject
    private EntityManager em;

    public Map<String, Object> getAll(FilterWrapper filterWrapper, Integer start, Integer limit, SortWrapper sortWrapper) {

        Map<String, Object> map = new HashMap<>();
        map.put("list", getList(filterWrapper, start, limit, sortWrapper));
        map.put("total", getCount(filterWrapper));
        return map;
    }

    public List<GlSubsystemType> getList(FilterWrapper filterWrapper, Integer start, Integer limit, SortWrapper sort) {
        TypedQuery createQuery = em.createQuery(getQuery(filterWrapper, sort));

        List<GlSubsystemType> subsystemList = new ArrayList<>();
        if (start != null && limit != null) {
            subsystemList = createQuery.setFirstResult(start).setMaxResults(limit).getResultList();
        }
        if (start == null && limit != null) {
            subsystemList = createQuery.setMaxResults(limit).getResultList();
        }
        if (start != null && limit == null) {
            subsystemList = createQuery.setFirstResult(start).getResultList();
        }
        if (start == null && limit == null) {
            subsystemList = createQuery.getResultList();
        }

        return subsystemList;
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
            Root<GlSubsystemType> subSystemFrom = criteriaQuery.from(GlSubsystemType.class);
            Metamodel m = em.getMetamodel();
            EntityType<GlSubsystemType> subSystemEntityType = m.entity(GlSubsystemType.class);
            List<Predicate> predicates = new ArrayList<Predicate>();
            if (filterWrapper != null && filterWrapper.getFilters() != null) {
                for (Filter filter : filterWrapper.getFilters()) {

                    Object value = filter.getValue();
                    String field = filter.getProperty();
                    Filter.Operator operator = filter.getOperator();
                    String[] f = field.split("\\.");
                    Predicate predicate = null;
                    javax.persistence.criteria.Path path;
                    switch (operator) {
                        case LIKE:
                            if ("codeTitle".equals(field)) {

                                path = subSystemFrom.get("code");

                                predicates.add(
                                        criteriaBuilder.or(
                                                criteriaBuilder.like(path, value.toString()),
                                                criteriaBuilder.like(subSystemFrom.get(subSystemEntityType.getDeclaredSingularAttribute("title", String.class)), value.toString())
                                        )
                                );
                            } else {
                                predicates.add(criteriaBuilder.like(subSystemFrom.get(subSystemEntityType.getDeclaredSingularAttribute(field, String.class)), "%" + value + "%"));
                            }
                            break;
                        case EQUAL:
                            path = subSystemFrom.get(f[0]);
                            for (int j = 1; j < f.length; j++) {
                                path = path.get(f[j]);
                            }
                            predicate = criteriaBuilder.equal(path, value);
                            predicates.add(predicate);
                            break;
                        case NOT_EQUAL:
                            path = subSystemFrom.get(f[0]);
                            for (int j = 1; j < f.length; j++) {
                                path = path.get(f[j]);
                            }
                            predicate = criteriaBuilder.notEqual(path, value);
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

                    javax.persistence.criteria.Path path = subSystemFrom.get(sortProperties[0]);
                    for (int j = 1; j < sortProperties.length; j++) {
                        path = path.get(sortProperties[j]);
                    }
                    if (sortProperties.length > 1) {

                    } else {
                        if (sortSet.getDirection().getName().equals(Sort.Direction.DESC.getName())) {
                            order = criteriaBuilder.desc(subSystemFrom.get(sortProperties[0]));
                        } else {
                            order = criteriaBuilder.asc(subSystemFrom.get(sortProperties[0]));
                        }
                    }
                    orders.add(order);
                }

                if (!orders.isEmpty()) {
                    criteriaQuery.orderBy(orders);
                }
            }

            criteriaQuery.select(subSystemFrom);
            return criteriaQuery;

        } catch (Exception e) {
            return null;
        }
    }

    public List<CalcSubsystemReturnModel> getAllCalcSubSystems(FilterWrapper filterWrapper, Integer start, Integer limit, SortWrapper sortWrapper) {

        List<CalcSubsystemReturnModel> result = new ArrayList<>();
        CalcSubsystemReturnModel model;
        List<GlSubsystemType> subsystemTypeList = getList(filterWrapper, start, limit, sortWrapper);

        for (GlSubsystemType sub : subsystemTypeList) {
            model = new CalcSubsystemReturnModel(sub, 0L, BigDecimal.ZERO);
            result.add(model);
        }

        return result;
    }

//    public GlSubsystemType getByCode(String code) {
//        FilterWrapper filterWrapper = new FilterWrapper();
//        Filter filter = new Filter();
//        filter.setProperty("code");
//        filter.setValue(code);
//        filter.setOperator(Filter.Operator.EQUAL);
//        Set<Filter> filters = new HashSet<>();
//        filters.add(filter);
//        filterWrapper.setFilters(filters);
//        List<GlSubsystemType> list = getList(filterWrapper, 0, 100, null);
//
//        if (list != null && !list.isEmpty()) {
//            return list.get(0);
//        } else {
//            return null;
//        }
//
//    }

    public GlSubsystemType getByCode(String code, String systemId) {
        FilterWrapper filterWrapper = new FilterWrapper();
        Filter codeFilter = new Filter();
        codeFilter.setProperty("code");
        codeFilter.setValue(code);
        codeFilter.setOperator(Filter.Operator.EQUAL);

        Filter headIdFilter = new Filter();
        headIdFilter.setProperty("system.systemId");
        headIdFilter.setValue(systemId);
        headIdFilter.setOperator(Filter.Operator.EQUAL);

        Set<Filter> filters = new HashSet<>();

        filters.add(codeFilter);
        filters.add(headIdFilter);
        filterWrapper.setFilters(filters);

        List<GlSubsystemType> list = getList(filterWrapper, 0, 100, null);

        if (list != null && !list.isEmpty()) {
            return list.get(0);
        } else {
            return null;
        }

    }
}
