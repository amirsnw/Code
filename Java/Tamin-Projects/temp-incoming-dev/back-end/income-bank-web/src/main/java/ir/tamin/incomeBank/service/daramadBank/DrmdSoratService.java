/**
 *
 * @author h_riazat
 */
package ir.tamin.incomeBank.service.daramadBank;

import ir.tamin.framework.ws.rest.json.Filter;
import ir.tamin.framework.ws.rest.json.FilterWrapper;
import ir.tamin.framework.ws.rest.json.Sort;
import ir.tamin.framework.ws.rest.json.SortWrapper;
import ir.tamin.incomeBank.model.daramadBank.DrmdSorat;
import ir.tamin.incomeBank.model.daramadBank.DrmdSoratPK;
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
import javax.ws.rs.WebApplicationException;
import javax.ws.rs.core.Response;
import ir.tamin.framework.cdi.util.MessageBundle;
import ir.tamin.framework.core.util.Bundle;

@Stateless
public class DrmdSoratService {

    @Inject
    private EntityManager entityManager;

    @Inject
    @MessageBundle
    Bundle messageBundle;

    public DrmdSorat get(DrmdSoratPK drmdSoratPK) {
        DrmdSorat drmdSorat = entityManager.find(DrmdSorat.class, drmdSoratPK);
        return drmdSorat;
    }

    public Map<String, Object> getAll(FilterWrapper filterWrapper, Integer start, Integer limit, SortWrapper sortWrapper) {
        Map<String, Object> map = new HashMap<>();
        List<DrmdSorat> drmdSorat = new ArrayList<>();
        drmdSorat = getList(filterWrapper, start, limit, sortWrapper);
        map.put("list", drmdSorat);
        List<DrmdSorat> drmdSoratAll = getListAll(filterWrapper);
        Integer count = getCount(drmdSoratAll);
        map.put("total", count);
        return map;
    }

    private List<DrmdSorat> getList(FilterWrapper filter, Integer start, Integer limit, SortWrapper sort) {
        TypedQuery createQuery = entityManager.createQuery(getQuery(filter, sort));
        List<DrmdSorat> drmdSorat = new ArrayList<>();
        if (start != null && limit != null) {
            drmdSorat = createQuery.setFirstResult(start).setMaxResults(limit).getResultList();
        } else if (start == null && limit != null) {
            drmdSorat = createQuery.setMaxResults(limit).getResultList();
        } else if (start != null && limit == null) {
            drmdSorat = createQuery.setFirstResult(start).getResultList();
        } else if (start == null && limit == null) {
            drmdSorat = createQuery.getResultList();
        }
        return drmdSorat;
    }

    private List<DrmdSorat> getListAll(FilterWrapper filter) {
        TypedQuery createQuery = entityManager.createQuery(getQuery(filter, null));
        List<DrmdSorat> drmdSoratAll = createQuery.getResultList();
        return drmdSoratAll;
    }

    private Integer getCount(List<DrmdSorat> drmdSoratAll) {
        Integer count = 0;
        count = drmdSoratAll.size();
        return count;
    }

    private CriteriaQuery getQuery(FilterWrapper filterWrapper, SortWrapper sortWrapper) {
        try {
            CriteriaBuilder criteriaBuilder = entityManager.getCriteriaBuilder();
            CriteriaQuery criteriaQuery = criteriaBuilder.createQuery();
            Root<DrmdSorat> drmdSoratFrom = criteriaQuery.from(DrmdSorat.class);
            List<Predicate> predicates = new ArrayList<>();
            Metamodel metamodel = entityManager.getMetamodel();
            EntityType<DrmdSorat> drmdSoratEntityType = metamodel.entity(DrmdSorat.class);
            if (filterWrapper != null && filterWrapper.getFilters() != null) {
                for (Filter filter : filterWrapper.getFilters()) {
                    String field = filter.getProperty();
                    Object value = filter.getValue();
                    if (field.toUpperCase().contains("FROM")) {
                        field = field.replace("from", "");
                    }
                    Filter.Operator operator = filter.getOperator();
                    String[] f = field.split("\\.");
                    Predicate predicate = null;
                    switch (operator) {
                        case EQUAL:
                            javax.persistence.criteria.Path path = drmdSoratFrom.get(f[0]);
                            for (int j = 1; j < f.length; j++) {
                                path = path.get(f[j]);
                            }
                            predicate = criteriaBuilder.equal(path, value);
                            predicates.add(predicate);
                            break;
                        case LIKE:
                            predicates.add(criteriaBuilder.like(drmdSoratFrom.get(drmdSoratEntityType.getDeclaredSingularAttribute(field, String.class)), "%" + value + "%"));
                            break;
                        case AFTER:
                            path = drmdSoratFrom.get(f[0]);
                            for (int j = 1; j < f.length; j++) {
                                path = path.get(f[j]);
                            }
                            predicates.add(
                                    criteriaBuilder.greaterThanOrEqualTo(path, (Comparable) value));
                            break;
                        case BEFORE:
                            path = drmdSoratFrom.get(f[0]);
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
                        order = criteriaBuilder.desc(drmdSoratFrom.get(sortProperties[0]));
                    } else {
                        order = criteriaBuilder.asc(drmdSoratFrom.get(sortProperties[0]));
                    }

                    orders.add(order);
                }
                if (!orders.isEmpty()) {
                    criteriaQuery.orderBy(orders);
                }
            }
            criteriaQuery.select(drmdSoratFrom);
            return criteriaQuery;
        } catch (Exception ex) {
            Logger.getLogger(DrmdSoratService.class.getName()).log(Level.SEVERE, ex.getMessage(), ex);
            return null;
        }
    }

    public Response editBranchDesc(DrmdSorat drmdSorat) {
        try {
            entityManager.merge(drmdSorat);
            Response response = Response.status(Response.Status.ACCEPTED).entity(messageBundle.getProperty("coreaccount.daramadbank.UPDATE_SUCCESSFULLY_DESC")).build();
            return response;
        } catch (Exception ex) {
            Logger.getLogger(DrmdSorat.class.getName()).log(Level.SEVERE, null, ex);
            Response response = Response.status(Response.Status.NOT_ACCEPTABLE).entity(messageBundle.getProperty("coreaccount.daramadbank.EXC_UNKNOWN_ERROR")).build();
            throw new WebApplicationException(response);
        }
    }

}
