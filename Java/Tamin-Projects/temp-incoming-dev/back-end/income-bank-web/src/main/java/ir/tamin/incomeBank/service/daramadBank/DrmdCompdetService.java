/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package ir.tamin.incomeBank.service.daramadBank;

import ir.tamin.incomeBank.model.daramadBank.DrmdBankrcv;
import ir.tamin.incomeBank.model.daramadBank.DrmdCompdet;
import java.math.BigInteger;
import ir.tamin.incomeBank.service.identityManager.UserBean;
import ir.tamin.incomeBank.service.jdbc.StoredProcedure;
import ir.tamin.incomeBank.util.ServiceUtils;
import ir.tamin.framework.cdi.util.MessageBundle;
import ir.tamin.framework.core.util.Bundle;
import ir.tamin.framework.ws.rest.json.Filter;
import ir.tamin.framework.ws.rest.json.FilterWrapper;
import ir.tamin.framework.ws.rest.json.Sort;
import ir.tamin.framework.ws.rest.json.SortWrapper;
import java.sql.SQLException;
import java.sql.Types;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.HashSet;
import java.util.List;
import java.util.Map;
import java.util.logging.Level;
import java.util.logging.Logger;
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
public class DrmdCompdetService {

    @Inject
    private EntityManager em;
    @Inject
    UserBean userBean;
    @Inject
    ServiceUtils serviceUtils;
    @Inject
    private StoredProcedure procedure;
    @Inject
    @MessageBundle
    Bundle messageBundle;

    public Map<String, Object> getAll(FilterWrapper filter, Integer start, Integer limit, SortWrapper sort) {

        Map<String, Object> map = new HashMap<>();
        map.put("list", getList(filter, start, limit, sort));
        map.put("total", getCount(filter));
        return map;
    }

    public List<DrmdCompdet> getList(FilterWrapper filterWrapper, Integer start, Integer limit, SortWrapper sort) {

        TypedQuery createQuery = em.createQuery(getQuery(filterWrapper, sort));

        List<DrmdCompdet> drmdCompdetList = new ArrayList<>();
        if (start != null && limit != null) {
            drmdCompdetList = createQuery.setFirstResult(start).setMaxResults(limit).getResultList();
        }
        if (start == null && limit != null) {
            drmdCompdetList = createQuery.setMaxResults(limit).getResultList();
        }
        if (start != null && limit == null) {
            drmdCompdetList = createQuery.setFirstResult(start).getResultList();
        }
        if (start == null && limit == null) {
            drmdCompdetList = createQuery.getResultList();
        }
        if (drmdCompdetList.size() > 0) {
            List<DrmdCompdet> drmdCompdetNolimit = new ArrayList<>();
            TypedQuery createQueryNoLimit = em.createQuery(getQuery(filterWrapper, null));
            drmdCompdetNolimit = createQueryNoLimit.getResultList();
            Long sumDebt = 0L;
            Long sumCredit = 0L;
            Long sumBankRcvPrice = 0L;
            BigInteger sumMoghayerat = BigInteger.ZERO;

            for (DrmdCompdet item : drmdCompdetNolimit) {

                sumDebt += item.getCfDebit();
                sumCredit += item.getCfCredit();
                sumMoghayerat = sumMoghayerat.add(item.getMoghRadif());
            }
            drmdCompdetList.get(0).setSumDebt(sumDebt);
            drmdCompdetList.get(0).setSumCredit(sumCredit);
            drmdCompdetList.get(0).setSumMoghayerat(sumMoghayerat);
            sumBankRcvPrice = getSumBankRcv(filterWrapper);
            drmdCompdetList.get(0).setSumBankRcvPrice(sumBankRcvPrice);
        }

        return drmdCompdetList;
    }

    private Long getSumBankRcv(FilterWrapper filterWrapper) {

        CriteriaBuilder criteriaBuilder = em.getCriteriaBuilder();
        CriteriaQuery<Long> criteriaQuery = criteriaBuilder.createQuery(Long.class);
        Root<DrmdBankrcv> rootClass = criteriaQuery.from(DrmdBankrcv.class);
        List<Predicate> predicates = new ArrayList<>();

        if (filterWrapper != null && filterWrapper.getFilters() != null) {
            for (Filter filter : filterWrapper.getFilters()) {

                Object value = filter.getValue();
                String field = filter.getProperty();
                Filter.Operator operator = filter.getOperator();
                if (field.equals("compMdate")) {
                    field = "bankrcvDatcard";
                }
                if (field.equals("brchCode")) {
                    field = "drmdBankrcvPK.brchCode";
                }
                String[] f = field.split("\\.");
                Predicate predicate = null;

                switch (operator) {

                    case EQUAL:
                        if (field.equals("bankrcvDatcard") || field.equals("drmdBankrcvPK.brchCode")) {
                            javax.persistence.criteria.Path path = rootClass.get(f[0]);
                            for (int j = 1; j < f.length; j++) {
                                path = path.get(f[j]);
                            }
                            predicate = criteriaBuilder.equal(path, value);
                            predicates.add(predicate);
                        }
                        break;
                    default:
                        break;
                }
            }
            // criteriaQuery.where(predicates.toArray(new Predicate[]{}));
        }

        criteriaQuery.where(predicates.toArray(new Predicate[]{}));
        criteriaQuery.select(criteriaBuilder.sum(rootClass.<Long>get("bankrcvPrice")));

        Long sum = em.createQuery(criteriaQuery).getSingleResult();

        return sum;

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
            Root<DrmdCompdet> drmdCompdetFrom = criteriaQuery.from(DrmdCompdet.class);
            List<Predicate> predicates = new ArrayList<Predicate>();
            Metamodel metamodel = em.getMetamodel();
            EntityType<DrmdCompdet> cheqReasonEntityType = metamodel.entity(DrmdCompdet.class);
            if (filterWrapper != null && filterWrapper.getFilters() != null) {
                for (Filter filter : filterWrapper.getFilters()) {

                    Object value = filter.getValue();
                    String field = filter.getProperty();
                    Filter.Operator operator = filter.getOperator();
                    String[] f = field.split("\\.");
                    Predicate predicate = null;
                    switch (operator) {

                        case EQUAL:
                            javax.persistence.criteria.Path path = drmdCompdetFrom.get(f[0]);
                            for (int j = 1; j < f.length; j++) {
                                path = path.get(f[j]);
                            }
                            predicate = criteriaBuilder.equal(path, value);
                            predicates.add(predicate);
                            break;
                        case LIKE:
//                            if ("reasonCodeName".equals(field)) {
//
//                                path = drmdCompdetFrom.get("nrCheqReasonCode");
//
//                                predicates.add(
//                                        criteriaBuilder.or(
//                                                criteriaBuilder.like(path, value.toString()),
//                                                criteriaBuilder.like(drmdCompdetFrom.get(cheqReasonEntityType.getDeclaredSingularAttribute("nrCheqReasonDesc", String.class)), value.toString())
//                                        )
//                                );
//                            } else {
                            predicates.add(criteriaBuilder.like(drmdCompdetFrom.get(cheqReasonEntityType.getDeclaredSingularAttribute(field, String.class)), "%" + value + "%"));
                            //}
                            break;
                        default:
                            break;
                    }
                }
                criteriaQuery.where(predicates.toArray(new Predicate[]{}));
            }
            List<Order> orders = new ArrayList<>();

            Sort sort0 = new Sort();
            sort0.setProperty("compRow");
            sort0.setDirection(Sort.Direction.ASC);

            Sort sort1 = new Sort();
            sort1.setProperty("cfRow");
            sort1.setDirection(Sort.Direction.ASC);

            Sort sort2 = new Sort();
            sort2.setProperty("bankRadif");
            sort2.setDirection(Sort.Direction.ASC);

            List<Sort> sorts = new ArrayList<>();
            sorts.add(sort0);
            sorts.add(sort1);
            sorts.add(sort2);

            for (int i = 0; i <= 2; i++) {
                Order order = null;
                Sort sortSet = sorts.get(i);
                String[] sortProperties = sortSet.getProperty().split("\\.");
                javax.persistence.criteria.Path path = drmdCompdetFrom.get(sortProperties[0]);
                for (int j = 1; j < sortProperties.length; j++) {
                    path = path.get(sortProperties[j]);
                }
                if (sortProperties.length > 0) {
                    if (sortSet.getDirection().getName().equals(Sort.Direction.DESC.getName())) {
                        order = criteriaBuilder.desc(drmdCompdetFrom.get(sortProperties[0]));
                    } else {
                        order = criteriaBuilder.asc(drmdCompdetFrom.get(sortProperties[0]));
                    }
                }
                orders.add(order);
            }
            if (!orders.isEmpty()) {
                criteriaQuery.orderBy(orders);
            }

            if (sortWrapper != null) {
                for (Sort sortSet : sortWrapper.getSortSet()) {
                    Order order = null;
                    String[] sortProperties = sortSet.getProperty().split("\\.");

                    javax.persistence.criteria.Path path = drmdCompdetFrom.get(sortProperties[0]);
                    for (int j = 1; j < sortProperties.length; j++) {
                        path = path.get(sortProperties[j]);
                    }
                    if (sortProperties.length > 0) {
                        if (sortSet.getDirection().getName().equals(Sort.Direction.DESC.getName())) {
                            order = criteriaBuilder.desc(drmdCompdetFrom.get(sortProperties[0]));
                        } else {
                            order = criteriaBuilder.asc(drmdCompdetFrom.get(sortProperties[0]));
                        }
                    }
                    orders.add(order);
                }

                if (!orders.isEmpty()) {
                    criteriaQuery.orderBy(orders);
                }
            }

            criteriaQuery.select(drmdCompdetFrom);
            return criteriaQuery;
        } catch (Exception e) {
            return null;
        }
    }

    public Character ProcessCompare(FilterWrapper filterWrapper) {
        String brchCode = null;
        String yearMonth = null;
        Character result = null;

        if (filterWrapper != null && filterWrapper.getFilters() != null) {
            for (Filter filter : filterWrapper.getFilters()) {

                String field = filter.getProperty();
                if (field.contains("brchCode")) {
                    brchCode = filter.getValue();
                }
                if (field.contains("compMdate")) {
                    yearMonth = filter.getValue();
                }

            }
        }
        try {

            procedure.query("{?=call PCK_COMPARE.PROCESSCOMPARE(?,?)}");

            procedure.setOutParameter(1, Types.CHAR)
                    .setInParameter(2, brchCode)
                    .setInParameter(3, yearMonth);
            procedure.execute();
            result = procedure.getOutParameter(1).toString().charAt(0);
        } catch (SQLException sqlexc) {
            Response response = Response.status(Response.Status.INTERNAL_SERVER_ERROR).entity(sqlexc.getMessage()).build();
            throw new WebApplicationException(response);
        } catch (Exception exc) {
            Logger.getLogger(DrmdCardService.class.getName()).log(Level.SEVERE, null, exc);
            Response response = Response.status(Response.Status.INTERNAL_SERVER_ERROR).entity(messageBundle.getProperty("coreaccount.daramadbank.EXC_IN_PROCESS_COMPARE")).build();
            throw new WebApplicationException(response);
        }
        return result;
    }

    public boolean prcExtComDet(FilterWrapper filterWrapper) {
        String brchCode = null;
        String yearMonth = null;

        if (filterWrapper != null && filterWrapper.getFilters() != null) {
            for (Filter filter : filterWrapper.getFilters()) {

                String field = filter.getProperty();
                if (field.contains("brchCode")) {
                    brchCode = filter.getValue();
                }
                if (field.contains("compMdate")) {
                    yearMonth = filter.getValue();
                }
            }
        }
        try {

            procedure.query("{call PCK_COMPARE.PRCEXTCOMDET(?,?)}");

            procedure.setInParameter(1, brchCode)
                    .setInParameter(2, yearMonth);
            procedure.execute();
            return true;
        } catch (SQLException sqlexc) {
            Response response = Response.status(Response.Status.INTERNAL_SERVER_ERROR).entity(sqlexc.getMessage()).build();
            throw new WebApplicationException(response);
        } catch (Exception exc) {
            Logger.getLogger(DrmdCompdetService.class.getName()).log(Level.SEVERE, null, exc);
            Response response = Response.status(Response.Status.INTERNAL_SERVER_ERROR).entity(messageBundle.getProperty("coreaccount.daramadbank.EXC_IN_PROCESS_COMPARE")).build();
            throw new WebApplicationException(response);
        }
    }

    public Character beforeCheqSanad(FilterWrapper filterWrapper) {
        String brchCode = null;
        String yearMonth = null;
        Character result = null;

        if (filterWrapper != null && filterWrapper.getFilters() != null) {
            for (Filter filter : filterWrapper.getFilters()) {

                String field = filter.getProperty();
                if (field.contains("brchCode")) {
                    brchCode = filter.getValue();
                }
                if (field.contains("compMdate")) {
                    yearMonth = filter.getValue();
                }

            }
        }
        try {
            procedure.query("{?=call PCK_DrmdOperations.GET_beforcheqsanad(?,?)}");

            procedure.setOutParameter(1, Types.CHAR)
                    .setInParameter(2, brchCode)
                    .setInParameter(3, yearMonth);
            procedure.execute();
            result = procedure.getOutParameter(1).toString().charAt(0);
        } catch (SQLException sqlexc) {
            Response response = Response.status(Response.Status.INTERNAL_SERVER_ERROR).entity(sqlexc.getMessage()).build();
            throw new WebApplicationException(response);
        } catch (Exception exc) {
            Logger.getLogger(DrmdCardService.class.getName()).log(Level.SEVERE, null, exc);
            Response response = Response.status(Response.Status.INTERNAL_SERVER_ERROR).entity(messageBundle.getProperty("coreaccount.daramadbank.EXC_IN_PROCESS_COMPARE")).build();
            throw new WebApplicationException(response);
        }
        return result;
    }

    public boolean prcExtVouch(FilterWrapper filterWrapper) {
        String brchCode = null;
        String yearMonth = null;

        if (filterWrapper != null && filterWrapper.getFilters() != null) {
            for (Filter filter : filterWrapper.getFilters()) {

                String field = filter.getProperty();
                if (field.contains("brchCode")) {
                    brchCode = filter.getValue();
                }
                if (field.contains("compMdate")) {
                    yearMonth = filter.getValue();
                }
            }
        }
        try {

            procedure.query("{call PCK_COMPARE.PRCEXTVOUCH(?,?)}");

            procedure.setInParameter(1, brchCode)
                    .setInParameter(2, yearMonth);
            procedure.execute();
            return true;
        } catch (SQLException sqlexc) {
            Response response = Response.status(Response.Status.INTERNAL_SERVER_ERROR).entity(sqlexc.getMessage()).build();
            throw new WebApplicationException(response);
        } catch (Exception exc) {
            Logger.getLogger(DrmdCardService.class.getName()).log(Level.SEVERE, null, exc);
            Response response = Response.status(Response.Status.INTERNAL_SERVER_ERROR).entity(messageBundle.getProperty("coreaccount.daramadbank.EXC_IN_PROCESS_COMPARE")).build();
            throw new WebApplicationException(response);
        }
    }
}
