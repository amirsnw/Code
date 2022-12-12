package ir.tamin.insurance.technical.function.occur;

import ir.tamin.framework.domain.function.DBFunctionInput;

/**
 * Created by a-khalighi on 5/17/2022
*/
public class GetOccureqIdInput implements DBFunctionInput {
    private String branchCode;

    public String getBranchCode() {
        return branchCode;
    }

    public void setBranchCode(String branchCode) {
        this.branchCode = branchCode;
    }

    public GetOccureqIdInput(String branchCode) {
        this.branchCode = branchCode;


    }

    public GetOccureqIdInput() {
    }
}
