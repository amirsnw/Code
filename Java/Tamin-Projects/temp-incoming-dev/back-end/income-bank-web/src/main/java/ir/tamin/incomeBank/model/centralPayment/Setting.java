/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package ir.tamin.incomeBank.model.centralPayment;

import ir.tamin.incomeBank.util.DateUtils;
import java.io.Serializable;
import java.util.Calendar;
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
import javax.persistence.Transient;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;

/**
 *
 * @author s_maknooni
 */
@Entity
@Table(name = "GL_TB_SETTING")
public class Setting implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @Column(name = "TBS_ID")
    private Long settingId;
    @Column(name = "TBS_DESC")
    private String tbsDesc;
    @Column(name = "EP_MAX_VAL")
    private Long epMaxVal;
    @Column(name = "USER_SIGNATURE")
    private String userSignature;
    @NotNull
    @Column(name = "CREATE_DATE")
    @Temporal(TemporalType.TIMESTAMP)
    private Date createDate;
    @NotNull
    @Column(name = "CREATE_USER")
    private String createUser;
    @NotNull
    @Column(name = "UPDATE_DATE")
    @Temporal(TemporalType.TIMESTAMP)
    private Date updateDate;
    @NotNull
    @Column(name = "UPDATE_USER")
    private String updateUser;
    @Column(name = "RIGHTELRETURNID")
    private String rightelReturnId;
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
    String strCreateDate;

    @Transient
    String strUpdateDate;

    @Transient
    String strCreateUser;

    @Transient
    String strUpdateUser;

    public Setting() {
    }

    public Setting(SettingHis his, long settingId) {

        //   Long settingIdHis = his.getTbsId();
        String tbsDescHis = his.getTbsDesc();
        Long epMaxValHis = his.getEpMaxVal();
        String userSignatureHis = his.getUserSignature();
        Date createDateHis = his.getCreateDate();
        String createUserHis = his.getCreateUser();
        Date updateDateHis = his.getUpdateDate();
        String updateUserHis = his.getUpdateUser();
        String rightelReturnIdHis = his.getRightelreturnid();
        GlSystemType systemHis = his.getSystem();
        String x509Certificate = his.getX509certificate();
        String signEval = his.getSignEvaluation();
        String certChainValid = his.getCertChainValidation();
        String certOCSPValidation = his.getCertOcspValidation();
        String certCRLValidation = his.getCertCrlValidation();

        this.settingId = settingId;
        this.tbsDesc = tbsDescHis;
        this.epMaxVal = epMaxValHis;
        this.userSignature = userSignatureHis;
        this.createDate = createDateHis;
        this.createUser = createUserHis;
        this.updateDate = updateDateHis;
        this.updateUser = updateUserHis;
        this.rightelReturnId = rightelReturnIdHis;
        this.system = systemHis;
        this.x509certificate = x509Certificate;
        this.signEvaluation = signEval;
        this.certChainValidation = certChainValid;
        this.certOcspValidation = certOCSPValidation;
        this.certCrlValidation = certCRLValidation;
    }

    public Long getSettingId() {
        return settingId;
    }

    public void setSettingId(Long settingId) {
        this.settingId = settingId;
    }

    public String getTbsDesc() {
        return tbsDesc;
    }

    public void setTbsDesc(String tbsDesc) {
        this.tbsDesc = tbsDesc;
    }

    public Long getEpMaxVal() {
        return epMaxVal;
    }

    public void setEpMaxVal(Long epMaxVal) {
        this.epMaxVal = epMaxVal;
    }

    public String getUserSignature() {
        return userSignature;
    }

    public void setUserSignature(String userSignature) {
        this.userSignature = userSignature;
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

    public String getRightelReturnId() {
        return rightelReturnId;
    }

    public void setRightelReturnId(String rightelReturnId) {
        this.rightelReturnId = rightelReturnId;
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

    public void setStrCreateDate(String strCreateDate) {
        this.strCreateDate = strCreateDate;
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

    public void setStrUpdateDate(String strUpdateDate) {
        this.strUpdateDate = strUpdateDate;
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
