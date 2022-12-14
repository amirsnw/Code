/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package ir.tamin.incomeBank.service.daramadBank;

import com.thoughtworks.xstream.XStream;
import com.thoughtworks.xstream.io.xml.DomDriver;
import ir.tamin.incomeBank.model.daramadBank.TellDiff;
import ir.tamin.incomeBank.model.daramadBank.DrmdRiaziTel;
import ir.tamin.incomeBank.model.daramadBank.DrmdTelInfo;
import ir.tamin.incomeBank.model.daramadBank.VwDskDrmdTel;
import ir.tamin.incomeBank.service.identityManager.UserBean;
import ir.tamin.incomeBank.service.jdbc.StoredProcedure;
import ir.tamin.incomeBank.util.DateUtils;
import ir.tamin.framework.cdi.util.MessageBundle;
import ir.tamin.framework.core.util.Bundle;
import ir.tamin.framework.ws.rest.json.Filter;
import ir.tamin.framework.ws.rest.json.FilterWrapper;
import ir.tamin.framework.ws.rest.json.Sort;
import ir.tamin.framework.ws.rest.json.SortWrapper;
import ir.tamin.incomeBank.service.centralPayment.PayDetailService;
import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStream;
import java.io.StringReader;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Types;
import java.util.ArrayList;
import java.util.Date;
import java.util.HashMap;
import java.util.HashSet;
import java.util.List;
import java.util.Map;
import java.util.Set;
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
import net.sf.jasperreports.engine.JasperRunManager;
import net.sf.jasperreports.engine.data.JRBeanCollectionDataSource;
import oracle.jdbc.OracleTypes;
import org.slf4j.LoggerFactory;

/**
 *
 * @author f_fotuhi
 */
public class DrmdTelInfoService {

    @Inject
    private EntityManager em;
    @Inject
    UserBean userBean;
    @Inject
    private StoredProcedure procedure;

    @Inject
    @MessageBundle
    Bundle messageBundle;

    @Inject
    VwDskDrmdTelService dskService;

    public Map<String, Object> getAll(FilterWrapper filter, Integer start, Integer limit, SortWrapper sort) {

        Map<String, Object> map = new HashMap<>();
        map.put("list", getList(filter, start, limit, sort));
        map.put("total", getCount(filter));
        return map;
    }

    public Map<String, Object> getTelDiff(FilterWrapper filterWrapper, Integer start, Integer limit, SortWrapper sort) throws SQLException {

        String yearMonth = null;
        String day = "00";
        String brchCode = null;
        Map<String, Object> map = new HashMap<>();

        Object[] filterArray = filterWrapper.getFilters().toArray();
        for (int i = 0; i < filterArray.length; i++) {
            Filter filter = (Filter) filterArray[i];
            String field = filter.getProperty();
            Object value = filter.getValue();

            if (field.equals("yearMonth")) {
                yearMonth = value.toString();
            }
            if (field.equals("brchCode")) {
                brchCode = value.toString();
            }
            if (field.equals("day")) {
                day = value.toString();
            }
        }

        procedure.query("{?=call pckdrmdview.getVWDRMDTELDIFF(?,?,?,?,?)}");
        procedure.setOutParameter(1, OracleTypes.CURSOR);
        procedure.setInParameter(2, brchCode);
        procedure.setInParameter(3, yearMonth);
        procedure.setInParameter(4, day);
        procedure.setInParameter(5, null);
        procedure.setInParameter(6, null);
        procedure.execute();
        ResultSet rs = (ResultSet) procedure.getOutParameter(1);

        int totalSize = 0;
        while (rs.next()) {
            totalSize++;
        }

        procedure.query("{?=call pckdrmdview.getVWDRMDTELDIFF(?,?,?,?,?)}");
        procedure.setOutParameter(1, OracleTypes.CURSOR);
        procedure.setInParameter(2, brchCode);
        procedure.setInParameter(3, yearMonth);
        procedure.setInParameter(4, day);
        procedure.setInParameter(5, start != null && limit != null ? start / limit : null);
        procedure.setInParameter(6, limit);
        procedure.execute();
        rs = (ResultSet) procedure.getOutParameter(1);

        List<TellDiff> telDiffList = new ArrayList<>();
        while (rs.next()) {
            TellDiff tellDiffModel = new TellDiff();

            tellDiffModel.setRowId(rs.getString("row_id"));
            tellDiffModel.setCardOrdpay(rs.getString("card_ordpay"));
            tellDiffModel.setCardDate(rs.getString("card_date"));
            tellDiffModel.setRcvTypDesc(rs.getString("rcvtypdesc"));
            tellDiffModel.setCardRcvno(rs.getString("card_rcvno"));
            tellDiffModel.setCardPrice(rs.getString("card_price"));
            tellDiffModel.setOrpPayseqamt(rs.getString("orp_payseqamt"));
            tellDiffModel.setDiffDesc(rs.getString("diffdesc"));

            telDiffList.add(tellDiffModel);
        }

        rs.close();

        map.put("list", telDiffList);
        map.put("total", totalSize);
        return map;
    }

    public List<DrmdTelInfo> getList(FilterWrapper filterWrapper, Integer start, Integer limit, SortWrapper sort) {

        TypedQuery createQuery = em.createQuery(getQuery(filterWrapper, sort));

        List<DrmdTelInfo> telInfoList = new ArrayList<>();
        if (start != null && limit != null) {
            telInfoList = createQuery.setFirstResult(start).setMaxResults(limit).getResultList();
        }
        if (start == null && limit != null) {
            telInfoList = createQuery.setMaxResults(limit).getResultList();
        }
        if (start != null && limit == null) {
            telInfoList = createQuery.setFirstResult(start).getResultList();
        }
        if (start == null && limit == null) {
            telInfoList = createQuery.getResultList();
        }

        return telInfoList;
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
            Root<DrmdTelInfo> drmdTelInfoFrom = criteriaQuery.from(DrmdTelInfo.class);
            List<Predicate> predicates = new ArrayList<Predicate>();
            Metamodel metamodel = em.getMetamodel();
            EntityType<DrmdTelInfo> drmdTelInfoEntityType = metamodel.entity(DrmdTelInfo.class);
            if (filterWrapper != null && filterWrapper.getFilters() != null) {
                for (Filter filter : filterWrapper.getFilters()) {

                    Object value = filter.getValue();
                    String field = filter.getProperty();
                    Filter.Operator operator = filter.getOperator();
                    String[] f = field.split("\\.");

                    Predicate predicate = null;
                    switch (operator) {

                        case EQUAL:
                            javax.persistence.criteria.Path path = drmdTelInfoFrom.get(f[0]);
                            for (int j = 1; j < f.length; j++) {
                                path = path.get(f[j]);
                            }
                            predicate = criteriaBuilder.equal(path, value);
                            predicates.add(predicate);
                            break;
                        case LIKE:

                            //predicates.add(criteriaBuilder.like(drmdTelInfoFrom.get(drmdTelInfoEntityType.getDeclaredSingularAttribute(field, String.class)), "%" + value + "%"));
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

                    javax.persistence.criteria.Path path = drmdTelInfoFrom.get(sortProperties[0]);
                    for (int j = 1; j < sortProperties.length; j++) {
                        path = path.get(sortProperties[j]);
                    }
                    if (sortProperties.length > 0) {
                        if (sortSet.getDirection().getName().equals(Sort.Direction.DESC.getName())) {
                            order = criteriaBuilder.desc(drmdTelInfoFrom.get(sortProperties[0]));
                        } else {
                            order = criteriaBuilder.asc(drmdTelInfoFrom.get(sortProperties[0]));
                        }
                    }
                    orders.add(order);
                }

                if (!orders.isEmpty()) {
                    criteriaQuery.orderBy(orders);
                }
            }

            criteriaQuery.select(drmdTelInfoFrom);
            return criteriaQuery;

        } catch (Exception e) {
            return null;
        }
    }
    private static final org.slf4j.Logger logger = LoggerFactory.getLogger(PayDetailService.class);

    public boolean prcexttelinfo(FilterWrapper filterWrapper) throws Exception{
        String brchCode = null;
        String year = null;
        String month = null;
        String day = "00";
        String ghaty = null;

        if (filterWrapper != null && filterWrapper.getFilters() != null) {
            for (Filter filter : filterWrapper.getFilters()) {

                String field = filter.getProperty();
                if (field.contains("brhCode")) {
                    brchCode = filter.getValue();
                }
                if (field.contains("year")) {
                    year = filter.getValue();
                }
                if (field.contains("month")) {
                    month = filter.getValue();
                }
                if (field.contains("day")) {
                    day = filter.getValue();
                }
                if (field.contains("ghaty")) {
                    ghaty = filter.getValue();
                }

            }
        }
        try {
//TODO
            // procedure.query("{call pck_telproc.prcexttelinfo(?,?,?,?,?)}");
            procedure.query("{?=call pck_telproc_core.prcexttelinfo(?,?,?,?,?,?)}");
            procedure.setOutParameter(1, Types.VARCHAR)
                    .setInParameter(2, brchCode)
                    .setInParameter(3, year)
                    .setInParameter(4, month)
                    .setInParameter(5, day)
                    .setInParameter(6, ghaty)
                    .setOutParameter(7, Types.VARCHAR);

            procedure.execute();
            String packeageResult = procedure.getOutParameter(7).toString();
            if (packeageResult.equals("2")) {
                throw new Exception(procedure.getOutParameter(1).toString());
            } else {
                return true;
            }

        } catch (SQLException sqlexc) {
            Response response = Response.status(Response.Status.INTERNAL_SERVER_ERROR).entity(sqlexc.getMessage()).build();
            throw new WebApplicationException(response);
        } catch (Exception e) {
            throw new Exception(e.getMessage());
        }
//        catch (Exception exc) {
//            Logger.getLogger(DrmdTelInfoService.class.getName()).log(Level.SEVERE, null, exc);
//            Response response = Response.status(Response.Status.INTERNAL_SERVER_ERROR).entity(messageBundle.getProperty("coreaccount.daramadbank.EXC_IN_PROCESS_EXTTELINFO")).build();
//            throw new WebApplicationException(response);
//        }
        
        // throw new ProxyProcessingException(bundle.getProperty("insurance.technical.guardian.InquiryCashDesk"));
         
    }

    public byte[] doGet(FilterWrapper filterWrappers) throws IOException, SQLException {
        InputStream reportStream = null;
        String yearMonth = null;
        String brchCode = null;

        Map<String, Object> parameters = new HashMap<>();
        try {
            Object[] filterArray = filterWrappers.getFilters().toArray();
            for (int i = 0; i < filterArray.length; i++) {
                Filter filter = (Filter) filterArray[i];
                String field = filter.getProperty();
                Object value = filter.getValue();

                if (field.equals("yearMonth")) {
                    yearMonth = value.toString();
                }
                if (field.equals("brchCode")) {
                    brchCode = value.toString();
                }
            }

            procedure.query("{?=call pckdrmdview.getVWREP_DRMDRIAZITEL(?,?,?,?)}");
            procedure.setOutParameter(1, OracleTypes.CURSOR);
            procedure.setInParameter(2, brchCode);
            procedure.setInParameter(3, yearMonth);
            procedure.setInParameter(4, null);
            procedure.setInParameter(5, null);
            procedure.execute();
            ResultSet rs = (ResultSet) procedure.getOutParameter(1);

            List<DrmdRiaziTel> riaziTelList = new ArrayList<>();
            while (rs.next()) {
                DrmdRiaziTel riaziTelModel = new DrmdRiaziTel();

                riaziTelModel.setRowId(rs.getString("row_id"));
                riaziTelModel.setRwshID(rs.getString("rwshid"));
                riaziTelModel.setPymSeq(rs.getString("lsh_pymseq"));
                riaziTelModel.setListYear(rs.getString("lsh_lstyer"));
                riaziTelModel.setListMonth(rs.getString("lsh_lstmnt"));
                riaziTelModel.setListDate(rs.getString("lsh_lstdat"));
                riaziTelModel.setStatDesc(rs.getString("statdesc"));

                riaziTelList.add(riaziTelModel);
            }

            JRBeanCollectionDataSource ds = new JRBeanCollectionDataSource(riaziTelList);
            reportStream = DrmdTelInfoService.class.getResourceAsStream("/reports/daramadBank/riaziList.jasper");
            parameters.put("dataSource", ds);

            byte[] byteStream = JasperRunManager.runReportToPdf(reportStream, parameters, ds);
            return byteStream;

        } catch (Exception ex) {
            Logger.getLogger(DrmdTelInfoService.class.getName()).log(Level.SEVERE, null, ex);
        } finally {
            if (reportStream != null) {
                reportStream.close();
            }
        }

        return null;
    }

    public String gatherExeIns(FilterWrapper filterWrappers) throws SQLException {
        String year = null;
        String month = null;
        String brchCode = null;

        try {

            Object[] filterArray = filterWrappers.getFilters().toArray();
            for (int i = 0; i < filterArray.length; i++) {
                Filter filter = (Filter) filterArray[i];
                String field = filter.getProperty();
                Object value = filter.getValue();

                if (field.equals("year")) {
                    year = value.toString();
                }
                if (field.equals("month")) {
                    month = value.toString();
                }
                if (field.equals("brchCode")) {
                    brchCode = value.toString();
                }
            }

            procedure.query("{?=call pck_telproc.gather_exeIns(?,?,?)}");
            procedure.setOutParameter(1, Types.CHAR);
            procedure.setInParameter(2, brchCode);
            procedure.setInParameter(3, year);
            procedure.setInParameter(4, month);

            procedure.execute();
            String result = procedure.getOutParameter(1).toString();
            return result;
        } catch (SQLException sqlexc) {
            Logger.getLogger(DrmdTelInfoService.class.getName()).log(Level.SEVERE, null, sqlexc);
            BufferedReader reader = new BufferedReader(new StringReader(sqlexc.getMessage()));
            try {
                String error = reader.readLine();
                while (error != null) {
                    if (error.startsWith("ORA-2")) {
                        String[] str = error.split(":");
                        Response response = Response.status(Response.Status.INTERNAL_SERVER_ERROR).entity(str[1]).build();
                        throw new WebApplicationException(response);
                    } else {
                        error = reader.readLine();
                    }
                }

            } catch (IOException ex) {
                Logger.getLogger(DrmdTelInfoService.class.getName()).log(Level.SEVERE, null, ex);
            }

        } catch (Exception ex) {
            Logger.getLogger(DrmdTelInfoService.class.getName()).log(Level.SEVERE, null, ex);
            return null;
        }
        return null;
    }

    public String writeToXml(FilterWrapper filterWrappers, FilterWrapper extraValue, Integer start, Integer limit, SortWrapper sort) throws IOException {
        try {
            String year = null;
            String month = null;
            String brchCode = null;
            Long sum4 = 0L;
            Long sum5 = 0L;
            Long sum6 = 0L;
            Long sum7 = 0L;
            Long sum8 = 0L;
            Long sum9 = 0L;
            Date date = new Date();
            String todayDate = DateUtils.format(date, "yyyy/MM/dd");

            Object[] filterArray = filterWrappers.getFilters().toArray();
            for (int i = 0; i < filterArray.length; i++) {
                Filter filter = (Filter) filterArray[i];
                String field = filter.getProperty();
                Object value = filter.getValue();

                if (field.equals("year")) {
                    year = value.toString();
                    year = year.substring(2);
                }
                if (field.equals("month")) {
                    month = value.toString();
                }
                if (field.equals("brchCode")) {
                    brchCode = value.toString();
                }
            }

            FilterWrapper filterWarpper = new FilterWrapper();
            Set<Filter> filters = new HashSet<>();
            Filter filter = new Filter();

            filter.setProperty("telInfoPK.year");
            filter.setValue(year);
            filter.setOperator(Filter.Operator.EQUAL);
            filters.add(filter);

            filter = new Filter();
            filter.setProperty("telInfoPK.month");
            filter.setValue(month);
            filter.setOperator(Filter.Operator.EQUAL);
            filters.add(filter);

            filter = new Filter();
            filter.setProperty("telInfoPK.brhCode");
            filter.setValue(brchCode);
            filter.setOperator(Filter.Operator.EQUAL);
            filters.add(filter);

            filterWarpper.setFilters(filters);
            List<VwDskDrmdTel> telInfoList = dskService.getList(filterWarpper, null, null, null);

            Object[] values = extraValue.getFilters().toArray();
            for (int i = 0; i < values.length; i++) {
                Filter filterValue = (Filter) values[i];
                String field = filterValue.getProperty();
                Object value = filterValue.getValue();

                if (field.equals("sum4")) {
                    sum4 = Long.valueOf(value.toString());
                } else if (field.equals("sum5")) {
                    sum5 = Long.valueOf(value.toString());
                } else if (field.equals("sum6")) {
                    sum6 = Long.valueOf(value.toString());
                } else if (field.equals("sum7")) {
                    sum7 = Long.valueOf(value.toString());
                } else if (field.equals("sum8")) {
                    sum8 = Long.valueOf(value.toString());
                } else if (field.equals("sum9")) {
                    sum9 = Long.valueOf(value.toString());
                }
            }

            for (VwDskDrmdTel item : telInfoList) {
                item.setSum4(sum4);
                item.setSum5(sum5);
                item.setSum6(sum6);
                item.setSum7(sum7);
                item.setSum8(sum8);
                item.setSum9(sum9);
                item.setERS_DAT(todayDate);
            }
            XStream xStream = new XStream(new DomDriver());
            String xml = xStream.toXML(telInfoList);

            return xml;

        } catch (Exception ex) {
            Logger.getLogger(DrmdTelInfoService.class.getName()).log(Level.SEVERE, null, ex);
            return null;
        }
    }
}
