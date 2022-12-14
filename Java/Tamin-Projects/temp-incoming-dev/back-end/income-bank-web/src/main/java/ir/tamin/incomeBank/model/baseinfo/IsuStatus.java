/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package ir.tamin.incomeBank.model.baseinfo;

import java.io.Serializable;
import javax.persistence.Basic;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;
import javax.persistence.Transient;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;
import javax.xml.bind.annotation.XmlRootElement;

/**
 *
 * @author f_fotuhi
 */
@Entity
@Table(name = "TB_INSUREDSTATUS", schema = "BASEINFO")
@XmlRootElement
public class IsuStatus implements Serializable {

    private static final long serialVersionUID = 1L;
    @Id
    @Basic(optional = false)
    @NotNull
    @Size(min = 1, max = 2)
    @Column(name = "ISUSTATCODE")
    private String isustatcode;
    @Basic(optional = false)
    @NotNull
    @Size(min = 1, max = 100)
    @Column(name = "ISUSTATDESC")
    private String isustatdesc;
    @Basic(optional = false)
    @NotNull
    @Column(name = "STATUS")
    private Character status;
    @Basic(optional = false)
    @NotNull
    @Size(min = 1, max = 8)
    @Column(name = "STATUSSTDATE")
    private String statusstdate;

    @Transient
    private String isuStatCodeDesc;

    public IsuStatus() {
    }

    public IsuStatus(String isustatcode) {
        this.isustatcode = isustatcode;
    }

    public IsuStatus(String isustatcode, String isustatdesc, Character status, String statusstdate) {
        this.isustatcode = isustatcode;
        this.isustatdesc = isustatdesc;
        this.status = status;
        this.statusstdate = statusstdate;
    }

    public String getIsustatcode() {
        return isustatcode;
    }

    public void setIsustatcode(String isustatcode) {
        this.isustatcode = isustatcode;
    }

    public String getIsustatdesc() {
        return isustatdesc;
    }

    public void setIsustatdesc(String isustatdesc) {
        this.isustatdesc = isustatdesc;
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

    public String getIsuStatCodeDesc() {
        return isustatcode + " " + isustatdesc;
    }

    public void setIsuStatCodeDesc(String isuStatCodeDesc) {
        this.isuStatCodeDesc = isuStatCodeDesc;
    }

}
