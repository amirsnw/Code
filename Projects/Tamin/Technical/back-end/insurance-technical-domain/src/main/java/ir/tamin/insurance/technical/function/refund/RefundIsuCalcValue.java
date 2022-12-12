package ir.tamin.insurance.technical.function.refund;

import ir.tamin.framework.domain.function.DBFunctionValue;

import java.math.BigDecimal;

/**
 *
 * @author a_khalighi
 */
public class RefundIsuCalcValue implements DBFunctionValue {

    private BigDecimal result;

    public BigDecimal getResult() {
        return result;
    }

    public void setResult(BigDecimal result) {
        this.result = result;
    }
    
    
}
