/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package ir.tamin.insurance.technical.model.agreement;

import ir.tamin.insurance.technical.model.baseinfo.InsuranceType;

import java.math.BigDecimal;

/**
 *
 * @author s_naghavi
 */
public class AgreementInfo {

    private int historyDurationDays;
    private String histDurationStart;
    private String histDurationEnd;
    private String insuranceStatusDesc;
    private String insuranceStatusCode;
    private InsuranceType insuranceType;
    private String age;
    private BigDecimal avgWage360;
    private BigDecimal minWageInYear;
    private BigDecimal maxWageInYear;
    private BigDecimal daysOfAge;

    public BigDecimal getMinWageInYear() {
        return minWageInYear;
    }

    public void setMinWageInYear(BigDecimal minWageInYear) {
        this.minWageInYear = minWageInYear;
    }
        
    public BigDecimal getAvgWage360() {
        return avgWage360;
    }

    public void setAvgWage360(BigDecimal avgWage360) {
        this.avgWage360 = avgWage360;
    }
    
    public String getInsuranceStatusCode() {
        return insuranceStatusCode;
    }

    public void setInsuranceStatusCode(String insuranceStatusCode) {
        this.insuranceStatusCode = insuranceStatusCode;
    }

    
    public int getHistoryDurationDays() {
        return historyDurationDays;
    }

    public void setHistoryDurationDays(int historyDurationDays) {
        this.historyDurationDays = historyDurationDays;
    }

    public String getInsuranceStatusDesc() {
        return insuranceStatusDesc;
    }

    public void setInsuranceStatusDesc(String insuranceStatusDesc) {
        this.insuranceStatusDesc = insuranceStatusDesc;
    }

    public InsuranceType getInsuranceType() {
        return insuranceType;
    }

    public void setInsuranceType(InsuranceType insuranceType) {
        this.insuranceType = insuranceType;
    }

    public String getAge() {
        return age;
    }

    public void setAge(String age) {
        this.age = age;
    }

    public String getHistDurationStart() {
        return histDurationStart;
    }

    public void setHistDurationStart(String histDurationStart) {
        this.histDurationStart = histDurationStart;
    }

    public String getHistDurationEnd() {
        return histDurationEnd;
    }

    public void setHistDurationEnd(String histDurationEnd) {
        this.histDurationEnd = histDurationEnd;
    }

    public BigDecimal getDaysOfAge() {
        return daysOfAge;
    }

    public void setDaysOfAge(BigDecimal daysOfAge) {
        this.daysOfAge = daysOfAge;
    }

    public BigDecimal getMaxWageInYear() {
        return maxWageInYear;
    }

    public void setMaxWageInYear(BigDecimal maxWageInYear) {
        this.maxWageInYear = maxWageInYear;
    }
}
