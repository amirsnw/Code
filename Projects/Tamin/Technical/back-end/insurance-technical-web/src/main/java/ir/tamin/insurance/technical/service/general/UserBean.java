/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package ir.tamin.insurance.technical.service.general;


import ir.tamin.insurance.technical.model.user.OrgUser;

import javax.annotation.PostConstruct;
import javax.inject.Inject;
import javax.ws.rs.core.SecurityContext;
import java.io.Serializable;
import java.security.Principal;

/**
 *
 * @author s_naghavi
 */
public class UserBean implements Serializable {
      private OrgUser user;
    @Inject
    private RestService rs;

    public OrgUser getCurrentUser(SecurityContext securityContext) {
        Principal principal = securityContext.getUserPrincipal();
        return rs.getUserByName(principal.getName());
    }

    @PostConstruct
    public void initialize() {
    }

}
