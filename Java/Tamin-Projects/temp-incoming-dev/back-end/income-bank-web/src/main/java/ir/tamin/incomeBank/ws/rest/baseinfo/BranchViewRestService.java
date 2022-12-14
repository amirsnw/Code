package ir.tamin.incomeBank.ws.rest.baseinfo;

import ir.tamin.framework.ws.rest.ResponseHelper;
import ir.tamin.framework.ws.rest.json.FilterWrapper;
import ir.tamin.framework.ws.rest.json.SortWrapper;
import ir.tamin.incomeBank.service.baseinfo.BranchViewService;
import ir.tamin.incomeBank.ws.rest.Roles;

import javax.annotation.security.RolesAllowed;
import javax.enterprise.context.RequestScoped;
import javax.inject.Inject;
import javax.ws.rs.*;
import javax.ws.rs.core.Context;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;
import javax.ws.rs.core.SecurityContext;

@Path("/branches-view")
@Produces(MediaType.APPLICATION_JSON)
@Consumes(MediaType.APPLICATION_JSON)
@RequestScoped
public class BranchViewRestService {

    @Inject
    BranchViewService service;

    @GET
    @Path("/getAll")
//    @RolesAllowed({Roles.ALL_USERS})
    @Consumes(MediaType.APPLICATION_JSON)
    public Response getAll(@QueryParam("filter") FilterWrapper fw, @QueryParam("start") Integer start, @QueryParam("limit") Integer limit, @QueryParam("sort") SortWrapper sw, @Context SecurityContext sc) throws Exception {
        return ResponseHelper.ok(service.getBranchs(fw, start != null ? start : 0, limit != null ? limit : 1));
    }

    @GET
    @Path("/get-edare")
//    @RolesAllowed({Roles.ALL_USERS})
    @Consumes(MediaType.APPLICATION_JSON)
    public Response getEdareKol(@QueryParam("filter") FilterWrapper fw, @QueryParam("start") Integer start, @QueryParam("limit") Integer limit, @QueryParam("sort") SortWrapper sw, @Context SecurityContext sc) throws Exception {
        return ResponseHelper.ok(service.getEdareKol(fw, start != null ? start : 0, limit != null ? limit : 1));
    }

}
