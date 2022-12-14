/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package ir.tamin.incomeBank.model.daramadBank;

import com.fasterxml.jackson.annotation.JsonBackReference;
import java.io.Serializable;
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
@Table(name = "BAJ_RCVTRFSPEC")
public class BajRcvtrfspec implements Serializable {

    private static final long serialVersionUID = 1L;
    @EmbeddedId
    private BajRcvtrfspecPK bajRcvtrfspecPK;
    @Column(name = "BANKCODE")
    private String bankcode;
    @Column(name = "BNKBRHCODE")
    private String bnkbrhcode;
    @Column(name = "RTS_RCVTRFDAT")
    private String rtsRcvtrfdat;
    @NotNull
    @Column(name = "RTS_RCVTRFAMT")
    private long rtsRcvtrfamt;
    @NotNull
    @Column(name = "RTS_TRFNO")
    private String rtsTrfno;
    @NotNull
    @Column(name = "RTS_TRDDAT")
    private String rtsTrddat;
    @NotNull
    @Column(name = "RTS_BUYTRFNO")
    private String rtsBuytrfno;
    @NotNull
    @Column(name = "RTS_BUYTRFDAT")
    private String rtsBuytrfdat;
    @NotNull
    @Column(name = "RTS_BUYTRFAMT")
    private long rtsBuytrfamt;
    @Column(name = "RTS_RCVSUBAMT")
    private Long rtsRcvsubamt;
    @Column(name = "RTS_RCVTRFSEQ")
    private Character rtsRcvtrfseq;
    @Column(name = "CREATEUID")
    private String createuid;
    @Column(name = "CREATEDT")
    private String createdt;
    
    @JsonBackReference
    @JoinColumns({
        @JoinColumn(name = "ORD_ORDNO", referencedColumnName = "ORD_ORDNO", insertable = false, updatable = false),
        @JoinColumn(name = "ORP_ORDROW", referencedColumnName = "ORP_ORDROW", insertable = false, updatable = false),
        @JoinColumn(name = "BRCH_CODE", referencedColumnName = "BRCH_CODE", insertable = false, updatable = false)
    })
    @OneToOne(optional = false)
    private ClmOrdpay clmOrdpay;

    public BajRcvtrfspec() {
    }

    public BajRcvtrfspec(BajRcvtrfspecPK bajRcvtrfspecPK) {
        this.bajRcvtrfspecPK = bajRcvtrfspecPK;
    }

    public BajRcvtrfspec(BajRcvtrfspecPK bajRcvtrfspecPK, long rtsRcvtrfamt, String rtsTrfno, String rtsTrddat, String rtsBuytrfno, String rtsBuytrfdat, long rtsBuytrfamt) {
        this.bajRcvtrfspecPK = bajRcvtrfspecPK;
        this.rtsRcvtrfamt = rtsRcvtrfamt;
        this.rtsTrfno = rtsTrfno;
        this.rtsTrddat = rtsTrddat;
        this.rtsBuytrfno = rtsBuytrfno;
        this.rtsBuytrfdat = rtsBuytrfdat;
        this.rtsBuytrfamt = rtsBuytrfamt;
    }

    public BajRcvtrfspec(String ordOrdno, String orpOrdrow,String brchCode) {
        this.bajRcvtrfspecPK = new BajRcvtrfspecPK(ordOrdno, orpOrdrow,brchCode);
    }

    public BajRcvtrfspecPK getBajRcvtrfspecPK() {
        return bajRcvtrfspecPK;
    }

    public void setBajRcvtrfspecPK(BajRcvtrfspecPK bajRcvtrfspecPK) {
        this.bajRcvtrfspecPK = bajRcvtrfspecPK;
    }

    public String getBankcode() {
        return bankcode;
    }

    public void setBankcode(String bankcode) {
        this.bankcode = bankcode;
    }

    public String getBnkbrhcode() {
        return bnkbrhcode;
    }

    public void setBnkbrhcode(String bnkbrhcode) {
        this.bnkbrhcode = bnkbrhcode;
    }

    public String getRtsRcvtrfdat() {
        return rtsRcvtrfdat;
    }

    public void setRtsRcvtrfdat(String rtsRcvtrfdat) {
        this.rtsRcvtrfdat = rtsRcvtrfdat;
    }

    public long getRtsRcvtrfamt() {
        return rtsRcvtrfamt;
    }

    public void setRtsRcvtrfamt(long rtsRcvtrfamt) {
        this.rtsRcvtrfamt = rtsRcvtrfamt;
    }

    public String getRtsTrfno() {
        return rtsTrfno;
    }

    public void setRtsTrfno(String rtsTrfno) {
        this.rtsTrfno = rtsTrfno;
    }

    public String getRtsTrddat() {
        return rtsTrddat;
    }

    public void setRtsTrddat(String rtsTrddat) {
        this.rtsTrddat = rtsTrddat;
    }

    public String getRtsBuytrfno() {
        return rtsBuytrfno;
    }

    public void setRtsBuytrfno(String rtsBuytrfno) {
        this.rtsBuytrfno = rtsBuytrfno;
    }

    public String getRtsBuytrfdat() {
        return rtsBuytrfdat;
    }

    public void setRtsBuytrfdat(String rtsBuytrfdat) {
        this.rtsBuytrfdat = rtsBuytrfdat;
    }

    public long getRtsBuytrfamt() {
        return rtsBuytrfamt;
    }

    public void setRtsBuytrfamt(long rtsBuytrfamt) {
        this.rtsBuytrfamt = rtsBuytrfamt;
    }

    public Long getRtsRcvsubamt() {
        return rtsRcvsubamt;
    }

    public void setRtsRcvsubamt(Long rtsRcvsubamt) {
        this.rtsRcvsubamt = rtsRcvsubamt;
    }

    public Character getRtsRcvtrfseq() {
        return rtsRcvtrfseq;
    }

    public void setRtsRcvtrfseq(Character rtsRcvtrfseq) {
        this.rtsRcvtrfseq = rtsRcvtrfseq;
    }

    public String getCreateuid() {
        return createuid;
    }

    public void setCreateuid(String createuid) {
        this.createuid = createuid;
    }

    public String getCreatedt() {
        return createdt;
    }

    public void setCreatedt(String createdt) {
        this.createdt = createdt;
    }

    public ClmOrdpay getClmOrdpay() {
        return clmOrdpay;
    }

    public void setClmOrdpay(ClmOrdpay clmOrdpay) {
        this.clmOrdpay = clmOrdpay;
    }

}
