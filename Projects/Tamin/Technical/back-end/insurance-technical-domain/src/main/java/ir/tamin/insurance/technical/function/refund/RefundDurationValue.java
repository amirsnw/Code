package ir.tamin.insurance.technical.function.refund;

import ir.tamin.framework.domain.function.DBFunctionValue;

import java.math.BigDecimal;

/**
 *
 * @author a_khalighi
 */
public class RefundDurationValue implements DBFunctionValue {

    private String cntCntrctNo;
    private String cwsDbtNo;
    private String status;
    private BigDecimal amount;
    private String debitTypeCode;
    private String spcratprmDesc;
    private String startDate;
    private String endDate;

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

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public BigDecimal getAmount() {
        return amount;
    }

    public void setAmount(BigDecimal amount) {
        this.amount = amount;
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

    public String getStartDate() {
        return startDate;
    }

    public void setStartDate(String startDate) {
        this.startDate = startDate;
    }

    public String getEndDate() {
        return endDate;
    }

    public void setEndDate(String endDate) {
        this.endDate = endDate;
    }
}
