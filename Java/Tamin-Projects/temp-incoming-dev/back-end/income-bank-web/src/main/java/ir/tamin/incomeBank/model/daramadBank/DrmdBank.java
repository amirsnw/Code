/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package ir.tamin.incomeBank.model.daramadBank;

import ir.tamin.incomeBank.model.baseinfo.Bank;
import ir.tamin.incomeBank.model.baseinfo.BankBranch;
import java.io.Serializable;
import java.math.BigInteger;
import javax.persistence.Basic;
import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.EmbeddedId;
import javax.persistence.Entity;
import javax.persistence.JoinColumn;
import javax.persistence.JoinColumns;
import javax.persistence.ManyToOne;
import javax.persistence.Table;
import javax.persistence.Transient;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;

/**
 *
 * @author f_fotuhi
 */
@Entity
@Table(name = "DRMD_BANK")

public class DrmdBank implements Serializable {

    private static final long serialVersionUID = 1L;
    @EmbeddedId
    protected DrmdBankPK drmdBankPK;
    @Basic(optional = false)
    @NotNull
    @Size(min = 1, max = 2)
    @Column(name = "BANK_CODE")
    private String bankCode;
    @Basic(optional = false)
    @NotNull
    @Size(min = 1, max = 16)
    @Column(name = "BANK_CODESHOB")
    private String bankCodeshob;
    @Basic(optional = false)
    @NotNull
    @Size(min = 1, max = 20)
    @Column(name = "BANK_HESAB")
    private String bankHesab;
    @Size(max = 1)
    @Column(name = "BANK_RSTAT")
    private String bankRstat;
    @Size(max = 1)
    @Column(name = "BANK_TESTPRINT")
    private String bankTestprint;
    @Size(max = 20)
    @Column(name = "BANK_DESC")
    private String bankDesc;
    @Size(max = 2)
    @Column(name = "ACCOUNT")
    private String account;
    @Size(max = 1)
    @Column(name = "DISK_IMPORT")
    private String diskImport;
    @Column(name = "DISK_LENLINE")
    private BigInteger diskLenline;
    @Column(name = "DISK_LENTOKEN1")
    private BigInteger diskLentoken1;
    @Column(name = "DISK_LENTOKEN2")
    private BigInteger diskLentoken2;
    @Column(name = "DISK_LENTOKEN3")
    private BigInteger diskLentoken3;
    @Column(name = "DISK_LENTOKEN4")
    private BigInteger diskLentoken4;
    @Column(name = "DISK_LENTOKEN5")
    private BigInteger diskLentoken5;
    @Column(name = "DISK_LENTOKEN6")
    private BigInteger diskLentoken6;
    @Column(name = "DISK_LENTOKEN7")
    private BigInteger diskLentoken7;
    @Column(name = "DISK_LENTOKEN8")
    private BigInteger diskLentoken8;
    @Column(name = "DISK_LENTOKEN9")
    private BigInteger diskLentoken9;
    @Column(name = "DISK_LENTOKEN10")
    private BigInteger diskLentoken10;
    @Column(name = "DISK_LENTOKEN11")
    private BigInteger diskLentoken11;
    @Size(max = 6)
    @Column(name = "CODE_TAFSILI")
    private String codeTafsili;
    @Column(name = "DISK_IDXTOKEN1")
    private BigInteger diskIdxtoken1;
    @Column(name = "DISK_IDXTOKEN2")
    private BigInteger diskIdxtoken2;
    @Column(name = "DISK_IDXTOKEN3")
    private BigInteger diskIdxtoken3;
    @Column(name = "DISK_IDXTOKEN4")
    private BigInteger diskIdxtoken4;
    @Column(name = "DISK_IDXTOKEN5")
    private BigInteger diskIdxtoken5;
    @Column(name = "DISK_IDXTOKEN6")
    private BigInteger diskIdxtoken6;
    @Column(name = "DISK_IDXTOKEN7")
    private BigInteger diskIdxtoken7;
    @Column(name = "DISK_IDXTOKEN8")
    private BigInteger diskIdxtoken8;
    @Column(name = "DISK_IDXTOKEN9")
    private BigInteger diskIdxtoken9;
    @Column(name = "DISK_IDXTOKEN10")
    private BigInteger diskIdxtoken10;
    @Column(name = "DISK_IDXTOKEN11")
    private BigInteger diskIdxtoken11;

    
    @JoinColumn(name = "BANK_CODE", referencedColumnName = "BANKCODE",nullable = true, insertable = false, updatable = false)
    @ManyToOne(optional = true, cascade = {CascadeType.REFRESH})
    private Bank bank;

    @JoinColumns({
        @JoinColumn(name = "BANK_CODESHOB", referencedColumnName = "BNKBRHCODE",nullable = true, insertable = false, updatable = false),
        @JoinColumn(name = "BANK_CODE", referencedColumnName = "BANKCODE", insertable = false, updatable = false)
    })
    @ManyToOne(optional = true, cascade = {CascadeType.REFRESH})
    private BankBranch bankBranch;

//    @Column(name = "(select  d.BANKNAME  from baseinfo.tb_bank d where d.BANKCODE = BANK_CODE )", insertable = false, updatable = false)
//    private String bankName;
//
//    @Column(name = "(select  d.BNKBRHNAME  from baseinfo.tb_bnkbranch d where d.BANKCODE = BANK_CODE and d.BNKBRHCODE = BANK_CODESHOB )", insertable = false, updatable = false)
//    private String bankBranchName;
    @Transient
    private String bankInfoDesc;

    @Transient
    private String bankRadif;

    public DrmdBank() {
    }

    public DrmdBank(DrmdBankPK drmdBankPK) {
        this.drmdBankPK = drmdBankPK;
    }

    public DrmdBank(DrmdBankPK drmdBankPK, String bankCode, String bankCodeshob, String bankHesab) {
        this.drmdBankPK = drmdBankPK;
        this.bankCode = bankCode;
        this.bankCodeshob = bankCodeshob;
        this.bankHesab = bankHesab;
    }

    public DrmdBank(String bankRadif, String brchCode) {
        this.drmdBankPK = new DrmdBankPK(bankRadif, brchCode);
    }

    public Bank getBank() {
        return bank;
    }

    public void setBank(Bank bank) {
        this.bank = bank;
    }

    public BankBranch getBankBranch() {
        return bankBranch;
    }

    public void setBankBranch(BankBranch bankBranch) {
        this.bankBranch = bankBranch;
    }

    public DrmdBankPK getDrmdBankPK() {
        return drmdBankPK;
    }

    public void setDrmdBankPK(DrmdBankPK drmdBankPK) {
        this.drmdBankPK = drmdBankPK;
    }

    public String getBankCode() {
        return bankCode;
    }

    public void setBankCode(String bankCode) {
        this.bankCode = bankCode;
    }

    public String getBankCodeshob() {
        return bankCodeshob;
    }

    public void setBankCodeshob(String bankCodeshob) {
        this.bankCodeshob = bankCodeshob;
    }

    public String getBankHesab() {
        return bankHesab;
    }

    public void setBankHesab(String bankHesab) {
        this.bankHesab = bankHesab;
    }

    public String getBankRstat() {
        return bankRstat;
    }

    public void setBankRstat(String bankRstat) {
        this.bankRstat = bankRstat;
    }

    public String getBankTestprint() {
        return bankTestprint;
    }

    public void setBankTestprint(String bankTestprint) {
        this.bankTestprint = bankTestprint;
    }

    public String getBankDesc() {
        return bankDesc;
    }

    public void setBankDesc(String bankDesc) {
        this.bankDesc = bankDesc;
    }

    public String getAccount() {
        return account;
    }

    public void setAccount(String account) {
        this.account = account;
    }

    public String getDiskImport() {
        return diskImport;
    }

    public void setDiskImport(String diskImport) {
        this.diskImport = diskImport;
    }

    public BigInteger getDiskLenline() {
        return diskLenline;
    }

    public void setDiskLenline(BigInteger diskLenline) {
        this.diskLenline = diskLenline;
    }

    public BigInteger getDiskLentoken1() {
        return diskLentoken1;
    }

    public void setDiskLentoken1(BigInteger diskLentoken1) {
        this.diskLentoken1 = diskLentoken1;
    }

    public BigInteger getDiskLentoken2() {
        return diskLentoken2;
    }

    public void setDiskLentoken2(BigInteger diskLentoken2) {
        this.diskLentoken2 = diskLentoken2;
    }

    public BigInteger getDiskLentoken3() {
        return diskLentoken3;
    }

    public void setDiskLentoken3(BigInteger diskLentoken3) {
        this.diskLentoken3 = diskLentoken3;
    }

    public BigInteger getDiskLentoken4() {
        return diskLentoken4;
    }

    public void setDiskLentoken4(BigInteger diskLentoken4) {
        this.diskLentoken4 = diskLentoken4;
    }

    public BigInteger getDiskLentoken5() {
        return diskLentoken5;
    }

    public void setDiskLentoken5(BigInteger diskLentoken5) {
        this.diskLentoken5 = diskLentoken5;
    }

    public BigInteger getDiskLentoken6() {
        return diskLentoken6;
    }

    public void setDiskLentoken6(BigInteger diskLentoken6) {
        this.diskLentoken6 = diskLentoken6;
    }

    public BigInteger getDiskLentoken7() {
        return diskLentoken7;
    }

    public void setDiskLentoken7(BigInteger diskLentoken7) {
        this.diskLentoken7 = diskLentoken7;
    }

    public BigInteger getDiskLentoken8() {
        return diskLentoken8;
    }

    public void setDiskLentoken8(BigInteger diskLentoken8) {
        this.diskLentoken8 = diskLentoken8;
    }

    public BigInteger getDiskLentoken9() {
        return diskLentoken9;
    }

    public void setDiskLentoken9(BigInteger diskLentoken9) {
        this.diskLentoken9 = diskLentoken9;
    }

    public BigInteger getDiskLentoken10() {
        return diskLentoken10;
    }

    public void setDiskLentoken10(BigInteger diskLentoken10) {
        this.diskLentoken10 = diskLentoken10;
    }

    public BigInteger getDiskLentoken11() {
        return diskLentoken11;
    }

    public void setDiskLentoken11(BigInteger diskLentoken11) {
        this.diskLentoken11 = diskLentoken11;
    }

    public String getCodeTafsili() {
        return codeTafsili;
    }

    public void setCodeTafsili(String codeTafsili) {
        this.codeTafsili = codeTafsili;
    }

    public BigInteger getDiskIdxtoken1() {
        return diskIdxtoken1;
    }

    public void setDiskIdxtoken1(BigInteger diskIdxtoken1) {
        this.diskIdxtoken1 = diskIdxtoken1;
    }

    public BigInteger getDiskIdxtoken2() {
        return diskIdxtoken2;
    }

    public void setDiskIdxtoken2(BigInteger diskIdxtoken2) {
        this.diskIdxtoken2 = diskIdxtoken2;
    }

    public BigInteger getDiskIdxtoken3() {
        return diskIdxtoken3;
    }

    public void setDiskIdxtoken3(BigInteger diskIdxtoken3) {
        this.diskIdxtoken3 = diskIdxtoken3;
    }

    public BigInteger getDiskIdxtoken4() {
        return diskIdxtoken4;
    }

    public void setDiskIdxtoken4(BigInteger diskIdxtoken4) {
        this.diskIdxtoken4 = diskIdxtoken4;
    }

    public BigInteger getDiskIdxtoken5() {
        return diskIdxtoken5;
    }

    public void setDiskIdxtoken5(BigInteger diskIdxtoken5) {
        this.diskIdxtoken5 = diskIdxtoken5;
    }

    public BigInteger getDiskIdxtoken6() {
        return diskIdxtoken6;
    }

    public void setDiskIdxtoken6(BigInteger diskIdxtoken6) {
        this.diskIdxtoken6 = diskIdxtoken6;
    }

    public BigInteger getDiskIdxtoken7() {
        return diskIdxtoken7;
    }

    public void setDiskIdxtoken7(BigInteger diskIdxtoken7) {
        this.diskIdxtoken7 = diskIdxtoken7;
    }

    public BigInteger getDiskIdxtoken8() {
        return diskIdxtoken8;
    }

    public void setDiskIdxtoken8(BigInteger diskIdxtoken8) {
        this.diskIdxtoken8 = diskIdxtoken8;
    }

    public BigInteger getDiskIdxtoken9() {
        return diskIdxtoken9;
    }

    public void setDiskIdxtoken9(BigInteger diskIdxtoken9) {
        this.diskIdxtoken9 = diskIdxtoken9;
    }

    public BigInteger getDiskIdxtoken10() {
        return diskIdxtoken10;
    }

    public void setDiskIdxtoken10(BigInteger diskIdxtoken10) {
        this.diskIdxtoken10 = diskIdxtoken10;
    }

    public BigInteger getDiskIdxtoken11() {
        return diskIdxtoken11;
    }

    public void setDiskIdxtoken11(BigInteger diskIdxtoken11) {
        this.diskIdxtoken11 = diskIdxtoken11;
    }

//    public String getBankName() {
//        return bankName;
//    }
//
//    public void setBankName(String bankName) {
//        this.bankName = bankName;
//    }
//
//    public String getBankBranchName() {
//        return bankBranchName;
//    }
//
//    public void setBankBranchName(String bankBranchName) {
//        this.bankBranchName = bankBranchName;
//    }
    public String getBankRadif() {
        return drmdBankPK.getBankRadif();
    }

    public void setBankRadif(String bankRadif) {
        this.bankRadif = bankRadif;
    }

    public String getBankInfoDesc() {
        return bankHesab + "-" + drmdBankPK.getBankRadif() + "-" + bank.getBankName() + "-" + bankBranch.getBnkbrhname();
    }

    public void setBankInfoDesc(String bankInfoDesc) {
        this.bankInfoDesc = bankInfoDesc;
    }

}
