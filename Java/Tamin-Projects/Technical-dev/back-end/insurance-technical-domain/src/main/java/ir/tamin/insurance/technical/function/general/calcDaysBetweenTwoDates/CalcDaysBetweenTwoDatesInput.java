/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package ir.tamin.insurance.technical.function.general.calcDaysBetweenTwoDates;

import ir.tamin.framework.domain.function.DBFunctionInput;

/**
 *
 * @author s_naghavi
 */
public class CalcDaysBetweenTwoDatesInput implements DBFunctionInput{
    private String firstDate;
    private String secondDate;

    public CalcDaysBetweenTwoDatesInput() {
    }

    public CalcDaysBetweenTwoDatesInput(String firstDate, String secondDate) {
        this.firstDate = firstDate;
        this.secondDate = secondDate;
    }

    public String getFirstDate() {
        return firstDate;
    }

    public void setFirstDate(String firstDate) {
        this.firstDate = firstDate;
    }

    public String getSecondDate() {
        return secondDate;
    }

    public void setSecondDate(String secondDate) {
        this.secondDate = secondDate;
    }
    
}
