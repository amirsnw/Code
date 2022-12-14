package ir.tamin.insurance.technical.function.refund;

import ir.tamin.framework.domain.function.DBFunctionInput;

/**
 *
 * @author a_khalighi
 */
public class RefundReduceHistInput implements DBFunctionInput {

    private String pnatid;
    private String pbrch_code;
    private String puserid;
    private String p_risuid;
    private String p_ordno;
    private String p_dordno;
    private String p_worsdate;
    private String p_woredate;
    private int p_wordays;
    private String p_mazadflg;

    public RefundReduceHistInput() {
    }

    public RefundReduceHistInput(String pnatid, String pbrch_code, String puserid, String p_risuid, String p_ordno,
                                 String p_dordno, String p_worsdate, String p_woredate, int p_wordays,
                                 String p_mazadflg) {
        this.pnatid = pnatid;
        this.pbrch_code = pbrch_code;
        this.puserid = puserid;
        this.p_risuid = p_risuid;
        this.p_ordno = p_ordno;
        this.p_dordno = p_dordno;
        this.p_worsdate = p_worsdate;
        this.p_woredate = p_woredate;
        this.p_wordays = p_wordays;
        this.p_mazadflg = p_mazadflg;
    }

    public String getPnatid() {
        return pnatid;
    }

    public void setPnatid(String pnatid) {
        this.pnatid = pnatid;
    }

    public String getPbrch_code() {
        return pbrch_code;
    }

    public void setPbrch_code(String pbrch_code) {
        this.pbrch_code = pbrch_code;
    }

    public String getPuserid() {
        return puserid;
    }

    public void setPuserid(String puserid) {
        this.puserid = puserid;
    }

    public String getP_risuid() {
        return p_risuid;
    }

    public void setP_risuid(String p_risuid) {
        this.p_risuid = p_risuid;
    }

    public String getP_ordno() {
        return p_ordno;
    }

    public void setP_ordno(String p_ordno) {
        this.p_ordno = p_ordno;
    }

    public String getP_dordno() {
        return p_dordno;
    }

    public void setP_dordno(String p_dordno) {
        this.p_dordno = p_dordno;
    }

    public String getP_worsdate() {
        return p_worsdate;
    }

    public void setP_worsdate(String p_worsdate) {
        this.p_worsdate = p_worsdate;
    }

    public String getP_woredate() {
        return p_woredate;
    }

    public void setP_woredate(String p_woredate) {
        this.p_woredate = p_woredate;
    }

    public int getP_wordays() {
        return p_wordays;
    }

    public void setP_wordays(int p_wordays) {
        this.p_wordays = p_wordays;
    }

    public String getP_mazadflg() {
        return p_mazadflg;
    }

    public void setP_mazadflg(String p_mazadflg) {
        this.p_mazadflg = p_mazadflg;
    }
}
