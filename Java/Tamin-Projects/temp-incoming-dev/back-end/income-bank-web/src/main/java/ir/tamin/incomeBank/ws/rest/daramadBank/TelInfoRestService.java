/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package ir.tamin.incomeBank.ws.rest.daramadBank;

import ir.tamin.incomeBank.ws.rest.Roles;
import ir.tamin.framework.ws.rest.ResponseHelper;
import javax.annotation.security.RolesAllowed;
import javax.enterprise.context.RequestScoped;
import ir.tamin.incomeBank.service.daramadBank.TelInfoService;
import ir.tamin.incomeBank.model.daramadBank.TelInfo;
import ir.tamin.incomeBank.ws.rest.ResourceRESTService;
import ir.tamin.framework.ws.rest.json.FilterWrapper;
import ir.tamin.framework.ws.rest.json.SortWrapper;
import java.io.IOException;
import java.sql.SQLException;
import java.util.logging.Level;
import java.util.logging.Logger;
import javax.inject.Inject;
import javax.servlet.http.HttpServletRequest;
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
@Path("/telInfo")
@RequestScoped
@Produces(MediaType.APPLICATION_JSON)
public class TelInfoRestService implements ResourceRESTService<TelInfo> {

    @Inject
    TelInfoService telInfoService;

    @GET
    @Path("/getAllBankTelInfo")
    @RolesAllowed({Roles.ALL_USERS})
//    @RolesAllowed({Roles.PUBLIC_USER})
    public Response getAllCalcOPBank(@QueryParam("filter") FilterWrapper filterWrapper, @QueryParam("sort") SortWrapper sort, @Context UriInfo ui, @Context HttpServletRequest request, @Context SecurityContext sc) throws WebApplicationException, SQLException {

        return ResponseHelper.ok(telInfoService.getAllBankTelInfo(filterWrapper, sort));

    }

    @Override
    public Response get(String id, UriInfo uriInfo, SecurityContext securityContext, HttpServletRequest request) throws WebApplicationException {
        throw new UnsupportedOperationException("Not supported yet."); //To change body of generated methods, choose Tools | Templates.
    }

    @Override
//    @RolesAllowed({Roles.MALI_BRANCH_DRMD_USER})
    @RolesAllowed({Roles.ALL_USERS})
    public Response getAll(FilterWrapper filterWrapper, Integer start, Integer limit, SortWrapper sortWrapper, UriInfo uriInfo, SecurityContext securityContext, HttpServletRequest request) throws WebApplicationException {
        return ResponseHelper.ok(telInfoService.getAll(filterWrapper, sortWrapper));
    }

    @Override
    public Response save(TelInfo t, UriInfo uriInfo, SecurityContext securityContext, HttpServletRequest request) throws WebApplicationException {
        throw new UnsupportedOperationException("Not supported yet."); //To change body of generated methods, choose Tools | Templates.
    }

    @Override
    public Response edit(String id, TelInfo t, UriInfo uriInfo, SecurityContext securityContext, HttpServletRequest request) throws WebApplicationException {
        throw new UnsupportedOperationException("Not supported yet."); //To change body of generated methods, choose Tools | Templates.
    }

    @Override
    public Response remove(String id, UriInfo uriInfo, SecurityContext securityContext, HttpServletRequest request) throws WebApplicationException {
        throw new UnsupportedOperationException("Not supported yet."); //To change body of generated methods, choose Tools | Templates.
    }

    @GET
    @Produces("application/pdf")
    @Path("/telReport")
    public Response doGet(@QueryParam("filter") FilterWrapper filterWrapper, @QueryParam("sort") SortWrapper sort, @Context HttpServletRequest request, @Context SecurityContext sc) throws WebApplicationException, SQLException {

        byte[] byteStream = null;
        try {
            byteStream = telInfoService.doGet(filterWrapper, sort);
        } catch (IOException ex) {
            Logger.getLogger(TelInfoRestService.class.getName()).log(Level.SEVERE, null, ex);
        }
        return Response
                .ok(byteStream)
                .header("Content-Type", "application/pdf")
                .build();
    }
}
