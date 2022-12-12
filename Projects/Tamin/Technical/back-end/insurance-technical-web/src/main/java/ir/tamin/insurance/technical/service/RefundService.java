package ir.tamin.insurance.technical.service;

import ir.tamin.framework.cdi.util.MessageBundle;
import ir.tamin.framework.core.persistence.ProcedureManager;
import ir.tamin.framework.core.util.Bundle;
import ir.tamin.framework.domain.proxy.ProxyProcessingException;
import ir.tamin.framework.ws.rest.proxy.DBFunctionProxy;
import ir.tamin.framework.ws.rest.security.TokenContext;
import ir.tamin.insurance.technical.business.general.RestServices;
import ir.tamin.insurance.technical.business.user.UserManager;
import ir.tamin.insurance.technical.function.refund.*;
import ir.tamin.insurance.technical.model.refund.*;
import ir.tamin.insurance.technical.util.DateUtils;

import javax.ejb.Stateless;
import javax.inject.Inject;
import javax.inject.Named;
import javax.persistence.EntityManager;
import javax.ws.rs.WebApplicationException;
import java.math.BigDecimal;
import java.sql.SQLException;
import java.sql.Timestamp;
import java.text.DecimalFormat;
import java.text.DecimalFormatSymbols;
import java.text.NumberFormat;
import java.util.*;

//import ir.tamin.framework.core.util.DateUtils;

/**
 * @author m_hoseini
 */
@Stateless
public class RefundService {

    @Inject
    private EntityManager entityManager;

    @Inject
    private UserManager userManager;

    @Inject
    @Named("DefaultDBFunctionProxy")
    protected DBFunctionProxy dBFunctionProxy;

    @Inject
    @Named("ProcedureManager")
    private ProcedureManager procedure;

    @Inject
    private TokenContext tokenContext;

    @Inject
    RestServices restServices;

    @Inject
    RegInsuranceSpecService regInsuranceSpecService;

    @Inject
    @MessageBundle
    @Named("WebMessages")
    Bundle bundle;

    private void validateDuplicateDurations(String resnum,
                                            Date isuRefundStartDate,
                                            Date isuRefundEndDate,
                                            Date darmanRefundStartDate,
                                            Date darmanRefundEndDate) throws ProxyProcessingException {
        dBFunctionProxy.setProcedureManager(procedure);
        List<RefundDurationValue> refundDurationValues = (List<RefundDurationValue>) dBFunctionProxy.execute(new RefundDuration(),
                new RefundDurationInput(resnum));
        for (RefundDurationValue item : refundDurationValues) {
            Date gregorianSDate = resetHourMinDay(DateUtils.convertPersianDateStringToDate(item.getStartDate()));
            Date gregorianEDate = resetHourMinDay(DateUtils.convertPersianDateStringToDate(item.getEndDate()));
            if (item.getDebitTypeCode() != null && item.getDebitTypeCode().equals("020")) { // حق بیمه
                if (isuRefundStartDate != null && isuRefundEndDate != null
                        && (gregorianSDate.compareTo(isuRefundStartDate) == 0 || gregorianEDate.compareTo(isuRefundEndDate) == 0
                        || (gregorianSDate.before(isuRefundStartDate) && gregorianEDate.after(isuRefundEndDate)))) {
                    throw new ProxyProcessingException(bundle.getProperty("insurance.technical.refund.DateDuplication"), new String[0]);
                }
            } else {
                if (darmanRefundStartDate != null && darmanRefundEndDate != null
                        && (gregorianSDate.compareTo(darmanRefundStartDate) == 0 || gregorianEDate.compareTo(darmanRefundEndDate) == 0
                        || (gregorianSDate.before(darmanRefundStartDate) && gregorianEDate.after(darmanRefundEndDate)))) {
                    throw new ProxyProcessingException(bundle.getProperty("insurance.technical.refund.DateDuplication"), new String[0]);
                }
            }
        }
    }

    public Map getRefundCalculateService(String isuRefund, String darmanRefund, String resNumber,
                                         String isuRefundStartDate, String isuRefundEndDate, String darmanRefundStartDate, String darmanRefundEndDate,
                                         String selfIsuType, String spcRate, String reasonCode,
                                         boolean editMode) throws ProxyProcessingException {

        RefundIsuCalcValue refundIsuCalcValue = null;
        RefundDarmanCalcValue refundDarmanCalcValue = null;
        ContractDebit contractDebit = null;
        BigDecimal total = null;
        int isuWorkDays = 0;
        int darmanWorkDays = 0;

        Date isuRefundStartDateTmp = resetHourMinDay(DateUtils.convertTimestampStringToDate(isuRefundStartDate));
        Date isuRefundEndDateTmp = resetHourMinDay(DateUtils.convertTimestampStringToDate(isuRefundEndDate));
        Date darmanRefundStartDateTmp = resetHourMinDay(DateUtils.convertTimestampStringToDate(darmanRefundStartDate));
        Date darmanRefundEndDateTmp = resetHourMinDay(DateUtils.convertTimestampStringToDate(darmanRefundEndDate));

        if (!editMode) {
            validateDuplicateDurations(resNumber, isuRefundStartDateTmp, isuRefundEndDateTmp, darmanRefundStartDateTmp,
                    darmanRefundEndDateTmp);
        }

        contractDebit = (ContractDebit) entityManager.createNamedQuery("ContractDebit.findByResnum")
                .setParameter("resNumber", resNumber)
                .getSingleResult();

        Date payStartDateOrg = resetHourMinDay(DateUtils.convertPersianDateStringToDate(contractDebit.getPayStartDate()));
        Date payEndOrg = resetHourMinDay(DateUtils.convertPersianDateStringToDate(contractDebit.getPayEndDate()));

        if (isuRefund.equalsIgnoreCase("1")) {
            try {
                validateIsuPaymentDuration(
                        payStartDateOrg,
                        payEndOrg,
                        isuRefundStartDateTmp,
                        isuRefundEndDateTmp);
            } catch (Exception e) {
                System.err.println("REFUND-DEBUG: RefundService.validateIsuPaymentDuration." + e.getStackTrace()[0]);
                throw e;
            }
        }

        try {
            if (darmanRefund.equalsIgnoreCase("1")) {
                validateDarmanPaymentDuration(
                        payStartDateOrg,
                        payEndOrg,
                        darmanRefundStartDateTmp,
                        darmanRefundEndDateTmp,
                        reasonCode);
            }
        } catch (Exception e) {
            System.err.println("REFUND-DEBUG: RefundService.validateIsuPaymentDuration." + e.getStackTrace()[0]);
            throw e;
        }

        try {
            if (isuRefund.equalsIgnoreCase("1")) {
                refundIsuCalcValue = refundIsuCalc(
                        contractDebit.getDebitNumber(),
                        DateUtils.format(isuRefundStartDateTmp, "yyyyMMdd"),
                        DateUtils.format(isuRefundEndDateTmp, "yyyyMMdd"),
                        selfIsuType,
                        spcRate,
                        reasonCode);
                isuWorkDays = getDiffDate(isuRefundStartDate, isuRefundEndDate);
            }
            if (refundIsuCalcValue != null) {
                total = refundIsuCalcValue.getResult();
            }
            if (darmanRefund.equalsIgnoreCase("1")) {
                refundDarmanCalcValue = refundDarmanCalc(
                        contractDebit.getDebitNumber(),
                        DateUtils.format(darmanRefundStartDateTmp, "yyyyMMdd"),
                        DateUtils.format(darmanRefundEndDateTmp, "yyyyMMdd"),
                        selfIsuType,
                        spcRate,
                        reasonCode);
                darmanWorkDays = getDiffDate(darmanRefundStartDate, darmanRefundEndDate);
                if (total != null) {
                    total = total.add(refundDarmanCalcValue.getResult());
                } else {
                    total = refundDarmanCalcValue.getResult();
                }
            }

        } catch (Exception e) {
            System.err.println("REFUND-DEBUG: RefundService.validateDarmanPaymentDuration." + e.getStackTrace()[0]);
            throw new ProxyProcessingException(bundle.getProperty("insurance.technical.refund.CalcError"), new String[0]);
        }

        ArrayList<RefundCalculate> calculateList = new ArrayList<RefundCalculate>();
        RefundCalculate calculate = new RefundCalculate();

        if (isuRefund.equalsIgnoreCase("1")) {
            calculate.setPaymentIsu(refundIsuCalcValue.getResult());
            calculate.setWorkDaysIsu(isuWorkDays);
        } else {
            calculate.setPaymentIsu(new BigDecimal(0));
            calculate.setWorkDaysIsu(0);
        }

        if (darmanRefund.equalsIgnoreCase("1")) {
            calculate.setPaymentDarman(refundDarmanCalcValue.getResult());
            calculate.setWorkDaysDarman(refundDarmanCalcValue.getResult().equals(new BigDecimal(0)) ? 0 : darmanWorkDays);
        } else {
            calculate.setPaymentDarman(new BigDecimal(0));
            calculate.setWorkDaysDarman(0);
        }
        calculate.setPaymentTotal(total);
        calculateList.add(calculate);

        Map<String, Object> dataPage = new HashMap<>();
        dataPage.put("total", calculateList.size());
        dataPage.put("list", calculateList);

        return dataPage;
    }

    public void validateIsuPaymentDuration(
            Date payStartDateOrg,
            Date payEndOrg,
            Date isuRefundStartDateTmp,
            Date isuRefundEndDateTmp) throws ProxyProcessingException {

        if (isuRefundEndDateTmp.before(isuRefundStartDateTmp)) {
            throw new ProxyProcessingException(bundle.getProperty("insurance.technical.refund.PayDateInvalid"), new String[0]);
        }
        if ((isuRefundEndDateTmp.after(payEndOrg)
                || isuRefundStartDateTmp.before(payStartDateOrg))) {
            throw new ProxyProcessingException(bundle.getProperty("insurance.technical.refund.PayDateInvalid"), new String[0]);
        }
    }

    public void validateDarmanPaymentDuration(
            Date payStartDateOrg,
            Date payEndOrg,
            Date darmanRefundStartDateTmp,
            Date darmanRefundEndDateTmp,
            String reasonCode) throws ProxyProcessingException {

        Date currentDate = new Date();

        if (darmanRefundEndDateTmp.before(darmanRefundStartDateTmp)) {
            throw new ProxyProcessingException(bundle.getProperty("insurance.technical.refund.DarmanDateInvalid"), new String[0]);
        }
        if (darmanRefundEndDateTmp.after(payEndOrg)
                || darmanRefundStartDateTmp.before(payStartDateOrg)) {
            throw new ProxyProcessingException(bundle.getProperty("insurance.technical.refund.DarmanDateInvalid"), new String[0]);
        }

        if(reasonCode.equals("02")) {
            if (darmanRefundStartDateTmp.before(currentDate) || darmanRefundEndDateTmp.before(currentDate)) {
                throw new ProxyProcessingException(bundle.getProperty("insurance.technical.refund.DarmanDateInvalid"), new String[0]);
            }
            if ((currentDate.after(payStartDateOrg) && payStartDateOrg.before(payEndOrg))
                    && (darmanRefundStartDateTmp.before(currentDate)
                    || darmanRefundEndDateTmp.before(currentDate))) {
                throw new ProxyProcessingException(bundle.getProperty("insurance.technical.refund.DarmanDateInvalid"), new String[0]);
            }
        }
    }

    public RefundDarmanCalcValue refundDarmanCalc(String p_cws_dbtno, String p_ref_sdate, String p_ref_edate, String p_selftype, String p_spcrate, String p_reason_code) {
        dBFunctionProxy.setProcedureManager(procedure);
        try {
            RefundDarmanCalcValue refundDarmanCalcValue = (RefundDarmanCalcValue) dBFunctionProxy.execute(new RefundDarmanCalc(),
                    new RefundDarmanCalcInput(p_cws_dbtno, p_ref_sdate, p_ref_edate, p_selftype, p_spcrate, p_reason_code));
            return refundDarmanCalcValue;
        } catch (ProxyProcessingException e) {
            System.err.println("REFUND-DEBUG: RefundService.refundIsuCalc." + e.getStackTrace()[0]);
            e.printStackTrace();
            return null;
        }
    }

    public HashMap<String, Object> getRefundDetails(String resnum) {
        dBFunctionProxy.setProcedureManager(procedure);
        HashMap<String, Object> output = new HashMap<>();
        try {
            List<RefundDetailValue> refundDetailValues = (List<RefundDetailValue>) dBFunctionProxy.execute(new RefundDetail(),
                    new RefundDetailInput(resnum));
            output.put("total", refundDetailValues.size());
            output.put("list", refundDetailValues);
            return output;
        } catch (ProxyProcessingException e) {
            System.err.println("REFUND-DEBUG: RefundService.getRefundDetails." + e.getStackTrace()[0]);
            e.printStackTrace();
            return null;
        }
    }

    public HashMap<String, Object> getDebitDetails(String pcws_dbtno, String pnatcode, String psdate, String pedate) {
        dBFunctionProxy.setProcedureManager(procedure);
        HashMap<String, Object> output = new HashMap<>();
        try {
            List<RefundDebitDetailValue> refundDebitDetailValues = (List<RefundDebitDetailValue>) dBFunctionProxy.execute(new RefundDebitDetail(),
                    new RefundDebitDetailInput(pcws_dbtno, pnatcode, psdate, pedate));
            output.put("total", refundDebitDetailValues.size());
            output.put("list", refundDebitDetailValues);
            return output;
        } catch (ProxyProcessingException e) {
            System.err.println("REFUND-DEBUG: RefundService.getDebitDetails." + e.getStackTrace()[0]);
            e.printStackTrace();
            return null;
        }
    }

    public RefundIsuCalcValue refundIsuCalc(String p_cws_dbtno, String p_ref_sdate, String p_ref_edate, String p_selftype, String p_spcrate, String p_reason_code) {
        dBFunctionProxy.setProcedureManager(procedure);
        try {
            RefundIsuCalcValue refundIsuCalcValue = (RefundIsuCalcValue) dBFunctionProxy.execute(new RefundIsuCalc(),
                    new RefundIsuCalcInput(p_cws_dbtno, p_ref_sdate, p_ref_edate, p_selftype, p_spcrate, p_reason_code));
            return refundIsuCalcValue;
        } catch (ProxyProcessingException e) {
            System.err.println("REFUND-DEBUG: RefundService.refundIsuCalc." + e.getStackTrace()[0]);
            e.printStackTrace();
            return null;
        }
    }

    public int getDiffDate(String startDate, String endDate) throws WebApplicationException {

        String sDate = "";
        String eDate = "";
        if (startDate != null && endDate != null) {

            Date date1 = new Date(Long.valueOf(startDate));
            sDate = DateUtils.format(date1, "yyyy/MM/dd").replace("/", "");

            Date date2 = new Date(Long.valueOf(endDate));
            eDate = DateUtils.format(date2, "yyyy/MM/dd").replace("/", "");
        }

        try {
            BigDecimal result = null;

            result = (BigDecimal) entityManager.createNativeQuery("select general.dateutils.DAYSBETWEEN2DATES(?,?) from dual")
                    .setParameter(1, sDate)
                    .setParameter(2, eDate)
                    .getSingleResult();

            return result.intValue() + 1;
        } catch (Exception e) {
            System.err.println("REFUND-DEBUG: RefundService.getDiffDate." + e.getStackTrace()[0]);
            throw e;
        }
    }

    public Map<String, Object> getActiveSubdominanat(String nationalId) throws WebApplicationException, SQLException {

        List<String> subDominantList = restServices.getSubDominantActive(nationalId);
        RefundSubDominant selfDominant = new RefundSubDominant();
        selfDominant.setSubDomainantFullName("خودم");
        selfDominant.setSubDominantNationalId(nationalId);
        List<RefundSubDominant> refundSubDominantList = new ArrayList<RefundSubDominant>();
        refundSubDominantList.add(selfDominant);
        for (String str : subDominantList) {
            Map<String, Object> insuranceData = regInsuranceSpecService.getRegInsuranceSpecWithNationaCode(str);
            RefundSubDominant rsd = new RefundSubDominant();
            rsd.setSubDomainantFullName(insuranceData.get("firstName").toString() + " " + insuranceData.get("lastName").toString());
            rsd.setSubDominantNationalId(str);
            refundSubDominantList.add(rsd);
        }
        Map<String, Object> dataPage = new HashMap<>();

        dataPage.put("total", refundSubDominantList.size());
        dataPage.put("list", refundSubDominantList);

        return dataPage;
    }

    private String commaSeperatorNumbers(BigDecimal value) {

        DecimalFormat formatter = (DecimalFormat) NumberFormat.getInstance(Locale.US);
        DecimalFormatSymbols symbols = formatter.getDecimalFormatSymbols();

        symbols.setGroupingSeparator(',');
        formatter.setDecimalFormatSymbols(symbols);
        return formatter.format(value);
    }

    public void updateRefundInfo(String finanaceStatus, IncomingFinanceModel financeModel) throws ProxyProcessingException {

        Refund refundTmp = null;
        String requestSerial = financeModel.getPaymentId();
        if (requestSerial != null) {
            refundTmp = entityManager.find(Refund.class, requestSerial);
        }
        switch (finanaceStatus) {
            //ارسال به بانک
            case "01":
                //ارسال به مالی
                refundTmp.setStatus("8");
                break;
            //عدم ارسال به بانک
            case "02":
                //برگشت از مالی
                refundTmp.setStatus("7");
                break;
            //پرداخت موفق
            case "03":
                //پرداخت شده
                RefundModifyHistoryValue refundModifyHistoryValue = refundRefrencePayment(refundTmp.getRequestSerial(), refundTmp.getCategoryTypeCode());
                String result = refundModifyHistoryValue.getResult();
                if (result.endsWith("0")) {
                    throw new ProxyProcessingException(bundle.getProperty("insurance.technical.refund.ModifyHistoryInvalid"), new String[0]);
                }
                refundTmp.setStatus("6");
                break;
            //پرداخت ناموفق
            case "04":
                //برگشت از مالی
                refundTmp.setStatus("7");
                break;
            default:
                break;
        }

        try {
            SaveFinanceLog(refundTmp, financeModel);
            entityManager.merge(refundTmp);
            entityManager.flush();
        } catch (Exception e) {
            System.err.println("REFUND-DEBUG: RefundService.updateRefundInfo." + e.getStackTrace()[0]);
            throw new ProxyProcessingException(e);
        }
    }

    public RefundModifyHistoryValue refundRefrencePayment(String reqid, String categorytypecode) {

        dBFunctionProxy.setProcedureManager(procedure);
        try {
            RefundModifyHistoryValue refundModifyHistoryValue = (RefundModifyHistoryValue) dBFunctionProxy.execute(new RefundModifyHistory(),
                    new RefundModifyHistoryInput(reqid, categorytypecode));
            return refundModifyHistoryValue;
        } catch (ProxyProcessingException e) {
            System.err.println("REFUND-DEBUG: RefundService.refundRefrencePayment." + e.getStackTrace()[0]);
            e.printStackTrace();
            return null;
        }
    }

    public void SaveFinanceLog(Refund refund, IncomingFinanceModel financeModel) throws ProxyProcessingException {

        RefundFinanceLog financeLog = new RefundFinanceLog();

        financeLog.setOperationDate(financeModel.getChequeDate());
        financeLog.setChequeNumber(financeModel.getChequeNumber());
        financeLog.setPaymentId(financeModel.getPaymentId());
        financeLog.setStatus(financeModel.getStatus());
        financeLog.setStatusDesc(financeModel.getReasonDesc());
        financeLog.setRequestSerial(refund.getRequestSerial());
        financeLog.setLogDate(new Timestamp((new Date()).getTime()));

        try {
            entityManager.persist(financeLog);
        } catch (Exception e) {
            System.err.println("REFUND-DEBUG: RefundService.SaveFinanceLog." + e.getStackTrace()[0]);
            throw new ProxyProcessingException(e);
        }
    }

    private Date resetHourMinDay(Date orgDate) {

        Calendar date = Calendar.getInstance();
        date.setTime(orgDate);
        date.set(Calendar.HOUR_OF_DAY, 0);
        date.set(Calendar.MINUTE, 0);
        date.set(Calendar.SECOND, 0);

        return date.getTime();
    }
}
