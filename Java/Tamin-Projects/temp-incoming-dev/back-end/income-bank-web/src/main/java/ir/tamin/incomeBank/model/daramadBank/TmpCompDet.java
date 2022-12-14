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
import ir.tamin.incomeBank.model.daramadBank.enums.RcvTypeEnum;

/**
 *
 * @author f_fotuhi
 */
@Entity
@Table(name = "VWTMPCOMPDET")

public class TmpCompDet implements Serializable {

    private static final long serialVersionUID = 1L;
    @EmbeddedId
    protected TmpCompDetPK tmpCompDetPK;
    @Column(name = "TMPCOMP_ROW")
    private Short tmpcompRow;
    @Column(name = "TMPCOMP_ORDPAY")
    private String tmpcompOrdpay;
    @Column(name = "TMPCOMP_DATE")
    private String tmpcompDate;
    @Column(name = "TMPCOMP_RCVTYPE")
    private String tmpcompRcvtype;
    @Column(name = "TMPCOMP_RCVNO")
    private String tmpcompRcvno;
    @Column(name = "TMPCOMP_RCVDATE")
    private String tmpcompRcvdate;
    @Column(name = "TMPCOMP_PRICE")
    private Long tmpcompPrice;
    @Column(name = "TMPCOMP_RWSHID")
    private String tmpcompRwshid;
    @Column(name = "TMPCOMP_MCTYPE")
    private String tmpcompMctype;
    @Column(name = "TMPCOMP_RADIF")
    private String tmpcompRadif;
    @Column(name = "TMPCOMP_MDATE")
    private String tmpcompMDate;
    @Column(name = "MASTCUSTNAME")
    private String mastcustname;

    @Transient
    private String pk;
    @Transient
    private Long sum;
    @Transient
    private String rcvTypeDesc;

    //nationality = NationalityEnum.find(nationality).getName();
    public TmpCompDet() {
    }

    public TmpCompDet(TmpCompDetPK tmpCompDetPK) {
        this.tmpCompDetPK = tmpCompDetPK;
    }

    public TmpCompDet(long tmpcompSeq, String brchCode) {
        this.tmpCompDetPK = new TmpCompDetPK(tmpcompSeq, brchCode);
    }

    public TmpCompDetPK getTmpCompDetPK() {
        return tmpCompDetPK;
    }

    public void setTmpCompDetPK(TmpCompDetPK tmpCompDetPK) {
        this.tmpCompDetPK = tmpCompDetPK;
    }

    public String getRcvTypeDesc() {
        String rcvType = RcvTypeEnum.find(tmpcompRcvtype).getName();
        return rcvType;
    }

    public void setRcvTypeDesc(String rcvTypeDesc) {
        this.rcvTypeDesc = rcvTypeDesc;
    }

    public Short getTmpcompRow() {
        return tmpcompRow;
    }

    public void setTmpcompRow(Short tmpcompRow) {
        this.tmpcompRow = tmpcompRow;
    }

    public String getTmpcompOrdpay() {
        return tmpcompOrdpay;
    }

    public void setTmpcompOrdpay(String tmpcompOrdpay) {
        this.tmpcompOrdpay = tmpcompOrdpay;
    }

    public String getTmpcompDate() {
        return tmpcompDate;
    }

    public void setTmpcompDate(String tmpcompDate) {
        this.tmpcompDate = tmpcompDate;
    }

    public String getTmpcompRcvtype() {
        return tmpcompRcvtype;
    }

    public void setTmpcompRcvtype(String tmpcompRcvtype) {
        this.tmpcompRcvtype = tmpcompRcvtype;
    }

    public String getTmpcompRcvno() {
        return tmpcompRcvno;
    }

    public void setTmpcompRcvno(String tmpcompRcvno) {
        this.tmpcompRcvno = tmpcompRcvno;
    }

    public String getTmpcompRcvdate() {
        return tmpcompRcvdate;
    }

    public void setTmpcompRcvdate(String tmpcompRcvdate) {
        this.tmpcompRcvdate = tmpcompRcvdate;
    }

    public Long getTmpcompPrice() {
        return tmpcompPrice;
    }

    public void setTmpcompPrice(Long tmpcompPrice) {
        this.tmpcompPrice = tmpcompPrice;
    }

    public String getTmpcompRwshid() {
        return tmpcompRwshid;
    }

    public void setTmpcompRwshid(String tmpcompRwshid) {
        this.tmpcompRwshid = tmpcompRwshid;
    }

    public String getTmpcompMctype() {
        return tmpcompMctype;
    }

    public void setTmpcompMctype(String tmpcompMctype) {
        this.tmpcompMctype = tmpcompMctype;
    }

    public String getTmpcompRadif() {
        return tmpcompRadif;
    }

    public void setTmpcompRadif(String tmpcompRadif) {
        this.tmpcompRadif = tmpcompRadif;
    }

    public String getTmpcompMDate() {
        return tmpcompMDate;
    }

    public void setTmpcompMDate(String tmpcompMDate) {
        this.tmpcompMDate = tmpcompMDate;
    }

    public String getMastcustname() {
        return mastcustname;
    }

    public void setMastcustname(String mastcustname) {
        this.mastcustname = mastcustname;
    }

    public String getPk() {
        return tmpCompDetPK.getBrchCode() + String.valueOf(tmpCompDetPK.getTmpcompSeq());
    }

    public void setPk(String pk) {
        this.pk = pk;
    }

    public Long getSum() {
        return sum;
    }

    public void setSum(Long sum) {
        this.sum = sum;
    }

}
