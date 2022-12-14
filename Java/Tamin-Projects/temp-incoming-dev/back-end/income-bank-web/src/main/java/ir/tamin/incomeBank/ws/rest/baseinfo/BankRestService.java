/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package ir.tamin.incomeBank.ws.rest.baseinfo;

import ir.tamin.incomeBank.model.baseinfo.OperationalBankEnum;
import ir.tamin.incomeBank.service.baseinfo.BankService;
import ir.tamin.incomeBank.ws.rest.Roles;
import ir.tamin.framework.ws.rest.ResponseHelper;
import ir.tamin.framework.ws.rest.json.Filter;
import ir.tamin.framework.ws.rest.json.FilterWrapper;
import ir.tamin.framework.ws.rest.json.SortWrapper;
import java.util.HashMap;
import java.util.Map;
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
@Path("/bank")
@RequestScoped
@Produces(MediaType.APPLICATION_JSON)
public class BankRestService {

    @Inject
    BankService bankService;

    @GET
    @RolesAllowed({Roles.PUBLIC_USER})
    public Response getAll(@QueryParam("filter") FilterWrapper filterWrapper, @QueryParam("start") Integer start, @QueryParam("limit") Integer limit, @QueryParam("sort") SortWrapper sortWrapper, @Context UriInfo uriInfo, @Context SecurityContext securityContext, @Context HttpServletRequest request) throws WebApplicationException {
        return ResponseHelper.ok(bankService.getAll(filterWrapper, start, limit, sortWrapper));
    }

    @GET
    @Path("/getAllCalcOPBankWithOther")
    @RolesAllowed({Roles.PUBLIC_USER})
    /**
     * *
     * for shortterm
     */
    public Response getAllCalcOPBankWithOther(@Context UriInfo uriInfo, @Context SecurityContext securityContext, @Context HttpServletRequest request) throws WebApplicationException {
        return ResponseHelper.ok(bankService.getAllCalcOPBankWithOther());
    }

//    @GET
//    @Path("/getAllPensionCalcOPBank")
//    @RolesAllowed({Roles.PUBLIC_USER})
    /**
     * *
     * for pension
     */
//    public Response getAllPensionCalcOPBank(@Context UriInfo uriInfo, @Context SecurityContext securityContext, @Context HttpServletRequest request) throws WebApplicationException {
//        return ResponseHelper.ok(bankService.getAllPensionCalcOPBank());
//    }

//    @GET
//    @Path("/getAllCalcOPBank")
//    @RolesAllowed({Roles.PUBLIC_USER})
//    public Response getAllCalcOPBank(@Context UriInfo uriInfo, @Context SecurityContext securityContext, @Context HttpServletRequest request) throws WebApplicationException {
//        return ResponseHelper.ok(bankService.getAllCalcOPBank());
//    }
    @GET
    @Path("/getAllOPBanks")
    @RolesAllowed({Roles.PUBLIC_USER})
    public Response getAllOPerationalBanks(@QueryParam("filter") FilterWrapper filterWrapper, @QueryParam("start") Integer start, @QueryParam("limit") Integer limit, @QueryParam("sort") SortWrapper sortWrapper, @Context UriInfo uriInfo, @Context SecurityContext securityContext, @Context HttpServletRequest request) throws WebApplicationException {
        Map<String, Object> map = new HashMap<>();
        String value = "";
        if (filterWrapper != null && filterWrapper.getFilters() != null && filterWrapper.getFilters().size() == 1) {
            for (Filter filter : filterWrapper.getFilters()) {
                if ("codeName".equals(filter.getProperty())) {
                    value = filter.getValue().replaceAll("%", "");
                }
            }
        }
        map.put("list", OperationalBankEnum.getEnum(value));
        map.put("total", OperationalBankEnum.values().length);
        return ResponseHelper.ok(map);
    }

    @GET
    @Path("/getAllPensionOPBanks")
    @RolesAllowed({Roles.PUBLIC_USER})
    public Response getAllPensionOPBanks(@QueryParam("filter") FilterWrapper filterWrapper, @QueryParam("start") Integer start, @QueryParam("limit") Integer limit, @QueryParam("sort") SortWrapper sortWrapper, @Context UriInfo uriInfo, @Context SecurityContext securityContext, @Context HttpServletRequest request) throws WebApplicationException {
        Map<String, Object> map = bankService.getAllPensionOPBank();
        return ResponseHelper.ok(map);
    }

    @GET
    @Path("/getAllTcrCalcOPBank")
    @RolesAllowed({Roles.PUBLIC_USER})
    /**
     * *
     * for tcr
     */
    public Response getAllTcrCalcOPBank(@Context UriInfo uriInfo, @Context SecurityContext securityContext, @Context HttpServletRequest request) throws WebApplicationException {
        return ResponseHelper.ok(bankService.getAllTcrCalcOPBank());
    }

}
