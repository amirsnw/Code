/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package ir.tamin.incomeBank.model.centralPayment;

import ir.tamin.incomeBank.model.baseinfo.Branch;
import ir.tamin.incomeBank.model.centralPayment.enums.PayStepEnum;
import ir.tamin.incomeBank.model.pension.enums.PensionTypePersonEnum;
import ir.tamin.incomeBank.util.DateUtils;

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
import javax.persistence.NamedQueries;
import javax.persistence.NamedQuery;
import javax.persistence.Table;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;
import javax.persistence.Transient;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;

/**
 * @author s_maknooni
 */
@Entity
@Table(name = "GL_PAY_DETAIL")
@NamedQueries({
        @NamedQuery(name = "GlPayDetail.getCountByHeadId", query = "select count(d) from GlPayDetail d where d.payHead.payHeadId=:headId"),
        @NamedQuery(name = "GlPayDetail.getSumValuesByHeadId", query = "select count(d),sum(d.payAmount) from GlPayDetail d where d.payHead.payHeadId=:headId "),
        @NamedQuery(name = "GlPayDetail.getSumAmmountForCheckIssu", query = "select sum(d.payAmount) from GlPayDetail d where d.payHead.payHeadId in :headIds "),

        @NamedQuery(name = "GlPayDetail.getAllPayDetailByHeadIds", query = "select d from GlPayDetail d where d.payHead.payHeadId in :headIds and d.payDetailId in (select t.payDetialId from TempBankControlFile t where t.payHeadId in :headIds) "),
        @NamedQuery(name = "GlPayDetail.getAllPayDetailForExcelByHeadIds", query = "select d from GlPayDetail d where d.payHead.payHeadId in :headIds and d.nationality = '01' and d.payDetailId in (select t.payDetialId from TempBankControlFile t where t.payHeadId in :headIds)"),
        @NamedQuery(name = "GlPayDetail.getForeignsPayDetailForExcelByHeadIds", query = "select d from GlPayDetail d where d.payHead.payHeadId in :headIds and d.nationality != '01' and d.payDetailId in (select t.payDetialId from TempBankControlFile t where t.payHeadId in :headIds) "),

        //For PostBank BankFile and all Bonyad Files
        @NamedQuery(name = "GlPayDetail.getAllPayDetailByHeadIdsFromHeadTable", query = "select d from GlPayDetail d where d.payHead.payHeadId in :headIds "),
        @NamedQuery(name = "GlPayDetail.getAllIranianPayDetailByHeadIdsFromHeadTable", query = "select d from GlPayDetail d where d.payHead.payHeadId in :headIds and d.nationality = '01' "),
        @NamedQuery(name = "GlPayDetail.getForeignsPayDetailByHeadIdsFromHeadTable", query = "select d from GlPayDetail d where d.payHead.payHeadId in :headIds and d.nationality != '01'  "),

        @NamedQuery(name = "GlPayDetail.bankAccount", query = "SELECT i FROM GlPayDetail i where cast(i.accountNo as NUMERIC(20)) in :bankNo and cast(i.natcode as NUMERIC(16)) in :nationCode and i.payHead.payHeadId=:payHeadId"),
        @NamedQuery(name = "GlPayDetail.getAllByBankBranch", query = "select vw from GlPayDetail vw where vw.payHead in :payHead "),
        @NamedQuery(name = "GlPayDetail.findByVoucherHeaderId", query = "select t from GlPayDetail t where t.returnVocherHeaderId = :voucherHeaderId "),
        //pensionReports
        @NamedQuery(name = "GlPayDetail.getSumValuesGroupByBrch", query = "select  vw.branch.brhName  ,count(vw) , sum(vw.payAmount) , vw.branch.brhCode from GlPayDetail vw where vw.payHead.payHeadId=:headId group by  vw.branch.brhName,vw.branch.brhCode  order by  vw.branch.brhCode"),
        @NamedQuery(name = "GlPayDetail.getSumValuesGroupByProvince", query = "select vw.branch.city.province.provinceName  ,count(vw) , sum(vw.payAmount) , vw.branch.provinceCode from GlPayDetail vw where vw.payHead.payHeadId=:headId group by vw.branch.city.province.provinceName ,vw.branch.provinceCode order by vw.branch.provinceCode"),})

public class GlPayDetail implements Serializable {

    private static final long serialVersionUID = 1L;
    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @Column(name = "PAY_DETAIL_ID")
    private BigDecimal payDetailId;
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
    @NotNull
    /*
      *
      فید شماره حساب در دیتابیس به خاطر بنیاد شهید تو مستمری که شماره حساب
      ندارن Nullable شده ولی تو برنامه برای اینکه جلوی خطا در جاهای دیگه گرفته
      بشه NotNull هست ورود دیتا تو این جدول برای بنیاد شهید از طریق پکیج
      دیتابیس هست
     */
    @Size(min = 1, max = 50)
    @Column(name = "ACCOUNT_NO")
    private String accountNo;
    @Size(min = 1, max = 22)
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

    @JoinColumn(name = "PAY_HEAD_ID", referencedColumnName = "PAY_HEAD_ID")
    @ManyToOne(optional = false)
    private GlPayHead payHead;

    @JoinColumn(name = "SUB_SYSTEM_ID", referencedColumnName = "SUB_SYSTEM_ID")
    @ManyToOne(optional = false)
    private GlSubsystemType subSystem;

    @JoinColumn(name = "BRANCH_CODE", referencedColumnName = "BRHCODE")
    @ManyToOne()
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

    @Column(name = "RETURN_REASON_CODE")
    private String returnReason;

    @Column(name = "RETURN_USER")
    private String returnUser;
    @Column(name = "RETURN_DATE")
    @Temporal(TemporalType.TIMESTAMP)
    private Date returnDate;
    @Column(name = "RETURN_VOCHER_HEADER_ID")
    private Long returnVocherHeaderId;
    @Column(name = "RETURN_VOCHER_HEADER_NO")
    private String returnVocherHeaderNo;
    @Column(name = "RETURN_VOCHER_HEADER_STATUS")
    private String returnVocherHeaderStatus;
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

    @Transient
    private String bankName;
    @Transient
    private String bankCode;
    @Transient
    private Character payStep;
    @Transient
    private Date createDate;
    @Transient
    private String fromDate;
    @Transient
    private String toDate;
    @Transient
    private String payStepDesc;
    @Transient
    private String checkNo;
    @Transient
    private Date checkDate;
    @Transient
    private String payDocDate;
    @Transient
    private String message;
    @Transient
    private String isHamkarDesc;

    public GlPayDetail() {
    }

    public GlPayDetail(BigDecimal payDetailId) {
        this.payDetailId = payDetailId;
    }

    public BigDecimal getPayDetailId() {
        return payDetailId;
    }

    public void setPayDetailId(BigDecimal payDetailId) {
        this.payDetailId = payDetailId;
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
        return (accountNo == null ? "" : accountNo);
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

    public GlPayHead getPayHead() {
        return payHead;
    }

    public void setPayHead(GlPayHead payHead) {
        this.payHead = payHead;
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

    public String getBankName() {
        //return payHead.getBank().getBankName();
        return payHead.getBankName();
    }

    public String getBankCode() {
        return payHead.getBankCode();
    }

    //    public String getHelpTypeDesc() {
//        return subSystem.getTitle();
//    }
    public Character getPayStep() {
        PayStepEnum step = PayStepEnum.find(payHead.getPayStep());
        if (step!=null){
            return step.getCode();
        }else{
            return 0;
        }

    }

    public String getRefIdOfPayDoc() {
        return refIdOfPayDoc;
    }

    public void setRefIdOfPayDoc(String stpReqSerial) {
        this.refIdOfPayDoc = stpReqSerial;
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

    public Date getCreateDate() {
        return payHead.getCreateDate();
    }

    public String getFromDate() {
        //return payHead.getFromDate();
        return DateUtils.getJalaliStandard(payHead.getFromDate(), "/");
    }

    public String getToDate() {
        // return payHead.getToDate();
        return DateUtils.getJalaliStandard(payHead.getToDate(), "/");
    }

    public String getPayStepDesc() {
        PayStepEnum step = PayStepEnum.find(payHead.getPayStep());
        if (step!= null){
            return step.getName();
        }else{
            return "";
        }

    }

    public String getCheckNo() {
        return payHead.getCheckNo();
    }

    public Date getCheckDate() {
        return payHead.getCheckDate();
    }

    public String getTitle() {
        return subSystem.getTitle();
    }

    public String getBranchCode() {
        if (branch != null) {
            return branch.getBrhCode();
        } else {
            return "";
        }
    }

    public String getProvinceCode() {
        if (branch != null && branch.getCity() != null && branch.getCity().getProvince() != null) {
            return branch.getCity().getProvince().getProvinceCode();
        } else {
            return "";
        }
    }

    public String getProvinceName() {
        if (branch != null && branch.getCity() != null && branch.getCity().getProvince() != null) {
            return branch.getCity().getProvince().getProvinceName();
        } else {
            return "";
        }
    }

    public String getBranchName() {
        if (branch != null) {
            return branch.getBrhName();
        } else {
            return "";
        }
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

    public String getPayDocDate() {
        if (payDocdat != null) {
            return DateUtils.getJalaliStandard(payDocdat, "/");
        } else {
            return null;
        }
    }

    public void setPayDocDate(String payDocDate) {
        this.payDocDate = payDocDate;
    }

    public String getReturnReason() {
        return returnReason;
    }

    public void setReturnReason(String returnReason) {
        this.returnReason = returnReason;
    }

    public String getReturnUser() {
        return returnUser;
    }

    public void setReturnUser(String returnUser) {
        this.returnUser = returnUser;
    }

    public Date getReturnDate() {
        return returnDate;
    }

    public void setReturnDate(Date returnDate) {
        this.returnDate = returnDate;
    }

    public Long getReturnVocherHeaderId() {
        return returnVocherHeaderId;
    }

    public void setReturnVocherHeaderId(Long returnVocherHeaderId) {
        this.returnVocherHeaderId = returnVocherHeaderId;
    }

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
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

    public String getReturnVocherHeaderNo() {
        return returnVocherHeaderNo;
    }

    public void setReturnVocherHeaderNo(String returnVocherHeaderNo) {
        this.returnVocherHeaderNo = returnVocherHeaderNo;
    }

    public String getReturnVocherHeaderStatus() {
        return returnVocherHeaderStatus;
    }

    public void setReturnVocherHeaderStatus(String returnVocherHeaderStatus) {
        this.returnVocherHeaderStatus = returnVocherHeaderStatus;
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

    public String getIsHamkarDesc() {
        if (isHamkar != null) {
            isHamkarDesc = PensionTypePersonEnum.find(isHamkar).getName();
        } else {
            isHamkarDesc = PensionTypePersonEnum.GHEYR_HAMKAR.getName();
        }

        return isHamkarDesc;
    }

    public void setIsHamkarDesc(String isHamkarDesc) {
        this.isHamkarDesc = isHamkarDesc;
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
