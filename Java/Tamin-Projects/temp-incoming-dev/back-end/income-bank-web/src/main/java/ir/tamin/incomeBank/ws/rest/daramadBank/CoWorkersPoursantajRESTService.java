/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package ir.tamin.incomeBank.ws.rest.daramadBank;

import com.fasterxml.jackson.databind.ObjectMapper;
import ir.tamin.framework.ws.rest.ResponseHelper;
import ir.tamin.framework.ws.rest.json.FilterWrapper;
import ir.tamin.framework.ws.rest.json.SortWrapper;
import ir.tamin.incomeBank.model.daramadBank.PoursantajView;
import ir.tamin.incomeBank.model.daramadBank.BajListHeader;
import ir.tamin.incomeBank.model.daramadBank.CoWorkersPoursantaj;
import ir.tamin.incomeBank.model.daramadBank.Voucher;
import ir.tamin.incomeBank.service.daramadBank.CoWorkersPoursantajService;
import ir.tamin.incomeBank.ws.rest.Roles;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import javax.annotation.security.RolesAllowed;
import javax.enterprise.context.RequestScoped;
import javax.inject.Inject;
import javax.servlet.http.HttpServletRequest;
import javax.ws.rs.Consumes;
import javax.ws.rs.DELETE;
import javax.ws.rs.GET;
import javax.ws.rs.PUT;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
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
 * @author e_shoghi
 */
@Path("co-workers-poursantaj")
@RequestScoped
@Produces(MediaType.APPLICATION_JSON)
public class CoWorkersPoursantajRESTService {

    @Inject
    CoWorkersPoursantajService coWorkersPoursantajService;

    @GET
    @RolesAllowed({Roles.PUBLIC_USER})
    public Response getAll(@QueryParam("filter") FilterWrapper filterWrapper, @QueryParam("start") Integer start, @QueryParam("limit") Integer limit, @QueryParam("sort") SortWrapper sortWrapper, @Context UriInfo uriInfo, @Context SecurityContext securityContext, @Context HttpServletRequest request) throws WebApplicationException {
        return ResponseHelper.ok(coWorkersPoursantajService.getAll(filterWrapper, start, limit, sortWrapper));
    }

    @GET
    @RolesAllowed({Roles.PUBLIC_USER})
    @Path("/from-view")
    public Response getAllFromView(@QueryParam("filter") FilterWrapper filterWrapper, @QueryParam("start") Integer start, @QueryParam("limit") Integer limit, @QueryParam("sort") SortWrapper sortWrapper, @Context UriInfo uriInfo, @Context SecurityContext securityContext, @Context HttpServletRequest request) throws WebApplicationException {
        return ResponseHelper.ok(coWorkersPoursantajService.getAllFromView(filterWrapper, start, limit, sortWrapper));
    }

    @PUT
    @RolesAllowed({Roles.PUBLIC_USER})
    @Path("/export-vouchers")
    @Consumes(MediaType.APPLICATION_JSON)
    public Response exportVouchers(List<Object> bajListHeaders, @Context UriInfo uriInfo, @Context SecurityContext securityContext, @Context HttpServletRequest request) throws Exception {
        ObjectMapper mapper = new ObjectMapper();
        List<PoursantajView> headerLst = new ArrayList<>();
        for (Object bajListHeader : bajListHeaders) {
            PoursantajView header = mapper.convertValue(bajListHeader, PoursantajView.class);
            headerLst.add(header);
        }
//        List<BajListHeader> headerLst
//                = mapper.readValue(bajListHeaders.toString(), new TypeReference<List<BajListHeader>>() {
//                });
//        List<BajListHeader> headerLst = mapper.convertValue(bajListHeaders, new TypeReference<List<BajListHeader>>(){});
//        List<BajListHeader> headerLst = (ArrayList<BajListHeader>) bajListHeaders;
        Map result = coWorkersPoursantajService.exportVouchers(headerLst, securityContext);
//        Response response = Response.status((Response.Status) result.get("status"))
//                .entity((List<Voucher>) result.get("list"))
//                .build();
//        return ResponseHelper.ok(response);
           return ResponseHelper.ok(result);
    }

    @GET
    @RolesAllowed(Roles.PUBLIC_USER)
    @Path("/get-current-vouchers/{uuid}")
    public Response getCurrentVouchers(@PathParam("uuid") String uuid, @Context UriInfo uriInfo, @Context SecurityContext securityContext, @Context HttpServletRequest request) throws Exception {
        Map pageData = coWorkersPoursantajService.getCurrentVouchers(uuid, securityContext);
        return ResponseHelper.ok(pageData);
    }

    @DELETE
    @RolesAllowed({Roles.PUBLIC_USER})
    @Path("/revert-vouchers")
    @Consumes(MediaType.APPLICATION_JSON)
    public Response revertVouchers(List<Object> bajListHeaders, @Context UriInfo uriInfo, @Context SecurityContext securityContext, @Context HttpServletRequest request) throws Exception {
        ObjectMapper mapper = new ObjectMapper();
        List<PoursantajView> headerLst = new ArrayList<>();
        for (Object o : bajListHeaders) {
            PoursantajView header = mapper.convertValue(o, PoursantajView.class);
            headerLst.add(header);
        }
        Map result = coWorkersPoursantajService.revertVouchers(headerLst, securityContext);
        Response response = Response.status((Response.Status) result.get("status"))
                .entity((String) result.get("message"))
                .build();
        return ResponseHelper.ok(response);
    }
}
