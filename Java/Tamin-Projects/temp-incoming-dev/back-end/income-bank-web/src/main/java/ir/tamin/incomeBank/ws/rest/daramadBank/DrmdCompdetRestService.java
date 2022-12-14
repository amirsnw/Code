/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package ir.tamin.incomeBank.ws.rest.daramadBank;

import ir.tamin.incomeBank.model.daramadBank.DrmdCompdet;
import ir.tamin.incomeBank.service.daramadBank.DrmdCompdetService;
import ir.tamin.incomeBank.ws.rest.ResourceRESTService;
import ir.tamin.incomeBank.ws.rest.Roles;
import ir.tamin.framework.ws.rest.ResponseHelper;
import ir.tamin.framework.ws.rest.json.FilterWrapper;
import ir.tamin.framework.ws.rest.json.SortWrapper;
import javax.annotation.security.RolesAllowed;
import javax.enterprise.context.RequestScoped;
import javax.inject.Inject;
import javax.servlet.http.HttpServletRequest;
import javax.ws.rs.Consumes;
import javax.ws.rs.GET;
import javax.ws.rs.Path;
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
@Path("/compdet")
@Produces(MediaType.APPLICATION_JSON)
@Consumes(MediaType.APPLICATION_JSON)
@RequestScoped
public class DrmdCompdetRestService implements ResourceRESTService<DrmdCompdet> {

    @Inject
    DrmdCompdetService drmdCompdetService;

    @Override
    public Response get(String id, UriInfo uriInfo, SecurityContext securityContext, HttpServletRequest request) throws WebApplicationException {
        throw new UnsupportedOperationException("Not supported yet."); //To change body of generated methods, choose Tools | Templates.
    }

    @Override
    @RolesAllowed({Roles.MALI_SETAD_DRMD_USER, Roles.MALI_BRANCH_DRMD_USER})
    public Response getAll(FilterWrapper filterWrapper, Integer start, Integer limit, SortWrapper sortWrapper, UriInfo uriInfo, SecurityContext securityContext, HttpServletRequest request) throws WebApplicationException {
        return ResponseHelper.ok(drmdCompdetService.getAll(filterWrapper, start, limit, sortWrapper));
    }

    @Override
    public Response save(DrmdCompdet t, UriInfo uriInfo, SecurityContext securityContext, HttpServletRequest request) throws WebApplicationException {
        throw new UnsupportedOperationException("Not supported yet."); //To change body of generated methods, choose Tools | Templates.
    }

    @Override
    public Response edit(String id, DrmdCompdet t, UriInfo uriInfo, SecurityContext securityContext, HttpServletRequest request) throws WebApplicationException {
        throw new UnsupportedOperationException("Not supported yet."); //To change body of generated methods, choose Tools | Templates.
    }

    @Override
    public Response remove(String id, UriInfo uriInfo, SecurityContext securityContext, HttpServletRequest request) throws WebApplicationException {
        throw new UnsupportedOperationException("Not supported yet."); //To change body of generated methods, choose Tools | Templates.
    }

    @GET
    @Path("/processCompare")
    @RolesAllowed({Roles.MALI_SETAD_DRMD_USER, Roles.MALI_BRANCH_DRMD_USER})
    public Response processCompare(@QueryParam(value = "filter") FilterWrapper fw, @Context UriInfo ui, @Context SecurityContext sc) throws WebApplicationException {
        return ResponseHelper.ok(drmdCompdetService.ProcessCompare(fw));
    }

    @GET
    @Path("/prcExtComDet")
    @RolesAllowed({Roles.MALI_SETAD_DRMD_USER, Roles.MALI_BRANCH_DRMD_USER})
    public Response prcExtComDet(@QueryParam(value = "filter") FilterWrapper fw, @Context UriInfo ui, @Context SecurityContext sc) throws WebApplicationException {
        return ResponseHelper.ok(drmdCompdetService.prcExtComDet(fw));
    }

    @GET
    @Path("/beforeCheqSanad")
    @RolesAllowed({Roles.MALI_SETAD_DRMD_USER, Roles.MALI_BRANCH_DRMD_USER})
    public Response beforeCheqSanad(@QueryParam(value = "filter") FilterWrapper fw, @Context UriInfo ui, @Context SecurityContext sc) throws WebApplicationException {
        return ResponseHelper.ok(drmdCompdetService.beforeCheqSanad(fw));
    }

    @GET
    @Path("/prcExtVouch")
    @RolesAllowed({Roles.MALI_SETAD_DRMD_USER, Roles.MALI_BRANCH_DRMD_USER})
    public Response prcExtVouch(@QueryParam(value = "filter") FilterWrapper fw, @Context UriInfo ui, @Context SecurityContext sc) throws WebApplicationException {
        return ResponseHelper.ok(drmdCompdetService.prcExtVouch(fw));
    }
}
