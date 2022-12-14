/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package ir.tamin.incomeBank.ws.rest.centralPayment;

import ir.tamin.incomeBank.service.centralPayment.SubSystemService;
import ir.tamin.incomeBank.ws.rest.Roles;
import ir.tamin.framework.cdi.util.WebProperties;
import ir.tamin.framework.core.util.Bundle;
import ir.tamin.framework.ws.rest.ResponseHelper;
import ir.tamin.framework.ws.rest.json.Filter;
import ir.tamin.framework.ws.rest.json.FilterWrapper;
import ir.tamin.framework.ws.rest.json.SortWrapper;
import java.util.HashSet;
import java.util.Set;
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
 * @author s_maknooni
 */
@Path("/subSystem")
@RequestScoped
@Produces(MediaType.APPLICATION_JSON)
public class SubSystemRestService {

    @Inject
    SubSystemService subSystemService;

    @Inject
    @WebProperties
    Bundle webBundle;

    @GET
    @RolesAllowed({Roles.PUBLIC_USER})
    public Response getAll(@QueryParam(value = "query") FilterWrapper query, @QueryParam("filter") FilterWrapper filterWrapper, @QueryParam("start") Integer start, @QueryParam("limit") Integer limit, @QueryParam("sort") SortWrapper sortWrapper, @Context UriInfo uriInfo, @Context SecurityContext securityContext, @Context HttpServletRequest request) throws WebApplicationException {
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
        return ResponseHelper.ok(subSystemService.getAll(filterWrapper, start, limit, sortWrapper));
    }

    @GET
    @Path("/getAllCalcShorttermSubSystem")
    @RolesAllowed({Roles.MALI_SETAD_SHORTTERM_USER})
    public Response getAllCalcShorttermSubSystem(@QueryParam("filter") FilterWrapper filterWrapper, @QueryParam("start") Integer start, @QueryParam("limit") Integer limit, @QueryParam("sort") SortWrapper sortWrapper, @Context UriInfo uriInfo, @Context SecurityContext securityContext, @Context HttpServletRequest request) throws WebApplicationException {

        Filter filter = new Filter();
        filter.setProperty("system.systemId");
        filter.setValue(webBundle.getProperty("system.shortterm.id"));
        filter.setOperator(Filter.Operator.EQUAL);

        if (filterWrapper == null) {
            filterWrapper = new FilterWrapper();
            Set<Filter> filterSet = new HashSet<Filter>();
            filterSet.add(filter);
            filterWrapper.setFilters(filterSet);
        } else if (filterWrapper.getFilters() != null) {
            filterWrapper.getFilters().add(filter);
        }

        return ResponseHelper.ok(subSystemService.getAllCalcSubSystems(filterWrapper, start, limit, sortWrapper));
    }

    @GET
    @Path("/getAllCalcAsnadSubSystem")
    @RolesAllowed({Roles.MALI_SETAD_ASNAD_USER})
    public Response getAllCalcAsnadSubSystem(@QueryParam("filter") FilterWrapper filterWrapper, @QueryParam("start") Integer start, @QueryParam("limit") Integer limit, @QueryParam("sort") SortWrapper sortWrapper, @Context UriInfo uriInfo, @Context SecurityContext securityContext, @Context HttpServletRequest request) throws WebApplicationException {

        Filter filter = new Filter();
        filter.setProperty("system.systemId");
        filter.setValue(webBundle.getProperty("system.asnad.id"));
        filter.setOperator(Filter.Operator.EQUAL);

        Filter idFilter = new Filter();
        idFilter.setProperty("subSystemId");
        idFilter.setValue(webBundle.getProperty("asnad.doctor.id"));
        idFilter.setOperator(Filter.Operator.NOT_EQUAL);

        Filter khesaratFilter = new Filter();
        khesaratFilter.setProperty("subSystemId");
        khesaratFilter.setValue(webBundle.getProperty("asnad.khesarat.id"));
        khesaratFilter.setOperator(Filter.Operator.NOT_EQUAL);

        if (filterWrapper == null) {
            filterWrapper = new FilterWrapper();
            Set<Filter> filterSet = new HashSet<Filter>();
            filterSet.add(filter);
            filterSet.add(idFilter);
            filterSet.add(khesaratFilter);
            filterWrapper.setFilters(filterSet);
        } else if (filterWrapper.getFilters() != null) {
            filterWrapper.getFilters().add(filter);
            filterWrapper.getFilters().add(idFilter);
            filterWrapper.getFilters().add(khesaratFilter);
        }

        return ResponseHelper.ok(subSystemService.getAllCalcSubSystems(filterWrapper, start, limit, sortWrapper));
    }

    @GET
    @Path("/getAllCalcPensionSubSystem")
    @RolesAllowed({Roles.MALI_SETAD_PENSION_USER, Roles.PUBLIC_USER})
    public Response getAllCalcPensionSubSystem(@QueryParam("filter") FilterWrapper filterWrapper, @QueryParam("start") Integer start, @QueryParam("limit") Integer limit, @QueryParam("sort") SortWrapper sortWrapper, @Context UriInfo uriInfo, @Context SecurityContext securityContext, @Context HttpServletRequest request) throws WebApplicationException {

        Filter filter = new Filter();
        filter.setProperty("system.systemId");
        filter.setValue(webBundle.getProperty("system.pension.id"));
        filter.setOperator(Filter.Operator.EQUAL);

        if (filterWrapper == null) {
            filterWrapper = new FilterWrapper();
            Set<Filter> filterSet = new HashSet<Filter>();
            filterSet.add(filter);
            filterWrapper.setFilters(filterSet);
        } else if (filterWrapper.getFilters() != null) {
            filterWrapper.getFilters().add(filter);
        }

        return ResponseHelper.ok(subSystemService.getAllCalcSubSystems(filterWrapper, start, limit, sortWrapper));
    }

    @GET
    @Path("/getAllAsnadSubSystem")
    @RolesAllowed({Roles.MALI_SETAD_ASNAD_USER})
    public Response getAllAsnadSubSystem(@QueryParam("filter") FilterWrapper filterWrapper, @QueryParam("start") Integer start, @QueryParam("limit") Integer limit, @QueryParam("sort") SortWrapper sortWrapper, @Context UriInfo uriInfo, @Context SecurityContext securityContext, @Context HttpServletRequest request) throws WebApplicationException {

        Filter filter = new Filter();
        filter.setProperty("system.systemId");
        filter.setValue(webBundle.getProperty("system.asnad.id"));
        filter.setOperator(Filter.Operator.EQUAL);

        if (filterWrapper == null) {
            filterWrapper = new FilterWrapper();
            Set<Filter> filterSet = new HashSet<Filter>();
            filterSet.add(filter);
            filterWrapper.setFilters(filterSet);
        } else if (filterWrapper.getFilters() != null) {
            filterWrapper.getFilters().add(filter);
        }

        return ResponseHelper.ok(subSystemService.getAllCalcSubSystems(filterWrapper, start, limit, sortWrapper));
    }

    @GET
    @Path("/getAllCalcAsnad")
    @RolesAllowed({Roles.MALI_SETAD_ASNAD_USER})
    public Response getAllCalcAsnad(@QueryParam("filter") FilterWrapper filterWrapper, @QueryParam("start") Integer start, @QueryParam("limit") Integer limit, @QueryParam("sort") SortWrapper sortWrapper, @Context UriInfo uriInfo, @Context SecurityContext securityContext, @Context HttpServletRequest request) throws WebApplicationException {

        Filter filter = new Filter();
        filter.setProperty("system.systemId");
        filter.setValue(webBundle.getProperty("system.asnad.id"));
        filter.setOperator(Filter.Operator.EQUAL);

        Filter khesaratFilter = new Filter();
        khesaratFilter.setProperty("subSystemId");
        khesaratFilter.setValue(webBundle.getProperty("asnad.khesarat.id"));
        khesaratFilter.setOperator(Filter.Operator.NOT_EQUAL);

        if (filterWrapper == null) {
            filterWrapper = new FilterWrapper();
            Set<Filter> filterSet = new HashSet<Filter>();
            filterSet.add(filter);
            filterSet.add(khesaratFilter);
            filterWrapper.setFilters(filterSet);
        } else if (filterWrapper.getFilters() != null) {
            filterWrapper.getFilters().add(filter);
            filterWrapper.getFilters().add(khesaratFilter);
        }

        return ResponseHelper.ok(subSystemService.getAllCalcSubSystems(filterWrapper, start, limit, sortWrapper));
    }

}
