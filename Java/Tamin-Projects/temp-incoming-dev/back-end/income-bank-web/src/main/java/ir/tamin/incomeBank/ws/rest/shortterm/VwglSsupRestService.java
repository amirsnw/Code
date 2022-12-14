/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package ir.tamin.incomeBank.ws.rest.shortterm;

import com.healthmarketscience.jackcess.Database;
import ir.tamin.incomeBank.model.centralPayment.enums.ReturnReasonEnum;
import ir.tamin.incomeBank.model.identityManager.User;
import ir.tamin.incomeBank.service.RestServices;
import ir.tamin.incomeBank.service.identityManager.UserBean;
import ir.tamin.incomeBank.service.shortterm.VwglSsupService;
import ir.tamin.incomeBank.model.shortterm.VwglSsup;
import ir.tamin.incomeBank.ws.rest.ResourceRESTService;
import ir.tamin.incomeBank.ws.rest.Roles;
import ir.tamin.framework.cdi.util.MessageBundle;
import ir.tamin.framework.core.util.Bundle;
import ir.tamin.framework.ws.rest.ResponseHelper;
import ir.tamin.framework.ws.rest.json.FilterWrapper;
import ir.tamin.framework.ws.rest.json.SortWrapper;
import java.io.FileInputStream;
import java.io.IOException;
import java.io.OutputStream;
import java.sql.SQLException;
import javax.annotation.security.RolesAllowed;
import javax.enterprise.context.RequestScoped;
import javax.inject.Inject;
import javax.servlet.http.HttpServletRequest;
import javax.ws.rs.*;
import javax.ws.rs.core.Context;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;
import javax.ws.rs.core.SecurityContext;
import javax.ws.rs.core.StreamingOutput;
import javax.ws.rs.core.UriInfo;
import org.apache.poi.ss.usermodel.Workbook;

/**
 *
 * @author f_fotuhi
 */
@Path("/sendToMali")
@Produces(MediaType.APPLICATION_JSON)
@Consumes(MediaType.APPLICATION_JSON)
@RequestScoped
public class VwglSsupRestService implements ResourceRESTService<VwglSsup> {

    @Inject
    private VwglSsupService vwglSsupService;

    @Inject
    @MessageBundle
    Bundle messageBundle;

    @Inject
    RestServices restServices;

    @Inject
    UserBean userBean;

    @Override
    public Response get(String id, UriInfo uriInfo, SecurityContext securityContext, HttpServletRequest request) throws WebApplicationException {
        throw new UnsupportedOperationException("Not supported yet."); //To change body of generated methods, choose Tools | Templates.
    }

    @Override
    @RolesAllowed({Roles.MALI_SETAD_SHORTTERM_USER})
    public Response getAll(FilterWrapper filterWrapper, Integer start, Integer limit, SortWrapper sortWrapper, UriInfo uriInfo, SecurityContext securityContext, HttpServletRequest request) throws WebApplicationException {
        return ResponseHelper.ok(vwglSsupService.getAll(filterWrapper, start, limit, sortWrapper));
    }

    @GET
    @Path("/sendToMaliExcel")
    @Produces("application/vnd.ms-excel")
    public Response doExcel(@QueryParam("filter") FilterWrapper filterWrapper, @Context HttpServletRequest request, @Context SecurityContext sc) throws WebApplicationException, IOException {

        final Workbook workbook = vwglSsupService.writeToExcel(filterWrapper, null, null, null);

        StreamingOutput output = new StreamingOutput() {

            @Override
            public void write(java.io.OutputStream output) throws IOException, WebApplicationException {
                workbook.write(output);
                output.close();
            }

        };
        //return Response.ok(output).build();
        String fileName = "sendToMaliExcel.xlsx";
        return Response.ok(output).header("Content-Disposition", "attachment; filename=" + fileName).build();

    }

    @GET
    @Path("/sendToMaliXml")
    @Produces("application/xml")
    public Response doXml(@QueryParam("filter") FilterWrapper filterWrapper, @Context HttpServletRequest request, @Context SecurityContext sc) throws WebApplicationException, IOException {

        final String xml = vwglSsupService.writeToXml(filterWrapper, null, null, null);
        StreamingOutput output = new StreamingOutput() {
            @Override
            public void write(OutputStream output) throws IOException, WebApplicationException {
                output.write(xml.getBytes("Unicode"));
                output.close();
            }
        };
        String fileName = "payHeadDetailExportToXml.xml";
        return Response.ok(output).header("Content-Disposition", "attachment; filename=" + fileName).build();

    }

    @GET
    @Path("/sendToMaliAccess")
    @Produces("application/vnd.ms-access")
    public Response exportToAccess(@QueryParam("filter") FilterWrapper filterWrapper, @Context HttpServletRequest request, @Context SecurityContext sc) throws WebApplicationException, IOException, ClassNotFoundException, SQLException {

        Database db = vwglSsupService.writeToAccess(filterWrapper, null, null, null);
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
        String fileName = "sendToMaliReport.accdb";
        return Response.ok(output).header("Content-Disposition", "attachment; filename=" + fileName).build();
    }

    @Override
    public Response save(VwglSsup t, UriInfo uriInfo, SecurityContext securityContext, HttpServletRequest request) throws WebApplicationException {
        throw new UnsupportedOperationException("Not supported yet."); //To change body of generated methods, choose Tools | Templates.
    }

    @Override
    public Response edit(String id, VwglSsup t, UriInfo uriInfo, SecurityContext securityContext, HttpServletRequest request) throws WebApplicationException {
        throw new UnsupportedOperationException("Not supported yet."); //To change body of generated methods, choose Tools | Templates.
    }

    @Override
    public Response remove(String id, UriInfo uriInfo, SecurityContext securityContext, HttpServletRequest request) throws WebApplicationException {
        throw new UnsupportedOperationException("Not supported yet."); //To change body of generated methods, choose Tools | Templates.
    }
    @POST
    @Path("/callShorttermFunction/{payDocNo}/{reqSerial}")
    @Produces({MediaType.APPLICATION_JSON})
    @Consumes(MediaType.APPLICATION_JSON)
    @RolesAllowed({Roles.MALI_SETAD_SHORTTERM_USER})
    public Response DeleteWith(@PathParam("payDocNo") String payDocNo,@PathParam("reqSerial")String reqSerial, @Context HttpServletRequest request, @Context SecurityContext securityContext) throws WebApplicationException, IOException, ClassNotFoundException, SQLException {

        User user = userBean.getUserByUserName(securityContext.getUserPrincipal().getName());
        restServices.returnToShortterm(payDocNo, reqSerial, ReturnReasonEnum.ELAM_SHOBE.getCode(), ReturnReasonEnum.ELAM_SHOBE.getName(), user.getUserName());
        return ResponseHelper.ok();
    }
}
