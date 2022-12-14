/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package ir.tamin.incomeBank.model.asnad;

import ir.tamin.incomeBank.model.centralPayment.*;
import java.util.List;

/**
 *
 * @author s_maknooni
 */
public class AsnadCalcInputModel {

    private String fromYear;
    private String fromMonth;
    private String toYear;
    private String toMonth;
    private String fromYearMonth;
    private String toYearMonth;
    private String listDesc;
    private String wwwStatus;
    private List<String> ownershipList;
    private String percent;
    private List<String> parTypeList;
    private String custName;
    private String payType;
    private List<CalcBankReturnModel> calcBankList;
    private List<CalcCustTypeReturnModel> calcCustTypeReturnModelList;
    private List<OrganizationModel> orgList;
    private List<CalcSubsystemReturnModel> calcSubSystemList;
    private List<String> monthList;

    public void setWwwStatus(String wwwStatus) {
        this.wwwStatus = wwwStatus;
    }

    public void setPercent(String percent) {
        this.percent = percent;
    }

    public void setCustName(String custName) {
        this.custName = custName;
    }

    public void setCalcBankList(List<CalcBankReturnModel> calcBankList) {
        this.calcBankList = calcBankList;
    }

    public void setCalcCustTypeReturnModelList(List<CalcCustTypeReturnModel> calcCustTypeReturnModelList) {
        this.calcCustTypeReturnModelList = calcCustTypeReturnModelList;
    }

    public String getWwwStatus() {
        return wwwStatus;
    }

    public String getPercent() {
        return percent;
    }

    public String getCustName() {
        return custName;
    }

    public List<CalcBankReturnModel> getCalcBankList() {
        return calcBankList;
    }

    public List<CalcCustTypeReturnModel> getCalcCustTypeReturnModelList() {
        return calcCustTypeReturnModelList;
    }

    public String getFromYear() {
        return fromYear;
    }

    public void setFromYear(String fromYear) {
        this.fromYear = fromYear;
    }

    public String getFromMonth() {
        return fromMonth;
    }

    public void setFromMonth(String fromMonth) {
        this.fromMonth = fromMonth;
    }

    public String getToYear() {
        return toYear;
    }

    public void setToYear(String toYear) {
        this.toYear = toYear;
    }

    public String getToMonth() {
        return toMonth;
    }

    public void setToMonth(String toMonth) {
        this.toMonth = toMonth;
    }

    public List<OrganizationModel> getOrgList() {
        return orgList;
    }

    public void setOrgList(List<OrganizationModel> orgList) {
        this.orgList = orgList;
    }

    public List<CalcSubsystemReturnModel> getCalcSubSystemList() {
        return calcSubSystemList;
    }

    public void setCalcSubSystemList(List<CalcSubsystemReturnModel> calcSubSystemList) {
        this.calcSubSystemList = calcSubSystemList;
    }

    public List<String> getMonthList() {
        return monthList;
    }

    public void setMonthList(List<String> monthList) {
        this.monthList = monthList;
    }

    public String getListDesc() {
        return listDesc;
    }

    public void setListDesc(String listDesc) {
        this.listDesc = listDesc;
    }

    public void setFromYearMonth(String fromYearMonth) {
        this.fromYearMonth = fromYearMonth;
    }

    public void setToYearMonth(String toYearMonth) {
        this.toYearMonth = toYearMonth;
    }

    public String getFromYearMonth() {
        return fromYearMonth;
    }

    public String getToYearMonth() {
        return toYearMonth;
    }

    public void setPayType(String payType) {
        this.payType = payType;
    }

    public String getPayType() {
        return payType;
    }

    public void setOwnershipList(List<String> ownershipList) {
        this.ownershipList = ownershipList;
    }

    public void setParTypeList(List<String> parTypeList) {
        this.parTypeList = parTypeList;
    }

    public List<String> getOwnershipList() {
        return ownershipList;
    }

    public List<String> getParTypeList() {
        return parTypeList;
    }

}
