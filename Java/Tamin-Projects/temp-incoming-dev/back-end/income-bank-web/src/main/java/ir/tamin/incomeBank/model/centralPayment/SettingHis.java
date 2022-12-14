/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package ir.tamin.incomeBank.model.centralPayment;

import ir.tamin.incomeBank.util.DateUtils;
import java.io.Serializable;
import java.math.BigDecimal;
import java.util.Calendar;
import java.util.Date;
import javax.persistence.Basic;
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
import javax.persistence.Transient;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;

/**
 *
 * @author f_fotuhi
 */
@Entity
@Table(name = "GL_TB_SETTING_HIS")

public class SettingHis implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @NotNull
    @Column(name = "TBS_HIS_ID")
    private BigDecimal tbsHisId;
    @NotNull
    @Column(name = "TBS_ID")
    private Long tbsId;
    @Column(name = "TBS_DESC")
    private String tbsDesc;
    @NotNull
    @Column(name = "EP_MAX_VAL")
    private long epMaxVal;
    @Column(name = "USER_SIGNATURE")
    private String userSignature;
    @NotNull
    @Column(name = "CREATE_USER")
    private String createUser;
    @Basic(optional = false)
    @NotNull
    @Column(name = "CREATE_DATE")
    @Temporal(TemporalType.TIMESTAMP)
    private Date createDate;
    @Basic(optional = false)
    @NotNull
    @Column(name = "UPDATE_USER")
    private String updateUser;
    @NotNull
    @Column(name = "UPDATE_DATE")
    @Temporal(TemporalType.TIMESTAMP)
    private Date updateDate;
    @Column(name = "RIGHTELRETURNID")
    private String rightelreturnid;
    @Column(name = "DELETE_USER")
    private String deleteUser;
    @Column(name = "DELETE_DATE")
    @Temporal(TemporalType.TIMESTAMP)
    private Date deleteDate;
    @Column(name = "BONYAD_ACCOUNT_NO")
    private String bonyadAccountNo;
    @Column(name = "BONYAD_BANK_BRCH_CODE")
    private String bonyadBankBrchCode;
    @Column(name = "BONYAD_BANK_BRCH_NAME")
    private String bonyadBankBrchName;
    @Size(max = 1500)
    @Column(name = "X509CERTIFICATE")
    private String x509certificate;
    @Size(max = 5)
    @Column(name = "SIGN_EVALUATION")
    private String signEvaluation;
    @Size(max = 5)
    @Column(name = "CERT_CHAIN_VALIDATION")
    private String certChainValidation;
    @Size(max = 5)
    @Column(name = "CERT_OCSP_VALIDATION")
    private String certOcspValidation;
    @Size(max = 5)
    @Column(name = "CERT_CRL_VALIDATION")
    private String certCrlValidation;

    @JoinColumn(name = "SYSTEM_TYPE_ID", referencedColumnName = "SYSTEM_TYPE_ID")
    @ManyToOne(optional = false)
    private GlSystemType system;

    @Transient
    String updateDateJalali;

    @Transient
    String deleteDateJalali;

    public SettingHis() {
    }

    public SettingHis(Setting oldSetting) {

        Long tbsIdHis = oldSetting.getSettingId();
        String tbsDescHis = oldSetting.getTbsDesc();
        long epMaxValHis = oldSetting.getEpMaxVal();
        String createUserHis = oldSetting.getCreateUser();
        Date createDateHis = oldSetting.getCreateDate();
        String updateUserHis = oldSetting.getUpdateUser();
        Date updateDateHis = oldSetting.getUpdateDate();
        String userSignatureHis = oldSetting.getUserSignature();
        GlSystemType systemType = oldSetting.getSystem();
        String rightelReturnIdHis = oldSetting.getRightelReturnId();
        String x509Certificate = oldSetting.getX509certificate();
        String signEval = oldSetting.getSignEvaluation();
        String certChainValid = oldSetting.getCertChainValidation();
        String certOCSPValidation = oldSetting.getCertOcspValidation();
        String certCRLValidation = oldSetting.getCertCrlValidation();

        this.tbsId = tbsIdHis;
        this.tbsDesc = tbsDescHis;
        this.epMaxVal = epMaxValHis;
        this.createUser = createUserHis;
        this.createDate = createDateHis;
        this.updateUser = updateUserHis;
        this.updateDate = updateDateHis;
        this.userSignature = userSignatureHis;
        this.rightelreturnid = rightelReturnIdHis;
        this.system = systemType;
        this.x509certificate = x509Certificate;
        this.signEvaluation = signEval;
        this.certChainValidation = certChainValid;
        this.certOcspValidation = certOCSPValidation;
        this.certCrlValidation = certCRLValidation;
    }

    public SettingHis(Setting oldSetting, Long systemId) {

        Long tbsIdHis = oldSetting.getSettingId();
        String tbsDescHis = oldSetting.getTbsDesc();
        String createUserHis = oldSetting.getCreateUser();
        Date createDateHis = oldSetting.getCreateDate();
        String updateUserHis = oldSetting.getUpdateUser();
        Date updateDateHis = oldSetting.getUpdateDate();
        GlSystemType systemType = oldSetting.getSystem();
        String bonyadAccNo = oldSetting.getBonyadAccountNo();
        String bonyadBankBranchCode = oldSetting.getBonyadBankBrchCode();
        String bonyadBankBranchName = oldSetting.getBonyadBankBrchName();
        String x509Certificate = oldSetting.getX509certificate();
        String signEval = oldSetting.getSignEvaluation();
        String certChainValid = oldSetting.getCertChainValidation();
        String certOCSPValidation = oldSetting.getCertOcspValidation();
        String certCRLValidation = oldSetting.getCertCrlValidation();

        this.tbsId = tbsIdHis;
        this.tbsDesc = tbsDescHis;
        this.createUser = createUserHis;
        this.createDate = createDateHis;
        this.updateUser = updateUserHis;
        this.updateDate = updateDateHis;
        this.system = systemType;
        this.bonyadAccountNo = bonyadAccNo;
        this.bonyadBankBrchCode = bonyadBankBranchCode;
        this.bonyadBankBrchName = bonyadBankBranchName;
        this.x509certificate = x509Certificate;
        this.signEvaluation = signEval;
        this.certChainValidation = certChainValid;
        this.certOcspValidation = certOCSPValidation;
        this.certCrlValidation = certCRLValidation;
    }

    public BigDecimal getTbsHisId() {
        return tbsHisId;
    }

    public void setTbsHisId(BigDecimal tbsHisId) {
        this.tbsHisId = tbsHisId;
    }

    public Long getTbsId() {
        return tbsId;
    }

    public String getTbsDesc() {
        return tbsDesc;
    }

    public void setTbsDesc(String tbsDesc) {
        this.tbsDesc = tbsDesc;
    }

    public long getEpMaxVal() {
        return epMaxVal;
    }

    public void setEpMaxVal(long epMaxVal) {
        this.epMaxVal = epMaxVal;
    }

    public String getUserSignature() {
        return userSignature;
    }

    public void setUserSignature(String userSignature) {
        this.userSignature = userSignature;
    }

    public String getCreateUser() {
        return createUser;
    }

    public void setCreateUser(String createUser) {
        this.createUser = createUser;
    }

    public Date getCreateDate() {
        return createDate;
    }

    public void setCreateDate(Date createDate) {
        this.createDate = createDate;
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

    public String getRightelreturnid() {
        return rightelreturnid;
    }

    public void setRightelreturnid(String rightelreturnid) {
        this.rightelreturnid = rightelreturnid;
    }

    public GlSystemType getSystem() {
        return system;
    }

    public void setSystem(GlSystemType system) {
        this.system = system;
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

    public String getUpdateDateJalali() {
        String date = DateUtils.getJalaliStandard(updateDate, "/");

        Calendar calendar = Calendar.getInstance();
        calendar.setTime(updateDate);
        int hours = calendar.get(Calendar.HOUR_OF_DAY);
        int minutes = calendar.get(Calendar.MINUTE);
        int seconds = calendar.get(Calendar.SECOND);

        String result = hours + ":" + minutes + ":" + seconds + " " + date;

        return result;
    }

    public void setUpdateDateJalali(String updateDateJalali) {
        this.updateDateJalali = updateDateJalali;
    }

    public String getDeleteDateJalali() {
        if (deleteDate != null) {
            String date = DateUtils.getJalaliStandard(deleteDate, "/");

            Calendar calendar = Calendar.getInstance();
            calendar.setTime(deleteDate);
            int hours = calendar.get(Calendar.HOUR_OF_DAY);
            int minutes = calendar.get(Calendar.MINUTE);
            int seconds = calendar.get(Calendar.SECOND);

            String result = hours + ":" + minutes + ":" + seconds + " " + date;

            return result;
        } else {
            return null;
        }
    }

    public void setDeleteDateJalali(String deleteDateJalali) {
        this.deleteDateJalali = deleteDateJalali;
    }

    public String getBonyadAccountNo() {
        return bonyadAccountNo;
    }

    public void setBonyadAccountNo(String bonyadAccountNo) {
        this.bonyadAccountNo = bonyadAccountNo;
    }

    public String getBonyadBankBrchCode() {
        return bonyadBankBrchCode;
    }

    public void setBonyadBankBrchCode(String bonyadBankBrchCode) {
        this.bonyadBankBrchCode = bonyadBankBrchCode;
    }

    public String getBonyadBankBrchName() {
        return bonyadBankBrchName;
    }

    public void setBonyadBankBrchName(String bonyadBankBrchName) {
        this.bonyadBankBrchName = bonyadBankBrchName;
    }

    public String getX509certificate() {
        return x509certificate;
    }

    public void setX509certificate(String x509certificate) {
        this.x509certificate = x509certificate;
    }

    public String getSignEvaluation() {
        return signEvaluation;
    }

    public void setSignEvaluation(String signEvaluation) {
        this.signEvaluation = signEvaluation;
    }

    public String getCertChainValidation() {
        return certChainValidation;
    }

    public void setCertChainValidation(String certChainValidation) {
        this.certChainValidation = certChainValidation;
    }

    public String getCertOcspValidation() {
        return certOcspValidation;
    }

    public void setCertOcspValidation(String certOcspValidation) {
        this.certOcspValidation = certOcspValidation;
    }

    public String getCertCrlValidation() {
        return certCrlValidation;
    }

    public void setCertCrlValidation(String certCrlValidation) {
        this.certCrlValidation = certCrlValidation;
    }

}
