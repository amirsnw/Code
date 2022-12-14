/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package ir.tamin.incomeBank.service.baseinfo;

import ir.tamin.incomeBank.model.baseinfo.BankErrorCode;
import ir.tamin.incomeBank.model.centralPayment.GlIndividualPay;
import ir.tamin.incomeBank.model.identityManager.User;
import ir.tamin.framework.cdi.util.MessageBundle;
import ir.tamin.framework.core.util.Bundle;
import ir.tamin.framework.ws.rest.json.Filter;
import ir.tamin.framework.ws.rest.json.FilterWrapper;
import ir.tamin.framework.ws.rest.json.Sort;
import ir.tamin.framework.ws.rest.json.SortWrapper;
import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.Date;
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
 * @author f_fotuhi
 */
@Stateless
public class BankErrorCodeService {

    @Inject
    private EntityManager entityManager;

    @Inject
    @MessageBundle
    Bundle messageBundle;

    public BankErrorCode get(BigDecimal errorId) {
        BankErrorCode bankErrorCode = new BankErrorCode(errorId);
        bankErrorCode = entityManager.find(BankErrorCode.class, errorId);
        return bankErrorCode;
    }

    public Map<String, Object> getAll(FilterWrapper filterWrapper, Integer start, Integer limit, SortWrapper sortWrapper) {
        Map<String, Object> map = new HashMap<>();
        map.put("list", getList(filterWrapper, start, limit, sortWrapper));
        map.put("total", getCount(filterWrapper));
        return map;
    }

    public List<BankErrorCode> getList(FilterWrapper filterWrapper, Integer start, Integer limit, SortWrapper sort) {
        TypedQuery createQuery = entityManager.createQuery(getQuery(filterWrapper, sort));

        List<BankErrorCode> bankErrorList = new ArrayList<>();
        if (start != null && limit != null) {
            bankErrorList = createQuery.setFirstResult(start).setMaxResults(limit).getResultList();
        }
        if (start == null && limit != null) {
            bankErrorList = createQuery.setMaxResults(limit).getResultList();
        }
        if (start != null && limit == null) {
            bankErrorList = createQuery.setFirstResult(start).getResultList();
        }
        if (start == null && limit == null) {
            bankErrorList = createQuery.getResultList();
        }

        return bankErrorList;
    }

    public Integer getCount(FilterWrapper filter) {
        Integer qcount = 0;
        TypedQuery createQuery = entityManager.createQuery(getQuery(filter, null));
        qcount = createQuery.getResultList().size();
        return qcount;
    }

    private CriteriaQuery getQuery(FilterWrapper filterWrapper, SortWrapper sortWrapper) {
        try {

            CriteriaBuilder criteriaBuilder = entityManager.getCriteriaBuilder();
            CriteriaQuery criteriaQuery = criteriaBuilder.createQuery();
            Root<BankErrorCode> BankErrorCodeFrom = criteriaQuery.from(BankErrorCode.class);
            Metamodel metamodel = entityManager.getMetamodel();
            EntityType<BankErrorCode> BankErrorCodeEntityType = metamodel.entity(BankErrorCode.class);

            List<Predicate> predicates = new ArrayList<>();

            if (filterWrapper != null && filterWrapper.getFilters() != null) {
                for (Filter filter : filterWrapper.getFilters()) {

                    String field = filter.getProperty();
                    Object value = filter.getValue();
                    Filter.Operator operator = filter.getOperator();
                    String[] f = field.split("\\.");
                    Predicate predicate = null;
                    javax.persistence.criteria.Path path = null;

                    switch (operator) {
                        case EQUAL:
                            path = BankErrorCodeFrom.get(f[0]);
                            for (int j = 1; j < f.length; j++) {
                                path = path.get(f[j]);
                            }
                            predicate = criteriaBuilder.equal(path, value);
                            predicates.add(predicate);
                            break;
                        case LIKE:
                            if ("errorCode".equals(field)) {

                                path = path.get("errorCode");

                                predicates.add(
                                        criteriaBuilder.or(
                                                criteriaBuilder.like(path, value.toString()),
                                                criteriaBuilder.like(BankErrorCodeFrom.get(BankErrorCodeEntityType.getDeclaredSingularAttribute("errorDesc", String.class)), value.toString())
                                        )
                                );
                            } else {
                                predicates.add(criteriaBuilder.like(BankErrorCodeFrom.get(BankErrorCodeEntityType.getDeclaredSingularAttribute(field, String.class)), "%" + value + "%"));
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

                    javax.persistence.criteria.Path path = BankErrorCodeFrom.get(sortProperties[0]);
                    for (int j = 1; j < sortProperties.length; j++) {
                        path = path.get(sortProperties[j]);
                    }
                    if (sortProperties.length == 1) {
                        if (sortSet.getDirection().getName().equals(Sort.Direction.DESC.getName())) {
                            order = criteriaBuilder.desc(BankErrorCodeFrom.get(sortProperties[0]));
                        } else {
                            order = criteriaBuilder.asc(BankErrorCodeFrom.get(sortProperties[0]));
                        }
                    }
                    orders.add(order);
                }

                if (!orders.isEmpty()) {
                    criteriaQuery.orderBy(orders);
                }
            }
            criteriaQuery.select(BankErrorCodeFrom);
            return criteriaQuery;
        } catch (Exception e) {
            Logger.getLogger(BankErrorCodeService.class.getName()).log(Level.SEVERE, e.getMessage(), e);
            return null;
        }
    }

    public String delete(BankErrorCode bankErrorCode, User user) {
        String deleteMessage = "";
        try {
            BankErrorCode tempBankErrorCode = new BankErrorCode();
            tempBankErrorCode = get(bankErrorCode.getErrorId());
            entityManager.remove(tempBankErrorCode);
            deleteMessage = "حذف با موفقیت انجام شد";
            return deleteMessage;
        } catch (Exception ex) {
            Logger.getLogger(BankErrorCode.class.getName()).log(Level.SEVERE, null, ex);
            Response response = Response.status(Response.Status.INTERNAL_SERVER_ERROR).entity(messageBundle.getProperty("coreAccount.common.EXC_UNKNOWN_ERROR")).build();
            throw new WebApplicationException(response);

        }

    }

    public String save(BankErrorCode bankErrorCode, User user) {

        bankErrorCode.setCreateUser(user.getUserName());
        bankErrorCode.setCreateDate(new Date());
        bankErrorCode.setUpdateUser(user.getUserName());
        bankErrorCode.setUpdateDate(new Date());

        try {
            entityManager.persist(bankErrorCode);
            String saveMessage = "ثبت با موفقیت انجام شد";
            return saveMessage;
        } catch (Exception ex) {
            Logger.getLogger(BankErrorCode.class.getName()).log(Level.SEVERE, ex.getMessage(), ex);
            Response response = Response.status(Response.Status.INTERNAL_SERVER_ERROR).entity(messageBundle.getProperty("coreAccount.common.EXC_UNKNOWN_ERROR")).build();
            throw new WebApplicationException(response);
        }

    }

    public String update(BankErrorCode bankErrorCode, User user) {

        BankErrorCode oldBankError = get(bankErrorCode.getErrorId());
        bankErrorCode.setCreateDate(oldBankError.getCreateDate());
        bankErrorCode.setCreateUser(oldBankError.getCreateUser());
        bankErrorCode.setUpdateUser(user.getUserName());
        bankErrorCode.setUpdateDate(new Date());

        try {

            entityManager.merge(bankErrorCode);
            String saveMessage = "ویرایش با موفقیت انجام شد";
            return saveMessage;
        } catch (Exception ex) {
            Logger.getLogger(BankErrorCode.class
                    .getName()).log(Level.SEVERE, null, ex);
            Response response = Response.status(Response.Status.NOT_ACCEPTABLE).entity(messageBundle.getProperty("coreAccount.common.EXC_UNKNOWN_ERROR")).build();

            throw new WebApplicationException(response);
        }
    }

}
