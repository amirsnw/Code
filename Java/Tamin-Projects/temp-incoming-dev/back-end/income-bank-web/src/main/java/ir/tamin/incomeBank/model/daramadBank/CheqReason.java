/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package ir.tamin.incomeBank.model.daramadBank;

import java.io.Serializable;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;
import javax.persistence.Transient;
import javax.validation.constraints.NotNull;

/**
 *
 * @author f_fotuhi
 */
@Entity
@Table(name = "TB_NRCHEQREASON", schema = "BASEINFO")
public class CheqReason implements Serializable {

    private static final long serialVersionUID = 1L;
    @Id
    @NotNull
    @Column(name = "NRCHEQREASONCODE")
    private String nrCheqReasonCode;
    @NotNull
    @Column(name = "NRCHEQREASONDESC")
    private String nrCheqReasonDesc;
    @NotNull
    @Column(name = "STATUS")
    private Character status;
    @NotNull
    @Column(name = "STATUSSTDATE")
    private String statusstdate;

    @Transient
    private String reasonCodeName;

    public CheqReason() {
    }

    public String getNrCheqReasonCode() {
        return nrCheqReasonCode;
    }

    public void setNrCheqReasonCode(String nrCheqReasonCode) {
        this.nrCheqReasonCode = nrCheqReasonCode;
    }

    public String getNrCheqReasonDesc() {
        return nrCheqReasonDesc;
    }

    public void setNrCheqReasonDesc(String nrCheqReasonDesc) {
        this.nrCheqReasonDesc = nrCheqReasonDesc;
    }

    public Character getStatus() {
        return status;
    }

    public void setStatus(Character status) {
        this.status = status;
    }

    public String getStatusstdate() {
        return statusstdate;
    }

    public void setStatusstdate(String statusstdate) {
        this.statusstdate = statusstdate;
    }

    public String getReasonCodeName() {
        return nrCheqReasonCode + " " + nrCheqReasonDesc;
    }

    public void setReasonCodeName(String reasonCodeName) {
        this.reasonCodeName = reasonCodeName;
    }

}
