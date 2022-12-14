package ir.tamin.insurance.technical.service.baseinfo;

import ir.tamin.framework.ws.rest.json.Filter;
import ir.tamin.framework.ws.rest.json.FilterWrapper;
import ir.tamin.framework.ws.rest.json.Sort;
import ir.tamin.framework.ws.rest.json.SortWrapper;
import ir.tamin.insurance.technical.model.baseinfo.City;

import javax.ejb.Stateless;
import javax.inject.Inject;
import javax.persistence.EntityManager;
import javax.persistence.TypedQuery;
import javax.persistence.criteria.*;
import javax.persistence.metamodel.EntityType;
import javax.persistence.metamodel.Metamodel;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

/**
 *
 * @author m_hoseini
 */
@Stateless
public class CityService {

    @Inject
    private EntityManager entityManager;

    public City getCityById(String id) {
        try {
            return entityManager.find(City.class, id);
        } catch (Exception e) {
            e.printStackTrace();
            return null;
        }
    }

    public Map<String, Object> getCities(FilterWrapper filter, Integer start, Integer limit, SortWrapper sort, String branchcode) {
        Map<String, Object> map = new HashMap<>();

        String insuranceNumber = "";
        String branchCode = branchcode;

        //TODO check limit and start
//        if (filter != null && filter.getFilters().size() > 0) {
//            for (Filter fltr : filter.getFilters()) {
//                if ("insuranceNumber".equalsIgnoreCase(fltr.getProperty())) {
//                    insuranceNumber = fltr.getValue();
//                }
//                if ("branchCode".equalsIgnoreCase(fltr.getProperty())) {
//                    branchCode = fltr.getValue();
//                }
//            }
//        }

        map.put("list", getList(filter, insuranceNumber, branchCode, start, limit, sort));
        map.put("total", getCount(filter, insuranceNumber, branchCode));
//        map.put("total", entityManager.createNamedQuery("JobType.findAll").getResultList().size());
        return map;
    }

    public List<City> getList(FilterWrapper filter, String insuranceNumber, String branchCode, Integer start, Integer limit, SortWrapper sort) {

        TypedQuery createQuery = entityManager.createQuery(getQuery(true, filter, insuranceNumber, branchCode, sort));

        List<City> cityList = new ArrayList<>();
        if (start != null && limit != null) {
            cityList = createQuery.setFirstResult(start).setMaxResults(limit).getResultList();
        }
        if (start == null && limit != null) {
            cityList = createQuery.setMaxResults(limit).getResultList();
        }
        if (start != null && limit == null) {
            cityList = createQuery.setFirstResult(start).getResultList();
        }
        if (start == null && limit == null) {
            cityList = createQuery.getResultList();
        }

        return cityList;
    }

    private CriteriaQuery getQuery(boolean selectType, FilterWrapper filterWrapper, String insuranceNumber, String branchCode, SortWrapper sortWrapper) {
        try {

            CriteriaBuilder criteriaBuilder = entityManager.getCriteriaBuilder();
            CriteriaQuery criteriaQuery = criteriaBuilder.createQuery();
            Root<City> cities = criteriaQuery.from(City.class);
            Metamodel m = entityManager.getMetamodel();
            EntityType<City> City_ = m.entity(City.class);
            cities.alias("v");
            List<Predicate> predicates = new ArrayList<Predicate>();

//            if (!branchCode.equalsIgnoreCase("") ) {
//                Subquery subquery1 = criteriaQuery.subquery(WorkSheetRecordDetailRowView.class);
//                Root<WorkSheetRecordDetailRowView> workSheetRecordDetailRowView = subquery1.from(WorkSheetRecordDetailRowView.class);
//
//                subquery1.select(workSheetRecordDetailRowView.get("jobTypeCode"));
//                List<Predicate> subQuery1Predicates = new ArrayList<>();
//
//                subQuery1Predicates.add(criteriaBuilder.equal(workSheetRecordDetailRowView.get("branchCode"), branchCode));
//
//                if (insuranceNumber != null && !insuranceNumber.equalsIgnoreCase("")) {
//                    subQuery1Predicates.add(criteriaBuilder.equal(workSheetRecordDetailRowView.get("insuranceNumber"), insuranceNumber));
//                }
//
//                subquery1.where(subQuery1Predicates.toArray(new Predicate[]{}));
//                predicates.add(criteriaBuilder.in(cities.get("jobTypeCode")).value(subquery1));
//            }
            if (filterWrapper != null && filterWrapper.getFilters() != null) {
                for (Filter filter : filterWrapper.getFilters()) {

                    Object value = filter.getValue();
                    String field = filter.getProperty();
                    Filter.Operator operator = filter.getOperator();
                    String[] f = field.split("\\.");
                    Predicate predicate = null;
                    switch (operator) {
                        case LIKE:
                            predicates.add(criteriaBuilder.like(cities.get(City_.getDeclaredSingularAttribute(field, String.class)), "%" + value + "%"));
                            break;
                        case _EQUAL:
                        case EQUAL:
                            javax.persistence.criteria.Path path = cities.get(f[0]);
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

            if (selectType) {
                List<Order> orders = new ArrayList<>();
                if (sortWrapper != null) {
                    for (Sort sort : sortWrapper.getSortSet()) {
                        Order order;
                        String[] f = sort.getProperty().split("\\.");
                        Path path = cities.get(f[0]);
                        for (int j = 1; j < f.length; j++) {
                            path = path.get(f[j]);
                        }
                        if (sort.getDirection().getName().equals(Sort.Direction.DESC.getName())) {
                            order = criteriaBuilder.desc(path);
                        } else {
                            order = criteriaBuilder.asc(path);
                        }
                        orders.add(order);
                    }
                    criteriaQuery.orderBy(orders);
                }
                if (!orders.isEmpty()) {
                    criteriaQuery.orderBy(orders);
                }
                criteriaQuery.select(cities);
                return criteriaQuery;

            } else {
                CriteriaQuery<Long> cqCount = criteriaBuilder.createQuery(Long.class);
                cqCount.where(predicates.toArray(new Predicate[]{}));
                cqCount.select(criteriaBuilder.count(cities));
                return cqCount;
            }

        } catch (Exception e) {
            throw e;
        }
    }

    public Long getCount(FilterWrapper filter, String insuranceNumber, String branchCode) {
        TypedQuery createQuery = entityManager.createQuery(getQuery(false, filter, insuranceNumber, branchCode, null));
        return ((Long) createQuery.getSingleResult());

    }

}
