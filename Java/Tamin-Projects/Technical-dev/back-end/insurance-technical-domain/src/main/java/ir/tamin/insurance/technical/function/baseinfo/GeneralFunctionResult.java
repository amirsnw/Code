package ir.tamin.insurance.technical.function.baseinfo;

import ir.tamin.framework.domain.function.DBFunctionValue;
import ir.tamin.framework.domain.function.Ignore;

/**
 * Created by s_tayari on 10/4/2017.
 */
public class GeneralFunctionResult implements DBFunctionValue {


@Ignore
private Integer factSheetIndex;
    private String result;

    public String getResult() {
        return result;
    }

    public void setResult(String result) {
        this.result = result;
    }


}
