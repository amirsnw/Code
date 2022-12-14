/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package ir.tamin.incomeBank.service.baseinfo;

import ir.tamin.framework.ws.rest.json.Filter;
import ir.tamin.framework.ws.rest.json.FilterWrapper;
import ir.tamin.framework.ws.rest.json.SortWrapper;
import ir.tamin.incomeBank.model.baseinfo.Workshop;
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
import javax.persistence.criteria.Predicate;
import javax.persistence.criteria.Root;
import javax.persistence.metamodel.EntityType;
import javax.persistence.metamodel.Metamodel;

/**
 *
 * @author e_shoghi
 */
@Stateless
public class WorkshopService {

    @Inject
    private EntityManager em;

    public Map<String, Object> getAll(FilterWrapper filterWrapper, Integer start, Integer limit, SortWrapper sortWrapper) {
        Map<String, Object> map = new HashMap<>();
        map.put("list", getList(filterWrapper, start, limit, sortWrapper));
        map.put("total", getCount(filterWrapper));
        return map;
    }

    public List<Workshop> getList(FilterWrapper filterWrapper, Integer start, Integer limit, SortWrapper sort) {
        TypedQuery createQuery = em.createQuery(getQuery(filterWrapper, sort));

        List<Workshop> workshops = new ArrayList<>();
        if (start != null && limit != null) {
            workshops = createQuery.setFirstResult(start).setMaxResults(limit).getResultList();
        }
        if (start == null && limit != null) {
            workshops = createQuery.setMaxResults(limit).getResultList();
        }
        if (start != null && limit == null) {
            workshops = createQuery.setFirstResult(start).getResultList();
        }
        if (start == null && limit == null) {
            workshops = createQuery.getResultList();
        }

        return workshops;
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
            Root<Workshop> workshoFrom = criteriaQuery.from(Workshop.class);
            Metamodel m = em.getMetamodel();
            EntityType<Workshop> workshopEntityType = m.entity(Workshop.class);
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
                            predicates.add(criteriaBuilder.like(workshoFrom.get(workshopEntityType.getDeclaredSingularAttribute(field, String.class)), "%" + value + "%"));
                            break;
                        case EQUAL:
                            javax.persistence.criteria.Path path = workshoFrom.get(f[0]);
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

            criteriaQuery.select(workshoFrom);
            return criteriaQuery;

        } catch (Exception e) {
            return null;
        }
    }

    public Workshop get(String code) {
        Workshop workshop = em.find(Workshop.class, code);
        return workshop;
    }
}
