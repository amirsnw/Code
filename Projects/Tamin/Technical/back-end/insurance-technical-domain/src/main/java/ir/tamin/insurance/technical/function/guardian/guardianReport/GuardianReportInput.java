package ir.tamin.insurance.technical.function.guardian.guardianReport;

import ir.tamin.framework.domain.function.DBFunctionInput;


public class GuardianReportInput implements DBFunctionInput{
    private String branchCode;
    private String startDate;
    private String endDate;

    public GuardianReportInput(String branchCode, String startDate, String endDate) {
        this.branchCode = branchCode;
        this.startDate = startDate;
        this.endDate = endDate;
    }

    public String getBranchCode() {
        return branchCode;
    }

    public void setBranchCode(String branchCode) {
        this.branchCode = branchCode;
    }

    public String getStartDate() {
        return startDate;
    }

    public void setStartDate(String startDate) {
        this.startDate = startDate;
    }

    public String getEndDate() {
        return endDate;
    }

    public void setEndDate(String endDate) {
        this.endDate = endDate;
    }
}