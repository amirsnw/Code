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
public class DrmdComparePK implements Serializable {
    @Basic(optional = false)
    @NotNull
    @Size(min = 1, max = 6)
    @Column(name = "COMP_MDATE")
    private String compMdate;
    @Basic(optional = false)
    @NotNull
    @Column(name = "COMP_ROW")
    private short compRow;
    @Basic(optional = false)
    @NotNull
    @Size(min = 1, max = 4)
    @Column(name = "BRCH_CODE")
    private String brchCode;

    public DrmdComparePK() {
    }

    public DrmdComparePK(String compMdate, short compRow) {
        this.compMdate = compMdate;
        this.compRow = compRow;
    }

    public String getCompMdate() {
        return compMdate;
    }

    public void setCompMdate(String compMdate) {
        this.compMdate = compMdate;
    }

    public short getCompRow() {
        return compRow;
    }

    public void setCompRow(short compRow) {
        this.compRow = compRow;
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
        hash += (compMdate != null ? compMdate.hashCode() : 0);
        hash += (int) compRow;
        return hash;
    }

    @Override
    public boolean equals(Object object) {
        // TODO: Warning - this method won't work in the case the id fields are not set
        if (!(object instanceof DrmdComparePK)) {
            return false;
        }
        DrmdComparePK other = (DrmdComparePK) object;
        if ((this.compMdate == null && other.compMdate != null) || (this.compMdate != null && !this.compMdate.equals(other.compMdate))) {
            return false;
        }
        if (this.compRow != other.compRow) {
            return false;
        }
        return true;
    }

    @Override
    public String toString() {
        return "ir.tamin.incomeBank.model.daramadBank.DrmdComparePK[ compMdate=" + compMdate + ", compRow=" + compRow + " ]";
    }
    
}
