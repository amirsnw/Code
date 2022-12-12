package ir.tamin.insurance.technical.function.occur;

import ir.tamin.framework.domain.function.DBFunctionInput;

/**
 * Created by a-khalighi on 5/17/2022
*/
public class GetOccurideaSeqInput  implements DBFunctionInput {
    private String reqId;

    public GetOccurideaSeqInput() {
    }

    public GetOccurideaSeqInput(String reqId) {
        this.reqId = reqId;
    }

    public String getReqId() {
        return reqId;
    }

    public void setReqId(String reqId) {
        this.reqId = reqId;
    }
}
