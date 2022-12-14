/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package ir.tamin.incomeBank.service.asnad;

import ir.tamin.incomeBank.model.asnad.VWPaymentTransferSum;
import ir.tamin.incomeBank.model.baseinfo.BankErrorCode;
import ir.tamin.incomeBank.model.centralPayment.GlIndividualPay;
import ir.tamin.incomeBank.model.centralPayment.GlSystemType;
import ir.tamin.incomeBank.model.centralPayment.LogDetail;
import ir.tamin.incomeBank.model.centralPayment.enums.AccountSideTypeEnum;
import ir.tamin.incomeBank.model.centralPayment.enums.IndividualPayTypeEnum;
import ir.tamin.incomeBank.model.centralPayment.enums.OnlinePayReportEnum;
import ir.tamin.incomeBank.model.centralPayment.enums.PayStatusEnum;
import ir.tamin.incomeBank.service.asnad.webservice.authentication.AuthenticationWebService;
import ir.tamin.incomeBank.service.asnad.webservice.brefah.BRefahWebService;
import ir.tamin.incomeBank.service.asnad.webservice.brefah.RequestTransfer;
import ir.tamin.incomeBank.service.asnad.webservice.brefah.ResultTransfer;
import ir.tamin.incomeBank.service.centralPayment.IndividualPayService;
import ir.tamin.incomeBank.service.centralPayment.LogService;
import ir.tamin.incomeBank.service.centralPayment.PayDetailService;
import ir.tamin.incomeBank.service.jdbc.StoredProcedure;
import ir.tamin.incomeBank.util.DateUtils;
import ir.tamin.framework.cdi.util.WebProperties;
import ir.tamin.framework.core.util.Bundle;
import ir.tamin.framework.ws.rest.json.Filter;
import ir.tamin.framework.ws.rest.json.FilterWrapper;
import ir.tamin.framework.ws.rest.json.Sort;
import ir.tamin.framework.ws.rest.json.SortWrapper;
import java.math.BigDecimal;
import java.math.BigInteger;
import java.util.ArrayList;
import java.util.Calendar;
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
import javax.ws.rs.WebApplicationException;
import javax.ws.rs.core.Response;
import javax.xml.ws.Holder;
import org.slf4j.LoggerFactory;

/**
 *
 * @author s_maknooni
 */
@Stateless
public class PaymentTransferSumService {

    @Inject
    AuthenticationWebService authenticationWebService;

    @Inject
    BRefahWebService bRefahWebService;

    @Inject
    EntityManager entityManager;

    @Inject
    LogService logService;

    @Inject
    @WebProperties
    Bundle webBundle;

    @Inject
    IndividualPayService individualPayService;

    @Inject
    private StoredProcedure procedure;

//    @Resource
//    private EJBContext eJBContext;
    private final static org.slf4j.Logger logger = LoggerFactory.getLogger(PaymentTransferSumService.class);

    public Map<String, Object> getAll(FilterWrapper filterWrapper, Integer start, Integer limit, SortWrapper sortWrapper, List<BigDecimal> deletedList) {
        Map<String, Object> map = new HashMap<>();
        map.put("list", getList(filterWrapper, start, limit, sortWrapper, deletedList));
        map.put("total", getCount(filterWrapper, deletedList));
        return map;
    }

    private List<VWPaymentTransferSum> getList(FilterWrapper filter, Integer start, Integer limit, SortWrapper sort, List<BigDecimal> deletedList) {
        TypedQuery createQuery = entityManager.createQuery(getQuery(filter, sort, deletedList));

        List<VWPaymentTransferSum> paymentTransferSumList = new ArrayList<>();
        if (start != null && limit != null) {
            paymentTransferSumList = createQuery.setFirstResult(start).setMaxResults(limit).getResultList();
        } else if (start == null && limit != null) {
            paymentTransferSumList = createQuery.setMaxResults(limit).getResultList();
        } else if (start != null && limit == null) {
            paymentTransferSumList = createQuery.setFirstResult(start).getResultList();
        } else if (start == null && limit == null) {
            paymentTransferSumList = createQuery.getResultList();
        }

        return paymentTransferSumList;

    }

    private Integer getCount(FilterWrapper filter, List<BigDecimal> deletedList) {
        Integer count = 0;
        TypedQuery createQuery = entityManager.createQuery(getQuery(filter, null, deletedList));
        count = createQuery.getResultList().size();
        return count;
    }

    private List<VWPaymentTransferSum> getViewList(FilterWrapper filter, SortWrapper sort, List<BigDecimal> deletedList) {
        TypedQuery createQuery = entityManager.createQuery(getQuery(filter, sort, deletedList));

        List<VWPaymentTransferSum> list = createQuery.getResultList();
        return list;

    }

    private CriteriaQuery getQuery(FilterWrapper filterWrapper, SortWrapper sortWrapper, List<BigDecimal> deletedList) {
        try {

            CriteriaBuilder criteriaBuilder = entityManager.getCriteriaBuilder();
            CriteriaQuery criteriaQuery = criteriaBuilder.createQuery();

            Root<VWPaymentTransferSum> from = criteriaQuery.from(VWPaymentTransferSum.class);

            List<Predicate> predicates = new ArrayList<>();

            if (filterWrapper != null && filterWrapper.getFilters() != null) {
                Predicate predicate = null;
                for (Filter filter : filterWrapper.getFilters()) {

                    String field = filter.getProperty();
                    Object value = filter.getValue();
                    Filter.Operator operator = filter.getOperator();
                    String[] f = field.split("\\.");

                    javax.persistence.criteria.Path path;
                    switch (operator) {
                        case EQUAL:
                            path = from.get(f[0]);
                            for (int j = 1; j < f.length; j++) {
                                path = path.get(f[j]);
                            }
                            predicate = criteriaBuilder.equal(path, value);
                            predicates.add(predicate);
                            break;
                        case LIKE:
                            path = from.get(f[0]);
                            for (int j = 1; j < f.length; j++) {
                                path = path.get(f[j]);
                            }
                            predicate = criteriaBuilder.like(path, "%" + value + "%");
                            predicates.add(predicate);
                            break;
                        case BEFORE:

                            if (f.length == 1 && f[0].equals("alalamount")) {
                                path = from.get(f[0]);
                                long val = Long.parseLong((String) value);
                                predicate = criteriaBuilder.lessThanOrEqualTo(path, BigInteger.valueOf(val));
                                predicates.add(predicate);
                            } else if (f.length == 1 && f[0].equals("toEffectivedate")) {
                                path = from.get("effectivedate");
                                Date toDate = new Date(Long.valueOf(value.toString()));
                                String toDateString = DateUtils.format(toDate, "yyyyMMdd");
                                predicate = criteriaBuilder.lessThanOrEqualTo(path, toDateString);
                                predicates.add(predicate);
                            }
                            break;
                        case AFTER:

                            if (f.length == 1 && f[0].equals("alalamount")) {
                                path = from.get(f[0]);
                                predicate = criteriaBuilder.greaterThan(path, new BigInteger((String) value));
                                predicates.add(predicate);
                            } else if (f.length == 1 && f[0].equals("fromEffectivedate")) {
                                path = from.get("effectivedate");
                                Date fromDate = new Date(Long.valueOf(value.toString()));
                                String fromDateString = DateUtils.format(fromDate, "yyyyMMdd");
                                predicate = criteriaBuilder.greaterThanOrEqualTo(path, fromDateString);
                                predicates.add(predicate);
                            }
                            break;
                        default:
                            break;
                    }
                }

                if (deletedList != null && !deletedList.isEmpty() && !deletedList.get(0).equals(new BigDecimal(0))) {
                    predicate = from.get("sumId").in(deletedList).not();
                    predicates.add(predicate);
                }

                criteriaQuery.where(predicates.toArray(new Predicate[]{}));

            }

            if (sortWrapper != null) {
                List<Order> orders = new ArrayList<>();
                for (Sort sortSet : sortWrapper.getSortSet()) {
                    Order order = null;
                    String[] sortProperties = sortSet.getProperty().split("\\.");

                    javax.persistence.criteria.Path path = from.get(sortProperties[0]);
                    for (int j = 1; j < sortProperties.length; j++) {
                        path = path.get(sortProperties[j]);
                    }
                    if (sortProperties.length == 1) {
                        if (sortSet.getDirection().getName().equals(Sort.Direction.DESC.getName())) {
                            order = criteriaBuilder.desc(from.get(sortProperties[0]));
                        } else {
                            order = criteriaBuilder.asc(from.get(sortProperties[0]));
                        }
                    }
                    orders.add(order);
                }

                if (!orders.isEmpty()) {
                    criteriaQuery.orderBy(orders);
                }
            }

            criteriaQuery.select(from);
            return criteriaQuery;
        } catch (Exception e) {
            Logger.getLogger(PayDetailService.class.getName()).log(Level.SEVERE, e.getMessage(), e);
            Response response = Response.status(Response.Status.INTERNAL_SERVER_ERROR).entity("خطا در دریافت اطلاعات").build();
            throw new WebApplicationException(response);
            //return null;
        }
    }

    public void sendToRefahBank(FilterWrapper filterWrapper) {

        Holder<String> stringHolders = new Holder<>();
        Holder<Boolean> booleanHolders = new Holder<>();

        List<VWPaymentTransferSum> list = getViewList(filterWrapper, null, null);
        GlSystemType system = new GlSystemType(Integer.valueOf(webBundle.getProperty("system.asnad.id")));

        if (!list.isEmpty()) {
            int totalRecordsCount = list.size();
            int successRecordsCount = 0;
            boolean authenticationResult = true;

            List<LogDetail> logDetails = new ArrayList<>();
            LogDetail logDetail;
            RequestTransfer requestTransfer;
            for (VWPaymentTransferSum payRecord : list) {
                requestTransfer = new RequestTransfer();

                if (payRecord.getSumId() == null
                        || payRecord.getDestinationFName() == null || payRecord.getDestinationFName().isEmpty()
                        || payRecord.getDestinationLName() == null || payRecord.getDestinationLName().isEmpty()
                        || payRecord.getDestinationNationCode() == null || payRecord.getDestinationNationCode().isEmpty()
                        || payRecord.getDestinationIDNo() == null || payRecord.getDestinationIDNo().isEmpty()
                        || payRecord.getShenasepayment() == null || payRecord.getShenasepayment().isEmpty()
                        || payRecord.getAlalamount() == null || payRecord.getAlalamount() == BigInteger.ZERO
                        || payRecord.getDestinationAccNo() == null || payRecord.getDestinationAccNo().isEmpty()
                        || payRecord.getEffectivedate() == null || payRecord.getEffectivedate().isEmpty()
                        || payRecord.getUnitCode() == null || payRecord.getUnitCode().isEmpty()
                        || payRecord.getNosMonth() == null || payRecord.getNosYear().isEmpty()
                        || payRecord.getCustNo() == null || payRecord.getCustNo().isEmpty()) {
                    logService.save("عدم ارسال رکورد با شناسه " + payRecord.getShenasepayment() + "به دلیل مقادیر خالی یا صفر.", null, system, "", LogService.MIN_PRIORITY);
                    continue;
                }
                try {
                    authenticationWebService.getAuthenticationWebServiceSoap().getValidationCode("Tamin", "Sog@nd123456PariBiia", payRecord.getUnitCode(), "1", stringHolders, booleanHolders);
                    authenticationResult = authenticationWebService.getAuthenticationWebServiceSoap().checkValidationCode(payRecord.getUnitCode(), stringHolders.value, "1");
                } catch (Exception authex) {
                    String errorMessage = "خطا در فراخوانی وب سرویس  authenticationWebService ";
                    logger.error(errorMessage + authex.toString());
                    logService.save(errorMessage, null, system, "", LogService.MIN_PRIORITY);
                }

                if (authenticationResult) {

                    requestTransfer.setShenaseNo(payRecord.getShenasepayment());
                    requestTransfer.setDestinationFName(payRecord.getDestinationFName());
                    requestTransfer.setDestinationLName(payRecord.getDestinationLName());
                    requestTransfer.setDestinationFatherName(payRecord.getDestinationFatherName());
                    requestTransfer.setDestinationIDNO(payRecord.getDestinationIDNo());
                    requestTransfer.setDestinationNationCode(payRecord.getDestinationNationCode());
                    requestTransfer.setCustNo(payRecord.getCustNo());
                    requestTransfer.setCustType(payRecord.getCustType().toString());
                    //*------------------------------------------*
                    requestTransfer.setAmount(new BigDecimal(payRecord.getAlalamount()));
                    requestTransfer.setDestinationAccNo(payRecord.getDestinationAccNo());
                    //*------------------------------------------*
                    Date today = new Date();
                    String todayJalali = DateUtils.getJalaliStandard(today, "");
                    Calendar calendar = Calendar.getInstance();
                    calendar.setTime(today);
                    calendar.add(Calendar.DATE, 1);
                    Date tomorrow = calendar.getTime();
                    String tomorrowJalali = DateUtils.getJalaliStandard(tomorrow, "");
                    //*------------------------------------------*
                    requestTransfer.setPayDateStart(todayJalali);
                    //  برای اینکه بانک وقتی به دلیل عدم موجودی رکوردهارو روز بعد مجدد پرداخت نکند
                    // تاریخ پایان هم مساوی با تاریخ امروز قرار گرفت
                    //requestTransfer.setPayDateEnd(todayJalali);
                    //دوباره به حالت قبل برگشت
                    requestTransfer.setPayDateEnd(tomorrowJalali);
                    //
                    requestTransfer.setDestinationMobileNo(payRecord.getDestinationMobileNo());
                    requestTransfer.setLoginType("3");
                    //*------------------------------------------*
                    requestTransfer.setNosMonth(payRecord.getNosMonth());
                    requestTransfer.setNosYear(payRecord.getNosYear());
//                    requestTransfer.setVahedCode(payRecord.getShenasepayment().substring(0, 4));
                    requestTransfer.setVahedCode(payRecord.getUnitCode());
                    requestTransfer.setValidationCode(stringHolders.value);
                    requestTransfer.setEffectiveDate(payRecord.getEffectivedate());

                    ResultTransfer recordPayedResult = null;
                    try {
                        recordPayedResult = bRefahWebService.getBRefahWebServiceSoap().shenasedarPaymentTransfer(requestTransfer);
//                        recordPayedResult = new ResultTransfer();
//                        recordPayedResult.setErrorCode(Short.valueOf("0"));
                        //
                    } catch (Exception ex) {
                        String errorMessage = "خطا در فراخوانی وب سرویس  bRefahWebService ";
                        logger.error(errorMessage + ex.toString());
                        logService.save(errorMessage, null, system, "", LogService.MIN_PRIORITY);
//                        continue; ????
                    }

                    if (recordPayedResult.getErrorCode() == 0) { // send to bank successfully
                        //       1 - insert (or update) rec in my table with status = 1 (successfull)
                        GlIndividualPay individualPay = individualPayService.findByShenasePayment(payRecord.getShenasepayment());

                        if (individualPay == null) {
                            individualPayService.insertIntoIndividualPay(payRecord, PayStatusEnum.SEND_SUCCESSFULLY.getCode(), IndividualPayTypeEnum.AUTOMATIC.getCode(), "", "");
                        } else { // it is inserted already
                            individualPayService.updateStatus(individualPay.getPayId(), PayStatusEnum.SEND_SUCCESSFULLY.getCode(), false, IndividualPayTypeEnum.AUTOMATIC.getCode(), "", "", "");
                        }
                        successRecordsCount += 1;
                    } else {
                        //      1 - insert (or update) rec in my table with status = 2 (send failed)
                        GlIndividualPay individualPay = individualPayService.findByShenasePayment(payRecord.getShenasepayment());
                        if (individualPay == null) {
                            individualPayService.insertIntoIndividualPay(payRecord, PayStatusEnum.SEND_FAILED.getCode(), IndividualPayTypeEnum.AUTOMATIC.getCode(), recordPayedResult.getBankErrorCode(), recordPayedResult.getBankErrorMessage());
                        } else {
                            individualPayService.updateStatus(individualPay.getPayId(), PayStatusEnum.SEND_FAILED.getCode(), false, IndividualPayTypeEnum.AUTOMATIC.getCode(), "", recordPayedResult.getBankErrorCode(), recordPayedResult.getBankErrorMessage());
                        }

                        logDetail = new LogDetail();
                        logDetail.setErrorCode(recordPayedResult.getErrorCode() + "-" + recordPayedResult.getBankErrorCode());
                        logDetail.setErrorMessage(recordPayedResult.getErrorMessage() + "-" + recordPayedResult.getBankErrorMessage());
                        logDetail.setShenasePayment(payRecord.getShenasepayment());
                        logDetails.add(logDetail);
                    }

                } else {
                    logService.save("نتیجه اعتبار سنجی  بانک رفاه صحیح نمیباشد.authenticationResult is false ", null, system, "", LogService.MIN_PRIORITY);
                }

            } //for loop
            logService.save("تعداد " + successRecordsCount + " از " + totalRecordsCount + " رکورد با موفقیت به بانک ارسال شدند.", logDetails, system, "", LogService.MIN_PRIORITY);

//            } else {
//                logService.save("نتیجه اعتبار سنجی  بانک رفاه صحیح نمیباشد.authenticationResult is false ", null, system);
//            }
        } else {
            logService.save("رکوردی برای پرداخت وجود ندارد!!", null, system, "", LogService.MIN_PRIORITY);
        }

    }

    public String manuallySendToRefah(List<VWPaymentTransferSum> unsentList, List<GlIndividualPay> reSendList, String status, String userName) {
        try {

            if (OnlinePayReportEnum.ERSAL_NASHODE.getCode().equals(status)
                    || OnlinePayReportEnum.KHATA_ERSAL.getCode().equals(status)
                    || OnlinePayReportEnum.KHATA_PARDAKHT.getCode().equals(status)) {

                if (OnlinePayReportEnum.ERSAL_NASHODE.getCode().equals(status)) { // get from VWPaymentTransferSum                       

                    if (unsentList != null && !unsentList.isEmpty()) {
                        return sendManuallyUnsentToRefahBank(unsentList);
                    } else {
                        Response response = Response.status(Response.Status.BAD_REQUEST).entity("رکوردی برای ارسال وجود ندارد!!").build();
                        throw new WebApplicationException(response);
                    }

                } else {// get from gl_individual_pay

                    if (reSendList != null && !reSendList.isEmpty()) {
                        return resendManuallyToRefahBank(reSendList, status, userName);
                    } else {
                        Response response = Response.status(Response.Status.BAD_REQUEST).entity("رکوردی برای ارسال وجود ندارد!!").build();
                        throw new WebApplicationException(response);
                    }

                }
            } else {
                Response response = Response.status(Response.Status.BAD_REQUEST).entity("امکان ارسال به بانک برای وضعیت   " + OnlinePayReportEnum.getNameOf(status) + "  وجود ندارد.").build();
                throw new WebApplicationException(response);
            }

        } catch (WebApplicationException wx) {
            logger.error("خطا در ارسال دستی اطلاعات به بانک", wx);
            throw wx;
        } catch (Exception e) {
            String message = "متاسفانه در حین عملیات خطای غیرمنتظره ای رخ داده.لطفا مجددا اقدام نمایید و یا به مدیر سیستم اطلاع دهید.";
            logger.error(message, e);
            Response response = Response.status(Response.Status.INTERNAL_SERVER_ERROR).entity(message).build();
            throw new WebApplicationException(response);
        }
    }

    private String sendManuallyUnsentToRefahBank(List<VWPaymentTransferSum> list) {
        Holder<String> stringHolders = new Holder<>();
        Holder<Boolean> booleanHolders = new Holder<>();
        boolean exceptionInRefahWebService = false;

        GlSystemType system = new GlSystemType(Integer.valueOf(webBundle.getProperty("system.asnad.id")));

        int totalRecordsCount = list.size();
        int successRecordsCount = 0;
        boolean authenticationResult = true;

        List<LogDetail> logDetails = new ArrayList<>();
        LogDetail logDetail;
        RequestTransfer requestTransfer;
        for (VWPaymentTransferSum payRecord : list) {
            requestTransfer = new RequestTransfer();

            if (payRecord.getSumId() == null
                    || payRecord.getDestinationFName() == null || payRecord.getDestinationFName().isEmpty()
                    || payRecord.getDestinationLName() == null || payRecord.getDestinationLName().isEmpty()
                    || payRecord.getDestinationNationCode() == null || payRecord.getDestinationNationCode().isEmpty()
                    || payRecord.getDestinationIDNo() == null || payRecord.getDestinationIDNo().isEmpty()
                    || payRecord.getShenasepayment() == null || payRecord.getShenasepayment().isEmpty()
                    || payRecord.getAlalamount() == null || payRecord.getAlalamount() == BigInteger.ZERO
                    || payRecord.getDestinationAccNo() == null || payRecord.getDestinationAccNo().isEmpty()
                    || payRecord.getEffectivedate() == null || payRecord.getEffectivedate().isEmpty()
                    || payRecord.getUnitCode() == null || payRecord.getUnitCode().isEmpty()
                    || payRecord.getNosMonth() == null || payRecord.getNosYear().isEmpty()
                    || payRecord.getCustNo() == null || payRecord.getCustNo().isEmpty()) {
                logService.save("عدم ارسال رکورد با شناسه " + payRecord.getShenasepayment() + "به دلیل مقادیر خالی یا صفر.", null, system, "", LogService.MIN_PRIORITY);
                continue;
            }
//            // if are for yesterday
            Date today = new Date();
            Calendar calendar = Calendar.getInstance();
            calendar.setTime(today);
//            calendar.add(Calendar.DATE, -1);
//            Date yesterday = calendar.getTime();
//            String yesterdayJalali = DateUtils.getJalaliStandard(yesterday, "");
            //if (yesterdayJalali.equals(payRecord.getEffectivedate())) {//if are for yesterday
            // فعلا برای ارسال دستی شرط دیروز بودن را برداشتم
            try {
                authenticationWebService.getAuthenticationWebServiceSoap().getValidationCode("Tamin", "Sog@nd123456PariBiia", payRecord.getUnitCode(), "1", stringHolders, booleanHolders);
                authenticationResult = authenticationWebService.getAuthenticationWebServiceSoap().checkValidationCode(payRecord.getUnitCode(), stringHolders.value, "1");
            } catch (Exception authex) {
                String errorMessage = "خطا در فراخوانی وب سرویس دریافت کد اعتبار بانک رفاه.لطفا مجددا اقدام نمایید و یا به مدیر سیستم اطلاع دهید.";
                logger.error(errorMessage + authex.toString());
                Response response = Response.status(Response.Status.BAD_REQUEST).entity(errorMessage).build();
                throw new WebApplicationException(response);
            }
            if (authenticationResult) {

                requestTransfer.setShenaseNo(payRecord.getShenasepayment());
                requestTransfer.setDestinationFName(payRecord.getDestinationFName());
                requestTransfer.setDestinationLName(payRecord.getDestinationLName());
                requestTransfer.setDestinationFatherName(payRecord.getDestinationFatherName());
                requestTransfer.setDestinationIDNO(payRecord.getDestinationIDNo());
                requestTransfer.setDestinationNationCode(payRecord.getDestinationNationCode());
                requestTransfer.setCustNo(payRecord.getCustNo());
                requestTransfer.setCustType(payRecord.getCustType().toString());
                //*------------------------------------------*
                requestTransfer.setAmount(new BigDecimal(payRecord.getAlalamount()));
                requestTransfer.setDestinationAccNo(payRecord.getDestinationAccNo());
                //*------------------------------------------*
                String todayJalali = DateUtils.getJalaliStandard(today, "");
                calendar.setTime(today);
                calendar.add(Calendar.DATE, 1);
                Date tomorrow = calendar.getTime();
                String tomorrowJalali = DateUtils.getJalaliStandard(tomorrow, "");
                //*------------------------------------------*
                requestTransfer.setPayDateStart(todayJalali);
                //  برای اینکه بانک وقتی به دلیل عدم موجودی رکوردهارو روز بعد مجدد پرداخت نکند
                // تاریخ پایان هم مساوی با تاریخ امروز قرار گرفت
//                requestTransfer.setPayDateEnd(todayJalali);
                //دوباره به حالت قبل برگشت
                requestTransfer.setPayDateEnd(tomorrowJalali);
                //
                requestTransfer.setDestinationMobileNo(payRecord.getDestinationMobileNo());
                requestTransfer.setLoginType("3");
                //*------------------------------------------*
                requestTransfer.setNosMonth(payRecord.getNosMonth());
                requestTransfer.setNosYear(payRecord.getNosYear());
                requestTransfer.setVahedCode(payRecord.getUnitCode());
                requestTransfer.setValidationCode(stringHolders.value);
                requestTransfer.setEffectiveDate(payRecord.getEffectivedate());

                ResultTransfer recordPayedResult = null;
                try {
                    recordPayedResult = bRefahWebService.getBRefahWebServiceSoap().shenasedarPaymentTransfer(requestTransfer);
//                    recordPayedResult = new ResultTransfer();
//                    recordPayedResult.setErrorCode(Short.valueOf("0"));
                } catch (Exception ex) {
                    String errorMessage = "خطا در فراخوانی وب سرویس بانک رفاه.لطفا مجددا اقدام نمایید و یا به مدیر سیستم اطلاع دهید. ";
                    logger.error(errorMessage + ex.toString());
                    exceptionInRefahWebService = true;
                }

                if (recordPayedResult.getErrorCode() == 0) { // send to bank successfully
                    // insert rec in gl_individual_pay with status = 1 (successfull)                                
                    individualPayService.insertIntoIndividualPay(payRecord, PayStatusEnum.SEND_SUCCESSFULLY.getCode(), IndividualPayTypeEnum.MANUALLY.getCode(), "", "");
                    successRecordsCount += 1;
                } else {
                    // insert rec in gl_individual_pay with status = 2 (send failed)
                    individualPayService.insertIntoIndividualPay(payRecord, PayStatusEnum.SEND_FAILED.getCode(), IndividualPayTypeEnum.MANUALLY.getCode(), recordPayedResult.getBankErrorCode(), recordPayedResult.getBankErrorMessage());

                    logDetail = new LogDetail();
                    logDetail.setErrorCode(recordPayedResult.getErrorCode() + "-" + recordPayedResult.getBankErrorCode());
                    logDetail.setErrorMessage(recordPayedResult.getErrorMessage() + "-" + recordPayedResult.getBankErrorMessage());
                    logDetail.setShenasePayment(payRecord.getShenasepayment());
                    logDetails.add(logDetail);
                }

            } else {
                String errorMessage = "نتیجه اعتبار سنجی  بانک رفاه صحیح نمیباشد.لطفا مجددا اقدام نمایید و یا به مدیر سیستم اطلاع دهید.";
                logService.save(errorMessage, null, system, "", LogService.MIN_PRIORITY);
                Response response = Response.status(Response.Status.INTERNAL_SERVER_ERROR).entity(errorMessage).build();
                throw new WebApplicationException(response);
            }
//            } else {// is not for yesterday
//                logService.save("عدم ارسال رکورد با شناسه " + payRecord.getShenasepayment() + "به دلیل تاریخ عملکرد نامعتبر.", null, system);
//            }
        } // for loop

        StringBuilder stringBuilder = new StringBuilder("تعداد " + successRecordsCount + " از " + totalRecordsCount + " رکورد با موفقیت به بانک ارسال شدند.");
        if (exceptionInRefahWebService) {
            logService.save("عملیات ارسال به دلیل خطا در فراخوانی وب سرویس بانک رفاه متوقف شد" + stringBuilder.toString(), logDetails, system, "", LogService.MIN_PRIORITY);
            stringBuilder.append("شما میتوانید جزئیات ارسال را از منوی مدیریت سیستم ، نمایش شرح وقایع مشاهده نمایید.");
            Response response = Response.status(Response.Status.INTERNAL_SERVER_ERROR).entity("عملیات ارسال به دلیل خطا در فراخوانی وب سرویس بانک رفاه متوقف شد" + stringBuilder.toString()).build();
            throw new WebApplicationException(response);
        } else {
            logService.save(stringBuilder.toString(), logDetails, system, "", LogService.MIN_PRIORITY);
            //stringBuilder.append("شما میتوانید جزئیات ارسال را از منوی مدیریت سیستم ، نمایش شرح وقایع مشاهده نمایید.");
            return stringBuilder.toString();
        }

//        } else {
//            String errorMessage = "نتیجه اعتبار سنجی  بانک رفاه صحیح نمیباشد.لطفا مجددا اقدام نمایید و یا به مدیر سیستم اطلاع دهید.";
//            logService.save(errorMessage, null, system);
//            Response response = Response.status(Response.Status.INTERNAL_SERVER_ERROR).entity(errorMessage).build();
//            throw new WebApplicationException(response);
//        }
    }

    private String resendManuallyToRefahBank(List<GlIndividualPay> list, String status, String userName) {
        Holder<String> stringHolders = new Holder<>();
        Holder<Boolean> booleanHolders = new Holder<>();
        boolean exceptionInRefahWebService = false;

        GlSystemType system = new GlSystemType(Integer.valueOf(webBundle.getProperty("system.asnad.id")));

        int totalRecordsCount = list.size();
        int successRecordsCount = 0;
        boolean authenticationResult = true;

        List<LogDetail> logDetails = new ArrayList<>();
        LogDetail logDetail;
        RequestTransfer requestTransfer;
        for (GlIndividualPay payRecord : list) {

//            // TODO : if are  for yesterday    
//            // if are for yesterday
            Date today = new Date();
            Calendar calendar = Calendar.getInstance();
            calendar.setTime(today);
//            calendar.add(Calendar.DATE, -1);
//            Date yesterday = calendar.getTime();
//            String yesterdayJalali = DateUtils.getJalaliStandard(yesterday, "");
//
//            if (yesterdayJalali.equals(payRecord.getEffectivedate())) {//if are for yesterday
            //  if   status=khata dar ersal OR ( status=khata dar pardakht : if are adame mojudi)
            if (OnlinePayReportEnum.KHATA_ERSAL.getCode().equals(status)
                    || (OnlinePayReportEnum.KHATA_PARDAKHT.getCode().equals(status) && BankErrorCode.ADAME_MOJUDI_ERROR_CODE.equals(payRecord.getErrorcode()))) { //if  status=khata_dar_pardakht : if are adame mojudi         

                try {
                    authenticationWebService.getAuthenticationWebServiceSoap().getValidationCode("Tamin", "Sog@nd123456PariBiia", payRecord.getUnitCode(), "1", stringHolders, booleanHolders);
                    authenticationResult = authenticationWebService.getAuthenticationWebServiceSoap().checkValidationCode(payRecord.getUnitCode(), stringHolders.value, "1");
                } catch (Exception authex) {
                    String errorMessage = "خطا در فراخوانی وب سرویس دریافت کد اعتبار بانک رفاه.لطفا مجددا اقدام نمایید و یا به مدیر سیستم اطلاع دهید.";
                    logger.error(errorMessage + authex.toString());
                    Response response = Response.status(Response.Status.BAD_REQUEST).entity(errorMessage).build();
                    throw new WebApplicationException(response);
                }
                if (authenticationResult) {

                    requestTransfer = new RequestTransfer();

                    requestTransfer.setShenaseNo(payRecord.getShenasepayment());
                    requestTransfer.setDestinationFName(payRecord.getFirstName());
                    requestTransfer.setDestinationLName(payRecord.getLastName());
                    requestTransfer.setDestinationFatherName(payRecord.getFatherName());
                    requestTransfer.setDestinationIDNO(payRecord.getIdNO());
                    requestTransfer.setDestinationNationCode(payRecord.getNatcode());
                    requestTransfer.setCustNo(payRecord.getAccountSideNo());
                    requestTransfer.setCustType(AccountSideTypeEnum.Doctors.getCode());
                    //*------------------------------------------*
                    requestTransfer.setAmount(new BigDecimal(payRecord.getPayAmount()));
                    requestTransfer.setDestinationAccNo(payRecord.getDestinationaccno());
                    requestTransfer.setPayDateStart(DateUtils.getJalaliStandard(new Date(), ""));
                    //*------------------------------------------*
                    String todayJalali = DateUtils.getJalaliStandard(today, "");
                    calendar.setTime(today);
                    calendar.add(Calendar.DATE, 1);
                    Date tomorrow = calendar.getTime();
                    String tomorrowJalali = DateUtils.getJalaliStandard(tomorrow, "");
                    //*------------------------------------------*
                    requestTransfer.setPayDateStart(todayJalali);
                    //  برای اینکه بانک وقتی به دلیل عدم موجودی رکوردهارو روز بعد مجدد پرداخت نکند
                    // تاریخ پایان هم مساوی با تاریخ امروز قرار گرفت
//                    requestTransfer.setPayDateEnd(todayJalali);
                    //دوباره به حالت قبل برگشت
                    requestTransfer.setPayDateEnd(tomorrowJalali);
                    //
                    requestTransfer.setDestinationMobileNo(payRecord.getMobile());
                    requestTransfer.setLoginType("3");
                    //*------------------------------------------*
//                String nosYear = todayJalali.substring(2, 4);
//                String nosMonth = todayJalali.substring(4, 6);
                    String nosYear = payRecord.getEffectivedate().substring(2, 4);
                    String nosMonth = payRecord.getEffectivedate().substring(4, 6);
                    requestTransfer.setNosMonth(nosMonth);
                    requestTransfer.setNosYear(nosYear);
                    //*------------------------------------------*              
                    requestTransfer.setVahedCode(payRecord.getUnitCode());
                    requestTransfer.setValidationCode(stringHolders.value);
                    requestTransfer.setEffectiveDate(payRecord.getEffectivedate());

                    ResultTransfer recordPayedResult = null;
                    try {
                        recordPayedResult = bRefahWebService.getBRefahWebServiceSoap().shenasedarPaymentTransfer(requestTransfer);
//                        recordPayedResult = new ResultTransfer();
//                        recordPayedResult.setErrorCode(Short.valueOf("0"));
                    } catch (Exception ex) {
                        String errorMessage = "خطا در فراخوانی وب سرویس بانک رفاه.لطفا مجددا اقدام نمایید و یا به مدیر سیستم اطلاع دهید. ";
                        logger.error(errorMessage + ex.toString());
                        exceptionInRefahWebService = true;
                        break;
                    }

                    if (OnlinePayReportEnum.KHATA_ERSAL.getCode().equals(status)) {
                        if (recordPayedResult.getErrorCode() == 0) { // send to bank successfully
                            //update rec in gl_individual_pay with status = 1 (successfull)                              
                            individualPayService.updateStatus(payRecord.getPayId(), PayStatusEnum.SEND_SUCCESSFULLY.getCode(), false, IndividualPayTypeEnum.MANUALLY.getCode(), userName, "", "");
                            successRecordsCount += 1;
                        } else {
                            //No update required because the status is already 2(SEND-FAILED)
                            individualPayService.updateStatus(payRecord.getPayId(), PayStatusEnum.SEND_FAILED.getCode(), true, IndividualPayTypeEnum.MANUALLY.getCode(), userName, recordPayedResult.getBankErrorCode(), recordPayedResult.getBankErrorCode());
                            logDetail = new LogDetail();
                            logDetail.setErrorCode(recordPayedResult.getErrorCode() + "-" + recordPayedResult.getBankErrorCode());
                            logDetail.setErrorMessage(recordPayedResult.getErrorMessage() + "-" + recordPayedResult.getBankErrorMessage());
                            logDetail.setShenasePayment(payRecord.getShenasepayment());
                            logDetails.add(logDetail);
                        }
                    } else if (OnlinePayReportEnum.KHATA_PARDAKHT.getCode().equals(status)) {
                        if (recordPayedResult.getErrorCode() == 0) { // send to bank successfully
                            // update rec in gl_individual_pay with status = 1 and errorCode and errorMessage should be null 
                            individualPayService.updateStatus(payRecord.getPayId(), PayStatusEnum.SEND_SUCCESSFULLY.getCode(), true, IndividualPayTypeEnum.MANUALLY.getCode(), userName, "", "");
                            successRecordsCount += 1;
                        } else {
                            // update rec in gl_individual_pay with status = 2 and errorCode and errorMessage should be null 
                            individualPayService.updateStatus(payRecord.getPayId(), PayStatusEnum.SEND_FAILED.getCode(), true, IndividualPayTypeEnum.MANUALLY.getCode(), userName, recordPayedResult.getBankErrorCode(), recordPayedResult.getBankErrorMessage());
                            logDetail = new LogDetail();
                            logDetail.setErrorCode(recordPayedResult.getErrorCode() + "-" + recordPayedResult.getBankErrorCode());
                            logDetail.setErrorMessage(recordPayedResult.getErrorMessage() + "-" + recordPayedResult.getBankErrorMessage());
                            logDetail.setShenasePayment(payRecord.getShenasepayment());
                            logDetails.add(logDetail);
                        }
                    }

                } else {
                    String errorMessage = "نتیجه اعتبار سنجی  بانک رفاه صحیح نمیباشد.لطفا مجددا اقدام نمایید و یا به مدیر سیستم اطلاع دهید.";
                    logService.save(errorMessage, null, system, "", LogService.MIN_PRIORITY);
                    Response response = Response.status(Response.Status.INTERNAL_SERVER_ERROR).entity(errorMessage).build();
                    throw new WebApplicationException(response);
                }
            } else {// if  status != khata_dar_pardakht or is not for adame mojudi
                logService.save("عدم ارسال رکورد با شناسه " + payRecord.getShenasepayment() + "به دلیل وضعیت یا کد خطای نامعتبر.", null, system, "", LogService.MIN_PRIORITY);
            } // if  status=khata_dar_pardakht : if are adame mojudi         
//            } else {// is not for yesterday
//                logService.save("عدم ارسال رکورد با شناسه " + payRecord.getShenasepayment() + "به دلیل تاریخ عملکرد نامعتبر.", null, system);
//            }
        }// for loop
        StringBuilder stringBuilder = new StringBuilder("تعداد " + successRecordsCount + " از " + totalRecordsCount + " رکورد با موفقیت به بانک ارسال شدند.");
        if (exceptionInRefahWebService) {
            logService.save("عملیات ارسال به دلیل خطا در فراخوانی وب سرویس بانک رفاه متوقف شد" + stringBuilder.toString(), logDetails, system, "", LogService.MIN_PRIORITY);
            stringBuilder.append("شما میتوانید جزئیات ارسال را از منوی مدیریت سیستم ، نمایش شرح وقایع مشاهده نمایید.");
            Response response = Response.status(Response.Status.INTERNAL_SERVER_ERROR).entity("عملیات ارسال به دلیل خطا در فراخوانی وب سرویس بانک رفاه متوقف شد" + stringBuilder.toString()).build();
            throw new WebApplicationException(response);
        } else {
            logService.save(stringBuilder.toString(), logDetails, system, "", LogService.MIN_PRIORITY);
            //stringBuilder.append("شما میتوانید جزئیات ارسال را از منوی مدیریت سیستم ، نمایش شرح وقایع مشاهده نمایید.");
            return stringBuilder.toString();
        }

    }

}
