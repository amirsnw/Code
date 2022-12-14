/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package ir.tamin.insurance.technical.business.user;

import ir.tamin.insurance.technical.business.general.RestServices;
import ir.tamin.insurance.technical.model.user.OrgUser;

import javax.annotation.PostConstruct;
import javax.ejb.Stateless;
import javax.inject.Inject;
import javax.ws.rs.core.SecurityContext;
import java.io.Serializable;
import java.security.Principal;

/**
 *
 * @author l_eivazi
 */
@Stateless
public class UserBean implements Serializable {

    private OrgUser user;
    @Inject
    private RestServices rs;

    public OrgUser getCurrentUser(SecurityContext securityContext) {
        Principal principal = securityContext.getUserPrincipal();
        return rs.getUserByName(principal.getName());
    }

    @PostConstruct
    public void initialize() {
    }

    //
//    @Inject
//    private RestServices rs;
//    @Inject
//    UserManager uManager;
//    //@Produces
//    public OrgUser getCurrentUser(String username) {
//        OrgUser user;
//        //if (user ==null)
//        //{
//            user=uManager.getCurrentUser(username);
//        //}
//        return user;
//    }
    //@PostConstruct
    //public void initialize() {
    //this.user = rs.getUserByName(uManager.getCurrentUser());
    //}
//    @PostConstruct
//    public void initialize(InvocationContext ic) {
//        // this.user = rs.getUserByName(uManager.getCurrentUser());
//    }
}
