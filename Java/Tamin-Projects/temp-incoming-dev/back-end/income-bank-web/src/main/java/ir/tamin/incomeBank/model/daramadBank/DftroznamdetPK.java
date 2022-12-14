/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package ir.tamin.incomeBank.model.daramadBank;

import java.io.Serializable;
import javax.persistence.Column;
import javax.persistence.Embeddable;
import javax.validation.constraints.NotNull;

/**
 *
 * @author f_fotuhi
 */
@Embeddable
public class DftroznamdetPK implements Serializable {

    @Column(name = "PAY_ID")
    private String payId;

    @NotNull
    @Column(name = "DEBITTYPECODE")
    private String debittypecode;

    public DftroznamdetPK() {
    }

    public DftroznamdetPK(String payId, String debittypecode) {
        this.payId = payId;
        this.debittypecode = debittypecode;
    }

    public String getPayId() {
        return payId;
    }

    public void setPayId(String payId) {
        this.payId = payId;
    }

    public String getDebittypecode() {
        return debittypecode;
    }

    public void setDebittypecode(String debittypecode) {
        this.debittypecode = debittypecode;
    }

}
