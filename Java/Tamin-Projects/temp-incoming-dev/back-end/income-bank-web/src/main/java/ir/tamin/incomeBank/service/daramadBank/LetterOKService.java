/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package ir.tamin.incomeBank.service.daramadBank;

import ir.tamin.incomeBank.model.baseinfo.BankErrorCode;
import ir.tamin.incomeBank.model.daramadBank.DrmdLetter;
import ir.tamin.incomeBank.model.daramadBank.DrmdLetterOK;
import ir.tamin.incomeBank.model.daramadBank.VwDftLetter;
import ir.tamin.incomeBank.model.daramadBank.VwDftLetterB;
import ir.tamin.incomeBank.model.daramadBank.VwDftLetterBPK;
import ir.tamin.incomeBank.model.daramadBank.VwDftLetterPK;
import ir.tamin.incomeBank.model.identityManager.User;
import ir.tamin.incomeBank.service.centralPayment.PayDetailService;
import ir.tamin.incomeBank.service.daramadBank.webservice.centralAccount.CentralAccount;
import ir.tamin.incomeBank.service.daramadBank.webservice.centralAccount.Clsletter;
import ir.tamin.incomeBank.util.ServiceUtils;
import ir.tamin.framework.cdi.util.MessageBundle;
import ir.tamin.framework.core.util.Bundle;
import java.util.Date;
import java.util.logging.Level;
import java.util.logging.Logger;
import javax.ejb.Stateless;
import javax.inject.Inject;
import javax.persistence.EntityManager;
import javax.ws.rs.WebApplicationException;
import javax.ws.rs.core.Response;
import org.slf4j.LoggerFactory;

/**
 *
 * @author f_fotuhi
 */
@Stateless
public class LetterOKService {

    @Inject
    EntityManager entityManager;

    @Inject
    @MessageBundle
    Bundle messageBundle;

    @Inject
    ServiceUtils serviceUtils;

    @Inject
    CentralAccount centralAccount;

    private static final org.slf4j.Logger logger = LoggerFactory.getLogger(PayDetailService.class);

    public String getLetterStat(String letterSerial) {
        String letterStat = "0";

        DrmdLetterOK letterOk = entityManager.find(DrmdLetterOK.class, letterSerial);
        if (letterOk != null) {
            letterStat = letterOk.getLetterStat();
        }
        return letterStat;
    }

    public String save(DrmdLetterOK letterOK, User user) {

        letterOK.setCreateuid(user.getUserName());
        letterOK.setCreatedt(serviceUtils.codeDateForDB(new Date()));

        try {
            entityManager.persist(letterOK);
            String saveMessage = "ثبت با موفقیت انجام شد";
            return saveMessage;
        } catch (Exception ex) {
            Logger.getLogger(BankErrorCode.class.getName()).log(Level.SEVERE, ex.getMessage(), ex);
            Response response = Response.status(Response.Status.INTERNAL_SERVER_ERROR).entity(messageBundle.getProperty("coreAccount.common.EXC_UNKNOWN_ERROR")).build();
            throw new WebApplicationException(response);
        }

    }

    public String update(DrmdLetterOK letterOK, User user) {

        DrmdLetterOK oldLetterOK = entityManager.find(DrmdLetterOK.class, letterOK.getLetterSerial());
        letterOK.setCreateuid(oldLetterOK.getCreateuid());
        letterOK.setCreatedt(oldLetterOK.getCreatedt());
        letterOK.setConfirmid(user.getUserName());
        letterOK.setConfirmdt(serviceUtils.codeDateForDB(new Date()));
        letterOK.setLetterStat(letterOK.getLetterStat());

        try {
            entityManager.merge(letterOK);
            entityManager.flush();
            String saveMessage = "ثبت با موفقیت انجام شد";
            return saveMessage;
        } catch (Exception ex) {
            Logger.getLogger(LetterOKService.class.getName()).log(Level.SEVERE, ex.getMessage(), ex);
            Response response = Response.status(Response.Status.INTERNAL_SERVER_ERROR).entity(messageBundle.getProperty("coreAccount.common.EXC_UNKNOWN_ERROR")).build();
            throw new WebApplicationException(response);
        }

    }

    public String sendToBranch(String letterSerial, String letterDate, String brchCode, String status) {
        Clsletter clsLetter = new Clsletter();
        VwDftLetterBPK letterPK = new VwDftLetterBPK(letterSerial, letterDate, brchCode);
        VwDftLetterPK oldLetterPK = new VwDftLetterPK(letterSerial, letterDate, brchCode);
        VwDftLetterB letter = new VwDftLetterB();
        VwDftLetter oldLetter = new VwDftLetter();
        if ("0".equals(status)) {
            letter = entityManager.find(VwDftLetterB.class, letterPK);
            clsLetter.setLETTERSERIAL(letter.getLetterSerial());
            clsLetter.setBRHCODE(letter.getBrchCode());
            clsLetter.setLETTERNO(letter.getLetterNo());
            clsLetter.setLETTERDATE(letter.getLetterDate());
            clsLetter.setLETTERNAM(letter.getLetterNam());
            clsLetter.setLETTERLNO(letter.getLetterLno());
            clsLetter.setLETTERLDATE(letter.getLetterLdate());
            clsLetter.setLETTERTYPE(letter.getLetterType() != null ? letter.getLetterType().toString() : null);
            clsLetter.setLETTERPRICE1(letter.getLetterPrice1() != null ? letter.getLetterPrice1().toString() : null);
            clsLetter.setLETTERCODE1(letter.getLetterCode1());
            clsLetter.setLETTERPRICE2(letter.getLetterPrice2() != null ? letter.getLetterPrice2().toString() : null);
            clsLetter.setLETTERCODE2(letter.getLetterCode2());
            clsLetter.setLETTEROBJDATE(letter.getLetterObjDate());
            clsLetter.setLETTERRABET(letter.getLetterRabet());
            clsLetter.setLETTERSANADFLAG(letter.getLetterSanadFlag());
            clsLetter.setCREATEUID(letter.getCreateUid());
            clsLetter.setCREATEDT(letter.getCreatedt());
            clsLetter.setLETTERPRINT(letter.getLetterPrint() != null ? letter.getLetterPrint().toString() : null);
            clsLetter.setLETTERFLAG(letter.getLetterFlag() != null ? letter.getLetterFlag().toString() : null);
            clsLetter.setLETTERSODOR(letter.getLetterSodor() != null ? letter.getLetterSodor().toString() : null);
            clsLetter.setLETTERDEL(letter.getLetterDel());
            clsLetter.setSaveBRHCODE(letter.getBrhCode());
            clsLetter.setBESCNTDATE(letter.getBesCntDate());
            clsLetter.setBESCNTNO(letter.getBesCntNo());
            clsLetter.setBESEMPZFLAG(letter.getBesEmpzFlag());
            clsLetter.setBESFUNCTIONDATE(letter.getBesFunctionDate());
            clsLetter.setRWSHID(letter.getRwshId());
            clsLetter.setRWSHNAME(letter.getRwshName());
            clsLetter.setIDNO(letter.getIdNo());
            clsLetter.setCODEDIGIT(letter.getCodeDigit());
            clsLetter.setOURAGGNO(letter.getOurag_gno());
            clsLetter.setOURAGSDATE(letter.getOurag_sdate());
        } else if ("1".equals(status)) {
            oldLetter = entityManager.find(VwDftLetter.class, oldLetterPK);
            clsLetter.setLETTERSERIAL(oldLetter.getLetterSerial());
            clsLetter.setBRHCODE(oldLetter.getBrchCode());
            clsLetter.setLETTERNO(oldLetter.getLetterNo());
            clsLetter.setLETTERDATE(oldLetter.getLetterDate());
            clsLetter.setLETTERNAM(oldLetter.getLetterNam());
            clsLetter.setLETTERLNO(oldLetter.getLetterLno());
            clsLetter.setLETTERLDATE(oldLetter.getLetterLdate());
            clsLetter.setLETTERTYPE(oldLetter.getLetterType() != null ? oldLetter.getLetterType().toString() : null);
            clsLetter.setLETTERPRICE1(oldLetter.getLetterPrice1() != null ? oldLetter.getLetterPrice1().toString() : null);
            clsLetter.setLETTERCODE1(oldLetter.getLetterCode1());
            clsLetter.setLETTERPRICE2(oldLetter.getLetterPrice2() != null ? oldLetter.getLetterPrice2().toString() : null);
            clsLetter.setLETTERCODE2(oldLetter.getLetterCode2());
            clsLetter.setLETTEROBJDATE(oldLetter.getLetterObjDate());
            clsLetter.setLETTERRABET(oldLetter.getLetterRabet());
            clsLetter.setLETTERSANADFLAG(oldLetter.getLetterSanadFlag());
            clsLetter.setCREATEUID(oldLetter.getCreateUid());
            clsLetter.setCREATEDT(oldLetter.getCreatedt());
            clsLetter.setLETTERPRINT(oldLetter.getLetterPrint() != null ? oldLetter.getLetterPrint().toString() : null);
            clsLetter.setLETTERFLAG(oldLetter.getLetterFlag() != null ? oldLetter.getLetterFlag().toString() : null);
            clsLetter.setLETTERSODOR(oldLetter.getLetterSodor() != null ? oldLetter.getLetterSodor().toString() : null);
            clsLetter.setLETTERDEL(oldLetter.getLetterDel());
            clsLetter.setSaveBRHCODE(oldLetter.getBrhCode());
            clsLetter.setBESCNTDATE(oldLetter.getBesCntDate());
            clsLetter.setBESCNTNO(oldLetter.getBesCntNo());
            clsLetter.setBESEMPZFLAG(oldLetter.getBesEmpzFlag());
            clsLetter.setBESFUNCTIONDATE(oldLetter.getBesFunctionDate());
            clsLetter.setRWSHID(oldLetter.getRwshId());
            clsLetter.setRWSHNAME(oldLetter.getRwshName());
            clsLetter.setIDNO(oldLetter.getIdNo());
            clsLetter.setCODEDIGIT(oldLetter.getCodeDigit());
            clsLetter.setOURAGGNO(oldLetter.getOurag_gno());
            clsLetter.setOURAGSDATE(oldLetter.getOurag_sdate());
        }

        try {
            String serviceResult = centralAccount.getCentralAccountSoap().sendLetterNew(clsLetter);
            if (!"-1".equals(serviceResult)) {
                if ("1".equals(serviceResult.substring(0, 1))) {
                    //ارسال با موفقیت انجام شد
                    DrmdLetterOK letterOk = entityManager.find(DrmdLetterOK.class, letterSerial);
                    letterOk.setLetOrdpay(serviceResult.substring(1, 15));
                    entityManager.merge(letterOk);
                    entityManager.flush();

                    DrmdLetter drmdLetter = entityManager.find(DrmdLetter.class, letterSerial);
                    drmdLetter.setLetterBrhsendf("1");
                    entityManager.merge(drmdLetter);
                    entityManager.flush();

                    String message = "ارسال با موفقیت انجام شد";
                    return message;

                } else if ("0".equals(serviceResult.substring(0, 1))) {
                    //خطا در ارسال اطلاعات
                    String message = "خطا در ارسال اطلاعات.";
                    logger.error(message);
                    Response response = Response.status(Response.Status.INTERNAL_SERVER_ERROR).entity(message).build();
                    throw new WebApplicationException(response);
                }
            } else {
                //ارتباط با شعبه مقصد برقرار نمی باشد.
                String message = "ارتباط با شعبه مقصد برقرار نمی باشد.";
                logger.error(message);
                Response response = Response.status(Response.Status.INTERNAL_SERVER_ERROR).entity(message).build();
                throw new WebApplicationException(response);
            }
        } catch (Exception e) {
            String message = "خطا در ارسال به شعبه.";
            logger.error(message);
            Response response = Response.status(Response.Status.INTERNAL_SERVER_ERROR).entity(message).build();
            throw new WebApplicationException(response);
        }
        return null;
    }

}
