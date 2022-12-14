/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package ir.tamin.incomeBank.model.daramadBank;

import java.io.Serializable;
import java.math.BigDecimal;
import java.math.BigInteger;
import javax.persistence.Basic;
import javax.persistence.Column;
import javax.persistence.Embeddable;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;

/**
 *
 * @author m_salami
 */
@Embeddable
public class BajOrdpusedPK implements Serializable{
    
    
    @Basic(optional = false)
    @NotNull
    @Size(min = 1, max = 4)
    @Column(name = "BRCH_CODE")
    private String brchCode;
    
    @Basic(optional = false)
    @NotNull
    @Size(min = 1, max = 13)
    @Column(name = "CWS_DBTNO")
    private String cwsDbtno;
    @Basic(optional = false)
    @NotNull
    @Size(min = 1, max = 3)
    @Column(name = "CTN_CLMSEQ")
    private String ctnClmseq;
    @Basic(optional = false)
    @NotNull
    @Size(min = 1, max = 13)
    @Column(name = "ORD_ORDNO")
    private String ordOrdno;
    @Basic(optional = false)
    @NotNull
    @Size(min = 1, max = 2)
    @Column(name = "ORP_ORDROW")
    private String orpOrdrow;
    @Basic(optional = false)
    @NotNull
    @Size(min = 1, max = 3)
    @Column(name = "DEBITTYPECODE")
    private String debittypecode;

    public BajOrdpusedPK() {
    }

    public BajOrdpusedPK(String brchCode, String cwsDbtno, String ctnClmseq, String ordOrdno, String orpOrdrow, String debittypecode) {
        this.brchCode = brchCode;
        this.cwsDbtno = cwsDbtno;
        this.ctnClmseq = ctnClmseq;
        this.ordOrdno = ordOrdno;
        this.orpOrdrow = orpOrdrow;
        this.debittypecode = debittypecode;
    }


    public String getBrchCode() {
        return brchCode;
    }

    public void setBrchCode(String brchCode) {
        this.brchCode = brchCode;
    }
    
    public String getCwsDbtno() {
        return cwsDbtno;
    }

    public void setCwsDbtno(String cwsDbtno) {
        this.cwsDbtno = cwsDbtno;
    }

    public String getCtnClmseq() {
        return ctnClmseq;
    }

    public void setCtnClmseq(String ctnClmseq) {
        this.ctnClmseq = ctnClmseq;
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

    public String getDebittypecode() {
        return debittypecode;
    }

    public void setDebittypecode(String debittypecode) {
        this.debittypecode = debittypecode;
    }
    
}
