package ir.tamin.insurance.technical.function.general.calcMonthsBetweenTwoDates;

import ir.tamin.framework.domain.function.DBFunctionValue;

import java.math.BigDecimal;

/**
 *
 * @author s_naghavi
 */
public class CalcMonthsBetweenTwoDatesValue implements DBFunctionValue{
   private BigDecimal days;

    public BigDecimal getDays() {
        return days;
    }

    public void setDays(BigDecimal days) {
        this.days = days;
    }
   
}
