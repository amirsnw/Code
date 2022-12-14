/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package ir.tamin.insurance.technical.ws.rest.user;

import ir.tamin.framework.ws.rest.ResponseHelper;
import ir.tamin.insurance.technical.business.user.UserBean;
import ir.tamin.insurance.technical.model.Roles;

import javax.annotation.security.RolesAllowed;
import javax.enterprise.context.RequestScoped;
import javax.inject.Inject;
import javax.ws.rs.GET;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.core.Context;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;
import javax.ws.rs.core.SecurityContext;

/**
 *
 * @author e_shoghi
 */
@Path("/users")
@RequestScoped
public class UserRESTService {

    //    @Inject
//    private TokenContext tokenContext;
//    @Inject
//    private UserManager userManager;
    @Inject
    UserBean userBean;

    @GET
    @Path("/current-user")
    @Produces({MediaType.APPLICATION_JSON})
    @RolesAllowed({
            Roles.GENERAL_USER_TECH,
            Roles.PROV_HEAD_USER_TECH,
            Roles.INSPECTOR_USER_TECH,
            Roles.MANAGER_USER_TECH ,
            Roles.HEAD_USER_TECH ,
            Roles.EDAREKOL_FANI_USER,
            Roles.EDAREKOL_BROKER_USER_TECH ,
            Roles.GENERAL_BROKER_USER_TECH ,
            Roles.SETAD_BROKER_USER_TECH })
    public Response getUser(@Context SecurityContext securityContext) {
        //  return ResponseHelper.ok(userManager.getUserByName(tokenContext.getCurrentUser().toString()));
        return ResponseHelper.ok(userBean.getCurrentUser(securityContext));
    }
}
