package ir.tamin.insurance.technical.function.refund;

import ir.tamin.framework.domain.function.DBFunctionInput;

/**
 *
 * @author a_khalighi
 */
public class RefundDebitDetailInput implements DBFunctionInput {

    private String pcws_dbtno;
    private String pnatcode;
    private String psdate;
    private String pedate;


    public RefundDebitDetailInput() {
    }

    public RefundDebitDetailInput(String pcws_dbtno, String pnatcode, String psdate, String pedate) {
        this.pcws_dbtno = pcws_dbtno;
        this.pnatcode = pnatcode;
        this.psdate = psdate;
        this.pedate = pedate;
    }

    public String getPcws_dbtno() {
        return pcws_dbtno;
    }

    public void setPcws_dbtno(String pcws_dbtno) {
        this.pcws_dbtno = pcws_dbtno;
    }

    public String getPnatcode() {
        return pnatcode;
    }

    public void setPnatcode(String pnatcode) {
        this.pnatcode = pnatcode;
    }

    public String getPsdate() {
        return psdate;
    }

    public void setPsdate(String psdate) {
        this.psdate = psdate;
    }

    public String getPedate() {
        return pedate;
    }

    public void setPedate(String pedate) {
        this.pedate = pedate;
    }
}
