/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package ir.tamin.incomeBank.service.centralPayment.bankfile.builder;

import ir.tamin.incomeBank.model.centralPayment.*;
import ir.tamin.incomeBank.model.centralPayment.enums.BankValidationResultEnum;
import ir.tamin.incomeBank.service.centralPayment.LogService;
import ir.tamin.incomeBank.service.jdbc.StoredProcedure;

import java.math.BigDecimal;
import java.sql.SQLException;
import java.util.Date;
import java.util.List;
import java.util.concurrent.Future;
import javax.ejb.AsyncResult;
import javax.ejb.Asynchronous;
import javax.ejb.Stateless;
import javax.inject.Inject;
import javax.persistence.EntityManager;

import org.slf4j.LoggerFactory;

/**
 * @author s_maknooni
 */
@Stateless
public class BankAccountControlService {

    @Inject
    private EntityManager entityManager;

    @Inject
    private StoredProcedure procedure;

    @Inject
    private LogService logService;

    private final static org.slf4j.Logger logger = LoggerFactory.getLogger(BankAccountControlService.class);

    @Deprecated
    public AddToControlListResultModel checkBeforAddToControlFile(BigDecimal payDetailId, BankAccountControl accountControl) {

        AddToControlListResultModel resultModel = new AddToControlListResultModel();

        if (accountControl.getNatcode() != null) {

            //1- Is there a national code in the table?
            BankAccountControl controlByNatCod = getByNatCode(accountControl.getNatcode());
            if (controlByNatCod != null) { //This national code has already been in the table
                //2- Is the account number the same?
                BankAccountControl controlByNatAndAccNo = getByNatCodeAndAccNo(accountControl.getNatcode(), accountControl.getAccountNo(), accountControl.getBankCode());
                if (controlByNatAndAccNo != null) { // This national code with this account number has already been sent to the bank for verifications
                    // 3- Has the previous verification been valid?
                    if (BankValidationResultEnum.VALID.getCode().equals(controlByNatAndAccNo.getValidationResult())) {
                        // previous verification result was valid so , No need to add control file
                        // a- set result
                        resultModel.setShouldBeAddToList(false);
                    } else { // previous verification result was not valid 
                        // 4 - Has the previous verification been invalid?
                        if (BankValidationResultEnum.INVALID.getCode().equals(controlByNatAndAccNo.getValidationResult())) {
                            // a- copy record to his
                            addToHis(controlByNatAndAccNo);
                            // b- update current record
                            updateCurrentRecord(controlByNatAndAccNo);
                            // c- set result to add to control list
                            resultModel.setShouldBeAddToList(true);
                            resultModel.setChangedAccountNo(false);
                        } else { // VALIDATION_RESULT is NULL
                            // a- set result to add to control list
                            resultModel.setShouldBeAddToList(true);
                            resultModel.setChangedAccountNo(false);
                        }
                    }

                } else { //This national code does not exist with this account number in the table. This means that the account number has changed
                    // a- insert to table without valid result            
                    save(accountControl);
                    // b- set result to add to control list
                    resultModel.setShouldBeAddToList(true);
                    resultModel.setChangedAccountNo(true);
                }

            } else { //This national code has not already been listed on the table
                // a- insert to table without valid result            
                save(accountControl);
                // b- set result to add to control list
                resultModel.setShouldBeAddToList(true);
                resultModel.setChangedAccountNo(false);
            }
        } else { // natcode is null
            resultModel.setShouldBeAddToList(true);
            resultModel.setChangedAccountNo(false);
        }
        return resultModel;
    }

    @Deprecated
    private BankAccountControl getByNatCode(String natCode) {
        List<BankAccountControl> bankControl = entityManager.createNamedQuery("BankAccountControl.getByNatCode", BankAccountControl.class)
                .setParameter("natcode", natCode)
                .getResultList();

        if (bankControl != null && bankControl.size() > 0) {
            return bankControl.get(0);
        } else {
            return null;
        }

    }

    @Deprecated
    public BankAccountControl getByNatCodeAndAccNo(String natCode, String accountNo, String bankCode) {
        List<BankAccountControl> bankControl = entityManager.createNamedQuery("BankAccountControl.getByNatcodeAcc", BankAccountControl.class)
                .setParameter("natcode", natCode)
                .setParameter("accountNo", accountNo)
                .setParameter("bankCode", bankCode)
                .getResultList();

        if (bankControl != null && bankControl.size() > 0) {
            return bankControl.get(0);
        } else {
            return null;
        }

    }

    @Deprecated
    private void save(BankAccountControl accountControl) {
        try {
            entityManager.persist(accountControl);
        } catch (Exception e) {
            logger.error("خطا در ثبت اطلاعات صحت سنجی حساب", e);
        }

    }

    @Deprecated
    public void addToHis(BankAccountControl bankAccountControl) {
        BankAccountControlHis his = new BankAccountControlHis();
        his.setMainAccountControl(bankAccountControl);
        his.setBankCode(bankAccountControl.getBankCode());
        his.setNatcode(bankAccountControl.getNatcode());
        his.setRisuid(bankAccountControl.getRisuid());
        his.setNationality(bankAccountControl.getNationality());
        his.setFirstName(bankAccountControl.getFirstName());
        his.setLastName(bankAccountControl.getLastName());
        his.setAccountNo(bankAccountControl.getAccountNo());
        his.setValidationResult(bankAccountControl.getValidationResult());
        his.setInvalidationReason(bankAccountControl.getInvalidationReason());
        his.setValidationDate(bankAccountControl.getValidationDate());
        his.setValidateBySubSystem(bankAccountControl.getValidateBySubSystem());
        his.setHisDate(new Date());

        entityManager.persist(his);
    }

    @Deprecated
    private void updateCurrentRecord(BankAccountControl bankAccountControl) {
        bankAccountControl.setRisuid(bankAccountControl.getRisuid());
        bankAccountControl.setNationality(bankAccountControl.getNationality());
        bankAccountControl.setFirstName(bankAccountControl.getFirstName());
        bankAccountControl.setLastName(bankAccountControl.getLastName());
        bankAccountControl.setValidateBySubSystem(bankAccountControl.getValidateBySubSystem());
        bankAccountControl.setValidationResult(null);
        bankAccountControl.setInvalidationReason(null);
        bankAccountControl.setValidationDate(null);

        entityManager.merge(bankAccountControl);
    }

    @Deprecated
    public void updateAccountValidationResultToValid(String natcode, String accountNo, String bankCode) {
        List<BankAccountControl> bankControl = entityManager.createNamedQuery("BankAccountControl.getByNatcodeAcc", BankAccountControl.class)
                .setParameter("natcode", natcode)
                .setParameter("accountNo", accountNo)
                .setParameter("bankCode", bankCode)
                .getResultList();

        if (bankControl != null && bankControl.size() > 0) {

            for (BankAccountControl rec : bankControl) {
                if (rec.getValidationResult() == null) {
                    rec.setValidationResult(BankValidationResultEnum.VALID.getCode());
                    rec.setValidationDate(new Date());
                    try {
                        entityManager.merge(rec);
                        entityManager.flush();
                    } catch (Exception ex) {
                        logger.error("خطا در ویرایش وضعیت اطلاعات حساب در جدول کنترل شماره حسابهای بانک!", ex);

                    }
                }
            }

        }
    }

    @Deprecated
    public void updateAccountValidationResultToINValid(BankAccountControl accountControl, String reasonCode, GlSubsystemType subSystem) {
        accountControl.setValidationResult(BankValidationResultEnum.INVALID.getCode());
        accountControl.setValidationDate(new Date());
        accountControl.setInvalidationReason(reasonCode);
        accountControl.setValidateBySubSystem(subSystem);
        try {
            entityManager.merge(accountControl);
            entityManager.flush();
        } catch (Exception ex) {
            logger.error("خطا در ویرایش وضعیت اطلاعات حساب در جدول کنترل شماره حسابهای بانک!", ex);
        }
    }

    @Asynchronous
    public Future<Void> updateAccountValidationResultToValid(BigDecimal payHeadId) {
        GlPayHead head = entityManager.find(GlPayHead.class, payHeadId);
        try {
            procedure.query("{ call PCK_CP_BNK_ACC_CONTROL_SERVICE.updateResultToValid(?)}");
            procedure.setInParameter(1, payHeadId);

            procedure.execute();
            String message = "رکوردهای لیست پرداخت بانک " + head.getBankName() + " سیستم " + head.getSystem().getSystemIdTitle() + " با شماره چک " + head.getCheckNo() + " با موفقیت در جدول کنترلی حسابهای بانک با نتیجه معتبر ویرایش شدند.";
            logService.save(message, null, new GlSystemType(head.getSystem().getSystemId()), "", "0");
            return new AsyncResult<>(null);

        } catch (SQLException ex) {
            String message = "خطا در ویرایش نتیجه صحت سنجی لیست پرداخت بانک " + head.getBankName() + " سیستم " + head.getSystem().getSystemIdTitle() + " با شماره چک " + head.getCheckNo() + " به حالت معتبر.";
            logService.save(message, null, new GlSystemType(head.getSystem().getSystemId()), "", "0");
            logger.error(message, ex);
            return null;
        }

    }

    @Asynchronous
    public void updateAccountValidationResultToInvalid(GlPayDetail detail,String reasonCode) {
        try {
            procedure.query("{ call PCK_CP_BNK_ACC_CONTROL_SERVICE.updateResultToInValid(?,?,?,?,?)}");
            procedure.setInParameter(1, detail.getNatcode())
                    .setInParameter(2, detail.getAccountNo())
                    .setInParameter(3, detail.getBankCode())
                    .setInParameter(4,reasonCode)
                    .setInParameter(5,detail.getSubSystem().getSubSystemId());
            procedure.execute();

        } catch (SQLException ex) {
            String message = "خطا در ویرایش نتیجه صحت سنجی رکورد پرداخت بانک " + detail.getPayHead().getBankName() + " سیستم " + detail.getPayHead().getSystem().getSystemIdTitle() + " مربوط به چک " + detail.getPayHead().getCheckNo() + " به حالت نامعتبر.";
            logService.save(message, null, new GlSystemType(detail.getPayHead().getSystem().getSystemId()), "", "0");
            logger.error(message, ex);
        }

    }

}
