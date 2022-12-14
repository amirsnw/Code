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
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;
import javax.persistence.Transient;

@Entity
@Table(name = "VW_BRANCH")
public class Branch implements Serializable {

    @Id
    @Column(name = "BRHCODE")
    private String brhCode;

    @ManyToOne
    @JoinColumn(name = "CITYCODE", nullable = false)
    private City city;
//    @Column(name = "CITYCODE")
//    private String cityCode;

    @Column(name = "BANKCODE")
    private String BankCode;
    @Column(name = " BNKBRHCODE")
    private String bnkBrhCode;
    @Column(name = "BRHNAME")
    private String brhName;
    @Column(name = "BRHMINNO")
    private String brhMinNo;
    @Column(name = "BRHMAXNO")
    private String brhMaxNo;
    @Column(name = "BRHACCOUNT")
    private String brhAcount;
    @Column(name = "BRHTEL")
    private String brhTel;
    @Column(name = "BRHADRS")
    private String brhAddress;
    @Column(name = "STATUS")
    private String status;
    @Column(name = "STATUSSTDATE")
    private String statusSTDate;
    @Column(name = "BRHKIND")
    private String brhKind;
    @Column(name = "PSL_CODEM")
    private String psl;

    @Column(name = "BRANCH_PAY_TYPE")
    private String branchPayType;
    @Column(name = "PROVINCE_CODE")
    private String provinceCode;

    @Transient
    String brchCodeName;

    public Branch() {
    }

    public Branch(String brhCode) {
        this.brhCode = brhCode;
    }

    public String getBrhCode() {
        return brhCode;
    }

    public void setBrhCode(String brhCode) {
        this.brhCode = brhCode;
    }

    public String getBankCode() {
        return BankCode;
    }

    public void setBankCode(String BankCode) {
        this.BankCode = BankCode;
    }

    public String getBnkBrhCode() {
        return bnkBrhCode;
    }

    public void setBnkBrhCode(String bnkBrhCode) {
        this.bnkBrhCode = bnkBrhCode;
    }

    public String getBrhName() {
        return brhName;
    }

    public void setBrhName(String brhName) {
        this.brhName = brhName;
    }

    public String getBrhMinNo() {
        return brhMinNo;
    }

    public void setBrhMinNo(String brhMinNo) {
        this.brhMinNo = brhMinNo;
    }

    public String getBrhMaxNo() {
        return brhMaxNo;
    }

    public void setBrhMaxNo(String brhMaxNo) {
        this.brhMaxNo = brhMaxNo;
    }

    public String getBrhAcount() {
        return brhAcount;
    }

    public void setBrhAcount(String brhAcount) {
        this.brhAcount = brhAcount;
    }

    public String getBrhTel() {
        return brhTel;
    }

    public void setBrhTel(String brhTel) {
        this.brhTel = brhTel;
    }

    public String getBrhAddress() {
        return brhAddress;
    }

    public void setBrhAddress(String brhAddress) {
        this.brhAddress = brhAddress;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public String getStatusSTDate() {
        return statusSTDate;
    }

    public void setStatusSTDate(String statusSTDate) {
        this.statusSTDate = statusSTDate;
    }

    public String getBrhKind() {
        return brhKind;
    }

    public void setBrhKind(String brhKind) {
        this.brhKind = brhKind;
    }

    public String getPsl() {
        return psl;
    }

    public void setPsl(String psl) {
        this.psl = psl;
    }

    public City getCity() {
        return city;
    }

    public void setCity(City city) {
        this.city = city;
    }

    public String getBrchCodeName() {
        return brhCode + " " + brhName;
    }

    public void setBrchCodeName(String brchCodeName) {
        this.brchCodeName = brchCodeName;
    }

    public String getBranchPayType() {
        return branchPayType;
    }

    public void setBranchPayType(String branchPayType) {
        this.branchPayType = branchPayType;
    }

    public String getProvinceCode() {
        return provinceCode;
    }

    public void setProvinceCode(String provinceCode) {
        this.provinceCode = provinceCode;
    }


}
