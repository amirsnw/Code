/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package ir.tamin.incomeBank.service.centralPayment;

import com.ibm.icu.text.NumberFormat;
import ir.tamin.incomeBank.model.centralPayment.*;
import ir.tamin.incomeBank.model.centralPayment.enums.PayStepEnum;
import ir.tamin.incomeBank.model.shortterm.NationalityEnum;
import ir.tamin.incomeBank.service.centralPayment.bankfile.builder.BankFile;
import ir.tamin.incomeBank.service.centralPayment.bankfile.builder.CompositeBankFileBuilder;
import ir.tamin.incomeBank.service.common.CommonService;
import ir.tamin.incomeBank.util.DateUtils;
import ir.tamin.framework.cdi.util.MessageBundle;
import ir.tamin.framework.core.util.Bundle;
import ir.tamin.framework.ws.rest.json.Filter;
import ir.tamin.framework.ws.rest.json.FilterWrapper;
import ir.tamin.framework.ws.rest.json.Sort;
import ir.tamin.framework.ws.rest.json.SortWrapper;
import org.apache.poi.ss.usermodel.*;

import javax.ejb.Stateless;
import javax.inject.Inject;
import javax.persistence.EntityManager;
import javax.persistence.TypedQuery;
import javax.persistence.criteria.*;
import javax.persistence.metamodel.EntityType;
import javax.persistence.metamodel.Metamodel;
import javax.servlet.http.HttpServletRequest;
import javax.ws.rs.BadRequestException;
import javax.ws.rs.WebApplicationException;
import javax.ws.rs.core.Response;

import org.apache.poi.ss.usermodel.Cell;
import org.apache.poi.ss.usermodel.CellStyle;
import org.apache.poi.ss.usermodel.Font;
import org.apache.poi.ss.usermodel.IndexedColors;
import org.apache.poi.ss.usermodel.Row;
import com.thoughtworks.xstream.XStream;
import com.thoughtworks.xstream.io.xml.DomDriver;
import com.healthmarketscience.jackcess.DatabaseBuilder;
import com.healthmarketscience.jackcess.ColumnBuilder;
import com.healthmarketscience.jackcess.Database;
import com.healthmarketscience.jackcess.Database.FileFormat;
import com.healthmarketscience.jackcess.Table;
import com.healthmarketscience.jackcess.TableBuilder;
import com.ibm.icu.text.SimpleDateFormat;
import ir.tamin.incomeBank.model.baseinfo.Bank;
import ir.tamin.incomeBank.model.baseinfo.IsuStatus;
import ir.tamin.incomeBank.model.baseinfo.IsuType;
import ir.tamin.incomeBank.model.baseinfo.OperationalBankEnum;
import ir.tamin.incomeBank.model.centralPayment.GlPayDetailDeleted;
import ir.tamin.incomeBank.model.centralPayment.enums.PayDetailStatusEnum;
import ir.tamin.incomeBank.model.centralPayment.enums.ReturnReasonEnum;
import ir.tamin.incomeBank.model.identityManager.User;
import ir.tamin.incomeBank.model.pension.PayReportModel;
import ir.tamin.incomeBank.model.pension.enums.PensionPayModelEnum;
import ir.tamin.incomeBank.service.RestServices;
import ir.tamin.incomeBank.service.accounting.GL.CompositeGLService;
import ir.tamin.incomeBank.service.accounting.GlOperationResultService;
import ir.tamin.incomeBank.service.centralPayment.bankfile.builder.BankAccountControlService;
import ir.tamin.incomeBank.service.jdbc.StoredProcedure;
import ir.tamin.framework.cdi.util.WebProperties;

import java.util.Date;
import javax.ejb.EJBException;

import org.apache.poi.hssf.usermodel.HSSFPalette;
import org.apache.poi.hssf.usermodel.HSSFWorkbook;
import org.apache.poi.hssf.util.HSSFColor;

import org.apache.poi.xssf.usermodel.XSSFWorkbook;

import java.io.ByteArrayInputStream;
import java.io.File;
import java.io.IOException;
import java.io.InputStream;
import java.math.BigDecimal;
import java.sql.SQLException;
import java.sql.Types;
import java.util.*;
import java.util.logging.Level;

import static java.util.logging.Level.SEVERE;

import java.util.logging.Logger;
import javax.ejb.TransactionAttribute;
import javax.ejb.TransactionAttributeType;

import net.sf.jasperreports.engine.JasperRunManager;
import net.sf.jasperreports.engine.data.JRBeanCollectionDataSource;
import org.json.JSONArray;
import org.slf4j.LoggerFactory;

//import org.apache.poi.;

/**
 * @author s_maknooni
 */
@Stateless
public class PayDetailService {

    @Inject
    EntityManager entityManager;

    @Inject
    @MessageBundle
    Bundle messageBundle;

    @Inject
    CompositeBankFileBuilder compositeBankFileBuilder;

    @Inject
    RestServices restServices;

    @Inject
    CompositeGLService compositeGLService;

    @Inject
    CommonService commonService;

    @Inject
    @WebProperties
    private Bundle webBundle;

    @Inject
    private StoredProcedure procedure;

    @Inject
    GlOperationResultService glOperationResultService;

    @Inject
    private BankAccountControlService accountControlService;

    @Inject
    private TempBankControlFileService tempBankControlFileService;

    @Inject
    BankAccountControlService bankAccountControlService;

    private static final String COMMA_DELIMITER = ",";
    private static final String NEW_LINE_SEPARATOR = "\n";
    private static final String FILE_HEADER = "بانک,تاریخ پرداخت,از تاریخ,تا تاریخ,وضعیت,شماره چک,تاریخ چک,کد ملی,شماره حساب,نام,نام خانوادگی,شماره بیمه,شماره مستمری,نوع پرداخت,کد شعبه,کد الفبا,حروف الفبا,مبلغ";
    private static final String FILE_HEADER_Detail = "کد ملی,شماره حساب,نام,نام خانوادگی,شماره بیمه,شماره  مستمری,نوع پرداخت,همکار/غیرهمکار,کد استان,نام استان,کد شعبه,نام شعبه,کد الفبا,حروف الفبا,مبلغ,شروع دوره محاسبه,پایان دوره محاسبه,تایید مسئول مستمری,تاریخ تایید مسئول مستمری,تایید مسئول مالی,تاریخ تایید مسئول مالی,تایید رئیس شعبه,تاریخ تایید رئیس شعبه";
//    private static final String BANK_CONTROL_FILE_HEADER = "کد ملی,شماره حساب,نام,نام خانوادگی,مبلغ";
//    private static final String FOREIGN_BANK_CONTROL_FILE_HEADER = "کد اتباع,شماره حساب,نام,نام خانوادگی,مبلغ";

    private static final org.slf4j.Logger logger = LoggerFactory.getLogger(PayDetailService.class);

    public Map<String, Object> getAllByHeadId(BigDecimal headId, FilterWrapper filterWrapper, Integer start, Integer limit, SortWrapper sortWrapper) {
        Map<String, Object> map = new HashMap<>();

        Filter filter = new Filter();
        filter.setProperty("payHead.payHeadId");
        filter.setOperator(Filter.Operator.EQUAL);
        filter.setValue(headId.toString());

        if (filterWrapper != null && filterWrapper.getFilters() != null) {
            filterWrapper.getFilters().add(filter);
        } else if (filterWrapper != null) {
            Set<Filter> filters = new HashSet<>();
            filters.add(filter);
            filterWrapper.setFilters(filters);
        } else {
            filterWrapper = new FilterWrapper();
            Set<Filter> filters = new HashSet<>();
            filters.add(filter);
            filterWrapper.setFilters(filters);
        }

        map.put("list", getList(filterWrapper, start, limit, sortWrapper));
        map.put("total", getCount(filterWrapper));
        return map;

    }

    public Map<String, Object> getAll(FilterWrapper filterWrapper, Integer start, Integer limit, SortWrapper sortWrapper) {
        Map<String, Object> map = new HashMap<>();

        map.put("list", getList(filterWrapper, start, limit, sortWrapper));
        map.put("total", getCount(filterWrapper));
        return map;
    }

    public List<GlPayDetail> getList(FilterWrapper filter, Integer start, Integer limit, SortWrapper sort) {
        TypedQuery createQuery = entityManager.createQuery(getQuery(filter, sort));

        List<GlPayDetail> payDetails = new ArrayList<>();
        if (start != null && limit != null) {
            payDetails = createQuery.setFirstResult(start).setMaxResults(limit).getResultList();
        } else if (start == null && limit != null) {
            payDetails = createQuery.setMaxResults(limit).getResultList();
        } else if (start != null && limit == null) {
            payDetails = createQuery.setFirstResult(start).getResultList();
        } else if (start == null && limit == null) {
            payDetails = createQuery.getResultList();
        }

        return payDetails;

    }

    private Integer getCount(FilterWrapper filter) {
        Integer count = 0;
        TypedQuery createQuery = entityManager.createQuery(getQuery(filter, null));
        count = createQuery.getResultList().size();
        return count;
    }

    private CriteriaQuery getQuery(FilterWrapper filterWrapper, SortWrapper sortWrapper) {
        try {

            CriteriaBuilder criteriaBuilder = entityManager.getCriteriaBuilder();
            CriteriaQuery criteriaQuery = criteriaBuilder.createQuery();
            Root<GlPayDetail> payDetailFrom = criteriaQuery.from(GlPayDetail.class);
            Metamodel metamodel = entityManager.getMetamodel();
            EntityType<GlPayDetail> payDetailEntityType = metamodel.entity(GlPayDetail.class);

            List<Predicate> predicates = new ArrayList<>();

            if (filterWrapper != null && filterWrapper.getFilters() != null) {
                for (Filter filter : filterWrapper.getFilters()) {

                    String field = filter.getProperty();
                    Object value = filter.getValue();
                    Filter.Operator operator = filter.getOperator();
                    String[] f = field.split("\\.");
                    Predicate predicate = null;

                    javax.persistence.criteria.Path path;
                    switch (operator) {
                        case EQUAL:
                            path = payDetailFrom.get(f[0]);
                            for (int j = 1; j < f.length; j++) {
                                path = path.get(f[j]);
                            }
                            predicate = criteriaBuilder.equal(path, value);
                            predicates.add(predicate);
                            break;
                        case NOT_EQUAL:
                            path = payDetailFrom.get(f[0]);
                            for (int j = 1; j < f.length; j++) {
                                path = path.get(f[j]);
                            }
                            predicate = criteriaBuilder.notEqual(path, value);
                            predicates.add(predicate);
                            break;
                        case LIKE:
                            if (f.length == 1 && f[0].equals("fullName")) {
                                predicate = criteriaBuilder.or(criteriaBuilder.like(payDetailFrom.get(payDetailEntityType.getDeclaredSingularAttribute("firstName", String.class)), "%" + value + "%"),
                                        criteriaBuilder.like(payDetailFrom.get(payDetailEntityType.getDeclaredSingularAttribute("lastName", String.class)), "%" + value + "%"));
                            } else {
                                path = payDetailFrom.get(f[0]);
                                for (int j = 1; j < f.length; j++) {
                                    path = path.get(f[j]);
                                }
                                predicate = criteriaBuilder.like(path, "%" + value + "%");
                            }
                            predicates.add(predicate);

                        case IN:
                            if (field.equals("returnVocherHeaderId")) {
                                path = payDetailFrom.get(f[0]);
                                predicates.add(criteriaBuilder.isNull(path));
                                break;
                            }

                            break;
                        case AFTER:
                            path = payDetailFrom.get(f[0]);
                            for (int j = 1; j < f.length; j++) {
                                path = path.get(f[j]);
                            }
                            predicates.add(
                                    criteriaBuilder.greaterThanOrEqualTo(path, (Comparable) value));
                            break;
                        case BEFORE:
                            path = payDetailFrom.get(f[0]);
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
                    if (sortSet.getProperty().contains("isHamkar")) {
                        sortSet.setProperty("isHamkar");
                    } else if (sortSet.getProperty().equals("title")) {
                        sortSet.setProperty("subSystem.title");
                    } else if (sortSet.getProperty().equals("displayName")) {
                        sortSet.setProperty("dbLink.displayName");
                    } else if (sortSet.getProperty().equals("brhName")) {
                        sortSet.setProperty("branch.brhName");
                    } else if (sortSet.getProperty().equals("provinceName")) {
                        sortSet.setProperty("branch.city.province.provinceName");
                    } else if (sortSet.getProperty().equals("payDocDate")) {
                        sortSet.setProperty("payDocdat");
                    } else if (sortSet.getProperty().equals("fromDate")) {
                        sortSet.setProperty("payHead.fromDate");
                    } else if (sortSet.getProperty().equals("toDate")) {
                        sortSet.setProperty("payHead.toDate");
                    } else if (sortSet.getProperty().equals("bankName")) {
                        sortSet.setProperty("payHead.bankName");
                    }
                    String[] sortProperties = sortSet.getProperty().split("\\.");

                    javax.persistence.criteria.Path path = payDetailFrom.get(sortProperties[0]);
                    for (int j = 1; j < sortProperties.length; j++) {
                        path = path.get(sortProperties[j]);
                    }
                    // if (sortProperties.length == 1) {
                    if (sortSet.getDirection().getName().equals(Sort.Direction.DESC.getName())) {
                        order = criteriaBuilder.desc(payDetailFrom.get(sortProperties[0]));
                    } else {
                        order = criteriaBuilder.asc(payDetailFrom.get(sortProperties[0]));
                    }
                    //  }
                    orders.add(order);
                }

                if (!orders.isEmpty()) {
                    criteriaQuery.orderBy(orders);
                }
            }

            criteriaQuery.select(payDetailFrom);
            return criteriaQuery;
        } catch (Exception e) {
            Logger.getLogger(PayDetailService.class.getName()).log(Level.SEVERE, e.getMessage(), e);
            return null;
        }
    }

    public CalcBankReturnModel getBankSummaryByHeadId(BigDecimal headId) {
        CalcBankReturnModel model = new CalcBankReturnModel(null, 0L, BigDecimal.ZERO, null, null);

        try {

            GlPayHead head = entityManager.find(GlPayHead.class, headId);

            List<Object> list = entityManager.createNamedQuery("GlPayDetail.getSumValuesByHeadId", Object.class)
                    .setParameter("headId", headId)
                    .getResultList();

            if (list != null && !list.isEmpty()) {
                Object obj = list.get(0);
                Object[] objArray = (Object[]) obj;

                model.setBankQty((Long) objArray[0]);
                BigDecimal ammount = BigDecimal.valueOf((Long) objArray[1]);
                model.setBankAmmount(ammount);
                //model.setBank(head.getBank());
                Bank bank = new Bank();
                if (head.getBankCode().equals("00")) {
                    bank.setBankCode("00");
                    bank.setBankName(PensionPayModelEnum.BONYAD_SHAHID.getName());
                } else {
                    bank = entityManager.find(Bank.class, head.getBankCode());
                }

                model.setBank(bank);
                model.setCheckNo(head.getCheckNo());

                if (head.getCheckDate() != null) {
                    String stringDate = new SimpleDateFormat("yyyy/MM/dd").format(head.getCheckDate());
                    Date chDate = DateUtils.convertDateStringToDate(stringDate.replace("/", ""));
                    stringDate = DateUtils.format(chDate, "yyyy/MM/dd");
                    model.setCheckDate(stringDate);
                }
            }
            return model;
        } catch (Exception ex) {
            Response response = Response.status(Response.Status.INTERNAL_SERVER_ERROR).entity(messageBundle.getProperty("coreaccount.paydetail.UNKNOWN_EXC_IN_FETCH_DATA")).build();
            throw new WebApplicationException(response);
        }
    }

    public Workbook payHeadDetailExportToExcel(HttpServletRequest req) {
        try {
            SortWrapper sortWrapper = new SortWrapper();
            sortWrapper.setSortSet(new HashSet<Sort>());
            Sort sort = new Sort();
            sort.setProperty("natcode");
            sort.setDirection(Sort.Direction.ASC);
            sortWrapper.getSortSet().add(sort);
            FilterWrapper filterWrapper = new FilterWrapper();
            filterWrapper.setFilters(new HashSet<Filter>());
            Enumeration<String> paramNames = req.getParameterNames();
            while (paramNames.hasMoreElements()) {
                String nextElement = paramNames.nextElement();
                if (req.getParameter(nextElement) != null && !"".equals(req.getParameter(nextElement)) && !"_dc".equals(nextElement)) {
                    Filter filter = new Filter();
                    filter.setProperty(nextElement);
                    String value = req.getParameter(nextElement);
                    filter.setValue(value);
                    filter.setOperator(Filter.Operator.EQUAL);
                    filterWrapper.getFilters().add(filter);
                }
            }
            List<GlPayDetail> resultList = getList(filterWrapper, null, null, sortWrapper);
            return writeToExcel(resultList);
        } catch (Exception ex) {
            Logger.getLogger(PayDetailService.class.getName()).log(Level.SEVERE, null, ex);
            return null;
        }
    }

    public StringBuilder payHeadDetailExportToCSV(HttpServletRequest req) {
        try {
            SortWrapper sortWrapper = new SortWrapper();
            sortWrapper.setSortSet(new HashSet<Sort>());
            Sort sort = new Sort();
            sort.setProperty("natcode");
            sort.setDirection(Sort.Direction.ASC);
            sortWrapper.getSortSet().add(sort);
            FilterWrapper filterWrapper = new FilterWrapper();
            filterWrapper.setFilters(new HashSet<Filter>());
            Enumeration<String> paramNames = req.getParameterNames();
            while (paramNames.hasMoreElements()) {
                String nextElement = paramNames.nextElement();
                if (req.getParameter(nextElement) != null && !"".equals(req.getParameter(nextElement)) && !"_dc".equals(nextElement)) {
                    Filter filter = new Filter();
                    filter.setProperty(nextElement);
                    String value = req.getParameter(nextElement);
                    filter.setValue(value);
                    filter.setOperator(Filter.Operator.EQUAL);
                    filterWrapper.getFilters().add(filter);
                }
            }
            List<GlPayDetail> resultList = getList(filterWrapper, null, null, sortWrapper);
            return writeToCSV(resultList);
        } catch (Exception ex) {
            Logger.getLogger(PayDetailService.class.getName()).log(Level.SEVERE, null, ex);
            return null;
        }
    }

    //    public StringBuilder controlFileExportToCSV(List<String> headIdList, boolean isIranian) {
//        try {
//            List<Object> list = new ArrayList<>();
//            if (isIranian == true) {
//                list = entityManager.createNamedQuery("GlPayDetail.getAllPayDetailForExcelByHeadIds", Object.class)
//                        .setParameter("headIds", headIdList).getResultList();
//                return writeControlFileToCSV(list);
//            } else {
//                list = entityManager.createNamedQuery("GlPayDetail.getForeignsPayDetailForExcelByHeadIds", Object.class)
//                        .setParameter("headIds", headIdList).getResultList();
//                return writeControlFileForeignToCSV(list);
//            }
//
//        } catch (Exception ex) {
//            Logger.getLogger(PayDetailService.class.getName()).log(Level.SEVERE, null, ex);
//            return null;
//        }
//    }
//    private StringBuilder writeControlFileForeignToCSV(List<Object> list) {
//        StringBuilder resultStr = new StringBuilder();
//        try {
//
//            resultStr.append(FOREIGN_BANK_CONTROL_FILE_HEADER);
//            resultStr.append(NEW_LINE_SEPARATOR);
//
//            int colCounter;
//            Object bankCode = ((Object[]) list.get(0))[4];
//            for (Object item : list) {
//                colCounter = 1;
//                Object[] objArr = (Object[]) item;
//                for (Object obj : objArr) {
//                    if (colCounter != 6) { // 6th col is for bankCode that should not shown in excel
//
//                        if (obj instanceof String) {
//                            String value = (String) obj;
//                            if (OperationalBankEnum.POSTBANK.getCode().equals(bankCode.toString()) && colCounter == 2 && value.length() > 13 && value.length() < 20) {
//                                String accountNumber;
//                                accountNumber = value.substring(0, value.length() - 3) + "." + value.substring(value.length() - 2);
//                                resultStr.append(accountNumber);
//                                resultStr.append(COMMA_DELIMITER);
//                            } else {
//                                resultStr.append(value);
//                                resultStr.append(COMMA_DELIMITER);
//                            }
//                        } else if (obj instanceof BigDecimal) {
//                            resultStr.append((BigDecimal) obj);
//                            resultStr.append(NEW_LINE_SEPARATOR);
//                        } else if (obj instanceof Long) {
//                            resultStr.append((Long) obj);
//                            resultStr.append(NEW_LINE_SEPARATOR);
//                        } else if (obj == null) {
//                            resultStr.append(" ");
//                            resultStr.append(COMMA_DELIMITER);
//                        }
//                    }
//                    colCounter++;
//                }
//            }
//
//            return resultStr;
//
//        } catch (Exception ex) {
//            Logger.getLogger(PayDetailService.class
//                    .getName()).log(Level.SEVERE, null, ex);
//            return null;
//        }
//    }
//
//    private StringBuilder writeControlFileToCSV(List<Object> list) {
//        StringBuilder resultStr = new StringBuilder();
//        try {
//
//            resultStr.append(BANK_CONTROL_FILE_HEADER);
//            resultStr.append(NEW_LINE_SEPARATOR);
//
//            int colCounter;
//            Object bankCode = ((Object[]) list.get(0))[5];
//            for (Object item : list) {
//                colCounter = 1;
//                Object[] objArr = (Object[]) item;
//                for (Object obj : objArr) {
//                    if (colCounter != 6) { // sixth col is for bankCode that should not shown in excel
//
//                        if (obj instanceof String) {
//                            String value = (String) obj;
//                            if (OperationalBankEnum.POSTBANK.getCode().equals(bankCode.toString()) && colCounter == 2 && value.length() > 13 && value.length() < 20) {
//                                String accountNumber;
//                                accountNumber = value.substring(0, value.length() - 3) + "." + value.substring(value.length() - 2);
//                                resultStr.append(accountNumber);
//                                resultStr.append(COMMA_DELIMITER);
//                            } else {
//                                resultStr.append(value);
//                                resultStr.append(COMMA_DELIMITER);
//                            }
//                        } else if (obj instanceof BigDecimal) {
//                            resultStr.append((BigDecimal) obj);
//                            resultStr.append(NEW_LINE_SEPARATOR);
//                        } else if (obj instanceof Long) {
//                            resultStr.append((Long) obj);
//                            resultStr.append(NEW_LINE_SEPARATOR);
//                        } else if (obj == null) {
//                            resultStr.append(" ");
//                            resultStr.append(COMMA_DELIMITER);
//                        }
//                    }
//                    colCounter++;
//                }
//            }
//
//            return resultStr;
//
//        } catch (Exception ex) {
//            Logger.getLogger(PayDetailService.class
//                    .getName()).log(Level.SEVERE, null, ex);
//            return null;
//        }
//    }
    private Workbook writeToExcel(List<GlPayDetail> resultList) throws IOException {
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
        cell1.setCellValue("بانک");
        cell1.setCellStyle(headerStyle);
        Cell cell2 = row.createCell(2);
        cell2.setCellValue("تاریخ پرداخت");
        cell2.setCellStyle(headerStyle);
        Cell cell3 = row.createCell(3);
        cell3.setCellValue("از تاریخ");
        cell3.setCellStyle(headerStyle);
        Cell cell4 = row.createCell(4);
        cell4.setCellValue("تا تاریخ");
        cell4.setCellStyle(headerStyle);
        Cell cell5 = row.createCell(5);
        cell5.setCellValue("وضعیت");
        cell5.setCellStyle(headerStyle);
        Cell cell6 = row.createCell(6);
        cell6.setCellValue("شماره چک");
        cell6.setCellStyle(headerStyle);
        Cell cell7 = row.createCell(7);
        cell7.setCellValue("تاریخ چک");
        cell7.setCellStyle(headerStyle);
        Cell cell8 = row.createCell(8);
        cell8.setCellValue("کد ملی");
        cell8.setCellStyle(headerStyle);
        Cell cell9 = row.createCell(9);
        cell9.setCellValue("شماره حساب");
        cell9.setCellStyle(headerStyle);
        Cell cell10 = row.createCell(10);
        cell10.setCellValue("نام");
        cell10.setCellStyle(headerStyle);
        Cell cell11 = row.createCell(11);
        cell11.setCellValue("نام خانوادگی");
        cell11.setCellStyle(headerStyle);
        Cell cell12 = row.createCell(12);
        cell12.setCellValue("شماره بیمه");
        cell12.setCellStyle(headerStyle);
        Cell cell13 = row.createCell(13);
        cell13.setCellValue("نوع تعهد");
        cell13.setCellStyle(headerStyle);
        Cell cell14 = row.createCell(14);
        cell14.setCellValue("کد شعبه");
        cell14.setCellStyle(headerStyle);
        Cell cell15 = row.createCell(15);
        cell15.setCellValue("مبلغ");
        cell15.setCellStyle(headerStyle);
        int rownum = 1;

        for (GlPayDetail item : resultList) {
            String bankName = item.getBankName();
            String createDate = DateUtils.getJalaliStandard(item.getCreateDate(), "/");
            String fromDate = item.getFromDate();//DateUtils.getJalaliStandard(item.getFromDate(), "/");
            String toDate = item.getToDate();//DateUtils.getJalaliStandard(item.getToDate(), "/");
            String payStepDesc = item.getPayStepDesc();
            String checkNo = item.getCheckNo();
            String checkDate = DateUtils.getJalaliStandard(item.getCheckDate(), "/");
            String natcode = item.getNatcode();
            String accountNo = item.getAccountNo();
            String firstName = item.getFirstName();
            String lastName = item.getLastName();
            String risuid = item.getRisuid();
            String title = item.getTitle();
            String branchCode = item.getBranchCode();
            Long payAmount = item.getPayAmount();
            row = sheet.createRow(rownum++);
            int cellnum = 0;
            int roww = rownum - 1;
            Cell cell = row.createCell(cellnum++);
            cell.setCellStyle(detailStyle);
            cell.setCellValue(roww);
            cell = row.createCell(cellnum++);
            cell.setCellStyle(detailStyle);
            cell.setCellValue(bankName);
            cell = row.createCell(cellnum++);
            cell.setCellStyle(detailStyle);
            cell.setCellValue(createDate);
            cell = row.createCell(cellnum++);
            cell.setCellStyle(detailStyle);
            cell.setCellValue(fromDate);
            cell = row.createCell(cellnum++);
            cell.setCellStyle(detailStyle);
            cell.setCellValue(toDate);
            cell = row.createCell(cellnum++);
            cell.setCellStyle(detailStyle);
            cell.setCellValue(payStepDesc);
            cell = row.createCell(cellnum++);
            cell.setCellStyle(detailStyle);
            cell.setCellValue(checkNo);
            cell = row.createCell(cellnum++);
            cell.setCellStyle(detailStyle);
            cell.setCellValue(checkDate);
            cell = row.createCell(cellnum++);
            cell.setCellStyle(detailStyle);
            cell.setCellValue(natcode);
            cell = row.createCell(cellnum++);
            cell.setCellStyle(detailStyle);
            cell.setCellValue(accountNo);
            cell = row.createCell(cellnum++);
            cell.setCellStyle(detailStyle);
            cell.setCellValue(firstName);
            cell = row.createCell(cellnum++);
            cell.setCellStyle(detailStyle);
            cell.setCellValue(lastName);
            cell = row.createCell(cellnum++);
            cell.setCellStyle(detailStyle);
            cell.setCellValue(risuid);
            cell = row.createCell(cellnum++);
            cell.setCellStyle(detailStyle);
            cell.setCellValue(title);
            cell = row.createCell(cellnum++);
            cell.setCellStyle(detailStyle);
            cell.setCellValue(branchCode);
            cell = row.createCell(cellnum++);
            cell.setCellStyle(detailStyle);
            cell.setCellValue(payAmount);
        }

        return wb;
    }

    public String payHeadDetailExportToXml(HttpServletRequest req) throws IOException {
        try {
            SortWrapper sortWrapper = new SortWrapper();
            sortWrapper.setSortSet(new HashSet<Sort>());
            Sort sort = new Sort();
            sort.setProperty("natcode");
            sort.setDirection(Sort.Direction.ASC);
            sortWrapper.getSortSet().add(sort);
            FilterWrapper filterWrapper = new FilterWrapper();
            filterWrapper.setFilters(new HashSet<Filter>());
            Enumeration<String> paramNames = req.getParameterNames();
            while (paramNames.hasMoreElements()) {
                String nextElement = paramNames.nextElement();
                if (req.getParameter(nextElement) != null && !"".equals(req.getParameter(nextElement)) && !"_dc".equals(nextElement)) {
                    Filter filter = new Filter();
                    filter.setProperty(nextElement);
                    String value = req.getParameter(nextElement);
                    filter.setValue(value);
                    filter.setOperator(Filter.Operator.EQUAL);
                    filterWrapper.getFilters().add(filter);
                }
            }
            List<GlPayDetail> resultList = getList(filterWrapper, null, null, sortWrapper);
            XStream xStream = new XStream(new DomDriver());
            String xml = xStream.toXML(resultList);
            return xml;

        } catch (Exception ex) {
            Logger.getLogger(PayDetailService.class
                    .getName()).log(Level.SEVERE, null, ex);
            return null;
        }
    }

    public Database payHeadDetailExportToAccess(HttpServletRequest req) {
        try {
            SortWrapper sortWrapper = new SortWrapper();
            sortWrapper.setSortSet(new HashSet<Sort>());
            Sort sort = new Sort();
            sort.setProperty("natcode");
            sort.setDirection(Sort.Direction.ASC);
            sortWrapper.getSortSet().add(sort);
            FilterWrapper filterWrapper = new FilterWrapper();
            filterWrapper.setFilters(new HashSet<Filter>());
            Enumeration<String> paramNames = req.getParameterNames();
            while (paramNames.hasMoreElements()) {
                String nextElement = paramNames.nextElement();
                if (req.getParameter(nextElement) != null && !"".equals(req.getParameter(nextElement)) && !"_dc".equals(nextElement)) {
                    Filter filter = new Filter();
                    filter.setProperty(nextElement);
                    String value = req.getParameter(nextElement);
                    filter.setValue(value);
                    filter.setOperator(Filter.Operator.EQUAL);
                    filterWrapper.getFilters().add(filter);
                }
            }
            List<GlPayDetail> resultList = getList(filterWrapper, null, null, sortWrapper);
            return writeToAccess(resultList);

        } catch (Exception ex) {
            Logger.getLogger(PayDetailService.class
                    .getName()).log(Level.SEVERE, null, ex);
            return null;
        }
    }

    public Database writeToAccess(List<GlPayDetail> resultList) throws ClassNotFoundException, SQLException, IOException {
        String file = "payHeadDetailExportToAccess.accdb";
        try {
            Database db = (DatabaseBuilder.create(FileFormat.V2010, new File(file)));
            String PayHeadDetail = "PayHeadDetail";
            Table table = new TableBuilder(PayHeadDetail) // Creating table
                    .addColumn(new ColumnBuilder("BANK_NAME").setSQLType(Types.VARCHAR).toColumn())
                    .addColumn(new ColumnBuilder("CREATE_DATE").setSQLType(Types.VARCHAR).toColumn())
                    .addColumn(new ColumnBuilder("FROM_DATE").setSQLType(Types.VARCHAR).toColumn())
                    .addColumn(new ColumnBuilder("TO_DATE").setSQLType(Types.VARCHAR).toColumn())
                    .addColumn(new ColumnBuilder("Pay_Step_Desc").setSQLType(Types.VARCHAR).toColumn())
                    .addColumn(new ColumnBuilder("CHECK_NO").setSQLType(Types.VARCHAR).toColumn())
                    .addColumn(new ColumnBuilder("CHECK_DATE").setSQLType(Types.VARCHAR).toColumn())
                    .addColumn(new ColumnBuilder("NATCODE").setSQLType(Types.VARCHAR).toColumn())
                    .addColumn(new ColumnBuilder("ACCOUNT_NO").setSQLType(Types.VARCHAR).toColumn())
                    .addColumn(new ColumnBuilder("FIRST_NAME").setSQLType(Types.VARCHAR).toColumn())
                    .addColumn(new ColumnBuilder("LAST_NAME").setSQLType(Types.VARCHAR).toColumn())
                    .addColumn(new ColumnBuilder("RISUID").setSQLType(Types.VARCHAR).toColumn())
                    .addColumn(new ColumnBuilder("TITLE").setSQLType(Types.VARCHAR).toColumn())
                    .addColumn(new ColumnBuilder("BRANCH_CODE").setSQLType(Types.VARCHAR).toColumn())
                    .addColumn(new ColumnBuilder("PAY_AMOUNT").setSQLType(Types.NUMERIC).toColumn())
                    .toTable(db);
            for (GlPayDetail item : resultList) {
                String bankName = item.getBankName();
                String createDate = DateUtils.getJalaliStandard(item.getCreateDate(), "/");
                String fromDate = item.getFromDate();//DateUtils.getJalaliStandard(item.getFromDate(), "/");
                String toDate = item.getToDate();//DateUtils.getJalaliStandard(item.getToDate(), "/");
                String payStepDesc = item.getPayStepDesc();
                String checkNo = item.getCheckNo();
                String checkDate = DateUtils.getJalaliStandard(item.getCheckDate(), "/");
                String natcode = item.getNatcode();
                String accountNo = item.getAccountNo();
                String firstName = item.getFirstName();
                String lastName = item.getLastName();
                String risuid = item.getRisuid();
                String title = item.getTitle();
                String branchCode = item.getBranchCode();
                Long payAmount = item.getPayAmount();
                table.addRow(bankName, createDate, fromDate, toDate, payStepDesc, checkNo, checkDate, natcode, accountNo, firstName, lastName, risuid, title, branchCode, payAmount);//Inserting values into the table
            }
            db.close();
            return db;

        } catch (Exception ex) {
            Logger.getLogger(PayDetailService.class
                    .getName()).log(Level.SEVERE, null, ex);
            return null;
        }
    }

    public Workbook doExcel(BigDecimal headId, FilterWrapper filterWrapper, int columnNum, String[] columnHeader) {
        XSSFWorkbook wb = new XSSFWorkbook();
        Sheet sheet = wb.createSheet();
        sheet.setRightToLeft(true);

        Font font = wb.createFont();
        font.setFontName("Arial");
        font.setBoldweight(Font.BOLDWEIGHT_BOLD);
        font.setColor(HSSFColor.BLACK.index);

        CellStyle headerStyle = wb.createCellStyle();
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
        for (int i = 0; i <= columnNum - 1; i++) {

            addCell(columnHeader[i], i, row, headerStyle);
        }
        // get values
        //loop and add cells
        List<GlPayDetail> glPayDetailList = (List<GlPayDetail>) getAllByHeadId(headId, filterWrapper, null, null, null).get("list");
        int rownum = 1;
        for (GlPayDetail item : glPayDetailList) {
            String natcode = item.getNatcode();
            String accountNo = item.getAccountNo();
            String firstName = item.getFirstName();
            String lastName = item.getLastName();
            String orgCode = item.getBranchCode();
            String orgName = item.getBranchName();
            String provinceCode = item.getProvinceCode();
            String provinceName = item.getProvinceName();
            Long payAmount = item.getPayAmount();
            String payDocno = item.getPayDocno();
            String payDocDate = item.getPayDocDate();

            String nationality = (item.getNationality().equals("01") ? "01" : "02");
            nationality = NationalityEnum.find(nationality).getName();
            String calcStartDate = (item.getCalcStartDate() != null ? (String.valueOf(item.getCalcStartDate())).trim() : "");
            calcStartDate = (!calcStartDate.isEmpty() ? calcStartDate.substring(0, 4) + "/" + calcStartDate.substring(4, 6) + "/" + calcStartDate.substring(6) : "");
            String calcEndDate = (item.getCalcEndDate() != null ? (String.valueOf(item.getCalcEndDate())).trim() : "");
            calcEndDate = (!calcEndDate.isEmpty() ? calcEndDate.substring(0, 4) + "/" + calcEndDate.substring(4, 6) + "/" + calcEndDate.substring(6) : "");
            String sendToMaliUserDesc = (item.getSendToMaliUser() != null ? String.valueOf(item.getSendToMaliUser()) : "");
            String sendToMaliDate = (item.getSendToMaliDate() != null ? String.valueOf(item.getSendToMaliDate()) : "");
            sendToMaliDate = (!sendToMaliDate.isEmpty() ? sendToMaliDate.substring(0, 4) + "/" + sendToMaliDate.substring(4, 6) + "/" + sendToMaliDate.substring(6) : "");
            String accCode = item.getAccCode();

            row = sheet.createRow(rownum++);
            int cellnum = 0;
            addCell(String.valueOf(rownum - 1), cellnum++, row, detailStyle);
            addCell(natcode, cellnum++, row, detailStyle);
            addCell(accountNo, cellnum++, row, detailStyle);
            addCell(firstName, cellnum++, row, detailStyle);
            addCell(lastName, cellnum++, row, detailStyle);
            addCell(nationality, cellnum++, row, detailStyle);
            addCell(provinceCode, cellnum++, row, detailStyle);
            addCell(provinceName, cellnum++, row, detailStyle);
            addCell(orgCode, cellnum++, row, detailStyle);
            addCell(orgName, cellnum++, row, detailStyle);
            addCell(payAmount, cellnum++, row, detailStyle);
            addCell(payDocno, cellnum++, row, detailStyle);
            addCell(payDocDate, cellnum++, row, detailStyle);
            addCell(calcStartDate, cellnum++, row, detailStyle);
            addCell(calcEndDate, cellnum++, row, detailStyle);
            addCell(sendToMaliUserDesc, cellnum++, row, detailStyle);
            addCell(sendToMaliDate, cellnum++, row, detailStyle);
            addCell(accCode, cellnum++, row, detailStyle);

        }
        return wb;
    }

    public Workbook writeToExcel(BigDecimal headId, FilterWrapper filter, String systemId) throws IOException {

        String[] AsnadHeaders = {"ردیف", "کد ملی", "شماره حساب", "نام", "نام خانوادگی", "ملیت", "کد استان", "نام استان", "کد دفتر اسناد", "نام دفتر اسناد", "مبلغ", "شناسه رکورد پرداخت", "تاریخ سند", "شروع دوره محاسبه", "پایان دوره محاسبه", "ارسال کننده به مالی", "تاریخ ارسال"};
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

        String asnadSystemId = webBundle.getProperty("system.asnad.id");
        if (systemId.equals(asnadSystemId)) {

            for (int i = 0; i <= AsnadHeaders.length - 1; i++) {

                addCell(AsnadHeaders[i], i, row, headerStyle);
            }
        } else {
            Cell cell0 = row.createCell(0);
            cell0.setCellValue("ردیف");
            cell0.setCellStyle(headerStyle);

            Cell cell1 = row.createCell(1);
            cell1.setCellValue("کد ملی");
            cell1.setCellStyle(headerStyle);

            Cell cell2 = row.createCell(2);
            cell2.setCellValue("شماره حساب");
            cell2.setCellStyle(headerStyle);

            Cell cell3 = row.createCell(3);
            cell3.setCellValue("نام");
            cell3.setCellStyle(headerStyle);

            Cell cell4 = row.createCell(4);
            cell4.setCellValue("نام خانوادگی");
            cell4.setCellStyle(headerStyle);

            Cell cell5 = row.createCell(5);
            cell5.setCellValue("شماره بیمه");
            cell5.setCellStyle(headerStyle);

            Cell cell6 = row.createCell(6);
            cell6.setCellValue("ملیت");
            cell6.setCellStyle(headerStyle);

            Cell cell7 = row.createCell(7);
            cell7.setCellValue("نوع تعهد");
            cell7.setCellStyle(headerStyle);

            Cell cell8 = row.createCell(8);
            cell8.setCellValue("کد استان");
            cell8.setCellStyle(headerStyle);

            Cell cell9 = row.createCell(9);
            cell9.setCellValue("نام استان");
            cell9.setCellStyle(headerStyle);

            Cell cell10 = row.createCell(10);
            cell10.setCellValue("کد شعبه");
            cell10.setCellStyle(headerStyle);

            Cell cell11 = row.createCell(11);
            cell11.setCellValue("نام شعبه");
            cell11.setCellStyle(headerStyle);

            Cell cell12 = row.createCell(12);
            cell12.setCellValue("مبلغ");
            cell12.setCellStyle(headerStyle);

            Cell cell13 = row.createCell(13);
            cell13.setCellValue("شروع دوره محاسبه");
            cell13.setCellStyle(headerStyle);

            Cell cell14 = row.createCell(14);
            cell14.setCellValue("پایان دوره محاسبه");
            cell14.setCellStyle(headerStyle);

            Cell cell15 = row.createCell(15);
            cell15.setCellValue("تایید کننده اول");
            cell15.setCellStyle(headerStyle);

            Cell cell16 = row.createCell(16);
            cell16.setCellValue("تاریخ تایید اول");
            cell16.setCellStyle(headerStyle);

            Cell cell17 = row.createCell(17);
            cell17.setCellValue("تایید کننده دوم");
            cell17.setCellStyle(headerStyle);

            Cell cell18 = row.createCell(18);
            cell18.setCellValue("تاریخ تایید دوم");
            cell18.setCellStyle(headerStyle);

            Cell cell19 = row.createCell(19);
            cell19.setCellValue("ارسا کننده به مالی");
            cell19.setCellStyle(headerStyle);

            Cell cell20 = row.createCell(20);
            cell20.setCellValue("تاریخ ارسال");
            cell20.setCellStyle(headerStyle);

            Cell cell21 = row.createCell(21);
            cell21.setCellValue("کد حساب");
            cell21.setCellStyle(headerStyle);
        }
        List<GlPayDetail> glPayDetailList = (List<GlPayDetail>) getAllByHeadId(headId, filter, null, null, null).get("list");
        int rownum = 1;
        for (GlPayDetail item : glPayDetailList) {
            String natcode = item.getNatcode();
            String accountNo = item.getAccountNo();
            String firstName = item.getFirstName();
            String lastName = item.getLastName();
            String risuid = item.getRisuid();
            String subsystem = item.getSubSystem().getTitle();
            Long payAmount = item.getPayAmount();

            String provinceCode = item.getProvinceCode();
            String provinceName = item.getProvinceName();
            String branchCode = item.getBranchCode();
            String branchName = item.getBranchName();

            String payDocno = item.getPayDocno();
            String payDocDate = item.getPayDocDate();

            String nationality = (item.getNationality().equals("01") ? "01" : "02");
            nationality = NationalityEnum.find(nationality).getName();
            String calcStartDate = (item.getCalcStartDate() != null ? (String.valueOf(item.getCalcStartDate())).trim() : "");
            calcStartDate = (!calcStartDate.isEmpty() ? calcStartDate.substring(0, 4) + "/" + calcStartDate.substring(4, 6) + "/" + calcStartDate.substring(6) : "");
            String calcEndDate = (item.getCalcEndDate() != null ? (String.valueOf(item.getCalcEndDate())).trim() : "");
            calcEndDate = (!calcEndDate.isEmpty() ? calcEndDate.substring(0, 4) + "/" + calcEndDate.substring(4, 6) + "/" + calcEndDate.substring(6) : "");
            String firstConfirmUserDesc = (item.getFirstConfirmUser() != null ? String.valueOf(item.getFirstConfirmUser()) : "");
            String firstConfirmDate = (item.getFirstConfirmDate() != null ? String.valueOf(item.getFirstConfirmDate()) : "");
            firstConfirmDate = (!firstConfirmDate.isEmpty() ? firstConfirmDate.substring(0, 4) + "/" + firstConfirmDate.substring(4, 6) + "/" + firstConfirmDate.substring(6) : "");
            String secondConfirmUserDesc = (item.getSecondConfirmUser() != null ? String.valueOf(item.getSecondConfirmUser()) : "");
            String secondConfirmDate = (item.getSecondConfirmDate() != null ? String.valueOf(item.getSecondConfirmDate()) : "");
            secondConfirmDate = (!secondConfirmDate.isEmpty() ? secondConfirmDate.substring(0, 4) + "/" + secondConfirmDate.substring(4, 6) + "/" + secondConfirmDate.substring(6) : "");
            String sendToMaliUserDesc = (item.getSendToMaliUser() != null ? String.valueOf(item.getSendToMaliUser()) : "");
            String sendToMaliDate = (item.getSendToMaliDate() != null ? String.valueOf(item.getSendToMaliDate()) : "");
            sendToMaliDate = (!sendToMaliDate.isEmpty() ? sendToMaliDate.substring(0, 4) + "/" + sendToMaliDate.substring(4, 6) + "/" + sendToMaliDate.substring(6) : "");
            String accCode = item.getAccCode();

            row = sheet.createRow(rownum++);
            int cellnum = 0;

            if (systemId.equals(asnadSystemId)) {
                addCell(String.valueOf(rownum - 1), cellnum++, row, detailStyle);
                addCell(natcode, cellnum++, row, detailStyle);
                addCell(accountNo, cellnum++, row, detailStyle);
                addCell(firstName, cellnum++, row, detailStyle);
                addCell(lastName, cellnum++, row, detailStyle);
                addCell(nationality, cellnum++, row, detailStyle);
                addCell(provinceCode, cellnum++, row, detailStyle);
                addCell(provinceName, cellnum++, row, detailStyle);
                addCell(branchCode, cellnum++, row, detailStyle);
                addCell(branchName, cellnum++, row, detailStyle);
                addCell(payAmount, cellnum++, row, detailStyle);
                addCell(payDocno, cellnum++, row, detailStyle);
                addCell(payDocDate, cellnum++, row, detailStyle);
                addCell(calcStartDate, cellnum++, row, detailStyle);
                addCell(calcEndDate, cellnum++, row, detailStyle);
                addCell(sendToMaliUserDesc, cellnum++, row, detailStyle);
                addCell(sendToMaliDate, cellnum++, row, detailStyle);
                //addCell(accCode, cellnum++, row, detailStyle);
            } else {
                Cell cell = row.createCell(cellnum++);
                cell.setCellStyle(detailStyle);
                cell.setCellValue(rownum - 1);

                cell = row.createCell(cellnum++);
                cell.setCellStyle(detailStyle);
                cell.setCellValue(natcode);

                cell = row.createCell(cellnum++);
                cell.setCellStyle(detailStyle);
                cell.setCellValue(accountNo);

                cell = row.createCell(cellnum++);
                cell.setCellStyle(detailStyle);
                cell.setCellValue(firstName);

                cell = row.createCell(cellnum++);
                cell.setCellStyle(detailStyle);
                cell.setCellValue(lastName);

                cell = row.createCell(cellnum++);
                cell.setCellStyle(detailStyle);
                cell.setCellValue(risuid);

                cell = row.createCell(cellnum++);
                cell.setCellStyle(detailStyle);
                cell.setCellValue(nationality);

                cell = row.createCell(cellnum++);
                cell.setCellStyle(detailStyle);
                cell.setCellValue(subsystem);

                cell = row.createCell(cellnum++);
                cell.setCellStyle(detailStyle);
                cell.setCellValue(provinceCode);

                cell = row.createCell(cellnum++);
                cell.setCellStyle(detailStyle);
                cell.setCellValue(provinceName);

                cell = row.createCell(cellnum++);
                cell.setCellStyle(detailStyle);
                cell.setCellValue(branchCode);

                cell = row.createCell(cellnum++);
                cell.setCellStyle(detailStyle);
                cell.setCellValue(branchName);

                cell = row.createCell(cellnum++);
                cell.setCellStyle(detailStyle);
                cell.setCellValue(payAmount);

                cell = row.createCell(cellnum++);
                cell.setCellStyle(detailStyle);
                cell.setCellValue(calcStartDate);

                cell = row.createCell(cellnum++);
                cell.setCellStyle(detailStyle);
                cell.setCellValue(calcEndDate);

                cell = row.createCell(cellnum++);
                cell.setCellStyle(detailStyle);
                cell.setCellValue(firstConfirmUserDesc);

                cell = row.createCell(cellnum++);
                cell.setCellStyle(detailStyle);
                cell.setCellValue(firstConfirmDate);

                cell = row.createCell(cellnum++);
                cell.setCellStyle(detailStyle);
                cell.setCellValue(secondConfirmUserDesc);

                cell = row.createCell(cellnum++);
                cell.setCellStyle(detailStyle);
                cell.setCellValue(secondConfirmDate);

                cell = row.createCell(cellnum++);
                cell.setCellStyle(detailStyle);
                cell.setCellValue(sendToMaliUserDesc);

                cell = row.createCell(cellnum++);
                cell.setCellStyle(detailStyle);
                cell.setCellValue(sendToMaliDate);

                cell = row.createCell(cellnum++);
                cell.setCellStyle(detailStyle);
                cell.setCellValue(accCode);
            }

        }
        return wb;
    }

    public Database writeToAccess(BigDecimal headId, FilterWrapper filter, String systemId) throws ClassNotFoundException, SQLException, IOException, NumberFormatException {

        String file = "shorttermPayDetail.accdb";
        List<GlPayDetail> resultList = (List<GlPayDetail>) getAllByHeadId(headId, filter, null, null, null).get("list");
        try {
            Database db = (DatabaseBuilder.create(FileFormat.V2010, new File(file)));
            String VwShorttermDetailReport = "payDetail";
            Table table;
            String asnadSystemId = webBundle.getProperty("system.asnad.id");
            if (systemId.equals(asnadSystemId)) {
                table = new TableBuilder(VwShorttermDetailReport) // Creating table
                        .addColumn(new ColumnBuilder("NATCODE").setSQLType(Types.VARCHAR).toColumn())
                        .addColumn(new ColumnBuilder("ACCOUNT_NO").setSQLType(Types.VARCHAR).toColumn())
                        .addColumn(new ColumnBuilder("FIRST_NAME").setSQLType(Types.VARCHAR).toColumn())
                        .addColumn(new ColumnBuilder("LAST_NAME").setSQLType(Types.VARCHAR).toColumn())
                        .addColumn(new ColumnBuilder("NATIONALITY").setSQLType(Types.VARCHAR).toColumn())
                        .addColumn(new ColumnBuilder("PROVINCECODE").setSQLType(Types.VARCHAR).toColumn())
                        .addColumn(new ColumnBuilder("PROVINCENAME").setSQLType(Types.VARCHAR).toColumn())
                        .addColumn(new ColumnBuilder("ORGCODE").setSQLType(Types.VARCHAR).toColumn())
                        .addColumn(new ColumnBuilder("ORGNAME").setSQLType(Types.VARCHAR).toColumn())
                        .addColumn(new ColumnBuilder("PAY_AMOUNT").setSQLType(Types.NUMERIC).toColumn())
                        .addColumn(new ColumnBuilder("PAY_DOC_NO").setSQLType(Types.VARCHAR).toColumn())
                        .addColumn(new ColumnBuilder("PAY_DOC_DATE").setSQLType(Types.VARCHAR).toColumn())
                        .addColumn(new ColumnBuilder("CALC_START_DATE").setSQLType(Types.VARCHAR).toColumn())
                        .addColumn(new ColumnBuilder("CALC_END_DATE").setSQLType(Types.VARCHAR).toColumn())
                        .addColumn(new ColumnBuilder("SEND_TO_MALI_USER").setSQLType(Types.VARCHAR).toColumn())
                        .addColumn(new ColumnBuilder("SEND_TO_MALI_DATE").setSQLType(Types.VARCHAR).toColumn())
                        // .addColumn(new ColumnBuilder("ACC_CODE").setSQLType(Types.VARCHAR).toColumn())
                        .toTable(db);
            } else {
                table = new TableBuilder(VwShorttermDetailReport) // Creating table
                        .addColumn(new ColumnBuilder("NATCODE").setSQLType(Types.VARCHAR).toColumn())
                        .addColumn(new ColumnBuilder("ACCOUNT_NO").setSQLType(Types.VARCHAR).toColumn())
                        .addColumn(new ColumnBuilder("FIRST_NAME").setSQLType(Types.VARCHAR).toColumn())
                        .addColumn(new ColumnBuilder("LAST_NAME").setSQLType(Types.VARCHAR).toColumn())
                        .addColumn(new ColumnBuilder("RISUID").setSQLType(Types.VARCHAR).toColumn())
                        .addColumn(new ColumnBuilder("NATIONALITY").setSQLType(Types.VARCHAR).toColumn())
                        .addColumn(new ColumnBuilder("SUB_SYSTEM").setSQLType(Types.VARCHAR).toColumn())
                        .addColumn(new ColumnBuilder("PROVINCECODE").setSQLType(Types.VARCHAR).toColumn())
                        .addColumn(new ColumnBuilder("PROVINCENAME").setSQLType(Types.VARCHAR).toColumn())
                        .addColumn(new ColumnBuilder("BRHCODE").setSQLType(Types.VARCHAR).toColumn())
                        .addColumn(new ColumnBuilder("BRHNAME").setSQLType(Types.VARCHAR).toColumn())
                        .addColumn(new ColumnBuilder("PAY_AMOUNT").setSQLType(Types.NUMERIC).toColumn())
                        .addColumn(new ColumnBuilder("CALC_START_DATE").setSQLType(Types.VARCHAR).toColumn())
                        .addColumn(new ColumnBuilder("CALC_END_DATE").setSQLType(Types.VARCHAR).toColumn())
                        .addColumn(new ColumnBuilder("FIRST_CONFIRM_UESR").setSQLType(Types.VARCHAR).toColumn())
                        .addColumn(new ColumnBuilder("FIRST_CONFIRM_DATE").setSQLType(Types.VARCHAR).toColumn())
                        .addColumn(new ColumnBuilder("SECOND_CONFIRM_UESR").setSQLType(Types.VARCHAR).toColumn())
                        .addColumn(new ColumnBuilder("SECOND_CONFIRM_DATE").setSQLType(Types.VARCHAR).toColumn())
                        .addColumn(new ColumnBuilder("SEND_TO_MALI_USER").setSQLType(Types.VARCHAR).toColumn())
                        .addColumn(new ColumnBuilder("SEND_TO_MALI_DATE").setSQLType(Types.VARCHAR).toColumn())
                        .addColumn(new ColumnBuilder("ACC_CODE").setSQLType(Types.VARCHAR).toColumn())
                        .toTable(db);
            }
            for (GlPayDetail item : resultList) {
                String natcode = item.getNatcode();
                String accountNo = item.getAccountNo();
                String firstName = item.getFirstName();
                String lastName = item.getLastName();
                String risuid = item.getRisuid();
                String subsystem = item.getSubSystem().getTitle();

                String provinceCode = item.getProvinceCode();
                String provinceName = item.getProvinceName();
                String branchCode = item.getBranchCode();
                String branchName = item.getBranchName();

                String payDocno = item.getPayDocno();
                String payDocDate = item.getPayDocDate();
                Long payAmount = item.getPayAmount();
                String nationality = (item.getNationality().equals("01") ? "01" : "02");
                nationality = NationalityEnum.find(nationality).getName();

                String calcStartDate = (item.getCalcStartDate() != null ? (String.valueOf(item.getCalcStartDate())).trim() : "");
                calcStartDate = (!calcStartDate.isEmpty() ? calcStartDate.substring(0, 4) + "/" + calcStartDate.substring(4, 6) + "/" + calcStartDate.substring(6) : "");
                String calcEndDate = (item.getCalcEndDate() != null ? (String.valueOf(item.getCalcEndDate())).trim() : "");
                calcEndDate = (!calcEndDate.isEmpty() ? calcEndDate.substring(0, 4) + "/" + calcEndDate.substring(4, 6) + "/" + calcEndDate.substring(6) : "");
                String firstConfirmUserDesc = (item.getFirstConfirmUser() != null ? String.valueOf(item.getFirstConfirmUser()) : "");
                String firstConfirmDate = (item.getFirstConfirmDate() != null ? String.valueOf(item.getFirstConfirmDate()) : "");
                firstConfirmDate = (!firstConfirmDate.isEmpty() ? firstConfirmDate.substring(0, 4) + "/" + firstConfirmDate.substring(4, 6) + "/" + firstConfirmDate.substring(6) : "");
                String secondConfirmUserDesc = (item.getSecondConfirmUser() != null ? String.valueOf(item.getSecondConfirmUser()) : "");
                String secondConfirmDate = (item.getSecondConfirmDate() != null ? String.valueOf(item.getSecondConfirmDate()) : "");
                secondConfirmDate = (!secondConfirmDate.isEmpty() ? secondConfirmDate.substring(0, 4) + "/" + secondConfirmDate.substring(4, 6) + "/" + secondConfirmDate.substring(6) : "");
                String sendToMaliUserDesc = (item.getSendToMaliUser() != null ? String.valueOf(item.getSendToMaliUser()) : "");
                String sendToMaliDate = (item.getSendToMaliDate() != null ? String.valueOf(item.getSendToMaliDate()) : "");
                sendToMaliDate = (!sendToMaliDate.isEmpty() ? sendToMaliDate.substring(0, 4) + "/" + sendToMaliDate.substring(4, 6) + "/" + sendToMaliDate.substring(6) : "");
                String accCode = item.getAccCode();
                if (systemId.equals(asnadSystemId)) {
                    table.addRow(natcode, accountNo, firstName, lastName, nationality, provinceCode, provinceName, branchCode, branchName, payAmount, payDocno, payDocDate, calcStartDate,
                            calcEndDate, sendToMaliUserDesc, sendToMaliDate);
                } else {
                    table.addRow(natcode, accountNo, firstName, lastName, risuid, nationality, subsystem, provinceCode, provinceName, branchCode, branchName, payAmount, calcStartDate,
                            calcEndDate, firstConfirmUserDesc, firstConfirmDate, secondConfirmUserDesc, secondConfirmDate,
                            sendToMaliUserDesc, sendToMaliDate, accCode);
                }
            }
            db.close();
            return db;

        } catch (Exception ex) {
            Logger.getLogger(PayDetailService.class
                    .getName()).log(Level.SEVERE, null, ex);
            return null;
        }
    }

    @TransactionAttribute(TransactionAttributeType.REQUIRES_NEW)
    public String deleteWithReason(String id, String reasonCode, String userName, boolean forExcel) {
        String result = "";
        Boolean deleteFromInt = null;
        try {

            BigDecimal detailId = BigDecimal.valueOf(Long.parseLong(id));
            GlPayDetail detail = entityManager.find(GlPayDetail.class, detailId);
            GlPayHead payHead = detail.getPayHead();

            int checkRecordResult = glOperationResultService.checkRecord(payHead.getPayHeadId());
            if (checkRecordResult == 1) {
                deleteFromInt = true;
            } else if (checkRecordResult == 3) {
                deleteFromInt = false;
            } else if (checkRecordResult == 2) {

                String message = "عملیات بررسی کد حساب در حال انجام است، لطفا  صبر نمائید.";
                Response response = Response.status(Response.Status.INTERNAL_SERVER_ERROR).entity(message).build();
                throw new WebApplicationException(response);
            }

            checkBeforeDelete(detail);
            //1: Insert into deleted table
            GlPayDetailDeleted payDetailDeleted = new GlPayDetailDeleted();
            copyPayDetailToPayDetailDeleted(detail, payDetailDeleted);
            payDetailDeleted.setDeleteDate(new Date());
            payDetailDeleted.setDeleteUser(userName);
            payDetailDeleted.setDeleteReason(reasonCode);
            entityManager.persist(payDetailDeleted);

            //2- Delete record
            long countDetailRecords = entityManager.createNamedQuery("GlPayDetail.getCountByHeadId", Long.class)
                    .setParameter("headId", payHead.getPayHeadId())
                    .getSingleResult();

            if (countDetailRecords == 1) {
                entityManager.remove(payHead);
            } else {
                entityManager.remove(detail);
            }

            // 3- delete from controlFile temp table (CP_TEMP_BANK_CONTROL_FILE)
            tempBankControlFileService.deleteRecord(detailId);

            // 4- return to main system
            String pensionSystemId = webBundle.getProperty("system.pension.id");
            String shorttermSystemId = webBundle.getProperty("system.shortterm.id");
            String asnadSystemId = webBundle.getProperty("system.asnad.id");
            String khesaratSubSystemId = webBundle.getProperty("asnad.khesarat.id");
            String systemId = "";

            if (shorttermSystemId.equals(detail.getPayHead().getSystem().getSystemId().toString())) {
                systemId = shorttermSystemId;
                // call shortterm service
                if (forExcel) {
                    result = restServices.returnToShorttermExcel(detail.getPayDocno(), detail.getRefIdOfPayDoc(), reasonCode, ReturnReasonEnum.find(reasonCode).getName(), userName);
                    if (!result.equals("1")) {
                        Response response = Response.status(Response.Status.BAD_REQUEST).entity(result).build();
                        throw new BadRequestException(response);
                    }
                } else {
                    restServices.returnToShortterm(detail.getPayDocno(), detail.getRefIdOfPayDoc(), reasonCode, ReturnReasonEnum.find(reasonCode).getName(), userName);
                }
            } else if (pensionSystemId.equals(detail.getPayHead().getSystem().getSystemId().toString())) {
                systemId = pensionSystemId;
                // call pension service  
                logger.error("********************* Before calling pension return service for paymentId = " + detail.getPayDocno());
                restServices.returnToPension(detail.getPayDocno(), reasonCode, ReturnReasonEnum.find(reasonCode).getName(), userName);
                logger.error("********************* After calling pension return service for paymentId = " + detail.getPayDocno());
            } else if (asnadSystemId.equals(detail.getPayHead().getSystem().getSystemId().toString())
                    && khesaratSubSystemId.equals(detail.getSubSystem().getSubSystemId().toString())) {
                systemId = asnadSystemId;
                // call khesarat service
                returnToAsnad(detail.getPayDocno(), reasonCode, userName);
            }

            // 5- delete record from gl interface tables
            if (deleteFromInt) {
                compositeGLService.deleteFromInt(payHead.getPayHeadId(), detail.getPayDocno(), Integer.parseInt(systemId));
            }

            //6 - update bank-acccount-control table for create bank control files (Async)
            logger.error("********************* Before doAfterReturn in deleteWithReason for paymentId = " + detail.getPayDocno());
            //doAfterReturn(detail.getPayDetailId(),detail.getNatcode(), detail.getAccountNo(), payHead.getBankCode(), reasonCode, detail.getSubSystem().getSystem().getSystemId());
            doAfterReturn(detail, reasonCode);
            logger.error("********************* After doAfterReturn in deleteWithReason for paymentId = " + detail.getPayDocno());

            return result;
        } catch (BadRequestException ex) {
            logger.error("********** BadRequestException in deleteWithReason ", ex);
            throw ex;
            //return result;
        } catch (WebApplicationException | EJBException wex) {
            logger.error("********** WebApplicationException in deleteWithReason ", wex);
            throw wex;
        } catch (Exception ex) {
            logger.error("********** Exception in deleteWithReason ", ex);
            Response response = Response.status(Response.Status.INTERNAL_SERVER_ERROR).entity(messageBundle.getProperty("coreaccount.paydetail.UNKNOWN_EXC_IN_DELETE")).build();
            throw new WebApplicationException(response);
        }

    }

    private void checkBeforeDelete(GlPayDetail detail) {

        if (!PayStepEnum.SEHATSANJI.getCode().equals(detail.getPayHead().getPayStep())) {
            Response response = Response.status(Response.Status.INTERNAL_SERVER_ERROR).entity(messageBundle.getProperty("coreaccount.paydetail.EXC_IN_DELETE_RECORD_IS_PAYED")).build();
            throw new WebApplicationException(response);
        }
    }

    public void copyPayDetailToPayDetailDeleted(GlPayDetail detail, GlPayDetailDeleted payDetailDeleted) {
        if (detail != null && payDetailDeleted != null) {
            payDetailDeleted.setRisuid(detail.getRisuid());
            payDetailDeleted.setFirstName(detail.getFirstName());
            payDetailDeleted.setLastName(detail.getLastName());
            payDetailDeleted.setNatcode(detail.getNatcode());
            payDetailDeleted.setSsn(detail.getSsn());
            payDetailDeleted.setPayAmount(detail.getPayAmount());
            payDetailDeleted.setAccountNo(detail.getAccountNo());
            payDetailDeleted.setPayDocno(detail.getPayDocno());
            payDetailDeleted.setPayDocdat(detail.getPayDocdat());
            payDetailDeleted.setIsutypecode(detail.getIsutypecode());
            payDetailDeleted.setIsutypedesc(detail.getIsutypedesc());
            payDetailDeleted.setIsustatcode(detail.getIsustatcode());
            payDetailDeleted.setIsustatdesc(detail.getIsustatdesc());
            payDetailDeleted.setAccidentcode(detail.getAccidentcode());
            payDetailDeleted.setPayHeadId(detail.getPayHead().getPayHeadId());
            payDetailDeleted.setSubSystem(detail.getSubSystem());
            payDetailDeleted.setSystem(detail.getPayHead().getSystem());
            payDetailDeleted.setBranch(detail.getBranch());
            payDetailDeleted.setRefIdOfPayDoc(detail.getRefIdOfPayDoc());
            payDetailDeleted.setRefIdOfPayDocDate(detail.getRefIdOfPayDocDate());
            payDetailDeleted.setSendToMaliDate(detail.getSendToMaliDate());
            payDetailDeleted.setSendToMaliUser(detail.getSendToMaliUser());
            payDetailDeleted.setSendToMaliUserDesc(detail.getSendToMaliUserDesc());
            payDetailDeleted.setFirstConfirmUser(detail.getFirstConfirmUser());
            payDetailDeleted.setFirstConfirmDate(detail.getFirstConfirmDate());
            payDetailDeleted.setSecondConfirmUser(detail.getSecondConfirmUser());
            payDetailDeleted.setSecondConfirmDate(detail.getSecondConfirmDate());
            payDetailDeleted.setStatus(detail.getStatus());
            payDetailDeleted.setAccCode(detail.getAccCode());
            payDetailDeleted.setCalcStartDate(detail.getCalcStartDate());
            payDetailDeleted.setCalcEndDate(detail.getCalcEndDate());
            payDetailDeleted.setBankCode(detail.getPayHead().getBankCode());
            payDetailDeleted.setPayFromDate(detail.getPayHead().getFromDate());
            payDetailDeleted.setPayToDate(detail.getPayHead().getToDate());
            payDetailDeleted.setNationality(detail.getNationality());
            payDetailDeleted.setAlphabet(detail.getAlphabet());
            payDetailDeleted.setAlphabetCode(detail.getAlphabetCode());
            payDetailDeleted.setPensionerId(detail.getPensionerId());
            payDetailDeleted.setPayMode(detail.getPayMode());
            payDetailDeleted.setUpdateUser(detail.getUpdateUser());
            payDetailDeleted.setUpdateDate(detail.getUpdateDate());
            payDetailDeleted.setIsHamkar(detail.getIsHamkar());
            payDetailDeleted.setIsDead(detail.getIsDead());
            payDetailDeleted.setHasAgent(detail.getHasAgent());
//            payDetailDeleted.setOrgCode(detail.getOrgCode());
//            payDetailDeleted.setOrgName(detail.getOrgName());
//            payDetailDeleted.setDbLink(detail.getDbLink());
        }
    }

    public String returnWithReason(String id, String reasonCode, String userName, boolean forExcel) {
        String result = "";
        try {
            BigDecimal detailId = BigDecimal.valueOf(Long.parseLong(id));
            GlPayDetail detail = entityManager.find(GlPayDetail.class, detailId);
            detail.setStatus(PayDetailStatusEnum.RETURNED.getCode());
            detail.setReturnReason(reasonCode);
            detail.setReturnUser(userName);
            detail.setReturnDate(new Date());

            String pensionSystemId = webBundle.getProperty("system.pension.id");
            String shorttermSystemId = webBundle.getProperty("system.shortterm.id");
            String asnadSystemId = webBundle.getProperty("system.asnad.id");
            String khesaratSubSystemId = webBundle.getProperty("asnad.khesarat.id");

            if (shorttermSystemId.equals(detail.getPayHead().getSystem().getSystemId().toString())) {
                // call shortterm service
                if (forExcel) {
                    result = restServices.returnToShorttermExcel(detail.getPayDocno(), detail.getRefIdOfPayDoc(), reasonCode, ReturnReasonEnum.find(reasonCode).getName(), detail.getReturnUser());
                } else {
                    restServices.returnToShortterm(detail.getPayDocno(), detail.getRefIdOfPayDoc(), reasonCode, ReturnReasonEnum.find(reasonCode).getName(), userName);
                }

            } else if (pensionSystemId.equals(detail.getPayHead().getSystem().getSystemId().toString())) {
                // call pension service
                restServices.returnToPension(detail.getPayDocno(), reasonCode, ReturnReasonEnum.find(reasonCode).getName(), userName);
            } else if (asnadSystemId.equals(detail.getPayHead().getSystem().getSystemId().toString())
                    && khesaratSubSystemId.equals(detail.getSubSystem().getSubSystemId().toString())) {
                returnToAsnad(detail.getPayDocno(), reasonCode, userName);
            }

            entityManager.merge(detail);

            //doAfterReturn(detail.getPayDetailId() , detail.getNatcode(), detail.getAccountNo(), detail.getPayHead().getBankCode(), reasonCode, detail.getSubSystem().getSystem().getSystemId());
            doAfterReturn(detail, reasonCode);

        } catch (WebApplicationException | EJBException wex) {
            logger.error("خطا در برگشت.", wex);
            throw wex;
        } catch (Exception ex) {
            logger.error("خطا در برگشت رکورد.با شناسه : " + id, ex);
            Response response = Response.status(Response.Status.INTERNAL_SERVER_ERROR).entity(messageBundle.getProperty("coreaccount.paydetail.UNKNOWN_EXC_IN_RETURN")).build();
            throw new WebApplicationException(response);
        }

        return result;
    }

    public String setVoucherData(List<GlPayDetail> detailList, Long vocherHeaderId, String userName) {
        GlPayHead head;
        try {
            for (GlPayDetail payDetail : detailList) {
                payDetail.setReturnVocherHeaderId(vocherHeaderId);
//                payDetail.setReturnVocherHeaderNo(vocherHeaderNo); -- فعلا نداریم - یعنی سرویس صدور سند شماره بر نمیگردونه
                payDetail.setReturnVocherHeaderStatus(PayStepEnum.SANAD_MOVAGHAT.getCode().toString());
                entityManager.merge(payDetail);
            }

            String saveMessage = "ویرایش با موفقیت انجام شد";
            return saveMessage;

        } catch (Exception ex) {
            Logger.getLogger(PayDetailService.class
                    .getName()).log(Level.SEVERE, null, ex);
            Response response = Response.status(Response.Status.NOT_ACCEPTABLE).entity(messageBundle.getProperty("coreAccount.common.EXC_UNKNOWN_ERROR")).build();

            throw new WebApplicationException(response);
        }
    }

    private StringBuilder writeToCSV(List<GlPayDetail> resultList) {
        StringBuilder resultStr = new StringBuilder();
        try {

            resultStr.append(FILE_HEADER);
            resultStr.append(NEW_LINE_SEPARATOR);

            for (GlPayDetail item : resultList) {
                resultStr.append(item.getBankName());
                resultStr.append(COMMA_DELIMITER);
                resultStr.append(DateUtils.getJalaliStandard(item.getCreateDate(), "/"));
                resultStr.append(COMMA_DELIMITER);
                resultStr.append(item.getToDate());//DateUtils.getJalaliStandard(item.getFromDate(), "/"));
                resultStr.append(COMMA_DELIMITER);
                resultStr.append(item.getToDate());//DateUtils.getJalaliStandard(item.getToDate(), "/"));
                resultStr.append(COMMA_DELIMITER);
                resultStr.append(item.getPayStepDesc());
                resultStr.append(COMMA_DELIMITER);
                resultStr.append(item.getCheckNo() != null ? item.getCheckNo() : " ");
                resultStr.append(COMMA_DELIMITER);
                resultStr.append(item.getCheckDate() != null ? DateUtils.getJalaliStandard(item.getCheckDate(), "/") : " ");
                resultStr.append(COMMA_DELIMITER);
                resultStr.append(item.getNatcode());
                resultStr.append(COMMA_DELIMITER);
                resultStr.append(item.getAccountNo());
                resultStr.append(COMMA_DELIMITER);
                resultStr.append(item.getFirstName());
                resultStr.append(COMMA_DELIMITER);
                resultStr.append(item.getLastName());
                resultStr.append(COMMA_DELIMITER);
                resultStr.append(item.getRisuid());
                resultStr.append(COMMA_DELIMITER);
                resultStr.append(item.getPensionerId());
                resultStr.append(COMMA_DELIMITER);
                resultStr.append(item.getTitle());
                resultStr.append(COMMA_DELIMITER);
                resultStr.append(item.getBranchCode());
                resultStr.append(COMMA_DELIMITER);
                resultStr.append(item.getAlphabetCode() != null ? item.getAlphabetCode().toString() : "");
                resultStr.append(COMMA_DELIMITER);
                resultStr.append(item.getAlphabet() != null ? item.getAlphabet() : "");
                resultStr.append(COMMA_DELIMITER);
                resultStr.append(item.getPayAmount());
                resultStr.append(NEW_LINE_SEPARATOR);

            }
            return resultStr;

        } catch (Exception ex) {
            Logger.getLogger(PayDetailService.class
                    .getName()).log(Level.SEVERE, null, ex);
            return null;
        }
    }

    public StringBuilder payDetailWriteToCSV(BigDecimal headId, FilterWrapper filter, Integer start, Integer limit, SortWrapper sort) throws IOException {

        List<GlPayDetail> resultList = (List<GlPayDetail>) getAllByHeadId(headId, filter, start, limit, sort).get("list");

        StringBuilder resultStr = new StringBuilder();
        try {

            resultStr.append(FILE_HEADER_Detail);
            resultStr.append(NEW_LINE_SEPARATOR);

            for (GlPayDetail item : resultList) {
                resultStr.append(item.getNatcode());
                resultStr.append(COMMA_DELIMITER);
                resultStr.append(item.getAccountNo());
                resultStr.append(COMMA_DELIMITER);
                resultStr.append(item.getFirstName());
                resultStr.append(COMMA_DELIMITER);
                resultStr.append(item.getLastName());
                resultStr.append(COMMA_DELIMITER);
                resultStr.append(item.getRisuid());
                resultStr.append(COMMA_DELIMITER);
                resultStr.append(item.getPensionerId());
                resultStr.append(COMMA_DELIMITER);
                resultStr.append(item.getSubSystem().getTitle());
                resultStr.append(COMMA_DELIMITER);
                resultStr.append(item.getIsHamkarDesc());
                resultStr.append(COMMA_DELIMITER);
                resultStr.append(item.getBranchCode());
                resultStr.append(COMMA_DELIMITER);
                resultStr.append(item.getBranch().getBrhName());
                resultStr.append(COMMA_DELIMITER);
                resultStr.append(item.getBranch().getCity().getProvince().getProvinceCode());
                resultStr.append(COMMA_DELIMITER);
                resultStr.append(item.getBranch().getCity().getProvince().getProvinceName());
                resultStr.append(COMMA_DELIMITER);
                resultStr.append(item.getAlphabetCode() != null ? item.getAlphabetCode().toString() : "");
                resultStr.append(COMMA_DELIMITER);
                resultStr.append(item.getAlphabet() != null ? item.getAlphabet() : "");
                resultStr.append(COMMA_DELIMITER);
                resultStr.append(item.getPayAmount());
                resultStr.append(COMMA_DELIMITER);

                String calcStartDate = (item.getCalcStartDate() != null ? (String.valueOf(item.getCalcStartDate())).trim() : "");
                calcStartDate = (!calcStartDate.isEmpty() ? calcStartDate.substring(0, 4) + "/" + calcStartDate.substring(4, 6) + "/" + calcStartDate.substring(6) : "");
                String calcEndDate = (item.getCalcEndDate() != null ? (String.valueOf(item.getCalcEndDate())).trim() : "");
                calcEndDate = (!calcEndDate.isEmpty() ? calcEndDate.substring(0, 4) + "/" + calcEndDate.substring(4, 6) + "/" + calcEndDate.substring(6) : "");
                String firstConfirmDate = (item.getFirstConfirmDate() != null ? String.valueOf(item.getFirstConfirmDate()) : "");
                firstConfirmDate = (!firstConfirmDate.isEmpty() ? firstConfirmDate.substring(0, 4) + "/" + firstConfirmDate.substring(4, 6) + "/" + firstConfirmDate.substring(6) : "");
                String secondConfirmDate = (item.getSecondConfirmDate() != null ? String.valueOf(item.getSecondConfirmDate()) : "");
                secondConfirmDate = (!secondConfirmDate.isEmpty() ? secondConfirmDate.substring(0, 4) + "/" + secondConfirmDate.substring(4, 6) + "/" + secondConfirmDate.substring(6) : "");
                String sendToMaliDate = (item.getSendToMaliDate() != null ? String.valueOf(item.getSendToMaliDate()) : "");
                sendToMaliDate = (!sendToMaliDate.isEmpty() ? sendToMaliDate.substring(0, 4) + "/" + sendToMaliDate.substring(4, 6) + "/" + sendToMaliDate.substring(6) : "");

                resultStr.append(calcStartDate);
                resultStr.append(COMMA_DELIMITER);
                resultStr.append(calcEndDate);
                resultStr.append(COMMA_DELIMITER);
                resultStr.append(item.getFirstConfirmUser() != null ? String.valueOf(item.getFirstConfirmUser()) : "");
                resultStr.append(COMMA_DELIMITER);
                resultStr.append(firstConfirmDate);
                resultStr.append(COMMA_DELIMITER);
                resultStr.append(item.getSecondConfirmUser() != null ? String.valueOf(item.getSecondConfirmUser()) : "");
                resultStr.append(COMMA_DELIMITER);
                resultStr.append(secondConfirmDate);
                resultStr.append(COMMA_DELIMITER);
                resultStr.append(item.getSendToMaliUser() != null ? String.valueOf(item.getSendToMaliUser()) : "");
                resultStr.append(COMMA_DELIMITER);
                resultStr.append(sendToMaliDate);
//                resultStr.append(COMMA_DELIMITER);
//                resultStr.append(item.getAccCode() != null ? item.getAccCode() : "");//accCode
                resultStr.append(NEW_LINE_SEPARATOR);

            }
            return resultStr;

        } catch (Exception ex) {
            Logger.getLogger(PayDetailService.class
                    .getName()).log(Level.SEVERE, null, ex);
            return null;
        }

    }

    public void updateDetailInfo(String id, HashMap<String, Object> data, User user) {
        try {
            BigDecimal detailId = BigDecimal.valueOf(Long.parseLong(id));
            GlPayDetail detail = entityManager.find(GlPayDetail.class, detailId);

            String isuTyapeCode = data.get("isutypecode").toString();
            String isuTypeDesc = entityManager.find(IsuType.class, isuTyapeCode).getIsutypedesc();
            String isuStatCode = data.get("isustatcode").toString();
            String isuStatDesc = entityManager.find(IsuStatus.class, isuStatCode).getIsustatdesc();
            String accidentCode = data.get("accidentcode").toString();
            String accCode = data.get("accCode").toString();

            detail.setIsutypecode(isuTyapeCode);
            detail.setIsutypedesc(isuTypeDesc);
            detail.setIsustatcode(isuStatCode);
            detail.setIsustatdesc(isuStatDesc);
            detail.setAccidentcode(accidentCode);
            detail.setAccCode(accCode);
            detail.setUpdateUser(user.getUserName());
            detail.setUpdateDate(new Date());

            entityManager.merge(detail);
            entityManager.flush();

        } catch (WebApplicationException | EJBException wex) {
            throw wex;
        } catch (Exception ex) {
            Response response = Response.status(Response.Status.INTERNAL_SERVER_ERROR).entity(messageBundle.getProperty("coreaccount.paydetail.UNKNOWN_EXC_IN_RETURN")).build();
            throw new WebApplicationException(response);
        }

    }

    /*
    Exit from list withot return to main system
     */
    public void deleteRecord(String id) {
        Boolean deleteFromInt = null;
        try {
            BigDecimal detailId = BigDecimal.valueOf(Long.parseLong(id));
            GlPayDetail detail = entityManager.find(GlPayDetail.class, detailId);
            GlPayHead payHead = detail.getPayHead();

            int checkRecordResult = glOperationResultService.checkRecord(payHead.getPayHeadId());

            if (checkRecordResult == 1) {
                deleteFromInt = true;
            } else if (checkRecordResult == 3) {
                deleteFromInt = false;
            } else if (checkRecordResult == 2) {

                String message = "عملیات بررسی کد حساب در حال انجام است، لطفا  صبر نمائید.";
                Response response = Response.status(Response.Status.INTERNAL_SERVER_ERROR).entity(message).build();
                throw new WebApplicationException(response);
            }
            //1 - delete record
            checkBeforeDelete(detail);
            long countDetailRecords = entityManager.createNamedQuery("GlPayDetail.getCountByHeadId", Long.class)
                    .setParameter("headId", detailId)
                    .getSingleResult();
            if (countDetailRecords == 1) {
                entityManager.remove(payHead);
                //entityManager.flush();
            } else {
                entityManager.remove(detail);
                //entityManager.flush();
            }

            // 2 -  delete from controlFile temp table (CP_TEMP_BANK_CONTROL_FILE)
            tempBankControlFileService.deleteRecord(detailId);

            // 3- delete record from gl interface tables
            if (deleteFromInt) {
                compositeGLService.deleteFromInt(payHead.getPayHeadId(), detail.getPayDocno(), payHead.getSystem().getSystemId());
            }

        } catch (WebApplicationException | EJBException wex) {
            throw wex;
        } catch (Exception ex) {
            Response response = Response.status(Response.Status.INTERNAL_SERVER_ERROR).entity(messageBundle.getProperty("coreaccount.paydetail.UNKNOWN_EXC_IN_DELETE")).build();
            throw new WebApplicationException(response);
        }

    }

    public void returnToAsnad(String payDocNo, String returnCode, String returnUserName) {
        try {

            procedure.query("{?=call PCK_CP_ASNAD.returnPayRecord(?,?,?)}");
            procedure.setOutParameter(1, Types.NUMERIC)
                    .setInParameter(2, payDocNo)
                    .setInParameter(3, returnCode)
                    .setInParameter(4, returnUserName);
            procedure.execute();
            String result = procedure.getOutParameter(1).toString();

            if (!result.equals("0")) {
                String message;
                if (result.equals("")) {
                    message = "  این رکورد در سیستم خسارت برگشت داده نشد.!!";
                } else {
                    message = result.replace("ORA-:", "");
                }
                Response response = Response.status(Response.Status.BAD_REQUEST).entity(message).build();
                throw new WebApplicationException(response);
            }

        } catch (Exception ex) {
            String message = "خطا در برگشت سیستم خسارت.";
            Logger.getLogger(PayDetailService.class.getName()).log(SEVERE, message, ex);
            Response response = Response.status(Response.Status.INTERNAL_SERVER_ERROR).entity(message).build();
            throw new WebApplicationException(response);
        }
    }

    private void doAfterReturn(GlPayDetail detail, String reasonCode) {

        if (ReturnReasonEnum.ACCOUNT_IS_BLOCK.getCode().equals(reasonCode)
                || ReturnReasonEnum.MISMATCH_ACCOUNT_NATCODE.getCode().equals(reasonCode)
                || ReturnReasonEnum.INVALID_ACCOUNT.getCode().equals(reasonCode)) {

            bankAccountControlService.updateAccountValidationResultToInvalid(detail, reasonCode);
//            try {
//                BankAccountControl accountControl = accountControlService.getByNatCodeAndAccNo(natCode, accountNo, bankCode);
//                if (accountControl != null && !TextUtils.hasText(accountControl.getValidationResult())) {
//                    //update result to invalid
//                    accountControlService.updateAccountValidationResultToINValid(accountControl, reasonCode, subSystem);
//                } else if (accountControl != null && TextUtils.hasText(accountControl.getValidationResult())) {
//                    // insert current record to his
//                    // update result to invalid
//                    accountControlService.addToHis(accountControl);
//                    accountControlService.updateAccountValidationResultToINValid(accountControl, reasonCode, subSystem);
//
//                }
//            } catch (Exception ex) {
//                logger.error("خطا در به روزرسانی نتیجه کنترل حساب های بانک برای کد ملی {} و شماره حساب {} برای بانک {}.", natCode, accountNo, bankCode, ex);
//            }
        }

    }

    /*
     * SendToFtp
     */
    public String payDetailBankFileSendToFtp(String headId) {
        String name = "refah_bikari_";
        BigDecimal id = BigDecimal.valueOf(Long.parseLong(headId));

        GlPayHead head = entityManager.find(GlPayHead.class, id);
        BankFileInputModel bankFileInputModel = new BankFileInputModel();
        bankFileInputModel.setHeadId(headId);
        bankFileInputModel.setBankCode(head.getBankCode());

        BankFile bankFile = compositeBankFileBuilder.buildBankFile(bankFileInputModel);

        InputStream inputStream = new ByteArrayInputStream(bankFile.getContent());
        String messageFtp = commonService.FTPUploadFileDemo(inputStream, name, bankFile.getExtension());
        return messageFtp;

    }

    /*
     * سرویسهای مربوط به ایجاد فایل پرداخت بانک
     */
    public BankFile payDetailBankFile(String headId) {

        BigDecimal id = BigDecimal.valueOf(Long.parseLong(headId));

        GlPayHead head = entityManager.find(GlPayHead.class, id);
        BankFileInputModel bankFileInputModel = new BankFileInputModel();
        bankFileInputModel.setHeadId(headId);
        bankFileInputModel.setBankCode(head.getBankCode());

        BankFile bankFile = compositeBankFileBuilder.buildBankFile(bankFileInputModel);
        return bankFile;

    }

    /*
     * سرویسهای مربوط به ایجاد فایل کنترلی
     */
    //Excel ControlFile for REFAH - BONYAD
    public Workbook payDetailWriteToExcelBonyad(List<String> headIds, Boolean isIranian) {
        XSSFWorkbook wb = new XSSFWorkbook();
        Sheet sheet = wb.createSheet();
        sheet.setRightToLeft(true);
        //font
        Font font = wb.createFont();
        font.setFontName("Arial");
        font.setBoldweight(Font.BOLDWEIGHT_BOLD);
        font.setColor(HSSFColor.BLACK.index);
        //headerStyle
        CellStyle headerStyle = wb.createCellStyle();
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
        //detailStyle
        CellStyle detailStyle = wb.createCellStyle();
        detailStyle.setBorderBottom(CellStyle.BORDER_THIN);
        detailStyle.setBottomBorderColor(IndexedColors.BLACK.getIndex());
        detailStyle.setBorderLeft(CellStyle.BORDER_THIN);
        detailStyle.setLeftBorderColor(IndexedColors.BLACK.getIndex());
        detailStyle.setBorderRight(CellStyle.BORDER_THIN);
        detailStyle.setRightBorderColor(IndexedColors.BLACK.getIndex());
        detailStyle.setBorderTop(CellStyle.BORDER_THIN);
        detailStyle.setTopBorderColor(IndexedColors.BLACK.getIndex());
        //header row
        Row row = sheet.createRow(1);

        if (isIranian == null) {
            Cell cell0 = row.createCell(0);
            cell0.setCellValue("کد ملی/ اتباع");
            cell0.setCellStyle(headerStyle);
        } else if (isIranian == true) {

            Cell cell0 = row.createCell(0);
            cell0.setCellValue("کد ملی");
            cell0.setCellStyle(headerStyle);

        } else {

            Cell cell0 = row.createCell(0);
            cell0.setCellValue("کد اتباع");
            cell0.setCellStyle(headerStyle);
        }

        Cell cell1 = row.createCell(1);
        cell1.setCellValue("شماره مستمری");
        cell1.setCellStyle(headerStyle);

        Cell cell2 = row.createCell(2);
        cell2.setCellValue("نام");
        cell2.setCellStyle(headerStyle);

        Cell cell3 = row.createCell(3);
        cell3.setCellValue("نام خانوادگی");
        cell3.setCellStyle(headerStyle);

        Cell cell4 = row.createCell(4);
        cell4.setCellValue("مبلغ");
        cell4.setCellStyle(headerStyle);

        Cell cell5 = row.createCell(5);
        cell5.setCellValue("شعبه");
        cell5.setCellStyle(headerStyle);

        Cell cell6 = row.createCell(6);
        cell6.setCellValue("استان");
        cell6.setCellStyle(headerStyle);
        // data rows
        // 1 : if  this payHeadId(s) does not have records in cp_temp_bank_control_file :
        // a : call PCK_CP_BNK_ACC_CONTROL_SERVICE.createControlList
        // 2 : get get records from GlPayDetail        

        StringBuilder selectedHeadIds = new StringBuilder();

        BigDecimal payHeadId;
        for (String id : headIds) {
            payHeadId = BigDecimal.valueOf(Long.parseLong(id));
            long count = tempBankControlFileService.getCountByHeadId(payHeadId);
            if (count == 0) {
                selectedHeadIds.append(id);
                selectedHeadIds.append(",");
            }

        }
        // 1 :a
        if (!selectedHeadIds.toString().isEmpty()) { // one or some list , do not have records in temp file.so run package first.
            procedure.query("{ ? = call PCK_CP_BNK_ACC_CONTROL_SERVICE.createControlList(?,?)}");
            procedure.setOutParameter(1, Types.VARCHAR)
                    .setInParameter(2, selectedHeadIds.toString().substring(0, selectedHeadIds.toString().length() - 1))
                    .setInParameter(3, (isIranian == true ? 2 : 3));

            try {
                procedure.execute();

                String packeageResult = procedure.getOutParameter(1).toString();
                if (!packeageResult.equals("1")) {
                    String errorMessage = " خطا درافزودن رکورد به جدول موقت فایل کنترلی.لطفا به نمایش شرح وقایع رجوع کنید.شناسه لیست ها :  " + headIds;
                    logger.error(errorMessage);
                    Response response = Response.status(Response.Status.INTERNAL_SERVER_ERROR).entity(errorMessage).build();
                    throw new WebApplicationException(response);
                }

            } catch (SQLException ex) {
                String errorMessage = "خطای غیر منتظره در اجرای متد ایجاد فایل کنترلی برای لیست های با شناسه : " + headIds;
                logger.error(errorMessage, ex);
                Response response = Response.status(Response.Status.INTERNAL_SERVER_ERROR).entity(errorMessage).build();
                throw new WebApplicationException(response);
            }
        }
        // 2 
        //
        List<GlPayDetail> list;
        if (isIranian == null) {
            list = entityManager.createNamedQuery("GlPayDetail.getAllPayDetailByHeadIds", GlPayDetail.class)
                    .setParameter("headIds", headIds).getResultList();
        } else if (isIranian == true) {
            list = entityManager.createNamedQuery("GlPayDetail.getAllPayDetailForExcelByHeadIds", GlPayDetail.class)
                    .setParameter("headIds", headIds).getResultList();
        } else {
            list = entityManager.createNamedQuery("GlPayDetail.getForeignsPayDetailForExcelByHeadIds", GlPayDetail.class)
                    .setParameter("headIds", headIds).getResultList();
        }

        if (list == null || list.isEmpty()) {
            return wb;
        } else {
            int rownum = 2;
            for (GlPayDetail detail : list) {
//                AddToControlListResultModel addToControlListResultModel = null;
//                if (!"00".equals(detail.getPayHead().getBankCode())) {
//                    BankAccountControl accountControl = new BankAccountControl();
//                    accountControl.setBankCode(detail.getPayHead().getBankCode());
//                    accountControl.setNatcode(detail.getNatcode());
//                    accountControl.setRisuid(detail.getRisuid());
//                    accountControl.setNationality(detail.getNationality());
//                    accountControl.setFirstName(detail.getFirstName());
//                    accountControl.setLastName(detail.getLastName());
//                    accountControl.setAccountNo(detail.getAccountNo());
//                    accountControl.setValidateBySubSystem(detail.getSubSystem());
//
//                    addToControlListResultModel = accountControlService.checkBeforAddToControlFile(detail.getPayDetailId(), accountControl);
//                } else {
//                    addToControlListResultModel = new AddToControlListResultModel();
//                    addToControlListResultModel.setShouldBeAddToList(true);
//                    addToControlListResultModel.setChangedAccountNo(false);
//                }

//                if (addToControlListResultModel.isShouldBeAddToList()) {
                row = sheet.createRow(rownum++);
                int cellnum = 0;
                Cell cell;

                cell = row.createCell(cellnum++);
                cell.setCellStyle(detailStyle);
                cell.setCellValue(detail.getNatcode());

                cell = row.createCell(cellnum++);
                cell.setCellStyle(detailStyle);
                cell.setCellValue(detail.getPensionerId());

                cell = row.createCell(cellnum++);
                cell.setCellStyle(detailStyle);
                cell.setCellValue(detail.getFirstName());

                cell = row.createCell(cellnum++);
                cell.setCellStyle(detailStyle);
                cell.setCellValue(detail.getLastName());

                cell = row.createCell(cellnum++);
                cell.setCellStyle(detailStyle);
                cell.setCellValue(detail.getPayAmount());

                cell = row.createCell(cellnum++);
                cell.setCellStyle(detailStyle);
                cell.setCellValue(detail.getBranchName());

                cell = row.createCell(cellnum++);
                cell.setCellStyle(detailStyle);
                cell.setCellValue(detail.getProvinceName());
//                }
            }

            return wb;
        }
    }

    //Excel ControlFile for REFAH
    public Workbook payDetailWriteToExcel(List<String> headIds, Boolean isIranian) {
        XSSFWorkbook wb = new XSSFWorkbook();
        Sheet sheet = wb.createSheet();
        sheet.setRightToLeft(true);
        //font
        Font font = wb.createFont();
        font.setFontName("Arial");
        font.setBoldweight(Font.BOLDWEIGHT_BOLD);
        font.setColor(HSSFColor.BLACK.index);
        //headerStyle
        CellStyle headerStyle = wb.createCellStyle();
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
        //detailStyle
        CellStyle detailStyle = wb.createCellStyle();
        detailStyle.setBorderBottom(CellStyle.BORDER_THIN);
        detailStyle.setBottomBorderColor(IndexedColors.BLACK.getIndex());
        detailStyle.setBorderLeft(CellStyle.BORDER_THIN);
        detailStyle.setLeftBorderColor(IndexedColors.BLACK.getIndex());
        detailStyle.setBorderRight(CellStyle.BORDER_THIN);
        detailStyle.setRightBorderColor(IndexedColors.BLACK.getIndex());
        detailStyle.setBorderTop(CellStyle.BORDER_THIN);
        detailStyle.setTopBorderColor(IndexedColors.BLACK.getIndex());
        //header row
        Row row = sheet.createRow(1);

        if (isIranian == null) {
            Cell cell0 = row.createCell(0);
            cell0.setCellValue("کد ملی/ اتباع");
            cell0.setCellStyle(headerStyle);
        } else if (isIranian == true) {
            Cell cell0 = row.createCell(0);
            cell0.setCellValue("کد ملی");
            cell0.setCellStyle(headerStyle);

        } else if (isIranian == false) {
            Cell cell0 = row.createCell(0);
            cell0.setCellValue("کد اتباع");
            cell0.setCellStyle(headerStyle);
        }

        Cell cell1 = row.createCell(1);
        cell1.setCellValue("شماره حساب");
        cell1.setCellStyle(headerStyle);

        Cell cell2 = row.createCell(2);
        cell2.setCellValue("نام");
        cell2.setCellStyle(headerStyle);

        Cell cell3 = row.createCell(3);
        cell3.setCellValue("نام خانوادگی");
        cell3.setCellStyle(headerStyle);

        Cell cell4 = row.createCell(4);
        cell4.setCellValue("مبلغ");
        cell4.setCellStyle(headerStyle);
        // data Rows
        // 1 : if  this payHeadId(s) does not have records in cp_temp_bank_control_file :
        // a : call PCK_CP_BNK_ACC_CONTROL_SERVICE.createControlList
        // 2 : get get records from GlPayDetail      

        StringBuilder selectedHeadIds = new StringBuilder();

        BigDecimal payHeadId;
        for (String id : headIds) {
            payHeadId = BigDecimal.valueOf(Long.parseLong(id));
            long count = tempBankControlFileService.getCountByHeadId(payHeadId);
            if (count == 0) {
                selectedHeadIds.append(id);
                selectedHeadIds.append(",");
            }

        }
        // 1 :a
        if (!selectedHeadIds.toString().isEmpty()) { // one or some list , do not have records in temp file.so run package first.
            procedure.query("{ ? = call PCK_CP_BNK_ACC_CONTROL_SERVICE.createControlList(?,?)}");
            procedure.setOutParameter(1, Types.NUMERIC)
                    .setInParameter(2, selectedHeadIds.toString().substring(0, selectedHeadIds.toString().length() - 1))
                    .setInParameter(3, (isIranian == true ? 2 : 3));

            try {
                procedure.execute();

                String packeageResult = procedure.getOutParameter(1).toString();
                if (!packeageResult.equals("1")) {
                    String errorMessage = " خطا درافزودن رکورد به جدول موقت فایل کنترلی.لطفا به نمایش شرح وقایع رجوع کنید.شناسه لیست ها :  " + headIds;
                    logger.error(errorMessage);
                    Response response = Response.status(Response.Status.INTERNAL_SERVER_ERROR).entity(errorMessage).build();
                    throw new WebApplicationException(response);
                }

            } catch (SQLException ex) {
                String errorMessage = "خطای غیر منتظره در اجرای متد ایجاد فایل کنترلی برای لیست های با شناسه : " + headIds;
                logger.error(errorMessage, ex);
                Response response = Response.status(Response.Status.INTERNAL_SERVER_ERROR).entity(errorMessage).build();
                throw new WebApplicationException(response);
            }
        }
        // 2 
        //
        List<GlPayDetail> list = null;
        if (isIranian == null) {
            list = entityManager.createNamedQuery("GlPayDetail.getAllPayDetailByHeadIds", GlPayDetail.class)
                    .setParameter("headIds", headIds).getResultList();
        } else if (isIranian == true) {
            list = entityManager.createNamedQuery("GlPayDetail.getAllPayDetailForExcelByHeadIds", GlPayDetail.class)
                    .setParameter("headIds", headIds).getResultList();
        } else if (isIranian == false) {
            list = entityManager.createNamedQuery("GlPayDetail.getForeignsPayDetailForExcelByHeadIds", GlPayDetail.class)
                    .setParameter("headIds", headIds).getResultList();
        }

        if (list == null || list.isEmpty()) {
            return wb;
        } else {
            int rownum = 2;
            for (GlPayDetail detail : list) {
                NumberFormat numberFormat = NumberFormat.getNumberInstance(Locale.US);

                row = sheet.createRow(rownum++);
                int cellnum = 0;
                Cell cell;

                cell = row.createCell(cellnum++);
                cell.setCellStyle(detailStyle);
                cell.setCellValue(detail.getNatcode());

                cell = row.createCell(cellnum++);
                cell.setCellStyle(detailStyle);
                if (OperationalBankEnum.POSTBANK.getCode().equals(detail.getPayHead().getBankCode().toString()) && detail.getAccountNo().length() > 13 && detail.getAccountNo().length() < 20) {
                    String accountNumber;
                    accountNumber = detail.getAccountNo().substring(0, detail.getAccountNo().length() - 2) + "." + detail.getAccountNo().substring(detail.getAccountNo().length() - 2);
                    cell.setCellValue(accountNumber);
                } else {
                    cell.setCellValue(detail.getAccountNo());
                }

                cell = row.createCell(cellnum++);
                cell.setCellStyle(detailStyle);
                cell.setCellValue(detail.getFirstName());

                cell = row.createCell(cellnum++);
                cell.setCellStyle(detailStyle);
                cell.setCellValue(detail.getLastName());

                cell = row.createCell(cellnum++);
                cell.setCellStyle(detailStyle);
                cell.setCellValue(numberFormat.format(detail.getPayAmount()));

            }

            return wb;
        }

    }

    //POST BANK Bank File and Bonyad all Files
    public Workbook payHeadDetailBankFileWriteToExcel(List<String> headIds, Boolean isIranian) {
        XSSFWorkbook wb = new XSSFWorkbook();
        Sheet sheet = wb.createSheet();
        sheet.setRightToLeft(true);
        //font
        Font font = wb.createFont();
        font.setFontName("Arial");
        font.setBoldweight(Font.BOLDWEIGHT_BOLD);
        font.setColor(HSSFColor.BLACK.index);
        //headerStyle
        CellStyle headerStyle = wb.createCellStyle();
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
        //detailStyle
        CellStyle detailStyle = wb.createCellStyle();
        detailStyle.setBorderBottom(CellStyle.BORDER_THIN);
        detailStyle.setBottomBorderColor(IndexedColors.BLACK.getIndex());
        detailStyle.setBorderLeft(CellStyle.BORDER_THIN);
        detailStyle.setLeftBorderColor(IndexedColors.BLACK.getIndex());
        detailStyle.setBorderRight(CellStyle.BORDER_THIN);
        detailStyle.setRightBorderColor(IndexedColors.BLACK.getIndex());
        detailStyle.setBorderTop(CellStyle.BORDER_THIN);
        detailStyle.setTopBorderColor(IndexedColors.BLACK.getIndex());
        //header row
        Row row = sheet.createRow(1);

        if (isIranian == null) {
            Cell cell0 = row.createCell(0);
            cell0.setCellValue("کد ملی/ اتباع");
            cell0.setCellStyle(headerStyle);
        } else if (isIranian == true) {
            Cell cell0 = row.createCell(0);
            cell0.setCellValue("کد ملی");
            cell0.setCellStyle(headerStyle);

        } else if (isIranian == false) {
            Cell cell0 = row.createCell(0);
            cell0.setCellValue("کد اتباع");
            cell0.setCellStyle(headerStyle);
        }

        Cell cell1 = row.createCell(1);
        cell1.setCellValue("شماره حساب");
        cell1.setCellStyle(headerStyle);

        Cell cell2 = row.createCell(2);
        cell2.setCellValue("نام");
        cell2.setCellStyle(headerStyle);

        Cell cell3 = row.createCell(3);
        cell3.setCellValue("نام خانوادگی");
        cell3.setCellStyle(headerStyle);

        Cell cell4 = row.createCell(4);
        cell4.setCellValue("مبلغ");
        cell4.setCellStyle(headerStyle);
        // data Rows
        List<GlPayDetail> list = null;
        if (isIranian == null) {
            list = entityManager.createNamedQuery("GlPayDetail.getAllPayDetailByHeadIdsFromHeadTable", GlPayDetail.class)
                    .setParameter("headIds", headIds).getResultList();
        } else if (isIranian == true) {
            list = entityManager.createNamedQuery("GlPayDetail.getAllIranianPayDetailByHeadIdsFromHeadTable", GlPayDetail.class)
                    .setParameter("headIds", headIds).getResultList();
        } else if (isIranian == false) {
            list = entityManager.createNamedQuery("GlPayDetail.getForeignsPayDetailByHeadIdsFromHeadTable", GlPayDetail.class)
                    .setParameter("headIds", headIds).getResultList();
        }

        if (list == null || list.isEmpty()) {
            return wb;
        } else {
            int rownum = 2;
            for (GlPayDetail detail : list) {

                NumberFormat numberFormat = NumberFormat.getNumberInstance(Locale.US);

                row = sheet.createRow(rownum++);
                int cellnum = 0;
                Cell cell;

                cell = row.createCell(cellnum++);
                cell.setCellStyle(detailStyle);
                cell.setCellValue(detail.getNatcode());

                cell = row.createCell(cellnum++);
                cell.setCellStyle(detailStyle);
                if (OperationalBankEnum.POSTBANK.getCode().equals(detail.getPayHead().getBankCode().toString()) && detail.getAccountNo().length() > 13 && detail.getAccountNo().length() < 20) {
                    String accountNumber;
                    accountNumber = detail.getAccountNo().substring(0, detail.getAccountNo().length() - 2) + "." + detail.getAccountNo().substring(detail.getAccountNo().length() - 2);
                    cell.setCellValue(accountNumber);
                } else {
                    cell.setCellValue(detail.getAccountNo());
                }

                cell = row.createCell(cellnum++);
                cell.setCellStyle(detailStyle);
                cell.setCellValue(detail.getFirstName());

                cell = row.createCell(cellnum++);
                cell.setCellStyle(detailStyle);
                cell.setCellValue(detail.getLastName());

                cell = row.createCell(cellnum++);
                cell.setCellStyle(detailStyle);
                cell.setCellValue(numberFormat.format(detail.getPayAmount()));

            }

            return wb;
        }

    }

    //CSV controlfile for REFAH  and ALL TEXT_PLAIN ControlFiles
    public BankFile payDetailBankControlFile(String headId, boolean isIranian) {
        BigDecimal id = BigDecimal.valueOf(Long.parseLong(headId));

        GlPayHead head = entityManager.find(GlPayHead.class, id);

        BankFileInputModel bankFileInputModel = new BankFileInputModel();
        bankFileInputModel.setHeadId(headId);
        bankFileInputModel.setBankCode(head.getBankCode());
        bankFileInputModel.setIsIranian(isIranian);

        BankFile bankFile = compositeBankFileBuilder.buildBankControllerFile(bankFileInputModel);
        return bankFile;
    }

    //For Excel
    private Cell addCell(String value, int columnNum, Row row, CellStyle style) {
        Cell cell = row.createCell(columnNum);
        cell.setCellValue(value);
        cell.setCellStyle(style);
        return cell;
    }

    private Cell addCell(long value, int columnNum, Row row, CellStyle style) {
        Cell cell = row.createCell(columnNum);
        cell.setCellValue(value);
        cell.setCellStyle(style);
        return cell;
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

    public byte[] getPensionReport(String filter, Integer status, String systemId) throws IOException {

        JSONArray array = new JSONArray(filter);

        String toDate = null;
        String fromDate = null;
        String title = null;
        String bankName = null;
        String headId = null;

        for (int i = 0; i < array.length(); i++) {

            fromDate = array.getJSONObject(i).getString("fromDate");
            toDate = array.getJSONObject(i).getString("toDate");
            title = array.getJSONObject(i).getString("title");
            bankName = array.getJSONObject(i).getString("bankName");
            headId = array.getJSONObject(i).getString("headId");

        }

        InputStream reportStream = null;
        Map<String, Object> parameters = new HashMap<>();
        parameters.put("fromDate", fromDate);
        parameters.put("toDate", toDate);
        parameters.put("title", title);

        String pensionSystemId = webBundle.getProperty("system.pension.id");
        String shorttermSystemId = webBundle.getProperty("system.shortterm.id");
        String asnadSystemId = webBundle.getProperty("system.asnad.id");
        if (status == 0) {
            if (pensionSystemId.equals(systemId)) {
                parameters.put("branch/org", "شعبه");
                parameters.put("headTitle", "گزارش پرداخت مستمری به تفکیک شعبه");
            } else if (asnadSystemId.equals(systemId)) {
                parameters.put("branch/org", "دفتر اسناد");
                parameters.put("headTitle", "گزارش لیست پرداخت خسارت متفرقه به تفکیک دفتر اسناد");
            } else if (shorttermSystemId.equals(systemId)) {
                parameters.put("branch/org", "شعبه");
                parameters.put("headTitle", "گزارش پرداخت کوتاه مدت به تفکیک شعبه");
            }
        } else if (status == 1) {
            if (pensionSystemId.equals(systemId)) {
                parameters.put("headTitle", "گزارش پرداخت مستمری به تفکیک استان");
            } else if (asnadSystemId.equals(systemId)) {
                parameters.put("headTitle", "گزارش لیست پرداخت خسارت متفرقه به تفکیک استان");
            } else if (shorttermSystemId.equals(systemId)) {
                parameters.put("headTitle", "گزارش پرداخت کوتاه مدت به تفکیک استان");
            }
        }

        List<Object> list = null;
        try {
            if (status == 0) {
                list = entityManager.createNamedQuery("GlPayDetail.getSumValuesGroupByBrch", Object.class)
                        .setParameter("headId", new BigDecimal(headId))
                        .getResultList();
            } else if (status == 1) {
                list = entityManager.createNamedQuery("GlPayDetail.getSumValuesGroupByProvince", Object.class)
                        .setParameter("headId", new BigDecimal(headId))
                        .getResultList();
            }
        } catch (Exception ex) {
            ex.printStackTrace();
        }

        List<PayReportModel> reportModelList = new ArrayList<>();
        PayReportModel reportModel;

        for (Object item : list) {

            Object[] record = (Object[]) item;

            String branchName = (String) record[0];
            Long count = (Long) record[1];
            Long amount = (Long) record[2];

            reportModel = new PayReportModel(bankName, branchName, null, count, amount);
            reportModelList.add(reportModel);
        }
        try {

            JRBeanCollectionDataSource ds = new JRBeanCollectionDataSource(reportModelList);

            if (status == 0) {
                reportStream = PayDetailService.class.getResourceAsStream("/reports/pension/reportByBranchDet.jasper");
            } else if (status == 1) {
                reportStream = PayDetailService.class.getResourceAsStream("/reports/pension/reportByProvinceDet.jasper");
            }

            byte[] byteStream = JasperRunManager.runReportToPdf(reportStream, parameters, ds);
            return byteStream;

        } catch (Exception ex) {
            java.util.logging.Logger.getLogger(PayDetailService.class.getName()).log(Level.SEVERE, null, ex);
        } finally {
            if (reportStream != null) {
                reportStream.close();
            }
        }
        return null;
    }

    public String insertPensionNewParam(String subsystemId, String payHeadId, String valueString, String accCode, String activityCode) throws SQLException, Exception {

        procedure.query("{?=call insertnewpramameter(?,?,?,?,?)}");
        procedure.setOutParameter(1, Types.VARCHAR)
                .setInParameter(2, subsystemId)
                .setInParameter(3, payHeadId)
                .setInParameter(4, valueString)
                .setInParameter(5, accCode)
                .setInParameter(6, activityCode);
        try {
            procedure.execute();
            String result = procedure.getOutParameter(1).toString();
            if (result.contains("Ok!")) {
                return result;
            } else {
                Response response = Response.status(Response.Status.INTERNAL_SERVER_ERROR).entity(result).build();
                throw new WebApplicationException(response);
            }
        } catch (SQLException ex) {
            logger.error(" Exception in glCore.insertnewpramameter", ex);
            throw new Exception();
        }

    }

}
