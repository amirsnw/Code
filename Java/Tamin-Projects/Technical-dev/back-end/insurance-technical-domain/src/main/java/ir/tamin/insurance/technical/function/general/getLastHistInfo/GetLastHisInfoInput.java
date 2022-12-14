package ir.tamin.insurance.technical.function.general.getLastHistInfo;
import ir.tamin.framework.domain.function.DBFunctionInput;

/**
 *
 * @author m_Alipour
 */

public class GetLastHisInfoInput implements DBFunctionInput  {

    private String branchCode;
    private String isuID;
    private String isuNatCode;

    public GetLastHisInfoInput() {
    }

    public GetLastHisInfoInput(String branchCode, String isuID, String isuNatCode) {
        this.branchCode = branchCode;
        this.isuID = isuID;
        this.isuNatCode = isuNatCode;
    }

    public String getBranchCode() {
        return branchCode;
    }

    public void setBranchCode(String branchCode) {
        this.branchCode = branchCode;
    }

    public String getIsuID() {
        return isuID;
    }

    public void setIsuID(String isuID) {
        this.isuID = isuID;
    }

    public String getIsuNatCode() {
        return isuNatCode;
    }

    public void setIsuNatCode(String isuNatCode) {
        this.isuNatCode = isuNatCode;
    }
}
