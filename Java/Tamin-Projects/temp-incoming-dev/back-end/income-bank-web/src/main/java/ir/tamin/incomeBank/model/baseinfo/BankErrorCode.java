/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package ir.tamin.incomeBank.model.baseinfo;

import java.io.Serializable;
import java.math.BigDecimal;
import java.util.Date;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;
import javax.persistence.Transient;
import javax.validation.constraints.NotNull;

/**
 *
 * @author f_fotuhi
 */
@Entity
@Table(name = "GL_BANK_ERROR_CODE")

public class BankErrorCode implements Serializable {

    public static final String ADAME_MOJUDI_ERROR_CODE = "105809006";

    private static final long serialVersionUID = 1L;
    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @NotNull
    @Column(name = "ERROR_ID")
    private BigDecimal errorId;
    @NotNull
    @Column(name = "BANK_CODE")
    private String bankCode;
    @NotNull
    @Column(name = "ERROR_CODE")
    private String errorCode;
    @NotNull
    @Column(name = "ERROR_DESC")
    private String errorDesc;
    @Column(name = "CREATE_USER")
    private String createUser;
    @Column(name = "CREATE_DATE")
    @Temporal(TemporalType.TIMESTAMP)
    private Date createDate;
    @Column(name = "UPDATE_USER")
    private String updateUser;
    @Column(name = "UPDATE_DATE")
    @Temporal(TemporalType.TIMESTAMP)
    private Date updateDate;

    @Transient
    String errorCodeDesc;

    @Transient
    String bankName;
    
    public BankErrorCode() {
    }

    public BankErrorCode(BigDecimal errorId) {
        this.errorId = errorId;
    }

    public BankErrorCode(BigDecimal errorId, String bankCode, String errorCode, String errorDesc) {
        this.errorId = errorId;
        this.bankCode = bankCode;
        this.errorCode = errorCode;
        this.errorDesc = errorDesc;
    }

    public BigDecimal getErrorId() {
        return errorId;
    }

    public void setErrorId(BigDecimal errorId) {
        this.errorId = errorId;
    }

    public String getBankCode() {
        return bankCode;
    }

    public void setBankCode(String bankCode) {
        this.bankCode = bankCode;
    }

    public String getErrorCode() {
        return errorCode;
    }

    public void setErrorCode(String errorCode) {
        this.errorCode = errorCode;
    }

    public String getErrorDesc() {
        return errorDesc;
    }

    public void setErrorDesc(String errorDesc) {
        this.errorDesc = errorDesc;
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

    public String getErrorCodeDesc() {
        return errorCodeDesc;
    }

    public void setErrorCodeDesc(String errorCodeDesc) {
        this.errorCodeDesc = errorCode + " " + errorDesc;
    }

    public String getBankName() {
        return OperationalBankEnum.getNameOf(bankCode);
    }

    public void setBankName(String bankName) {
        this.bankName = bankName;
    }

    
}
