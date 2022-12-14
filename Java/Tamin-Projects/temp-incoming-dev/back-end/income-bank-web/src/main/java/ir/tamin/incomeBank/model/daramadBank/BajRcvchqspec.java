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
@Table(name = "BAJ_RCVCHQSPEC")
public class BajRcvchqspec implements Serializable {

    private static final long serialVersionUID = 1L;
    @EmbeddedId
    private BajRcvchqspecPK bajRcvchqspecPK;
    @NotNull
    @Column(name = "CHEQUETYPECODE")
    private String chequetypecode;
    @Column(name = "BANKCODE")
    private String bankcode;
    @Column(name = "BNKBRHCODE")
    private String bnkbrhcode;
    @NotNull
    @Column(name = "SNDCHEQMETHODCODE")
    private String sndcheqmethodcode;
    @NotNull
    @Column(name = "RCS_RCVCHQDAT")
    private String rcsRcvchqdat;
    @Column(name = "RCS_LETNO")
    private String rcsLetno;
    @Column(name = "RCS_LETDAT")
    private String rcsLetdat;
    @NotNull
    @Column(name = "RCS_CHQAMT")
    private long rcsChqamt;
    @Column(name = "RCS_CHQNO")
    private String rcsChqno;
    @Column(name = "RCS_CHQDAT")
    private String rcsChqdat;
    @Column(name = "RCS_CHQACCNO")
    private String rcsChqaccno;
    @Column(name = "RCS_CHQCANDAT")
    private String rcsChqcandat;
    @Column(name = "RCS_RCVSUBAMT")
    private Long rcsRcvsubamt;
    @Column(name = "RCS_RCVCHQSEQ")
    private Character rcsRcvchqseq;
    @Column(name = "CREATEUID")
    private String createuid;
    @Column(name = "CREATEDT")
    private String createdt;
    @Column(name = "CHECKAMEL")
    private String checkamel;

    @JsonBackReference
    @JoinColumns({
        @JoinColumn(name = "ORD_ORDNO", referencedColumnName = "ORD_ORDNO", insertable = false, updatable = false),
        @JoinColumn(name = "ORP_ORDROW", referencedColumnName = "ORP_ORDROW", insertable = false, updatable = false),
        @JoinColumn(name = "BRCH_CODE", referencedColumnName = "BRCH_CODE", insertable = false, updatable = false)
    })
    @OneToOne(optional = false)
    private ClmOrdpay clmOrdpay;

    public BajRcvchqspec() {
    }

    public BajRcvchqspec(BajRcvchqspecPK bajRcvchqspecPK) {
        this.bajRcvchqspecPK = bajRcvchqspecPK;
    }

    public BajRcvchqspec(BajRcvchqspecPK bajRcvchqspecPK, String chequetypecode, String sndcheqmethodcode, String rcsRcvchqdat, long rcsChqamt) {
        this.bajRcvchqspecPK = bajRcvchqspecPK;
        this.chequetypecode = chequetypecode;
        this.sndcheqmethodcode = sndcheqmethodcode;
        this.rcsRcvchqdat = rcsRcvchqdat;
        this.rcsChqamt = rcsChqamt;
    }

    public BajRcvchqspec(String ordOrdno, String orpOrdrow, String brchCode) {
        this.bajRcvchqspecPK = new BajRcvchqspecPK(ordOrdno, orpOrdrow, brchCode);
    }

    public BajRcvchqspecPK getBajRcvchqspecPK() {
        return bajRcvchqspecPK;
    }

    public void setBajRcvchqspecPK(BajRcvchqspecPK bajRcvchqspecPK) {
        this.bajRcvchqspecPK = bajRcvchqspecPK;
    }

    public String getChequetypecode() {
        return chequetypecode;
    }

    public void setChequetypecode(String chequetypecode) {
        this.chequetypecode = chequetypecode;
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

    public String getSndcheqmethodcode() {
        return sndcheqmethodcode;
    }

    public void setSndcheqmethodcode(String sndcheqmethodcode) {
        this.sndcheqmethodcode = sndcheqmethodcode;
    }

    public String getRcsRcvchqdat() {
        return rcsRcvchqdat;
    }

    public void setRcsRcvchqdat(String rcsRcvchqdat) {
        this.rcsRcvchqdat = rcsRcvchqdat;
    }

    public String getRcsLetno() {
        return rcsLetno;
    }

    public void setRcsLetno(String rcsLetno) {
        this.rcsLetno = rcsLetno;
    }

    public String getRcsLetdat() {
        return rcsLetdat;
    }

    public void setRcsLetdat(String rcsLetdat) {
        this.rcsLetdat = rcsLetdat;
    }

    public long getRcsChqamt() {
        return rcsChqamt;
    }

    public void setRcsChqamt(long rcsChqamt) {
        this.rcsChqamt = rcsChqamt;
    }

    public String getRcsChqno() {
        return rcsChqno;
    }

    public void setRcsChqno(String rcsChqno) {
        this.rcsChqno = rcsChqno;
    }

    public String getRcsChqdat() {
        return rcsChqdat;
    }

    public void setRcsChqdat(String rcsChqdat) {
        this.rcsChqdat = rcsChqdat;
    }

    public String getRcsChqaccno() {
        return rcsChqaccno;
    }

    public void setRcsChqaccno(String rcsChqaccno) {
        this.rcsChqaccno = rcsChqaccno;
    }

    public String getRcsChqcandat() {
        return rcsChqcandat;
    }

    public void setRcsChqcandat(String rcsChqcandat) {
        this.rcsChqcandat = rcsChqcandat;
    }

    public Long getRcsRcvsubamt() {
        return rcsRcvsubamt;
    }

    public void setRcsRcvsubamt(Long rcsRcvsubamt) {
        this.rcsRcvsubamt = rcsRcvsubamt;
    }

    public Character getRcsRcvchqseq() {
        return rcsRcvchqseq;
    }

    public void setRcsRcvchqseq(Character rcsRcvchqseq) {
        this.rcsRcvchqseq = rcsRcvchqseq;
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

    public String getCheckamel() {
        return checkamel;
    }

    public void setCheckamel(String checkamel) {
        this.checkamel = checkamel;
    }

    public ClmOrdpay getClmOrdpay() {
        return clmOrdpay;
    }

    public void setClmOrdpay(ClmOrdpay clmOrdpay) {
        this.clmOrdpay = clmOrdpay;
    }

}
