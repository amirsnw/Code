package ir.tamin.insurance.technical.function.insuranceAgreement.validation;

import ir.tamin.framework.domain.function.DBFunctionValue;


public class AgreementRequestValidationValue implements DBFunctionValue {

    private String result;
    private String pStatusCode;
    private String pStatusDesc;

    public String getResult() {
        return result;
    }

    public void setResult(String result) {
        this.result = result;
    }   

    public String getpStatusCode() {
        return pStatusCode;
    }

    public void setpStatusCode(String pStatusCode) {
        this.pStatusCode = pStatusCode;
    }

    public String getpStatusDesc() {
        return pStatusDesc;
    }

    public void setpStatusDesc(String pStatusDesc) {
        this.pStatusDesc = pStatusDesc;
    }
    
    
    
}
