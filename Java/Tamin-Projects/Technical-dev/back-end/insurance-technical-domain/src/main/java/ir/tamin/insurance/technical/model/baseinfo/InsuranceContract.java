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
import java.util.Objects;

/**
 *
 * @author s_naqdi
 */
@Entity
@Table(name = "TB_SELFISUCONTSTAT", schema = "BASEINFO")
@RESTResource(lookupProxy = "ir.tamin.insurance.technical.business.baseinfo.InsuranceContractManager")
@ResourceIds(
        @ResourceId(fields = {"code"})
)
@ResourceOperations(
        @ResourceOperation(roles = {Roles.BRANCH_USERS}))
public class InsuranceContract extends AbstractEntity<String> {

    @Id
    @Column(name = "SELFISUCONTSTATCODE", nullable = false)
    private String code;

    @Column(name = "SELFISUCONTSTATDESC", nullable = false)
    private String description;

    @Column(name = "STATUS", nullable = false)
    private String status;

    @Column(name = "STATUSSTDATE", nullable = false)
    private String statusDate;

    @Override
    public String getIdentifierInstance() {
        return this.code;
    }

    /**
     * @return the Code
     */
    public String getCode() {
        return code;
    }

    /**
     * @param Code the Code to set
     */
    public void setCode(String Code) {
        this.code = Code;
    }

    /**
     * @return the description
     */
    public String getDesription() {
        return description;
    }

    /**
     * @param description the description to set
     */
    public void setDescription(String description) {
        this.description = description;
    }

    /**
     * @return the status
     */
    public String getStatus() {
        return status;
    }

    /**
     * @param status the status to set
     */
    public void setStatus(String status) {
        this.status = status;
    }

    /**
     * @return the statusDate
     */
    public Date getStatusDate() {
        return this.statusDate != null ? DateUtils.parse(this.statusDate, "yyyyMMdd") : null;
    }

    /**
     * @param statusDate the statusDate to set
     */
    public void setStatusDate(Date statusDate) {
        if (statusDate != null) {
            this.statusDate = DateUtils.format(statusDate, "yyyyMMdd");
        }
    }

    @Override
    public int hashCode() {
        int hash = 5;
        hash = 41 * hash + Objects.hashCode(this.code);
        return hash;
    }

    @Override
    public boolean equals(Object obj) {
        if (this == obj) {
            return true;
        }
        if (obj == null) {
            return false;
        }
        if (getClass() != obj.getClass()) {
            return false;
        }
        final InsuranceContract other = (InsuranceContract) obj;
        if (!Objects.equals(this.code, other.code)) {
            return false;
        }
        return true;
    }

}
