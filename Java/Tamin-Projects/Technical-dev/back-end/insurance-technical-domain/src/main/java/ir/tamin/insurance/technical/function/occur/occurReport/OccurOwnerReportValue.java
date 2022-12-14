package ir.tamin.insurance.technical.function.occur.occurReport;

import ir.tamin.framework.domain.function.DBFunctionValue;

import java.math.BigDecimal;

/**
 * Created by a-khalighi on 5/17/2022
*/
public class OccurOwnerReportValue implements DBFunctionValue {

    private BigDecimal row_id;
    private String req_owner;
    private String owner_desc;
    private BigDecimal cnt;

    public OccurOwnerReportValue() {
    }

    public BigDecimal getRow_id() {
        return row_id;
    }

    public void setRow_id(BigDecimal row_id) {
        this.row_id = row_id;
    }

    public String getReq_owner() {
        return req_owner;
    }

    public void setReq_owner(String req_owner) {
        this.req_owner = req_owner;
    }

    public String getOwner_desc() {
        return owner_desc;
    }

    public void setOwner_desc(String owner_desc) {
        this.owner_desc = owner_desc;
    }

    public BigDecimal getCnt() {
        return cnt;
    }

    public void setCnt(BigDecimal cnt) {
        this.cnt = cnt;
    }
}
