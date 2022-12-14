/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package ir.tamin.incomeBank.model.centralPayment;

import java.math.BigDecimal;

/**
 *
 * @author s_maknooni
 */
public class CalcSubsystemReturnModel {

    private GlSubsystemType subsystemType;
    private Long qty;
    private BigDecimal ammount;
    private Boolean isSelected;
    private String code;
    private String title;

    public CalcSubsystemReturnModel() {
    }

    public CalcSubsystemReturnModel(Integer subSystemTypeId,String subSystemTypeCode ) {
        this.subsystemType.setSubSystemId(subSystemTypeId);
        this.subsystemType.setCode(subSystemTypeCode);
    }

    public CalcSubsystemReturnModel(GlSubsystemType subsystemType, Long qty, BigDecimal ammount) {
        this.subsystemType = subsystemType;
        this.qty = qty;
        this.ammount = ammount;

    }

    //region برای گزارش ریز پرداختی
    public CalcSubsystemReturnModel(String code) {
        this.code = code;
    }
    //endregion

    public GlSubsystemType getSubsystemType() {
        return subsystemType;
    }

    public void setSubsystemType(GlSubsystemType subsystemType) {
        this.subsystemType = subsystemType;
    }

    public Long getQty() {
        return qty;
    }

    public void setQty(Long qty) {
        this.qty = qty;
    }

    public BigDecimal getAmmount() {
        return ammount;
    }

    public void setAmmount(BigDecimal ammount) {
        this.ammount = ammount;
    }

    public Boolean getIsSelected() {
        return isSelected;
    }

    public void setIsSelected(Boolean isSelected) {
        this.isSelected = isSelected;
    }

    public String getCode() {
        return subsystemType.getCode();
    }

    public void setCode(String code) {
        this.code = code;
    }

    public String getTitle() {
        return subsystemType.getTitle();
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getCodeForPension() {
        return code;
    }
}
