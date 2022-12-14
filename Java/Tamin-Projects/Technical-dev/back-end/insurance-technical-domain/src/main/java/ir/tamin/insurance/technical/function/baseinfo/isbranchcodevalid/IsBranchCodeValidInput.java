/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package ir.tamin.insurance.technical.function.baseinfo.isbranchcodevalid;

import ir.tamin.framework.domain.function.DBFunctionInput;

/**
 *
 * @author e_shoghi
 */
public class IsBranchCodeValidInput implements  DBFunctionInput{
    private String branchCode;

    public IsBranchCodeValidInput() {
    }

    public IsBranchCodeValidInput(String branchCode) {
        this.branchCode = branchCode;
    }

    public String getBranchCode() {
        return branchCode;
    }

    public void setBranchCode(String branchCode) {
        this.branchCode = branchCode;
    }
    
}
