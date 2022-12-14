/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package ir.tamin.incomeBank.service.centralPayment;

import com.healthmarketscience.jackcess.ColumnBuilder;
import com.healthmarketscience.jackcess.Database;
import com.healthmarketscience.jackcess.DatabaseBuilder;
import com.healthmarketscience.jackcess.Table;
import com.healthmarketscience.jackcess.TableBuilder;
import com.thoughtworks.xstream.XStream;
import com.thoughtworks.xstream.io.xml.DomDriver;
import ir.tamin.incomeBank.model.asnad.VWPaymentTransferSum;
import ir.tamin.incomeBank.model.centralPayment.GlIndividualPay;
import ir.tamin.incomeBank.model.centralPayment.GlSubsystemType;
import ir.tamin.incomeBank.model.centralPayment.GlSystemType;
import ir.tamin.incomeBank.model.centralPayment.enums.AccountSideTypeEnum;
import ir.tamin.incomeBank.model.centralPayment.enums.PayStatusEnum;
import ir.tamin.incomeBank.model.identityManager.User;
import ir.tamin.incomeBank.util.DateUtils;
import ir.tamin.framework.cdi.util.MessageBundle;
import ir.tamin.framework.cdi.util.WebProperties;
import ir.tamin.framework.core.util.Bundle;
import ir.tamin.framework.ws.rest.json.Filter;
import ir.tamin.framework.ws.rest.json.FilterWrapper;
import ir.tamin.framework.ws.rest.json.Sort;
import ir.tamin.framework.ws.rest.json.SortWrapper;
import java.io.File;
import java.io.IOException;
import java.math.BigDecimal;
import java.math.BigInteger;
import java.sql.SQLException;
import java.sql.Types;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.Date;
import java.util.HashMap;
import java.util.HashSet;
import java.util.List;
import java.util.Map;
import java.util.Set;
import java.util.logging.Level;
import java.util.logging.Logger;
import javax.ejb.Stateless;
import javax.ejb.TransactionAttribute;
import javax.ejb.TransactionAttributeType;
import javax.inject.Inject;
import javax.persistence.EntityManager;
import javax.persistence.TypedQuery;
import javax.persistence.criteria.CriteriaBuilder;
import javax.persistence.criteria.CriteriaQuery;
import javax.persistence.criteria.Order;
import javax.persistence.criteria.Predicate;
import javax.persistence.criteria.Root;
import javax.ws.rs.WebApplicationException;
import javax.ws.rs.core.Response;
import org.apache.poi.hssf.usermodel.HSSFPalette;
import org.apache.poi.hssf.usermodel.HSSFWorkbook;
import org.apache.poi.hssf.util.HSSFColor;
import org.apache.poi.ss.usermodel.Cell;
import org.apache.poi.ss.usermodel.CellStyle;
import org.apache.poi.ss.usermodel.Font;
import org.apache.poi.ss.usermodel.IndexedColors;
import org.apache.poi.ss.usermodel.Row;
import org.apache.poi.ss.usermodel.Sheet;
import org.apache.poi.ss.usermodel.Workbook;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;
import org.slf4j.LoggerFactory;

/**
 *
 * @author s_maknooni
 */
@Stateless
public class IndividualPayService {

    @Inject
    EntityManager entityManager;

    @Inject
    LogService logService;

    @Inject
    @MessageBundle
    Bundle messageBundle;

    @Inject
    @WebProperties
    Bundle webBundle;

    private final org.slf4j.Logger logger = LoggerFactory.getLogger(IndividualPayService.class);

    public void save(GlIndividualPay individualPay) {
        entityManager.persist(individualPay);
        entityManager.flush();
    }

    public GlIndividualPay get(BigDecimal payId) {
        GlIndividualPay glIndividualPay = new GlIndividualPay(payId);
        glIndividualPay = entityManager.find(GlIndividualPay.class, payId);
        return glIndividualPay;
    }

    public Map<String, Object> getAll(FilterWrapper filterWrapper, Integer start, Integer limit, SortWrapper sort) {
        Map<String, Object> map = new HashMap<>();
        map.put("list", getList(filterWrapper, start, limit, sort));
        map.put("total", getCount(filterWrapper));
        return map;

    }

    public Object getAllByHeadId(BigDecimal headId, FilterWrapper filterWrapper, Integer start, Integer limit, SortWrapper sortWrapper) {
        Map<String, Object> map = new HashMap<>();

        Filter filter = new Filter();
        filter.setProperty("individualPayHead.payHeadId");
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

    private List<GlIndividualPay> getList(FilterWrapper filterWrapper, Integer start, Integer limit, SortWrapper sort) {
        TypedQuery createQuery = entityManager.createQuery(getQuery(filterWrapper, sort));

        List<GlIndividualPay> payDetails = new ArrayList<>();
        List<GlIndividualPay> noLimitPayDetails = new ArrayList<>();
        List<GlIndividualPay> payedNoLimitPayDetails = new ArrayList<>();
        // for sum payed records
        FilterWrapper payedFilterWrapper = new FilterWrapper();
        Set<Filter> filters = new HashSet<>();
        payedFilterWrapper.setFilters(filters);
        boolean addPayedStatusFilter = false;
        for (Filter f : filterWrapper.getFilters()) {
            filters.add(f);

            if (!f.getProperty().equals("status")) {
                addPayedStatusFilter = true;
            } else {
                if (PayStatusEnum.PAY_SUCCESSFULLY.getCode().equals(f.getValue())) {
                    addPayedStatusFilter = true;
                }
            }
        }
        if (addPayedStatusFilter) {
            Filter payedStatusfilter = new Filter();
            payedStatusfilter.setProperty("status");
            payedStatusfilter.setValue(PayStatusEnum.PAY_SUCCESSFULLY.getCode() + "," + PayStatusEnum.SODUR_SANAD.getCode());
            payedStatusfilter.setOperator(Filter.Operator.IN);
            filters.add(payedStatusfilter);
        }
        //
        if (start != null && limit != null) {
            noLimitPayDetails = createQuery.getResultList();
            payDetails = createQuery.setFirstResult(start).setMaxResults(limit).getResultList();
        } else if (start == null && limit != null) {
            noLimitPayDetails = createQuery.getResultList();
            payDetails = createQuery.setMaxResults(limit).getResultList();
        } else if (start != null && limit == null) {
            noLimitPayDetails = createQuery.getResultList();
            payDetails = createQuery.setFirstResult(start).getResultList();
        } else if (start == null && limit == null) {
            payDetails = createQuery.getResultList();
            noLimitPayDetails = payDetails;
        }

        if (!noLimitPayDetails.isEmpty()) {
            BigInteger total = BigInteger.ZERO;
            for (GlIndividualPay item : noLimitPayDetails) {
                total = total.add(item.getPayAmount());
            }
            payDetails.get(0).setTotalFilteredAmount(total);

            TypedQuery payedCreateQuery = entityManager.createQuery(getQuery(payedFilterWrapper, null));
            payedNoLimitPayDetails = payedCreateQuery.getResultList();

            BigInteger totalPayed = BigInteger.ZERO;
            if (!payedNoLimitPayDetails.isEmpty()) {
                for (GlIndividualPay item : payedNoLimitPayDetails) {
                    totalPayed = totalPayed.add(item.getPayAmount());
                }
            }
            payDetails.get(0).setTotalFilteredPayedAmount(totalPayed);

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
            Root<GlIndividualPay> individualPayFrom = criteriaQuery.from(GlIndividualPay.class);
//            Metamodel metamodel = entityManager.getMetamodel();
//            EntityType<GlIndividualPay> individualPayEntityType = metamodel.entity(GlIndividualPay.class);

            List<Predicate> predicates = new ArrayList<>();

            if (filterWrapper != null && filterWrapper.getFilters() != null) {
                for (Filter filter : filterWrapper.getFilters()) {

                    String field = filter.getProperty();
                    Object value = filter.getValue();
                    Filter.Operator operator = filter.getOperator();

                    if (filter.getProperty().equals("fromDate") || filter.getProperty().equals("toDate")) {

                        Date Date = DateUtils.convertDateStringToDate(value.toString().replace("/", ""));
                        value = DateUtils.format(Date, "yyyyMMdd");
                        field = "effectivedate";
                    } else if (filter.getProperty().equals("fromMonth") || filter.getProperty().equals("toMonth")) {
                        field = "effectivedate";
                    }

                    String[] f = field.split("\\.");
                    Predicate predicate = null;

                    javax.persistence.criteria.Path path;
                    switch (operator) {
                        case EQUAL:
                            path = individualPayFrom.get(f[0]);
                            for (int j = 1; j < f.length; j++) {
                                path = path.get(f[j]);
                            }
                            predicate = criteriaBuilder.equal(path, value);
                            predicates.add(predicate);
                            break;
                        case LIKE:
                            if ("fullName".equals(f[0])) {
                                javax.persistence.criteria.Path fPath = individualPayFrom.get("firstName");
                                javax.persistence.criteria.Path lPath = individualPayFrom.get("lastName");

                                predicate = criteriaBuilder.or(criteriaBuilder.like(fPath, "%" + value + "%"),
                                        criteriaBuilder.like(lPath, "%" + value + "%")
                                );
                            } else {
                                path = individualPayFrom.get(f[0]);
                                for (int j = 1; j < f.length; j++) {
                                    path = path.get(f[j]);
                                }
                                predicate = criteriaBuilder.like(path, "%" + value + "%");
                            }

                            predicates.add(predicate);
                            break;

                        case AFTER:
                            path = individualPayFrom.get(f[0]);
                            predicates.add(criteriaBuilder.greaterThanOrEqualTo(path, value.toString()));
                            break;
                        case BEFORE:
                            path = individualPayFrom.get(f[0]);
                            predicates.add(criteriaBuilder.lessThanOrEqualTo(path, value.toString()));
                            break;
                        case IN:
                            path = individualPayFrom.get(f[0]);
                            List list = new ArrayList<>();
                            String val[] = value.toString().split(",");
                            list.addAll(Arrays.asList(val));
                            predicates.add(path.in(list));

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

                    javax.persistence.criteria.Path path = individualPayFrom.get(sortProperties[0]);
                    for (int j = 1; j < sortProperties.length; j++) {
                        path = path.get(sortProperties[j]);
                    }
                    // if (sortProperties.length == 1) {
                    if (sortSet.getDirection().getName().equals(Sort.Direction.DESC.getName())) {
                        order = criteriaBuilder.desc(individualPayFrom.get(sortProperties[0]));
                    } else {
                        order = criteriaBuilder.asc(individualPayFrom.get(sortProperties[0]));
                    }
                    //  }
                    orders.add(order);
                }

                if (!orders.isEmpty()) {
                    criteriaQuery.orderBy(orders);
                }
            }

            criteriaQuery.select(individualPayFrom);
            return criteriaQuery;
        } catch (Exception e) {
            Logger.getLogger(GlIndividualPay.class.getName()).log(Level.SEVERE, e.getMessage(), e);
            return null;
        }
    }

    public void updateStatus(BigDecimal payId, String status, boolean emtyErrorCode, String payType, String userName, String sendToBankErrCode, String sendToBankErrMsg) {
        GlIndividualPay individualPay = entityManager.find(GlIndividualPay.class, payId);
        individualPay.setStatus(status);
        individualPay.setSendType(payType);
        individualPay.setUpdateUser(userName);
        individualPay.setUpdateDate(new Date());
        individualPay.setErrorcodeSend(sendToBankErrCode);
        individualPay.setErrordescSend(sendToBankErrMsg);
        if (emtyErrorCode) {
            individualPay.setErrorcode(null);
            individualPay.setErrordesc(null);
        }
        if (PayStatusEnum.SEND_SUCCESSFULLY.getCode().equals(status)) {
            individualPay.setSendToBankDate(new Date());
        }
        entityManager.merge(individualPay);
        entityManager.flush();
    }

    public String delete(GlIndividualPay glIndividualPay, User user) {
        String deleteMessage = "";
        try {
            GlIndividualPay tempGlIndividualPay = new GlIndividualPay();
            tempGlIndividualPay = get(glIndividualPay.getPayId());
            entityManager.remove(tempGlIndividualPay);
            deleteMessage = "حذف با موفقیت انجام شد";
            return deleteMessage;
        } catch (Exception ex) {
            Logger.getLogger(GlIndividualPay.class.getName()).log(Level.SEVERE, null, ex);
            Response response = Response.status(Response.Status.INTERNAL_SERVER_ERROR).entity(messageBundle.getProperty("coreAccount.common.EXC_UNKNOWN_ERROR")).build();
            throw new WebApplicationException(response);

        }

    }

    public Database writeToAccess(FilterWrapper filter, Integer start, Integer limit, SortWrapper sort) throws ClassNotFoundException, SQLException, IOException, NumberFormatException {

        String file = "individualPayDetailReport.accdb";
        List<GlIndividualPay> resultList = getList(filter, null, null, null);

        try {
            Database db = (DatabaseBuilder.create(Database.FileFormat.V2010, new File(file)));
            String GlIndividualPay = "glIndividualPay";
            Table table = new TableBuilder(GlIndividualPay) // Creating table
                    .addColumn(new ColumnBuilder("UNIT_CODE").setSQLType(Types.VARCHAR).toColumn())
                    .addColumn(new ColumnBuilder("UNIT_NAME").setSQLType(Types.VARCHAR).toColumn())
                    .addColumn(new ColumnBuilder("NAME").setSQLType(Types.VARCHAR).toColumn())
                    .addColumn(new ColumnBuilder("NATCODE").setSQLType(Types.VARCHAR).toColumn())
                    .addColumn(new ColumnBuilder("ACCOUNT_SIDE_NO").setSQLType(Types.VARCHAR).toColumn())
                    .addColumn(new ColumnBuilder("EFFECTIVEDATE").setSQLType(Types.VARCHAR).toColumn())
                    .addColumn(new ColumnBuilder("PAY_AMOUNT").setSQLType(Types.NUMERIC).toColumn())
                    .addColumn(new ColumnBuilder("DESTINATIONACCNO").setSQLType(Types.VARCHAR).toColumn())
                    .addColumn(new ColumnBuilder("SHENASEPAYMENT").setSQLType(Types.VARCHAR).toColumn())
                    .addColumn(new ColumnBuilder("WWWSTATUS").setSQLType(Types.VARCHAR).toColumn())
                    .addColumn(new ColumnBuilder("STATUS").setSQLType(Types.VARCHAR).toColumn())
                    .addColumn(new ColumnBuilder("CHEQUE_NO").setSQLType(Types.VARCHAR).toColumn())
                    .addColumn(new ColumnBuilder("CHEQUE_DATE").setSQLType(Types.VARCHAR).toColumn())
                    .addColumn(new ColumnBuilder("ERRORCODE_SEND").setSQLType(Types.VARCHAR).toColumn())
                    .addColumn(new ColumnBuilder("ERRORDESC_SEND").setSQLType(Types.VARCHAR).toColumn())
                    .addColumn(new ColumnBuilder("ERRORCODE").setSQLType(Types.VARCHAR).toColumn())
                    .addColumn(new ColumnBuilder("ERRORDESC").setSQLType(Types.VARCHAR).toColumn())
                    .toTable(db);
            for (GlIndividualPay item : resultList) {
                String unitCode = item.getUnitCode();
                String unitName = item.getUnitName();
//            String firstName = item.getFirstName();
//            String LastName = item.getLastName();
                String name = item.getName();
                String natCode = item.getNatcode();
                String accountSideNo = item.getAccountSideNo();
                String effectiveDate = null;
                if (item.getEffectivedate().length() == 8) {
                    effectiveDate = item.getEffectivedate().substring(0, 4) + "/" + item.getEffectivedate().substring(4, 6) + "/" + item.getEffectivedate().substring(6, 8);
                } else if (item.getEffectivedate().length() == 4) {
                    effectiveDate = item.getEffectivedate().substring(0, 2) + "/" + item.getEffectivedate().substring(2, 4);
                }
                Long payAmount = item.getPayAmount().longValue();
                String destinationAccNo = item.getDestinationaccno();
                String shenasePayment = item.getShenasepayment();
                String wwwStatus = "-";
                if (item.getWwwStatus() != null && item.getWwwStatus().equals("0")) {
                    wwwStatus = "بستری";
                } else if (item.getWwwStatus() != null && item.getWwwStatus().equals("1")) {
                    wwwStatus = "سرپایی";
                }
                String status = item.getStatusDesc();

                String chequeNo = item.getChequeNo();
                String chequeDate = "";
                if (item.getChequeDate() != null && !item.getChequeDate().isEmpty() && item.getChequeDate().length() == 8) {
                    chequeDate = item.getChequeDate().substring(0, 4) + "/" + item.getChequeDate().substring(4, 6) + "/" + item.getChequeDate().substring(6, 8);
                }
                String sendErrorCode = item.getErrorcodeSend();
                String sendErrorDesc = item.getErrordescSend();
                String errorCode = item.getErrorcode();
                String errorDesc = item.getErrordesc();

                table.addRow(unitCode, unitName, name, natCode, accountSideNo, effectiveDate, payAmount, destinationAccNo, shenasePayment, wwwStatus, status, chequeNo, chequeDate, sendErrorCode, sendErrorDesc, errorCode, errorDesc);//Inserting values into the table
            }
            db.close();
            return db;
        } catch (Exception ex) {
            Logger.getLogger(IndividualPayService.class.getName()).log(Level.SEVERE, null, ex);
            return null;
        }
    }

    public String writeToXml(FilterWrapper filter, Integer start, Integer limit, SortWrapper sort) throws IOException {
        try {

            List<GlIndividualPay> payList = getList(filter, null, null, null);
            XStream xStream = new XStream(new DomDriver());
            String xml = xStream.toXML(payList);
            return xml;
        } catch (Exception ex) {
            Logger.getLogger(IndividualPayService.class.getName()).log(Level.SEVERE, null, ex);
            return null;
        }
    }

    public Workbook writeToExcel(FilterWrapper filter, Integer start, Integer limit, SortWrapper sort) throws IOException {

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
        cell1.setCellValue("کد استان");
        cell1.setCellStyle(headerStyle);

        Cell cell2 = row.createCell(2);
        cell2.setCellValue("نام استان");
        cell2.setCellStyle(headerStyle);

        Cell cell3 = row.createCell(3);
        cell3.setCellValue("نام طرف قرارداد");
        cell3.setCellStyle(headerStyle);

        Cell cell4 = row.createCell(4);
        cell4.setCellValue("کد/شناسه ملی");
        cell4.setCellStyle(headerStyle);

        Cell cell5 = row.createCell(5);
        cell5.setCellValue("کد طرف قرارداد");
        cell5.setCellStyle(headerStyle);

        Cell cell6 = row.createCell(6);
        cell6.setCellValue("تاریخ عملکرد");
        cell6.setCellStyle(headerStyle);

        Cell cell7 = row.createCell(7);
        cell7.setCellValue("مبلغ قابل پرداخت");
        cell7.setCellStyle(headerStyle);

        Cell cell8 = row.createCell(8);
        cell8.setCellValue("شماره شبا");
        cell8.setCellStyle(headerStyle);

        Cell cell9 = row.createCell(9);
        cell9.setCellValue("شناسه پرداخت");
        cell9.setCellStyle(headerStyle);

        Cell cell10 = row.createCell(10);
        cell10.setCellValue("نوع صورتحساب");
        cell10.setCellStyle(headerStyle);

        Cell cell11 = row.createCell(11);
        cell11.setCellValue("وضعیت");
        cell11.setCellStyle(headerStyle);

        Cell cell12 = row.createCell(12);
        cell12.setCellValue("شماره چک / حواله");
        cell12.setCellStyle(headerStyle);

        Cell cell13 = row.createCell(13);
        cell13.setCellValue("تاریخ چک / حواله");
        cell13.setCellStyle(headerStyle);

        Cell cell14 = row.createCell(14);
        cell14.setCellValue("کد خطای ارسال");
        cell14.setCellStyle(headerStyle);

        Cell cell15 = row.createCell(15);
        cell15.setCellValue("شرح خطای ارسال");
        cell15.setCellStyle(headerStyle);

        Cell cell16 = row.createCell(16);
        cell16.setCellValue("کد خطای پرداخت");
        cell16.setCellStyle(headerStyle);

        Cell cell17 = row.createCell(17);
        cell17.setCellValue("شرح خطای پرداخت");
        cell17.setCellStyle(headerStyle);

        List<GlIndividualPay> payList = getList(filter, null, null, null);
        int rownum = 1;
        for (GlIndividualPay item : payList) {
            String unitCode = item.getUnitCode();
            String unitName = item.getUnitName();
//            String firstName = item.getFirstName();
//            String LastName = item.getLastName();
            String name = item.getName();
            String natCode = item.getNatcode();
            String accountSideNo = item.getAccountSideNo();
            String effectiveDate = null;
            if (item.getEffectivedate().length() == 8) {
                effectiveDate = item.getEffectivedate().substring(0, 4) + "/" + item.getEffectivedate().substring(4, 6) + "/" + item.getEffectivedate().substring(6, 8);
            } else if (item.getEffectivedate().length() == 4) {
                effectiveDate = item.getEffectivedate().substring(0, 2) + "/" + item.getEffectivedate().substring(2, 4);
            }
            Long payAmount = item.getPayAmount().longValue();
            String destinationAccNo = item.getDestinationaccno();
            String shenasePayment = item.getShenasepayment();
            String wwwStatus = "-";
            if (item.getWwwStatus() != null && item.getWwwStatus().equals("0")) {
                wwwStatus = "بستری";
            } else if (item.getWwwStatus() != null && item.getWwwStatus().equals("1")) {
                wwwStatus = "سرپایی";
            }
            String status = item.getStatusDesc();
            String cheqDate = "";
            String cheqNo = item.getChequeNo();
            if (item.getChequeDate() != null && !item.getChequeDate().isEmpty() && item.getChequeDate().length() == 8) {
                cheqDate = item.getChequeDate().substring(0, 4) + "/" + item.getChequeDate().substring(4, 6) + "/" + item.getChequeDate().substring(6, 8);
            }
            String errorCode = item.getErrorcode();
            String errorDesc = item.getErrordesc();
            String errorCodeSend = item.getErrorcodeSend();
            String errorDescSend = item.getErrordescSend();

            row = sheet.createRow(rownum++);
            int cellnum = 0;

            Cell cell = row.createCell(cellnum++);
            cell.setCellStyle(detailStyle);
            cell.setCellValue(rownum - 1);

            cell = row.createCell(cellnum++);
            cell.setCellStyle(detailStyle);
            cell.setCellValue(unitCode);

            cell = row.createCell(cellnum++);
            cell.setCellStyle(detailStyle);
            cell.setCellValue(unitName);

            cell = row.createCell(cellnum++);
            cell.setCellStyle(detailStyle);
            cell.setCellValue(name);

            cell = row.createCell(cellnum++);
            cell.setCellStyle(detailStyle);
            cell.setCellValue(natCode);

            cell = row.createCell(cellnum++);
            cell.setCellStyle(detailStyle);
            cell.setCellValue(accountSideNo);

            cell = row.createCell(cellnum++);
            cell.setCellStyle(detailStyle);
            cell.setCellValue(effectiveDate);

            cell = row.createCell(cellnum++);
            cell.setCellStyle(detailStyle);
            cell.setCellValue(payAmount);

            cell = row.createCell(cellnum++);
            cell.setCellStyle(detailStyle);
            cell.setCellValue(destinationAccNo);

            cell = row.createCell(cellnum++);
            cell.setCellStyle(detailStyle);
            cell.setCellValue(shenasePayment);

            cell = row.createCell(cellnum++);
            cell.setCellStyle(detailStyle);
            cell.setCellValue(wwwStatus);

            cell = row.createCell(cellnum++);
            cell.setCellStyle(detailStyle);
            cell.setCellValue(status);

            cell = row.createCell(cellnum++);
            cell.setCellStyle(detailStyle);
            cell.setCellValue(cheqNo);

            cell = row.createCell(cellnum++);
            cell.setCellStyle(detailStyle);
            cell.setCellValue(cheqDate);

            cell = row.createCell(cellnum++);
            cell.setCellStyle(detailStyle);
            cell.setCellValue(errorCodeSend);

            cell = row.createCell(cellnum++);
            cell.setCellStyle(detailStyle);
            cell.setCellValue(errorDescSend);

            cell = row.createCell(cellnum++);
            cell.setCellStyle(detailStyle);
            cell.setCellValue(errorCode);

            cell = row.createCell(cellnum++);
            cell.setCellStyle(detailStyle);
            cell.setCellValue(errorDesc);

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

    public GlIndividualPay findByShenasePayment(String shenasepayment) {

        FilterWrapper filterWrapper = new FilterWrapper();
        Set<Filter> filters = new HashSet<>();
        Filter filter = new Filter();
        filter.setProperty("shenasepayment");
        filter.setOperator(Filter.Operator.EQUAL);
        filter.setValue(shenasepayment);
        filterWrapper.setFilters(filters);
        filters.add(filter);

        List<GlIndividualPay> individualPays = new ArrayList<>();

        TypedQuery createQuery = entityManager.createQuery(getQuery(filterWrapper, null));
        individualPays = createQuery.setFirstResult(0).setMaxResults(1).getResultList();

        if (individualPays.isEmpty()) {
            return null;
        } else {
            return individualPays.get(0);
        }

    }

    @TransactionAttribute(TransactionAttributeType.REQUIRES_NEW)
    public void insertIntoIndividualPay(VWPaymentTransferSum payRecord, String sendStatusCode, String payType, String errorcodeSend, String errordescSend) {
        try {
            GlIndividualPay individualPay = new GlIndividualPay();
            individualPay.setFirstName(payRecord.getDestinationFName());
            individualPay.setLastName(payRecord.getDestinationLName());
            individualPay.setFatherName(payRecord.getDestinationFatherName());
            individualPay.setNatcode(payRecord.getDestinationNationCode());
            individualPay.setShenasepayment(payRecord.getShenasepayment());

//            BigInteger amnt = payRecord.getAmount();
//            int payPercent = Integer.valueOf(webBundle.getProperty("asnad.paytodoc.percent"));
//            long amountToPay = amnt.longValue() * payPercent / 100;
//            individualPay.setPayAmount(amountToPay);
            individualPay.setPayAmount(payRecord.getAlalamount());
            individualPay.setDestinationaccno(payRecord.getDestinationAccNo());
            individualPay.setEffectivedate(payRecord.getEffectivedate());
            individualPay.setStatus(sendStatusCode);
            individualPay.setSystem(new GlSystemType(Integer.valueOf(webBundle.getProperty("system.asnad.id"))));
            individualPay.setCreateDate(new Date());
            individualPay.setSendToBankDate(new Date());
            individualPay.setSendType(payType);
            individualPay.setUnitCode(payRecord.getUnitCode());
            individualPay.setAccountSideType(AccountSideTypeEnum.Doctors.getCode());
            individualPay.setSubSystem(new GlSubsystemType(Integer.valueOf(webBundle.getProperty("asnad.doctor.id"))));
            individualPay.setMobile(payRecord.getDestinationMobileNo());
            individualPay.setAccountSideNo(payRecord.getCustNo());
            individualPay.setIdNO(payRecord.getDestinationIDNo());
            if (errorcodeSend != null && !errorcodeSend.isEmpty()) {
                individualPay.setErrorcodeSend(errorcodeSend);
            }
            if (errordescSend != null && !errordescSend.isEmpty()) {
                individualPay.setErrordescSend(errordescSend);
            }
            individualPay.setWwwStatus(null);

            save(individualPay);
        } catch (Exception ex) {
            String errorMessage = "خطا در ایجاد رکورد ارسال شده با شناسه " + payRecord.getShenasepayment() + " در جدول  gl_individual_pay .";
            logger.error(errorMessage + ex.toString());
        }
    }

}
