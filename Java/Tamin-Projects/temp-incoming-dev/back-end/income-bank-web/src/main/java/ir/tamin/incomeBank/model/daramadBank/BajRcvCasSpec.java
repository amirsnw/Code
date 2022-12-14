/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package ir.tamin.incomeBank.model.daramadBank;

import com.fasterxml.jackson.annotation.JsonBackReference;
import java.io.Serializable;
import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.EmbeddedId;
import javax.persistence.Entity;
import javax.persistence.JoinColumn;
import javax.persistence.JoinColumns;
import javax.persistence.OneToOne;
import javax.persistence.Table;

/**
 *
 * @author m_salami
 */
@Entity
@Table(name = "BAJ_RCVCASSPEC")
public class BajRcvCasSpec implements Serializable {

    private static final long serialVersionUID = 1L;
    @EmbeddedId
    private BajRcvCasSpecPK bajRcvCasSpecPk;
    @Column(name = "BANKCODE")
    private String bankCode;
    @Column(name = "BNKBRHCODE")
    private String bnkBrhCode;
    @Column(name = "RCS_RCVCASDAT")
    private String rcsRcvCasDat;
    @Column(name = "RCS_RCVCASNO")
    private String rcsRcvCasNo;
    @Column(name = "RCS_RCVACCNO")
    private String rcsRcvAccNo;
    @Column(name = "RCS_CASAMT")
    private Long rcsCasAmt;
    @Column(name = "CREATEUID")
    private String createUid;
    @Column(name = "CREATEDT")
    private String createDt;

    @JsonBackReference
    @JoinColumns({
        @JoinColumn(name = "ORD_ORDNO", referencedColumnName = "ORD_ORDNO", insertable = false, updatable = false),
        @JoinColumn(name = "ORP_ORDROW", referencedColumnName = "ORP_ORDROW", insertable = false, updatable = false),
        @JoinColumn(name = "BRCH_CODE", referencedColumnName = "BRCH_CODE", insertable = false, updatable = false)
    })
    @OneToOne(optional = false, cascade = {CascadeType.REFRESH})
    private ClmOrdpay clmOrdpay;

    public BajRcvCasSpec() {
    }

    public BajRcvCasSpecPK getBajRcvCasSpecPk() {
        return bajRcvCasSpecPk;
    }

    public void setBajRcvCasSpecPk(BajRcvCasSpecPK bajRcvCasSpecPk) {
        this.bajRcvCasSpecPk = bajRcvCasSpecPk;
    }

    public String getBankCode() {
        return bankCode;
    }

    public void setBankCode(String bankCode) {
        this.bankCode = bankCode;
    }

    public String getBnkBrhCode() {
        return bnkBrhCode;
    }

    public void setBnkBrhCode(String bnkBrhCode) {
        this.bnkBrhCode = bnkBrhCode;
    }

    public String getRcsRcvCasDat() {
        return rcsRcvCasDat;
    }

    public void setRcsRcvCasDat(String rcsRcvCasDat) {
        this.rcsRcvCasDat = rcsRcvCasDat;
    }

    public String getRcsRcvCasNo() {
        return rcsRcvCasNo;
    }

    public void setRcsRcvCasNo(String rcsRcvCasNo) {
        this.rcsRcvCasNo = rcsRcvCasNo;
    }

    public String getRcsRcvAccNo() {
        return rcsRcvAccNo;
    }

    public void setRcsRcvAccNo(String rcsRcvAccNo) {
        this.rcsRcvAccNo = rcsRcvAccNo;
    }

    public Long getRcsCasAmt() {
        return rcsCasAmt;
    }

    public void setRcsCasAmt(Long rcsCasAmt) {
        this.rcsCasAmt = rcsCasAmt;
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

    public ClmOrdpay getClmOrdpay() {
        return clmOrdpay;
    }

    public void setClmOrdpay(ClmOrdpay clmOrdpay) {
        this.clmOrdpay = clmOrdpay;
    }

}
