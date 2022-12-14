/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package ir.tamin.incomeBank.model.daramadBank;

import java.io.Serializable;
import javax.persistence.Column;
import javax.persistence.EmbeddedId;
import javax.persistence.Entity;
import javax.persistence.Table;
import javax.validation.constraints.NotNull;

/**
 *
 * @author f_fotuhi
 */
@Entity
@Table(name = "DRMD_CHEQRETU")
public class CheqReturn implements Serializable {

    private static final long serialVersionUID = 1L;
    @EmbeddedId
    protected CheqReturnPK cheqReturnPK;
    @Column(name = "CHEQ_DESCRIP")
    private String cheqDescrip;
    @NotNull
    @Column(name = "CHEQ_DATE")
    private String cheqDate;
    @NotNull
    @Column(name = "NRCHEQREASONCODE")
    private String nrcheqreasoncode;
    @Column(name = "ORD_ORDNO1")
    private String ordOrdno1;
    @Column(name = "ORP_ORDROW1")
    private String orpOrdrow1;
    @NotNull
    @Column(name = "BRCH_CODE")
    private String brchCode;
    @NotNull
    @Column(name = "RETURN_USER_ID")
    private String returnUserID;

    public CheqReturn() {
    }

    public CheqReturn(CheqReturnPK cheqReturnPK) {
        this.cheqReturnPK = cheqReturnPK;
    }

    public CheqReturn(CheqReturnPK cheqReturnPK, String cheqDate, String nrcheqreasoncode, String brchCode, String returnUserID) {
        this.cheqReturnPK = cheqReturnPK;
        this.cheqDate = cheqDate;
        this.nrcheqreasoncode = nrcheqreasoncode;
        this.brchCode = brchCode;
        this.returnUserID = returnUserID;
    }

    public CheqReturn(String ordOrdno, String orpOrdrow) {
        this.cheqReturnPK = new CheqReturnPK(ordOrdno, orpOrdrow);
    }

    public CheqReturnPK getCheqReturnPK() {
        return cheqReturnPK;
    }

    public void setCheqReturnPK(CheqReturnPK cheqReturnPK) {
        this.cheqReturnPK = cheqReturnPK;
    }

    public String getCheqDescrip() {
        return cheqDescrip;
    }

    public void setCheqDescrip(String cheqDescrip) {
        this.cheqDescrip = cheqDescrip;
    }

    public String getCheqDate() {
        return cheqDate;
    }

    public void setCheqDate(String cheqDate) {
        this.cheqDate = cheqDate;
    }

    public String getNrcheqreasoncode() {
        return nrcheqreasoncode;
    }

    public void setNrcheqreasoncode(String nrcheqreasoncode) {
        this.nrcheqreasoncode = nrcheqreasoncode;
    }

    public String getOrdOrdno1() {
        return ordOrdno1;
    }

    public void setOrdOrdno1(String ordOrdno1) {
        this.ordOrdno1 = ordOrdno1;
    }

    public String getOrpOrdrow1() {
        return orpOrdrow1;
    }

    public void setOrpOrdrow1(String orpOrdrow1) {
        this.orpOrdrow1 = orpOrdrow1;
    }

    public String getBrchCode() {
        return brchCode;
    }

    public void setBrchCode(String brchCode) {
        this.brchCode = brchCode;
    }

    public String getReturnUserID() {
        return returnUserID;
    }

    public void setReturnUserID(String returnUserID) {
        this.returnUserID = returnUserID;
    }



}
