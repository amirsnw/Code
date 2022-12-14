package ir.tamin.incomeBank.service.baseinfo;

import ir.tamin.incomeBank.model.baseinfo.Province;
import ir.tamin.incomeBank.model.identityManager.User;
import ir.tamin.incomeBank.service.identityManager.UserBean;
import ir.tamin.framework.cdi.util.WebProperties;
import ir.tamin.framework.core.util.Bundle;
import ir.tamin.framework.ws.rest.json.Filter;
import ir.tamin.framework.ws.rest.json.FilterWrapper;
import ir.tamin.framework.ws.rest.json.Sort;
import ir.tamin.framework.ws.rest.json.SortWrapper;

import javax.ejb.Stateless;
import javax.inject.Inject;
import javax.persistence.EntityManager;
import javax.persistence.TypedQuery;
import javax.persistence.criteria.*;
import javax.persistence.metamodel.EntityType;
import javax.persistence.metamodel.Metamodel;
import java.util.*;

/**
 * @author s_maknooni
 */
@Stateless
public class ProvinceService {

    @Inject
    private EntityManager em;
    @Inject
    UserBean userBean;

    @Inject
    @WebProperties
    Bundle webBundle;

    public Map<String, Object> getAll(FilterWrapper filterWrapper, Integer start, Integer limit, SortWrapper sort, User user) {

        Map<String, Object> map = new HashMap<>();
        String provinceCode = user.getOrganization().getOrganizationDetail().getGeoUnit().getParent().getCode();
        Filter filter = new Filter();
        String setadCode = (webBundle.getProperty("setad.code"));

        if ((!setadCode.contains(user.getOrganization().getCode()))) {
            filter.setProperty("provinceCode");
            filter.setValue(provinceCode);
            filter.setOperator(Filter.Operator.EQUAL);
        }

        if (filterWrapper == null && filter.getProperty() != null) {
            filterWrapper = new FilterWrapper();
            Set<Filter> filterSet = new HashSet<Filter>();
            filterSet.add(filter);
            filterWrapper.setFilters(filterSet);
        } else if (filterWrapper != null && filter.getValue() != null) {
            filterWrapper.getFilters().add(filter);
        }

        map.put("list", getList(filterWrapper, start, limit, sort));
        map.put("total", getCount(filterWrapper));
        return map;
    }

    public List<Province> getList(FilterWrapper filterWrapper, Integer start, Integer limit, SortWrapper sort) {

        TypedQuery createQuery = em.createQuery(getQuery(filterWrapper, sort));

        List<Province> province = new ArrayList<>();
        if (start != null && limit != null) {
            province = createQuery.setFirstResult(start).setMaxResults(limit).getResultList();
        }
        if (start == null && limit != null) {
            province = createQuery.setMaxResults(limit).getResultList();
        }
        if (start != null && limit == null) {
            province = createQuery.setFirstResult(start).getResultList();
        }
        if (start == null && limit == null) {
            province = createQuery.getResultList();
        }

        return province;
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
            Root<Province> province = criteriaQuery.from(Province.class);
            Metamodel m = em.getMetamodel();
            EntityType<Province> Province_ = m.entity(Province.class);
            province.alias("v");
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
                            if ("provinceCodeName".equals(field)) {

                                javax.persistence.criteria.Path path = province.get("provinceCode");

                                predicates.add(
                                        criteriaBuilder.or(
                                                criteriaBuilder.like(path, value.toString()),
                                                criteriaBuilder.like(province.get(Province_.getDeclaredSingularAttribute("provinceName", String.class)), value.toString())
                                        )
                                );
                            } else {
                                predicates.add(criteriaBuilder.like(province.get(Province_.getDeclaredSingularAttribute(field, String.class)), "%" + value + "%"));
                            }
                            break;
                        case EQUAL:
                            javax.persistence.criteria.Path path = province.get(f[0]);
                            for (int j = 1; j < f.length; j++) {
                                path = path.get(f[j]);
                            }
                            predicate = criteriaBuilder.equal(path, value);
                            predicates.add(predicate);
                            break;
                        case NOT_EQUAL:

                            path = province.get(f[0]);
                            for (int j = 1; j < f.length; j++) {
                                path = path.get(f[j]);
                            }
                            predicate = criteriaBuilder.notEqual(path, value);
                            predicates.add(predicate);
                            break;

                        case IN:
                            path = province.get(f[0]);
                            for (int j = 1; j < f.length; j++) {
                                path = path.get(f[j]);
                            }
                            List list = new ArrayList<>();
                            String val[] = value.toString().split(",");
                            list.addAll(Arrays.asList(val));
                            predicates.add(path.in(list));
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

                    javax.persistence.criteria.Path path = province.get(sortProperties[0]);
                    for (int j = 1; j < sortProperties.length; j++) {
                        path = path.get(sortProperties[j]);
                    }
                    if (sortProperties.length == 1) {
                        if (sortSet.getDirection().getName().equals(Sort.Direction.DESC.getName())) {
                            order = criteriaBuilder.desc(province.get(sortProperties[0]));
                        } else {
                            order = criteriaBuilder.asc(province.get(sortProperties[0]));
                        }
                    }
                    orders.add(order);
                }

                if (!orders.isEmpty()) {
                    criteriaQuery.orderBy(orders);
                }
            }

            criteriaQuery.select(province);
            return criteriaQuery;

        } catch (Exception e) {
            return null;
        }
    }

}
