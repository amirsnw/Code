package ir.tamin.insurance.technical.function.insuranceAgreement.medicalValidation;

import ir.tamin.framework.domain.function.DBFunctionValue;
import ir.tamin.framework.domain.function.Out;

public class MedicalValidationValue implements DBFunctionValue {

    @Out(index = 1)
    private String result;

    public String getResult() {
        return result;
    }

    public void setResult(String result) {
        this.result = result;
    }
    
    
    
}
