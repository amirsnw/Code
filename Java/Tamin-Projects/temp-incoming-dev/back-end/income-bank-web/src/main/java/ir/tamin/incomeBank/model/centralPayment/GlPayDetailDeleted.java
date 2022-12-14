/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package ir.tamin.incomeBank.model.centralPayment;

import ir.tamin.incomeBank.model.baseinfo.Branch;
import java.io.Serializable;
import java.math.BigDecimal;
import java.util.Date;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;
import javax.validation.constraints.Size;

/**
 *
 * @author s_maknooni
 */
@Entity
@Table(name = "GL_PAY_DETAIL_DELETED")

public class GlPayDetailDeleted implements Serializable {

    private static final long serialVersionUID = 1L;
    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @Column(name = "PAY_DETAIL_DELETED_ID")
    private BigDecimal payDetailDeletedId;
    @Size(min = 1, max = 10)
    @Column(name = "RISUID")
    private String risuid;
    @Size(min = 1, max = 50)
    @Column(name = "FIRST_NAME")
    private String firstName;
    @Size(min = 1, max = 100)
    @Column(name = "LAST_NAME")
    private String lastName;
    @Size(min = 1, max = 16)
    @Column(name = "NATCODE")
    private String natcode;
    @Size(min = 1, max = 10)
    @Column(name = "SSN")
    private String ssn;
    @Column(name = "PAY_AMOUNT")
    private long payAmount;
    @Size(min = 1, max = 50)
    @Column(name = "ACCOUNT_NO")
    private String accountNo;
    @Size(min = 1, max = 19)
    @Column(name = "PAY_DOCNO")
    private String payDocno;
    @Column(name = "PAY_DOCDAT")
    @Temporal(TemporalType.TIMESTAMP)
    private Date payDocdat;
    @Size(min = 1, max = 2)
    @Column(name = "ISUTYPECODE")
    private String isutypecode;
    @Size(min = 1, max = 80)
    @Column(name = "ISUTYPEDESC")
    private String isutypedesc;
    @Size(min = 1, max = 2)
    @Column(name = "ISUSTATCODE")
    private String isustatcode;
    @Size(min = 1, max = 80)
    @Column(name = "ISUSTATDESC")
    private String isustatdesc;
    @Size(min = 1, max = 8)
    @Column(name = "ACCIDENTCODE")
    private String accidentcode;

    @Column(name = "PAY_HEAD_ID")
    private BigDecimal payHeadId;

    @JoinColumn(name = "SUB_SYSTEM_ID", referencedColumnName = "SUB_SYSTEM_ID")
    @ManyToOne(optional = false)
    private GlSubsystemType subSystem;

    @JoinColumn(name = "BRANCH_CODE", referencedColumnName = "BRHCODE")
    @ManyToOne(optional = false)
    private Branch branch;

    @Column(name = "REF_ID_OF_PAYDOC")
    private String refIdOfPayDoc;

    @Column(name = "REF_ID_OF_PAYDOC_DATE")
    private String refIdOfPayDocDate;

    @Column(name = "SEND_TO_MALI_DATE")
    private String sendToMaliDate;
    @Column(name = "SEND_TO_MALI_USER")
    private String sendToMaliUser;
    @Column(name = "SEND_TO_MALI_USER_DESC")
    private String sendToMaliUserDesc;
    @Column(name = "FIRST_CONFIRM_UESR")
    private String firstConfirmUser;
    @Column(name = "FIRST_CONFIRM_DATE")
    private String firstConfirmDate;
    @Column(name = "SECOND_CONFIRM_UESR")
    private String secondConfirmUser;
    @Column(name = "SECOND_CONFIRM_DATE")
    private String secondConfirmDate;
    @Column(name = "STATUS")
    private Character status;
    @Column(name = "ACC_CODE")
    private String accCode;

    @Column(name = "CALC_START_DATE")
    private String calcStartDate;
    @Column(name = "CALC_END_DATE")
    private String calcEndDate;

    @Column(name = "DELETE_UESR")
    private String deleteUser;
    @Column(name = "DELETE_DATE")
    @Temporal(TemporalType.TIMESTAMP)
    private Date deleteDate;

    @Column(name = "DELETE_REASON_CODE")
    private String deleteReason;

    @Column(name = "BANK_CODE")
    private String bankCode;

    @Column(name = "PAY_FROM_DATE")
    @Temporal(TemporalType.TIMESTAMP)
    private Date payFromDate;
    @Column(name = "PAY_TO_DATE")
    @Temporal(TemporalType.TIMESTAMP)
    private Date payToDate;

    @JoinColumn(name = "SYSTEM_TYPE_ID", referencedColumnName = "SYSTEM_TYPE_ID")
    @ManyToOne(optional = false)
    private GlSystemType system;

    @Column(name = "NATIONALITY")
    private String nationality;

    @Column(name = "ALPHABET")
    private String alphabet;
    @Column(name = "ALPHABET_CODE")
    private Integer alphabetCode;
    @Column(name = "PENSIONER_ID")
    private String pensionerId;
    @Column(name = "PAY_MODE")
    private String payMode;
    @Column(name = "UPDATE_USER")
    private String updateUser;
    @Column(name = "UPDATE_DATE")
    @Temporal(TemporalType.TIMESTAMP)
    private Date updateDate;
    @Column(name = "IS_HAMKAR")
    private String isHamkar;
    @Column(name = "IS_DEAD")
    private String isDead;
    @Column(name = "HAS_AGENT")
    private String hasAgent;

    public GlPayDetailDeleted() {
    }

    public GlPayDetailDeleted(BigDecimal payDetailDeletedId) {
        this.payDetailDeletedId = payDetailDeletedId;
    }

    public BigDecimal getPayDetailDeletedId() {
        return payDetailDeletedId;
    }

    public void setPayDetailDeletedId(BigDecimal payDetailDeletedId) {
        this.payDetailDeletedId = payDetailDeletedId;
    }

    public String getRisuid() {
        return risuid;
    }

    public void setRisuid(String risuid) {
        this.risuid = risuid;
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

    public long getPayAmount() {
        return payAmount;
    }

    public void setPayAmount(long payAmount) {
        this.payAmount = payAmount;
    }

    public String getAccountNo() {
        return accountNo;
    }

    public void setAccountNo(String accountNo) {
        this.accountNo = accountNo;
    }

    public String getPayDocno() {
        return payDocno;
    }

    public void setPayDocno(String payDocno) {
        this.payDocno = payDocno;
    }

    public Date getPayDocdat() {
        return payDocdat;
    }

    public void setPayDocdat(Date payDocdat) {
        this.payDocdat = payDocdat;
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

    public String getAccidentcode() {
        return accidentcode;
    }

    public void setAccidentcode(String accidentcode) {
        this.accidentcode = accidentcode;
    }

    public BigDecimal getPayHeadId() {
        return payHeadId;
    }

    public void setPayHeadId(BigDecimal payHeadId) {
        this.payHeadId = payHeadId;
    }

    public GlSubsystemType getSubSystem() {
        return subSystem;
    }

    public void setSubSystem(GlSubsystemType subSystem) {
        this.subSystem = subSystem;
    }

    public Branch getBranch() {
        return branch;
    }

    public void setBranch(Branch branch) {
        this.branch = branch;
    }

    public String getRefIdOfPayDoc() {
        return refIdOfPayDoc;
    }

    public void setRefIdOfPayDoc(String refIdOfPayDoc) {
        this.refIdOfPayDoc = refIdOfPayDoc;
    }

    public String getRefIdOfPayDocDate() {
        return refIdOfPayDocDate;
    }

    public void setRefIdOfPayDocDate(String refIdOfPayDocDate) {
        this.refIdOfPayDocDate = refIdOfPayDocDate;
    }

    public String getSendToMaliDate() {
        return sendToMaliDate;
    }

    public void setSendToMaliDate(String sendToMaliDate) {
        this.sendToMaliDate = sendToMaliDate;
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

    public Character getStatus() {
        return status;
    }

    public void setStatus(Character status) {
        this.status = status;
    }

    public String getTitle() {
        return subSystem.getTitle();
    }

    public String getBranchCode() {
        return branch.getBrhCode();
    }

    public String getSendToMaliUser() {
        return sendToMaliUser;
    }

    public void setSendToMaliUser(String sendToMaliUser) {
        this.sendToMaliUser = sendToMaliUser;
    }

    public String getSendToMaliUserDesc() {
        return sendToMaliUserDesc;
    }

    public void setSendToMaliUserDesc(String sendToMaliUserDesc) {
        this.sendToMaliUserDesc = sendToMaliUserDesc;
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

    public String getDeleteUser() {
        return deleteUser;
    }

    public void setDeleteUser(String deleteUser) {
        this.deleteUser = deleteUser;
    }

    public Date getDeleteDate() {
        return deleteDate;
    }

    public void setDeleteDate(Date deleteDate) {
        this.deleteDate = deleteDate;
    }

    public String getDeleteReason() {
        return deleteReason;
    }

    public void setDeleteReason(String deleteReason) {
        this.deleteReason = deleteReason;
    }

    public String getBankCode() {
        return bankCode;
    }

    public void setBankCode(String bankCode) {
        this.bankCode = bankCode;
    }

    public Date getPayFromDate() {
        return payFromDate;
    }

    public void setPayFromDate(Date payFromDate) {
        this.payFromDate = payFromDate;
    }

    public Date getPayToDate() {
        return payToDate;
    }

    public void setPayToDate(Date payToDate) {
        this.payToDate = payToDate;
    }

    public GlSystemType getSystem() {
        return system;
    }

    public void setSystem(GlSystemType system) {
        this.system = system;
    }

    public String getNationality() {
        return nationality;
    }

    public void setNationality(String nationality) {
        this.nationality = nationality;
    }

    public String getAlphabet() {
        return alphabet;
    }

    public void setAlphabet(String alphabet) {
        this.alphabet = alphabet;
    }

    public Integer getAlphabetCode() {
        return alphabetCode;
    }

    public void setAlphabetCode(Integer alphabetCode) {
        this.alphabetCode = alphabetCode;
    }

    public String getPensionerId() {
        return pensionerId;
    }

    public void setPensionerId(String pensionerId) {
        this.pensionerId = pensionerId;
    }

    public String getPayMode() {
        return payMode;
    }

    public void setPayMode(String payMode) {
        this.payMode = payMode;
    }

    public String getUpdateUser() {
        return updateUser;
    }

    public void setUpdateUser(String updateUser) {
        this.updateUser = updateUser;
    }

    public Date getUpdateDate() {
        return updateDate;
    }

    public void setUpdateDate(Date updateDate) {
        this.updateDate = updateDate;
    }

    public String getIsHamkar() {
        return isHamkar;
    }

    public void setIsHamkar(String isHamkar) {
        this.isHamkar = isHamkar;
    }

    public String getIsDead() {
        return isDead;
    }

    public void setIsDead(String isDead) {
        this.isDead = isDead;
    }

    public String getHasAgent() {
        return hasAgent;
    }

    public void setHasAgent(String hasAgent) {
        this.hasAgent = hasAgent;
    }

}
