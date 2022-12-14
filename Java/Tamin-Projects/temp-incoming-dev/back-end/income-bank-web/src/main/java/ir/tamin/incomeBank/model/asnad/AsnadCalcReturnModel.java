/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package ir.tamin.incomeBank.model.asnad;

import ir.tamin.incomeBank.model.centralPayment.*;
import java.util.Date;
import java.util.List;

/**
 *
 * @author s_maknooni
 */
public class AsnadCalcReturnModel {

    private Date createDate;
    private String createDateString;
    private Long payAmmount;
    private List<CalcBankReturnModel> calcBankReturnModelList;
    private List<CalcCustTypeReturnModel> calcCustTypeReturnModelList;

    public Long getPayAmmount() {
        return payAmmount;
    }

    public void setPayAmmount(Long payAmmount) {
        this.payAmmount = payAmmount;
    }

    public List<CalcBankReturnModel> getCalcBankReturnModelList() {
        return calcBankReturnModelList;
    }

    public void setCalcBankReturnModelList(List<CalcBankReturnModel> calcBankReturnModelList) {
        this.calcBankReturnModelList = calcBankReturnModelList;
    }

    public Date getCreateDate() {
        return createDate;
    }

    public void setCreateDate(Date createDate) {
        this.createDate = createDate;
    }

    public String getCreateDateString() {
        return createDateString;
    }

    public void setCreateDateString(String createDateString) {
        this.createDateString = createDateString;
    }

}
