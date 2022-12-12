/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package ir.tamin.insurance.technical.model;

import ir.tamin.framework.domain.AbstractEntity;
import ir.tamin.framework.domain.function.DBFunctionInput;
import ir.tamin.framework.ws.rest.repository.annotation.RESTResource;
import ir.tamin.framework.ws.rest.repository.annotation.ResourceOperation;
import ir.tamin.framework.ws.rest.repository.annotation.ResourceOperations;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

/**
 *
 * @author e_shoghi
 */
@Entity
@Table(name = "TB_ADRPLACETYPE", schema = "BASEINFO")
@RESTResource
@ResourceOperations(
        @ResourceOperation(roles = {Roles.BRANCH_USERS}))
public class AddressPlaceType extends AbstractEntity<String> implements DBFunctionInput {

    @Id
    @Column(name = "ADRPLACETYPECODE")
    private String placeTypeCode;
    @Column(name = "ADRPLACETYPEDESC")
    private String placeTypeDesc;
    @Column(name = "STATUS")
    private String status;
    @Column(name = "STATUSSTDATE")
    private String statusStDate;

    public String getPlaceTypeCode() {
        return placeTypeCode;
    }

    public void setPlaceTypeCode(String placeTypeCode) {
        this.placeTypeCode = placeTypeCode;
    }

    public String getPlaceTypeDesc() {
        return placeTypeDesc;
    }

    public void setPlaceTypeDesc(String placeTypeDesc) {
        this.placeTypeDesc = placeTypeDesc;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public String getStatusStDate() {
        return statusStDate;
    }

    public void setStatusStDate(String statusStDate) {
        this.statusStDate = statusStDate;
    }

    @Override
    public String getIdentifierInstance() {
        return placeTypeCode;
    }
}
