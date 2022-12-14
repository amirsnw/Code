package ir.tamin.insurance.technical.function.refund;

import ir.tamin.framework.domain.function.DBFunctionValue;

import java.math.BigDecimal;

/**
 *
 * @author a_khalighi
 */
public class RefundDetailValue implements DBFunctionValue {

    private String cntCntrctNo;
    private String cwsDbtNo;
    private String year;
    private String month;
    private String day;
    private String debitTypeCode;
    private String spcratprmDesc;
    private BigDecimal amount;
    private String status;
    private String statusDesc;

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

    public String getSpcratprmDesc() {
        return spcratprmDesc;
    }

    public void setSpcratprmDesc(String spcratprmDesc) {
        this.spcratprmDesc = spcratprmDesc;
    }

    public BigDecimal getAmount() {
        return amount;
    }

    public void setAmount(BigDecimal amount) {
        this.amount = amount;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public String getStatusDesc() {
        return statusDesc;
    }

    public void setStatusDesc(String statusDesc) {
        this.statusDesc = statusDesc;
    }
}
