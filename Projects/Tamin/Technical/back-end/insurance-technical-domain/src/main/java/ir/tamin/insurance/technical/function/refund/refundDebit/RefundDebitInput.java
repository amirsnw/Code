package ir.tamin.insurance.technical.function.refund.refundDebit;

import ir.tamin.framework.domain.function.DBFunctionInput;

/**
 * Created by na_chabok on 7/24/2019.
 */
public class RefundDebitInput implements DBFunctionInput{

    private String branchCode;
    private String soldierDebt;
    private String prefundAmount;
    private String prefType;

    public RefundDebitInput() {
    }

    public RefundDebitInput(String branchCode, String soldierDebt, String prefundAmount, String prefType) {
        this.branchCode = branchCode;
        this.soldierDebt = soldierDebt;
        this.prefundAmount = prefundAmount;
        this.prefType = prefType;
    }

    public String getBranchCode() {
        return branchCode;
    }

    public void setBranchCode(String branchCode) {
        this.branchCode = branchCode;
    }

    public String getSoldierDebt() {
        return soldierDebt;
    }

    public void setSoldierDebt(String soldierDebt) {
        this.soldierDebt = soldierDebt;
    }

    public String getPrefundAmount() {
        return prefundAmount;
    }

    public void setPrefundAmount(String prefundAmount) {
        this.prefundAmount = prefundAmount;
    }

    public String getPrefType() {
        return prefType;
    }

    public void setPrefType(String prefType) {
        this.prefType = prefType;
    }


}
