/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package ir.tamin.incomeBank.service.daramadBank;

import ir.tamin.incomeBank.model.daramadBank.CardReport;
import ir.tamin.incomeBank.model.daramadBank.Dftroznameh;
import ir.tamin.incomeBank.service.identityManager.UserBean;
import ir.tamin.incomeBank.util.DateUtils;
import ir.tamin.framework.ws.rest.json.Filter;
import ir.tamin.framework.ws.rest.json.FilterWrapper;
import ir.tamin.framework.ws.rest.json.Sort;
import ir.tamin.framework.ws.rest.json.SortWrapper;
import java.io.IOException;
import java.io.InputStream;
import java.util.ArrayList;
import java.util.Date;
import java.util.HashMap;
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
import net.sf.jasperreports.engine.JasperRunManager;
import net.sf.jasperreports.engine.data.JRBeanCollectionDataSource;
import ir.tamin.incomeBank.service.jdbc.StoredProcedure;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.Arrays;
import oracle.jdbc.OracleTypes;
import org.eclipse.persistence.internal.jpa.EJBQueryImpl;

/**
 *
 * @author f_fotuhi
 */
public class DftroznamehService {

    @Inject
    private EntityManager em;
    @Inject
    UserBean userBean;
    @Inject
    private StoredProcedure procedure;

    /**
     *
     * @param filter
     * @param start
     * @param limit
     * @param sort
     * @return
     */
    public Map<String, Object> getAll(FilterWrapper filter, Integer start, Integer limit, SortWrapper sort) {

        Map<String, Object> map = new HashMap<>();
        map.put("list", getList(filter, start, limit, sort));
        map.put("total", getCount(filter));
        return map;
    }

    /**
     *
     * @param filterWrapper
     * @param start
     * @param limit
     * @param sort
     * @return
     */
    public List<Dftroznameh> getList(FilterWrapper filterWrapper, Integer start, Integer limit, SortWrapper sort) {

        TypedQuery createQuery = em.createQuery(getQuery(filterWrapper, sort));

        List<Dftroznameh> dftroznameh = new ArrayList<>();
        if (start != null && limit != null) {
            dftroznameh = createQuery.setFirstResult(start).setMaxResults(limit).getResultList();
            String str = createQuery.unwrap(EJBQueryImpl.class).getDatabaseQuery().getSQLString();
        }
        if (start == null && limit != null) {
            dftroznameh = createQuery.setMaxResults(limit).getResultList();
        }
        if (start != null && limit == null) {
            dftroznameh = createQuery.setFirstResult(start).getResultList();
        }
        if (start == null && limit == null) {
            dftroznameh = createQuery.getResultList();
        }

        return dftroznameh;
    }

    /**
     *
     * @param filter
     * @return
     */
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
            Root<Dftroznameh> dftroznamehFrom = criteriaQuery.from(Dftroznameh.class);
            List<Predicate> predicates = new ArrayList<Predicate>();
            Metamodel metamodel = em.getMetamodel();
            EntityType<Dftroznameh> dftroznamehEntityType = metamodel.entity(Dftroznameh.class);
            String fromYearMonth = "";
            String toYearMonth = "";
            if (filterWrapper != null && filterWrapper.getFilters() != null) {
                for (Filter filter : filterWrapper.getFilters()) {
                    if ("fromDocDat".equals(filter.getProperty())) {
                        fromYearMonth = filter.getValue();
                    } else if ("toDocDat".equals(filter.getProperty())) {
                        toYearMonth = filter.getValue();
                    }
                }
            }
            if (filterWrapper != null && filterWrapper.getFilters() != null) {
                for (Filter filter : filterWrapper.getFilters()) {

                    Object value = filter.getValue();
                    String field = filter.getProperty();
                    Filter.Operator operator = filter.getOperator();
                    Predicate predicate = null;
                    if (field.contains("DocDat")) {
                        field = "docDat";
                    }

                    String[] f = field.split("\\.");

                    if (field.equals("ordDocdat")) {
                        Date Date = DateUtils.convertDateStringToDate(value.toString().replace("/", ""));
                        value = DateUtils.format(Date, "yyyyMMdd");
                    }
                    if (field.equals("rcvDate")) {
                        Date Date = DateUtils.convertDateStringToDate(value.toString().replace("/", ""));
                        value = DateUtils.format(Date, "yyyyMMdd");
                    }

                    if (field.equals("ordType") && "1".equals(value)) {
                        field = "paykindcode";
                        value = Arrays.asList(new String[]{"12", "13"});
                        operator = Filter.Operator.IN;
                    } else if (field.equals("ordType") && "2".equals(value)) {
                        field = "paykindcode";
                        value = Arrays.asList(new String[]{"03", "07", "12"});
                        operator = Filter.Operator.NOT_EQUAL;
                        Predicate predicate1 = criteriaBuilder.not(dftroznamehFrom.get(dftroznamehEntityType.getDeclaredSingularAttribute("orpStat", String.class)).in(new Object[]{"1", "2"}));
//                        toYearMonth = toYearMonth.substring(4).equals("12") ? (new Integer(toYearMonth.substring(0, 4)).intValue() + 1) + "01" : (new Integer(toYearMonth).intValue() + 1) + "";
                        Predicate predicate2 = criteriaBuilder.and((criteriaBuilder
                                .greaterThan(dftroznamehFrom.get(dftroznamehEntityType.getDeclaredSingularAttribute("orpStatdate", String.class)), toYearMonth + "31")),
                                dftroznamehFrom.get(dftroznamehEntityType.getDeclaredSingularAttribute("orpStat", String.class)).in(new Object[]{"1", "2"}));
                        Predicate orPredicate = criteriaBuilder.or(predicate1, predicate2);
                        predicates.add(criteriaBuilder.and(dftroznamehFrom.get(dftroznamehEntityType.getDeclaredSingularAttribute("paykindcode", String.class)).in((List<String>) value), orPredicate));
                    }

                    switch (operator) {

                        case EQUAL:
                            javax.persistence.criteria.Path path = dftroznamehFrom.get(f[0]);
                            for (int j = 1; j < f.length; j++) {
                                path = path.get(f[j]);
                            }
                            predicate = criteriaBuilder.equal(path, value);
                            predicates.add(predicate);
                            break;
                        case LIKE:

                            predicates.add(criteriaBuilder.like(dftroznamehFrom.get(dftroznamehEntityType.getDeclaredSingularAttribute(field, String.class)), "%" + value + "%"));

                            break;
                        case IN:
                            predicates.add(
                                    dftroznamehFrom.get(dftroznamehEntityType.getDeclaredSingularAttribute("paykindcode", String.class)).in((List<String>) value));
                            break;
                        case AFTER:
                            path = dftroznamehFrom.get(f[0]);
                            for (int j = 1; j < f.length; j++) {
                                path = path.get(f[j]);
                            }
                            predicates.add(
                                    criteriaBuilder.greaterThanOrEqualTo(path, (Comparable) value));
                            break;
                        case BEFORE:
                            path = dftroznamehFrom.get(f[0]);
                            for (int j = 1; j < f.length; j++) {
                                path = path.get(f[j]);
                            }
                            predicates.add(
                                    criteriaBuilder.lessThanOrEqualTo(path, (Comparable) value));
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

                    javax.persistence.criteria.Path path = dftroznamehFrom.get(sortProperties[0]);
                    for (int j = 1; j < sortProperties.length; j++) {
                        path = path.get(sortProperties[j]);
                    }
                    if (sortProperties.length > 0) {
                        if (sortSet.getDirection().getName().equals(Sort.Direction.DESC.getName())) {
                            order = criteriaBuilder.desc(dftroznamehFrom.get(sortProperties[0]));
                        } else {
                            order = criteriaBuilder.asc(dftroznamehFrom.get(sortProperties[0]));
                        }
                    }
                    orders.add(order);
                }

                if (!orders.isEmpty()) {
                    criteriaQuery.orderBy(orders);
                }
            }

            criteriaQuery.select(dftroznamehFrom);
            return criteriaQuery;

        } catch (Exception e) {
            return null;
        }
    }

    /**
     *
     * @param filterWrapper
     * @param start
     * @param limit
     * @param sort
     * @return
     * @throws IOException
     * @throws SQLException
     */
    public byte[] doGet(FilterWrapper filterWrapper, Integer start, Integer limit, SortWrapper sort) throws IOException, SQLException {

        String brchCode = null;
        String fromYearMonth = null;
        String toYearMonth = null;
        String radifBank = null;
        Object[] filterArray = filterWrapper.getFilters().toArray();
        for (int i = 0; i < filterArray.length; i++) {
            Filter filter = (Filter) filterArray[i];
            String field = filter.getProperty();
            Object value = filter.getValue();

            if (field.equals("fromDocDat")) {
                fromYearMonth = value.toString();
            } else if (field.equals("toDocDat")) {
                toYearMonth = value.toString();
            } else if (field.equals("brchCode")) {
                brchCode = value.toString();
            } else if (field.equals("bankRadif")) {
                radifBank = value.toString();
            }
        }

        procedure.query("{?=call pckdrmdview.getvwrepdftroznameh(?,?,?,?)}");
        procedure.setOutParameter(1, OracleTypes.CURSOR);
        procedure.setInParameter(2, brchCode);
        procedure.setInParameter(3, fromYearMonth);
        procedure.setInParameter(4, toYearMonth);
        procedure.setInParameter(5, radifBank);
        procedure.execute();
        ResultSet rs = (ResultSet) procedure.getOutParameter(1);
        CardReport cardReport = new CardReport();
        while (rs.next()) {

            cardReport.setHavaleVosolShodeNum(rs.getLong("tedadehavalevosolshode"));
            cardReport.setHavaleVosolShodeAmount(rs.getLong("mablaghhavalevosolshode"));
            cardReport.setHavaleSaderShodeNum(rs.getLong("tedadehavalesadershode"));
            cardReport.setHavaleSaderShodeAmount(rs.getLong("mablaghhavalesadershode"));
            cardReport.setHavaleBatelShodeNum(rs.getLong("tedadehavalebatelshode"));
            cardReport.setHavaleBatelShodeAmount(rs.getLong("mablaghhavalebatelshode"));

            cardReport.setFishVosolShodeNum(rs.getLong("tedadefishvosolshode"));
            cardReport.setFishVosolShodeAmount(rs.getLong("mablaghfishvosolshode"));
            cardReport.setFishSaderShodeNum(rs.getLong("tedadefishsadershode"));
            cardReport.setFishSaderShodeAmount(rs.getLong("mablaghfishsadershode"));
            cardReport.setFishBatelShodeNum(rs.getLong("tedadefishbatelshode"));
            cardReport.setFishBatelShodeAmount(rs.getLong("mablaghfishbatelshode"));

            cardReport.setElamieVosolShodeNum(rs.getLong("tedadeelamievosolshode"));
            cardReport.setElamieVosolShodeAmount(rs.getLong("mablaghelamievosolshode"));
            cardReport.setElamieSaderShodeNum(rs.getLong("tedadeelamiesadershode"));
            cardReport.setElamieSaderShodeAmount(rs.getLong("mablaghelamiesadershode"));
            cardReport.setElamieBatelShodeNum(rs.getLong("tedadeelamiebatelshode"));
            cardReport.setElamieBatelShodeAmount(rs.getLong("mablaghelamiebatelshode"));

            cardReport.setCheqVosolShodeNum(rs.getLong("tedadecheqvosolshode"));
            cardReport.setCheqVosolShodeAmount(rs.getLong("mablaghcheqvosolshode"));
            cardReport.setCheqSaderShodeNum(rs.getLong("tedadecheqsadershode"));
            cardReport.setCheqSaderShodeAmount(rs.getLong("mablaghcheqsadershode"));
            cardReport.setCheqBatelShodeNum(rs.getLong("tedadecheqbatelshode"));
            cardReport.setCheqBatelShodeAmount(rs.getLong("mablaghcheqbatelshode"));
        }
        rs.close();

        InputStream reportStream = null;
        Map<String, Object> parameters = new HashMap<>();
        parameters.put("brchCode", brchCode);
        parameters.put("fromYearMonth", fromYearMonth.substring(0, 4) + "/" + fromYearMonth.substring(4));
        parameters.put("toYearMonth", toYearMonth.substring(0, 4) + "/" + toYearMonth.substring(4));
        parameters.put("radifBank", radifBank);

        try {

            List<CardReport> cardReportList = new ArrayList<>();
            cardReportList.add(cardReport);
            JRBeanCollectionDataSource ds = new JRBeanCollectionDataSource(cardReportList);
            reportStream = DftroznamehService.class.getResourceAsStream("/reports/daramadBank/dftRoznamehRep.jasper");
            byte[] byteStream = JasperRunManager.runReportToPdf(reportStream, parameters, ds);
            return byteStream;

        } catch (Exception ex) {
            Logger.getLogger(DftroznamehService.class.getName()).log(Level.SEVERE, null, ex);
        } finally {
            if (reportStream != null) {
                reportStream.close();
            }
        }

        return null;
    }
}
