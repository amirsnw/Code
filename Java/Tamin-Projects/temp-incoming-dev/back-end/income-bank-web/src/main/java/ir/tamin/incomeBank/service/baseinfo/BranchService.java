/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package ir.tamin.incomeBank.service.baseinfo;

import ir.tamin.incomeBank.model.baseinfo.Branch;
import ir.tamin.incomeBank.model.identityManager.User;
import ir.tamin.incomeBank.service.common.CommonService;
import ir.tamin.incomeBank.service.identityManager.UserBean;
import ir.tamin.framework.cdi.util.WebProperties;
import ir.tamin.framework.core.util.Bundle;
import ir.tamin.framework.ws.rest.json.Filter;
import ir.tamin.framework.ws.rest.json.FilterWrapper;
import ir.tamin.framework.ws.rest.json.Sort;

import static ir.tamin.framework.ws.rest.json.Sort.Direction.ASC;

import ir.tamin.framework.ws.rest.json.SortWrapper;

import java.util.ArrayList;
import java.util.Arrays;
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
 * @author s_maknooni
 */
@Stateless
public class BranchService {

    @Inject
    private EntityManager em;
    @Inject
    UserBean userBean;

    @Inject
    private CommonService commonService;

    @Inject
    @WebProperties
    Bundle webBundle;

    public Map<String, Object> getAll(FilterWrapper filterWrapper, Integer start, Integer limit, SortWrapper sort, User user) {

        Filter filter = new Filter();
        Filter filter1 = new Filter();
        Set<Filter> filters = new HashSet<Filter>();
        String setadCode = (webBundle.getProperty("setad.code"));
        String provinceCode = user.getOrganization().getOrganizationDetail().getGeoUnit().getParent().getCode();
        if (commonService.isEdareKol(user)) {
            filter.setProperty("city.province.provinceCode");
            filter.setValue(provinceCode);
            filter.setOperator(Filter.Operator.EQUAL);

            filter1.setProperty("brhKind");
            filter1.setValue("1");
            filter1.setOperator(Filter.Operator.EQUAL);

        } else if (setadCode.contains(user.getOrganization().getCode())) {
            filter.setProperty("brhKind");
            filter.setValue("1");
            filter.setOperator(Filter.Operator.EQUAL);

        } else if (!commonService.isEdareKol(user)) {
            filter.setProperty("brhCode");
            filter.setValue(user.getOrganization().getCode());
            filter.setOperator(Filter.Operator.EQUAL);

        }
        if (filterWrapper == null) {
            filterWrapper = new FilterWrapper();
            filters.add(filter);
            if (filter1.getValue() != null) {
                filters.add(filter1);
            }
            filterWrapper.setFilters(filters);
        } else if (filterWrapper.getFilters() != null) {
            filterWrapper.getFilters().add(filter);
            if (filter1.getValue() != null) {
                filterWrapper.getFilters().add(filter1);
            }
        }

        Map<String, Object> map = new HashMap<>();
        map.put("list", getList(filterWrapper, start, limit, sort));
        map.put("total", getCount(filterWrapper));
        return map;
    }

    public List<Branch> getList(FilterWrapper filterWrapper, Integer start, Integer limit, SortWrapper sort) {
        TypedQuery createQuery = em.createQuery(getQuery(filterWrapper, sort));

        List<Branch> branchList = new ArrayList<>();
        if (start != null && limit != null) {
            branchList = createQuery.setFirstResult(start).setMaxResults(limit).getResultList();
        }
        if (start == null && limit != null) {
            branchList = createQuery.setMaxResults(limit).getResultList();
        }
        if (start != null && limit == null) {
            branchList = createQuery.setFirstResult(start).getResultList();
        }
        if (start == null && limit == null) {
            branchList = createQuery.getResultList();
        }
        return branchList;
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
            Root<Branch> branch = criteriaQuery.from(Branch.class);
            Metamodel m = em.getMetamodel();
            EntityType<Branch> Branch_ = m.entity(Branch.class);
            branch.alias("v");
            List<Predicate> predicates = new ArrayList<Predicate>();
            if (filterWrapper != null && filterWrapper.getFilters() != null) {
                for (Filter filter : filterWrapper.getFilters()) {

                    Object value = filter.getValue();
                    String field = filter.getProperty();
                    Filter.Operator operator = filter.getOperator();
                    String[] f = field.split("\\.");
                    Predicate predicate = null;
                    switch (operator) {
                        case LIKE:
                            if ("brchCodeName".equals(field)) {

                                javax.persistence.criteria.Path path = branch.get("brhCode");

                                predicates.add(
                                        criteriaBuilder.or(
                                                criteriaBuilder.like(path, value.toString()),
                                                criteriaBuilder.like(branch.get(Branch_.getDeclaredSingularAttribute("brhName", String.class)), value.toString())
                                        )
                                );
                            } else {
                                predicates.add(criteriaBuilder.like(branch.get(Branch_.getDeclaredSingularAttribute(field, String.class)), "%" + value + "%"));
                            }
                            break;
                        case EQUAL:
                            javax.persistence.criteria.Path path = branch.get(f[0]);
                            for (int j = 1; j < f.length; j++) {
                                path = path.get(f[j]);
                            }
                            predicate = criteriaBuilder.equal(path, value);
                            predicates.add(predicate);
                            break;
                        case BEFORE:

                            path = branch.get(f[0]);
                            for (int j = 1; j < f.length; j++) {
                                path = path.get(f[j]);
                            }
                            predicate = criteriaBuilder.lessThanOrEqualTo(path, value.toString());
                            predicates.add(predicate);

                            break;
                        case IN:

                            path = branch.get(f[0]);
                            for (int j = 1; j < f.length; j++) {
                                path = path.get(f[j]);
                            }
                            List list = new ArrayList<>();
                            String val[] = value.toString().split(",");
                            list.addAll(Arrays.asList(val));
                            predicates.add(path.in(list));

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

                    javax.persistence.criteria.Path path = branch.get(sortProperties[0]);
                    for (int j = 1; j < sortProperties.length; j++) {
                        path = path.get(sortProperties[j]);
                    }
                    if (sortProperties.length > 0) {
                        if (sortSet.getDirection().getName().equals(Sort.Direction.DESC.getName())) {
                            order = criteriaBuilder.desc(branch.get(sortProperties[0]));
                        } else {
                            order = criteriaBuilder.asc(branch.get(sortProperties[0]));
                        }
                    }
                    orders.add(order);
                }

                if (!orders.isEmpty()) {
                    criteriaQuery.orderBy(orders);
                }
            }

            criteriaQuery.select(branch);
            return criteriaQuery;

        } catch (Exception e) {
            return null;
        }
    }

    public Map<String, Object> getItemPage(String brchCode, FilterWrapper filter, Integer start, Integer limit, SortWrapper sortWrapper) {
        Map<String, Object> map = new HashMap<>();

        if (brchCode == null) {
            map.put("filter", filter);
            map.put("start", start);
            map.put("limit", limit);
            map.put("sort", sortWrapper);
            return map;
        }
        if (limit == null) {
            limit = 10;
        }

        Integer countResult = getPageNumber(filter, brchCode);
        Integer pageNumber = countResult / limit;
        start = pageNumber * limit;
        map.put("filter", filter);
        map.put("start", start);
        map.put("limit", limit);
        map.put("sort", sortWrapper);
        return map;
    }

    public Integer getPageNumber(FilterWrapper filters, String brchCode) {
        FilterWrapper searchFilterWrapper = new FilterWrapper();
        searchFilterWrapper.setFilters(new HashSet<Filter>());
        Filter filter = new Filter();
        filter.setOperator(Filter.Operator.BEFORE);
        filter.setValue(brchCode);
        filter.setProperty("brhCode");
        searchFilterWrapper.getFilters().add(filter);

        SortWrapper sortwr = new SortWrapper();
        sortwr.setSortSet(new HashSet<Sort>());
        Sort sort = new Sort();
        sort.setProperty("brhCode");
        sort.setDirection(ASC);
        sortwr.getSortSet().add(sort);
        Integer countResult;
        TypedQuery query = em.createQuery(getQuery(searchFilterWrapper, sortwr));
        countResult = query.getResultList().size() - 1;
        return countResult;

    }

}
