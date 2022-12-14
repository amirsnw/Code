package ir.tamin.insurance.technical.function.general.getMinMaxWage;
import ir.tamin.framework.domain.function.DBFunctionInput;

/**
 *
 * @author m_Alipour
 */

public class GetMinMaxWageInput implements DBFunctionInput {
    private String year;
    private String month;

    public GetMinMaxWageInput() {
    }

    public GetMinMaxWageInput(String year, String month) {
        this.year = year;
        this.month = month;
    }

    public String getYear() {
        return year;
    }

    public void setYear(String year) {
        this.year = year;
    }

    public String getMonth() {
        return month;
    }

    public void setMonth(String month) {
        this.month = month;
    }
}
