/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package ir.tamin.insurance.technical.model.baseinfo;

import ir.tamin.framework.domain.AbstractEntity;
import ir.tamin.framework.ws.rest.repository.annotation.RESTResource;
import ir.tamin.framework.ws.rest.repository.annotation.ResourceId;
import ir.tamin.framework.ws.rest.repository.annotation.ResourceIds;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

/**
 *
 * @author h_poursafar
 */

@Entity
@Table(name="TB_ISUTYPE", schema = "BASEINFO")
@RESTResource()
@ResourceIds({@ResourceId(fields = {"insuranceTypeCode" })})
public class InsuranceType extends AbstractEntity<String>{

    @Id
    @Column(name="ISUTYPECODE")
    private String insuranceTypeCode;

    @Column(name="ISUTYPEDESC")
    private String insuranceTypeDesc;

    @Column(name="FINANCCODE")
    private String financialCode;

    @Column(name="TELCODE")
    private String telCode;

    @Column(name="STATUS")
    private String status;

    @Column(name="STATUSSTDATE")
    private String statusDate;

    public String getInsuranceTypeCode() {
        return insuranceTypeCode;
    }

    public void setInsuranceTypeCode(String insuranceTypeCode) {
        this.insuranceTypeCode = insuranceTypeCode;
    }

    public String getInsuranceTypeDesc() {
        return insuranceTypeDesc;
    }

    public void setInsuranceTypeDesc(String insuranceTypeDesc) {
        this.insuranceTypeDesc = insuranceTypeDesc;
    }

    public String getFinancialCode() {
        return financialCode;
    }

    public void setFinancialCode(String financialCode) {
        this.financialCode = financialCode;
    }

    public String getTelCode() {
        return telCode;
    }

    public void setTelCode(String telCode) {
        this.telCode = telCode;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public String getStatusDate() {
        return statusDate;
    }

    public void setStatusDate(String statusDate) {
        this.statusDate = statusDate;
    }

    @Override
    public String getIdentifierInstance() {
       return this.insuranceTypeCode;
    }

}
