package ir.tamin.insurance.technical.function.insuranceAgreement.existHistory88;

import ir.tamin.framework.domain.function.DBFunctionInput;

/**
 *
 * @author m_hoseini
 */
public class ExistHistory88Input implements DBFunctionInput {

    private String insuranceId;
    private String branchCode;

    public ExistHistory88Input() {
    }   
    

    public ExistHistory88Input(String insuranceId, String branchCode) {
        this.insuranceId = insuranceId;
        this.branchCode = branchCode;
    }   
    

    public String getInsuranceId() {
        return insuranceId;
    }

    public void setInsuranceId(String insuranceId) {
        this.insuranceId = insuranceId;
    }

    public String getBranchCode() {
        return branchCode;
    }

    public void setBranchCode(String branchCode) {
        this.branchCode = branchCode;
    }
    
    
    
    

    
}
