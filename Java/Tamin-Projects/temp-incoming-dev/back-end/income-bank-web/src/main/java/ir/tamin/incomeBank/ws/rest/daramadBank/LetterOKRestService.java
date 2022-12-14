/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package ir.tamin.incomeBank.ws.rest.daramadBank;

import ir.tamin.incomeBank.model.daramadBank.DrmdLetterOK;
import ir.tamin.incomeBank.model.identityManager.User;
import ir.tamin.incomeBank.service.daramadBank.LetterOKService;
import ir.tamin.incomeBank.service.identityManager.UserBean;
import ir.tamin.incomeBank.ws.rest.Roles;
import ir.tamin.framework.ws.rest.ResponseHelper;
import javax.annotation.security.RolesAllowed;
import javax.enterprise.context.RequestScoped;
import javax.inject.Inject;
import javax.servlet.http.HttpServletRequest;
import javax.ws.rs.Consumes;
import javax.ws.rs.GET;
import javax.ws.rs.POST;
import javax.ws.rs.PUT;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.Produces;
import javax.ws.rs.QueryParam;
import javax.ws.rs.WebApplicationException;
import javax.ws.rs.core.Context;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;
import javax.ws.rs.core.SecurityContext;
import javax.ws.rs.core.UriInfo;

/**
 *
 * @author f_fotuhi
 */
@Path("letterOK")
@Produces(MediaType.APPLICATION_JSON)
@Consumes(MediaType.APPLICATION_JSON)
@RequestScoped
public class LetterOKRestService {

    @Inject
    LetterOKService service;

    @Inject
    UserBean userBean;

    @GET
    @Path("getLetterStat")
    @RolesAllowed({Roles.MALI_BRANCH_ACCOUNTANT, Roles.MALI_BRANCH_BOSS, Roles.MALI_SETAD_DRMD_USER, Roles.MALI_BRANCH_DRMD_USER})
    public Response getLetterStat(@QueryParam("letterSerial") String letterSerial, @Context UriInfo uriInfo, @Context SecurityContext securityContext, @Context HttpServletRequest request) throws WebApplicationException {
        return ResponseHelper.ok(service.getLetterStat(letterSerial));
    }

    @POST
    @Path("saveLetterStat")
    @RolesAllowed({Roles.MALI_BRANCH_ACCOUNTANT, Roles.MALI_SETAD_DRMD_USER, Roles.MALI_BRANCH_DRMD_USER})
    public Response saveLetterStat(DrmdLetterOK inputModel, @Context UriInfo uriInfo, @Context SecurityContext securityContext, @Context HttpServletRequest request) throws WebApplicationException {
        User user = userBean.getUserByUserName(securityContext.getUserPrincipal().getName());
        return ResponseHelper.ok(service.save(inputModel, user));
    }

    @PUT
    @Path("updateLetterStat")
    @RolesAllowed({Roles.MALI_BRANCH_BOSS, Roles.MALI_SETAD_DRMD_USER, Roles.MALI_BRANCH_DRMD_USER})
    public Response updateLetterStat(DrmdLetterOK inputModel, @Context UriInfo uriInfo, @Context SecurityContext securityContext, @Context HttpServletRequest request) throws WebApplicationException {
        User user = userBean.getUserByUserName(securityContext.getUserPrincipal().getName());
        return ResponseHelper.ok(service.update(inputModel, user));
    }

    @GET
    @Path("sendToBank/{letterSerial}/{letterDate}/{brchCode}/{status}")
    @RolesAllowed({Roles.MALI_BRANCH_DRMD_USER, Roles.MALI_SETAD_DRMD_USER})
    public Response sendToBranch(@PathParam("letterSerial") String letterSerial, @PathParam("letterDate") String letterDate, @PathParam("brchCode") String brchCode,@PathParam("status") String status, @Context UriInfo uriInfo, @Context SecurityContext securityContext,
            @Context HttpServletRequest request) throws WebApplicationException {
        return ResponseHelper.ok(service.sendToBranch(letterSerial, letterDate, brchCode,status));
    }
}
