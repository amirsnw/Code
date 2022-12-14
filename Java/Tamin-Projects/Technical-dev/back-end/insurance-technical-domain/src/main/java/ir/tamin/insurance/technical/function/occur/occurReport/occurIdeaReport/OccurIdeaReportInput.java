package ir.tamin.insurance.technical.function.occur.occurReport.occurIdeaReport;

import ir.tamin.framework.domain.function.DBFunctionInput;

/**
 * Created by a-khalighi on 5/17/2022
*/
public class OccurIdeaReportInput implements DBFunctionInput {
    private String reqId;
    private String ideaSeq;

    public OccurIdeaReportInput() {

    }

    public OccurIdeaReportInput(String reqId, String ideaSeq) {
        this.reqId = reqId;
        this.ideaSeq = ideaSeq;
    }

    public String getIdeaSeq() {
        return ideaSeq;
    }

    public void setIdeaSeq(String ideaSeq) {
        this.ideaSeq = ideaSeq;
    }

    public String getReqId() {
        return reqId;
    }

    public void setReqId(String reqId) {
        this.reqId = reqId;
    }
}
