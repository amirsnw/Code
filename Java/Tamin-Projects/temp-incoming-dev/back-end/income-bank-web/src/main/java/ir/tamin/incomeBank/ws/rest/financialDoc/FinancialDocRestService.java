/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package ir.tamin.incomeBank.ws.rest.financialDoc;

import ir.tamin.framework.ws.rest.ResponseHelper;
import ir.tamin.framework.ws.rest.json.FilterWrapper;
import ir.tamin.framework.ws.rest.json.SortWrapper;
import ir.tamin.incomeBank.service.financialDoc.FinancialDocService;

import javax.enterprise.context.RequestScoped;
import javax.inject.Inject;
import javax.servlet.http.HttpServletRequest;
import javax.ws.rs.*;
import javax.ws.rs.core.*;
import java.io.IOException;
import java.sql.SQLException;
import java.util.HashMap;
import java.util.Map;
import java.util.logging.Level;
import java.util.logging.Logger;

/**
 *
 * @author a_khalighi
 */
@Path("/financial-doc")
@Produces(MediaType.APPLICATION_JSON)
@Consumes(MediaType.APPLICATION_JSON)
@RequestScoped
public class FinancialDocRestService {

    @Inject
    FinancialDocService service;

    @GET
    @Path("/get-all")
    // @RolesAllowed({Roles.MALI_SETAD_DRMD_USER, Roles.MALI_BRANCH_DRMD_USER})
    public Response getAll(@QueryParam("filter") FilterWrapper filterWrapper,
                           @QueryParam("start") Integer start,
                           @QueryParam("limit") Integer limit,
                           @QueryParam("sort") SortWrapper sort,
                           @Context UriInfo ui,
                           @Context HttpServletRequest request,
                           @Context SecurityContext sc)
            throws WebApplicationException, IOException, SQLException {

        return ResponseHelper.ok(service.getAll(filterWrapper, start, limit, sort));
    }

    @GET
    @Path("/get-sum")
    // @RolesAllowed({Roles.MALI_SETAD_DRMD_USER, Roles.MALI_BRANCH_DRMD_USER})
    public Response getAll(@QueryParam("filters") FilterWrapper filterWrapper,
                           @Context UriInfo ui,
                           @Context HttpServletRequest request,
                           @Context SecurityContext sc)
            throws WebApplicationException, IOException, SQLException {

        return ResponseHelper.ok(service.getSummery(filterWrapper));
    }

    @GET
    @Path("/fin-issuance/{year}/{month}")
    // @RolesAllowed({Roles.MALI_SETAD_DRMD_USER, Roles.MALI_BRANCH_DRMD_USER})
    public Response issuance(@PathParam("year") String year,
                             @PathParam("month") String month,
                             @Context UriInfo ui,
                             @Context HttpServletRequest request,
                             @Context SecurityContext sc)
            throws WebApplicationException, SQLException {

        return ResponseHelper.ok(service.exportFinancialDocs(year, month));
    }

    /*@GET
    @Path("/fin-submit/{year}/{month}")
    // @RolesAllowed({Roles.MALI_SETAD_DRMD_USER, Roles.MALI_BRANCH_DRMD_USER})
    public Response submit(@PathParam("year") String year, @PathParam("month") String month, @Context UriInfo ui,
                           @Context HttpServletRequest request, @Context SecurityContext sc)
            throws WebApplicationException, SQLException {

        return ResponseHelper.ok(service.financialSubmit(year, month));
    }*/

    @POST
    @Path("/send-data-to-temp")
    @Produces(MediaType.APPLICATION_JSON)
    @Consumes(MediaType.APPLICATION_JSON)
    // @RolesAllowed({Roles.MALI_SETAD_DRMD_USER, Roles.MALI_BRANCH_DRMD_USER})
    public Response sendDataToTemp(FilterWrapper filterWrapper,
                                   @Context UriInfo ui,
                                   @Context HttpServletRequest request,
                                   @Context SecurityContext sc) {

        return ResponseHelper.ok(service.sendDataToTemp(filterWrapper));
    }
}
