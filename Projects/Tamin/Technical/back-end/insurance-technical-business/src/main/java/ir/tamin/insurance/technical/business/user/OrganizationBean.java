/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package ir.tamin.insurance.technical.business.user;

import ir.tamin.insurance.technical.business.general.RestServices;
import ir.tamin.insurance.technical.model.user.Organization;

import javax.annotation.PostConstruct;
import javax.enterprise.context.ApplicationScoped;
import javax.inject.Inject;
import java.io.Serializable;
import java.util.ArrayList;
import java.util.List;

/**
 *
 * @author h_poursafar
 */
@ApplicationScoped
public class OrganizationBean implements Serializable {

    @Inject
    private RestServices  gs;

    private List<Organization> organizations;
    private List<Organization> myorgs;

    @PostConstruct
    public void initialize() {
        organizations = (List<Organization>) gs.getOrganizations(null, null, null).get("list");
    }

    public List<Organization> getOrganizations() {
        return organizations;
    }

    public Organization getOrganizationById(String id) {
        if (id == null || id.equals("")) {
            return null;
        }
        if (getOrganizations() != null && getOrganizations().size() > 0) {
            for (Organization org : getOrganizations()) {
                if (org.getEntityId().equals(id)) {
                    return org;
                }
            }
        }
        return null;
    }

    public Organization getOrganizationByCode(String code) {
        if (code == null || code.equals("")) {
            return null;
        }
        if (getOrganizations() != null && getOrganizations().size() > 0) {
            for (Organization org : getOrganizations()) {
                if (org.getCode().equals(code)) {
                    return org;
                }
            }
        }
        return null;
    }

    public List<Organization> getSubOrganization(Organization unit) {
        myorgs = new ArrayList<>();
        myorgs=getChilds(unit);
        return myorgs;
    }

    private List<Organization> getChilds(Organization unit) {

        myorgs.add(unit);
        if (unit.getChildren() != null) {
            for (Organization u : unit.getChildren()) {

                
                getChilds(u);
            }
        }
        return myorgs;
    }

    public void getFullOrganization(List<Organization> parents) {

        for (Organization parent : parents) {
            List<Organization> childs = new ArrayList<>();
            for (Organization item : organizations) {
                if (item.getParent().getEntityId().equals(parent.getEntityId())) {
                    childs.add(item);
                }
            }

            if (!childs.isEmpty()) {
                parent.setChildren(childs);
                getFullOrganization(childs);
            }

        }

    }
    
    
}
