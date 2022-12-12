package ir.tamin.insurance.technical.function.general.getMinMaxWage;

import ir.tamin.framework.domain.function.DBFunctionValue;
import ir.tamin.framework.domain.function.Out;

import java.math.BigDecimal;

/**
 *
 * @author m_Alipour
 */
public class GetMinMaxWageValue implements DBFunctionValue {

    @Out(index = 1) private BigDecimal type;
    @Out(index = 4) private BigDecimal minWage;
    @Out(index = 5) private BigDecimal maxWage;

    public BigDecimal getMinWage() {
        return minWage;
    }

    public void setMinWage(BigDecimal minWage) {
        this.minWage = minWage;
    }

    public BigDecimal getMaxWage() {
        return maxWage;
    }

    public void setMaxWage(BigDecimal maxWage) {
        this.maxWage = maxWage;
    }

    public BigDecimal getType() {
        return type;
    }

    public void setType(BigDecimal type) {
        this.type = type;
    }
}
