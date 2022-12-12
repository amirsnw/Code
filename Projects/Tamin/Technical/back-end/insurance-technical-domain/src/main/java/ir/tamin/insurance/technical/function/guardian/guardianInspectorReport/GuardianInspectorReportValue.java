package ir.tamin.insurance.technical.function.guardian.guardianInspectorReport;

import ir.tamin.framework.domain.function.DBFunctionValue;

/**
 *
 * @author m_hoseini
 */
public class GuardianInspectorReportValue implements DBFunctionValue {

    private String BRCH_CODE;
    private String REQDATE;
    private String GUAR_DESC;
    private String INSURE_FULLNAME;
    private String INSURE_NATCODE;
    private String INSURE_MOBILE;
    private String GUAR_FULLNAME;
    private String GUAR_NATCODE;
    private String GUAR_BIRTHDATE;
    private String ADDRESS;

    public String getREQDATE() {
        return REQDATE;
    }

    public void setREQDATE(String REQDATE) {
        this.REQDATE = REQDATE;
    }

    public String getBRCH_CODE() {
        return BRCH_CODE;
    }

    public void setBRCH_CODE(String BRCH_CODE) {
        this.BRCH_CODE = BRCH_CODE;
    } 

    public String getGUAR_DESC() {
        return GUAR_DESC;
    }

    public void setGUAR_DESC(String GUAR_DESC) {
        this.GUAR_DESC = GUAR_DESC;
    }

    public String getINSURE_FULLNAME() {
        return INSURE_FULLNAME;
    }

    public void setINSURE_FULLNAME(String INSURE_FULLNAME) {
        this.INSURE_FULLNAME = INSURE_FULLNAME;
    }

    public String getINSURE_NATCODE() {
        return INSURE_NATCODE;
    }

    public void setINSURE_NATCODE(String INSURE_NATCODE) {
        this.INSURE_NATCODE = INSURE_NATCODE;
    }

    public String getINSURE_MOBILE() {
        return INSURE_MOBILE;
    }

    public void setINSURE_MOBILE(String INSURE_MOBILE) {
        this.INSURE_MOBILE = INSURE_MOBILE;
    }

    public String getGUAR_FULLNAME() {
        return GUAR_FULLNAME;
    }

    public void setGUAR_FULLNAME(String GUAR_FULLNAME) {
        this.GUAR_FULLNAME = GUAR_FULLNAME;
    }

    public String getGUAR_NATCODE() {
        return GUAR_NATCODE;
    }

    public void setGUAR_NATCODE(String GUAR_NATCODE) {
        this.GUAR_NATCODE = GUAR_NATCODE;
    }

    public String getGUAR_BIRTHDATE() {
        return GUAR_BIRTHDATE;
    }

    public void setGUAR_BIRTHDATE(String GUAR_BIRTHDATE) {
        this.GUAR_BIRTHDATE = GUAR_BIRTHDATE;
    }

    public String getADDRESS() {
        return ADDRESS;
    }

    public void setADDRESS(String ADDRESS) {
        this.ADDRESS = ADDRESS;
    }
    
    
    
    
     
     
     
     
    


}
