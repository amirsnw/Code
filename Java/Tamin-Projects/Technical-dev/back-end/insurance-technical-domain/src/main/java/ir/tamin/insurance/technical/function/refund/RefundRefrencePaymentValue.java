package ir.tamin.insurance.technical.function.refund;

import ir.tamin.framework.domain.function.DBFunctionValue;

/**
 *
 * @author a_khalighi
 */
public class RefundRefrencePaymentValue implements DBFunctionValue {

    private String RISUID;
    private String CNT_CNTRCTNO;
    private String BRCH_CODE;
    private String CWS_DBTNO;
    private String CWS_DBTSDATE;
    private String CWS_DBTEDATE;
    private String ISU_DEBITTYPECODE;
    private String DARMAN_DEBITTYPECODE;
    private String SPCRATEDESC;
    private String SPCRATECODE;
    private String PAYDATE;
    private String SELFISUTYPECODE;
    private String SELFISUTYPEDESC;
    private String SYSTEMTYPE;
    private String TYPECODE;
    private String RESNUM;
    private String AMOUNT;
    private String WORKDAY;

    public String getRISUID() {
        return RISUID;
    }

    public void setRISUID(String RISUID) {
        this.RISUID = RISUID;
    }

    public String getCNT_CNTRCTNO() {
        return CNT_CNTRCTNO;
    }

    public void setCNT_CNTRCTNO(String CNT_CNTRCTNO) {
        this.CNT_CNTRCTNO = CNT_CNTRCTNO;
    }

    public String getCWS_DBTNO() {
        return CWS_DBTNO;
    }

    public void setCWS_DBTNO(String CWS_DBTNO) {
        this.CWS_DBTNO = CWS_DBTNO;
    }

    public String getCWS_DBTSDATE() {
        return CWS_DBTSDATE;
    }

    public void setCWS_DBTSDATE(String CWS_DBTSDATE) {
        this.CWS_DBTSDATE = CWS_DBTSDATE;
    }

    public String getCWS_DBTEDATE() {
        return CWS_DBTEDATE;
    }

    public void setCWS_DBTEDATE(String CWS_DBTEDATE) {
        this.CWS_DBTEDATE = CWS_DBTEDATE;
    }

    public String getSPCRATEDESC() {
        return SPCRATEDESC;
    }

    public void setSPCRATEDESC(String SPCRATEDESC) {
        this.SPCRATEDESC = SPCRATEDESC;
    }

    public String getSPCRATECODE() {
        return SPCRATECODE;
    }

    public void setSPCRATECODE(String SPCRATECODE) {
        this.SPCRATECODE = SPCRATECODE;
    }

    public String getPAYDATE() {
        return PAYDATE;
    }

    public void setPAYDATE(String PAYDATE) {
        this.PAYDATE = PAYDATE;
    }

    public String getSELFISUTYPECODE() {
        return SELFISUTYPECODE;
    }

    public void setSELFISUTYPECODE(String SELFISUTYPECODE) {
        this.SELFISUTYPECODE = SELFISUTYPECODE;
    }

    public String getSELFISUTYPEDESC() {
        return SELFISUTYPEDESC;
    }

    public void setSELFISUTYPEDESC(String SELFISUTYPEDESC) {
        this.SELFISUTYPEDESC = SELFISUTYPEDESC;
    }

    public String getSYSTEMTYPE() {
        return SYSTEMTYPE;
    }

    public void setSYSTEMTYPE(String SYSTEMTYPE) {
        this.SYSTEMTYPE = SYSTEMTYPE;
    }

    public String getRESNUM() {
        return RESNUM;
    }

    public void setRESNUM(String RESNUM) {
        this.RESNUM = RESNUM;
    }

    public String getAMOUNT() {
        return AMOUNT;
    }

    public void setAMOUNT(String AMOUNT) {
        this.AMOUNT = AMOUNT;
    }

    public String getWORKDAY() {
        return WORKDAY;
    }

    public void setWORKDAY(String WORKDAY) {
        this.WORKDAY = WORKDAY;
    }

    public String getTYPECODE() {
        return TYPECODE;
    }

    public void setTYPECODE(String TYPECODE) {
        this.TYPECODE = TYPECODE;
    }

    public String getISU_DEBITTYPECODE() {
        return ISU_DEBITTYPECODE;
    }

    public void setISU_DEBITTYPECODE(String ISU_DEBITTYPECODE) {
        this.ISU_DEBITTYPECODE = ISU_DEBITTYPECODE;
    }

    public String getDARMAN_DEBITTYPECODE() {
        return DARMAN_DEBITTYPECODE;
    }

    public void setDARMAN_DEBITTYPECODE(String DARMAN_DEBITTYPECODE) {
        this.DARMAN_DEBITTYPECODE = DARMAN_DEBITTYPECODE;
    }

    public String getBRCH_CODE() {
        return BRCH_CODE;
    }

    public void setBRCH_CODE(String BRCH_CODE) {
        this.BRCH_CODE = BRCH_CODE;
    }
}
