/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package ir.tamin.incomeBank.model.asnad;

import java.math.BigDecimal;

/**
 *
 * @author s_maknooni
 */
public class CalcCustTypeReturnModel {

    private String custType;
    private String custName;
    private Long custQty;
    private BigDecimal custAmmount;
    private Boolean isSelected;

    public void setIsSelected(Boolean isSelected) {
        this.isSelected = isSelected;
    }

    public Boolean getIsSelected() {
        return isSelected;
    }

    public void setCustType(String custType) {
        this.custType = custType;
    }

    public void setCustName(String custName) {
        this.custName = custName;
    }

    public void setCustQty(Long custQty) {
        this.custQty = custQty;
    }

    public void setCustAmmount(BigDecimal custAmmount) {
        this.custAmmount = custAmmount;
    }

    public String getCustType() {
        return custType;
    }

    public String getCustName() {
        return custName;
    }

    public Long getCustQty() {
        return custQty;
    }

    public BigDecimal getCustAmmount() {
        return custAmmount;
    }

    public CalcCustTypeReturnModel() {
    }

}
