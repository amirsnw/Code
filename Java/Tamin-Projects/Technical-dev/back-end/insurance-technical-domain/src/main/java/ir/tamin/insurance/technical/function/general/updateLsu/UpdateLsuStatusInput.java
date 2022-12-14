/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package ir.tamin.insurance.technical.function.general.updateLsu;

import ir.tamin.framework.domain.function.DBFunctionInput;

/**
 *
 * @author m_hoseini
 */
public class UpdateLsuStatusInput implements DBFunctionInput {

    private String reqNo;
    private String branchCode;
    private String risuid;
    private String inspOpinion;
    private String statusCode;

    public UpdateLsuStatusInput() {
    }

    public UpdateLsuStatusInput(String reqNo, String branchCode, String risuid, String inspOpinion, String statusCode) {
        this.reqNo = reqNo;
        this.branchCode = branchCode;
        this.risuid = risuid;
        this.inspOpinion = inspOpinion;
        this.statusCode = statusCode;
    }

    public String getReqNo() {
        return reqNo;
    }

    public void setReqNo(String reqNo) {
        this.reqNo = reqNo;
    }

    public String getBranchCode() {
        return branchCode;
    }

    public void setBranchCode(String branchCode) {
        this.branchCode = branchCode;
    }

    public String getRisuid() {
        return risuid;
    }

    public void setRisuid(String risuid) {
        this.risuid = risuid;
    }

    public String getInspOpinion() {
        return inspOpinion;
    }

    public void setInspOpinion(String inspOpinion) {
        this.inspOpinion = inspOpinion;
    }

    public String getStatusCode() {
        return statusCode;
    }

    public void setStatusCode(String statusCode) {
        this.statusCode = statusCode;
    }
        
}
