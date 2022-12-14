/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package ir.tamin.incomeBank.model.daramadBank;

import java.io.Serializable;
import java.math.BigInteger;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;
import javax.persistence.Transient;

/**
 *
 * @author f_fotuhi
 */
@Entity
@Table(name = "VWDRMD_COMPDET")

public class DrmdCompdet implements Serializable {

    private static final long serialVersionUID = 1L;

//    @EmbeddedId
//    protected DrmdCompdetPK drmdCompdetPK;
    @Id
    @Column(name = "PK")
    private String pk;
    @Column(name = "COMP_MDATE")
    private String compMdate;
    @Column(name = "COMP_ROW")
    private Short compRow;
    @Column(name = "CF_ROW")
    private Short cfRow;
    @Column(name = "CF_CODE")
    private String cfCode;
    @Column(name = "ACCOUNTDESC")
    private String accountdesc;
    @Column(name = "BANK_RADIF")
    private String bankRadif;
    @Column(name = "CF_DEBIT")
    private Long cfDebit;
    @Column(name = "CF_CREDIT")
    private Long cfCredit;
    @Column(name = "MOGH_RADIF")
    private BigInteger moghRadif;
    @Column(name = "BRCH_CODE")
    private String brchCode;

    @Transient
    private Long sumDebt;
    @Transient
    private Long sumCredit;
    @Transient
    private Long sumBankRcvPrice;
    @Transient
    private BigInteger sumMoghayerat;

    public DrmdCompdet() {
    }

    public String getCfCode() {
        return cfCode;
    }

    public void setCfCode(String cfCode) {
        this.cfCode = cfCode;
    }

    public String getAccountdesc() {
        return accountdesc;
    }

    public void setAccountdesc(String accountdesc) {
        this.accountdesc = accountdesc;
    }

    public Long getCfDebit() {
        return cfDebit;
    }

    public void setCfDebit(Long cfDebit) {
        this.cfDebit = cfDebit;
    }

    public Long getCfCredit() {
        return cfCredit;
    }

    public void setCfCredit(Long cfCredit) {
        this.cfCredit = cfCredit;
    }

    public BigInteger getMoghRadif() {
        return moghRadif;
    }

    public void setMoghRadif(BigInteger moghRadif) {
        this.moghRadif = moghRadif;
    }

    public String getCompMdate() {
        return compMdate;
    }

    public void setCompMdate(String compMdate) {
        this.compMdate = compMdate;
    }

    public Short getCompRow() {
        return compRow;
    }

    public void setCompRow(Short compRow) {
        this.compRow = compRow;
    }

    public Short getCfRow() {
        return cfRow;
    }

    public void setCfRow(Short cfRow) {
        this.cfRow = cfRow;
    }

    public String getBankRadif() {
        return bankRadif;
    }

    public void setBankRadif(String bankRadif) {
        this.bankRadif = bankRadif;
    }

    public String getBrchCode() {
        return brchCode;
    }

    public void setBrchCode(String brchCode) {
        this.brchCode = brchCode;
    }

    public String getPk() {
        return pk;
    }

    public void setPk(String pk) {
        this.pk = pk;
    }

    public Long getSumDebt() {
        return sumDebt;
    }

    public void setSumDebt(Long sumDebt) {
        this.sumDebt = sumDebt;
    }

    public Long getSumCredit() {
        return sumCredit;
    }

    public void setSumCredit(Long sumCredit) {
        this.sumCredit = sumCredit;
    }

    public BigInteger getSumMoghayerat() {
        return sumMoghayerat;
    }

    public void setSumMoghayerat(BigInteger sumMoghayerat) {
        this.sumMoghayerat = sumMoghayerat;
    }

    public Long getSumBankRcvPrice() {
        return sumBankRcvPrice;
    }

    public void setSumBankRcvPrice(Long sumBankRcvPrice) {
        this.sumBankRcvPrice = sumBankRcvPrice;
    }

}
