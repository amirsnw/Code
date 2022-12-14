package ir.tamin.insurance.technical.function.refund;

import ir.tamin.framework.domain.function.DBFunctionValue;

/**
 *
 * @author a_khalighi
 */
public class RefundHistoryValue implements DBFunctionValue {

    private String result;

    public String getResult() {
        return result;
    }

    public void setResult(String result) {
        this.result = result;
    }
}
