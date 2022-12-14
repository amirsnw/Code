/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package ir.tamin.incomeBank.model.asnad;

import java.io.Serializable;

/**
 *
 * @author s_maknooni
 */
public class OrganizationModel implements Serializable {

    private String provinceCode;
    private String provinceName;
    private String organizationCode;
    private String organizationName;
    private String vahedCode;
    private String vahedName;
    private String custNo;
    private String custName;

    public void setVahedCode(String vahedCode) {
        this.vahedCode = vahedCode;
    }

    public void setVahedName(String vahedName) {
        this.vahedName = vahedName;
    }

    public void setCustNo(String custNo) {
        this.custNo = custNo;
    }

    public void setCustName(String custName) {
        this.custName = custName;
    }

    public String getVahedCode() {
        return vahedCode;
    }

    public String getVahedName() {
        return vahedName;
    }

    public String getCustNo() {
        return custNo;
    }

    public String getCustName() {
        return custName;
    }

    public OrganizationModel() {
    }

    public OrganizationModel(String provinceCode, String provinceName, String organizationCode, String organizationName) {
        this.provinceCode = provinceCode;
        this.provinceName = provinceName;
        this.organizationCode = organizationCode;
        this.organizationName = organizationName;
    }

    public String getProvinceCode() {
        return provinceCode;
    }

    public void setProvinceCode(String provinceCode) {
        this.provinceCode = provinceCode;
    }

    public String getProvinceName() {
        return provinceName;
    }

    public void setProvinceName(String provinceName) {
        this.provinceName = provinceName;
    }

    public String getOrganizationCode() {
        return organizationCode;
    }

    public void setOrganizationCode(String organizationCode) {
        this.organizationCode = organizationCode;
    }

    public String getOrganizationName() {
        return organizationName;
    }

    public void setOrganizationName(String organizationName) {
        this.organizationName = organizationName;
    }

}
