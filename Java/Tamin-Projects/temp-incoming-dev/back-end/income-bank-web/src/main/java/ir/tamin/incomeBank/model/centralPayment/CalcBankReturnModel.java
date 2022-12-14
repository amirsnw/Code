/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package ir.tamin.incomeBank.model.centralPayment;

import ir.tamin.incomeBank.model.baseinfo.Bank;
import java.math.BigDecimal;

/**
 *
 * @author s_maknooni
 */
public class CalcBankReturnModel {

    private Bank bank;
    private String bankCode;
    private String bankName;
    private Long bankQty;
    private BigDecimal bankAmmount;
    private Boolean isSelected;
    private String checkDate;
    private String checkNo;

    public CalcBankReturnModel() {
    }

    public CalcBankReturnModel(Bank bank, Long bankQty, BigDecimal bankAmmount, String checkDate, String checkNo) {
        this.bank = bank;
        this.bankQty = bankQty;
        this.bankAmmount = bankAmmount;
        this.checkDate = checkDate;
        this.checkNo = checkNo;
    }

    //region برای گزارش ریز پرداخی مستمری
    public CalcBankReturnModel(String bankCode) {
        this.bankCode = bankCode;
    }
    //endregion

    public Bank getBank() {
        return bank;
    }

    public void setBank(Bank bank) {
        this.bank = bank;
    }

    public Long getBankQty() {
        return bankQty;
    }

    public void setBankQty(Long bankQty) {
        this.bankQty = bankQty;
    }

    public BigDecimal getBankAmmount() {
        return bankAmmount;
    }

    public void setBankAmmount(BigDecimal bankAmmount) {
        this.bankAmmount = bankAmmount;
    }

    public Boolean getIsSelected() {
        return isSelected;
    }

    public void setIsSelected(Boolean isSelected) {
        this.isSelected = isSelected;
    }

    public String getBankCode() {
        return bank.getBankCode();
    }

    public void setBankCode(String bankCode) {
        this.bankCode = bankCode;
    }

    public String getBankName() {
        return bank.getBankName();
    }

    public void setBankName(String bankName) {
        this.bankName = bankName;
    }

    public String getCheckDate() {
        return checkDate;
    }

    public void setCheckDate(String checkDate) {
        this.checkDate = checkDate;
    }

    public String getCheckNo() {
        return checkNo;
    }

    public void setCheckNo(String checkNo) {
        this.checkNo = checkNo;
    }

    public String getBankCodeForPension() {
        return bankCode;
    }


}
