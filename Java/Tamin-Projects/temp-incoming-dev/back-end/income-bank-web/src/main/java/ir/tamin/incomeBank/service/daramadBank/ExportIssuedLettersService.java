/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package ir.tamin.incomeBank.service.daramadBank;

import ir.tamin.framework.cdi.util.MessageBundle;
import ir.tamin.framework.core.util.Bundle;
import ir.tamin.framework.ws.rest.json.Sort;
import ir.tamin.framework.ws.rest.json.SortWrapper;
import ir.tamin.incomeBank.model.daramadBank.DrmdLSanad;
import ir.tamin.incomeBank.model.daramadBank.DrmdLetter;
import ir.tamin.incomeBank.model.daramadBank.IssuedLetter;
import ir.tamin.incomeBank.model.daramadBank.IssuedLettersOfficeView;
import ir.tamin.incomeBank.model.daramadBank.Voucher;
import ir.tamin.incomeBank.model.identityManager.User;
import ir.tamin.incomeBank.service.identityManager.UserBean;
import ir.tamin.incomeBank.service.jdbc.StoredProcedure;
import ir.tamin.incomeBank.util.DateUtilsFramework;
import ir.tamin.incomeBank.ws.rest.json.Filter;
import ir.tamin.incomeBank.ws.rest.json.FilterWrapper;
import java.util.ArrayList;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.UUID;
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
import javax.ws.rs.WebApplicationException;
import javax.ws.rs.core.Response;
import javax.ws.rs.core.SecurityContext;
import org.apache.commons.lang3.StringUtils;
import org.slf4j.LoggerFactory;

/**
 *
 * @author e_shoghi
 */
@Stateless
public class ExportIssuedLettersService {

    @Inject
    private EntityManager em;
    @Inject
    private StoredProcedure procedure;
    private static final org.slf4j.Logger logger = LoggerFactory.getLogger(CoWorkersPoursantajService.class);
    @Inject
    @MessageBundle
    Bundle messageBundle;
    @Inject
    private UserBean userBean;

    public Map<String, Object> getAll(FilterWrapper filterWrapper, Integer start, Integer limit, SortWrapper sortWrapper) {
        Map<String, Object> map = new HashMap<>();
        map.put("list", getList(filterWrapper, start, limit, sortWrapper));
        map.put("total", getCount(filterWrapper));
        return map;
    }

    public List<DrmdLetter> getList(FilterWrapper filterWrapper, Integer start, Integer limit, SortWrapper sort) {
        TypedQuery createQuery = em.createQuery(getQuery(filterWrapper, sort));
        List<DrmdLetter> drmdLetters = new ArrayList<>();
        if (start != null && limit != null) {
            drmdLetters = createQuery.setFirstResult(start).setMaxResults(limit).getResultList();
        }
        if (start == null && limit != null) {
            drmdLetters = createQuery.setMaxResults(limit).getResultList();
        }
        if (start != null && limit == null) {
            drmdLetters = createQuery.setFirstResult(start).getResultList();
        }
        if (start == null && limit == null) {
            drmdLetters = createQuery.getResultList();
        }

        return drmdLetters;
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
            Root<DrmdLetter> drmdLetterFrom = criteriaQuery.from(DrmdLetter.class);
            List<Predicate> predicates = new ArrayList<Predicate>();
            Metamodel metamodel = em.getMetamodel();
            EntityType<DrmdLetter> drmdLetterEntityType = metamodel.entity(DrmdLetter.class);

//            Fetch<DrmdLetter, DrmdLSanad> sanadFetch = drmdLetterFrom.fetch(DrmdLetter_.sanad, JoinType.INNER);
//            JoinImpl<DrmdLetter, DrmdLSanad> sanadJoinImpl = (JoinImpl<DrmdLetter, DrmdLSanad>) sanadFetch;
//            Predicate sanadPredicate = criteriaBuilder.equal(criteriaBuilder.substring(drmdLetterFrom.get(DrmdLetter_.letterDate), 1, 6), sanadJoinImpl.get(DrmdLSanad_.lsmDate));
//            sanadJoinImpl.on(sanadPredicate);
            if (filterWrapper != null && filterWrapper.getFilters() != null) {
                for (Filter filter : filterWrapper.getFilters()) {

                    Object value = filter.getValue();
                    String field = filter.getProperty();
                    Filter.Operator operator = filter.getOperator();
                    String[] f = field.split("\\.");

                    Predicate predicate = null;
                    javax.persistence.criteria.Path path = drmdLetterFrom.get(f[0]);
                    for (int j = 1; j < f.length; j++) {
                        path = path.get(f[j]);
                    }
                    switch (operator) {

                        case EQUAL:
                        case _EQUAL:
                            if ("letterDate".equals(field)) {
                                predicate = criteriaBuilder.equal(criteriaBuilder.substring(path, 1, 6), DateUtilsFramework.format(new Date(Long.parseLong(value + "")), "yyyyMM"));
                            } else if ("price".equals(field)) {
//                                Expression<Long> e1 = (Expression<Long>) (drmdLetterFrom.get(DrmdLetter_.letterPrice1) != null ? drmdLetterFrom.get(DrmdLetter_.letterPrice1) : 0l);
//                                Expression<Long> e2 = (Expression<Long>) (drmdLetterFrom.get(DrmdLetter_.letterPrice2) != null ? drmdLetterFrom.get(DrmdLetter_.letterPrice2) : 0l);
//                                predicate = criteriaBuilder.equal(criteriaBuilder.sum(e1, e2), value);
                            } else {
                                predicate = criteriaBuilder.equal(path, value);
                            }
                            predicates.add(predicate);
                            break;
                        case LIKE:
                            predicates.add(criteriaBuilder.like(drmdLetterFrom.get(drmdLetterEntityType.getDeclaredSingularAttribute(field, String.class)), "%" + value + "%"));
                            break;
                        case BEFORE:
                            if ("letterDate".equals(field) || "letCard.drmdCard.cardDate".equals(field)) {
                                predicate = criteriaBuilder.lessThanOrEqualTo(path, DateUtilsFramework.format(new Date(Long.parseLong(value + "")), "yyyyMMdd"));
                            } else {
                                predicate = criteriaBuilder.lessThanOrEqualTo(path, (Comparable) value);
                            }
                            predicates.add(predicate);
                            break;
                        case AFTER:
                            if ("letterDate".equals(field) || "letCard.drmdCard.cardDate".equals(field)) {
                                predicate = criteriaBuilder.greaterThanOrEqualTo(path, DateUtilsFramework.format(new Date(Long.parseLong(value + "")), "yyyyMMdd"));
                            } else {
                                predicate = criteriaBuilder.greaterThanOrEqualTo(path, (Comparable) value);
                            }
                            predicates.add(predicate);
                            break;
                        case IS_NULL:
                            predicates.add(criteriaBuilder.isEmpty(path));
                            break;
                        case IS_NOT_NULL:
                            predicates.add(criteriaBuilder.isNotNull(path));
                            break;
                        case NOT_EQUAL:
                            predicate = criteriaBuilder.or(criteriaBuilder.notEqual(path, value), criteriaBuilder.isNull(path));
                            predicates.add(predicate);
                        default:
                            break;
                    }
                }
//                predicates.add(criteriaBuilder.equal(drmdLetterFrom.get(DrmdLetter_.letterFlag), "2"));
//                predicates.add(criteriaBuilder.isNull(drmdLetterFrom.get(DrmdLetter_.letterDel)));
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

//        String q = "select t from DrmdLetter t ";
//        if (filterWrapper != null && filterWrapper.getFilters() != null) {
//            for (Filter item : filterWrapper.getFilters()) {
//                Object value = item.getValue();
//                q = q + " where t." + item.getProperty() + " " + item.getOperator() + " " + item.getValue() + " order by t.letterDate DESC" ;
//
//            }
//        }
//        return q;
    }

    public void checkToExportLetter(List<IssuedLettersOfficeView> letters, SecurityContext securityContext) throws Exception {
        List unSentLetters = em.createQuery("select t from IssuedLettersOfficeView t where t.letterDate = :letterDate and "
                + "trim(t.letterBrhsendf) IS NULL and t.letterDel IS NULL and trim(t.besCntno) IS NOT NULL and "
                + "trim(t.rwshid) IS NOT NULL and t.letterFlag = :letterFlag and t.brchCode = :branchCode")
                .setParameter("letterDate", letters.get(0).getLetterDate().trim().substring(0, 6))
                .setParameter("letterFlag", '2')
                .setParameter("branchCode", letters.get(0).getBrchCode())
                .getResultList();
        if(unSentLetters != null && unSentLetters.size() > 0){
            logger.error("**** There are letters have not been sent");
            Response response = Response.status(Response.Status.NOT_ACCEPTABLE).entity(messageBundle.getProperty("incomeBank.UNSENT_LETTERS")).build();
            throw new WebApplicationException(response);
        }
        
         List unAcceptedLetters = em.createQuery("select t from IssuedLettersOfficeView t where t.letterDate = :letterDate and "
                + "trim(t.letterBrhsendf) IS NOT NULL and t.letOrdPay IS NULL and t.letterDel IS NULL and trim(t.besCntno) IS NOT NULL and "
                + "trim(t.rwshid) IS NOT NULL and t.letterFlag = 2 and t.brchCode = :branchCode")
                .setParameter("letterDate", letters.get(0).getLetterDate().trim().substring(0, 6))
                .setParameter("branchCode", letters.get(0).getBrchCode())
                .getResultList();
        if(unAcceptedLetters != null && unAcceptedLetters.size() > 0){
            logger.error("**** There are letters have not been accepted");
            Response response = Response.status(Response.Status.NOT_ACCEPTABLE).entity(messageBundle.getProperty("incomeBank.UNACCEPTED_LETTERS")).build();
            throw new WebApplicationException(response);
        }
    }

    public Map exportLetters(List<IssuedLettersOfficeView> letters, SecurityContext securityContext) throws Exception {
        this.checkToExportLetter(letters, securityContext);
        User user = userBean.getUserByUserName(securityContext.getUserPrincipal().getName());
        String uniqueID = UUID.randomUUID().toString();
        Map result = new HashMap();
        for (IssuedLettersOfficeView myLetter : letters) {
            DrmdLetter letter = em.find(DrmdLetter.class, myLetter.getLetterSerial());
            String cardDate = letter.getLetCard() != null
                    && letter.getLetCard().getDrmdCard() != null
                    && letter.getLetCard().getDrmdCard().getCardDate() != null
                    && letter.getLetCard().getDrmdCard().getCardDate().trim().length() == 8
                            ? letter.getLetCard().getDrmdCard().getCardDate().trim().substring(0, 4) + "/"
                            + letter.getLetCard().getDrmdCard().getCardDate().trim().substring(4, 6) + "/"
                            + letter.getLetCard().getDrmdCard().getCardDate().trim().substring(6, 8) : null;
            String desc1 = " واریزی وزارت دارایی بابت حق بیمه ماه عملکرد "
                    + letter.getBesFunctiondate() + " طی چک شماره " + letter.getLetCard().getDrmdCard().getCardRcvno().trim()
                    + " مورخ " + cardDate + " کارگاه " + letter.getLetterNam()
                    + " با شماره " + letter.getRwshid() + " در شعبه " + letter.getBrhcode().getBrhCode();
            String desc2 = " واریزی بابت حق بیمه پیمان "
                    + letter.getBesCntno() + " طی چک شماره " + letter.getLetCard().getDrmdCard().getCardRcvno().trim()
                    + " مورخ " + cardDate + " کارگاه " + letter.getLetterNam()
                    + " با شماره " + letter.getRwshid() + " در شعبه " + letter.getBrhcode().getBrhCode()
                    + (letter.getLetterNo() != null ? StringUtils.leftPad(letter.getLetterNo().trim(), 10, "0").substring(4) : "");
            String description = "1".equals(letter.getBesEmpzflag()) ? desc1 : desc2;
            ////////////////////////////////////////////////////////////////////////////////
            String idNo = letter.getLetterNo() != null ? letter.getBrhcode().getBrhCode() + StringUtils.leftPad(letter.getLetterNo().trim(), 10, "0").substring(4) : letter.getIdno();
            ////////////////////////////////////////////////////////////////////////////////
            IssuedLetter debitLetter = new IssuedLetter();
            debitLetter.setLetterRow(null);
            debitLetter.setLetterSerial(letter.getLetterSerial());
            debitLetter.setLetterCol(letter.getLetterRabet().substring(0, 2));
            debitLetter.setLetterMoin(letter.getLetterRabet().substring(2));
            debitLetter.setLetterDebit(null);
            debitLetter.setLetterCredit(letter.getLetterPrice1() + letter.getLetterPrice2());
            debitLetter.setLetterComment(description);
            debitLetter.setCreateUId(securityContext.getUserPrincipal().getName());
            debitLetter.setCreateDate(DateUtilsFramework.encodeDateString(DateUtilsFramework.format(new Date(), "yyyyMMdd")));
            debitLetter.setType("4");
            debitLetter.setValue(idNo);
            debitLetter.setLetterDate(letter.getLetterDate());
            debitLetter.setBranchCode(user.getOrganization().getCode());
            debitLetter.setLettersGroupId(uniqueID);
            em.persist(debitLetter);
        }

        TypedQuery query = em.createNamedQuery("getCurrentLetters", IssuedLetter.class);
        query.setParameter("lettersGroupId", uniqueID);
        List<IssuedLetter> issuedLetters = query.getResultList();
        Long sumDebit = 0l;
        Long sumCredit = 0l;
        for (IssuedLetter voucher : issuedLetters) {
            sumDebit += voucher.getLetterDebit();
            sumCredit += voucher.getLetterCredit();
        }
        result.put("status", Response.Status.OK);
        result.put("message", messageBundle.getProperty("incomeBank.EXPORT_VOUCHER_SUCCESSFULLY"));
        result.put("list", issuedLetters);
        result.put("total", issuedLetters.size());
        result.put("letterTafzili", "000000");
        result.put("sumDebit", sumDebit);
        result.put("sumCredit", sumCredit);

        return result;
    }

    public Map revertVouchers(List<IssuedLettersOfficeView> letters, SecurityContext securityContext) {
        Map result = new HashMap();
        try {
            for (IssuedLettersOfficeView d : letters) {
                DrmdLetter drmdLetter = em.find(DrmdLetter.class, d.getLetterSerial());
                DrmdLSanad sanad = em.find(DrmdLSanad.class, drmdLetter.getLetterDate().substring(0, 6));
                sanad.setLsZiFlag(null);
                sanad.setLsZiDate(DateUtilsFramework.encodeDateString(DateUtilsFramework.format(new Date(), "yyyyMMdd")));
                sanad.setLsZiUId(securityContext.getUserPrincipal().getName());
                em.merge(sanad);
            }
            result.put("status", Response.Status.OK);
            result.put("message", messageBundle.getProperty("incomeBank.REVERT_VOUCHER_SUCCESSFULLY"));
        } catch (Exception ex) {
            logger.error("revert vouchers error : " + ex);
            result.put("status", Response.Status.INTERNAL_SERVER_ERROR);
            result.put("message", messageBundle.getProperty("incomeBank.REVERT_VOUCHER_FAILED"));
        }
        return result;
    }

    public Map<String, Object> getAllFromView(FilterWrapper filterWrapper, Integer start, Integer limit, SortWrapper sortWrapper) {
        Map<String, Object> map = new HashMap<>();
        map.put("list", getListFromView(filterWrapper, start, limit, sortWrapper));
        map.put("total", getCountFromView(filterWrapper));
        return map;
    }

    public List<IssuedLettersOfficeView> getListFromView(FilterWrapper filterWrapper, Integer start, Integer limit, SortWrapper sort) {
        TypedQuery createQuery = em.createQuery(getQueryFromView(filterWrapper, sort));
        List<IssuedLettersOfficeView> drmdLetters = new ArrayList<>();
        if (start != null && limit != null) {
            drmdLetters = createQuery.setFirstResult(start).setMaxResults(limit).getResultList();
        }
        if (start == null && limit != null) {
            drmdLetters = createQuery.setMaxResults(limit).getResultList();
        }
        if (start != null && limit == null) {
            drmdLetters = createQuery.setFirstResult(start).getResultList();
        }
        if (start == null && limit == null) {
            drmdLetters = createQuery.getResultList();
        }

        return drmdLetters;
    }

    public Integer getCountFromView(FilterWrapper filter) {
        Integer qcount = 0;
        TypedQuery createQuery = em.createQuery(getQueryFromView(filter, null));
        qcount = createQuery.getResultList().size();
        return qcount;
    }

    private CriteriaQuery getQueryFromView(FilterWrapper filterWrapper, SortWrapper sortWrapper) {
        try {
            CriteriaBuilder criteriaBuilder = em.getCriteriaBuilder();
            CriteriaQuery criteriaQuery = criteriaBuilder.createQuery();
            Root<IssuedLettersOfficeView> drmdLetterFrom = criteriaQuery.from(IssuedLettersOfficeView.class);
            List<Predicate> predicates = new ArrayList<Predicate>();
            Metamodel metamodel = em.getMetamodel();
            EntityType<IssuedLettersOfficeView> drmdLetterEntityType = metamodel.entity(IssuedLettersOfficeView.class);
            if (filterWrapper != null && filterWrapper.getFilters() != null) {
                for (Filter filter : filterWrapper.getFilters()) {

                    Object value = filter.getValue();
                    String field = filter.getProperty();
                    Filter.Operator operator = filter.getOperator();
                    String[] f = field.split("\\.");

                    Predicate predicate = null;
                    javax.persistence.criteria.Path path = drmdLetterFrom.get(f[0]);
                    for (int j = 1; j < f.length; j++) {
                        path = path.get(f[j]);
                    }
                    switch (operator) {

                        case EQUAL:
                        case _EQUAL:
                            if ("letterDate".equals(field)) {
                                predicate = criteriaBuilder.equal(criteriaBuilder.substring(path, 1, 6), DateUtilsFramework.format(new Date(Long.parseLong(value + "")), "yyyyMM"));
                            } else if ("price".equals(field)) {
                                Expression<Long> e1 = (Expression<Long>) (drmdLetterFrom.get("letterPrice1") != null ? drmdLetterFrom.get("letterPrice1") : 0l);
                                Expression<Long> e2 = (Expression<Long>) (drmdLetterFrom.get("letterPrice2") != null ? drmdLetterFrom.get("letterPrice2") : 0l);
                                predicate = criteriaBuilder.equal(criteriaBuilder.sum(e1, e2), value);
                            } else {
                                predicate = criteriaBuilder.equal(path, value);
                            }
                            predicates.add(predicate);
                            break;
                        case LIKE:
                            predicates.add(criteriaBuilder.like(drmdLetterFrom.get(drmdLetterEntityType.getDeclaredSingularAttribute(field, String.class)), "%" + value + "%"));
                            break;
                        case BEFORE:
                            if ("letterDate".equals(field) || "cardDate".equals(field)) {
                                predicate = criteriaBuilder.lessThanOrEqualTo(path, DateUtilsFramework.format(new Date(Long.parseLong(value + "")), "yyyyMMdd"));
                            } else {
                                predicate = criteriaBuilder.lessThanOrEqualTo(path, (Comparable) value);
                            }
                            predicates.add(predicate);
                            break;
                        case AFTER:
                            if ("letterDate".equals(field) || "cardDate".equals(field)) {
                                predicate = criteriaBuilder.greaterThanOrEqualTo(path, DateUtilsFramework.format(new Date(Long.parseLong(value + "")), "yyyyMMdd"));
                            } else {
                                predicate = criteriaBuilder.greaterThanOrEqualTo(path, (Comparable) value);
                            }
                            predicates.add(predicate);
                            break;
                        case IS_NULL:
                            predicates.add(criteriaBuilder.isEmpty(path));
                            break;
                        case IS_NOT_NULL:
                            predicates.add(criteriaBuilder.isNotNull(path));
                            break;
                        case NOT_EQUAL:
                            predicate = criteriaBuilder.or(criteriaBuilder.notEqual(path, value), criteriaBuilder.isNull(path));
                            predicates.add(predicate);
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
