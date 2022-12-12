package ir.tamin.insurance.technical.function.general.calcMonthsBetweenTwoDates;

import ir.tamin.framework.domain.function.DBFunctionInput;

/**
 *
 * @author s_naghavi
 */
public class CalcMonthsBetweenTwoDatesInput implements DBFunctionInput{
    private String firstDate;
    private String secondDate;

    public CalcMonthsBetweenTwoDatesInput() {
    }

    public CalcMonthsBetweenTwoDatesInput(String firstDate, String secondDate) {
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
