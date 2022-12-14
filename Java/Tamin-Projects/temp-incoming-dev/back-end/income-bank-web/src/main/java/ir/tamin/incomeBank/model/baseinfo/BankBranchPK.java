/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package ir.tamin.incomeBank.model.baseinfo;

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
public class BankBranchPK implements Serializable {
    @Basic(optional = false)
    @NotNull
    @Size(min = 1, max = 2)
    @Column(name = "BANKCODE")
    private String bankcode;
    @Basic(optional = false)
    @NotNull
    @Size(min = 1, max = 4)
    @Column(name = "BNKBRHCODE")
    private String bnkbrhcode;

    public BankBranchPK() {
    }

    public BankBranchPK(String bankcode, String bnkbrhcode) {
        this.bankcode = bankcode;
        this.bnkbrhcode = bnkbrhcode;
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

    @Override
    public int hashCode() {
        int hash = 0;
        hash += (bankcode != null ? bankcode.hashCode() : 0);
        hash += (bnkbrhcode != null ? bnkbrhcode.hashCode() : 0);
        return hash;
    }

    @Override
    public boolean equals(Object object) {
        // TODO: Warning - this method won't work in the case the id fields are not set
        if (!(object instanceof BankBranchPK)) {
            return false;
        }
        BankBranchPK other = (BankBranchPK) object;
        if ((this.bankcode == null && other.bankcode != null) || (this.bankcode != null && !this.bankcode.equals(other.bankcode))) {
            return false;
        }
        if ((this.bnkbrhcode == null && other.bnkbrhcode != null) || (this.bnkbrhcode != null && !this.bnkbrhcode.equals(other.bnkbrhcode))) {
            return false;
        }
        return true;
    }

    @Override
    public String toString() {
        return "ir.tamin.incomeBank.model.baseinfo.TbBnkbranchPK[ bankcode=" + bankcode + ", bnkbrhcode=" + bnkbrhcode + " ]";
    }
    
}
