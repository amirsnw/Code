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
 * @author h_riazat
 */
@Embeddable
public class VwDrmdBankPK implements Serializable {

    @NotNull
    @Column(name = "BANK_RADIF")
    private String bankRadif;

    @NotNull
    @Column(name = "BRCH_CODE")
    private String brchCode;

    public void setBankRadif(String bankRadif) {
        this.bankRadif = bankRadif;
    }

    public String getBankRadif() {
        return bankRadif;
    }

    public void setBrchCode(String brchCode) {
        this.brchCode = brchCode;
    }
    
    public String getBrchCode()
    {
        return brchCode;
    }

}
