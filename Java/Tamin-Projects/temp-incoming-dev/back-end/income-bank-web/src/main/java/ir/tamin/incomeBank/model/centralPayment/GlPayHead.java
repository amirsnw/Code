/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package ir.tamin.incomeBank.model.centralPayment;

import com.fasterxml.jackson.annotation.JsonIgnore;
import ir.tamin.incomeBank.model.pension.enums.PensionPayModelEnum;
import ir.tamin.incomeBank.util.DateUtils;
import java.io.Serializable;
import java.math.BigDecimal;
import java.util.Calendar;
import java.util.Date;
import java.util.List;
import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.NamedQueries;
import javax.persistence.NamedQuery;
import javax.persistence.OneToMany;
import javax.persistence.Table;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;
import javax.persistence.Transient;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;
import javax.xml.bind.annotation.XmlTransient;

/**
 *
 * @author s_maknooni
 */
@Entity
@Table(name = "GL_PAY_HEAD")

@NamedQueries({
    @NamedQuery(name = "GlPayHead.findByVoucherHeaderId", query = "select t from GlPayHead t where t.vocherHeaderId = :voucherHeaderId ")
    ,
    @NamedQuery(name = "GlPayHead.findPayHeadID", query = "select t.payHeadId from GlPayHead t where t.checkNo = :checkNo and t.system.systemId = :systemTypeId ")
    ,
    @NamedQuery(name = "GlPayHead.getAllTempDocHeadList", query = "select t from GlPayHead t where t.payStep = :payStep ")
})

public class GlPayHead implements Serializable {

    private static final long serialVersionUID = 1L;
    @Id
    @NotNull
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @Column(name = "PAY_HEAD_ID")
    private BigDecimal payHeadId;
    @NotNull
    @Column(name = "FROM_DATE")
    @Temporal(TemporalType.TIMESTAMP)
    private Date fromDate;
    @NotNull
    @Column(name = "TO_DATE")
    @Temporal(TemporalType.TIMESTAMP)
    private Date toDate;
    @NotNull
    @Column(name = "CREATE_DATE")
    @Temporal(TemporalType.TIMESTAMP)
    private Date createDate;
    @NotNull // It's nullable in db because of converted record
    @Size(min = 1, max = 10)
    @Column(name = "CREATE_USER")
    private String createUser;
    @NotNull
    @Column(name = "PAY_STEP")
    private Character payStep;
    @Size(max = 10)
    @Column(name = "CHECK_NO")
    private String checkNo;
    @Column(name = "CHECK_DATE")
    @Temporal(TemporalType.TIMESTAMP)
    private Date checkDate;
    @Column(name = "UPDATE_DATE")
    @Temporal(TemporalType.TIMESTAMP)
    private Date updateDate;
    @Size(min = 1, max = 10)
    @Column(name = "UPDATE_USER")
    private String updateUser;
    @Column(name = "PAY_TYPE")
    private String payType;
    @JsonIgnore
    @OneToMany(cascade = CascadeType.ALL, mappedBy = "payHead")
    private List<GlPayDetail> payDetailList;

    @JoinColumn(name = "SYSTEM_TYPE_ID", referencedColumnName = "SYSTEM_TYPE_ID")
    @ManyToOne(optional = false)
    private GlSystemType system;
    //
    @Column(name = "BANK_CODE")
    private String bankCode;

    @Column(name = "(select BANKNAME from baseinfo.TB_BANK b where b.BANKCODE = BANK_CODE )", updatable = false, insertable = false)
    private String bankName;

//    @Column(name = "USER_SIGNATURE")
//    private String userSignature;
//
//    @Column(name = "RIGHTELRETURNID")
//    private String rightelReturnId;
    @Column(name = "LIST_DESC")
    private String listDescription;

    @JoinColumn(name = "SUB_SYSTEM_ID", referencedColumnName = "SUB_SYSTEM_ID")
    @ManyToOne(optional = false)
    private GlSubsystemType subSystem;

    //------For GL-------
    @Column(name = "VOCHER_HEADER_ID")
    private Long vocherHeaderId;

    //------For GL-------
    @Transient
    private Long payAmmount;
    @Transient
    private Long fromDateTimeStamp;
    @Transient
    private Long toDateTimeStamp;

    @Transient
    String strCreateDate;

    @Transient
    String strUpdateDate;

    @Transient
    String strCreateUser;

    @Transient
    String strUpdateUser;

    public GlPayHead() {
    }

    public GlPayHead(BigDecimal payHeadId) {
        this.payHeadId = payHeadId;
    }

    public BigDecimal getPayHeadId() {
        return payHeadId;
    }

    public void setPayHeadId(BigDecimal payHeadId) {
        this.payHeadId = payHeadId;
    }

    public Date getFromDate() {
        return fromDate;
    }

    public void setFromDate(Date fromDate) {
        this.fromDate = fromDate;
    }

    public Date getToDate() {
        return toDate;
    }

    public void setToDate(Date toDate) {
        this.toDate = toDate;
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

    public Character getPayStep() {
        return payStep;
    }

    public void setPayStep(Character payStep) {
        this.payStep = payStep;
    }

    public String getCheckNo() {
        return checkNo;
    }

    public void setCheckNo(String checkNo) {
        this.checkNo = checkNo;
    }

    public Date getCheckDate() {
        return checkDate;
    }

    public void setCheckDate(Date checkDate) {
        this.checkDate = checkDate;
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

    public Long getFromDateTimeStamp() {
        return fromDateTimeStamp;
    }

    @XmlTransient
    public List<GlPayDetail> getPayDetailList() {
        return payDetailList;
    }

    public void setPayDetailList(List<GlPayDetail> payDetailList) {
        this.payDetailList = payDetailList;
    }

    public void setFromDateTimeStamp(Long fromDateTimeStamp) {
        this.fromDateTimeStamp = fromDateTimeStamp;
    }

    public Long getToDateTimeStamp() {
        return toDateTimeStamp;
    }

    public void setToDateTimeStamp(Long toDateTimeStamp) {
        this.toDateTimeStamp = toDateTimeStamp;
    }

    public Long getPayAmmount() {
        return payAmmount;
    }

    public void setPayAmmount(Long payAmmount) {
        this.payAmmount = payAmmount;
    }

    public GlSystemType getSystem() {
        return system;
    }

    public void setSystem(GlSystemType system) {
        this.system = system;
    }

    public Long getVocherHeaderId() {
        return vocherHeaderId;
    }

    public void setVocherHeaderId(Long vocherHeaderId) {
        this.vocherHeaderId = vocherHeaderId;
    }

    public void setStrCreateDate(String strCreateDate) {
        this.strCreateDate = strCreateDate;
    }

    public void setStrUpdateDate(String strUpdateDate) {
        this.strUpdateDate = strUpdateDate;
    }

    public String getStrCreateDate() {
        if (createDate != null) {
            String date = DateUtils.getJalaliStandard(createDate, "/");

            Calendar calendar = Calendar.getInstance();
            calendar.setTime(createDate);
            int hours = calendar.get(Calendar.HOUR_OF_DAY);
            int minutes = calendar.get(Calendar.MINUTE);
            int seconds = calendar.get(Calendar.SECOND);

            String result = hours + ":" + minutes + ":" + seconds + " " + date;

            return result;
        } else {
            return null;
        }
    }

    public String getStrUpdateDate() {
        if (updateDate != null) {
            String date = DateUtils.getJalaliStandard(updateDate, "/");

            Calendar calendar = Calendar.getInstance();
            calendar.setTime(updateDate);
            int hours = calendar.get(Calendar.HOUR_OF_DAY);
            int minutes = calendar.get(Calendar.MINUTE);
            int seconds = calendar.get(Calendar.SECOND);

            String result = hours + ":" + minutes + ":" + seconds + " " + date;

            return result;
        } else {
            return null;
        }
    }

    public String getStrCreateUser() {
        return strCreateUser;
    }

    public void setStrCreateUser(String strCreateUser) {
        this.strCreateUser = strCreateUser;
    }

    public String getStrUpdateUser() {
        return strUpdateUser;
    }

    public void setStrUpdateUser(String strUpdateUser) {
        this.strUpdateUser = strUpdateUser;
    }

    public String getListDescription() {
        return listDescription;
    }

    public void setListDescription(String listDescription) {
        this.listDescription = listDescription;
    }

    public String getBankCode() {
        return bankCode;
    }

    public void setBankCode(String bankCode) {
        this.bankCode = bankCode;
    }

    public String getBankName() {
        if ("00".equals(this.bankCode)) { // بنیاد شهید برای مستمری
            return PensionPayModelEnum.BONYAD_SHAHID.getName();
        } else {
            return bankName;
        }
    }

    public void setBankName(String bankName) {
        this.bankName = bankName;
    }

    public GlSubsystemType getSubSystem() {
        return subSystem;
    }

    public void setSubSystem(GlSubsystemType subSystem) {
        this.subSystem = subSystem;
    }

    public void setPayType(String payType) {
        this.payType = payType;
    }

    public String getPayType() {
        return payType;
    }

}
