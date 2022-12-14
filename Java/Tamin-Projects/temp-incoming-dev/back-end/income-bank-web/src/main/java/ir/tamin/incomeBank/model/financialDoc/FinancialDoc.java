/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package ir.tamin.incomeBank.model.financialDoc;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;
import javax.xml.bind.annotation.XmlRootElement;
import java.io.Serializable;
import java.math.BigDecimal;

/**
 *
 * @author a_khalighi
 */

@Entity
@Table(name = "VWDRMD_ACC")
public class FinancialDoc implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @Column(name = "ROWID")
    private String rowId;

    @Column(name = "ACC_CODE")
    private String accountCode;

    @Column(name = "ACC_DESC")
    private String accountDesc;

    @Column(name = "BED_AMT")
    private BigDecimal debtAmount;

    @Column(name = "BES_AMT")
    private BigDecimal creditAmount;

    @Column(name = "DRMD_YY")
    private String daramadYear;

    @Column(name = "DRMD_MM")
    private String daramadMonth;

    @Column(name = "FLG_DOC")
    private String flagDocument;

    public static long getSerialVersionUID() {
        return serialVersionUID;
    }

    public String getAccountCode() {
        return accountCode;
    }

    public void setAccountCode(String accountCode) {
        this.accountCode = accountCode;
    }

    public String getAccountDesc() {
        return accountDesc;
    }

    public void setAccountDesc(String accountDesc) {
        this.accountDesc = accountDesc;
    }

    public BigDecimal getDebtAmount() {
        return debtAmount;
    }

    public void setDebtAmount(BigDecimal debtAmount) {
        this.debtAmount = debtAmount;
    }

    public BigDecimal getCreditAmount() {
        return creditAmount;
    }

    public void setCreditAmount(BigDecimal creditAmount) {
        this.creditAmount = creditAmount;
    }

    public String getFlagDocument() {
        return flagDocument;
    }

    public void setFlagDocument(String flagDocument) {
        this.flagDocument = flagDocument;
    }

    public String getDaramadYear() {
        return daramadYear;
    }

    public void setDaramadYear(String daramadYear) {
        this.daramadYear = daramadYear;
    }

    public String getDaramadMonth() {
        return daramadMonth;
    }

    public void setDaramadMonth(String daramadMonth) {
        this.daramadMonth = daramadMonth;
    }

    public String getRowId() {
        return rowId;
    }

    public void setRowId(String rowId) {
        this.rowId = rowId;
    }

    @Override
    public String toString() {
        return "FinancialDoc{" +
                "rowId='" + rowId + '\'' +
                ", accountCode='" + accountCode + '\'' +
                ", accountDesc='" + accountDesc + '\'' +
                ", debtAmount='" + debtAmount + '\'' +
                ", creditAmount='" + creditAmount + '\'' +
                ", daramadYear='" + daramadYear + '\'' +
                ", daramadMonth='" + daramadMonth + '\'' +
                ", flagDocument='" + flagDocument + '\'' +
                '}';
    }
}
