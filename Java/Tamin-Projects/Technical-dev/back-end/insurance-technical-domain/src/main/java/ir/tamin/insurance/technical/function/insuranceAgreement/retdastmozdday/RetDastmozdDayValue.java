/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package ir.tamin.insurance.technical.function.insuranceAgreement.retdastmozdday;

import ir.tamin.framework.domain.function.DBFunctionValue;

import java.math.BigDecimal;

/**
 *
 * @author s_naghavi
 */
public class RetDastmozdDayValue implements DBFunctionValue{
      private String insuranceNumber;
    private String hisYear;
    private String hisMon;
    private BigDecimal hisDay;
    private BigDecimal hisWage;
    private String hisHard;
    private String hisType;

    public RetDastmozdDayValue() {
    }

    public RetDastmozdDayValue(String insuranceNumber, String hisYear, String hisMon, BigDecimal hisDay, BigDecimal hisWage, String hisHard, String hisType) {
        this.insuranceNumber = insuranceNumber;
        this.hisYear = hisYear;
        this.hisMon = hisMon;
        this.hisDay = hisDay;
        this.hisWage = hisWage;
        this.hisHard = hisHard;
        this.hisType = hisType;
    }
    

    public String getInsuranceNumber() {
        return insuranceNumber;
    }

    public void setInsuranceNumber(String insuranceNumber) {
        this.insuranceNumber = insuranceNumber;
    }

    public String getHisYear() {
        return hisYear;
    }

    public void setHisYear(String hisYear) {
        this.hisYear = hisYear;
    }

    public String getHisMon() {
        return hisMon;
    }

    public void setHisMon(String hisMon) {
        this.hisMon = hisMon;
    }

    public BigDecimal getHisDay() {
        return hisDay;
    }

    public void setHisDay(BigDecimal hisDay) {
        this.hisDay = hisDay;
    }

    public BigDecimal getHisWage() {
        return hisWage;
    }

    public void setHisWage(BigDecimal hisWage) {
        this.hisWage = hisWage;
    }

    public String getHisHard() {
        return hisHard;
    }

    public void setHisHard(String hisHard) {
        this.hisHard = hisHard;
    }

    public String getHisType() {
        return hisType;
    }

    public void setHisType(String hisType) {
        this.hisType = hisType;
    }
    
}
