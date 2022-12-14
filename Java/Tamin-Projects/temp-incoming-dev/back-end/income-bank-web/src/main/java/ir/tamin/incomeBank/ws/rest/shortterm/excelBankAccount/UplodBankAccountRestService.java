package ir.tamin.incomeBank.ws.rest.shortterm.excelBankAccount;

import ir.tamin.incomeBank.model.identityManager.User;
import ir.tamin.incomeBank.service.identityManager.UserBean;
import ir.tamin.incomeBank.service.shortterm.excelbankAccount.UplodBankAccountService;
import ir.tamin.incomeBank.ws.rest.Roles;
import ir.tamin.framework.cdi.util.WebProperties;
import ir.tamin.framework.core.util.Bundle;
import ir.tamin.framework.ws.rest.ResponseHelper;
import org.apache.poi.ss.usermodel.Workbook;
import org.glassfish.jersey.internal.util.Base64;

import javax.annotation.security.RolesAllowed;
import javax.enterprise.context.RequestScoped;
import javax.inject.Inject;
import javax.servlet.http.HttpServletRequest;
import javax.ws.rs.*;
import javax.ws.rs.core.*;
import java.io.IOException;
import java.sql.SQLException;
import java.util.HashMap;
import java.util.Map;

/**
 * @author a_alaiemousavi
 */
@Path("/importBankDeletedPayRecord")
@Produces(MediaType.APPLICATION_JSON)
@Consumes(MediaType.APPLICATION_JSON)
@RequestScoped
public class UplodBankAccountRestService {

    @Inject
    private UplodBankAccountService uplodBankAccountService;

    @Inject
    UserBean userBean;

    @Inject
    @WebProperties
    Bundle webBundle;

    @POST
    @Path("/upload/excel")
    @Produces({MediaType.APPLICATION_JSON})
    @Consumes(MediaType.APPLICATION_JSON)
    @RolesAllowed({Roles.MALI_SETAD_SHORTTERM_USER , Roles.MALI_SETAD_PENSION_USER , Roles.MALI_SETAD_ASNAD_USER})
    public Response upload(HashMap<String, Object> filter, @Context UriInfo ui, @Context HttpServletRequest request, @Context SecurityContext securityContext) throws WebApplicationException, IOException {
        String formatExcel = filter.get("formateExcel").toString();
        String headId = filter.get("headId").toString();
        String excelFile = "";
        String payStep = filter.get("payStep").toString();
        if ("xls".equals(formatExcel)) {
            excelFile = filter.get("path").toString().replace("data:application/vnd.ms-excel;base64,", "");
        } else {
            excelFile = filter.get("path").toString().replace("data:application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;base64,", "");
        }

        byte[] byteExcelFile = Base64.decode(excelFile.getBytes());
        Map<String, Object> map = uplodBankAccountService.readExcelFile(byteExcelFile, formatExcel, headId, payStep);

        return ResponseHelper.ok(map);
    }

    @DELETE
    @Path("delete")
    @Produces({MediaType.APPLICATION_JSON})
    @Consumes(MediaType.APPLICATION_JSON)
    @RolesAllowed({Roles.MALI_SETAD_SHORTTERM_USER , Roles.MALI_SETAD_PENSION_USER , Roles.MALI_SETAD_ASNAD_USER})
    public Response deleteUplodFile(HashMap<String, Object> filter, @Context UriInfo uriInfo, @Context SecurityContext securityContext, @Context HttpServletRequest request) throws WebApplicationException, IOException, SQLException {
        String excelFile = "";
        Map<String, Object> map = new HashMap<>();
        String formatExcel = filter.get("formateExcel").toString();
        String headId = filter.get("headId").toString();
        String payStep = filter.get("payStep").toString();
        String reasonCode = filter.get("deleteReason").toString();
        String systemId = filter.get("systemId").toString();

        if ("xls".equals(formatExcel)) {
            excelFile = filter.get("path").toString().replace("data:application/vnd.ms-excel;base64,", "");
        } else {

            excelFile = filter.get("path").toString().replace("data:application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;base64,", "");
        }
        User user = userBean.getUserByUserName(securityContext.getUserPrincipal().getName());
        byte[] byteExcelFile = Base64.decode(excelFile.getBytes());

        map = uplodBankAccountService.deleteFile(byteExcelFile, reasonCode, user.getUserName(), formatExcel, headId, payStep, systemId);
        return ResponseHelper.ok(map);
    }

    @GET
    @Path("/excelReport") 
    @Consumes(MediaType.APPLICATION_JSON)
    @Produces("application/vnd.ms-excel")
    public Response doExcel(@QueryParam("filter") String resultJson, @QueryParam("systemId") String systemId, @Context HttpServletRequest request, @Context SecurityContext sc) throws WebApplicationException {

        Workbook workbookTemp = null;
        if (webBundle.getProperty("system.pension.id").equals(systemId)) {
            workbookTemp = uplodBankAccountService.writeToExcelPension(resultJson);
        } else if (webBundle.getProperty("system.shortterm.id").equals(systemId)) {
            workbookTemp = uplodBankAccountService.writeToExcelShortterm(resultJson);
        } else if (webBundle.getProperty("system.asnad.id").equals(systemId)) {
            workbookTemp = uplodBankAccountService.writeToExcelAsnad(resultJson);
        }

        final Workbook workbook = workbookTemp;
        StreamingOutput output = new StreamingOutput() {

            @Override
            public void write(java.io.OutputStream output) throws IOException, WebApplicationException {
                workbook.write(output);
                output.close();
            }

        };
        String fileName = "notReturnExportExcel.xls";
        return Response.ok(output).header("Content-Disposition", "attachment; filename=" + fileName).build();

    }

    @GET
    @Path("/excelReportForNotReturnRecords")
    @Consumes(MediaType.APPLICATION_JSON)
    @Produces("application/vnd.ms-excel")
    public Response doExcelForNotReturn(@QueryParam("filter") String resultJson, @QueryParam("systemId") String systemId, @Context HttpServletRequest request, @Context SecurityContext sc) throws WebApplicationException {

        final Workbook workbook = uplodBankAccountService.writeToExcelForNotReturnRecords(resultJson, systemId);
        StreamingOutput output = new StreamingOutput() {

            @Override
            public void write(java.io.OutputStream output) throws IOException, WebApplicationException {
                workbook.write(output);
                output.close();
            }

        };
        String fileName = "notReturn.xls";
        return Response.ok(output).header("Content-Disposition", "attachment; filename=" + fileName).build();

    }
}
