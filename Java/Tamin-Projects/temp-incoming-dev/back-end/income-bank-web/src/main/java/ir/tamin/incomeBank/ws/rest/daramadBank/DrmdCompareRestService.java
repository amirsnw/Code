/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package ir.tamin.incomeBank.ws.rest.daramadBank;

import ir.tamin.incomeBank.model.baseinfo.BankErrorCode;
import ir.tamin.incomeBank.model.daramadBank.DrmdCompare;
import ir.tamin.incomeBank.model.daramadBank.DrmdComparePK;
import ir.tamin.incomeBank.service.daramadBank.DrmdCompareService;
import ir.tamin.incomeBank.ws.rest.ResourceRESTService;
import ir.tamin.incomeBank.ws.rest.Roles;
import ir.tamin.framework.ws.rest.ResponseHelper;
import ir.tamin.framework.ws.rest.json.Filter;
import ir.tamin.framework.ws.rest.json.FilterWrapper;
import ir.tamin.framework.ws.rest.json.SortWrapper;
import java.math.BigDecimal;
import javax.annotation.security.RolesAllowed;
import javax.enterprise.context.RequestScoped;
import javax.inject.Inject;
import javax.servlet.http.HttpServletRequest;
import javax.ws.rs.Consumes;
import javax.ws.rs.GET;
import javax.ws.rs.PUT;
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
 * @author m_salami
 */
@Path("/drmdCompare")
@Produces(MediaType.APPLICATION_JSON)
@Consumes(MediaType.APPLICATION_JSON)
@RequestScoped
public class DrmdCompareRestService {

    @Inject
    DrmdCompareService drmdCompareService;

    @GET
    @RolesAllowed({Roles.PUBLIC_USER, Roles.MALI_BRANCH_DRMD_USER, Roles.MALI_SETAD_DRMD_USER, Roles.MALI_KARGZARI_DRMD_USER})
    public Response getAll(@QueryParam(value = "query") FilterWrapper query, @QueryParam(value = "filter") FilterWrapper fw, @QueryParam(value = "start") Integer start, @QueryParam(value = "limit") Integer limit, @QueryParam(value = "sort") SortWrapper sw, @Context UriInfo ui, @Context SecurityContext sc) throws WebApplicationException {

        if (query != null) { // search in Combo
            if (fw == null) {
                fw = query;
            } else if (fw.getFilters() != null) {
                for (Filter queryFilter : query.getFilters()) {
                    fw.getFilters().add(queryFilter);
                }
            } else {
                fw.setFilters(query.getFilters());
            }
        }
        return ResponseHelper.ok(drmdCompareService.getAll(fw, start, limit, sw));
    }

    @GET
    @Path("/IsIssued")
    @RolesAllowed({Roles.PUBLIC_USER, Roles.MALI_BRANCH_DRMD_USER, Roles.MALI_SETAD_DRMD_USER, Roles.MALI_KARGZARI_DRMD_USER})
    public Response IsIssued(@QueryParam(value = "brchCode") String brchCode, @QueryParam(value = "compMdate") String compMdate, @Context UriInfo ui, @Context SecurityContext sc) throws WebApplicationException {
        return ResponseHelper.ok(drmdCompareService.isIssued(brchCode, compMdate));
    }

    @PUT
    @Path("/returnVouch")
    @Consumes({MediaType.APPLICATION_JSON})
    @RolesAllowed({Roles.MALI_SETAD_DRMD_USER, Roles.MALI_BRANCH_DRMD_USER})
    public Response edit(DrmdComparePK t, @Context UriInfo ui, @Context SecurityContext sc) throws WebApplicationException {
        return ResponseHelper.ok(drmdCompareService.update(t));

    }
}
