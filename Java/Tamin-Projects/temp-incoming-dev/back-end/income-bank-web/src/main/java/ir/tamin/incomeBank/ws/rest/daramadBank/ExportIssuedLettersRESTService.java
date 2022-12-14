/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package ir.tamin.incomeBank.ws.rest.daramadBank;

import com.fasterxml.jackson.databind.ObjectMapper;
import ir.tamin.framework.ws.rest.ResponseHelper;
import ir.tamin.framework.ws.rest.json.SortWrapper;
import ir.tamin.incomeBank.model.daramadBank.IssuedLettersOfficeView;
import ir.tamin.incomeBank.service.daramadBank.ExportIssuedLettersService;
import ir.tamin.incomeBank.ws.rest.Roles;
import ir.tamin.incomeBank.ws.rest.json.FilterWrapper;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;
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
 * @author e_shoghi
 */
@Path("export-issued-letters")
@RequestScoped
@Produces(MediaType.APPLICATION_JSON)
public class ExportIssuedLettersRESTService {

    @Inject
    ExportIssuedLettersService exportIssuedLettersService;

    @GET
    @RolesAllowed({Roles.PUBLIC_USER})
    @Path("/get-all")
    public Response getAll(@QueryParam("filter") FilterWrapper filterWrapper, @QueryParam("start") Integer start, @QueryParam("limit") Integer limit, @QueryParam("sort") SortWrapper sortWrapper, @Context UriInfo uriInfo, @Context SecurityContext securityContext, @Context HttpServletRequest request) throws WebApplicationException {
        return ResponseHelper.ok(exportIssuedLettersService.getAll(filterWrapper, start, limit, sortWrapper));
    }
    
     @GET
    @RolesAllowed({Roles.PUBLIC_USER})
    @Path("/get-all-from-view")
    public Response getAllFromView(@QueryParam("filter") FilterWrapper filterWrapper, @QueryParam("start") Integer start, @QueryParam("limit") Integer limit, @QueryParam("sort") SortWrapper sortWrapper, @Context UriInfo uriInfo, @Context SecurityContext securityContext, @Context HttpServletRequest request) throws WebApplicationException {
        return ResponseHelper.ok(exportIssuedLettersService.getAllFromView(filterWrapper, start, limit, sortWrapper));
    }

    @PUT
    @RolesAllowed({Roles.PUBLIC_USER})
    @Path("/export-letters")
    @Consumes(MediaType.APPLICATION_JSON)
    public Response exportLetters(List<Object> letters, @Context UriInfo uriInfo, @Context SecurityContext securityContext, @Context HttpServletRequest request) throws Exception {
        ObjectMapper mapper = new ObjectMapper();
        List<IssuedLettersOfficeView> letterLst = new ArrayList<>();
        for (Object drmdLetter : letters) {
            IssuedLettersOfficeView letter = mapper.convertValue(drmdLetter, IssuedLettersOfficeView.class);
            letterLst.add(letter);
        }
        Map result = exportIssuedLettersService.exportLetters(letterLst, securityContext);
//        Response response = Response.status((Response.Status) result.get("status"))
//                .entity((List<IssuedLettersOfficeView>) result.get("list"))
//                .build();
        return ResponseHelper.ok(result);
    }

    @PUT
    @RolesAllowed({Roles.PUBLIC_USER})
    @Path("/revert-vouchers")
    @Consumes(MediaType.APPLICATION_JSON)
    public Response revertVouchers(List<Object> letters, @Context UriInfo uriInfo, @Context SecurityContext securityContext, @Context HttpServletRequest request) throws Exception {
        ObjectMapper mapper = new ObjectMapper();
        List<IssuedLettersOfficeView> letterLst = new ArrayList<>();
        for (Object o : letters) {
            IssuedLettersOfficeView letter = mapper.convertValue(o, IssuedLettersOfficeView.class);
            letterLst.add(letter);
        }
        Map result = exportIssuedLettersService.revertVouchers(letterLst, securityContext);
        Response response = Response.status((Response.Status) result.get("status"))
                .entity((String) result.get("message"))
                .build();
        return ResponseHelper.ok(response);
    }
}
