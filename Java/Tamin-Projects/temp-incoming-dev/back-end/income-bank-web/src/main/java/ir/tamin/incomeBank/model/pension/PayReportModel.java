/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package ir.tamin.incomeBank.model.pension;

/**
 *
 * @author f_fotuhi
 */
public class PayReportModel {

    String bankName;
    String branchProvinceName;
    String alphabet;
    Long count;
    Long amount;

    public PayReportModel() {
    }

    public PayReportModel(String bankName, String branchProvinceName, String alphabet, Long count, Long amount) {
        this.bankName = bankName;
        this.branchProvinceName = branchProvinceName;
        this.alphabet = alphabet;
        this.count = count;
        this.amount = amount;
    }

    public String getBankName() {
        return bankName;
    }

    public void setBankName(String bankName) {
        this.bankName = bankName;
    }

    public String getBranchProvinceName() {
        return branchProvinceName;
    }

    public void setBranchProvinceName(String branchProvinceName) {
        this.branchProvinceName = branchProvinceName;
    }

    public String getAlphabet() {
        return alphabet;
    }

    public void setAlphabet(String alphabet) {
        this.alphabet = alphabet;
    }

    public Long getCount() {
        return count;
    }

    public void setCount(Long count) {
        this.count = count;
    }

    public Long getAmount() {
        return amount;
    }

    public void setAmount(Long amount) {
        this.amount = amount;
    }

}
