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
 * @author f_fotuhi
 */
@Embeddable
public class CheqReturnPK implements Serializable {

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

    public CheqReturnPK() {
    }

    public CheqReturnPK(String ordOrdno, String orpOrdrow) {
        this.ordOrdno = ordOrdno;
        this.orpOrdrow = orpOrdrow;
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

    @Override
    public int hashCode() {
        int hash = 0;
        hash += (ordOrdno != null ? ordOrdno.hashCode() : 0);
        hash += (orpOrdrow != null ? orpOrdrow.hashCode() : 0);
        return hash;
    }

    @Override
    public boolean equals(Object object) {
        // TODO: Warning - this method won't work in the case the id fields are not set
        if (!(object instanceof CheqReturnPK)) {
            return false;
        }
        CheqReturnPK other = (CheqReturnPK) object;
        if ((this.ordOrdno == null && other.ordOrdno != null) || (this.ordOrdno != null && !this.ordOrdno.equals(other.ordOrdno))) {
            return false;
        }
        if ((this.orpOrdrow == null && other.orpOrdrow != null) || (this.orpOrdrow != null && !this.orpOrdrow.equals(other.orpOrdrow))) {
            return false;
        }
        return true;
    }

    @Override
    public String toString() {
        return "ir.tamin.incomeBank.model.daramadBank.CheqReturnPK[ ordOrdno=" + ordOrdno + ", orpOrdrow=" + orpOrdrow + " ]";
    }
    
}
