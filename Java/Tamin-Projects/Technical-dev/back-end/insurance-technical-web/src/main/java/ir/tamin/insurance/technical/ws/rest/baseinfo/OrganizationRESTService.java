/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package ir.tamin.insurance.technical.ws.rest.baseinfo;

import ir.tamin.framework.domain.proxy.ProxyProcessingException;
import ir.tamin.framework.ws.rest.ResponseHelper;
import ir.tamin.framework.ws.rest.json.FilterWrapper;
import ir.tamin.framework.ws.rest.json.SortWrapper;
import ir.tamin.insurance.technical.business.user.UserManager;
import ir.tamin.insurance.technical.model.Roles;
import ir.tamin.insurance.technical.model.user.OrgUser;
import ir.tamin.insurance.technical.service.baseinfo.OrganizationService;

import javax.annotation.security.RolesAllowed;
import javax.enterprise.context.RequestScoped;
import javax.inject.Inject;
import javax.servlet.http.HttpServletRequest;
import javax.ws.rs.*;
import javax.ws.rs.core.*;

/**
 *
 * @author p_pourjahani
 */
@Path("/organizations")
@Produces(MediaType.APPLICATION_JSON)
@RequestScoped
public class OrganizationRESTService {

    @Inject
    private OrganizationService organizationService;

    @Inject
    UserManager userManager;

    @GET
    @Produces({MediaType.APPLICATION_JSON})
    public Response getBranches(@QueryParam("query") FilterWrapper filter,
            @QueryParam("start") Integer start, @QueryParam("limit") Integer limit,
            @QueryParam("sort") SortWrapper sort, @Context SecurityContext sc) throws WebApplicationException {
        return ResponseHelper.ok(organizationService.getBranches(filter, start, limit));
    }

    @GET
    @Path("/item-page")
    public Response getItemPage(@QueryParam(value = "code") String code, @QueryParam(value = "filter") FilterWrapper filters, @QueryParam(value = "start") Long start, @QueryParam(value = "limit") Integer limit, @QueryParam(value = "sort") SortWrapper sort, @Context UriInfo ui, @Context HttpServletRequest request, @Context SecurityContext sc) {
        return ResponseHelper.ok(organizationService.getItemPage(code, filters, start, limit, sort));
    }

    @GET
    @Path("/get-branches-by-filter")
    public Response getBranchesByFilter(@QueryParam("filter") FilterWrapper filter, @QueryParam("query") FilterWrapper query,
                                              @QueryParam("start") Integer start, @QueryParam("limit") Integer limit,
                                              @QueryParam("sort") SortWrapper sort, @Context SecurityContext sc) throws WebApplicationException {
        if (filter == null) {
            filter = query;
        }
        return ResponseHelper.ok(organizationService.getBranchesByFilter(filter, start, limit ,sort));
    }

    @GET
    @RolesAllowed(Roles.ALL_USERS)
    @Path("/get-branch-detail-info")
    public Response getBranchDetailInfo(@Context SecurityContext securityContext) throws WebApplicationException, ProxyProcessingException {
        OrgUser user = userManager.getUserByName(securityContext.getUserPrincipal().getName());
        return ResponseHelper.ok(organizationService.getBranchDetailInfo(user));
    }
}
