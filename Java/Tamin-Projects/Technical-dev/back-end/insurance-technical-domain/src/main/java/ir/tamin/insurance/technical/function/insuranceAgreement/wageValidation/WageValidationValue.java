package ir.tamin.insurance.technical.function.insuranceAgreement.wageValidation;

import ir.tamin.framework.domain.function.DBFunctionValue;
import ir.tamin.framework.domain.function.Out;

/**
 *
 * @author m_hoseini
 */
public class WageValidationValue implements DBFunctionValue {
    @Out(index = 1)
    private String result;
    @Out(index = 10)
    private String pLowWage;
    @Out(index = 11)
    private String pHighWage;

    public String getResult() {
        return result;
    }

    public void setResult(String result) {
        this.result = result;
    }

    public String getpLowWage() {
        return pLowWage;
    }

    public void setpLowWage(String pLowWage) {
        this.pLowWage = pLowWage;
    }

    public String getpHighWage() {
        return pHighWage;
    }

    public void setpHighWage(String pHighWage) {
        this.pHighWage = pHighWage;
    }
}
