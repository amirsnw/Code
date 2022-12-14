/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package ir.tamin.incomeBank.model.centralPayment;

/**
 *
 * @author s_maknooni
 */
public class BankFileInputModel {

    private String bankCode;
    private String headId;
    private boolean isIranian;

    public String getBankCode() {
        return bankCode;
    }

    public void setBankCode(String bankCode) {
        this.bankCode = bankCode;
    }

    public String getHeadId() {
        return headId;
    }

    public void setHeadId(String headId) {
        this.headId = headId;
    }

    public boolean isIsIranian() {
        return isIranian;
    }

    public void setIsIranian(boolean isIranian) {
        this.isIranian = isIranian;
    }

}
