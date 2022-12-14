/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package ir.tamin.incomeBank.ws.rest.daramadBank;

import com.healthmarketscience.jackcess.Database;
import ir.tamin.incomeBank.service.daramadBank.ComperrVw12Service;
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
import org.apache.poi.ss.usermodel.Workbook;

/**
 *
 * @author m_salami
 */
@Path("/comperrVw12")
@Produces(MediaType.APPLICATION_JSON)
@Consumes(MediaType.APPLICATION_JSON)
@RequestScoped
public class ComperrVw12RestService {
    
    @Inject
    ComperrVw12Service service;

    @GET
    @Path("/getAll")
    @RolesAllowed({Roles.MALI_SETAD_DRMD_USER, Roles.MALI_BRANCH_DRMD_USER})
    public Response getAll(@QueryParam("filter") FilterWrapper filterWrapper, @QueryParam("start") Integer start, @QueryParam("limit") Integer limit, @QueryParam("sort") SortWrapper sort, @Context UriInfo ui, @Context HttpServletRequest request, @Context SecurityContext sc) throws WebApplicationException, IOException, SQLException, SQLException {
        Map<String, Object> map = new HashMap<>();
        try {
            map = service.getAll(filterWrapper, start, limit, sort);
        } catch (IOException ex) {
            Logger.getLogger(ComperrRestService.class.getName()).log(Level.SEVERE, null, ex);
        } catch (SQLException ex) {
            Logger.getLogger(ComperrRestService.class.getName()).log(Level.SEVERE, null, ex);
        }
        return ResponseHelper.ok(map);
    }

    @GET
    @Path("/view12Excel")
    @Produces("application/vnd.ms-excel")
    public Response doExcel(@QueryParam("filter") FilterWrapper filterWrapper, @Context UriInfo ui, @Context HttpServletRequest request, @Context SecurityContext sc) throws WebApplicationException, IOException {

        final Workbook workbook = service.writeToExcel(filterWrapper, null, null, null);

        StreamingOutput output = new StreamingOutput() {

            @Override
            public void write(java.io.OutputStream output) throws IOException, WebApplicationException {
                workbook.write(output);
                output.close();
            }

        };
        String fileName = "comperrReport12.xlsx";
        return Response.ok(output).header("Content-Disposition", "attachment; filename=" + fileName).build();

    }

    @GET
    @Path("/view12Xml")
    @Produces("application/xml")
    public Response doXml(@QueryParam("filter") FilterWrapper filterWrapper, @Context HttpServletRequest request, @Context SecurityContext sc) throws WebApplicationException, IOException {

        final String xml = service.writeToXml(filterWrapper, null, null, null);
        StreamingOutput output = new StreamingOutput() {
            @Override
            public void write(OutputStream output) throws IOException, WebApplicationException {
                output.write(xml.getBytes("Unicode"));
                output.close();
            }
        };
        String fileName = "comperrReport12.xml";
        return Response.ok(output).header("Content-Disposition", "attachment; filename=" + fileName).build();

    }

    @GET
    @Path("/view12Access")
    @Produces("application/vnd.ms-access")
    public Response exportToAccess(@QueryParam("filter") FilterWrapper filterWrapper, @Context HttpServletRequest request, @Context SecurityContext sc) throws WebApplicationException, IOException, ClassNotFoundException, SQLException {

        Database db = service.writeToAccess(filterWrapper, null, null, null);
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
        String fileName = "comperrReport12.accdb";
        return Response.ok(output).header("Content-Disposition", "attachment; filename=" + fileName).build();
    }
}
