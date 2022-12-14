/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package ir.tamin.incomeBank.ws.rest.daramadBank;

import ir.tamin.incomeBank.model.daramadBank.DrmdTelInfo;
import ir.tamin.incomeBank.service.daramadBank.DrmdTelInfoService;
import ir.tamin.incomeBank.ws.rest.ResourceRESTService;
import ir.tamin.incomeBank.ws.rest.Roles;
import ir.tamin.framework.ws.rest.ResponseHelper;
import ir.tamin.framework.ws.rest.json.FilterWrapper;
import ir.tamin.framework.ws.rest.json.SortWrapper;
import java.io.IOException;
import java.io.OutputStream;
import java.sql.SQLException;
import java.util.logging.Level;
import java.util.logging.Logger;
import javax.annotation.security.RolesAllowed;
import javax.enterprise.context.RequestScoped;
import javax.inject.Inject;
import javax.servlet.http.HttpServletRequest;
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
import javax.ws.rs.core.StreamingOutput;
import javax.ws.rs.core.UriInfo;

/**
 *
 * @author f_fotuhi
 */
@Path("/drmdTelInfo")
@Produces(MediaType.APPLICATION_JSON)
@Consumes(MediaType.APPLICATION_JSON)
@RequestScoped
public class DrmdTelInfoRestService implements ResourceRESTService<DrmdTelInfo> {

    @Inject
    DrmdTelInfoService drmdTelInfoService;

    @Override
    public Response get(String id, UriInfo uriInfo, SecurityContext securityContext, HttpServletRequest request) throws WebApplicationException {
        throw new UnsupportedOperationException("Not supported yet."); //To change body of generated methods, choose Tools | Templates.
    }

    @Override
    @RolesAllowed({Roles.MALI_SETAD_DRMD_USER, Roles.MALI_BRANCH_DRMD_USER})
    public Response getAll(FilterWrapper filterWrapper, Integer start, Integer limit, SortWrapper sortWrapper, UriInfo uriInfo, SecurityContext securityContext, HttpServletRequest request) throws WebApplicationException {
        return ResponseHelper.ok(drmdTelInfoService.getAll(filterWrapper, start, limit, sortWrapper));
    }

    @Override
    public Response save(DrmdTelInfo t, UriInfo uriInfo, SecurityContext securityContext, HttpServletRequest request) throws WebApplicationException {
        throw new UnsupportedOperationException("Not supported yet."); //To change body of generated methods, choose Tools | Templates.
    }

    @Override
    public Response edit(String id, DrmdTelInfo t, UriInfo uriInfo, SecurityContext securityContext, HttpServletRequest request) throws WebApplicationException {
        throw new UnsupportedOperationException("Not supported yet."); //To change body of generated methods, choose Tools | Templates.
    }

    @Override
    public Response remove(String id, UriInfo uriInfo, SecurityContext securityContext, HttpServletRequest request) throws WebApplicationException {
        throw new UnsupportedOperationException("Not supported yet."); //To change body of generated methods, choose Tools | Templates.
    }

    @GET
    @Path("/prcexttelinfo")
    @RolesAllowed({Roles.MALI_SETAD_DRMD_USER, Roles.MALI_BRANCH_DRMD_USER})
    public Response prcexttelinfo(@QueryParam(value = "filter") FilterWrapper fw, @Context UriInfo ui, @Context SecurityContext sc) throws WebApplicationException, Exception {
       Boolean result = null;
        try{
        result = drmdTelInfoService.prcexttelinfo(fw);  
       } catch (IOException ex) {
            Logger.getLogger(DrmdTelInfoRestService.class.getName()).log(Level.SEVERE, null, ex);
        }
        return ResponseHelper.ok(result);  
    }

    @GET
    @Path("/diffDetail")
    @RolesAllowed({Roles.MALI_SETAD_DRMD_USER, Roles.MALI_BRANCH_DRMD_USER})
    public Response getTelDiff(@QueryParam(value = "filter") FilterWrapper filter, @QueryParam(value = "start") Integer start, @QueryParam(value = "limit") Integer limit, @QueryParam(value = "sort") SortWrapper sort, @Context UriInfo ui, @Context SecurityContext sc) throws WebApplicationException, SQLException {
        return ResponseHelper.ok(drmdTelInfoService.getTelDiff(filter, start, limit, sort));
    }

    @GET
    @Produces("application/pdf")
    @Path("/riaziList")
    //@RolesAllowed({Roles.MALI_SETAD_DRMD_USER, Roles.MALI_BRANCH_DRMD_USER})
    public Response doGet(@QueryParam(value = "filter") FilterWrapper filterWrapper, @Context HttpServletRequest request, @Context SecurityContext sc) throws WebApplicationException, SQLException {

        byte[] byteStream = null;
        try {
            byteStream = drmdTelInfoService.doGet(filterWrapper);
        } catch (IOException ex) {
            Logger.getLogger(DrmdTelInfoRestService.class.getName()).log(Level.SEVERE, null, ex);
        }
        return Response
                .ok(byteStream)
                .header("Content-Type", "application/pdf")
                .build();
    }

    @GET
    @Path("/gatherExeIns")
    @RolesAllowed({Roles.MALI_SETAD_DRMD_USER, Roles.MALI_BRANCH_DRMD_USER})
    public Response gatherExeIns(@QueryParam(value = "filter") FilterWrapper filter, @Context UriInfo ui, @Context SecurityContext sc) throws WebApplicationException, SQLException {
        String result = drmdTelInfoService.gatherExeIns(filter);
        return ResponseHelper.ok(result);
    }

    @GET
    @Path("/telInfoXml")
    @Produces("application/xml")
    public Response doXml(@QueryParam("filter") FilterWrapper filterWrapper, @QueryParam("value") FilterWrapper value, @Context HttpServletRequest request, @Context SecurityContext sc) throws WebApplicationException, IOException {

        final String xml = drmdTelInfoService.writeToXml(filterWrapper, value, null, null, null);
        StreamingOutput output = new StreamingOutput() {
            @Override
            public void write(OutputStream output) throws IOException, WebApplicationException {
                output.write(xml.getBytes("Unicode"));
                output.close();
            }
        };
        String fileName = "telInfo.xml";
        return Response.ok(output).header("Content-Disposition", "attachment; filename=" + fileName).build();

    }

}
