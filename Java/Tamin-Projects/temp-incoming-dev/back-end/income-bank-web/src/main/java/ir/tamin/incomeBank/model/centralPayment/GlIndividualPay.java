/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package ir.tamin.incomeBank.model.centralPayment;

import ir.tamin.incomeBank.model.centralPayment.enums.AccountSideTypeEnum;
import ir.tamin.incomeBank.model.centralPayment.enums.PayStatusEnum;
import java.io.Serializable;
import java.math.BigDecimal;
import java.math.BigInteger;
import java.util.Date;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.NamedQueries;
import javax.persistence.NamedQuery;
import javax.persistence.Table;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;
import javax.persistence.Transient;
import javax.validation.constraints.NotNull;
//import javax.validation.constraints.Size;

/**
 *
 * @author s_maknooni
 */
@Entity
@Table(name = "GL_INDIVIDUAL_PAY")
@NamedQueries({
    @NamedQuery(name = "GlIndividualPay.getSelectedRecords", query = "select t from GlIndividualPay t where t.payId in :payIds "),
    @NamedQuery(name = "GlIndividualPay.getAllGroupByMonth", query = "select t.effectivedate from GlIndividualPay t where t.individualPayHead.payHeadId = :payHeadId group by t.effectivedate "),
    @NamedQuery(name = "GlIndividualPay.getAllByMonth", query = "select t from GlIndividualPay t where t.individualPayHead.payHeadId = :payHeadId and t.effectivedate = :effectivedate"),})
public class GlIndividualPay implements Serializable {

    private static final long serialVersionUID = 1L;
    @Id
    @NotNull
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @Column(name = "PAY_ID")
    private BigDecimal payId;
    @NotNull
    @Column(name = "FIRST_NAME")
    private String firstName;
    @NotNull
    @Column(name = "LAST_NAME")
    private String lastName;
    @Column(name = "FATHER_NAME")
    private String fatherName;
    @NotNull
    @Column(name = "NATCODE")
    private String natcode;
    @Column(name = "SSN")
    private String ssn;
    @NotNull
    @Column(name = "SHENASEPAYMENT")
    private String shenasepayment;
    @NotNull
    @Column(name = "PAY_AMOUNT")
    private BigInteger payAmount;
//    Comment for test
    @NotNull
    @Column(name = "DESTINATIONACCNO")
    private String destinationaccno;
    @NotNull
    @Column(name = "EFFECTIVEDATE")
    private String effectivedate;
    @NotNull
    @Column(name = "STATUS")
    private String status;
    @Column(name = "CHEQUE_NO")
    private String chequeNo;
    @Column(name = "CHEQUE_DATE")
    private String chequeDate;
    @Column(name = "BNKAMOUNT")
    private Long bnkamount;
    @Column(name = "ERRORCODE")
    private String errorcode;
    @Column(name = "ERRORDESC")
    private String errordesc;
    @NotNull
    @Column(name = "CREATE_DATE")
    @Temporal(TemporalType.TIMESTAMP)
    private Date createDate;
    @Column(name = "CREATE_USER")
    private String createUser;
    @Column(name = "UPDATE_DATE")
    /**
     * *
     * تاريخ آخرين ويرايش- عملا ميشه تاريخ ارسال به بانک يا تاريخي که بانک
     * ويرايش ميکنه
     */
    @Temporal(TemporalType.TIMESTAMP)
    private Date updateDate;
    /**
     * *
     * آخرين کاربر ويرايش کنند - عملا ميشه کاربري که ارسال به بانک ميکنه
     */
    @Column(name = "UPDATE_USER")
    private String updateUser;
    @JoinColumn(name = "SYSTEM_TYPE_ID", referencedColumnName = "SYSTEM_TYPE_ID")
    @ManyToOne(optional = false)
    private GlSystemType system;
    @Column(name = "UNIT_CODE")
    private String unitCode;
    @Column(name = "SHENASEH_NO")
    private String shenasehNo;
    @NotNull
    @Column(name = "SEND_TYPE")
    private String sendType;
    @NotNull
    @Column(name = "ACCOUNT_SIDE_TYPE")
    private String accountSideType;
    @Column(name = "MOBILE")
    private String mobile;
    @Column(name = "SEND_TO_BANK_DATE")
    @Temporal(TemporalType.TIMESTAMP)
    private Date sendToBankDate;
    @NotNull
    @Column(name = "ACCOUNT_SIDE_NO")
    private String accountSideNo;
    @Column(name = "IDNO")
    private String idNO;
    @Column(name = "WWW_STATUS")
    private String wwwStatus;
    @Column(name = "ERRORCODE_SEND")
    private String errorcodeSend;
    @Column(name = "ERRORDESC_SEND")
    private String errordescSend;

    @JoinColumn(name = "PAY_HEAD_ID", referencedColumnName = "PAY_HEAD_ID")
    @ManyToOne(optional = true)
    private GlIndividualPayHead individualPayHead;

    @JoinColumn(name = "SUB_SYSTEM_ID", referencedColumnName = "SUB_SYSTEM_ID")
    @ManyToOne(optional = false)
    private GlSubsystemType subSystem;

    @Transient
    private String statusDesc;

    @Transient
    private BigDecimal totalAmount;

    @Transient
    private BigInteger totalFilteredAmount;

    @Transient
    private BigInteger totalFilteredPayedAmount;

    @Column(name = "(select DISPLAY_NAME from DB_LINKS d where d.UNIT_CODE=GL_INDIVIDUAL_PAY.UNIT_CODE )", insertable = false, updatable = false)
    private String unitName;

    @Transient
    private String name;

    public GlIndividualPay() {
    }

    public GlIndividualPay(BigDecimal payId) {
        this.payId = payId;
    }

    public BigDecimal getPayId() {
        return payId;
    }

    public void setPayId(BigDecimal payId) {
        this.payId = payId;
    }

    public String getFirstName() {
        return firstName;
    }

    public void setFirstName(String firstName) {
        this.firstName = firstName;
    }

    public String getLastName() {
        return lastName;
    }

    public void setLastName(String lastName) {
        this.lastName = lastName;
    }

    public String getFatherName() {
        return fatherName;
    }

    public void setFatherName(String fatherName) {
        this.fatherName = fatherName;
    }

    public String getNatcode() {
        return natcode;
    }

    public void setNatcode(String natcode) {
        this.natcode = natcode;
    }

    public String getSsn() {
        return ssn;
    }

    public void setSsn(String ssn) {
        this.ssn = ssn;
    }

    public String getShenasepayment() {
        return shenasepayment;
    }

    public void setShenasepayment(String shenasepayment) {
        this.shenasepayment = shenasepayment;
    }

    public BigInteger getPayAmount() {
        return payAmount;
    }

    public void setPayAmount(BigInteger payAmount) {
        this.payAmount = payAmount;
    }

    public String getDestinationaccno() {
        return destinationaccno;
    }

    public void setDestinationaccno(String destinationaccno) {
        this.destinationaccno = destinationaccno;
    }

    public String getEffectivedate() {
        return effectivedate;
    }

    public void setEffectivedate(String effectivedate) {
        this.effectivedate = effectivedate;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public String getChequeNo() {
        return chequeNo;
    }

    public void setChequeNo(String chequeNo) {
        this.chequeNo = chequeNo;
    }

    public String getChequeDate() {
        return chequeDate;
    }

    public void setChequeDate(String chequeDate) {
        this.chequeDate = chequeDate;
    }

    public Long getBnkamount() {
        return bnkamount;
    }

    public void setBnkamount(Long bnkamount) {
        this.bnkamount = bnkamount;
    }

    public String getErrorcode() {
        return errorcode;
    }

    public void setErrorcode(String errorcode) {
        this.errorcode = errorcode;
    }

    public String getErrorcodeSend() {
        return errorcodeSend;
    }

    public void setErrorcodeSend(String errorcodeSend) {
        this.errorcodeSend = errorcodeSend;
    }

    public String getErrordescSend() {
        return errordescSend;
    }

    public void setErrordescSend(String errordescSend) {
        this.errordescSend = errordescSend;
    }

    public String getErrordesc() {
        return errordesc;
    }

    public void setErrordesc(String errordesc) {
        this.errordesc = errordesc;
    }

    public Date getCreateDate() {
        return createDate;
    }

    public void setCreateDate(Date createDate) {
        this.createDate = createDate;
    }

    public String getCreateUser() {
        return createUser;
    }

    public void setCreateUser(String createUser) {
        this.createUser = createUser;
    }

    public Date getUpdateDate() {
        return updateDate;
    }

    public void setUpdateDate(Date updateDate) {
        this.updateDate = updateDate;
    }

    public String getUpdateUser() {
        return updateUser;
    }

    public void setUpdateUser(String updateUser) {
        this.updateUser = updateUser;
    }

    public GlSystemType getSystem() {
        return system;
    }

    public void setSystem(GlSystemType system) {
        this.system = system;
    }

    public String getUnitCode() {
        return unitCode;
    }

    public void setUnitCode(String unitCode) {
        this.unitCode = unitCode;
    }

    public String getShenasehNo() {
        return shenasehNo;
    }

    public void setShenasehNo(String shenasehNo) {
        this.shenasehNo = shenasehNo;
    }

    public String getSendType() {
        return sendType;
    }

    public void setSendType(String sendType) {
        this.sendType = sendType;
    }

    public String getAccountSideType() {
        return accountSideType;
    }

    public void setAccountSideType(String accountSideType) {
        this.accountSideType = accountSideType;
    }

    public String getMobile() {
        return mobile;
    }

    public void setMobile(String mobile) {
        this.mobile = mobile;
    }

    public GlIndividualPayHead getIndividualPayHead() {
        return individualPayHead;
    }

    public void setIndividualPayHead(GlIndividualPayHead individualPayHead) {
        this.individualPayHead = individualPayHead;
    }

    public Date getSendToBankDate() {
        return sendToBankDate;
    }

    public void setSendToBankDate(Date sendToBankDate) {
        this.sendToBankDate = sendToBankDate;
    }

    public String getAccountSideNo() {
        return accountSideNo;
    }

    public void setAccountSideNo(String accountSideNo) {
        this.accountSideNo = accountSideNo;
    }

    public String getIdNO() {
        return idNO;
    }

    public void setIdNO(String idNO) {
        this.idNO = idNO;
    }

    public String getStatusDesc() {
        return (String) PayStatusEnum.getEnum(status).get(0).get("name");
    }

    public void setStatusDesc(String statusDesc) {
        this.statusDesc = statusDesc;
    }

    public BigDecimal getTotalAmount() {
        return individualPayHead.getTotalAmount();

    }

    public void setTotalAmount(BigDecimal totalAmount) {
        this.totalAmount = totalAmount;
    }

    public GlSubsystemType getSubSystem() {
        return subSystem;
    }

    public void setSubSystem(GlSubsystemType subSystem) {
        this.subSystem = subSystem;
    }

    public String getWwwStatus() {
        return wwwStatus;
    }

    public void setWwwStatus(String wwwStatus) {
        this.wwwStatus = wwwStatus;
    }

    public String getName() {
        if (subSystem.getCode().equals(AccountSideTypeEnum.Doctors.getCode())) {
            name = firstName + ' ' + lastName;
        } else if (subSystem.getCode().equals(AccountSideTypeEnum.Hospital.getCode())) {
            name = firstName;
        }
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getUnitName() {
        return unitName;
    }

    public void setUnitName(String unitName) {
        this.unitName = unitName;
    }

    public BigInteger getTotalFilteredAmount() {
        return totalFilteredAmount;
    }

    public void setTotalFilteredAmount(BigInteger totalFilteredAmount) {
        this.totalFilteredAmount = totalFilteredAmount;
    }

    public BigInteger getTotalFilteredPayedAmount() {
        return totalFilteredPayedAmount;
    }

    public void setTotalFilteredPayedAmount(BigInteger totalFilteredPayedAmount) {
        this.totalFilteredPayedAmount = totalFilteredPayedAmount;
    }

}
