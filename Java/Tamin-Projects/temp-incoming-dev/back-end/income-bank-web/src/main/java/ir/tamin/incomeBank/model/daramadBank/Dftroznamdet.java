/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package ir.tamin.incomeBank.model.daramadBank;

import java.io.Serializable;
import java.math.BigInteger;
import javax.persistence.Column;
import javax.persistence.EmbeddedId;
import javax.persistence.Entity;
import javax.persistence.Table;
import javax.persistence.Transient;
import javax.validation.constraints.NotNull;

/**
 *
 * @author f_fotuhi
 */
@Entity
@Table(name = "VWDFTROZNAMDET")

public class Dftroznamdet implements Serializable {

    private static final long serialVersionUID = 1L;
//    @Column(name = "PAY_ID")
//    private String payId;
    @EmbeddedId
    private DftroznamdetPK dftroznamdetPK;
    @NotNull
    @Column(name = "ORD_ORDNO")
    private String ordOrdno;
    @NotNull
    @Column(name = "ORP_ORDROW")
    private String orpOrdrow;
//    @NotNull
//    @Column(name = "DEBITTYPECODE")
//    private String debittypecode;
    @Column(name = "DEBITTYPEDESC")
    private String debittypeDesc;
    @Column(name = "LETTITLECODE")
    private String lettitlecode;
    @Column(name = "LETTITLEDESC")
    private String lettitledesc;
    @Column(name = "AMOUNT")
    private BigInteger amount;

    @Transient
    private String pk;
    @Transient
    private String debittypecode;

    public Dftroznamdet() {
    }

    public Dftroznamdet(DftroznamdetPK dftroznamdetPK) {
        this.dftroznamdetPK = dftroznamdetPK;
    }

    public DftroznamdetPK getDftroznamdetPK() {
        return dftroznamdetPK;
    }

    public void setDftroznamdetPK(DftroznamdetPK dftroznamdetPK) {
        this.dftroznamdetPK = dftroznamdetPK;
    }

//    public String getPayId() {
//        return payId;
//    }
//
//    public void setPayId(String payId) {
//        this.payId = payId;
//    }
    public String getOrdOrdno() {
        return ordOrdno;
    }

    public void setOrdOrdno(String ordOrdno) {
        this.ordOrdno = ordOrdno;
    }

    public String getOrpOrdrow() {
        return orpOrdrow;
    }

    public void setOrpOrdrow(String orpOrdrow) {
        this.orpOrdrow = orpOrdrow;
    }

    public String getDebittypeDesc() {
        return debittypeDesc;
    }

//    public String getDebittypecode() {
//        return debittypecode;
//    }
//
//    public void setDebittypecode(String debittypecode) {
//        this.debittypecode = debittypecode;
//    }
    public void setDebittypeDesc(String debittypeDesc) {
        this.debittypeDesc = debittypeDesc;
    }

    public String getLettitlecode() {
        return lettitlecode;
    }

    public void setLettitlecode(String lettitlecode) {
        this.lettitlecode = lettitlecode;
    }

    public String getLettitledesc() {
        return lettitledesc;
    }

    public void setLettitledesc(String lettitledesc) {
        this.lettitledesc = lettitledesc;
    }

    public BigInteger getAmount() {
        return amount;
    }

    public void setAmount(BigInteger amount) {
        this.amount = amount;
    }

    public String getPk() {
        return dftroznamdetPK.getPayId() + dftroznamdetPK.getDebittypecode();
    }

    public void setPk(String pk) {
        this.pk = pk;
    }

    public String getDebittypecode() {
        return dftroznamdetPK.getDebittypecode();
    }

    public void setDebittypecode(String debittypecode) {
        this.debittypecode = debittypecode;
    }

}
