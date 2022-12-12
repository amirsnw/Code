/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package ir.tamin.insurance.technical.function.general.provinceDetailList;

import ir.tamin.framework.domain.function.DBFunctionInput;

/**
 *
 * @author s_naghavi
 */
public class ProvinceDetailListInput implements DBFunctionInput {
     private String branchCode;
    private String reqNo;
    private String ostanReqNo;

    public ProvinceDetailListInput() {
    }

    public ProvinceDetailListInput(String branchCode, String reqNo, String ostanReqNo) {
        this.branchCode = branchCode;
        this.reqNo = reqNo;
        this.ostanReqNo = ostanReqNo;
    }

    public String getBranchCode() {
        return branchCode;
    }

    public void setBranchCode(String branchCode) {
        this.branchCode = branchCode;
    }

    public String getReqNo() {
        return reqNo;
    }

    public void setReqNo(String reqNo) {
        this.reqNo = reqNo;
    }

    public String getOstanReqNo() {
        return ostanReqNo;
    }

    public void setOstanReqNo(String ostanReqNo) {
        this.ostanReqNo = ostanReqNo;
    }
    
}
