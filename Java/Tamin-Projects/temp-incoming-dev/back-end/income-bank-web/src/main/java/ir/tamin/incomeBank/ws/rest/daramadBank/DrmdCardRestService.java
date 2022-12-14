/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package ir.tamin.incomeBank.ws.rest.daramadBank;

import com.healthmarketscience.jackcess.Database;
import ir.tamin.incomeBank.model.daramadBank.DrmdCard;
import ir.tamin.incomeBank.model.daramadBank.DrmdCardPK;
import ir.tamin.incomeBank.model.identityManager.User;
import ir.tamin.incomeBank.service.daramadBank.DrmdBankService;
import ir.tamin.incomeBank.service.daramadBank.DrmdCardService;
import ir.tamin.incomeBank.service.daramadBank.DrmdSoratService;
import ir.tamin.incomeBank.service.identityManager.UserBean;
import ir.tamin.incomeBank.util.ServiceUtils;
import ir.tamin.incomeBank.ws.rest.ResourceRESTService;
import ir.tamin.incomeBank.ws.rest.Roles;
import ir.tamin.framework.cdi.util.MessageBundle;
import ir.tamin.framework.cdi.util.WebProperties;
import ir.tamin.framework.core.util.Bundle;
import ir.tamin.framework.ws.rest.ResponseHelper;
import ir.tamin.framework.ws.rest.json.FilterWrapper;
import ir.tamin.framework.ws.rest.json.SortWrapper;
import java.io.FileInputStream;
import java.io.IOException;
import java.util.Map;
import javax.annotation.security.RolesAllowed;
import javax.enterprise.context.RequestScoped;
import java.io.OutputStream;
import java.sql.SQLException;
import javax.inject.Inject;
import javax.servlet.http.HttpServletRequest;
import javax.ws.rs.Consumes;
import javax.ws.rs.DELETE;
import javax.ws.rs.GET;
import javax.ws.rs.POST;
import javax.ws.rs.PUT;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.Produces;
import javax.ws.rs.QueryParam;
import javax.ws.rs.WebApplicationException;
import javax.ws.rs.core.Context;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;
import javax.ws.rs.core.StreamingOutput;
import javax.ws.rs.core.SecurityContext;
import javax.ws.rs.core.UriInfo;
import org.apache.poi.ss.usermodel.Workbook;

/**
 *
 * @author m_salami
 */
@Path("/drmdCard")
@Produces(MediaType.APPLICATION_JSON)
@Consumes(MediaType.APPLICATION_JSON)
@RequestScoped
public class DrmdCardRestService implements ResourceRESTService<DrmdCard> {

    @Inject
    UserBean userBean;

    @Inject
    @MessageBundle
    Bundle messageBundle;

    @Inject
    DrmdCardService service;

    @Inject
    ServiceUtils serviceUtils;

    @Inject
    DrmdSoratService drmdSoratService;

    @Inject
    @WebProperties
    Bundle webBundle;

    @Inject
    DrmdBankService drmdBankService;

    @Override
    @RolesAllowed({Roles.MALI_BRANCH_DRMD_USER, Roles.MALI_SETAD_DRMD_USER})
    public Response get(String id, UriInfo uriInfo, SecurityContext securityContext, HttpServletRequest request) throws WebApplicationException {
        throw new UnsupportedOperationException("Not supported yet."); //To change body of generated methods, choose Tools | Templates.
    }

    @Override
    @RolesAllowed({Roles.MALI_BRANCH_DRMD_USER, Roles.MALI_SETAD_DRMD_USER})
    public Response getAll(FilterWrapper filterWrapper, Integer start, Integer limit, SortWrapper sortWrapper, UriInfo uriInfo, SecurityContext securityContext, HttpServletRequest request) throws WebApplicationException {
        return ResponseHelper.ok(service.getAll(filterWrapper, start, limit, sortWrapper));
    }

    @Override
    @RolesAllowed({Roles.MALI_BRANCH_DRMD_USER, Roles.MALI_SETAD_DRMD_USER})
    public Response save(DrmdCard drmdCard, UriInfo uriInfo, SecurityContext securityContext, HttpServletRequest request) throws WebApplicationException {
        User user = userBean.getUserByUserName(securityContext.getUserPrincipal().getName());
        Response response;
        service.save(drmdCard, user);
        response = Response.status(Response.Status.OK).entity(messageBundle.getProperty("coreaccount.daramadbank.SAVE_SUCCESSFULLY")).build();
        return ResponseHelper.ok(response);
    }

    @Override
    @RolesAllowed({Roles.MALI_BRANCH_DRMD_USER, Roles.MALI_SETAD_DRMD_USER})
    public Response edit(String id, DrmdCard drmdCard, UriInfo uriInfo, SecurityContext securityContext, HttpServletRequest request) throws WebApplicationException {
            User user = userBean.getUserByUserName(securityContext.getUserPrincipal().getName());
        Response response;
        service.update(drmdCard, user);
        response = Response.status(Response.Status.OK).entity(messageBundle.getProperty("coreaccount.daramadbank.UPDATE_SUCCESSFULLY")).build();
        return ResponseHelper.ok(response);
    }

    @Override
    public Response remove(String id, UriInfo uriInfo, SecurityContext securityContext, HttpServletRequest request) throws WebApplicationException {
        throw new UnsupportedOperationException("Not supported yet."); //To change body of generated methods, choose Tools | Templates.
    }

    @DELETE
    @Path("/delete")
    @RolesAllowed({Roles.MALI_BRANCH_DRMD_USER, Roles.MALI_SETAD_DRMD_USER})
    public Response remove(DrmdCardPK drmdCardPk, @Context UriInfo uriInfo, @Context SecurityContext securityContext, @Context HttpServletRequest request) throws WebApplicationException {
        Response response;
        User user = userBean.getUserByUserName(securityContext.getUserPrincipal().getName());
        service.delete(drmdCardPk, user);
        response = Response.status(Response.Status.OK).entity(messageBundle.getProperty("coreaccount.daramadbank.DELETE_SUCCESSFULLY")).build();
        return ResponseHelper.ok(response);
    }

    @PUT
    @Path("/passReturn")
    @RolesAllowed({Roles.MALI_BRANCH_DRMD_USER, Roles.MALI_SETAD_DRMD_USER})
    public Response passReturn(DrmdCardPK drmdCardPK, @Context UriInfo uriInfo, @Context SecurityContext securityContext, @Context HttpServletRequest request) throws WebApplicationException {
        Response response;
        User user = userBean.getUserByUserName(securityContext.getUserPrincipal().getName());
        service.passReturn(drmdCardPK, user);
        response = Response.status(Response.Status.OK).entity(messageBundle.getProperty("coreaccount.daramadbank.PASS_RETURN_SUCCESSFULLY")).build();
        return ResponseHelper.ok(response);
    }

    @PUT
    @Path("/autoRegister")
    @RolesAllowed({Roles.MALI_SETAD_DRMD_USER, Roles.MALI_BRANCH_DRMD_USER})// ظاهرا عملیات ثبت مکانیزه مربوط به کاربر ستاد می باشد
    public Response autoRegister(@QueryParam(value = "filter") FilterWrapper filter, @QueryParam("start") Integer start, @QueryParam("limit") Integer limit, @QueryParam("sort") SortWrapper sort, @Context UriInfo uriInfo, @Context SecurityContext securityContext, @Context HttpServletRequest request) throws WebApplicationException {
        Response response;
        User user = userBean.getUserByUserName(securityContext.getUserPrincipal().getName());
        Map<String, Object> result = service.autoRegister(filter, user);
        if (result.isEmpty()) {
            response = Response.status(Response.Status.OK).tag(messageBundle.getProperty("coreaccount.daramadbank.SORAT_NO_RECORD")).build();
            return ResponseHelper.ok(response);
        }

        response = Response.status(Response.Status.OK).entity(result).build();
        return ResponseHelper.ok(response);
    }

    @GET
    @Path("/pdfReport")
    @Produces("application/pdf")
    @Consumes(MediaType.APPLICATION_JSON)
    @RolesAllowed({Roles.MALI_SETAD_DRMD_USER, Roles.MALI_BRANCH_DRMD_USER})
    public Response exportToPdf(@QueryParam("resultJson") String resultJson, @QueryParam("reportInfoJson") String reportInfoJson, @Context SecurityContext context, @Context HttpServletRequest request) throws IOException {
        byte[] byteStream = service.exportToPdf(resultJson, reportInfoJson);
        return Response
                .ok(byteStream)
                .header("Content-Type", "application/pdf")
                .build();
    }

    @GET
    @Path("/init-new-card")
    @RolesAllowed({Roles.MALI_SETAD_DRMD_USER, Roles.MALI_BRANCH_DRMD_USER})
    public Response initNewCard(@QueryParam("brchCode") String brchCode, @QueryParam("yearmon") String yearmon, String reportInfoJson, @Context SecurityContext context, @Context HttpServletRequest request) throws WebApplicationException {
        service.initNewCard(brchCode, yearmon);
        return ResponseHelper.ok();
    }

    @GET
    @Path("/get-vosooli-date")
    @RolesAllowed({Roles.MALI_SETAD_DRMD_USER, Roles.MALI_BRANCH_DRMD_USER})
    public Response getVosooliDate(@QueryParam("brchCode") String brchCode, @QueryParam("yearmon") String yearmon, String reportInfoJson, @Context SecurityContext context, @Context HttpServletRequest request) throws WebApplicationException {
        return ResponseHelper.ok(service.getVosooliDate(brchCode, yearmon));
    }

    @POST
    @Path("/saveInCard/{cardOrdPay}/{cardPrice}/{cardDate}/{cardRcvType}/{bankCode}/{bankHesab}/{brchCode}")
    @RolesAllowed({Roles.MALI_SETAD_DRMD_USER, Roles.MALI_BRANCH_DRMD_USER})
    public Response saveInCard(@PathParam("cardOrdPay") String cardOrdPay, @PathParam("cardPrice") Float cardPrice, @PathParam("cardDate") String cardDate, @PathParam("cardRcvType") String cardRcvType, @PathParam("bankCode") String bankCode, @PathParam("bankHesab") String bankHesab, @PathParam("brchCode") String brchCode, @Context UriInfo uriInfo, @Context SecurityContext securityContext,
            @Context HttpServletRequest request) throws WebApplicationException {
        Response response;
        User user = userBean.getUserByUserName(securityContext.getUserPrincipal().getName());
        String result = service.saveInCard(cardOrdPay, cardPrice, cardDate, cardRcvType, bankCode, bankHesab, brchCode, user);
        response = Response.status(Response.Status.OK).entity(result).build();
        return ResponseHelper.ok(response);
    }

    @GET
    @Path("/exportToExcel")
    @Produces("application/vnd.ms-excel")
    public Response doExcel(@QueryParam("filter") String resultJson, @Context UriInfo ui, @Context HttpServletRequest request, @Context SecurityContext sc) throws WebApplicationException, IOException {

        final Workbook workbook = service.writeToExcelAutoRegister(resultJson);

        StreamingOutput output = new StreamingOutput() {

            @Override
            public void write(java.io.OutputStream output) throws IOException, WebApplicationException {
                workbook.write(output);
                output.close();
            }

        };
        String fileName = "autoRegister.xlsx";
        return Response.ok(output).header("Content-Disposition", "attachment; filename=" + fileName).build();

    }

    @GET
    @Path("/exportToXml")
    @Produces("application/xml")
    public Response doXml(@QueryParam("filter") String resultJson, @Context UriInfo ui, @Context HttpServletRequest request, @Context SecurityContext sc) throws WebApplicationException, IOException {

        final String xml = service.writeToXmlAutoRegister(resultJson);
        StreamingOutput output = new StreamingOutput() {
            @Override
            public void write(OutputStream output) throws IOException, WebApplicationException {
                output.write(xml.getBytes("Unicode"));
                output.close();
            }
        };
        String fileName = "autoRegister.xml";
        return Response.ok(output).header("Content-Disposition", "attachment; filename=" + fileName).build();

    }

    @GET
    @Path("/exportToAccess")
    @Produces("application/vnd.ms-access")
    public Response exportToAccess(@QueryParam("filter") String resultJson, @Context UriInfo ui, @Context HttpServletRequest request, @Context SecurityContext sc) throws WebApplicationException, IOException, ClassNotFoundException, SQLException {

        Database db = service.writeToAccessAutoRegister(resultJson);
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
        String fileName = "autoRegister.accdb";
        return Response.ok(output)
                .header("Content-Disposition", "attachment; filename=" + fileName)
                .build();
    }

}
