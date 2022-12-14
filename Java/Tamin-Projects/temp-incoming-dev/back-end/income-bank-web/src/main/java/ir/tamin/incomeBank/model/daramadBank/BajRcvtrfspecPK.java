/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package ir.tamin.incomeBank.model.daramadBank;

import java.io.Serializable;
import javax.persistence.Column;
import javax.persistence.Embeddable;
import javax.validation.constraints.NotNull;

/**
 *
 * @author m_salami
 */
@Embeddable
public class BajRcvtrfspecPK implements Serializable {
    @NotNull
    @Column(name = "ORD_ORDNO")
    private String ordOrdno;
    @NotNull
    @Column(name = "ORP_ORDROW")
    private String orpOrdrow;
    @Column(name = "BRCH_CODE")
    private String brchCode;

    public BajRcvtrfspecPK() {
    }

    public BajRcvtrfspecPK(String ordOrdno, String orpOrdrow, String brchCode) {
        this.ordOrdno = ordOrdno;
        this.orpOrdrow = orpOrdrow;
        this.brchCode = brchCode;
    }   

    public String getBrchCode() {
        return brchCode;
    }

    public void setBrchCode(String brchCode) {
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
    
}
