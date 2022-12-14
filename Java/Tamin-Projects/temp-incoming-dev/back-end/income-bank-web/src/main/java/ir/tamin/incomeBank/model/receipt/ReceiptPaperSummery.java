package ir.tamin.incomeBank.model.receipt;

import java.math.BigDecimal;

public class ReceiptPaperSummery {

    private BigDecimal orderAmount;
    private BigDecimal governmentAmount;
    private Integer countIsu;

    public ReceiptPaperSummery() {
    }

    public ReceiptPaperSummery(BigDecimal orderAmount,
                               BigDecimal governmentAmount,
                               Integer countIsu) {
        this.orderAmount = orderAmount;
        this.governmentAmount = governmentAmount;
        this.countIsu = countIsu;
    }

    public BigDecimal getOrderAmount() {
        return orderAmount;
    }

    public void setOrderAmount(BigDecimal orderAmount) {
        this.orderAmount = orderAmount;
    }

    public BigDecimal getGovernmentAmount() {
        return governmentAmount;
    }

    public void setGovernmentAmount(BigDecimal governmentAmount) {
        this.governmentAmount = governmentAmount;
    }

    public Integer getCountIsu() {
        return countIsu;
    }

    public void setCountIsu(Integer countIsu) {
        this.countIsu = countIsu;
    }

}
