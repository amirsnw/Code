package ir.tamin.insurance.technical.function.insuranceAgreement.medicalValidation;

import ir.tamin.framework.domain.function.DBFunctionInput;

/**
 *
 * @author m_hoseini
 */
public class MedicalValidationInput implements DBFunctionInput {

    private String insuranceId;
    private String nationalCode;
    private String requestDate;

    public MedicalValidationInput() {
    }
    

    public MedicalValidationInput(String insuranceId, String nationalCode, String requestDate) {
        this.insuranceId = insuranceId;
        this.nationalCode = nationalCode;
        this.requestDate = requestDate;
    }

    public String getInsuranceId() {
        return insuranceId;
    }

    public void setInsuranceId(String insuranceId) {
        this.insuranceId = insuranceId;
    }

    public String getNationalCode() {
        return nationalCode;
    }

    public void setNationalCode(String nationalCode) {
        this.nationalCode = nationalCode;
    }

    public String getRequestDate() {
        return requestDate;
    }

    public void setRequestDate(String requestDate) {
        this.requestDate = requestDate;
    }
    
    
    
    
    
}
