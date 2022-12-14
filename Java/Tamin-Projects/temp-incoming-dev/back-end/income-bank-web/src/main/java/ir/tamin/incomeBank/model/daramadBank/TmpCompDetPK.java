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
public class TmpCompDetPK implements Serializable {

    @Basic(optional = false)
    @NotNull
    @Column(name = "TMPCOMP_SEQ")
    private long tmpcompSeq;
    @Basic(optional = false)
    @NotNull
    @Size(min = 1, max = 4)
    @Column(name = "BRCH_CODE")
    private String brchCode;

    public TmpCompDetPK() {
    }

    public TmpCompDetPK(long tmpcompSeq, String brchCode) {
        this.tmpcompSeq = tmpcompSeq;
        this.brchCode = brchCode;
    }

    public long getTmpcompSeq() {
        return tmpcompSeq;
    }

    public void setTmpcompSeq(long tmpcompSeq) {
        this.tmpcompSeq = tmpcompSeq;
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
        hash += (int) tmpcompSeq;
        hash += (brchCode != null ? brchCode.hashCode() : 0);
        return hash;
    }

    @Override
    public boolean equals(Object object) {
        // TODO: Warning - this method won't work in the case the id fields are not set
        if (!(object instanceof TmpCompDetPK)) {
            return false;
        }
        TmpCompDetPK other = (TmpCompDetPK) object;
        if (this.tmpcompSeq != other.tmpcompSeq) {
            return false;
        }
        if ((this.brchCode == null && other.brchCode != null) || (this.brchCode != null && !this.brchCode.equals(other.brchCode))) {
            return false;
        }
        return true;
    }

    @Override
    public String toString() {
        return "ir.tamin.incomeBank.model.daramadBank.TmpCompDetPK[ tmpcompSeq=" + tmpcompSeq + ", brchCode=" + brchCode + " ]";
    }
    
}
