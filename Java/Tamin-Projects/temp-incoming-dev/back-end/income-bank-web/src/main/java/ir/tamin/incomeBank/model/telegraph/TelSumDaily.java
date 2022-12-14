package ir.tamin.incomeBank.model.telegraph;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;
import java.io.Serializable;
import java.math.BigDecimal;

@Entity
@Table(name = "VWDRMD_GL")
public class TelSumDaily implements Serializable {

    @Id
    @Column(name = "rownum")
    private String rowNum;

    @Column(name = "BRCH_CODE")
    private String brhCode;

    @Column(name = "BRCH_NAME")
    private String brhName;

    @Column(name = "ORD_DATE")
    private String orderDate;

    @Column(name = "EDKOL_CODE")
    private String edareCode;

    @Column(name = "EDKOL_NAME")
    private String edareName;

    @Column(name = "SUM_AMT")
    private BigDecimal sumAmount;

    public String getRowNum() {
        return rowNum;
    }

    public void setRowNum(String rowNum) {
        this.rowNum = rowNum;
    }

    public String getBrhCode() {
        return brhCode;
    }

    public void setBrhCode(String brhCode) {
        this.brhCode = brhCode;
    }

    public String getBrhName() {
        return brhName;
    }

    public void setBrhName(String brhName) {
        this.brhName = brhName;
    }

    public String getOrderDate() {
        return orderDate;
    }

    public void setOrderDate(String orderDate) {
        this.orderDate = orderDate;
    }

    public String getEdareCode() {
        return edareCode;
    }

    public void setEdareCode(String edareCode) {
        this.edareCode = edareCode;
    }

    public String getEdareName() {
        return edareName;
    }

    public void setEdareName(String edareName) {
        this.edareName = edareName;
    }

    public BigDecimal getSumAmount() {
        return sumAmount;
    }

    public void setSumAmount(BigDecimal sumAmount) {
        this.sumAmount = sumAmount;
    }
}
