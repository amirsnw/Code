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
public class DrmdBankPK implements Serializable {

    @Basic(optional = false)
    @NotNull
    @Size(min = 1, max = 2)
    @Column(name = "BANK_RADIF")
    private String bankRadif;
    @Basic(optional = false)
    @NotNull
    @Size(min = 1, max = 4)
    @Column(name = "BRCH_CODE")
    private String brchCode;

    public DrmdBankPK() {
    }

    public DrmdBankPK(String bankRadif, String brchCode) {
        this.bankRadif = bankRadif;
        this.brchCode = brchCode;
    }

    public String getBankRadif() {
        return bankRadif;
    }

    public void setBankRadif(String bankRadif) {
        this.bankRadif = bankRadif;
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
        hash += (bankRadif != null ? bankRadif.hashCode() : 0);
        hash += (brchCode != null ? brchCode.hashCode() : 0);
        return hash;
    }

    @Override
    public boolean equals(Object object) {
        // TODO: Warning - this method won't work in the case the id fields are not set
        if (!(object instanceof DrmdBankPK)) {
            return false;
        }
        DrmdBankPK other = (DrmdBankPK) object;
        if ((this.bankRadif == null && other.bankRadif != null) || (this.bankRadif != null && !this.bankRadif.equals(other.bankRadif))) {
            return false;
        }
        if ((this.brchCode == null && other.brchCode != null) || (this.brchCode != null && !this.brchCode.equals(other.brchCode))) {
            return false;
        }
        return true;
    }

    @Override
    public String toString() {
        return "ir.tamin.incomeBank.model.daramadBank.DrmdBankPK[ bankRadif=" + bankRadif + ", brchCode=" + brchCode + " ]";
    }
    
}
