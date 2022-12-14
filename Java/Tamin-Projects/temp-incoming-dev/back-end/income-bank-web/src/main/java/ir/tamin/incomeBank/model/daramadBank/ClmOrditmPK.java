/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package ir.tamin.incomeBank.model.daramadBank;

import java.io.Serializable;
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
public class ClmOrditmPK implements Serializable {
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
    @Column(name = "DEBITSUBCODE")
    private String debitsubcode;
    @Basic(optional = false)
    @NotNull
    @Size(min = 1, max = 3)
    @Column(name = "DEBITTYPECODE")
    private String debittypecode;
    @Basic(optional = false)
    @NotNull
    @Size(min = 1, max = 13)
    @Column(name = "CWS_DBTNO")
    private String cwsDbtno;
    @Basic(optional = false)
    @NotNull
    @Size(min = 1, max = 4)
    @Column(name = "BRCH_CODE")
    private String brchCode;

    public ClmOrditmPK() {
    }

    public ClmOrditmPK(String ordOrdno, String orpOrdrow, String debitsubcode, String debittypecode, String cwsDbtno, String brchCode) {
        this.ordOrdno = ordOrdno;
        this.orpOrdrow = orpOrdrow;
        this.debitsubcode = debitsubcode;
        this.debittypecode = debittypecode;
        this.cwsDbtno = cwsDbtno;
        this.brchCode = brchCode;
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

    public String getDebitsubcode() {
        return debitsubcode;
    }

    public void setDebitsubcode(String debitsubcode) {
        this.debitsubcode = debitsubcode;
    }

    public String getDebittypecode() {
        return debittypecode;
    }

    public void setDebittypecode(String debittypecode) {
        this.debittypecode = debittypecode;
    }

    public String getCwsDbtno() {
        return cwsDbtno;
    }

    public void setCwsDbtno(String cwsDbtno) {
        this.cwsDbtno = cwsDbtno;
    }

    public String getBrchCode() {
        return brchCode;
    }

    public void setBrchCode(String brchCode) {
        this.brchCode = brchCode;
    }

    @Override
    public int hashCode() {
        int hash = 0;
        hash += (ordOrdno != null ? ordOrdno.hashCode() : 0);
        hash += (orpOrdrow != null ? orpOrdrow.hashCode() : 0);
        hash += (debitsubcode != null ? debitsubcode.hashCode() : 0);
        hash += (debittypecode != null ? debittypecode.hashCode() : 0);
        hash += (cwsDbtno != null ? cwsDbtno.hashCode() : 0);
        hash += (brchCode != null ? brchCode.hashCode() : 0);
        return hash;
    }

    @Override
    public boolean equals(Object object) {
        // TODO: Warning - this method won't work in the case the id fields are not set
        if (!(object instanceof ClmOrditmPK)) {
            return false;
        }
        ClmOrditmPK other = (ClmOrditmPK) object;
        if ((this.ordOrdno == null && other.ordOrdno != null) || (this.ordOrdno != null && !this.ordOrdno.equals(other.ordOrdno))) {
            return false;
        }
        if ((this.orpOrdrow == null && other.orpOrdrow != null) || (this.orpOrdrow != null && !this.orpOrdrow.equals(other.orpOrdrow))) {
            return false;
        }
        if ((this.debitsubcode == null && other.debitsubcode != null) || (this.debitsubcode != null && !this.debitsubcode.equals(other.debitsubcode))) {
            return false;
        }
        if ((this.debittypecode == null && other.debittypecode != null) || (this.debittypecode != null && !this.debittypecode.equals(other.debittypecode))) {
            return false;
        }
        if ((this.cwsDbtno == null && other.cwsDbtno != null) || (this.cwsDbtno != null && !this.cwsDbtno.equals(other.cwsDbtno))) {
            return false;
        }
        if ((this.brchCode == null && other.brchCode != null) || (this.brchCode != null && !this.brchCode.equals(other.brchCode))) {
            return false;
        }
        return true;
    }

    @Override
    public String toString() {
        return "ir.tamin.incomeBank.model.daramadBank.ClmOrditmPK[ ordOrdno=" + ordOrdno + ", orpOrdrow=" + orpOrdrow + ", debitsubcode=" + debitsubcode + ", debittypecode=" + debittypecode + ", cwsDbtno=" + cwsDbtno + ", brchCode=" + brchCode + " ]";
    }
    
}
