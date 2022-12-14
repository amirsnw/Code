/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package ir.tamin.incomeBank.service.daramadBank;

import ir.tamin.incomeBank.model.daramadBank.ClmOrdpay;
import ir.tamin.incomeBank.model.daramadBank.ClmOrdpayPK;
import ir.tamin.incomeBank.model.daramadBank.enums.OrpStatEnum;
import ir.tamin.incomeBank.model.daramadBank.enums.StatCodeEnum;
import ir.tamin.incomeBank.model.identityManager.User;
import ir.tamin.incomeBank.service.identityManager.UserBean;
import ir.tamin.framework.cdi.util.MessageBundle;
import ir.tamin.framework.core.util.Bundle;
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

/**
 *
 * @author m_salami
 */
@Stateless
public class ClmOrdpayService {

    @Inject
    private EntityManager em;
    @Inject
    UserBean userBean;
    @Inject
    @MessageBundle
    Bundle messageBundle;

    public ClmOrdpay get(ClmOrdpayPK clmOrdpayPK) throws WebApplicationException {
        ClmOrdpay clmOrdpay = em.find(ClmOrdpay.class, clmOrdpayPK);
        return clmOrdpay;
    }

    public Map<String, Object> getAll(FilterWrapper filter, Integer start, Integer limit, SortWrapper sort) {

        Map<String, Object> map = new HashMap<>();
        map.put("list", getList(filter, start, limit, sort));
        map.put("total", getCount(filter));
        return map;
    }

    public List<ClmOrdpay> getList(FilterWrapper filterWrapper, Integer start, Integer limit, SortWrapper sort) {

        TypedQuery createQuery = em.createQuery(getQuery(filterWrapper, sort));

        List<ClmOrdpay> bankList = new ArrayList<>();
        if (start != null && limit != null) {
            bankList = createQuery.setFirstResult(start).setMaxResults(limit).getResultList();
        }
        if (start == null && limit != null) {
            bankList = createQuery.setMaxResults(limit).getResultList();
        }
        if (start != null && limit == null) {
            bankList = createQuery.setFirstResult(start).getResultList();
        }
        if (start == null && limit == null) {
            bankList = createQuery.getResultList();
        }

        return bankList;
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
            Root<ClmOrdpay> clmOrdpayFrom = criteriaQuery.from(ClmOrdpay.class);
            List<Predicate> predicates = new ArrayList<Predicate>();
            Metamodel metamodel = em.getMetamodel();
            EntityType<ClmOrdpay> clmOrdpayEntityType = metamodel.entity(ClmOrdpay.class);
            if (filterWrapper != null && filterWrapper.getFilters() != null) {
                for (Filter filter : filterWrapper.getFilters()) {

                    Object value = filter.getValue();
                    String field = filter.getProperty();
                    Filter.Operator operator = filter.getOperator();
                    String[] f = field.split("\\.");

                    Predicate predicate = null;
                    switch (operator) {

                        case EQUAL:
                            javax.persistence.criteria.Path path = clmOrdpayFrom.get(f[0]);
                            for (int j = 1; j < f.length; j++) {
                                path = path.get(f[j]);
                            }
                            predicate = criteriaBuilder.equal(path, value);
                            predicates.add(predicate);
                            break;
                        case LIKE:

                            predicates.add(criteriaBuilder.like(clmOrdpayFrom.get(clmOrdpayEntityType.getDeclaredSingularAttribute(field, String.class)), "%" + value + "%"));

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

                    javax.persistence.criteria.Path path = clmOrdpayFrom.get(sortProperties[0]);
                    for (int j = 1; j < sortProperties.length; j++) {
                        path = path.get(sortProperties[j]);
                    }
                    if (sortProperties.length > 0) {
                        if (sortSet.getDirection().getName().equals(Sort.Direction.DESC.getName())) {
                            order = criteriaBuilder.desc(clmOrdpayFrom.get(sortProperties[0]));
                        } else {
                            order = criteriaBuilder.asc(clmOrdpayFrom.get(sortProperties[0]));
                        }
                    }
                    orders.add(order);
                }

                if (!orders.isEmpty()) {
                    criteriaQuery.orderBy(orders);
                }
            }

            criteriaQuery.select(clmOrdpayFrom);
            return criteriaQuery;

        } catch (Exception e) {
            return null;
        }
    }

    //package 
    public void update(ClmOrdpay clmOrdpay, User user) {
        try {
            em.merge(clmOrdpay);
            em.flush();
        } catch (Exception e) {
            Logger.getLogger(ClmOrdpayService.class.getName()).log(Level.SEVERE, null, e);
            Response response = Response.status(Response.Status.INTERNAL_SERVER_ERROR).entity(messageBundle.getProperty("coreaccount.payhead.EXC_IN_SAVE_PAYINFO")).build();
            throw new WebApplicationException(response);
        }
    }

    //package
    public void save(ClmOrdpay clmOrdpay, User user) {
        try {
            em.persist(clmOrdpay);
            em.flush();
        } catch (Exception e) {
            Logger.getLogger(ClmOrdpayService.class.getName()).log(Level.SEVERE, null, e);
            Response response = Response.status(Response.Status.INTERNAL_SERVER_ERROR).entity(messageBundle.getProperty("coreaccount.payhead.EXC_IN_SAVE_PAYINFO")).build();
            throw new WebApplicationException(response);
        }
    }

    public boolean IsRevoked(String ordOrdNo, String ordRow, String brchCode) {//آیا برگ پرداخت ابطالی است؟
        ClmOrdpay clmOrdpay = get(new ClmOrdpayPK(ordOrdNo, ordRow, brchCode));
        if (clmOrdpay != null && clmOrdpay.getOrpStat() != null && clmOrdpay.getOrpStat().equals(OrpStatEnum.EBTALI.getCode())) {
            return true;
        }
        return false;
    }

}
