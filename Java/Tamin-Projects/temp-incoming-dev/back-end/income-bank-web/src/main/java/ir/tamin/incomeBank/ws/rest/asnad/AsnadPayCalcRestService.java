/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package ir.tamin.incomeBank.ws.rest.asnad;

import ir.tamin.incomeBank.ws.rest.Roles;
import javax.annotation.security.RolesAllowed;
import javax.enterprise.context.RequestScoped;
import javax.ws.rs.Consumes;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;
import ir.tamin.incomeBank.model.asnad.AsnadCalcInputModel;
import ir.tamin.framework.ws.rest.ResponseHelper;
import javax.inject.Inject;
import javax.servlet.http.HttpServletRequest;
import javax.ws.rs.WebApplicationException;
import javax.ws.rs.core.Context;
import javax.ws.rs.core.SecurityContext;
import javax.ws.rs.core.UriInfo;
import ir.tamin.incomeBank.service.asnad.AsnadPayCalcService;

/**
 *
 * @author h_riazat L
 */
@Path("/asnadPayCalc")
@RequestScoped
@Produces(MediaType.APPLICATION_JSON)
public class AsnadPayCalcRestService {

    @Inject
    AsnadPayCalcService asnadPayCalcService;

    @POST
    @Path("/totalAmount")
    @Consumes(MediaType.APPLICATION_JSON)
    @RolesAllowed({Roles.MALI_SETAD_ASNAD_USER})
    public Response totalAmount(AsnadCalcInputModel asnadCalcInputModel, @Context UriInfo uriInfo, @Context SecurityContext securityContext, @Context HttpServletRequest request) throws WebApplicationException {
        return ResponseHelper.ok(asnadPayCalcService.totalAmount(asnadCalcInputModel));
    }

    @POST
    @Path("/totalWithGroupByCustType")
    @Consumes(MediaType.APPLICATION_JSON)
    @RolesAllowed({Roles.MALI_SETAD_ASNAD_USER})
    public Response totalWithGroupByCustType(AsnadCalcInputModel asnadCalcInputModel, @Context UriInfo uriInfo, @Context SecurityContext securityContext, @Context HttpServletRequest request) throws WebApplicationException {
        return ResponseHelper.ok(asnadPayCalcService.totalWithGroupByCustType(asnadCalcInputModel));
    }

    @POST
    @Path("/totalWithGroupByBank")
    @Consumes(MediaType.APPLICATION_JSON)
    @RolesAllowed({Roles.MALI_SETAD_ASNAD_USER})
    public Response totalWithGroupByBank(AsnadCalcInputModel asnadCalcInputModel, @Context UriInfo uriInfo, @Context SecurityContext securityContext, @Context HttpServletRequest request) throws WebApplicationException {
        return ResponseHelper.ok(asnadPayCalcService.totalWithGroupByBank(asnadCalcInputModel));
    }

}
