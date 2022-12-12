/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package ir.tamin.insurance.technical.model.user;

import ir.tamin.framework.domain.AbstractEntity;
import ir.tamin.framework.ws.rest.repository.annotation.*;
import ir.tamin.insurance.technical.model.Roles;
import ir.tamin.insurance.technical.model.workshop.Workshop;

import javax.persistence.*;

/**
 * @author l_eivazi
 */
@Entity
@Table(name = "INS_WORKSHOP_USER")
//@RESTResource(lookupProxy = "ir.tamin.insurance.technical.business.user.WorkshopUserManager")
@RESTResource()
@ResourceIds({
        @ResourceId(fields = {"entityId"})})
@ResourceOperations(
        @ResourceOperation(roles = {Roles.BRANCH_USERS}))
public class WorkshopUser extends AbstractEntity<Long> {

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    private Long id;
    //    @ManyToOne( cascade = CascadeType.ALL)
    @ManyToOne
    @JoinColumns({@JoinColumn(name = "WORKSHOP_ID", referencedColumnName = "RWSHID", nullable = false),
            @JoinColumn(name = "BRCH_CODE", referencedColumnName = "BRCH_CODE", insertable = false, updatable = false)
    })
    private Workshop workshop;
    @Column(name = "USER_ID")
    private String userId;
    @Column(name = "DELETED")
    private String deleted = "1";

    @Column(name = "brch_code")
    private String branchCode;

    public WorkshopUser() {
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Workshop getWorkshop() {
        return workshop;
    }

    public void setWorkshop(Workshop workshop) {
        this.workshop = workshop;
    }

    public String getUserId() {
        return userId;
    }

    public void setUserId(String userId) {
        this.userId = userId;
    }

    public String getDeleted() {
        return deleted;
    }

    public void setDeleted(String deleted) {
        this.deleted = deleted;
    }

    public String getBranchCode() {
        return branchCode;
    }

    public void setBranchCode(String branchCode) {
        this.branchCode = branchCode;
    }

    @Override
    public Long getIdentifierInstance() {
        return this.id;
    }

}
