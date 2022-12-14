/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package ir.tamin.incomeBank.ws.rest.baseinfo;

import ir.tamin.incomeBank.service.baseinfo.IsuTypeService;
import ir.tamin.incomeBank.ws.rest.Roles;
import ir.tamin.framework.ws.rest.ResponseHelper;
import ir.tamin.framework.ws.rest.json.FilterWrapper;
import ir.tamin.framework.ws.rest.json.SortWrapper;
import javax.annotation.security.RolesAllowed;
import javax.enterprise.context.RequestScoped;
import javax.inject.Inject;
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
@Path("/isuTypes")
@Produces(MediaType.APPLICATION_JSON)
@Consumes(MediaType.APPLICATION_JSON)
@RequestScoped
public class IsuTypeRestService {

    @Inject
    IsuTypeService service;

    @GET
    @RolesAllowed({Roles.PUBLIC_USER})
    public Response getAll(@QueryParam(value = "filter") FilterWrapper fw, @QueryParam(value = "start") Integer start, @QueryParam(value = "limit") Integer limit, @QueryParam(value = "sort") SortWrapper sw, @Context UriInfo ui, @Context SecurityContext sc) throws WebApplicationException {
        return ResponseHelper.ok(service.getAll(fw, start, limit, sw));
    }

    @GET
    @Path("/item-page")
    @RolesAllowed(Roles.PUBLIC_USER)
    public Response getItemPage(@QueryParam(value = "isutypecode") String code, @QueryParam(value = "filter") FilterWrapper filters, @QueryParam(value = "start") Integer start, @QueryParam(value = "limit") Integer limit, @QueryParam(value = "sort") SortWrapper sort, @Context UriInfo ui, @Context SecurityContext sc) {
        if (limit == null || limit < 1 || limit > 100) {
            limit = 10;
        }
        return ResponseHelper.ok(service.getItemPage(code, filters, start, limit, sort));
    }
}
