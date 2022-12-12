package ir.tamin.insurance.technical.function.refund.calcRefundParams;

import ir.tamin.framework.domain.function.DBFunctionInput;

/**
 * Created by na_chabok on 7/22/2019.
 */
public class CalcRefundParamsInput  implements DBFunctionInput {
    private String branchCode;
    private String risuid;
    private String solDate;
    private String sequence;
    private  String refundType;

    public CalcRefundParamsInput() {
    }

    public CalcRefundParamsInput(String branchCode, String risuid, String solDate, String sequence, String refundType) {
        this.branchCode = branchCode;
        this.risuid = risuid;
        this.solDate = solDate;
        this.sequence = sequence;
        this.refundType = refundType;
    }

    public String getBranchCode() {
        return branchCode;
    }

    public void setBranchCode(String branchCode) {
        this.branchCode = branchCode;
    }

    public String getRisuid() {
        return risuid;
    }

    public void setRisuid(String risuid) {
        this.risuid = risuid;
    }

    public String getSolDate() {
        return solDate;
    }

    public void setSolDate(String solDate) {
        this.solDate = solDate;
    }

    public String getSequence() {
        return sequence;
    }

    public void setSequence(String sequence) {
        this.sequence = sequence;
    }

    public String getRefundType() {
        return refundType;
    }

    public void setRefundType(String refundType) {
        this.refundType = refundType;
    }
}
