package ir.tamin.insurance.technical.function.refund;

import ir.tamin.framework.domain.function.DBFunctionInput;

/**
 *
 * @author a_khalighi
 */
public class RefundDetailInput implements DBFunctionInput {

    private String paymentrefid;


    public RefundDetailInput() {
    }

    public RefundDetailInput(String paymentrefid) {
        this.paymentrefid = paymentrefid;
    }

    public String getPaymentrefid() {
        return paymentrefid;
    }

    public void setPaymentrefid(String paymentrefid) {
        this.paymentrefid = paymentrefid;
    }
}
