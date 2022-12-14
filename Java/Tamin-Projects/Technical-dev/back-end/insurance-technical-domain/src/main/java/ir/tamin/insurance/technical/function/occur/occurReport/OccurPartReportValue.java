package ir.tamin.insurance.technical.function.occur.occurReport;

import ir.tamin.framework.domain.function.DBFunctionValue;

import java.math.BigDecimal;

/**
 * Created by a-khalighi on 5/17/2022
*/
public class OccurPartReportValue implements DBFunctionValue {
    private BigDecimal row_id;
    private String part_code;
    private String part_desc;
    private BigDecimal part_cnt;
    private BigDecimal isu_cnt;

    public OccurPartReportValue() {
    }

    public BigDecimal getRow_id() {
        return row_id;
    }

    public void setRow_id(BigDecimal row_id) {
        this.row_id = row_id;
    }

    public BigDecimal getPart_cnt() {
        return part_cnt;
    }

    public void setPart_cnt(BigDecimal part_cnt) {
        this.part_cnt = part_cnt;
    }

    public BigDecimal getIsu_cnt() {
        return isu_cnt;
    }

    public void setIsu_cnt(BigDecimal isu_cnt) {
        this.isu_cnt = isu_cnt;
    }

    public String getPart_code() {
        return part_code;
    }

    public void setPart_code(String part_code) {
        this.part_code = part_code;
    }

    public String getPart_desc() {
        return part_desc;
    }

    public void setPart_desc(String part_desc) {
        this.part_desc = part_desc;
    }
}
