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
public class ComperrVw20 {

    private String id;
    private String cardOrdPay;
    private String cardDate;
    private Long cardPrice;

    public void setId(String id) {
        this.id = id;
    }

    public void setCardOrdPay(String cardOrdPay) {
        this.cardOrdPay = cardOrdPay;
    }

    public void setCardDate(String cardDate) {
        this.cardDate = cardDate;
    }

    public void setCardPrice(Long cardPrice) {
        this.cardPrice = cardPrice;
    }

    public String getId() {
        return id;
    }

    public String getCardOrdPay() {
        return cardOrdPay;
    }

    public String getCardDate() {
        return cardDate;
    }

    public Long getCardPrice() {
        return cardPrice;
    }

}
