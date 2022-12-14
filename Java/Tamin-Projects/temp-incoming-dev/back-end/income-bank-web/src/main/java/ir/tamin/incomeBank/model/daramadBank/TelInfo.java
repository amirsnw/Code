/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package ir.tamin.incomeBank.model.daramadBank;

import java.util.List;
import javax.persistence.Transient;

/**
 *
 * @author f_fotuhi
 */
public class TelInfo {

    private String rowDesc;
    private String describe;
    private long amount;
    private String rowType;
    private String telType;
    private long currentAmt;
    private long oldAmt;

    private long totalAmount;
    private long totalCurrOldAmount;
    private String branchCode;  
   
   

    public String getBranchCode() {
        return branchCode;
    }

    public void setBranchCode(String branchCode) {
        this.branchCode = branchCode;
    }
    
    public String getRowDesc() {
        return rowDesc;
    }

    public void setRowDesc(String rowDesc) {
        this.rowDesc = rowDesc;
    }

    public String getDescribe() {
        return describe;
    }

    public void setDescribe(String describe) {
        this.describe = describe;
    }

    public long getAmount() {
        return amount;
    }

    public void setAmount(long amount) {
        this.amount = amount;
    }

    public String getRowType() {
        return rowType;
    }

    public void setRowType(String rowType) {
        this.rowType = rowType;
    }

    public String getTelType() {
        return telType;
    }

    public void setTelType(String telType) {
        this.telType = telType;
    }

    public long getCurrentAmt() {
        return currentAmt;
    }

    public void setCurrentAmt(long currentAmt) {
        this.currentAmt = currentAmt;
    }

    public long getOldAmt() {
        return oldAmt;
    }

    public void setOldAmt(long oldAmt) {
        this.oldAmt = oldAmt;
    }

    public long getTotalAmount() {
        return totalAmount;
    }

    public void setTotalAmount(long totalAmount) {
        this.totalAmount = totalAmount;
    }

    public long getTotalCurrOldAmount() {
        return totalCurrOldAmount;
    }

    public void setTotalCurrOldAmount(long totalCurrOldAmount) {
        this.totalCurrOldAmount = totalCurrOldAmount;
    }
    
    

}
