/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package ir.tamin.incomeBank.model.centralPayment;

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
import javax.validation.constraints.NotNull;

/**
 *
 * @author s_maknooni
 */
@Entity
@Table(name = "CP_BANK_ACCOUNT_CONTROL_HIS")
public class BankAccountControlHis implements Serializable {

    private static final long serialVersionUID = 1L;
    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @Column(name = "HIS_ID")
    private BigDecimal hisId;

    @JoinColumn(name = "MAIN_ID", referencedColumnName = "ID")
    @ManyToOne(optional = false)
    private BankAccountControl mainAccountControl;

    @Column(name = "BANK_CODE")
    private String bankCode;
    @NotNull
    @Column(name = "NATCODE")
    private String natcode;
    @Column(name = "RISUID")
    private String risuid;
    @Column(name = "NATIONALITY")
    private String nationality;
    @Column(name = "FIRST_NAME")
    private String firstName;
    @Column(name = "LAST_NAME")
    private String lastName;
    @Column(name = "ACCOUNT_NO")
    private String accountNo;
    @Column(name = "VALIDATION_RESULT")
    private String validationResult;
    @Column(name = "INVALIDATION_REASON")
    private String invalidationReason;
    @Column(name = "VALIDATION_DATE")
    @Temporal(TemporalType.TIMESTAMP)
    private Date validationDate;
    @JoinColumn(name = "VALIDTAE_BY_SUB_SYSTEM", referencedColumnName = "SUB_SYSTEM_ID")
    @ManyToOne(optional = false)
    private GlSubsystemType validateBySubSystem;
    @Column(name = "HIS_DATE")
    @Temporal(TemporalType.TIMESTAMP)
    private Date hisDate;

    public BigDecimal getHisId() {
        return hisId;
    }

    public void setHisId(BigDecimal hisId) {
        this.hisId = hisId;
    }

    public BankAccountControl getMainAccountControl() {
        return mainAccountControl;
    }

    public void setMainAccountControl(BankAccountControl mainAccountControl) {
        this.mainAccountControl = mainAccountControl;
    }

    public String getBankCode() {
        return bankCode;
    }

    public void setBankCode(String bankCode) {
        this.bankCode = bankCode;
    }

    public String getNatcode() {
        return natcode;
    }

    public void setNatcode(String natcode) {
        this.natcode = natcode;
    }

    public String getRisuid() {
        return risuid;
    }

    public void setRisuid(String risuid) {
        this.risuid = risuid;
    }

    public String getNationality() {
        return nationality;
    }

    public void setNationality(String nationality) {
        this.nationality = nationality;
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

    public String getAccountNo() {
        return accountNo;
    }

    public void setAccountNo(String accountNo) {
        this.accountNo = accountNo;
    }

    public String getValidationResult() {
        return validationResult;
    }

    public void setValidationResult(String validationResult) {
        this.validationResult = validationResult;
    }

    public String getInvalidationReason() {
        return invalidationReason;
    }

    public void setInvalidationReason(String invalidationReason) {
        this.invalidationReason = invalidationReason;
    }

    public Date getValidationDate() {
        return validationDate;
    }

    public void setValidationDate(Date validationDate) {
        this.validationDate = validationDate;
    }

    public GlSubsystemType getValidateBySubSystem() {
        return validateBySubSystem;
    }

    public void setValidateBySubSystem(GlSubsystemType validateBySubSystem) {
        this.validateBySubSystem = validateBySubSystem;
    }

    public Date getHisDate() {
        return hisDate;
    }

    public void setHisDate(Date hisDate) {
        this.hisDate = hisDate;
    }

}
