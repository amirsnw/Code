package ir.tamin.insurance.technical.model.occur;

import java.io.Serializable;

/**
 * Created by a-khalighi on 5/17/2022
*/
public class SsupOccurPartlistPK  implements Serializable {

    private Long reqId;
    private String partCode;

    public SsupOccurPartlistPK() {}

    public SsupOccurPartlistPK(Long reqId, String partCode) {
        this.reqId = reqId;
        this.partCode = partCode;
    }

    public Long getReqId() {
        return reqId;
    }

    public void setReqId(Long reqId) {
        this.reqId = reqId;
    }

    public String getPartCode() {
        return partCode;
    }

    public void setPartCode(String partCode) {
        this.partCode = partCode;
    }
}
