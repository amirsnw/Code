/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package ir.tamin.insurance.technical.function.insuranceAgreement.retdastmozdday;

import ir.tamin.framework.domain.function.DBFunctionInput;

/**
 *
 * @author s_naghavi
 */
public class RetDastmozdDayInput implements DBFunctionInput {

    private String branchCode;
    private String insuranceNumber;
    private String nationalCode;
    private String noDay;
    private String startDate;
    

    public RetDastmozdDayInput() {
    }

    public RetDastmozdDayInput(String branchCode, String insuranceNumber, String nationalCode, String noDay, String startDate) {
        this.branchCode = branchCode;
        this.insuranceNumber = insuranceNumber;
        this.noDay = noDay;
        this.startDate = startDate;
        this.nationalCode = nationalCode;
    }

    public String getBranchCode() {
        return branchCode;
    }

    public void setBranchCode(String branchCode) {
        this.branchCode = branchCode;
    }

    public String getInsuranceNumber() {
        return insuranceNumber;
    }

    public void setInsuranceNumber(String insuranceNumber) {
        this.insuranceNumber = insuranceNumber;
    }

    public String getNationalCode() {
        return nationalCode;
    }

    public void setNationalCode(String nationalCode) {
        this.nationalCode = nationalCode;
    }

    public String getNoDay() {
        return noDay;
    }

    public void setNoDay(String noDay) {
        this.noDay = noDay;
    }

    public String getStartDate() {
        return startDate;
    }

    public void setStartDate(String startDate) {
        this.startDate = startDate;
    }

//    public String getIsBan() {
//        return isBan;
//    }
//
//    public void setIsBan(String isBan) {
//        this.isBan = isBan;
//    }
}
