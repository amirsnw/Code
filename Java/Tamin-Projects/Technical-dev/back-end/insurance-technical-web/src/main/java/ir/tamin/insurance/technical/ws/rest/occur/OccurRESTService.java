package ir.tamin.insurance.technical.ws.rest.occur;

import ir.tamin.framework.cdi.util.WebProperties;
import ir.tamin.framework.core.util.Bundle;
import ir.tamin.framework.domain.proxy.ProxyProcessingException;
import ir.tamin.framework.ws.rest.ResponseHelper;
import ir.tamin.insurance.technical.business.general.RestServices;
import ir.tamin.insurance.technical.business.user.UserManager;
import ir.tamin.insurance.technical.model.Roles;
import ir.tamin.insurance.technical.model.occur.OccurRep;
import ir.tamin.insurance.technical.service.occur.OccurService;

import javax.annotation.security.RolesAllowed;
import javax.enterprise.context.RequestScoped;
import javax.inject.Inject;
import javax.servlet.http.HttpServletRequest;
import javax.ws.rs.*;
import javax.ws.rs.core.*;

/**
 * Created by a-khalighi on 5/17/2022
*/
@Path("/occur")
@Produces(MediaType.APPLICATION_JSON)
@Consumes(MediaType.APPLICATION_JSON)
@RequestScoped
public class OccurRESTService {

    @Inject
    private OccurService occurService;

    @Inject
    private UserManager userManager;

    @Inject
    RestServices restServices;

    @Inject
    @WebProperties
    Bundle webProperties;

    @GET
    @Path("/get-workshop-detail")
    @RolesAllowed(Roles.ALL_USERS)
    // @RolesAllowed(ir.tamin.insurance.special.domain.model.Roles.BRANCH_USERS)
    public Response getWorkshopDetail( @QueryParam("prwshid") String prwshid,
                                       @QueryParam("branchCode") String branchCode,
                                       @Context SecurityContext securityContext) throws Exception {
        return ResponseHelper.ok(occurService.getWorkshopDetail(branchCode, prwshid));
    }

    @GET
    @Path("/getOccurideaSeq")
    @RolesAllowed(Roles.ALL_USERS)
    //  @RolesAllowed(ir.tamin.insurance.special.domain.model.Roles.BRANCH_USERS)
    public Response getOccurideaSeq(@QueryParam("reqId") String reqId, @Context SecurityContext securityContext) throws Exception {

        return ResponseHelper.ok(occurService.getOccurideaSeq(reqId));
    }

    @GET
    @Path("/e-document-data")
    @RolesAllowed(Roles.ALL_USERS)
    public Response getOccurDocumentInfo(@QueryParam("eRepId") String eRepId, @Context SecurityContext securityContext) throws ProxyProcessingException, Exception {
        return Response.ok(restServices.getEOccurRequestDocument(eRepId)).build();
    }

    @GET
    @Path("/e-workshop-data")
    @RolesAllowed(Roles.ALL_USERS)
    public Response getOccurWorkshopInfo(@QueryParam("eRepId") String eRepId, @Context SecurityContext securityContext) throws ProxyProcessingException, Exception {
        return Response.ok(restServices.getEOccurWorkshopDetail(eRepId)).build();
    }

    @Path("/eservices")
    @POST
    @RolesAllowed(Roles.ALL_USERS)
    public Response taminSave(OccurRep occurRep, @Context UriInfo ui, @Context SecurityContext sc, @Context HttpServletRequest request) throws
            WebApplicationException {
        try {
            Boolean result = occurService.eServiceSave(occurRep);
            return ResponseHelper.ok(result);
        } catch (Exception e) {

            return ResponseHelper.serverError(e);
        }
    }
}
