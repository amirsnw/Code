/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package ir.tamin.incomeBank.service.shortterm;

import com.healthmarketscience.jackcess.ColumnBuilder;
import com.healthmarketscience.jackcess.Database;
import com.healthmarketscience.jackcess.DatabaseBuilder;
import com.healthmarketscience.jackcess.Table;
import com.healthmarketscience.jackcess.TableBuilder;
import com.thoughtworks.xstream.XStream;
import com.thoughtworks.xstream.io.xml.DomDriver;
import ir.tamin.incomeBank.model.shortterm.VwSendToMaliDuplicates;
import ir.tamin.incomeBank.model.shortterm.VwSendToMaliReport;
import ir.tamin.incomeBank.model.shortterm.NationalityEnum;
import javax.persistence.criteria.CriteriaBuilder;
import javax.persistence.criteria.CriteriaQuery;
import javax.persistence.criteria.Order;
import javax.persistence.criteria.Predicate;
import javax.persistence.criteria.Root;
import ir.tamin.incomeBank.util.DateUtils;
import ir.tamin.framework.ws.rest.json.Filter;
import ir.tamin.framework.ws.rest.json.FilterWrapper;
import ir.tamin.framework.ws.rest.json.Sort;
import static ir.tamin.framework.ws.rest.json.Sort.Direction.DESC;
import ir.tamin.framework.ws.rest.json.SortWrapper;
import java.io.File;
import java.io.IOException;
import java.sql.SQLException;
import java.sql.Types;
import java.util.ArrayList;
import java.util.Date;
import java.util.HashMap;
import java.util.HashSet;
import java.util.List;
import java.util.Map;
import java.util.logging.Level;
import java.util.logging.Logger;
import javax.ejb.Stateless;
import javax.inject.Inject;
import javax.persistence.EntityManager;
import javax.persistence.TypedQuery;
import javax.persistence.metamodel.EntityType;
import org.apache.poi.hssf.usermodel.HSSFPalette;
import org.apache.poi.hssf.usermodel.HSSFWorkbook;
import org.apache.poi.hssf.util.HSSFColor;
import org.apache.poi.ss.usermodel.Cell;
import org.apache.poi.ss.usermodel.CellStyle;
import org.apache.poi.ss.usermodel.Font;
import org.apache.poi.ss.usermodel.IndexedColors;
import org.apache.poi.ss.usermodel.Row;
import javax.persistence.metamodel.Metamodel;
import org.apache.poi.ss.usermodel.Sheet;
import org.apache.poi.ss.usermodel.Workbook;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;

/**
 *
 * @author f_fotuhi
 */
@Stateless
public class VwglSsupService {

    @Inject
    private EntityManager entityManager;

    public Map<String, Object> getAll(FilterWrapper filterWrapper, Integer start, Integer limit, SortWrapper sort) {
        Map<String, Object> map = new HashMap<>();
        Boolean repeatedId = false;
        if (filterWrapper != null && filterWrapper.getFilters() != null) {
            Object[] filterArray = filterWrapper.getFilters().toArray();

            for (int i = 0; i < filterArray.length; i++) {
                Filter filter = (Filter) filterArray[i];
                String field = filter.getProperty();
                if (field.equals("repeated")) {
                    repeatedId = true;
                }
            }
        }
        if (repeatedId == true) {
            map.put("list", vwDupGetList(filterWrapper, start, limit, sort));
            map.put("total", vwDupGetCount(filterWrapper));
        } else {
            map.put("list", vwGetList(filterWrapper, start, limit, sort));
            map.put("total", vwGetCount(filterWrapper));
        }
        return map;

    }

    //get list from vwSendToMali
    private List<VwSendToMaliReport> vwGetList(FilterWrapper filter, Integer start, Integer limit, SortWrapper sort) {
        TypedQuery createQuery = entityManager.createQuery(getQuery(filter, sort));
        List<VwSendToMaliReport> reportList = new ArrayList<>();

        if (start != null && limit != null) {
            reportList = createQuery.setFirstResult(start).setMaxResults(limit).getResultList();
        } else if (start == null && limit != null) {
            reportList = createQuery.setMaxResults(limit).getResultList();
        } else if (start != null && limit == null) {
            reportList = createQuery.setFirstResult(start).getResultList();
        } else if (start == null && limit == null) {
            reportList = createQuery.getResultList();
        }

        return reportList;

    }

    //get list from vwSendToMaliDuplicates
    private List<VwSendToMaliDuplicates> vwDupGetList(FilterWrapper filter, Integer start, Integer limit, SortWrapper sort) {
        TypedQuery createQuery = entityManager.createQuery(getQueryDup(filter, sort));
        List<VwSendToMaliDuplicates> reportList = new ArrayList<>();

        if (start != null && limit != null) {
            reportList = createQuery.setFirstResult(start).setMaxResults(limit).getResultList();
        } else if (start == null && limit != null) {
            reportList = createQuery.setMaxResults(limit).getResultList();
        } else if (start != null && limit == null) {
            reportList = createQuery.setFirstResult(start).getResultList();
        } else if (start == null && limit == null) {
            reportList = createQuery.getResultList();
        }

        return reportList;

    }

    private Integer vwGetCount(FilterWrapper filter) {
        Integer count = 0;
        TypedQuery createQuery = entityManager.createQuery(getQuery(filter, null));
        count = createQuery.getResultList().size();
        return count;

    }

    private Integer vwDupGetCount(FilterWrapper filter) {
        Integer count = 0;
        TypedQuery createQuery = entityManager.createQuery(getQueryDup(filter, null));
        count = createQuery.getResultList().size();
        return count;

    }

//    private List<VwglSsup> getList(FilterWrapper filterWrapper, Integer start, Integer limit, SortWrapper sort) {
//        List<Object[]> vwglSsupList = new ArrayList<>();
//
//        String stringQuery = "select * from VW_STP_GL_SSUP t where t.PAY_DOCNO || t.RISUNATCODE || t.REQ_SERIAL \n"
//                + "not in (select g.pay_docno||g.natcode||g.stp_req_serial  from gl_pay_detail g\n"
//                + ")";
//
//        Query query = null;
//        boolean repeatedCheck = false;
//        if (filterWrapper != null && filterWrapper.getFilters() != null) {
//            Object[] filterArray = filterWrapper.getFilters().toArray();
//
//            for (int i = 0; i < filterArray.length; i++) {
//                Filter filter = (Filter) filterArray[i];
//                String field = filter.getProperty();
//                Object value = filter.getValue();
//                Filter.Operator operator = filter.getOperator();
//
//                if (field.contains("Date")) {
//
//                    Date reqDate = DateUtils.convertDateStringToDate(value.toString().replace("/", ""));
//                    value = DateUtils.format(reqDate, "yyyyMMdd");
//
//                    field = "SENDDT";
//                }
//
//                switch (operator) {
//                    case EQUAL:
//                        stringQuery += " and t." + field + " = " + value;
//                        break;
//
//                    case LIKE:
//                        stringQuery += " and t." + field + " like '%" + value + "%'";
//                        break;
//                    case AFTER:
//                        stringQuery += " and t." + field + " >= " + value;
//                        break;
//                    case BEFORE:
//                        stringQuery += " and t." + field + " <= " + value;
//                        break;
//                    case IN:
//                        repeatedCheck = true;
//                        String countQuery = "(select t.RISUNATCODE from VW_STP_GL_SSUP t where t.PAY_DOCNO || t.RISUNATCODE || t.REQ_SERIAL not in\n"
//                                + " (select g.pay_docno||g.natcode||g.stp_req_serial  from gl_pay_detail g )\n"
//                                + "having count(t.RISUNATCODE) >1 \n"
//                                + "  group by t.RISUNATCODE)";
//
//                        stringQuery += " and t.RISUNATCODE in " + countQuery;
//                        break;
//                    default:
//                        break;
//                }
//            }
//            if (repeatedCheck == true) {
//                stringQuery += "   order by t.RISUNATCODE";
//                query = entityManager.createNativeQuery(stringQuery);
//            } else {
//                query = entityManager.createNativeQuery(stringQuery);
//            }
//        } else {
//            query = entityManager.createNativeQuery(stringQuery);
//        }
//
//        if (start != null && limit != null) {
//            vwglSsupList = query.setFirstResult(start).setMaxResults(limit).getResultList();
//        } else if (start == null && limit != null) {
//            vwglSsupList = query.setMaxResults(limit).getResultList();
//        } else if (start != null && limit == null) {
//            vwglSsupList = query.setFirstResult(start).getResultList();
//        } else if (start == null && limit == null) {
//            vwglSsupList = query.getResultList();
//        }
//
//        List<VwglSsup> finalList = new ArrayList<>();
//        for (Object[] obja : vwglSsupList) {
//            VwglSsup vwglSsup = new VwglSsup();
//            vwglSsup.setBrchcode(obja[25].toString());
//            vwglSsup.setSsn(obja[24].toString());
//            vwglSsup.setRisuid(obja[0].toString());
//            vwglSsup.setRisunatcode(obja[23].toString());
//            vwglSsup.setRisufname(obja[2].toString());
//            vwglSsup.setRisulname(obja[1].toString());
//            vwglSsup.setIsutypedesc(obja[19].toString());
//            vwglSsup.setIsustatdesc(obja[21].toString());
//            vwglSsup.setReqSerial(obja[6].toString());
//            vwglSsup.setReqDate(obja[5].toString());
//            vwglSsup.setReqHlptypdsc(obja[4].toString());
//            vwglSsup.setPayAmt(obja[7].toString());
//            vwglSsup.setVakName(obja[12].toString());
//            vwglSsup.setBankname(obja[14].toString());
//            vwglSsup.setRisuaccno(obja[17].toString());
//            vwglSsup.setPayDocno(obja[8].toString());
//            vwglSsup.setPayDocdat(obja[9].toString());
//            if (obja[34] != null) {
//                vwglSsup.setCalcStartDate(obja[34].toString());
//            }
//            if (obja[35] != null) {
//                vwglSsup.setCalcEndDate(obja[35].toString());
//            }
//            if (obja[26] != null) {
//                vwglSsup.setFirstConfirmUser(obja[26].toString());
//            }
//            if (obja[27] != null) {
//                vwglSsup.setFirstConfirmDate(obja[27].toString());
//            }
//            if (obja[28] != null) {
//                vwglSsup.setSecondConfirmUser(obja[28].toString());
//            }
//            if (obja[29] != null) {
//                vwglSsup.setSecondConfirmDate(obja[29].toString());
//            }
//            if (obja[30] != null) {
//                vwglSsup.setSendToMaliUser(obja[30].toString());
//            }
//            if (obja[31] != null) {
//                vwglSsup.setSendToMaliDate(obja[31].toString());
//            }
//            finalList.add(vwglSsup);
//        }
//
//        return finalList;
//
//    }
//    private Integer getCount(FilterWrapper filter) {
//        Integer count = 0;
//        List<VwglSsup> allList = getList(filter, null, null, null);
//        count = allList.size();
//
//        return count;
//
//    }
    private CriteriaQuery getQuery(FilterWrapper filterWrapper, SortWrapper sortWrapper) {
        try {
            CriteriaBuilder criteriaBuilder = entityManager.getCriteriaBuilder();
            CriteriaQuery criteriaQuery = criteriaBuilder.createQuery();
            Root<VwSendToMaliReport> vwSendToMaliReportFrom = criteriaQuery.from(VwSendToMaliReport.class);
            List<Predicate> predicates = new ArrayList<>();
            Metamodel metamodel = entityManager.getMetamodel();
            EntityType<VwSendToMaliReport> entityType = metamodel.entity(VwSendToMaliReport.class);
            if (filterWrapper != null && filterWrapper.getFilters() != null) {

                Object[] filterArray = filterWrapper.getFilters().toArray();

                for (int i = 0; i < filterArray.length; i++) {
                    Filter filter = (Filter) filterArray[i];
                    String field = filter.getProperty();
                    Object value = filter.getValue();
                    Filter.Operator operator = filter.getOperator();

                    if (field.contains("Date")) {

                        Date reqDate = DateUtils.convertDateStringToDate(value.toString().replace("/", ""));
                        value = DateUtils.format(reqDate, "yyyyMMdd");

                        field = "sendToMaliDate";
                    }

                    String[] f = field.split("\\.");

                    Predicate predicate = null;
                    javax.persistence.criteria.Path path;
                    switch (operator) {
                        case EQUAL:

                            path = vwSendToMaliReportFrom.get(f[0]);
                            for (int j = 1; j < f.length; j++) {
                                path = path.get(f[j]);
                            }

                            predicate = criteriaBuilder.equal(path, value);
                            predicates.add(predicate);

                            break;

                        case NOT_EQUAL:
                            path = vwSendToMaliReportFrom.get(f[0]);
                            for (int j = 1; j < f.length; j++) {
                                path = path.get(f[j]);
                            }
                            predicate = criteriaBuilder.notEqual(path, value);
                            predicates.add(predicate);
                            break;
                        case LIKE:

                            predicates.add(criteriaBuilder.like(vwSendToMaliReportFrom.get(entityType.getDeclaredSingularAttribute(field, String.class)), "%" + value.toString().replace(" ", "") + "%"));
                            break;
                        case AFTER:
                            path = vwSendToMaliReportFrom.get(f[0]);
                            predicates.add(criteriaBuilder.greaterThanOrEqualTo(path, value.toString()));
                            break;
                        case BEFORE:
                            path = vwSendToMaliReportFrom.get(f[0]);
                            predicates.add(criteriaBuilder.lessThanOrEqualTo(path, value.toString()));
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
                    if (sortSet.getDirection().getName().equals(Sort.Direction.DESC.getName())) {
                        order = criteriaBuilder.desc(vwSendToMaliReportFrom.get(sortProperties[0]));
                    } else {
                        order = criteriaBuilder.asc(vwSendToMaliReportFrom.get(sortProperties[0]));
                    }

                    orders.add(order);
                }
                if (!orders.isEmpty()) {
                    criteriaQuery.orderBy(orders);
                }
            }
            criteriaQuery.select(vwSendToMaliReportFrom);
            return criteriaQuery;
        } catch (Exception e) {
            Logger.getLogger(VwglSsupService.class.getName()).log(Level.SEVERE, e.getMessage(), e);
            return null;
        }
    }

    private CriteriaQuery getQueryDup(FilterWrapper filterWrapper, SortWrapper sortWrapper) {
        try {
            CriteriaBuilder criteriaBuilder = entityManager.getCriteriaBuilder();
            CriteriaQuery criteriaQuery = criteriaBuilder.createQuery();
            Root<VwSendToMaliDuplicates> vwSendToMaliDuplicatesFrom = criteriaQuery.from(VwSendToMaliDuplicates.class);
            List<Predicate> predicates = new ArrayList<>();
            Metamodel metamodel = entityManager.getMetamodel();
            EntityType<VwSendToMaliDuplicates> entityType = metamodel.entity(VwSendToMaliDuplicates.class);
            if (filterWrapper != null && filterWrapper.getFilters() != null) {

                Object[] filterArray = filterWrapper.getFilters().toArray();

                for (int i = 0; i < filterArray.length; i++) {
                    Filter filter = (Filter) filterArray[i];
                    String field = filter.getProperty();
                    Object value = filter.getValue();
                    Filter.Operator operator = filter.getOperator();

                    if (field.contains("Date")) {

                        Date reqDate = DateUtils.convertDateStringToDate(value.toString().replace("/", ""));
                        value = DateUtils.format(reqDate, "yyyyMMdd");

                        field = "payDocdat";
                    }
                    if (field.contains("repeated")) {
                        Sort sort = new Sort();
                        sort.setProperty("risunatcode");
                        sort.setDirection(DESC);
                        if (sortWrapper != null) {
                            sortWrapper.getSortSet().add(sort);
                        } else {
                            sortWrapper = new SortWrapper();
                            sortWrapper.setSortSet(new HashSet<Sort>());
                            sortWrapper.getSortSet().add(sort);
                        }
                    }

                    String[] f = field.split("\\.");

                    Predicate predicate = null;
                    javax.persistence.criteria.Path path;
                    switch (operator) {
                        case EQUAL:

                            path = vwSendToMaliDuplicatesFrom.get(f[0]);
                            for (int j = 1; j < f.length; j++) {
                                path = path.get(f[j]);
                            }

                            predicate = criteriaBuilder.equal(path, value);
                            predicates.add(predicate);

                            break;
                        case NOT_EQUAL:
                            path = vwSendToMaliDuplicatesFrom.get(f[0]);
                            for (int j = 1; j < f.length; j++) {
                                path = path.get(f[j]);
                            }

                            predicate = criteriaBuilder.notEqual(path, value);
                            predicates.add(predicate);

                            break;

                        case LIKE:

                            predicates.add(criteriaBuilder.like(vwSendToMaliDuplicatesFrom.get(entityType.getDeclaredSingularAttribute(field, String.class)), "%" + value.toString().replace(" ", "") + "%"));
                            break;
                        case AFTER:
                            path = vwSendToMaliDuplicatesFrom.get(f[0]);
                            predicates.add(criteriaBuilder.greaterThanOrEqualTo(path, value.toString()));
                            break;
                        case BEFORE:
                            path = vwSendToMaliDuplicatesFrom.get(f[0]);
                            predicates.add(criteriaBuilder.lessThanOrEqualTo(path, value.toString()));
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
                    if (sortSet.getDirection().getName().equals(Sort.Direction.DESC.getName())) {
                        order = criteriaBuilder.desc(vwSendToMaliDuplicatesFrom.get(sortProperties[0]));
                    } else {
                        order = criteriaBuilder.asc(vwSendToMaliDuplicatesFrom.get(sortProperties[0]));
                    }

                    orders.add(order);
                }
                if (!orders.isEmpty()) {
                    criteriaQuery.orderBy(orders);
                }
            }
            criteriaQuery.select(vwSendToMaliDuplicatesFrom);
            return criteriaQuery;
        } catch (Exception e) {
            Logger.getLogger(VwglSsupService.class.getName()).log(Level.SEVERE, e.getMessage(), e);
            return null;
        }
    }

    public Workbook writeToExcel(FilterWrapper filterWrapper, Integer start, Integer limit, SortWrapper sort) throws IOException {
        XSSFWorkbook wb = new XSSFWorkbook();

        Sheet sheet = wb.createSheet();
        sheet.setRightToLeft(true);

        Font font = wb.createFont();

        CellStyle headerStyle = wb.createCellStyle();

        font.setFontName("Arial");
        font.setBoldweight(Font.BOLDWEIGHT_BOLD);
        font.setColor(HSSFColor.BLACK.index);

        headerStyle.setBorderBottom(CellStyle.BORDER_THIN);
        headerStyle.setBottomBorderColor(IndexedColors.BLACK.getIndex());
        headerStyle.setBorderLeft(CellStyle.BORDER_THIN);
        headerStyle.setLeftBorderColor(IndexedColors.BLACK.getIndex());
        headerStyle.setBorderRight(CellStyle.BORDER_THIN);
        headerStyle.setRightBorderColor(IndexedColors.BLACK.getIndex());
        headerStyle.setBorderTop(CellStyle.BORDER_THIN);
        headerStyle.setTopBorderColor(IndexedColors.BLACK.getIndex());
        headerStyle.setFont(font);

        headerStyle.setFillForegroundColor(IndexedColors.GREY_25_PERCENT.getIndex());
        headerStyle.setFillPattern(CellStyle.SOLID_FOREGROUND);

        CellStyle detailStyle = wb.createCellStyle();
        detailStyle.setBorderBottom(CellStyle.BORDER_THIN);
        detailStyle.setBottomBorderColor(IndexedColors.BLACK.getIndex());
        detailStyle.setBorderLeft(CellStyle.BORDER_THIN);
        detailStyle.setLeftBorderColor(IndexedColors.BLACK.getIndex());
        detailStyle.setBorderRight(CellStyle.BORDER_THIN);
        detailStyle.setRightBorderColor(IndexedColors.BLACK.getIndex());
        detailStyle.setBorderTop(CellStyle.BORDER_THIN);
        detailStyle.setTopBorderColor(IndexedColors.BLACK.getIndex());

        Row row = sheet.createRow(0);

        Cell cell0 = row.createCell(0);
        cell0.setCellValue("ردیف");
        cell0.setCellStyle(headerStyle);

        Cell cell1 = row.createCell(1);
        cell1.setCellValue("کد شعبه");
        cell1.setCellStyle(headerStyle);

        Cell cell2 = row.createCell(2);
        cell2.setCellValue("SSN");
        cell2.setCellStyle(headerStyle);

        Cell cell3 = row.createCell(3);
        cell3.setCellValue("شماره بیمه");
        cell3.setCellStyle(headerStyle);

        Cell cell4 = row.createCell(4);
        cell4.setCellValue("ملیت");
        cell4.setCellStyle(headerStyle);

        Cell cell5 = row.createCell(5);
        cell5.setCellValue("کد ملی");
        cell5.setCellStyle(headerStyle);

        Cell cell6 = row.createCell(6);
        cell6.setCellValue("نام");
        cell6.setCellStyle(headerStyle);

        Cell cell7 = row.createCell(7);
        cell7.setCellValue("نام خانوادگی");
        cell7.setCellStyle(headerStyle);

        Cell cell8 = row.createCell(8);
        cell8.setCellValue("نوع بیمه");
        cell8.setCellStyle(headerStyle);

        Cell cell9 = row.createCell(9);
        cell9.setCellValue("وضعیت بیمه");
        cell9.setCellStyle(headerStyle);

        Cell cell10 = row.createCell(10);
        cell10.setCellValue("شماره درخواست");
        cell10.setCellStyle(headerStyle);

        Cell cell11 = row.createCell(11);
        cell11.setCellValue("تاریخ درخواست");
        cell11.setCellStyle(headerStyle);

        Cell cell12 = row.createCell(12);
        cell12.setCellValue("نوع خدمت");
        cell12.setCellStyle(headerStyle);

        Cell cell13 = row.createCell(13);
        cell13.setCellValue("مبلغ");
        cell13.setCellStyle(headerStyle);

        Cell cell15 = row.createCell(14);
        cell15.setCellValue("نام بانک");
        cell15.setCellStyle(headerStyle);

        Cell cell16 = row.createCell(15);
        cell16.setCellValue("شماره حساب");
        cell16.setCellStyle(headerStyle);

        Cell cell17 = row.createCell(16);
        cell17.setCellValue("شماره سند");
        cell17.setCellStyle(headerStyle);

        Cell cell18 = row.createCell(17);
        cell18.setCellValue("تاریخ سند");
        cell18.setCellStyle(headerStyle);

        Cell cell19 = row.createCell(18);
        cell19.setCellValue("شروع دوره محاسبه");
        cell19.setCellStyle(headerStyle);

        Cell cell20 = row.createCell(19);
        cell20.setCellValue("پایان دوره محاسبه");
        cell20.setCellStyle(headerStyle);

        Cell cell21 = row.createCell(20);
        cell21.setCellValue(" تایید کننده1");
        cell21.setCellStyle(headerStyle);

        Cell cell22 = row.createCell(21);
        cell22.setCellValue("تاریخ تایید");
        cell22.setCellStyle(headerStyle);

        Cell cell23 = row.createCell(22);
        cell23.setCellValue(" تایید کننده2");
        cell23.setCellStyle(headerStyle);

        Cell cell24 = row.createCell(23);
        cell24.setCellValue("تاریخ تایید");
        cell24.setCellStyle(headerStyle);

        Cell cell25 = row.createCell(24);
        cell25.setCellValue("ارسال کننده به مالی");
        cell25.setCellStyle(headerStyle);

        Cell cell26 = row.createCell(25);
        cell26.setCellValue("تاریخ ارسال");
        cell26.setCellStyle(headerStyle);

        Boolean repeatedId = false;
        int rownum = 1;
        if (filterWrapper != null && filterWrapper.getFilters() != null) {
            Object[] filterArray = filterWrapper.getFilters().toArray();

            for (int i = 0; i < filterArray.length; i++) {
                Filter filter = (Filter) filterArray[i];
                String field = filter.getProperty();
                if (field.equals("repeated")) {
                    repeatedId = true;
                }
            }
        }
        if (repeatedId == true) {
            List<VwSendToMaliDuplicates> resultList = vwDupGetList(filterWrapper, null, null, null);
            for (VwSendToMaliDuplicates item : resultList) {
                String ssn = item.getSsn();
                String risuType = item.getIsutypedesc();
                String branchCode = item.getBrchcode();
                String risuStatus = item.getIsustatdesc();
                String reqNo = item.getReqSerial();
                String risuid = item.getRisuid();
                String nationality = (item.getNationality().equals("01") ? "01" : "02");
                nationality = NationalityEnum.find(nationality).getName();
//                String nationality = (item.getNationality().equals("01") ? "ایرانی" : "غیرایرانی");

                String natcode = item.getRisunatcode();
                String lastName = item.getRisulname();
                String firstName = item.getRisufname();
                String helpTypeDesc = item.getReqHlptypdsc();
                String payAmount = item.getPayAmt();
                String reqDate = item.getReqDate();
                String bankName = item.getBankname();
                String accountNo = item.getRisuaccno();
                String payDate = item.getPayDocdat();
                String payNo = item.getPayDocno();

                String calcStartDate = item.getCalcStartDate();
                String calcEndDate = item.getCalcEndDate();
                String sendToMaliUser = item.getSendToMaliUser();
                String sendToMaliDate = item.getSendToMaliDate();
                String firstConfirmUesr = (item.getFirstConfirmUser() != null ? item.getFirstConfirmUser() : " ");
                String firstConfirmDate = item.getFirstConfirmDate();
                String secondConfirmUesr = (item.getSecondConfirmUser() != null ? item.getSecondConfirmUser() : " ");
                String secondConfirmDate = item.getSecondConfirmDate();

                row = sheet.createRow(rownum++);
                int cellnum = 0;

                Cell cell = row.createCell(cellnum++);
                cell.setCellStyle(detailStyle);
                cell.setCellValue(rownum - 1);

                cell = row.createCell(cellnum++);
                cell.setCellStyle(detailStyle);
                cell.setCellValue(branchCode);

                cell = row.createCell(cellnum++);
                cell.setCellStyle(detailStyle);
                cell.setCellValue(ssn);

                cell = row.createCell(cellnum++);
                cell.setCellStyle(detailStyle);
                cell.setCellValue(risuid);

                cell = row.createCell(cellnum++);
                cell.setCellStyle(detailStyle);
                cell.setCellValue(nationality);

                cell = row.createCell(cellnum++);
                cell.setCellStyle(detailStyle);
                cell.setCellValue(natcode);

                cell = row.createCell(cellnum++);
                cell.setCellStyle(detailStyle);
                cell.setCellValue(firstName);

                cell = row.createCell(cellnum++);
                cell.setCellStyle(detailStyle);
                cell.setCellValue(lastName);

                cell = row.createCell(cellnum++);
                cell.setCellStyle(detailStyle);
                cell.setCellValue(risuType);

                cell = row.createCell(cellnum++);
                cell.setCellStyle(detailStyle);
                cell.setCellValue(risuStatus);

                cell = row.createCell(cellnum++);
                cell.setCellStyle(detailStyle);
                cell.setCellValue(reqNo);

                cell = row.createCell(cellnum++);
                cell.setCellStyle(detailStyle);
                cell.setCellValue(reqDate);

                cell = row.createCell(cellnum++);
                cell.setCellStyle(detailStyle);
                cell.setCellValue(helpTypeDesc);

                cell = row.createCell(cellnum++);
                cell.setCellStyle(detailStyle);
                cell.setCellValue(payAmount);

                cell = row.createCell(cellnum++);
                cell.setCellStyle(detailStyle);
                cell.setCellValue(bankName);

                cell = row.createCell(cellnum++);
                cell.setCellStyle(detailStyle);
                cell.setCellValue(accountNo);

                cell = row.createCell(cellnum++);
                cell.setCellStyle(detailStyle);
                cell.setCellValue(payNo);

                cell = row.createCell(cellnum++);
                cell.setCellStyle(detailStyle);
                cell.setCellValue(payDate);

                cell = row.createCell(cellnum++);
                cell.setCellStyle(detailStyle);
                cell.setCellValue(calcStartDate);

                cell = row.createCell(cellnum++);
                cell.setCellStyle(detailStyle);
                cell.setCellValue(calcEndDate);

                cell = row.createCell(cellnum++);
                cell.setCellStyle(detailStyle);
                cell.setCellValue(firstConfirmUesr);

                cell = row.createCell(cellnum++);
                cell.setCellStyle(detailStyle);
                cell.setCellValue(firstConfirmDate);

                cell = row.createCell(cellnum++);
                cell.setCellStyle(detailStyle);
                cell.setCellValue(secondConfirmUesr);

                cell = row.createCell(cellnum++);
                cell.setCellStyle(detailStyle);
                cell.setCellValue(secondConfirmDate);

                cell = row.createCell(cellnum++);
                cell.setCellStyle(detailStyle);
                cell.setCellValue(sendToMaliUser);

                cell = row.createCell(cellnum++);
                cell.setCellStyle(detailStyle);
                cell.setCellValue(sendToMaliDate);

            }
        } else {
            List<VwSendToMaliReport> resultList = vwGetList(filterWrapper, null, null, null);
            for (VwSendToMaliReport item : resultList) {
                String ssn = item.getSsn();
                String risuType = item.getIsutypedesc();
                String branchCode = item.getBrchcode();
                String risuStatus = item.getIsustatdesc();
                String reqNo = item.getReqSerial();
                String risuid = item.getRisuid();

                String nationality = (item.getNationality().equals("01") ? "01" : "02");
                nationality = NationalityEnum.find(nationality).getName();
//                String nationality = (item.getNationality().equals("01") ? "ایرانی" : "غیرایرانی");
                String natcode = item.getRisunatcode();
                String lastName = item.getRisulname();
                String firstName = item.getRisufname();
                String helpTypeDesc = item.getReqHlptypdsc();
                String payAmount = item.getPayAmt();
                String reqDate = item.getReqDate();
                String bankName = item.getBankname();
                String accountNo = item.getRisuaccno();
                String payDate = item.getPayDocdat();
                String payNo = item.getPayDocno();

                String calcStartDate = item.getCalcStartDate();
                String calcEndDate = item.getCalcEndDate();
                String sendToMaliUser = item.getSendToMaliUser();
                String sendToMaliDate = item.getSendToMaliDate();
                String firstConfirmUesr = (item.getFirstConfirmUser() != null ? item.getFirstConfirmUser() : " ");
                String firstConfirmDate = item.getFirstConfirmDate();
                String secondConfirmUesr = (item.getSecondConfirmUser() != null ? item.getSecondConfirmUser() : " ");
                String secondConfirmDate = item.getSecondConfirmDate();

                row = sheet.createRow(rownum++);
                int cellnum = 0;

                Cell cell = row.createCell(cellnum++);
                cell.setCellStyle(detailStyle);
                cell.setCellValue(rownum - 1);

                cell = row.createCell(cellnum++);
                cell.setCellStyle(detailStyle);
                cell.setCellValue(branchCode);

                cell = row.createCell(cellnum++);
                cell.setCellStyle(detailStyle);
                cell.setCellValue(ssn);

                cell = row.createCell(cellnum++);
                cell.setCellStyle(detailStyle);
                cell.setCellValue(risuid);

                cell = row.createCell(cellnum++);
                cell.setCellStyle(detailStyle);
                cell.setCellValue(nationality);

                cell = row.createCell(cellnum++);
                cell.setCellStyle(detailStyle);
                cell.setCellValue(natcode);

                cell = row.createCell(cellnum++);
                cell.setCellStyle(detailStyle);
                cell.setCellValue(firstName);

                cell = row.createCell(cellnum++);
                cell.setCellStyle(detailStyle);
                cell.setCellValue(lastName);

                cell = row.createCell(cellnum++);
                cell.setCellStyle(detailStyle);
                cell.setCellValue(risuType);

                cell = row.createCell(cellnum++);
                cell.setCellStyle(detailStyle);
                cell.setCellValue(risuStatus);

                cell = row.createCell(cellnum++);
                cell.setCellStyle(detailStyle);
                cell.setCellValue(reqNo);

                cell = row.createCell(cellnum++);
                cell.setCellStyle(detailStyle);
                cell.setCellValue(reqDate);

                cell = row.createCell(cellnum++);
                cell.setCellStyle(detailStyle);
                cell.setCellValue(helpTypeDesc);

                cell = row.createCell(cellnum++);
                cell.setCellStyle(detailStyle);
                cell.setCellValue(payAmount);

                cell = row.createCell(cellnum++);
                cell.setCellStyle(detailStyle);
                cell.setCellValue(bankName);

                cell = row.createCell(cellnum++);
                cell.setCellStyle(detailStyle);
                cell.setCellValue(accountNo);

                cell = row.createCell(cellnum++);
                cell.setCellStyle(detailStyle);
                cell.setCellValue(payNo);

                cell = row.createCell(cellnum++);
                cell.setCellStyle(detailStyle);
                cell.setCellValue(payDate);

                cell = row.createCell(cellnum++);
                cell.setCellStyle(detailStyle);
                cell.setCellValue(calcStartDate);

                cell = row.createCell(cellnum++);
                cell.setCellStyle(detailStyle);
                cell.setCellValue(calcEndDate);

                cell = row.createCell(cellnum++);
                cell.setCellStyle(detailStyle);
                cell.setCellValue(firstConfirmUesr);

                cell = row.createCell(cellnum++);
                cell.setCellStyle(detailStyle);
                cell.setCellValue(firstConfirmDate);

                cell = row.createCell(cellnum++);
                cell.setCellStyle(detailStyle);
                cell.setCellValue(secondConfirmUesr);

                cell = row.createCell(cellnum++);
                cell.setCellStyle(detailStyle);
                cell.setCellValue(secondConfirmDate);

                cell = row.createCell(cellnum++);
                cell.setCellStyle(detailStyle);
                cell.setCellValue(sendToMaliUser);

                cell = row.createCell(cellnum++);
                cell.setCellStyle(detailStyle);
                cell.setCellValue(sendToMaliDate);

            }
        }

        return wb;
    }

    public HSSFColor setColor(HSSFWorkbook workbook, byte r, byte g, byte b, short index) {
        HSSFPalette palette = workbook.getCustomPalette();
        HSSFColor hssfColor = null;
        try {
            hssfColor = palette.findColor(r, g, b);
            if (hssfColor == null) {
                palette.setColorAtIndex(index, r, g, b);
                hssfColor = palette.getColor(index);
            }
        } catch (Exception e) {
            //logger.error(e);
        }
        return hssfColor;
    }

    public String writeToXml(FilterWrapper filterWrapper, Integer start, Integer limit, SortWrapper sort) throws IOException {
        try {

            Boolean repeatedId = false;
            if (filterWrapper != null && filterWrapper.getFilters() != null) {
                Object[] filterArray = filterWrapper.getFilters().toArray();

                for (int i = 0; i < filterArray.length; i++) {
                    Filter filter = (Filter) filterArray[i];
                    String field = filter.getProperty();
                    if (field.equals("repeated")) {
                        repeatedId = true;
                    }
                }
            }
            if (repeatedId == true) {
                List<VwSendToMaliDuplicates> resultList = vwDupGetList(filterWrapper, null, null, null);
                XStream xStream = new XStream(new DomDriver());
                String xml = xStream.toXML(resultList);
                return xml;
            } else {
                List<VwSendToMaliReport> resultList = vwGetList(filterWrapper, null, null, null);
                XStream xStream = new XStream(new DomDriver());
                String xml = xStream.toXML(resultList);
                return xml;
            }
        } catch (Exception ex) {
            Logger.getLogger(VwglSsupService.class.getName()).log(Level.SEVERE, null, ex);
            return null;
        }
    }

    public Database writeToAccess(FilterWrapper filterWrapper, Integer start, Integer limit, SortWrapper sort) throws ClassNotFoundException, SQLException, IOException, NumberFormatException {

        String file = "sendToMaliReport.accdb";

        Boolean repeatedId = false;
        if (filterWrapper != null && filterWrapper.getFilters() != null) {
            Object[] filterArray = filterWrapper.getFilters().toArray();

            for (int i = 0; i < filterArray.length; i++) {
                Filter filter = (Filter) filterArray[i];
                String field = filter.getProperty();
                if (field.equals("repeated")) {
                    repeatedId = true;
                }
            }
        }
        try {
            Database db = (DatabaseBuilder.create(Database.FileFormat.V2010, new File(file)));
            String vwglSsupReport = "sendToMaliReport";
            Table table = new TableBuilder(vwglSsupReport) // Creating table
                    .addColumn(new ColumnBuilder("BRCHCODE").setSQLType(Types.VARCHAR).toColumn())
                    .addColumn(new ColumnBuilder("SSN").setSQLType(Types.VARCHAR).toColumn())
                    .addColumn(new ColumnBuilder("RISUID").setSQLType(Types.VARCHAR).toColumn())
                    .addColumn(new ColumnBuilder("NATIONALITY").setSQLType(Types.VARCHAR).toColumn())
                    .addColumn(new ColumnBuilder("RISUNATCODE").setSQLType(Types.VARCHAR).toColumn())
                    .addColumn(new ColumnBuilder("RISUFNAME").setSQLType(Types.VARCHAR).toColumn())
                    .addColumn(new ColumnBuilder("RISULNAME").setSQLType(Types.VARCHAR).toColumn())
                    .addColumn(new ColumnBuilder("ISUTYPEDESC").setSQLType(Types.VARCHAR).toColumn())
                    .addColumn(new ColumnBuilder("ISUSTATDESC").setSQLType(Types.VARCHAR).toColumn())
                    .addColumn(new ColumnBuilder("REQ_SERIAL").setSQLType(Types.VARCHAR).toColumn())
                    .addColumn(new ColumnBuilder("REQ_DATE").setSQLType(Types.VARCHAR).toColumn())
                    .addColumn(new ColumnBuilder("reqHlptypdsc").setSQLType(Types.VARCHAR).toColumn())
                    .addColumn(new ColumnBuilder("PAY_AMT").setSQLType(Types.VARCHAR).toColumn())
                    .addColumn(new ColumnBuilder("BANKNAME").setSQLType(Types.VARCHAR).toColumn())
                    .addColumn(new ColumnBuilder("RISUACCNO").setSQLType(Types.VARCHAR).toColumn())
                    .addColumn(new ColumnBuilder("PAY_DOCNO").setSQLType(Types.VARCHAR).toColumn())
                    .addColumn(new ColumnBuilder("PAY_DOCDAT").setSQLType(Types.VARCHAR).toColumn())
                    .addColumn(new ColumnBuilder("PAY_SDATE").setSQLType(Types.VARCHAR).toColumn())
                    .addColumn(new ColumnBuilder("PAY_EDATE").setSQLType(Types.VARCHAR).toColumn())
                    .addColumn(new ColumnBuilder("CONFUID1").setSQLType(Types.VARCHAR).toColumn())
                    .addColumn(new ColumnBuilder("CONFDT1").setSQLType(Types.VARCHAR).toColumn())
                    .addColumn(new ColumnBuilder("CONFUID2").setSQLType(Types.VARCHAR).toColumn())
                    .addColumn(new ColumnBuilder("CONFDT2").setSQLType(Types.VARCHAR).toColumn())
                    .addColumn(new ColumnBuilder("SENDUID").setSQLType(Types.VARCHAR).toColumn())
                    .addColumn(new ColumnBuilder("SENDDT").setSQLType(Types.VARCHAR).toColumn())
                    .toTable(db);

            if (repeatedId == true) {
                List<VwSendToMaliDuplicates> sendToMaliReport = vwDupGetList(filterWrapper, null, null, null);

                for (VwSendToMaliDuplicates item : sendToMaliReport) {
                    String ssn = item.getSsn();
                    String risuType = item.getIsutypedesc();
                    String branchCode = item.getBrchcode();
                    String risuStatus = item.getIsustatdesc();
                    String reqNo = item.getReqSerial();
                    String risuid = item.getRisuid();
                    String nationality = (item.getNationality().equals("01") ? "01" : "02");
                    nationality = NationalityEnum.find(nationality).getName();
//                    String nationality = (item.getNationality().equals("01") ? "ایرانی" : "غیرایرانی");
                    String natcode = item.getRisunatcode();
                    String lastName = item.getRisulname();
                    String firstName = item.getRisufname();
                    String helpTypeDesc = item.getReqHlptypdsc();
                    String payAmount = item.getPayAmt();
                    String reqDate = item.getReqDate();
                    String bankName = item.getBankname();
                    String accountNo = item.getRisuaccno();
                    String payDate = item.getPayDocdat();
                    String payNo = item.getPayDocno();
                    String calcStartDate = item.getCalcStartDate();
                    String calcEndDate = item.getCalcEndDate();
                    String sendToMaliUser = item.getSendToMaliUser();
                    String sendToMaliDate = item.getSendToMaliDate();
                    String firstConfirmUesr = (item.getFirstConfirmUser() != null ? item.getFirstConfirmUser() : " ");
                    String firstConfirmDate = item.getFirstConfirmDate();
                    String secondConfirmUesr = (item.getSecondConfirmUser() != null ? item.getSecondConfirmUser() : " ");
                    String secondConfirmDate = item.getSecondConfirmDate();
                    table.addRow(branchCode, ssn, risuid, nationality, natcode, firstName, lastName, risuType, risuStatus, reqNo,
                            reqDate, helpTypeDesc, payAmount, bankName, accountNo, payNo, payDate,
                            calcStartDate, calcEndDate, firstConfirmUesr, firstConfirmDate, secondConfirmUesr, secondConfirmDate,
                            sendToMaliUser, sendToMaliDate);//Inserting values into the table
                }
            } else {
                List<VwSendToMaliReport> sendToMaliReport = vwGetList(filterWrapper, null, null, null);

                for (VwSendToMaliReport item : sendToMaliReport) {
                    String ssn = item.getSsn();
                    String risuType = item.getIsutypedesc();
                    String branchCode = item.getBrchcode();
                    String risuStatus = item.getIsustatdesc();
                    String reqNo = item.getReqSerial();
                    String risuid = item.getRisuid();
                    String nationality = (item.getNationality().equals("01") ? "01" : "02");
                    nationality = NationalityEnum.find(nationality).getName();
//                    String nationality = (item.getNationality().equals("01") ? "ایرانی" : "غیرایرانی");
                    String natcode = item.getRisunatcode();
                    String lastName = item.getRisulname();
                    String firstName = item.getRisufname();
                    String helpTypeDesc = item.getReqHlptypdsc();
                    String payAmount = item.getPayAmt();
                    String reqDate = item.getReqDate();
                    String bankName = item.getBankname();
                    String accountNo = item.getRisuaccno();
                    String payDate = item.getPayDocdat();
                    String payNo = item.getPayDocno();
                    String calcStartDate = item.getCalcStartDate();
                    String calcEndDate = item.getCalcEndDate();
                    String sendToMaliUser = item.getSendToMaliUser();
                    String sendToMaliDate = item.getSendToMaliDate();
                    String firstConfirmUesr = (item.getFirstConfirmUser() != null ? item.getFirstConfirmUser() : " ");
                    String firstConfirmDate = item.getFirstConfirmDate();
                    String secondConfirmUesr = (item.getSecondConfirmUser() != null ? item.getSecondConfirmUser() : " ");
                    String secondConfirmDate = item.getSecondConfirmDate();
                    table.addRow(branchCode, ssn, risuid, nationality, natcode, firstName, lastName, risuType, risuStatus, reqNo,
                            reqDate, helpTypeDesc, payAmount, bankName, accountNo, payNo, payDate,
                            calcStartDate, calcEndDate, firstConfirmUesr, firstConfirmDate, secondConfirmUesr, secondConfirmDate,
                            sendToMaliUser, sendToMaliDate);//Inserting values into the table
                }

            }
            db.close();
            return db;
        } catch (Exception ex) {
            Logger.getLogger(VwglSsupService.class.getName()).log(Level.SEVERE, null, ex);
            return null;
        }

    }
}
