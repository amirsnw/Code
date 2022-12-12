package ir.tamin.insurance.technical.function.general.getProv;

import ir.tamin.framework.domain.function.DBFunctionInput;

/**
 *
 * @author m_hoseini
 */
public class GetProvInput implements DBFunctionInput {

    private String branchCode;

    public String getBranchCode() {
        return branchCode;
    }

    public void setBranchCode(String branchCode) {
        this.branchCode = branchCode;
    }

    public GetProvInput(String branchCode) {
        this.branchCode = branchCode;
    }

    public GetProvInput() {
    }

}
