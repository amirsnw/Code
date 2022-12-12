package ir.tamin.insurance.technical.function.occur.occurReport;

import ir.tamin.framework.domain.function.DBFunctionInput;

/**
 * Created by a-khalighi on 5/17/2022
*/
public class OccurReviewReportInput implements DBFunctionInput {
    private String reqId;

    public OccurReviewReportInput() {
    }

    public OccurReviewReportInput(String reqId) {
        this.reqId = reqId;
    }

    public String getReqId() {
        return reqId;
    }

    public void setReqId(String reqId) {
        this.reqId = reqId;
    }
}
