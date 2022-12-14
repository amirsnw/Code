/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package ir.tamin.insurance.technical.function.general.CalcAge;

import ir.tamin.framework.domain.function.DBFunctionInput;

/**
 *
 * @author s_naghavi
 */
public class CalcAgeInput implements DBFunctionInput{
    private String insurancedBirthDate;
    private String reqDate;

    public CalcAgeInput()
    {
        
    }
    public CalcAgeInput(String insurancedBirthDate, String reqDate) {
        this.insurancedBirthDate = insurancedBirthDate;
        this.reqDate = reqDate;
    }

    
    public String getInsurancedBirthDate() {
        return insurancedBirthDate;
    }

    public void setInsurancedBirthDate(String insurancedBirthDate) {
        this.insurancedBirthDate = insurancedBirthDate;
    }

    public String getReqDate() {
        return reqDate;
    }

    public void setReqDate(String reqDate) {
        this.reqDate = reqDate;
    }
    
    
}
