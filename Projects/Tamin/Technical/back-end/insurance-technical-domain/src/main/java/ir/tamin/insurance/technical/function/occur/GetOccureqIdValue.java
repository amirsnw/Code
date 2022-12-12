package ir.tamin.insurance.technical.function.occur;

import ir.tamin.framework.domain.function.DBFunctionValue;

/**
 * Created by a-khalighi on 5/17/2022
*/
public class GetOccureqIdValue implements DBFunctionValue {
    private Integer resultFn;

    public GetOccureqIdValue() {
    }

    public GetOccureqIdValue(Integer resultFn) {
        this.resultFn = resultFn;
    }

    public Integer getResultFn() {
        return resultFn;
    }

    public void setResultFn(Integer resultFn) {
        this.resultFn = resultFn;
    }
}
