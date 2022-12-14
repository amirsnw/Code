package ir.tamin.insurance.technical.function.refund;

import ir.tamin.framework.domain.function.DBFunctionInput;

/**
 *
 * @author a_khalighi
 */
public class RefundDarmanCalcInput implements DBFunctionInput {

    private String p_cws_dbtno;
    private String p_ref_sdate;
    private String p_ref_edate;
    private String p_selftype;
    private String p_spcrate;
    private String p_reason_code;

    
    public RefundDarmanCalcInput() {
    }

    public RefundDarmanCalcInput(String p_cws_dbtno, String p_ref_sdate, String p_ref_edate, String p_selftype, String p_spcrate, String p_reason_code) {
        this.p_cws_dbtno = p_cws_dbtno;
        this.p_ref_sdate = p_ref_sdate;
        this.p_ref_edate = p_ref_edate;
        this.p_selftype = p_selftype;
        this.p_spcrate = p_spcrate;
        this.p_reason_code = p_reason_code;
    }
  

    public String getP_cws_dbtno() {
        return p_cws_dbtno;
    }

    public void setP_cws_dbtno(String p_cws_dbtno) {
        this.p_cws_dbtno = p_cws_dbtno;
    }

    public String getP_ref_sdate() {
        return p_ref_sdate;
    }

    public void setP_ref_sdate(String p_ref_sdate) {
        this.p_ref_sdate = p_ref_sdate;
    }

    public String getP_ref_edate() {
        return p_ref_edate;
    }

    public void setP_ref_edate(String p_ref_edate) {
        this.p_ref_edate = p_ref_edate;
    }

    public String getP_selftype() {
        return p_selftype;
    }

    public void setP_selftype(String p_selftype) {
        this.p_selftype = p_selftype;
    }

    public String getP_spcrate() {
        return p_spcrate;
    }

    public void setP_spcrate(String p_spcrate) {
        this.p_spcrate = p_spcrate;
    }

    public String getP_reason_code() {
        return p_reason_code;
    }

    public void setP_reason_code(String p_reason_code) {
        this.p_reason_code = p_reason_code;
    }
    
}
