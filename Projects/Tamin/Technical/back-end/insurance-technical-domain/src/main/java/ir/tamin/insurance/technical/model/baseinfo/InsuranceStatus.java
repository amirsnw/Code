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
@Table(name="TB_INSUREDSTATUS" ,schema = "BASEINFO")
@RESTResource
@ResourceIds({@ResourceId(fields = {"insuranceStatCode" })})
public class InsuranceStatus extends AbstractEntity<String>{

    @Id
    @Column(name="ISUSTATCODE")
    private String insuranceStatCode;


    @Column(name="ISUSTATDESC")
    private String insuranceStatDesc;


    @Column(name="STATUS")
    private String status;

    @Column(name="STATUSSTDATE")
    private String statusDate;

    public String getInsuranceStatCode() {
        return insuranceStatCode;
    }

    public void setInsuranceStatCode(String insuranceStatCode) {
        this.insuranceStatCode = insuranceStatCode;
    }

    public String getInsuranceStatDesc() {
        return insuranceStatDesc;
    }

    public void setInsuranceTypeDesc(String insuranceStatDesc) {
        this.insuranceStatDesc = insuranceStatDesc;
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
       return this.insuranceStatCode;
    }



}
