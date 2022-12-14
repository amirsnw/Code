/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package ir.tamin.incomeBank.model.daramadBank;

/**
 *
 * @author h_riazat
 */
public class ComperrVw16 {

    private String id;
    private String cardOrdPay;
    private Long oitRemain;

    public void setCardOrdPay(String cardOrdPay) {
        this.cardOrdPay = cardOrdPay;
    }

    public void setOitRemain(Long oitRemain) {
        this.oitRemain = oitRemain;
    }

    public String getCardOrdPay() {
        return cardOrdPay;
    }

    public Long getOitRemain() {
        return oitRemain;
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

}
