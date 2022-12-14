/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package ir.tamin.incomeBank.service.daramadBank;

import ir.tamin.incomeBank.model.daramadBank.RegInsuranceSpec;
import ir.tamin.incomeBank.model.daramadBank.RegWorkshopSpec;
import ir.tamin.incomeBank.service.identityManager.UserBean;
import ir.tamin.framework.ws.rest.json.Filter;
import ir.tamin.framework.ws.rest.json.FilterWrapper;
import ir.tamin.framework.ws.rest.json.Sort;
import ir.tamin.framework.ws.rest.json.SortWrapper;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
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
 * @author f_fotuhi
 */
@Stateless
public class CustomerCodeService {

    @Inject
    private EntityManager em;
    @Inject
    UserBean userBean;

    public Map<String, Object> getAll(FilterWrapper filterWrapper, Integer start, Integer limit, SortWrapper sort) {

        Map<String, Object> map = new HashMap<>();

        String customerType = null;
        if (filterWrapper != null && filterWrapper.getFilters() != null) {
            Object[] filterArray = filterWrapper.getFilters().toArray();

            for (int i = 0; i < filterArray.length; i++) {
                Filter filter = (Filter) filterArray[i];
                String field = filter.getProperty();
                String value = filter.getValue();
                if (field.equals("mastCustType")) {
                    if (value.equals("04") || value.equals("05") || value.equals("06")) {
                        customerType = "workShop";
                        filter.setOperator(Filter.Operator.NOT_EQUAL);

                    } else if (value.equals("01") || value.equals("02") || value.equals("03")) {
                        customerType = "insurance";
                    }
                }
            }
        }

        if (customerType.equals("workShop")) {
            map.put("list", getWorkShopList(filterWrapper, start, limit, sort));
            map.put("total", getWorkShopCount(filterWrapper));
        } else if (customerType.equals("insurance")) {
            map.put("list", getInsuranceList(filterWrapper, start, limit, sort));
            map.put("total", getInsuranceCount(filterWrapper));
        }
        return map;
    }

    public List<RegWorkshopSpec> getWorkShopList(FilterWrapper filterWrapper, Integer start, Integer limit, SortWrapper sort) {

        TypedQuery createQuery = em.createQuery(getWorkShopQuery(filterWrapper, sort));

        List<RegWorkshopSpec> workshopList = new ArrayList<>();
        if (start != null && limit != null) {
            workshopList = createQuery.setFirstResult(start).setMaxResults(limit).getResultList();
        }
        if (start == null && limit != null) {
            workshopList = createQuery.setMaxResults(limit).getResultList();
        }
        if (start != null && limit == null) {
            workshopList = createQuery.setFirstResult(start).getResultList();
        }
        if (start == null && limit == null) {
            workshopList = createQuery.getResultList();
        }

        return workshopList;
    }

    public Integer getWorkShopCount(FilterWrapper filter) {
        Integer qcount = 0;
        TypedQuery createQuery = em.createQuery(getWorkShopQuery(filter, null));
        qcount = createQuery.getResultList().size();
        return qcount;
    }

    public List<RegInsuranceSpec> getInsuranceList(FilterWrapper filterWrapper, Integer start, Integer limit, SortWrapper sort) {

        TypedQuery createQuery = em.createQuery(getInsuranceQuery(filterWrapper, sort));

        List<RegInsuranceSpec> insuranceList = new ArrayList<>();
        if (start != null && limit != null) {
            insuranceList = createQuery.setFirstResult(start).setMaxResults(limit).getResultList();
        }
        if (start == null && limit != null) {
            insuranceList = createQuery.setMaxResults(limit).getResultList();
        }
        if (start != null && limit == null) {
            insuranceList = createQuery.setFirstResult(start).getResultList();
        }
        if (start == null && limit == null) {
            insuranceList = createQuery.getResultList();
        }

        return insuranceList;
    }

    public Integer getInsuranceCount(FilterWrapper filter) {
        Integer qcount = 0;
        TypedQuery createQuery = em.createQuery(getInsuranceQuery(filter, null));
        qcount = createQuery.getResultList().size();
        return qcount;
    }

    private CriteriaQuery getWorkShopQuery(FilterWrapper filterWrapper, SortWrapper sortWrapper) {
        try {
            CriteriaBuilder criteriaBuilder = em.getCriteriaBuilder();
            CriteriaQuery criteriaQuery = criteriaBuilder.createQuery();
            Root<RegWorkshopSpec> workshopFrom = criteriaQuery.from(RegWorkshopSpec.class);
            List<Predicate> predicates = new ArrayList<Predicate>();
            Metamodel metamodel = em.getMetamodel();
            EntityType<RegWorkshopSpec> workshopEntityType = metamodel.entity(RegWorkshopSpec.class);
            if (filterWrapper != null && filterWrapper.getFilters() != null) {
                for (Filter filter : filterWrapper.getFilters()) {

                    Object value = filter.getValue();
                    String field = filter.getProperty();
                    Filter.Operator operator = filter.getOperator();
                    
                    if ("codeName".equals(field)){
                        field = "regWorkshopSpecPK.workShopId";
                    }
                    
                    String[] f = field.split("\\.");
                    Predicate predicate = null;
                    switch (operator) {

                        case EQUAL:
                            javax.persistence.criteria.Path path = workshopFrom.get(f[0]);
                            for (int j = 1; j < f.length; j++) {
                                path = path.get(f[j]);
                            }
                            predicate = criteriaBuilder.equal(path, value);
                            predicates.add(predicate);
                            break;
                        case LIKE:

                            path = workshopFrom.get(f[0]);
                            for (int j = 1; j < f.length; j++) {
                                path = path.get(f[j]);
                            }
                            if ("regWorkshopSpecPK.workShopId".equals(field)) {

                               // path = workshopFrom.get("regWorkshopSpecPK.workShopId");

                                predicates.add(
                                        criteriaBuilder.or(
                                                criteriaBuilder.like(path, value.toString()),
                                                criteriaBuilder.like(workshopFrom.get(workshopEntityType.getDeclaredSingularAttribute("workShopName", String.class)), value.toString())
                                        )
                                );
                            } else {
                                predicates.add(criteriaBuilder.like(workshopFrom.get(workshopEntityType.getDeclaredSingularAttribute(field, String.class)), value.toString()));
                            }

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

                    javax.persistence.criteria.Path path = workshopFrom.get(sortProperties[0]);
                    for (int j = 1; j < sortProperties.length; j++) {
                        path = path.get(sortProperties[j]);
                    }
                    if (sortProperties.length == 1) {
                        if (sortSet.getDirection().getName().equals(Sort.Direction.DESC.getName())) {
                            order = criteriaBuilder.desc(workshopFrom.get(sortProperties[0]));
                        } else {
                            order = criteriaBuilder.asc(workshopFrom.get(sortProperties[0]));
                        }
                    }
                    orders.add(order);
                }

                if (!orders.isEmpty()) {
                    criteriaQuery.orderBy(orders);
                }
            }

            criteriaQuery.select(workshopFrom);
            return criteriaQuery;

        } catch (Exception e) {
            return null;
        }
    }

    private CriteriaQuery getInsuranceQuery(FilterWrapper filterWrapper, SortWrapper sortWrapper) {
        try {
            CriteriaBuilder criteriaBuilder = em.getCriteriaBuilder();
            CriteriaQuery criteriaQuery = criteriaBuilder.createQuery();
            Root<RegInsuranceSpec> insuranceFrom = criteriaQuery.from(RegInsuranceSpec.class);
            List<Predicate> predicates = new ArrayList<Predicate>();
            Metamodel metamodel = em.getMetamodel();
            EntityType<RegInsuranceSpec> insuranceEntityType = metamodel.entity(RegInsuranceSpec.class);
            if (filterWrapper != null && filterWrapper.getFilters() != null) {
                for (Filter filter : filterWrapper.getFilters()) {

                    Object value = filter.getValue();
                    String field = filter.getProperty();
                    Filter.Operator operator = filter.getOperator();
                    String[] f = field.split("\\.");
                    Predicate predicate = null;
                    switch (operator) {

                        case EQUAL:
                            javax.persistence.criteria.Path path = insuranceFrom.get(f[0]);
                            for (int j = 1; j < f.length; j++) {
                                path = path.get(f[j]);
                            }
                            predicate = criteriaBuilder.equal(path, value);
                            predicates.add(predicate);
                            break;
                        case LIKE:

                            if ("codeName".equals(field)) {

                                path = insuranceFrom.get("code");

                                predicates.add(
                                        criteriaBuilder.or(
                                                criteriaBuilder.like(path, value.toString()),
                                                criteriaBuilder.like(insuranceFrom.get(insuranceEntityType.getDeclaredSingularAttribute("risuFName", String.class)), value.toString()),
                                                criteriaBuilder.like(insuranceFrom.get(insuranceEntityType.getDeclaredSingularAttribute("risuLName", String.class)), value.toString())
                                        )
                                );
                            } else {
                                predicates.add(criteriaBuilder.like(insuranceFrom.get(insuranceEntityType.getDeclaredSingularAttribute(field, String.class)), value.toString()));
                            }

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

                    javax.persistence.criteria.Path path = insuranceFrom.get(sortProperties[0]);
                    for (int j = 1; j < sortProperties.length; j++) {
                        path = path.get(sortProperties[j]);
                    }
                    if (sortProperties.length == 1) {
                        if (sortSet.getDirection().getName().equals(Sort.Direction.DESC.getName())) {
                            order = criteriaBuilder.desc(insuranceFrom.get(sortProperties[0]));
                        } else {
                            order = criteriaBuilder.asc(insuranceFrom.get(sortProperties[0]));
                        }
                    }
                    orders.add(order);
                }

                if (!orders.isEmpty()) {
                    criteriaQuery.orderBy(orders);
                }
            }

            criteriaQuery.select(insuranceFrom);
            return criteriaQuery;

        } catch (Exception e) {
            return null;
        }
    }

}
