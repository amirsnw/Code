package ir.tamin.insurance.technical.function.refund;

import ir.tamin.framework.domain.function.DBFunctionValue;
import ir.tamin.framework.domain.function.Out;

import java.math.BigDecimal;

/**
 *
 * @author a_khalighi
 */
public class RefundReduceHistValue implements DBFunctionValue {

    @Out(index = 1)
    private  BigDecimal result;

    @Out(index = 12)
    private String message;

    public BigDecimal getResult() {
        return result;
    }

    public void setResult(BigDecimal result) {
        this.result = result;
    }

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }
}
