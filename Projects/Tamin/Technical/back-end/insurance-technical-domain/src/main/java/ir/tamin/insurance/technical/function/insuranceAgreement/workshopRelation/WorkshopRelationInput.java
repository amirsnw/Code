package ir.tamin.insurance.technical.function.insuranceAgreement.workshopRelation;

import ir.tamin.framework.domain.function.DBFunctionInput;

/**
 *
 * @author m_hoseini
 */
public class WorkshopRelationInput implements DBFunctionInput {

    private String insuranceId;
    private String workshopId;
    private String currentDate;
    private String branchCode;

    public WorkshopRelationInput() {
    }    
    

    public WorkshopRelationInput(String insuranceId, String workshopId, String currentDate, String branchCode) {
        this.insuranceId = insuranceId;
        this.workshopId = workshopId;
        this.currentDate = currentDate;
        this.branchCode = branchCode;
    }   
    

    public String getInsuranceId() {
        return insuranceId;
    }

    public void setInsuranceId(String insuranceId) {
        this.insuranceId = insuranceId;
    }

    public String getWorkshopId() {
        return workshopId;
    }

    public void setWorkshopId(String workshopId) {
        this.workshopId = workshopId;
    }

    public String getCurrentDate() {
        return currentDate;
    }

    public void setCurrentDate(String currentDate) {
        this.currentDate = currentDate;
    }

    public String getBranchCode() {
        return branchCode;
    }

    public void setBranchCode(String branchCode) {
        this.branchCode = branchCode;
    }
    
    

    
}
