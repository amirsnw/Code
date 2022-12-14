/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package ir.tamin.incomeBank.model.asnad;

import java.io.Serializable;
import java.math.BigInteger;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.NamedQueries;
import javax.persistence.NamedQuery;
import javax.persistence.Table;

/**
 *
 * @author h_riazat
 */
@Entity
@Table(name = "VW_ASNAD_PAYMENT_LIST")
@NamedQueries(
        {
            @NamedQuery(name = "VwAsnadPaymentList.getAllHealthOrganization", query = "select distinct t.vahedCode,t.vahedName from VwAsnadPaymentList t ")
            ,
        @NamedQuery(name = "VwAsnadPaymentList.getAllCustType", query = "select distinct t.vahedCode,t.vahedName,t.custNo,t.custName from VwAsnadPaymentList t where (:wwwStatus is null or t.wwwStatus = :wwwStatus) and (t.custOwnership in :custOwnerships) and (t.parType in :parTypes) and (:custName is null or t.custName like :custName) and (t.yearMonth between :fromYearMonth and :toYearMonth) and (t.custType in :custTypes) and (t.bankCode in :bankCodes ) "),})

public class VwAsnadPaymentList implements Serializable {

    private static final long serialVersionUID = 1L;
    @Column(name = "DBLINKID")
    private long DbLinkId;
    @Id
    @Column(name = "CPAY_PK_ID")
    private long cpayPkId;
    @Column(name = "BILL_PK_ID")
    private BigInteger billPkId;
    @Column(name = "CUST_TYPE")
    private String custType;
    @Column(name = "CUST_NO")
    private String custNo;
    @Column(name = "CUST_NAME")
    private String custName;
    @Column(name = "CUST_OWNERSHIP")
    private String custOwnership;
    @Column(name = "PAR_TYPE")
    private String parType;
    @Column(name = "NOS_YEAR")
    private String nosYear;
    @Column(name = "NOS_MONTH")
    private String nosMonth;
    @Column(name = "PROVINCE_CODE")
    private String provinceCode;
    @Column(name = "VAHED_CODE")
    private String vahedCode;
    @Column(name = "VAHED_NAME")
    private String vahedName;
    @Column(name = "WWW_STATUS")
    private String wwwStatus;
    @Column(name = "RECIP_AMOUNT")
    private Long recipAmount;
    @Column(name = "BANKCODE")
    private String bankCode;
    @Column(name = "BNKBRHCODE")
    private String bnkBrhCode;
    @Column(name = "BANKDESC")
    private String bankDesc;
    @Column(name = "ACC_CODE")
    private String accCode;
    @Column(name = "PAY_KIND")
    private String payKind;
//    @Column(name = "DEDUCT_ALALHESAB")
//    private Long deductAlalhesab;
//    @Column(name = "ALAL_CHEQUE_NO")
//    private String alalChequeNo;
//    @Column(name = "ALAL_CHEQUE_DATE")
//    private String alalChequeDate;
//    @Column(name = "ALAL_HEAD_ID")
//    private Long alalHeadId;
//    @Column(name = "PAY_NET")
//    private Long payNet;
//    @Column(name = "NET_CHEQUE_NO")
//    private String netChequeNo;
//    @Column(name = "NET_CHEQUE_DATE")
//    private String netChequeDate;
//    @Column(name = "NET_HEAD_ID")
//    private Long netHeadId;
//    @Column(name = "PRE_PAY")
//    private Long prePay;
//    @Column(name = "PRE_CHEQUE_NO")
//    private String preChequeNo;
//    @Column(name = "PRE_CHEQUE_DATE")
//    private String preChequeDate;
//    @Column(name = "PRE_HEAD_ID")
//    private Long preHeadId;
    @Column(name = "DICKER_PAY")
    private Long dickerPay;
    @Column(name = "STATUS")
    private Character status;
    @Column(name = "REF_PAY_NO")
    private String refPayNo;
    @Column(name = "YEAR_MONTH")
    private String yearMonth;

    public BigInteger getBillPkId() {
        return billPkId;
    }

    public void setBillPkId(BigInteger billPkId) {
        this.billPkId = billPkId;
    }

    public String getCustType() {
        return custType;
    }

    public void setCustType(String custType) {
        this.custType = custType;
    }

    public String getCustNo() {
        return custNo;
    }

    public void setCustNo(String custNo) {
        this.custNo = custNo;
    }

    public String getCustName() {
        return custName;
    }

    public void setCustName(String custName) {
        this.custName = custName;
    }

    public String getCustOwnership() {
        return custOwnership;
    }

    public void setCustOwnership(String custOwnership) {
        this.custOwnership = custOwnership;
    }

    public String getParType() {
        return parType;
    }

    public void setParType(String parType) {
        this.parType = parType;
    }

    public String getNosYear() {
        return nosYear;
    }

    public void setNosYear(String nosYear) {
        this.nosYear = nosYear;
    }

    public String getNosMonth() {
        return nosMonth;
    }

    public void setNosMonth(String nosMonth) {
        this.nosMonth = nosMonth;
    }

    public String getProvinceCode() {
        return provinceCode;
    }

    public void setProvinceCode(String provinceCode) {
        this.provinceCode = provinceCode;
    }

    public String getVahedCode() {
        return vahedCode;
    }

    public void setVahedCode(String vahedCode) {
        this.vahedCode = vahedCode;
    }

    public String getWwwStatus() {
        return wwwStatus;
    }

    public void setWwwStatus(String wwwStatus) {
        this.wwwStatus = wwwStatus;
    }

    public Long getRecipAmount() {
        return recipAmount;
    }

    public void setRecipAmount(Long recipAmount) {
        this.recipAmount = recipAmount;
    }

    public String getAccCode() {
        return accCode;
    }

    public void setAccCode(String accCode) {
        this.accCode = accCode;
    }

    public String getPayKind() {
        return payKind;
    }

    public void setPayKind(String payKind) {
        this.payKind = payKind;
    }

//    public Long getDeductAlalhesab() {
//        return deductAlalhesab;
//    }
//
//    public void setDeductAlalhesab(Long deductAlalhesab) {
//        this.deductAlalhesab = deductAlalhesab;
//    }
//
//    public String getAlalChequeNo() {
//        return alalChequeNo;
//    }
//
//    public void setAlalChequeNo(String alalChequeNo) {
//        this.alalChequeNo = alalChequeNo;
//    }
//
//    public String getAlalChequeDate() {
//        return alalChequeDate;
//    }
//
//    public void setAlalChequeDate(String alalChequeDate) {
//        this.alalChequeDate = alalChequeDate;
//    }
//
//    public Long getAlalHeadId() {
//        return alalHeadId;
//    }
//
//    public void setAlalHeadId(Long alalHeadId) {
//        this.alalHeadId = alalHeadId;
//    }
//
//    public Long getPayNet() {
//        return payNet;
//    }
//
//    public void setPayNet(Long payNet) {
//        this.payNet = payNet;
//    }
//
//    public String getNetChequeNo() {
//        return netChequeNo;
//    }
//
//    public void setNetChequeNo(String netChequeNo) {
//        this.netChequeNo = netChequeNo;
//    }
//
//    public String getNetChequeDate() {
//        return netChequeDate;
//    }
//
//    public void setNetChequeDate(String netChequeDate) {
//        this.netChequeDate = netChequeDate;
//    }
//
//    public Long getNetHeadId() {
//        return netHeadId;
//    }
//
//    public void setNetHeadId(Long netHeadId) {
//        this.netHeadId = netHeadId;
//    }
//
//    public Long getPrePay() {
//        return prePay;
//    }
//
//    public void setPrePay(Long prePay) {
//        this.prePay = prePay;
//    }
//
//    public String getPreChequeNo() {
//        return preChequeNo;
//    }
//
//    public void setPreChequeNo(String preChequeNo) {
//        this.preChequeNo = preChequeNo;
//    }
//
//    public String getPreChequeDate() {
//        return preChequeDate;
//    }
//
//    public void setPreChequeDate(String preChequeDate) {
//        this.preChequeDate = preChequeDate;
//    }
//
//    public Long getPreHeadId() {
//        return preHeadId;
//    }
//
//    public void setPreHeadId(Long preHeadId) {
//        this.preHeadId = preHeadId;
//    }
    public Long getDickerPay() {
        return dickerPay;
    }

    public void setDickerPay(Long dickerPay) {
        this.dickerPay = dickerPay;
    }

    public Character getStatus() {
        return status;
    }

    public void setStatus(Character status) {
        this.status = status;
    }

    public String getRefPayNo() {
        return refPayNo;
    }

    public void setRefPayNo(String refPayNo) {
        this.refPayNo = refPayNo;
    }

    public void setBankCode(String bankCode) {
        this.bankCode = bankCode;
    }

    public void setBnkBrhCode(String bnkBrhCode) {
        this.bnkBrhCode = bnkBrhCode;
    }

    public void setBankDesc(String bankDesc) {
        this.bankDesc = bankDesc;
    }

    public static long getSerialVersionUID() {
        return serialVersionUID;
    }

    public String getBankCode() {
        return bankCode;
    }

    public String getBnkBrhCode() {
        return bnkBrhCode;
    }

    public String getBankDesc() {
        return bankDesc;
    }

    public void setDbLinkId(long DbLinkId) {
        this.DbLinkId = DbLinkId;
    }

    public void setCpayPkId(long cpayPkId) {
        this.cpayPkId = cpayPkId;
    }

    public long getDbLinkId() {
        return DbLinkId;
    }

    public long getCpayPkId() {
        return cpayPkId;
    }

    public void setVahedName(String vahedName) {
        this.vahedName = vahedName;
    }

    public String getVahedName() {
        return vahedName;
    }

}
