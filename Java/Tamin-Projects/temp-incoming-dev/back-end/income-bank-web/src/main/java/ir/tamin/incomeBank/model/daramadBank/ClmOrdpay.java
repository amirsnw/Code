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
import javax.validation.constraints.NotNull;

/**
 *
 * @author m_salami
 */
@Entity
@Table(name = "CLM_ORDPAY")
public class ClmOrdpay implements Serializable {

    private static final long serialVersionUID = 1L;
    @EmbeddedId
    private ClmOrdpayPK clmOrdpayPK;
    @NotNull
    @Column(name = "PAYKINDCODE")
    private String paykindcode;
    @Column(name = "ORP_PAYSEQAMT")
    private Long orpPayseqamt;
    @Column(name = "ORP_PAYSEQDATE")
    private String orpPayseqdate;
    @Column(name = "ORP_STAT")
    private Character orpStat;
    @Column(name = "ORP_STATDATE")
    private String orpStatdate;
    @Column(name = "ORP_CARDDATE")
    private String orpCarddate;
    @Column(name = "DELETEUID")
    private String deleteuid;
    @Column(name = "ORP_PRNSTAT")
    private String orpPrnstat;
//    @NotNull
//    @Column(name = "ORP_ORDROW")
//    private String orpOrdrow;

    @JsonBackReference
    @JoinColumns({
        @JoinColumn(name = "ORD_ORDNO", referencedColumnName = "ORD_ORDNO", insertable = false, updatable = false),
        @JoinColumn(name = "BRCH_CODE", referencedColumnName = "BRCH_CODE", insertable = false, updatable = false)
    })
    @OneToOne(optional = false)
    private ClmOrder clmOrder;
    @OneToOne(cascade = CascadeType.ALL, mappedBy = "clmOrdpay")
    private BajRcvchqspec bajRcvchqspec;
    @OneToOne(cascade = CascadeType.ALL, mappedBy = "clmOrdpay")
    private BajRcvtrfspec bajRcvtrfspec;
    @OneToOne(cascade = CascadeType.ALL, mappedBy = "clmOrdpay")
    private BajRcvCasSpec bajRcvCasSpec;

    public ClmOrdpay() {
    }

    public ClmOrdpay(ClmOrdpayPK clmOrdpayPK) {
        this.clmOrdpayPK = clmOrdpayPK;
    }

    public ClmOrdpay(ClmOrdpayPK clmOrdpayPK, String paykindcode) {
        this.clmOrdpayPK = clmOrdpayPK;
        this.paykindcode = paykindcode;
    }

//    public String getOrpOrdrow() {
//        return orpOrdrow;
//    }
//
//    public void setOrpOrdrow(String orpOrdrow) {
//        this.orpOrdrow = orpOrdrow;
//    }
    
    public ClmOrdpay(String ordOrdno, String orpOrdrow, String brchCode) {
        this.clmOrdpayPK = new ClmOrdpayPK(ordOrdno, orpOrdrow, brchCode);
    }

    public ClmOrdpayPK getClmOrdpayPK() {
        return clmOrdpayPK;
    }

    public void setClmOrdpayPK(ClmOrdpayPK clmOrdpayPK) {
        this.clmOrdpayPK = clmOrdpayPK;
    }

    public String getPaykindcode() {
        return paykindcode;
    }

    public void setPaykindcode(String paykindcode) {
        this.paykindcode = paykindcode;
    }

    public Long getOrpPayseqamt() {
        return orpPayseqamt;
    }

    public void setOrpPayseqamt(Long orpPayseqamt) {
        this.orpPayseqamt = orpPayseqamt;
    }

    public String getOrpPayseqdate() {
        return orpPayseqdate;
    }

    public void setOrpPayseqdate(String orpPayseqdate) {
        this.orpPayseqdate = orpPayseqdate;
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

    public String getOrpCarddate() {
        return orpCarddate;
    }

    public void setOrpCarddate(String orpCarddate) {
        this.orpCarddate = orpCarddate;
    }

    public String getDeleteuid() {
        return deleteuid;
    }

    public void setDeleteuid(String deleteuid) {
        this.deleteuid = deleteuid;
    }

    public String getOrpPrnstat() {
        return orpPrnstat;
    }

    public void setOrpPrnstat(String orpPrnstat) {
        this.orpPrnstat = orpPrnstat;
    }

    public ClmOrder getClmOrder() {
        return clmOrder;
    }

    public void setClmOrder(ClmOrder clmOrder) {
        this.clmOrder = clmOrder;
    }

    public BajRcvchqspec getBajRcvchqspec() {
        return bajRcvchqspec;
    }

    public void setBajRcvchqspec(BajRcvchqspec bajRcvchqspec) {
        this.bajRcvchqspec = bajRcvchqspec;
    }

    public BajRcvtrfspec getBajRcvtrfspec() {
        return bajRcvtrfspec;
    }

    public void setBajRcvtrfspec(BajRcvtrfspec bajRcvtrfspec) {
        this.bajRcvtrfspec = bajRcvtrfspec;
    }

    public BajRcvCasSpec getBajRcvCasSpec() {
        return bajRcvCasSpec;
    }

    public void setBajRcvCasSpec(BajRcvCasSpec bajRcvCasSpec) {
        this.bajRcvCasSpec = bajRcvCasSpec;
    }

}
