/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package ir.tamin.incomeBank.service.daramadBank;

import ir.tamin.framework.ws.rest.json.Filter;
import ir.tamin.framework.ws.rest.json.FilterWrapper;
import ir.tamin.framework.ws.rest.json.Sort;
import ir.tamin.framework.ws.rest.json.SortWrapper;
import ir.tamin.incomeBank.model.daramadBank.DrmdLetter;
import ir.tamin.incomeBank.service.identityManager.UserBean;
import ir.tamin.incomeBank.util.DateUtils;
import java.util.ArrayList;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import javax.ejb.Stateless;
import javax.inject.Inject;
import javax.persistence.EntityManager;
import javax.persistence.TypedQuery;
import javax.persistence.criteria.CriteriaBuilder;
import javax.persistence.criteria.CriteriaQuery;
import javax.persistence.criteria.Expression;
import javax.persistence.criteria.Order;
import javax.persistence.criteria.Predicate;
import javax.persistence.criteria.Root;
import javax.persistence.metamodel.EntityType;
import javax.persistence.metamodel.Metamodel;

/**
 *
 * @author e_shoghi
 */
@Stateless
public class IncomingLetterOfficeService {

    @Inject
    private EntityManager em;
    @Inject
    UserBean userBean;

    public Map<String, Object> getAll(FilterWrapper filter, Integer start, Integer limit, SortWrapper sort) {

        Map<String, Object> map = new HashMap<>();
        map.put("list", getList(filter, start, limit, sort));
        map.put("total", getCount(filter));
        return map;
    }

    public boolean checkBranchInserted(FilterWrapper filterWrapper) {
        if (filterWrapper != null && filterWrapper.getFilters() != null) {
            for (Filter filter : filterWrapper.getFilters()) {
                if (filter.getProperty().equals("branch.brhCode")) {
                    return true;
                }
            }
        }
        return false;
    }

    public List<DrmdLetter> getList(FilterWrapper filterWrapper, Integer start, Integer limit, SortWrapper sort) {
        Boolean branchFlag = checkBranchInserted(filterWrapper);
        if (branchFlag) {
            TypedQuery createQuery = em.createQuery(getQuery(filterWrapper, sort));

            List<DrmdLetter> drmdLetterList = new ArrayList<>();
            if (start != null && limit != null) {
                drmdLetterList = createQuery.setFirstResult(start).setMaxResults(limit).getResultList();
            }
            if (start == null && limit != null) {
                drmdLetterList = createQuery.setMaxResults(limit).getResultList();
            }
            if (start != null && limit == null) {
                drmdLetterList = createQuery.setFirstResult(start).getResultList();
            }
            if (start == null && limit == null) {
                drmdLetterList = createQuery.getResultList();
            }

            return drmdLetterList;
        } else {
            return null;
        }

    }

    public Integer getCount(FilterWrapper filter) {
        Integer qcount = 0;
        Boolean branchFlag = checkBranchInserted(filter);
        if (branchFlag) {
            TypedQuery createQuery = em.createQuery(getQuery(filter, null));
            qcount = createQuery.getResultList().size();
        }
        return qcount;
    }

    private CriteriaQuery getQuery(FilterWrapper filterWrapper, SortWrapper sortWrapper) {
        try {
            CriteriaBuilder criteriaBuilder = em.getCriteriaBuilder();
            CriteriaQuery criteriaQuery = criteriaBuilder.createQuery();
            Root<DrmdLetter> drmdLetterFrom = criteriaQuery.from(DrmdLetter.class);
            List<Predicate> predicates = new ArrayList<Predicate>();
            Metamodel metamodel = em.getMetamodel();
            EntityType<DrmdLetter> drmdLetterEntityType = metamodel.entity(DrmdLetter.class);
            if (filterWrapper != null && filterWrapper.getFilters() != null) {
                for (Filter filter : filterWrapper.getFilters()) {

                    Object value = filter.getValue();
                    String field = filter.getProperty();
                    Filter.Operator operator = filter.getOperator();
                    String[] f = field.split("\\.");
                    Predicate predicate = null;
                    switch (operator) {

                        case EQUAL:

                            if ("price".equals(field)) {
                                Expression<Long> expression = criteriaBuilder.sum(drmdLetterFrom.get(drmdLetterEntityType.getDeclaredSingularAttribute("letterPrice1", Long.class)),
                                        drmdLetterFrom.get(drmdLetterEntityType.getDeclaredSingularAttribute("letterPrice2", Long.class)));
                                predicate = criteriaBuilder.equal(expression, value);
                            } else if ("letterDate".equals(field)) {
                                Date letterDate = new Date(Long.valueOf(value.toString()));
                                String letterDateString = DateUtils.format(letterDate, "yyyyMMdd");
                                predicate = criteriaBuilder.equal(drmdLetterFrom.get(drmdLetterEntityType.getDeclaredSingularAttribute("letterDate", String.class)), letterDateString);
                            } else {
                                javax.persistence.criteria.Path path = drmdLetterFrom.get(f[0]);
                                for (int j = 1; j < f.length; j++) {
                                    path = path.get(f[j]);
                                }
                                predicate = criteriaBuilder.equal(path, value);
                            }

                            predicates.add(predicate);
                            break;

                        case LIKE:
                            javax.persistence.criteria.Path path = drmdLetterFrom.get(f[0]);
//                            if ("reasonCodeName".equals(field)) {
//
//                                path = drmdLetterFrom.get("nrCheqReasonCode");
//
//                                predicates.add(
//                                        criteriaBuilder.or(
//                                                criteriaBuilder.like(path, value.toString()),
//                                                criteriaBuilder.like(drmdLetterFrom.get(drmdLetterEntityType.getDeclaredSingularAttribute("nrCheqReasonDesc", String.class)), value.toString())
//                                        )
//                                );
//                            } else {
                            predicates.add(criteriaBuilder.like(drmdLetterFrom.get(drmdLetterEntityType.getDeclaredSingularAttribute(field, String.class)), "%" + value + "%"));
//                            }
                            break;
                        default:
                            break;
                    }
                }

//////////////////////////////////////////////////////////////////////////////////////                
                String field = "orderPays.orpStat";
                String[] f = field.split("\\.");
                javax.persistence.criteria.Path p = drmdLetterFrom.get(f[0]);
                for (int j = 1; j < f.length; j++) {
                    p = p.get(f[j]);
                }
                Predicate predicate = criteriaBuilder.notEqual(p, "1");
                predicates.add(predicate);
////////////////////////////////////////////////////////////////////////////////////////
                
                
                criteriaQuery.where(predicates.toArray(new Predicate[]{}));
            }

            if (sortWrapper != null) {
                List<Order> orders = new ArrayList<>();
                for (Sort sortSet : sortWrapper.getSortSet()) {
                    Order order = null;
                    String[] sortProperties = sortSet.getProperty().split("\\.");

                    javax.persistence.criteria.Path path = drmdLetterFrom.get(sortProperties[0]);
                    for (int j = 1; j < sortProperties.length; j++) {
                        path = path.get(sortProperties[j]);
                    }
                    if (sortProperties.length > 0) {
                        if (sortSet.getDirection().getName().equals(Sort.Direction.DESC.getName())) {
                            order = criteriaBuilder.desc(drmdLetterFrom.get(sortProperties[0]));
                        } else {
                            order = criteriaBuilder.asc(drmdLetterFrom.get(sortProperties[0]));
                        }
                    }
                    orders.add(order);
                }

                if (!orders.isEmpty()) {
                    criteriaQuery.orderBy(orders);
                }
            }

            criteriaQuery.select(drmdLetterFrom);
            return criteriaQuery;

        } catch (Exception e) {
            return null;
        }
    }
}
