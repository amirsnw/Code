package ir.tamin.insurance.technical.function.refund;

import ir.tamin.framework.domain.function.DBFunctionInput;

/**
 *
 * @author a_khalighi
 */
public class RefundHistoryInput implements DBFunctionInput {

    private String prisuid;
    private String puserid;
    private String ptypecode;
    private String pcategorytypecode;
    private String psdate;
    private String pedate;

    public RefundHistoryInput(String prisuid, String puserid, String ptypecode, String pcategorytypecode, String psdate, String pedate) {
        this.prisuid = prisuid;
        this.puserid = puserid;
        this.ptypecode = ptypecode;
        this.pcategorytypecode = pcategorytypecode;
        this.psdate = psdate;
        this.pedate = pedate;
    }

    public RefundHistoryInput() {
    }

    public String getPrisuid() {
        return prisuid;
    }

    public void setPrisuid(String prisuid) {
        this.prisuid = prisuid;
    }

    public String getPuserid() {
        return puserid;
    }

    public void setPuserid(String puserid) {
        this.puserid = puserid;
    }

    public String getPtypecode() {
        return ptypecode;
    }

    public void setPtypecode(String ptypecode) {
        this.ptypecode = ptypecode;
    }

    public String getPcategorytypecode() {
        return pcategorytypecode;
    }

    public void setPcategorytypecode(String pcategorytypecode) {
        this.pcategorytypecode = pcategorytypecode;
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
