/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package ir.tamin.incomeBank.model.daramadBank;

import java.io.Serializable;
import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.EmbeddedId;
import javax.persistence.Entity;
import javax.persistence.OneToOne;
import javax.persistence.Table;
import javax.persistence.Transient;
import javax.validation.constraints.NotNull;

/**
 *
 * @author m_salami
 */
@Entity
@Table(name = "CLM_ORDER")
public class ClmOrder implements Serializable {

    private static final long serialVersionUID = 1L;
    @EmbeddedId
    private ClmOrderPK clmOrderPK;
    @NotNull
    @Column(name = "ORDERTYPE")
    private String ordertype;
    @NotNull
    @Column(name = "MASTCUSTTYPE")
    private String mastcusttype;
    @Column(name = "ORD_MASTCUSTCODE")
    private String ordMastcustcode;
    @Column(name = "ORD_PYMSEQ")
    private String ordPymseq;
    @Column(name = "ORD_DOCNO")
    private String ordDocno;
    @Column(name = "ORD_DOCDAT")
    private String ordDocdat;
    @Column(name = "ORD_BILDAT")
    private String ordBildat;
    @Column(name = "ORD_ORDMST")
    private String ordOrdmst;
    @Column(name = "ORD_RCPFLG")
    private Character ordRcpflg;
    @Column(name = "ORD_ORDSTA")
    private Character ordOrdsta;
    @Column(name = "CREATEUID")
    private String createuid;
    @Column(name = "CREATEDT")
    private String createdt;
    @Column(name = "CONFIRMUID")
    private String confirmuid;
    @Column(name = "CONFIRMDT")
    private String confirmdt;
    @Transient
    private String dateOrdDocdat;

    @OneToOne(cascade = CascadeType.REFRESH, mappedBy = "clmOrder")
    private ClmOrdpay clmOrdpay;

    public ClmOrder() {
    }
    
    

    public ClmOrder(ClmOrderPK clmOrderPK) {
        this.clmOrderPK = clmOrderPK;
    }

    public ClmOrderPK getClmOrderPK() {
        return clmOrderPK;
    }

    public void setClmOrderPK(ClmOrderPK clmOrderPK) {
        this.clmOrderPK = clmOrderPK;
    }

    public String getOrdertype() {
        return ordertype;
    }

    public void setOrdertype(String ordertype) {
        this.ordertype = ordertype;
    }

    public String getMastcusttype() {
        return mastcusttype;
    }

    public void setMastcusttype(String mastcusttype) {
        this.mastcusttype = mastcusttype;
    }

    public String getOrdMastcustcode() {
        return ordMastcustcode;
    }

    public void setOrdMastcustcode(String ordMastcustcode) {
        this.ordMastcustcode = ordMastcustcode;
    }

    public String getOrdPymseq() {
        return ordPymseq;
    }

    public void setOrdPymseq(String ordPymseq) {
        this.ordPymseq = ordPymseq;
    }

    public String getOrdDocno() {
        return ordDocno;
    }

    public void setOrdDocno(String ordDocno) {
        this.ordDocno = ordDocno;
    }

    public String getOrdDocdat() {
        return ordDocdat;
    }

    public void setOrdDocdat(String ordDocdat) {
        this.ordDocdat = ordDocdat;
    }

    public String getOrdBildat() {
        return ordBildat;
    }

    public void setOrdBildat(String ordBildat) {
        this.ordBildat = ordBildat;
    }

    public String getOrdOrdmst() {
        return ordOrdmst;
    }

    public void setOrdOrdmst(String ordOrdmst) {
        this.ordOrdmst = ordOrdmst;
    }

    public Character getOrdRcpflg() {
        return ordRcpflg;
    }

    public void setOrdRcpflg(Character ordRcpflg) {
        this.ordRcpflg = ordRcpflg;
    }

    public Character getOrdOrdsta() {
        return ordOrdsta;
    }

    public void setOrdOrdsta(Character ordOrdsta) {
        this.ordOrdsta = ordOrdsta;
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

    public String getConfirmuid() {
        return confirmuid;
    }

    public void setConfirmuid(String confirmuid) {
        this.confirmuid = confirmuid;
    }

    public String getConfirmdt() {
        return confirmdt;
    }

    public void setConfirmdt(String confirmdt) {
        this.confirmdt = confirmdt;
    }

    public ClmOrdpay getClmOrdpay() {
        return clmOrdpay;
    }

    public String getDateOrdDocdat() {
        if (getOrdDocdat() != null && getOrdDocdat().length() == 8) {
            String dateOrdDocdat;
            dateOrdDocdat = getOrdDocdat().substring(0, 4) + "/" + getOrdDocdat().substring(4, 6) + "/" + getOrdDocdat().substring(6, 8);
            return dateOrdDocdat;
        } else {
            return null;
        }
    }

}
