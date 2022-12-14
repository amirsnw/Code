/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package ir.tamin.incomeBank.model.shortterm;

import java.io.Serializable;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.NamedQueries;
import javax.persistence.NamedQuery;
import javax.persistence.Table;
import javax.persistence.Transient;

/**
 *
 * @author s_maknooni
 */
@Entity
@Table(name = "VW_STP_GL_SSUP")
@NamedQueries({
    @NamedQuery(name = "VwglSsup.calcTotalAmmountAndTotalCount", query = "select count(vw) , sum(vw.payAmt) from VwglSsup vw where vw.brchcode in :branches and  vw.reqHlptyp in :helpTypes and vw.bankcode in :banks and vw.sendToMaliDate >=  :fromDtae and vw.sendToMaliDate <=  :toDate "),
    @NamedQuery(name = "VwglSsup.calcTotalAmmountAndTotalCountOtherBanks", query = "select count(vw) , sum(vw.payAmt) from VwglSsup vw where vw.brchcode in :branches and  vw.reqHlptyp in :helpTypes and vw.bankcode not in ('01','02','03','04','05','06','07','19') and vw.sendToMaliDate >=  :fromDtae and vw.sendToMaliDate <=  :toDate "),
    @NamedQuery(name = "VwglSsup.getSumValuesGroupByBank", query = "select vw.bankcode ,count(vw) , sum(vw.payAmt) from VwglSsup vw where vw.brchcode in :branches and  vw.reqHlptyp in :helpTypes and vw.bankcode in :banks and vw.sendToMaliDate >=  :fromDtae and vw.sendToMaliDate <=  :toDate group by vw.bankcode "),
    @NamedQuery(name = "VwglSsup.getSumValuesGroupByBankAllBanks", query = "select vw.bankcode ,count(vw) , sum(vw.payAmt) from VwglSsup vw where vw.brchcode in :branches and  vw.reqHlptyp in :helpTypes and vw.bankcode in :banks and vw.sendToMaliDate >=  :fromDtae and vw.sendToMaliDate <=  :toDate  group by vw.bankcode union all select '00' ,count(vw) , sum(vw.payAmt) from VwglSsup vw where vw.brchcode in :branches and  vw.reqHlptyp in :helpTypes and vw.bankcode not in ('01','02','03','04','05','06','07',19) and vw.sendToMaliDate >=  :fromDtae and vw.sendToMaliDate <=  :toDate "),
    @NamedQuery(name = "VwglSsup.getSumValuesGroupByHelpType", query = "select vw.reqHlptyp ,count(vw) , sum(vw.payAmt) from VwglSsup vw where vw.brchcode in :branches and  vw.reqHlptyp in :helpTypes and vw.bankcode in :banks and vw.sendToMaliDate >=  :fromDtae and vw.sendToMaliDate <=  :toDate group by vw.reqHlptyp "),
    @NamedQuery(name = "VwglSsup.getSumValuesGroupByHelpTypeSelectedAndOther", query = "select vw.reqHlptyp ,count(vw) , sum(vw.payAmt) from VwglSsup vw where vw.brchcode in :branches and  vw.reqHlptyp in :helpTypes and vw.bankcode not in :banks and vw.sendToMaliDate >=  :fromDtae and vw.sendToMaliDate <=  :toDate group by vw.reqHlptyp "),
    @NamedQuery(name = "VwglSsup.getSumValuesGroupByHelpTypeAllBanks", query = "select vw.reqHlptyp ,count(vw) , sum(vw.payAmt) from VwglSsup vw where vw.brchcode  in :branches and  vw.reqHlptyp in :helpTypes and  vw.sendToMaliDate >=  :fromDtae and vw.sendToMaliDate <=  :toDate group by vw.reqHlptyp "),
    @NamedQuery(name = "VwglSsup.getRowsGroupByBank", query = "select vw.bankcode from VwglSsup vw where vw.brchcode in :branches and  vw.reqHlptyp in :helpTypes and vw.bankcode in :banks and vw.sendToMaliDate >=  :fromDtae and vw.sendToMaliDate <=  :toDate group by vw.bankcode "),
    @NamedQuery(name = "VwglSsup.getRowsGroupByBankSelectedAndOther", query = "select vw.bankcode from VwglSsup vw where vw.brchcode in :branches and  vw.reqHlptyp in :helpTypes and vw.bankcode not in :banks and vw.sendToMaliDate >=  :fromDtae and vw.sendToMaliDate <=  :toDate group by vw.bankcode "),
    @NamedQuery(name = "VwglSsup.getRowsGroupByBankAllBanks", query = "select vw.bankcode from VwglSsup vw where vw.brchcode in :branches and  vw.reqHlptyp in :helpTypes and vw.sendToMaliDate >=  :fromDtae and vw.sendToMaliDate <=  :toDate group by vw.bankcode "),
    @NamedQuery(name = "VwglSsup.getBankRowsGroupByBranchcode", query = "select vw.brchcode from VwglSsup vw where vw.brchcode in :branches and  vw.reqHlptyp in :helpTypes and vw.bankcode=:bankCode and vw.sendToMaliDate >=  :fromDtae and vw.sendToMaliDate <=  :toDate group by vw.brchcode "),
    @NamedQuery(name = "VwglSsup.getAllByBankBranch", query = "select vw from VwglSsup vw where vw.brchcode = :branchCode and  vw.reqHlptyp in :helpTypes and vw.bankcode = :bankCode and vw.sendToMaliDate >=  :fromDtae and vw.sendToMaliDate <=  :toDate ")

})
public class VwglSsup implements Serializable {

    private static final long serialVersionUID = 1L;

    @Column(name = "REQ_SERIAL")
    private String reqSerial;
    @Column(name = "RISUID")
    private String risuid;
    @Column(name = "RISULNAME")
    private String risulname;
    @Column(name = "RISUFNAME")
    private String risufname;
    @Column(name = "REQ_HLPTYP")
    private String reqHlptyp;
    @Column(name = "REQ_HLPTYPDSC")
    private String reqHlptypdsc;
    @Column(name = "REQ_DATE")
    private String reqDate;
    @Column(name = "PAY_AMT")
    private Long payAmt;
    @Id
    @Column(name = "PAY_DOCNO")
    private String payDocno;
    @Column(name = "PAY_DOCDAT")
    private String payDocdat;
    @Column(name = "BANKCODE")
    private String bankcode;
    @Column(name = "BANKNAME")
    private String bankname;
    @Column(name = "RISUACCNO")
    private String risuaccno;
    @Column(name = "ISUTYPECODE")
    private String isutypecode;
    @Column(name = "ISUTYPEDESC")
    private String isutypedesc;
    @Column(name = "ISUSTATCODE")
    private String isustatcode;
    @Column(name = "ISUSTATDESC")
    private String isustatdesc;
    @Column(name = "REQ_ACCIDENTCODE")
    private String reqAccidentcode;
    @Column(name = "RISUNATCODE")
    private String risunatcode;
    @Column(name = "SSN")
    private String ssn;
    @Column(name = "BRCHCODE")
    private String brchcode;

    @Column(name = "CONFUID1")
    private String firstConfirmUser;
    @Column(name = "CONFDT1")
    private String firstConfirmDate;
    @Column(name = "CONFUID2")
    private String secondConfirmUser;
    @Column(name = "CONFDT2")
    private String secondConfirmDate;
    @Column(name = "SENDUID")
    private String sendToMaliUser;
    @Column(name = "SENDDT")

    private String sendToMaliDate;
    @Column(name = "RET_CODE")
    private String retCode;
    @Column(name = "RET_DESC_DETAIL")
    private String retDescDetail;
    @Column(name = "ACC_CODE")
    private String accCode;
    @Column(name = "PAY_SDATE")
    private String calcStartDate;
    @Column(name = "PAY_EDATE")
    private String calcEndDate;
    @Column(name = "RISU_CITIZN")
    private String risuCitizen;

    @Transient
    String docNo;

    public VwglSsup() {
    }

    public String getRisuid() {
        return risuid;
    }

    public void setRisuid(String risuid) {
        this.risuid = risuid;
    }

    public String getRisulname() {
        return risulname;
    }

    public void setRisulname(String risulname) {
        this.risulname = risulname;
    }

    public String getRisufname() {
        return risufname;
    }

    public void setRisufname(String risufname) {
        this.risufname = risufname;
    }

    public String getReqHlptyp() {
        return reqHlptyp;
    }

    public void setReqHlptyp(String reqHlptyp) {
        this.reqHlptyp = reqHlptyp;
    }

    public String getReqHlptypdsc() {
        return reqHlptypdsc;
    }

    public void setReqHlptypdsc(String reqHlptypdsc) {
        this.reqHlptypdsc = reqHlptypdsc;
    }

    public String getReqDate() {
        return reqDate;
    }

    public void setReqDate(String reqDate) {
        this.reqDate = reqDate;
    }

    public String getReqSerial() {
        return reqSerial;
    }

    public void setReqSerial(String reqSerial) {
        this.reqSerial = reqSerial;
    }

    public Long getPayAmt() {
        return payAmt;
    }

    public void setPayAmt(Long payAmt) {
        this.payAmt = payAmt;
    }

    public String getPayDocno() {
        return payDocno;
    }

    public void setPayDocno(String payDocno) {
        this.payDocno = payDocno;
    }

    public String getPayDocdat() {
        return payDocdat;
    }

    public void setPayDocdat(String payDocdat) {
        this.payDocdat = payDocdat;
    }

    public String getBankcode() {
        return bankcode;
    }

    public void setBankcode(String bankcode) {
        this.bankcode = bankcode;
    }

    public String getBankname() {
        return bankname;
    }

    public void setBankname(String bankname) {
        this.bankname = bankname;
    }

    public String getRisuaccno() {
        return risuaccno;
    }

    public void setRisuaccno(String risuaccno) {
        this.risuaccno = risuaccno;
    }

    public String getIsutypecode() {
        return isutypecode;
    }

    public void setIsutypecode(String isutypecode) {
        this.isutypecode = isutypecode;
    }

    public String getIsutypedesc() {
        return isutypedesc;
    }

    public void setIsutypedesc(String isutypedesc) {
        this.isutypedesc = isutypedesc;
    }

    public String getIsustatcode() {
        return isustatcode;
    }

    public void setIsustatcode(String isustatcode) {
        this.isustatcode = isustatcode;
    }

    public String getIsustatdesc() {
        return isustatdesc;
    }

    public void setIsustatdesc(String isustatdesc) {
        this.isustatdesc = isustatdesc;
    }

    public String getRisunatcode() {
        return risunatcode;
    }

    public void setRisunatcode(String risunatcode) {
        this.risunatcode = risunatcode;
    }

    public String getSsn() {
        return ssn;
    }

    public void setSsn(String ssn) {
        this.ssn = ssn;
    }

    public String getBrchcode() {
        return brchcode;
    }

    public void setBrchcode(String brchcode) {
        this.brchcode = brchcode;
    }

    public String getReqAccidentcode() {
        return reqAccidentcode;
    }

    public void setReqAccidentcode(String reqAccidentcode) {
        this.reqAccidentcode = reqAccidentcode;
    }

    public String getFirstConfirmUser() {
        return firstConfirmUser;
    }

    public void setFirstConfirmUser(String firstConfirmUser) {
        this.firstConfirmUser = firstConfirmUser;
    }

    public String getFirstConfirmDate() {
        return firstConfirmDate;
    }

    public void setFirstConfirmDate(String firstConfirmDate) {
        this.firstConfirmDate = firstConfirmDate;
    }

    public String getSecondConfirmUser() {
        return secondConfirmUser;
    }

    public void setSecondConfirmUser(String secondConfirmUser) {
        this.secondConfirmUser = secondConfirmUser;
    }

    public String getSecondConfirmDate() {
        return secondConfirmDate;
    }

    public void setSecondConfirmDate(String secondConfirmDate) {
        this.secondConfirmDate = secondConfirmDate;
    }

    public String getSendToMaliUser() {
        return sendToMaliUser;
    }

    public void setSendToMaliUser(String sendToMaliUser) {
        this.sendToMaliUser = sendToMaliUser;
    }

    public String getSendToMaliDate() {
        return sendToMaliDate;
    }

    public void setSendToMaliDate(String sendToMaliDate) {
        this.sendToMaliDate = sendToMaliDate;
    }

    public String getRetCode() {
        return retCode;
    }

    public void setRetCode(String retCode) {
        this.retCode = retCode;
    }

    public String getRetDescDetail() {
        return retDescDetail;
    }

    public void setRetDescDetail(String retDescDetail) {
        this.retDescDetail = retDescDetail;
    }

    public String getAccCode() {
        return accCode;
    }

    public void setAccCode(String accCode) {
        this.accCode = accCode;
    }

    public String getCalcStartDate() {
        return calcStartDate;
    }

    public void setCalcStartDate(String calcStartDate) {
        this.calcStartDate = calcStartDate;
    }

    public String getCalcEndDate() {
        return calcEndDate;
    }

    public void setCalcEndDate(String calcEndDate) {
        this.calcEndDate = calcEndDate;
    }

    public String getDocNo() {
        return payDocno + risunatcode + reqSerial;
    }

    public void setDocNo(String docNo) {
        this.docNo = docNo;
    }

    public String getRisuCitizen() {
        return risuCitizen;
    }

    public void setRisuCitizen(String risuCitizen) {
        this.risuCitizen = risuCitizen;
    }

}
