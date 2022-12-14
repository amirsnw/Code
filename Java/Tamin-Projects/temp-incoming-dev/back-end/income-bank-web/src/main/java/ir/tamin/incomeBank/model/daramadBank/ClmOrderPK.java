/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package ir.tamin.incomeBank.model.daramadBank;

import java.io.Serializable;
import java.util.Objects;
import javax.persistence.Column;
import javax.persistence.Embeddable;
import javax.validation.constraints.NotNull;

/**
 *
 * @author m_salami
 */
@Embeddable
public class ClmOrderPK implements Serializable {

    @NotNull
    @Column(name = "ORD_ORDNO")
    private String ordOrdno;

    @Column(name = "BRCH_CODE")
    private String brchCode;

    public ClmOrderPK(String ordOrdno, String brchCode) {
        this.ordOrdno = ordOrdno;
        this.brchCode = brchCode;
    }

    public ClmOrderPK() {
    }

    public String getOrdOrdno() {
        return ordOrdno;
    }

    public void setOrdOrdno(String ordOrdno) {
        this.ordOrdno = ordOrdno;
    }

    public String getBrchCode() {
        return brchCode;
    }

    public void setBrchCode(String brchCode) {
        this.brchCode = brchCode;
    }

    @Override
    public int hashCode() {
        int hash = 3;
        hash = 71 * hash + Objects.hashCode(this.ordOrdno);
        hash = 71 * hash + Objects.hashCode(this.brchCode);
        return hash;
    }

    @Override
    public boolean equals(Object obj) {
        if (obj == null) {
            return false;
        }
        if (getClass() != obj.getClass()) {
            return false;
        }
        final ClmOrderPK other = (ClmOrderPK) obj;
        if (!Objects.equals(this.ordOrdno, other.ordOrdno)) {
            return false;
        }
        return true;
    }
    
    

}
