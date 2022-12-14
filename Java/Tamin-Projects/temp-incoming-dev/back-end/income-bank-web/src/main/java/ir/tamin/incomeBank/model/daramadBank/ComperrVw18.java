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
public class ComperrVw18 {

    private String id;
    private String cardOrdPay;
    private String cardRcvNo;
    private Long cardPrice;

    public String getCardOrdPay() {
        return cardOrdPay;
    }

    public String getCardRcvNo() {
        return cardRcvNo;
    }

    public Long getCardPrice() {
        return cardPrice;
    }

    public void setCardOrdPay(String cardOrdPay) {
        this.cardOrdPay = cardOrdPay;
    }

    public void setCardRcvNo(String cardRcvNo) {
        this.cardRcvNo = cardRcvNo;
    }

    public void setCardPrice(Long cardPrice) {
        this.cardPrice = cardPrice;
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

}
