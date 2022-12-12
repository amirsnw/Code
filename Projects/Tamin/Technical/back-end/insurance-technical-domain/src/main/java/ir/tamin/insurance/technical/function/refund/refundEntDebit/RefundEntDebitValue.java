package ir.tamin.insurance.technical.function.refund.refundEntDebit;

import ir.tamin.framework.domain.function.DBFunctionValue;

/**
 * Created by na_chabok on 9/30/2019.
 */
public class RefundEntDebitValue implements DBFunctionValue {
    private String result;

    public String getResult() {
        return result;
    }

    public void setResult(String result) {
        this.result = result;
    }
}
