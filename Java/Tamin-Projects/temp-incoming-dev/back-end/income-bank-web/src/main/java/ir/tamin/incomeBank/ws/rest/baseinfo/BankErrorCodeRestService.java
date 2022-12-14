/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package ir.tamin.incomeBank.ws.rest.baseinfo;

import ir.tamin.incomeBank.model.baseinfo.BankErrorCode;
import ir.tamin.incomeBank.model.identityManager.User;
import ir.tamin.incomeBank.service.baseinfo.BankErrorCodeService;
import ir.tamin.incomeBank.service.identityManager.UserBean;
import ir.tamin.incomeBank.ws.rest.ResourceRESTService;
import ir.tamin.incomeBank.ws.rest.Roles;
import ir.tamin.framework.cdi.util.WebProperties;
import ir.tamin.framework.core.util.Bundle;
import ir.tamin.framework.ws.rest.ResponseHelper;
import ir.tamin.framework.ws.rest.json.Filter;
import ir.tamin.framework.ws.rest.json.FilterWrapper;
import ir.tamin.framework.ws.rest.json.SortWrapper;
import java.math.BigDecimal;
import javax.annotation.security.RolesAllowed;
import javax.enterprise.context.RequestScoped;
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
@Path("/bankError")
@RequestScoped
@Produces(MediaType.APPLICATION_JSON)
public class BankErrorCodeRestService implements ResourceRESTService<BankErrorCode> {

    @Inject
    BankErrorCodeService bankErrorCodeService;

    @Inject
    @WebProperties
    Bundle webBundle;

    @Inject
    UserBean userBean;

    @GET
    @Path("/getAll")
    @RolesAllowed({Roles.PUBLIC_USER})
    public Response getAllError(@QueryParam(value = "query") FilterWrapper query, @QueryParam("filter") FilterWrapper filterWrapper, @QueryParam("start") Integer start, @QueryParam("limit") Integer limit, @QueryParam("sort") SortWrapper sortWrapper, @Context UriInfo uriInfo, @Context SecurityContext securityContext, @Context HttpServletRequest request) throws WebApplicationException {
        if (query != null) { // search in Combo
            if (filterWrapper == null) {
                filterWrapper = query;
            } else if (filterWrapper.getFilters() != null) {
                for (Filter queryFilter : query.getFilters()) {
                    filterWrapper.getFilters().add(queryFilter);
                }
            } else {
                filterWrapper.setFilters(query.getFilters());
            }
        }
        return ResponseHelper.ok(bankErrorCodeService.getAll(filterWrapper, start, limit, sortWrapper));
    }

    @Override
    @RolesAllowed({Roles.PUBLIC_USER})
    public Response get(String id, UriInfo uriInfo, SecurityContext securityContext, HttpServletRequest request) throws WebApplicationException {
        return ResponseHelper.ok(bankErrorCodeService.get(new BigDecimal(id)));
    }

    @Override
    @RolesAllowed({Roles.PUBLIC_USER})
    public Response getAll(FilterWrapper filterWrapper, Integer start, Integer limit, SortWrapper sortWrapper, UriInfo uriInfo, SecurityContext securityContext, HttpServletRequest request) throws WebApplicationException {
        return ResponseHelper.ok(bankErrorCodeService.getAll(filterWrapper, start, limit, sortWrapper));
    }

    @Override
    @RolesAllowed(Roles.BASEINFO_USER)
    public Response save(BankErrorCode t, UriInfo uriInfo, SecurityContext securityContext, HttpServletRequest request) throws WebApplicationException {
        User user = userBean.getUserByUserName(securityContext.getUserPrincipal().getName());
        return ResponseHelper.ok(bankErrorCodeService.save(t, user));
    }

    @Override
    @RolesAllowed(Roles.SUPPORTER)
    public Response edit(String id, BankErrorCode t, UriInfo uriInfo, SecurityContext securityContext, HttpServletRequest request) throws WebApplicationException {
        User user = userBean.getUserByUserName(securityContext.getUserPrincipal().getName());
        t.setErrorId(new BigDecimal(id));
        return ResponseHelper.ok(bankErrorCodeService.update(t, user));
    }

    @Override
    @RolesAllowed(Roles.SUPPORTER)
    public Response remove(String id, UriInfo uriInfo, SecurityContext securityContext, HttpServletRequest request) throws WebApplicationException {
        BigDecimal bDId = new BigDecimal(id);
        User user = userBean.getUserByUserName(securityContext.getUserPrincipal().getName());
        return ResponseHelper.ok(bankErrorCodeService.delete(bankErrorCodeService.get(bDId), user));
    }
}
