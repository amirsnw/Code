/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package ir.tamin.incomeBank.model.daramadBank;

import java.io.Serializable;
import javax.persistence.Column;
import javax.persistence.Embeddable;

/**
 *
 * @author f_fotuhi
 */
@Embeddable
public class DrmdCompdetPK implements Serializable {

    @Column(name = "COMP_MDATE")
    private String compMdate;
    @Column(name = "COMP_ROW")
    private Short compRow;
    @Column(name = "CF_ROW")
    private Short cfRow;
    @Column(name = "BRCH_CODE")
    private String brchCode;
    @Column(name = "BANK_RADIF")
    private String bankRadif;

    public DrmdCompdetPK() {
    }

    public DrmdCompdetPK(String compMdate, Short compRow, Short cfRow, String brchCode) {
        this.compMdate = compMdate;
        this.compRow = compRow;
        this.cfRow = cfRow;
        this.brchCode = brchCode;
    }

    

    public String getCompMdate() {
        return compMdate;
    }

    public void setCompMdate(String compMdate) {
        this.compMdate = compMdate;
    }

    public Short getCompRow() {
        return compRow;
    }

    public void setCompRow(Short compRow) {
        this.compRow = compRow;
    }

    public Short getCfRow() {
        return cfRow;
    }

    public void setCfRow(Short cfRow) {
        this.cfRow = cfRow;
    }

    public String getBrchCode() {
        return brchCode;
    }

    public void setBrchCode(String brchCode) {
        this.brchCode = brchCode;
    }

    public String getBankRadif() {
        return bankRadif;
    }

    public void setBankRadif(String bankRadif) {
        this.bankRadif = bankRadif;
    }
    
}
