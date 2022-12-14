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
@Table(name = "REGINSURANCESPEC")
public class RegInsuranceSpec implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @Column(name = "RISUID")
    private String code;
    @NotNull
    @Column(name = "RISUAPPROVDATE")
    private String riduApprovDate;
    @Column(name = "BRHCODE")
    private String brhCode;
    @Column(name = "BRCH_CODE")
    private String brchCode;
    @Column(name = "BIRTHCITYCODE")
    private String birthCityCode;
    @Column(name = "RISUIDPLC")
    private String risuIdPlc;
    @Column(name = "CREATEUID")
    private String createUId;
    @Column(name = "CREATEDT")
    private String createDt;
    @Column(name = "MASTCUSTTYPE")
    private String mastCustType;
    @Column(name = "RISUFNAME")
    private String risuFName;
    @Column(name = "RISULNAME")
    private String risuLName;

    @Transient
    private String codeName;

    @Transient
    private String pk;

    public RegInsuranceSpec() {
    }

    public String getCode() {
        return code;
    }

    public void setCode(String code) {
        this.code = code;
    }

    public String getRiduApprovDate() {
        return riduApprovDate;
    }

    public void setRiduApprovDate(String riduApprovDate) {
        this.riduApprovDate = riduApprovDate;
    }

    public String getBrhCode() {
        return brhCode;
    }

    public void setBrhCode(String brhCode) {
        this.brhCode = brhCode;
    }

    public String getBrchCode() {
        return brchCode;
    }

    public void setBrchCode(String brchCode) {
        this.brchCode = brchCode;
    }

    public String getBirthCityCode() {
        return birthCityCode;
    }

    public void setBirthCityCode(String birthCityCode) {
        this.birthCityCode = birthCityCode;
    }

    public String getRisuIdPlc() {
        return risuIdPlc;
    }

    public void setRisuIdPlc(String risuIdPlc) {
        this.risuIdPlc = risuIdPlc;
    }

    public String getCreateUId() {
        return createUId;
    }

    public void setCreateUId(String createUId) {
        this.createUId = createUId;
    }

    public String getCreateDt() {
        return createDt;
    }

    public void setCreateDt(String createDt) {
        this.createDt = createDt;
    }

    public String getMastCustType() {
        return mastCustType;
    }

    public void setMastCustType(String mastCustType) {
        this.mastCustType = mastCustType;
    }

    public String getRisuFName() {
        return risuFName;
    }

    public void setRisuFName(String risuFName) {
        this.risuFName = risuFName;
    }

    public String getRisuLName() {
        return risuLName;
    }

    public void setRisuLName(String risuLName) {
        this.risuLName = risuLName;
    }

    public String getCodeName() {
        return code + " " + risuFName + " " + risuLName;
    }

    public void setCodeName(String codeName) {
        this.codeName = codeName;
    }

    public String getPk() {
        return code;
    }

    public void setPk(String pk) {
        this.pk = pk;
    }

}
