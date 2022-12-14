/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package ir.tamin.incomeBank.model.daramadBank;

import java.io.Serializable;
import javax.persistence.Column;
import javax.persistence.Embeddable;
import lombok.Data;

/**
 *
 * @author e_shoghi
 */
@Embeddable
@Data
public class BajListHeaderPK implements Serializable{
        
    @Column(name = "CWS_DBTNO")
    private String debitNumber;
    
    @Column(name = "CTN_CLMSEQ")
    private String claimSequence;
    
    @Column(name = "brch_code")
    private String branchCode;

    public String getDebitNumber() {
        return debitNumber;
    }

    public void setDebitNumber(String debitNumber) {
        this.debitNumber = debitNumber;
    }

    public String getClaimSequence() {
        return claimSequence;
    }

    public void setClaimSequence(String claimSequence) {
        this.claimSequence = claimSequence;
    }

    public String getBranchCode() {
        return branchCode;
    }

    public void setBranchCode(String branchCode) {
        this.branchCode = branchCode;
    }
}
