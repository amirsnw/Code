package ir.tamin.insurance.technical.ws.rest.occur;


import ir.tamin.insurance.technical.business.general.RestServices;
import ir.tamin.insurance.technical.business.user.UserManager;
import ir.tamin.insurance.technical.model.Roles;
import ir.tamin.insurance.technical.model.user.OrgUser;
import ir.tamin.insurance.technical.service.report.occur.OccurReportService;
import org.json.JSONObject;
import org.slf4j.Logger;

import javax.annotation.security.RolesAllowed;
import javax.inject.Inject;
import javax.ws.rs.*;
import javax.ws.rs.core.Context;
import javax.ws.rs.core.Response;
import javax.ws.rs.core.SecurityContext;
import java.util.Date;

@Path("/occur-reports")
public class OccurReportREST {

    @Inject
    private Logger logger;

    @Inject
    private UserManager userManager;

    @Inject
    private OccurReportService reportService;

    @Inject
    private RestServices restServices;

    @GET
    @Produces("application/pdf")
    @RolesAllowed(Roles.ALL_USERS)
    public Response getOccurReport(
            @QueryParam("sDate") Long sDate,
            @QueryParam("eDate") Long eDate,
            @QueryParam("type") String type,
            @Context SecurityContext securityContext) {

        OrgUser user = userManager.getUserByName(securityContext.getUserPrincipal().getName());

        try {
            byte[] byteStream = null;
            switch (type) {
                case "0":
                    byteStream =  reportService.loadOccurListReports(user.getOrganization().getCode(),new Date(sDate), new Date(eDate));
                    break;
                case "1":
                    byteStream = reportService.loadOccurOwnerReports(user.getOrganization().getCode(),new Date(sDate), new Date(eDate));
                    break;
                case "2":                                              
                    byteStream = reportService.loadOccurCauseReports(user.getOrganization().getCode(),new Date(sDate), new Date(eDate));
                    break;
                case "3":
                    byteStream = reportService.loadOccurPartReports(user.getOrganization().getCode(),new Date(sDate), new Date(eDate));
                    break;
                case "4":
                    byteStream = reportService.loadOccurTypeReports(user.getOrganization().getCode(),new Date(sDate), new Date(eDate));
                    break;
            }
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
    @Produces("application/pdf")
    @Path("/eservice/{eRepId}")
    @RolesAllowed(Roles.ALL_USERS)
    public Response getOccurEserviceForm(
            @PathParam("eRepId") String eRepId,
            @Context SecurityContext securityContext) {

        OrgUser user = userManager.getUserByName(securityContext.getUserPrincipal().getName());

        try {
            JSONObject data = new JSONObject(restServices.getEOccurWorkshopDetail(eRepId));
            byte[] byteStream = reportService.loadOccurEserviceReport(data.getJSONObject("data"));
            return Response
                    .ok(byteStream)
                    .header("Content-Type", "application/pdf")
                    .build();
        } catch (Exception e) {
            e.printStackTrace();
            return null;
        }
    }
}
