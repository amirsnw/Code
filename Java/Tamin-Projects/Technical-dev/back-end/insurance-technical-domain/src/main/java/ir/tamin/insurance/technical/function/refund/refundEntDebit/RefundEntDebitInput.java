package ir.tamin.insurance.technical.function.refund.refundEntDebit;

import ir.tamin.framework.domain.function.DBFunctionInput;

/**
 * Created by na_chabok on 9/30/2019.
 */
public class RefundEntDebitInput   implements DBFunctionInput {
    private String branchCode;
    private String entRequestNo;

    public RefundEntDebitInput() {
    }

    public RefundEntDebitInput(String branchCode, String entRequestNo) {
        this.branchCode = branchCode;
        this.entRequestNo = entRequestNo;
    }

    public String getBranchCode() {
        return branchCode;
    }

    public void setBranchCode(String branchCode) {
        this.branchCode = branchCode;
    }

    public String getEntRequestNo() {
        return entRequestNo;
    }

    public void setEntRequestNo(String entRequestNo) {
        this.entRequestNo = entRequestNo;
    }
}
