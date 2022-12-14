/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package ir.tamin.insurance.technical.function.baseinfo.getstrrisuid;

import ir.tamin.framework.domain.function.DBFunctionInput;

/**
 *
 * @author e_shoghi
 */
public class GetInsuranceIdsInput implements DBFunctionInput {

    private String branchCode;
    private String insuranceId;
    private String iwithq;

    public GetInsuranceIdsInput() {
    }

    public GetInsuranceIdsInput(String branchCode, String insuranceId) {
        this.branchCode = branchCode;
        this.insuranceId = insuranceId;
    }

    public GetInsuranceIdsInput(String branchCode, String insuranceId, String iwithq) {
        this.branchCode = branchCode;
        this.insuranceId = insuranceId;
        this.iwithq = iwithq;
    }

    public String getBranchCode() {
        return branchCode;
    }

    public void setBranchCode(String branchCode) {
        this.branchCode = branchCode;
    }

    public String getInsuranceId() {
        return insuranceId;
    }

    public void setInsuranceId(String insuranceId) {
        this.insuranceId = insuranceId;
    }

    public String getIwithq() {
        return iwithq;
    }

    public void setIwithq(String iwithq) {
        this.iwithq = iwithq;
    }

}
