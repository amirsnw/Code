package ir.tamin.insurance.technical.function.general.moveMonth;

import ir.tamin.framework.domain.function.DBFunctionValue;

/**
 * Created by na_chabok on 7/11/2019.
 */
public class MoveMonthValue  implements DBFunctionValue {

    private String firstStartDate;

    public String getFirstStartDate() {
        return firstStartDate;
    }

    public void setFirstStartDate(String firstStartDate) {
        this.firstStartDate = firstStartDate;
    }
}
