package ir.tamin.insurance.technical.function.refund;

import ir.tamin.framework.domain.function.DBFunctionValue;

import java.math.BigDecimal;

/**
 *
 * @author a_khalighi
 */
public class RefundDebitDetailValue implements DBFunctionValue {

    private String cntCntrctNo;//
    private String cwsDbtNo;
    private String cwsSeq;
    private String year;
    private String month;
    private String day;
    private String debitTypeCode;
    private String spcrateCode;//
    private String spcratrpmDesc;
    private BigDecimal dastmozd;
    private BigDecimal amount;

    public String getCntCntrctNo() {
        return cntCntrctNo;
    }

    public void setCntCntrctNo(String cntCntrctNo) {
        this.cntCntrctNo = cntCntrctNo;
    }

    public String getCwsDbtNo() {
        return cwsDbtNo;
    }

    public void setCwsDbtNo(String cwsDbtNo) {
        this.cwsDbtNo = cwsDbtNo;
    }

    public String getCwsSeq() {
        return cwsSeq;
    }

    public void setCwsSeq(String cwsSeq) {
        this.cwsSeq = cwsSeq;
    }

    public String getYear() {
        return year;
    }

    public void setYear(String year) {
        this.year = year;
    }

    public String getMonth() {
        return month;
    }

    public void setMonth(String month) {
        this.month = month;
    }

    public String getDay() {
        return day;
    }

    public void setDay(String day) {
        this.day = day;
    }

    public String getDebitTypeCode() {
        return debitTypeCode;
    }

    public void setDebitTypeCode(String debitTypeCode) {
        this.debitTypeCode = debitTypeCode;
    }

    public String getSpcrateCode() {
        return spcrateCode;
    }

    public void setSpcrateCode(String spcrateCode) {
        this.spcrateCode = spcrateCode;
    }

    public String getSpcratrpmDesc() {
        return spcratrpmDesc;
    }

    public void setSpcratrpmDesc(String spcratrpmDesc) {
        this.spcratrpmDesc = spcratrpmDesc;
    }

    public BigDecimal getDastmozd() {
        return dastmozd;
    }

    public void setDastmozd(BigDecimal dastmozd) {
        this.dastmozd = dastmozd;
    }

    public BigDecimal getAmount() {
        return amount;
    }

    public void setAmount(BigDecimal amount) {
        this.amount = amount;
    }
}
