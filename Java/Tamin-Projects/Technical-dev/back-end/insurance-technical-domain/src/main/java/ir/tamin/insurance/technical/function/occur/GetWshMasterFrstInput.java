package ir.tamin.insurance.technical.function.occur;

import ir.tamin.framework.domain.function.DBFunctionInput;

/**
 * Created by sh-kalantari on 7/7/2019.
 */
public class GetWshMasterFrstInput  implements DBFunctionInput {
    private String branchCode;
    private String prwshid;
    private String pdate;

    public GetWshMasterFrstInput() {
    }

    public GetWshMasterFrstInput(String branchCode, String prwshid, String pdate) {
        this.branchCode = branchCode;
        this.prwshid = prwshid;
        this.pdate = pdate;
    }

    public String getBranchCode() {
        return branchCode;
    }

    public void setBranchCode(String branchCode) {
        this.branchCode = branchCode;
    }

    public String getPrwshid() {
        return prwshid;
    }

    public void setPrwshid(String prwshid) {
        this.prwshid = prwshid;
    }

    public String getPdate() {
        return pdate;
    }

    public void setPdate(String pdate) {
        this.pdate = pdate;
    }
}
