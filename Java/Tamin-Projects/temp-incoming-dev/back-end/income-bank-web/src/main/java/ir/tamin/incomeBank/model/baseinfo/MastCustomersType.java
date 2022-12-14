/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package ir.tamin.incomeBank.model.baseinfo;

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
@Table(name = "TB_MASTCUSTOMERSTYPE", schema = "BASEINFO")

public class MastCustomersType implements Serializable {

    private static final long serialVersionUID = 1L;
    @Id
    @NotNull
    @Column(name = "MASTCUSTTYPE")
    private String mastcusttype;
    @NotNull
    @Column(name = "MASTCUSTDESC")
    private String mastcustdesc;
    @NotNull
    @Column(name = "STATUS")
    private Character status;
    @NotNull
    @Column(name = "STATUSSTDATE")
    private String statusstdate;

    @Transient
    String mastcusttypeDesc;

    public MastCustomersType() {
    }

    public MastCustomersType(String mastcusttype) {
        this.mastcusttype = mastcusttype;
    }

    public MastCustomersType(String mastcusttype, String mastcustdesc, Character status, String statusstdate) {
        this.mastcusttype = mastcusttype;
        this.mastcustdesc = mastcustdesc;
        this.status = status;
        this.statusstdate = statusstdate;
    }

    public String getMastcusttype() {
        return mastcusttype;
    }

    public void setMastcusttype(String mastcusttype) {
        this.mastcusttype = mastcusttype;
    }

    public String getMastcustdesc() {
        return mastcustdesc;
    }

    public void setMastcustdesc(String mastcustdesc) {
        this.mastcustdesc = mastcustdesc;
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

    public String getMastcusttypeDesc() {
        return mastcusttype + " " + mastcustdesc;
    }

    public void setMastcusttypeDesc(String mastcusttypeDesc) {
        this.mastcusttypeDesc = mastcusttypeDesc;
    }

}
