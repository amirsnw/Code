/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package ir.tamin.insurance.technical.function.insuranceAgreement.repagreementmedicalinfo;

import ir.tamin.framework.domain.function.DBFunctionInput;

/**
 *
 * @author s_naghavi
 */
public class RepAgreementMedicalInfoInput implements DBFunctionInput{
    private String branchCode;
    private Long reqId; 

    public RepAgreementMedicalInfoInput() {
    }

    public RepAgreementMedicalInfoInput(String branchCode, Long reqId) {
        this.branchCode = branchCode;
        this.reqId = reqId;
    }

    public String getBranchCode() {
        return branchCode;
    }

    public void setBranchCode(String branchCode) {
        this.branchCode = branchCode;
    }

    public Long getReqId() {
        return reqId;
    }

    public void setReqId(Long reqId) {
        this.reqId = reqId;
    }
    
    
}
