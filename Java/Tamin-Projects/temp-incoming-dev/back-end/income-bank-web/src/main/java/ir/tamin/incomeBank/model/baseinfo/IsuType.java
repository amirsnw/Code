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

/**
 *
 * @author f_fotuhi
 */
@Entity
@Table(name = "TB_ISUTYPE", schema = "BASEINFO")
public class IsuType implements Serializable {

    private static final long serialVersionUID = 1L;
    @Id
    @Basic(optional = false)
    @NotNull
    @Size(min = 1, max = 2)
    @Column(name = "ISUTYPECODE")
    private String isutypecode;
    @Basic(optional = false)
    @NotNull
    @Size(min = 1, max = 100)
    @Column(name = "ISUTYPEDESC")
    private String isutypedesc;
    @Size(max = 4)
    @Column(name = "FINANCCODE")
    private String financcode;
    @Size(max = 2)
    @Column(name = "TELCODE")
    private String telcode;
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
    private String isuTypeCodeDesc;

    public IsuType() {
    }

    public IsuType(String isutypecode) {
        this.isutypecode = isutypecode;
    }

    public IsuType(String isutypecode, String isutypedesc, Character status, String statusstdate) {
        this.isutypecode = isutypecode;
        this.isutypedesc = isutypedesc;
        this.status = status;
        this.statusstdate = statusstdate;
    }

    public String getIsutypecode() {
        return isutypecode;
    }

    public void setIsutypecode(String isutypecode) {
        this.isutypecode = isutypecode;
    }

    public String getIsutypedesc() {
        return isutypedesc;
    }

    public void setIsutypedesc(String isutypedesc) {
        this.isutypedesc = isutypedesc;
    }

    public String getFinanccode() {
        return financcode;
    }

    public void setFinanccode(String financcode) {
        this.financcode = financcode;
    }

    public String getTelcode() {
        return telcode;
    }

    public void setTelcode(String telcode) {
        this.telcode = telcode;
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

    public String getIsuTypeCodeDesc() {
        return isutypecode + " " + isutypedesc;
    }

    public void setIsuTypeCodeDesc(String isuTypeCodeDesc) {
        this.isuTypeCodeDesc = isuTypeCodeDesc;
    }

}
