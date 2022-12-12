/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package ir.tamin.insurance.technical.model.workshop;

import ir.tamin.framework.domain.AbstractEntity;
import ir.tamin.framework.ws.rest.repository.annotation.ResourceId;
import ir.tamin.framework.ws.rest.repository.annotation.ResourceIds;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;
import java.io.Serializable;

/**
 * @author h_poursafar
 */
@Entity
@Table(name = "baseinfo.tb_activity")
@ResourceIds({
    @ResourceId(fields = "activityCode")})

public class Activity extends AbstractEntity<String> implements Serializable {

    @Id
    @NotNull
    @Column(name = "ACTIVITYCODE")
    @Size(max = 5)
    private String activityCode;

    @Column(name = "ACTIVITYDESC")
    private String activityDesc;

    @Column(name = "STATUS", length = 1)
    private int status;

    public String getActivityCode() {
        return activityCode;
    }

    public void setActivityCode(String activityCode) {
        this.activityCode = activityCode;
    }

    public String getActivityDesc() {
        return activityDesc;
    }

    public void setActivityDesc(String activityDesc) {
        this.activityDesc = activityDesc;
    }

    public int getStatus() {
        return status;
    }

    public void setStatus(int status) {
        this.status = status;
    }

    @Override
    public String getIdentifierInstance() {
        return this.activityCode;
    }

    @Override
    public String toString() {
        return "Activity{" +
                "activityCode=" + activityCode +
                ", activityDesc='" + activityDesc + '\'' +
                ", status=" + status +
                '}';
    }
}
