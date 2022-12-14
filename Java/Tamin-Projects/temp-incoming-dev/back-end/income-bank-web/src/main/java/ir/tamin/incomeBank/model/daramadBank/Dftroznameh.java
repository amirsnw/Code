/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package ir.tamin.incomeBank.model.daramadBank;

import java.io.Serializable;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;
import javax.persistence.Transient;
import javax.validation.constraints.NotNull;

/**
 *
 * @author f_fotuhi
 */
@Entity
@Table(name = "VWDFTROZNAMEH")

public class Dftroznameh implements Serializable {

    private static final long serialVersionUID = 1L;
    @Column(name = "DOC_DAT")
    private String docDat;
    @NotNull
    @Id
    @Column(name = "ORD_ORDNO")
    private String ordOrdno;
    @NotNull
    @Column(name = "ORP_ORDROW")
    private String orpOrdrow;
    @Column(name = "PAY_ID")
    private String payId;
    @NotNull
    @Column(name = "MASTCUSTTYPE")
    private String mastcusttype;
    @Column(name = "MASTCUSTDESC")
    private String mastcustdesc;
    @Column(name = "PAY_IDGRD")
    private String payIdgrd;
    @Column(name = "ORD_DOCDAT")
    private String ordDocdat;
    @Column(name = "RCV_TYPE")
    private String rcvType;
    @Column(name = "RCV_DESC")
    private String rcvDesc;
    @NotNull
    @Column(name = "PAYKINDCODE")
    private String paykindcode;
    @Column(name = "ORP_STAT")
    private Character orpStat;
    @Column(name = "ORP_STATDATE")
    private String orpStatdate;
    @Column(name = "STAT_CODE")
    private Character statCode;
    @Column(name = "STAT_DESC")
    private String statDesc;
    @Column(name = "RCV_NO")
    private String rcvNo;
    @Column(name = "RCV_DATE")
    private String rcvDate;
    @Column(name = "ORP_PAYSEQAMT")
    private Long orpPayseqamt;
    @Column(name = "STARDATE")
    private String stardate;
    @Column(name = "VOSOL")
    private String vosol;
    @Column(name = "BRHCODE")
    private String brhcode;
    @Column(name = "ORD_MASTCUSTCODE")
    private String ordMastcustcode;
    @Column(name = "MASTCUSTNAME")
    private String mastcustname;
    @Column(name = "RET")
    private String ret;
    @Column(name = "SAND")
    private String sand;
    @Column(name = "NRCHEQREASONDESC")
    private String nrcheqreasondesc;
    @Column(name = "CHEQ_DESCRIP")
    private String cheqDescrip;
    @Column(name = "NRCHEQREASONCODE")
    private String nrcheqreasoncode;
    @Column(name = "BANK_RADIF")
    private String bankRadif;
    @Column(name = "USER_NAME")
    private String userName;
    @Column(name = "BRCH_CODE")
    private String brchCode;

    @Column(name = "(Select b.bankname from  baseinfo.tb_bank b Where b.bankcode='01')", insertable = false, updatable = false)

    private String bankBranchName;

    
    @Transient
    private String customerType;

    public String getCustomerType() {
        return this.mastcusttype + " - " + this.mastcustdesc;
    }
    
    public Dftroznameh() {
    }

    public String getDocDat() {
        return docDat;
    }

    public void setDocDat(String docDat) {
        this.docDat = docDat;
    }

    public String getOrdOrdno() {
        return ordOrdno;
    }

    public void setOrdOrdno(String ordOrdno) {
        this.ordOrdno = ordOrdno;
    }

    public String getOrpOrdrow() {
        return orpOrdrow;
    }

    public void setOrpOrdrow(String orpOrdrow) {
        this.orpOrdrow = orpOrdrow;
    }

    public String getPayId() {
        return payId;
    }

    public void setPayId(String payId) {
        this.payId = payId;
    }

    public String getMastcusttype() {
        return mastcusttype;
    }

    public void setMastcusttype(String mastcusttype) {
        this.mastcusttype = mastcusttype;
    }

    public String getMastcustdesc() {
        return mastcustdesc;
    }

    public void setMastcustdesc(String mastcustdesc) {
        this.mastcustdesc = mastcustdesc;
    }

    public String getPayIdgrd() {
        return payIdgrd;
    }

    public void setPayIdgrd(String payIdgrd) {
        this.payIdgrd = payIdgrd;
    }

    public String getOrdDocdat() {
        return ordDocdat;
    }

    public void setOrdDocdat(String ordDocdat) {
        this.ordDocdat = ordDocdat;
    }

    public String getRcvType() {
        return rcvType;
    }

    public void setRcvType(String rcvType) {
        this.rcvType = rcvType;
    }

    public String getRcvDesc() {
        return rcvDesc;
    }

    public void setRcvDesc(String rcvDesc) {
        this.rcvDesc = rcvDesc;
    }

    public String getPaykindcode() {
        return paykindcode;
    }

    public void setPaykindcode(String paykindcode) {
        this.paykindcode = paykindcode;
    }

    public Character getOrpStat() {
        return orpStat;
    }

    public void setOrpStat(Character orpStat) {
        this.orpStat = orpStat;
    }

    public String getOrpStatdate() {
        return orpStatdate;
    }

    public void setOrpStatdate(String orpStatdate) {
        this.orpStatdate = orpStatdate;
    }

    public Character getStatCode() {
        return statCode;
    }

    public void setStatCode(Character statCode) {
        this.statCode = statCode;
    }

    public String getStatDesc() {
        return statDesc;
    }

    public void setStatDesc(String statDesc) {
        this.statDesc = statDesc;
    }

    public String getRcvNo() {
        return rcvNo;
    }

    public void setRcvNo(String rcvNo) {
        this.rcvNo = rcvNo;
    }

    public String getRcvDate() {
        return rcvDate;
    }

    public void setRcvDate(String rcvDate) {
        this.rcvDate = rcvDate;
    }

    public Long getOrpPayseqamt() {
        return orpPayseqamt;
    }

    public void setOrpPayseqamt(Long orpPayseqamt) {
        this.orpPayseqamt = orpPayseqamt;
    }

    public String getStardate() {
        return stardate;
    }

    public void setStardate(String stardate) {
        this.stardate = stardate;
    }

    public String getVosol() {
        return vosol;
    }

    public void setVosol(String vosol) {
        this.vosol = vosol;
    }

    public String getBrhcode() {
        return brhcode;
    }

    public void setBrhcode(String brhcode) {
        this.brhcode = brhcode;
    }

    public String getOrdMastcustcode() {
        return ordMastcustcode;
    }

    public void setOrdMastcustcode(String ordMastcustcode) {
        this.ordMastcustcode = ordMastcustcode;
    }

    public String getMastcustname() {
        return mastcustname;
    }

    public void setMastcustname(String mastcustname) {
        this.mastcustname = mastcustname;
    }

    public String getRet() {
        return ret;
    }

    public void setRet(String ret) {
        this.ret = ret;
    }

    public String getSand() {
        return sand;
    }

    public void setSand(String sand) {
        this.sand = sand;
    }

    public String getNrcheqreasondesc() {
        return nrcheqreasondesc;
    }

    public void setNrcheqreasondesc(String nrcheqreasondesc) {
        this.nrcheqreasondesc = nrcheqreasondesc;
    }

    public String getCheqDescrip() {
        return cheqDescrip;
    }

    public void setCheqDescrip(String cheqDescrip) {
        this.cheqDescrip = cheqDescrip;
    }

    public String getNrcheqreasoncode() {
        return nrcheqreasoncode;
    }

    public void setNrcheqreasoncode(String nrcheqreasoncode) {
        this.nrcheqreasoncode = nrcheqreasoncode;
    }

    public String getBankRadif() {
        return bankRadif;
    }

    public void setBankRadif(String bankRadif) {
        this.bankRadif = bankRadif;
    }

    public String getUserName() {
        return userName;
    }

    public void setUserName(String userName) {
        this.userName = userName;
    }

    public String getBrchCode() {
        return brchCode;
    }

    public void setBrchCode(String brchCode) {
        this.brchCode = brchCode;
    }

    public String getBankBranchName() {
        return bankBranchName;
    }

    public void setBankBranchName(String bankBranchName) {
        this.bankBranchName = bankBranchName;
    }
}
