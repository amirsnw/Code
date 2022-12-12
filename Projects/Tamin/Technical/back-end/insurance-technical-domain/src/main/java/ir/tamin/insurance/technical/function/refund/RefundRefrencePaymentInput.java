
package ir.tamin.insurance.technical.function.refund;

import ir.tamin.framework.domain.function.DBFunctionInput;

/**
 *
 * @author a_khalighi
 */
public class RefundRefrencePaymentInput implements DBFunctionInput {

    private String ptype;
    private String prisunatcode;

    public RefundRefrencePaymentInput() {
    }

    public RefundRefrencePaymentInput(String ptype, String prisunatcode) {
        this.ptype = ptype;
        this.prisunatcode = prisunatcode;
    }

    public String getPtype() {
        return ptype;
    }

    public void setPtype(String ptype) {
        this.ptype = ptype;
    }

    public String getPrisunatcode() {
        return prisunatcode;
    }

    public void setPrisunatcode(String prisunatcode) {
        this.prisunatcode = prisunatcode;
    }
}
