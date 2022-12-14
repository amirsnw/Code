package ir.tamin.insurance.technical.model.occur;

import java.io.Serializable;

/**
 * Created by a-khalighi on 5/17/2022
*/
public class SsupOccurIdeaPK implements Serializable {
    private Long reqId;
       private  String ideaSeq;

    public SsupOccurIdeaPK() {
    }

    public SsupOccurIdeaPK(Long reqId, String ideaSeq) {
        this.reqId = reqId;
        this.ideaSeq = ideaSeq;
    }

    public Long getReqId() {
        return reqId;
    }

    public void setReqId(Long reqId) {
        this.reqId = reqId;
    }

    public String getIdeaSeq() {
        return ideaSeq;
    }

    public void setIdeaSeq(String ideaSeq) {
        this.ideaSeq = ideaSeq;
    }
}
