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
public class ComperrVw17 {

    private String id;
    private String payId;
    private String rcsChqNo;
    private Long rcsRcvSubAmt;

    public void setPayId(String payId) {
        this.payId = payId;
    }

    public void setRcsChqNo(String rcsChqNo) {
        this.rcsChqNo = rcsChqNo;
    }

    public void setRcsRcvSubAmt(Long rcsRcvSubAmt) {
        this.rcsRcvSubAmt = rcsRcvSubAmt;
    }

    public String getPayId() {
        return payId;
    }

    public String getRcsChqNo() {
        return rcsChqNo;
    }

    public Long getRcsRcvSubAmt() {
        return rcsRcvSubAmt;
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

}
