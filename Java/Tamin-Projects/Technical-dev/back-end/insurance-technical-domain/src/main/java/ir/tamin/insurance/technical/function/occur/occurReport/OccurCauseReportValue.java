package ir.tamin.insurance.technical.function.occur.occurReport;

import ir.tamin.framework.domain.function.DBFunctionValue;

import java.math.BigDecimal;

/**
 * Created by a-khalighi on 5/17/2022
*/
public class OccurCauseReportValue  implements DBFunctionValue {
    private BigDecimal row_id;
       private String occur_cause;
       private String resdesc;
       private BigDecimal cnt;

    public OccurCauseReportValue() {
    }

    public BigDecimal getRow_id() {
        return row_id;
    }

    public void setRow_id(BigDecimal row_id) {
        this.row_id = row_id;
    }

    public String getOccur_cause() {
        return occur_cause;
    }

    public void setOccur_cause(String occur_cause) {
        this.occur_cause = occur_cause;
    }

    public String getResdesc() {
        return resdesc;
    }

    public void setResdesc(String resdesc) {
        this.resdesc = resdesc;
    }

    public BigDecimal getCnt() {
        return cnt;
    }

    public void setCnt(BigDecimal cnt) {
        this.cnt = cnt;
    }
}
