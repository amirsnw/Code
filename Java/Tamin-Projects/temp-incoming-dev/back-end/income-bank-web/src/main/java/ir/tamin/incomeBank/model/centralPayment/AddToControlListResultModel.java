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
public class AddToControlListResultModel {

    private boolean shouldBeAddToList;
    private boolean changedAccountNo;

    public boolean isShouldBeAddToList() {
        return shouldBeAddToList;
    }

    public void setShouldBeAddToList(boolean shouldBeAddToList) {
        this.shouldBeAddToList = shouldBeAddToList;
    }

    public boolean isChangedAccountNo() {
        return changedAccountNo;
    }

    public void setChangedAccountNo(boolean changedAccountNo) {
        this.changedAccountNo = changedAccountNo;
    }

}
