package ir.tamin.insurance.technical.function.refund.calcRefundParams;

import ir.tamin.framework.domain.function.DBFunctionValue;

import java.math.BigDecimal;

/**
 * Created by na_chabok on 7/22/2019.
 */
public class CalcRefundParamsValue implements DBFunctionValue {
    private  String refundSDate;
    private  String refundEDate;
    private  BigDecimal refundMonths;
    private  BigDecimal refundDays;
    private String RefundAmount;

    public String getRefundSDate() {
        return refundSDate;
    }

    public void setRefundSDate(String refundSDate) {
        this.refundSDate = refundSDate;
    }

    public String getRefundEDate() {
        return refundEDate;
    }

    public void setRefundEDate(String refundEDate) {
        this.refundEDate = refundEDate;
    }

//    public Date getRefundSDate() {
//        if (refundSDate != null) {
//            return DateUtils.parse(refundSDate, "yyyyMMdd");
//        } else {
//            return null;
//        }
//    }
//
//    public void setRefundSDate(Date refundSDate) {
//        if (refundSDate != null) {
//            this.refundSDate = DateUtils.format(refundSDate, "yyyyMMdd");
//        } else {
//            this.refundSDate = null;
//        }
//    }
//
//    public Date getRefundEDate() {
//        if (refundEDate != null) {
//            return DateUtils.parse(refundEDate, "yyyyMMdd");
//        } else {
//            return null;
//        }
//    }
//
//    public void setRefundEDate(Date refundEDate) {
//        if (refundEDate != null) {
//            this.refundEDate = DateUtils.format(refundEDate, "yyyyMMdd");
//        } else {
//            this.refundEDate = null;
//        }
//    }


    public BigDecimal getRefundMonths() {
        return refundMonths;
    }

    public void setRefundMonths(BigDecimal refundMonths) {
        this.refundMonths = refundMonths;
    }

    public BigDecimal getRefundDays() {
        return refundDays;
    }

    public void setRefundDays(BigDecimal refundDays) {
        this.refundDays = refundDays;
    }

    public String getRefundAmount() {
        return RefundAmount;
    }

    public void setRefundAmount(String refundAmount) {
        RefundAmount = refundAmount;
    }
}
