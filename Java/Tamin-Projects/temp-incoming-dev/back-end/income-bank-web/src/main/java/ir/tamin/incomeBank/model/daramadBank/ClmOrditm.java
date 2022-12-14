/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package ir.tamin.incomeBank.model.daramadBank;

import java.io.Serializable;
import javax.persistence.Column;
import javax.persistence.EmbeddedId;
import javax.persistence.Entity;
import javax.persistence.Table;
import javax.validation.constraints.Size;
import javax.xml.bind.annotation.XmlRootElement;

/**
 *
 * @author m_salami
 */
@Entity
@Table(name = "CLM_ORDITM")
@XmlRootElement
public class ClmOrditm implements Serializable {
    private static final long serialVersionUID = 1L;
    @EmbeddedId
    protected ClmOrditmPK clmOrditmPK;
    @Column(name = "OIT_AMOUNT")
    private Long oitAmount;
    @Column(name = "OIT_REMAIN")
    private Long oitRemain;
    @Size(max = 8)
    @Column(name = "OIT_EXPDAT")
    private String oitExpdat;

    public ClmOrditm() {
    }

    public ClmOrditm(ClmOrditmPK clmOrditmPK) {
        this.clmOrditmPK = clmOrditmPK;
    }

    public ClmOrditm(String ordOrdno, String orpOrdrow, String debitsubcode, String debittypecode, String cwsDbtno, String brchCode) {
        this.clmOrditmPK = new ClmOrditmPK(ordOrdno, orpOrdrow, debitsubcode, debittypecode, cwsDbtno, brchCode);
    }

    public ClmOrditmPK getClmOrditmPK() {
        return clmOrditmPK;
    }

    public void setClmOrditmPK(ClmOrditmPK clmOrditmPK) {
        this.clmOrditmPK = clmOrditmPK;
    }

    public Long getOitAmount() {
        return oitAmount;
    }

    public void setOitAmount(Long oitAmount) {
        this.oitAmount = oitAmount;
    }

    public Long getOitRemain() {
        return oitRemain;
    }

    public void setOitRemain(Long oitRemain) {
        this.oitRemain = oitRemain;
    }

    public String getOitExpdat() {
        return oitExpdat;
    }

    public void setOitExpdat(String oitExpdat) {
        this.oitExpdat = oitExpdat;
    }

    @Override
    public int hashCode() {
        int hash = 0;
        hash += (clmOrditmPK != null ? clmOrditmPK.hashCode() : 0);
        return hash;
    }

    @Override
    public boolean equals(Object object) {
        // TODO: Warning - this method won't work in the case the id fields are not set
        if (!(object instanceof ClmOrditm)) {
            return false;
        }
        ClmOrditm other = (ClmOrditm) object;
        if ((this.clmOrditmPK == null && other.clmOrditmPK != null) || (this.clmOrditmPK != null && !this.clmOrditmPK.equals(other.clmOrditmPK))) {
            return false;
        }
        return true;
    }

    @Override
    public String toString() {
        return "ir.tamin.incomeBank.model.daramadBank.ClmOrditm[ clmOrditmPK=" + clmOrditmPK + " ]";
    }
    
}
