/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package ir.tamin.incomeBank.model.daramadBank;

/**
 *
 * @author m_salami
 */
public class AutoRegisterResult {

    public AutoRegisterResult() {
    }

    public AutoRegisterResult(String soratOrdpay, String desc) {
        this.soratOrdpay = soratOrdpay;
        this.desc = desc;
    }

    
    
    private String soratOrdpay;

    public String getSoratOrdpay() {
        return soratOrdpay;
    }

    public void setSoratOrdpay(String soratOrdpay) {
        this.soratOrdpay = soratOrdpay;
    }

    private String desc;

    public String getDesc() {
        return desc;
    }

    public void setDesc(String desc) {
        this.desc = desc;
    }

}
