
package ir.tamin.insurance.technical.function.insuranceAgreement.isuStatus;

import ir.tamin.framework.domain.function.DBFunctionInput;


public class IsuStatusInput implements DBFunctionInput {

    private String insuranceId;
    private String startDate;

    public IsuStatusInput() {
    }

    public IsuStatusInput(String insuranceId, String startDate) {
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
