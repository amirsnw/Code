package ir.tamin.insurance.technical.ws.rest.brokerReport;

import ir.tamin.framework.cdi.util.WebProperties;
import ir.tamin.framework.core.util.Bundle;
import ir.tamin.framework.domain.proxy.ProxyProcessingException;
import ir.tamin.framework.ws.rest.ResponseHelper;
import ir.tamin.framework.ws.rest.json.FilterWrapper;
import ir.tamin.framework.ws.rest.json.SortWrapper;
import ir.tamin.insurance.technical.business.general.RestServices;
import ir.tamin.insurance.technical.business.user.UserManager;
import ir.tamin.insurance.technical.model.Roles;
import ir.tamin.insurance.technical.model.brokerReport.BrokerReport;
import ir.tamin.insurance.technical.model.user.OrgUser;
import ir.tamin.insurance.technical.service.baseinfo.OrganizationService;
import ir.tamin.insurance.technical.service.brokerReport.BrokerReportService;
import org.apache.poi.ss.usermodel.Workbook;
import org.json.JSONObject;
import org.slf4j.Logger;

import javax.annotation.security.RolesAllowed;
import javax.enterprise.context.RequestScoped;
import javax.inject.Inject;
import javax.servlet.http.HttpServletRequest;
import javax.ws.rs.*;
import javax.ws.rs.core.*;
import java.io.IOException;
import java.io.OutputStream;

/**
 * Created by a-khalighi on 5/17/2022
*/
@Path("/broker-report")
@Produces(MediaType.APPLICATION_JSON)
@Consumes(MediaType.APPLICATION_JSON)
@RequestScoped
public class BrokerReportRESTService {

    @Inject
    private BrokerReportService brokerReportService;

    @Inject
    private OrganizationService organizationService;

    @Inject
    Logger logger;

    @Inject
    RestServices restServices;

    @Inject
    @WebProperties
    Bundle webProperties;

    @Inject
    private UserManager userManager;

    @Path("/save-report")
    @POST
    @RolesAllowed(Roles.ALL_USERS)
    public Response saveReport(String output, @Context UriInfo ui, @Context SecurityContext sc, @Context HttpServletRequest request) throws
            WebApplicationException {

        OrgUser user = userManager.getUserByName(sc.getUserPrincipal().getName());
        JSONObject report = new JSONObject(output);
        try {
            String result = brokerReportService.saveBrokerWageReport(report, user.getUserName(), user.getOrganization().getCode());
            return ResponseHelper.ok(result);
        } catch (Exception e) {
            return ResponseHelper.serverError(e);
        }
    }

    @Path("/confirm-report/{reportId}")
    @PUT
    @RolesAllowed(Roles.ALL_USERS)
    public Response confirmReport(String output, @PathParam("reportId") String reportId, @Context SecurityContext sc, @Context HttpServletRequest request) throws
            WebApplicationException {

        try {
            BrokerReport result = brokerReportService.confirmBrokerWageReport(reportId);
            return ResponseHelper.ok(result);
        } catch (Exception e) {
            return ResponseHelper.serverError(e);
        }
    }

    @Path("/get-broker")
    @GET
    @RolesAllowed(Roles.ALL_USERS)
    public Response getBroker(@QueryParam(value = "filter") FilterWrapper filters, @QueryParam(value = "start") Integer start,
                              @QueryParam(value = "limit") Integer limit, @QueryParam("sort") SortWrapper sort, @Context UriInfo ui,
                              @Context SecurityContext sc, @Context HttpServletRequest request) throws WebApplicationException {
        try {
            return ResponseHelper.ok(organizationService.getBranchesByFilter(filters, start, limit, sort));
        } catch (Exception e) {
            return ResponseHelper.serverError(e);
        }
    }

    @GET
    @Path("get-broker-pdf")
    @Produces("application/pdf")
    //@RolesAllowed({Roles.DEFAULT_ROLE})
    public Response AgreementMedicalIntroductionReport(
            @QueryParam("reportId") String reportId,
            @QueryParam("sort") SortWrapper sorter,
            @Context SecurityContext security) throws Exception, ProxyProcessingException {

        try {
            byte[] byteStream = brokerReportService.loadPdfBrokerInfo(reportId, sorter);
            logger.info("report log end.");
            return Response
                    .ok(byteStream)
                    .header("Content-Type", "application/pdf")
                    .build();
        } catch (Exception e) {
            e.printStackTrace();
            return null;
        }
    }

    @GET
    @Path("/get-broker-excel")
    //@RolesAllowed({Roles.DEFAULT_ROLE})
    public Response excelReportHeader(
            @QueryParam("reportId") String reportId,
            @QueryParam("sort") SortWrapper sorter,
            @Context SecurityContext sc) throws Exception {
        StreamingOutput so = new StreamingOutput() {
        final Workbook workbook = brokerReportService.loadExcelBrokerInfo(reportId, sorter);
            @Override
            public void write(OutputStream output) throws IOException, WebApplicationException {
                workbook.write(output);
            }
        };
        return Response.ok(so)
                .header("Content-Type", "application/vnd.ms-excel")
                .build();
    }
}
