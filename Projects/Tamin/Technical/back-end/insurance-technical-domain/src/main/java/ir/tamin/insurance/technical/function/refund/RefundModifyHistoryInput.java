package ir.tamin.insurance.technical.function.refund;

import ir.tamin.framework.domain.function.DBFunctionInput;

/**
 *
 * @author a_khalighi
 */
public class RefundModifyHistoryInput implements DBFunctionInput {

    private String preqid;
    private String pcategorytypecode;

    public String getPreqid() {
        return preqid;
    }

    public RefundModifyHistoryInput(String preqid, String pcategorytypecode) {
        this.preqid = preqid;
        this.pcategorytypecode = pcategorytypecode;
    }

    public RefundModifyHistoryInput() {
    }
    
    public void setPreqid(String preqid) {
        this.preqid = preqid;
    }

    public String getPcategorytypecode() {
        return pcategorytypecode;
    }

    public void setPcategorytypecode(String pcategorytypecode) {
        this.pcategorytypecode = pcategorytypecode;
    }

    
}
