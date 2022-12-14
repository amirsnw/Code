package ir.tamin.insurance.technical.function.occur.occurReport;

import ir.tamin.framework.domain.function.DBFunctionInput;

/**
 * Created by a-khalighi on 5/17/2022
*/
public class OccurPartReportInput implements DBFunctionInput {
    private String branchCode;
    private String startDate;
    private String endDate;

    public OccurPartReportInput() {
    }

    public OccurPartReportInput(String branchCode, String startDate, String endDate) {
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
