/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package ir.tamin.incomeBank.model.daramadBank;

import java.io.Serializable;
import java.math.BigDecimal;
import javax.persistence.Basic;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;
import javax.xml.bind.annotation.XmlRootElement;

/**
 *
 * @author m_salami
 */
@Entity
@Table(name = "BAJ_BLDSPEC")
@XmlRootElement
public class BajBldSpec implements Serializable {
    // @Max(value=?)  @Min(value=?)//if you know range of your decimal fields consider using these annotations to enforce field validation
    @Column(name = "BLD_SQR")
    private BigDecimal bldSqr;
    @Column(name = "BLD_RATE")
    private BigDecimal bldRate;

    private static final long serialVersionUID = 1L;
    @Id
    @Basic(optional = false)
    @NotNull
    @Column(name = "RWSHID")
    private String rwshid;
    @Size(max = 13)
    @Column(name = "CWS_DBTNO")
    private String cwsDbtno;
    @Size(max = 4)
    @Column(name = "CITYCODE")
    private String cityCode;
    @NotNull
    @Size(max = 2)
    @Column(name = "BLDOWNTYPECODE")
    private String bldownTypeCode;
    @Size(max = 50)
    @Column(name = "BLD_MANG")
    private String bldMang;
    @Size(max = 500)
    @Column(name = "BLD_ADRS")
    private String bldAdrs;
    @NotNull
    @Size(max = 12)
    @Column(name = "BLD_PLAK")
    private String bldPlak;
    @Size(max = 12)
    @Column(name = "BLD_PARV")
    private String bldParv;
    @Size(max = 8)
    @Column(name = "BLD_PRDATE")
    private String bldPrDate;
    @Size(max = 8)
    @Column(name = "BLD_PSDATE")
    private String bldPsDate;
    @Size(max = 8)
    @Column(name = "BLD_PEDATE")
    private String bldPeDate;
    @Size(max = 8)
    @Column(name = "BLD_NDATE")
    private String bldNDate;
    @Size(max = 200)
    @Column(name = "BLD_REMARK")
    private String bldRemark;
    @NotNull
    @Size(max = 20)
    @Column(name = "CREATEUID")
    private String createUid;
    @NotNull
    @Size(max = 7)
    @Column(name = "CREATEDT")
    private String createDt;
    @Column(name = "TOT_PAY")
    private Long totPay;
    @Column(name = "BLD_PRICE")
    private Long bldPrice;
    @Column(name = "BLD_TYP")
    private Character bldTyp;
    @Column(name = "BLD_UNI")
    private Short bldUni;
    @Column(name = "TOT_PAY2")
    private Long totPay2;
    @Size(max = 10)
    @Column(name = "RWSHIDOLD")
    private String rwshidold;
    @Size(max = 100)
    @Column(name = "BLD_CITYHALL")
    private String bldCityHall;
    @Size(max = 10)
    @Column(name = "BLD_IDNO")
    private String bldIdNo;
    @Column(name = "BLD_AVAREZ")
    private Long bldAvarez;
    @Size(max = 12)
    @Column(name = "BLD_LETNO")
    private String bldLetNo;
    @Size(max = 8)
    @Column(name = "BLD_LETDAT")
    private String bldLetDat;
    @Size(max = 4)
    @Column(name = "BRCH_CODE")
    private String brchCode;

    public BajBldSpec() {
    }

    public String getRwshid() {
        return rwshid;
    }

    public void setRwshid(String rwshid) {
        this.rwshid = rwshid;
    }

    public String getCwsDbtno() {
        return cwsDbtno;
    }

    public void setCwsDbtno(String cwsDbtno) {
        this.cwsDbtno = cwsDbtno;
    }

    public String getCityCode() {
        return cityCode;
    }

    public void setCityCode(String cityCode) {
        this.cityCode = cityCode;
    }

    public String getBldownTypeCode() {
        return bldownTypeCode;
    }

    public void setBldownTypeCode(String bldownTypeCode) {
        this.bldownTypeCode = bldownTypeCode;
    }

    public String getBldMang() {
        return bldMang;
    }

    public void setBldMang(String bldMang) {
        this.bldMang = bldMang;
    }

    public String getBldAdrs() {
        return bldAdrs;
    }

    public void setBldAdrs(String bldAdrs) {
        this.bldAdrs = bldAdrs;
    }

    public String getBldPlak() {
        return bldPlak;
    }

    public void setBldPlak(String bldPlak) {
        this.bldPlak = bldPlak;
    }

    public String getBldParv() {
        return bldParv;
    }

    public void setBldParv(String bldParv) {
        this.bldParv = bldParv;
    }

    public String getBldPrDate() {
        return bldPrDate;
    }

    public void setBldPrDate(String bldPrDate) {
        this.bldPrDate = bldPrDate;
    }

    public String getBldPsDate() {
        return bldPsDate;
    }

    public void setBldPsDate(String bldPsDate) {
        this.bldPsDate = bldPsDate;
    }

    public String getBldPeDate() {
        return bldPeDate;
    }

    public void setBldPeDate(String bldPeDate) {
        this.bldPeDate = bldPeDate;
    }

    public String getBldNDate() {
        return bldNDate;
    }

    public void setBldNDate(String bldNDate) {
        this.bldNDate = bldNDate;
    }

    public String getBldRemark() {
        return bldRemark;
    }

    public void setBldRemark(String bldRemark) {
        this.bldRemark = bldRemark;
    }

    public String getCreateUid() {
        return createUid;
    }

    public void setCreateUid(String createUid) {
        this.createUid = createUid;
    }

    public String getCreateDt() {
        return createDt;
    }

    public void setCreateDt(String createDt) {
        this.createDt = createDt;
    }

    public Long getTotPay() {
        return totPay;
    }

    public void setTotPay(Long totPay) {
        this.totPay = totPay;
    }

    public Long getBldPrice() {
        return bldPrice;
    }

    public void setBldPrice(Long bldPrice) {
        this.bldPrice = bldPrice;
    }

    public Character getBldTyp() {
        return bldTyp;
    }

    public void setBldTyp(Character bldTyp) {
        this.bldTyp = bldTyp;
    }

    public Short getBldUni() {
        return bldUni;
    }

    public void setBldUni(Short bldUni) {
        this.bldUni = bldUni;
    }

    public Long getTotPay2() {
        return totPay2;
    }

    public void setTotPay2(Long totPay2) {
        this.totPay2 = totPay2;
    }

    public String getRwshidold() {
        return rwshidold;
    }

    public void setRwshidold(String rwshidold) {
        this.rwshidold = rwshidold;
    }

    public String getBldCityHall() {
        return bldCityHall;
    }

    
    
    public void setBldCityHall(String bldCityHall) {
        this.bldCityHall = bldCityHall;
    }

    public String getBldIdNo() {
        return bldIdNo;
    }

    public void setBldIdNo(String bldIdNo) {
        this.bldIdNo = bldIdNo;
    }

    public Long getBldAvarez() {
        return bldAvarez;
    }

    public void setBldAvarez(Long bldAvarez) {
        this.bldAvarez = bldAvarez;
    }

    public String getBldLetNo() {
        return bldLetNo;
    }

    public void setBldLetNo(String bldLetNo) {
        this.bldLetNo = bldLetNo;
    }

    public String getBldLetDat() {
        return bldLetDat;
    }

    public void setBldLetDat(String bldLetDat) {
        this.bldLetDat = bldLetDat;
    }

    public String getBrchCode() {
        return brchCode;
    }

    public void setBrchCode(String brchCode) {
        this.brchCode = brchCode;
    }

    public BigDecimal getBldSqr() {
        return bldSqr;
    }

    public void setBldSqr(BigDecimal bldSqr) {
        this.bldSqr = bldSqr;
    }

    public BigDecimal getBldRate() {
        return bldRate;
    }

    public void setBldRate(BigDecimal bldRate) {
        this.bldRate = bldRate;
    }
    
    
}
