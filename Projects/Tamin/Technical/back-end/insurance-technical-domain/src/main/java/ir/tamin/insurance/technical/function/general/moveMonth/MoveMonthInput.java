package ir.tamin.insurance.technical.function.general.moveMonth;

import ir.tamin.framework.domain.function.DBFunctionInput;

/**
 * Created by na_chabok on 7/11/2019.
 */
public class MoveMonthInput implements DBFunctionInput {
    private String requestDate;
    private Float incer;

    public MoveMonthInput(String requestDate, Float incer) {
        this.requestDate = requestDate;
        this.incer = incer;
    }

    public String getRequestDate() {
        return requestDate;
    }

    public void setRequestDate(String requestDate) {
        this.requestDate = requestDate;
    }

    public Float getIncer() {
        return incer;
    }

    public void setIncer(Float incer) {
        this.incer = incer;
    }
}
