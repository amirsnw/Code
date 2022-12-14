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
public class DrmdBankrcvPK implements Serializable {
    
    @Basic(optional = false)
    @NotNull
    @Column(name = "BANKRCV_ROW")
    private Integer bankrcvRow;
        
    @Size(max = 4)
    @Column(name = "BRCH_CODE")
    private String brchCode;

    public DrmdBankrcvPK() {
    }

    public Integer getBankrcvRow() {
        return bankrcvRow;
    }

    public void setBankrcvRow(Integer bankrcvRow) {
        this.bankrcvRow = bankrcvRow;
    }

    public String getBrchCode() {
        return brchCode;
    }

    public void setBrchCode(String brchCode) {
        this.brchCode = brchCode;
    }

    public DrmdBankrcvPK(Integer bankrcvRow, String brchCode) {
        this.bankrcvRow = bankrcvRow;
        this.brchCode = brchCode;
    }

    
    
}
