/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package ir.tamin.insurance.technical.function.general.calcDaysBetweenTwoDates;

import ir.tamin.framework.domain.function.DBFunctionValue;

import java.math.BigDecimal;

/**
 *
 * @author s_naghavi
 */
public class CalcDaysBetweenTwoDatesValue implements DBFunctionValue{
   private BigDecimal days;

    public BigDecimal getDays() {
        return days;
    }

    public void setDays(BigDecimal days) {
        this.days = days;
    }
   
}
