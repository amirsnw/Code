/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package ir.tamin.insurance.technical.function.general.typeOfIsu;

import ir.tamin.framework.domain.function.DBFunctionInput;

/**
 *
 * @author s_naghavi
 */
public class TypeOfIsuInput implements DBFunctionInput {

    private String branchCode;
    private String insuranceCode;
    private String introduceDate;

    public TypeOfIsuInput() {
    }

    
    public TypeOfIsuInput(String insuranceCode, String introduceDate, String branchCode) {
        this.branchCode = branchCode;
        this.insuranceCode = insuranceCode;
        this.introduceDate = introduceDate;
    }

    public String getBranchCode() {
        return branchCode;
    }

    public void setBranchCode(String branchCode) {
        this.branchCode = branchCode;
    }

    public String getInsuranceCode() {
        return insuranceCode;
    }

    public void setInsuranceCode(String insuranceCode) {
        this.insuranceCode = insuranceCode;
    }

    public String getIntroduceDate() {
        return introduceDate;
    }

    public void setIntroduceDate(String introduceDate) {
        this.introduceDate = introduceDate;
    }

  

}
