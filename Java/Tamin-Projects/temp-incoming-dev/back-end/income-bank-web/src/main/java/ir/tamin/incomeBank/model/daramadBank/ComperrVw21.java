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
public class ComperrVw21 {

    private String id;
    private String ordPay;
    private String rcvNo;
    private Long price;
    private String cardDate;

    public void setId(String id) {
        this.id = id;
    }

    public void setOrdPay(String ordPay) {
        this.ordPay = ordPay;
    }

    public void setRcvNo(String rcvNo) {
        this.rcvNo = rcvNo;
    }

    public void setPrice(Long price) {
        this.price = price;
    }

    public void setCardDate(String cardDate) {
        this.cardDate = cardDate;
    }

    public String getId() {
        return id;
    }

    public String getOrdPay() {
        return ordPay;
    }

    public String getRcvNo() {
        return rcvNo;
    }

    public Long getPrice() {
        return price;
    }

    public String getCardDate() {
        return cardDate;
    }

}
