/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package ir.tamin.incomeBank.ws.rest.daramadBank;

import com.healthmarketscience.jackcess.Database;
import ir.tamin.incomeBank.service.daramadBank.ComperrVw16Service;
import ir.tamin.incomeBank.ws.rest.Roles;
import ir.tamin.framework.ws.rest.ResponseHelper;
import ir.tamin.framework.ws.rest.json.FilterWrapper;
import ir.tamin.framework.ws.rest.json.SortWrapper;
import java.io.FileInputStream;
import java.io.IOException;
import java.io.OutputStream;
import java.sql.SQLException;
import java.util.HashMap;
import java.util.Map;
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
import org.apache.poi.ss.usermodel.Workbook;

/**
 *
 * @author h_riazat
 */
@Path("/comperrVw16")
@Produces(MediaType.APPLICATION_JSON)
@Consumes(MediaType.APPLICATION_JSON)
@RequestScoped
public class ComperrVw16RestService {

    @Inject
    ComperrVw16Service comperrVw16Service;

    @GET
    @Path("/getAll")
    @RolesAllowed({Roles.MALI_SETAD_DRMD_USER, Roles.MALI_BRANCH_DRMD_USER})
    public Response getAll(@QueryParam("filter") FilterWrapper filterWrapper, @QueryParam("start") Integer start, @QueryParam("limit") Integer limit, @QueryParam("sort") SortWrapper sort, @Context UriInfo ui, @Context HttpServletRequest request, @Context SecurityContext sc) throws WebApplicationException, IOException, SQLException, SQLException {
        Map<String, Object> map = new HashMap<>();
        map = comperrVw16Service.getAll(filterWrapper, start, limit, sort);
        return ResponseHelper.ok(map);
    }

    @GET
    @Path("/view16Excel")
    @Produces("application/vnd.ms-excel")
    public Response writeToExcel(@QueryParam("filter") FilterWrapper filterWrapper, @Context UriInfo ui, @Context HttpServletRequest request, @Context SecurityContext sc) throws WebApplicationException, IOException {
        final Workbook workbook = comperrVw16Service.writeToExcel(filterWrapper, null, null, null);
        StreamingOutput output = new StreamingOutput() {
            @Override
            public void write(java.io.OutputStream output) throws IOException, WebApplicationException {
                workbook.write(output);
                output.close();
            }
        };
        String fileName = "comperrReport16.xlsx";
        return Response.ok(output).header("Content-Disposition", "attachment; filename=" + fileName).build();
    }

    @GET
    @Path("/view16Xml")
    @Produces("application/xml")
    public Response writeToXml(@QueryParam("filter") FilterWrapper filterWrapper, @Context HttpServletRequest request, @Context SecurityContext sc) throws WebApplicationException, IOException {
        final String xml = comperrVw16Service.writeToXml(filterWrapper, null, null, null);
        StreamingOutput output = new StreamingOutput() {
            @Override
            public void write(OutputStream output) throws IOException, WebApplicationException {
                output.write(xml.getBytes("Unicode"));
                output.close();
            }
        };
        String fileName = "comperrReport16.xml";
        return Response.ok(output).header("Content-Disposition", "attachment; filename=" + fileName).build();
    }

    @GET
    @Path("/view16Access")
    @Produces("application/vnd.ms-access")
    public Response writeToAccess(@QueryParam("filter") FilterWrapper filterWrapper, @Context HttpServletRequest request, @Context SecurityContext sc) throws WebApplicationException, IOException, ClassNotFoundException, SQLException {
        Database db = comperrVw16Service.writeToAccess(filterWrapper, null, null, null);
        final FileInputStream fis = new FileInputStream(db.getFile());
        final byte[] buffer = new byte[1024];
        StreamingOutput output = new StreamingOutput() {
            @Override
            public void write(java.io.OutputStream output) throws IOException, WebApplicationException {
                int byteRead = 0;
                while ((byteRead = fis.read(buffer)) != -1) {
                    output.write(buffer, 0, byteRead);
                }
                output.close();
            }
        };
        String fileName = "comperrReport16.accdb";
        return Response.ok(output).header("Content-Disposition", "attachment; filename=" + fileName).build();
    }

}
