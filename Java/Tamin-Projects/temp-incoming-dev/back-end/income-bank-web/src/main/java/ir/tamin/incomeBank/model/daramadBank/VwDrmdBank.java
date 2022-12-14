/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package ir.tamin.incomeBank.model.daramadBank;

import java.io.Serializable;
import javax.persistence.Column;
import javax.persistence.EmbeddedId;
import javax.persistence.Entity;
import javax.persistence.Table;
import javax.persistence.Transient;
import javax.validation.constraints.NotNull;

/**
 *
 * @author h_riazat
 */
@Entity
@Table(name = "VWDRMDBANK")
public class VwDrmdBank implements Serializable {

    private static final long serialVersionUID = 1L;
    @EmbeddedId
    VwDrmdBankPK vwDrmdBankPK;
    @NotNull
    @Column(name = "BANK_RADIF")
    private String bankRadif;
    @NotNull
    @Column(name = "BANK_CODE")
    private String bankCode;
    @NotNull
    @Column(name = "BANK_CODESHOB")
    private String bankCodeShob;
    @NotNull
    @Column(name = "BANK_HESAB")
    private String bankHesab;
    @Column(name = "BANK_RSTAT")
    private String bankRstat;
    @Column(name = "BANK_DESC")
    private String bankDesc;
    @Column(name = "BANK_RSTATDESC")
    private String bankRstatDesc;
    @Column(name = "BANKNAME")
    private String bankName;
    @Column(name = "BNKBRHNAME")
    private String bnkBrhName;
    @Column(name = "BNKBRHADR")
    private String bnkBrhAdr;
    @NotNull
    @Column(name = "BRCH_CODE")
    private String brchCode;
    @Transient
    private String pk;

    public VwDrmdBank() {
    }

    public VwDrmdBank(String brchCode) {
        this.brchCode = brchCode;
    }

    public String getPK() {
        return vwDrmdBankPK.getBankRadif() + vwDrmdBankPK.getBrchCode();
    }

    public void setBankRadif(String bankRadif) {
        this.bankRadif = bankRadif;
    }

    public void setBankCode(String bankCode) {
        this.bankCode = bankCode;
    }

    public void setBankCodeShob(String bankCodeShob) {
        this.bankCodeShob = bankCodeShob;
    }

    public void setBankHesab(String bankHesab) {
        this.bankHesab = bankHesab;
    }

    public void setBankRstat(String bankRstat) {
        this.bankRstat = bankRstat;
    }

    public void setBankDesc(String bankDesc) {
        this.bankDesc = bankDesc;
    }

    public void setBankRstatDesc(String bankRstatDesc) {
        this.bankRstatDesc = bankRstatDesc;
    }

    public void setBankName(String bankName) {
        this.bankName = bankName;
    }

    public void setBnkBrhName(String bnkBrhName) {
        this.bnkBrhName = bnkBrhName;
    }

    public void setBnkBrhAdr(String bnkBrhAdr) {
        this.bnkBrhAdr = bnkBrhAdr;
    }

    public void setBrchCode(String brchCode) {
        this.brchCode = brchCode;
    }

    public static long getSerialVersionUID() {
        return serialVersionUID;
    }

    public String getBankRadif() {
        return bankRadif;
    }

    public String getBankCode() {
        return bankCode;
    }

    public String getBankCodeShob() {
        return bankCodeShob;
    }

    public String getBankHesab() {
        return bankHesab;
    }

    public String getBankRstat() {
        return bankRstat;
    }

    public String getBankDesc() {
        return bankDesc;
    }

    public String getBankRstatDesc() {
        return bankRstatDesc;
    }

    public String getBankName() {
        return bankName;
    }

    public String getBnkBrhName() {
        return bnkBrhName;
    }

    public String getBnkBrhAdr() {
        return bnkBrhAdr;
    }

    public String getBrchCode() {
        return brchCode;
    }

}
