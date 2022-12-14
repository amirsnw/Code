/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package ir.tamin.insurance.technical.model.baseinfo;

import ir.tamin.framework.core.util.DateUtils;
import ir.tamin.framework.domain.AbstractEntity;
import ir.tamin.framework.ws.rest.repository.annotation.*;
import ir.tamin.insurance.technical.model.Roles;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;
import java.util.Date;

/**
 *
 * @author s_naqdi
 */
@Entity
@Table(name = "TB_SELFISUTYPE" , schema = "BASEINFO")
@RESTResource(lookupProxy = "ir.tamin.insurance.technical.business.baseinfo.PremiumTypeManager")
@ResourceIds(
        @ResourceId(fields = {"insuranceTypeCode"})
)
@ResourceOperations(
        @ResourceOperation(roles = {Roles.BRANCH_USERS}))
public class PremiumType extends AbstractEntity<String> {

    @Id
    @Column(name = "SELFISUTYPECODE", nullable = false)
    private String insuranceTypeCode;

    @Column(name = "SELFISUTYPEDESC", nullable = false)
    private String insuranceDescription;

    @Column(name = "STATUS", nullable = false)
    private String status;

    @Column(name = "STATUSSTDATE", nullable = false)
    private String statusDate;

    @Column(name = "SELFISUTYPEKIND", nullable = false)
    private String insuranceKind;

    public String getInsuranceTypeCode() {
        return insuranceTypeCode;
    }

    public void setInsuranceTypeCode(String insuranceTypeCode) {
        this.insuranceTypeCode = insuranceTypeCode;
    }

    public String getInsuranceDescription() {
        return insuranceDescription;
    }

    public void setInsuranceDescription(String insuranceDescription) {
        this.insuranceDescription = insuranceDescription;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public Date getStatusDate() {
        return this.statusDate != null? DateUtils.parse(this.statusDate, "yyyyMMdd"):null;
    }

    public void setStatusDate(Date statusDate) {
        if(statusDate != null) {
            this.statusDate = DateUtils.format(statusDate, "yyyyMMdd");
        }
    }

    public String getInsuranceKind() {
        return insuranceKind;
    }

    public void setInsuranceKind(String insuranceKind) {
        this.insuranceKind = insuranceKind;
    }

    @Override
    public String getIdentifierInstance() {
        return this.insuranceTypeCode;
    }




}
