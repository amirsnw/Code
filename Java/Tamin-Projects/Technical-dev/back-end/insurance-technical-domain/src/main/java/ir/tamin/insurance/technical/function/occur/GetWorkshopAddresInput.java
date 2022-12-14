package ir.tamin.insurance.technical.function.occur;

import ir.tamin.framework.domain.function.DBFunctionInput;

/**
 * Created by a-khalighi on 5/17/2022
*/


public class GetWorkshopAddresInput implements DBFunctionInput {
    private String branchCode;
    private String prwshid;
    private String pdate;

    public GetWorkshopAddresInput() {
    }

    public GetWorkshopAddresInput(String branchCode, String prwshid, String pdate) {
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
