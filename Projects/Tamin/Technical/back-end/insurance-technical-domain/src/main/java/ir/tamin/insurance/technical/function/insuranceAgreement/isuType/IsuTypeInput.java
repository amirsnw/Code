
package ir.tamin.insurance.technical.function.insuranceAgreement.isuType;

import ir.tamin.framework.domain.function.DBFunctionInput;

public class IsuTypeInput implements DBFunctionInput {

    private String insuranceId;
    private String startDate;
    
    public IsuTypeInput() {
    }

    public IsuTypeInput(String insuranceId, String startDate) {
        this.insuranceId = insuranceId;
        this.startDate = startDate;
    }

    public String getInsuranceId() {
        return insuranceId;
    }

    public void setInsuranceId(String insuranceId) {
        this.insuranceId = insuranceId;
    }

    public String getStartDate() {
        return startDate;
    }

    public void setStartDate(String startDate) {
        this.startDate = startDate;
    }
    
    
}
