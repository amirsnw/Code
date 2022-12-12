package ir.tamin.insurance.technical.function.brokerReport;

import ir.tamin.framework.domain.function.DBFunctionInput;


public class RequestBrokerWageReportInput implements DBFunctionInput{

    private String provinceCode;
    private String branchCode;
    private String brokerCode;
    private String startDate;
    private String endDate;
    private String userId;

    public RequestBrokerWageReportInput(String provinceCode, String branchCode, String brokerCode, String startDate, String endDate, String userId) {
        this.provinceCode = provinceCode;
        this.branchCode = branchCode;
        this.brokerCode = brokerCode;
        this.startDate = startDate;
        this.endDate = endDate;
        this.userId = userId;
    }

    public String getProvinceCode() {
        return provinceCode;
    }

    public void setProvinceCode(String provinceCode) {
        this.provinceCode = provinceCode;
    }

    public String getBranchCode() {
        return branchCode;
    }

    public void setBranchCode(String branchCode) {
        this.branchCode = branchCode;
    }

    public String getBrokerCode() {
        return brokerCode;
    }

    public void setBrokerCode(String brokerCode) {
        this.brokerCode = brokerCode;
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

    public String getUserId() {
        return userId;
    }

    public void setUserId(String userId) {
        this.userId = userId;
    }
}
