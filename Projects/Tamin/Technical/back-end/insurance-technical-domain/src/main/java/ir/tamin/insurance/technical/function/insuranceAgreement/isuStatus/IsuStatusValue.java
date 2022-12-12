
package ir.tamin.insurance.technical.function.insuranceAgreement.isuStatus;

import ir.tamin.framework.domain.function.DBFunctionValue;


public class IsuStatusValue implements DBFunctionValue {

    private String result;

    public String getResult() {
        return result;
    }

    public void setResult(String result) {
        this.result = result;
    }
    
}
