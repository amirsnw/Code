package ir.tamin.insurance.technical.ws.rest.guardian;


import ir.tamin.insurance.technical.business.user.UserManager;
import ir.tamin.insurance.technical.model.Roles;
import ir.tamin.insurance.technical.model.user.OrgUser;
import ir.tamin.insurance.technical.service.report.GuardianReportService;
import org.slf4j.Logger;

import javax.annotation.security.RolesAllowed;
import javax.inject.Inject;
import javax.ws.rs.GET;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.QueryParam;
import javax.ws.rs.core.Context;
import javax.ws.rs.core.Response;
import javax.ws.rs.core.SecurityContext;
import java.util.Date;

@Path("/guardian-reports")
public class GuardianReportREST {

    @Inject
    private Logger logger;

    @Inject
    private UserManager userManager;

    @Inject
    private GuardianReportService reportService;

    @GET
    @Path("/calc-ins")
    @Produces("application/pdf")
    @RolesAllowed(Roles.ALL_USERS)
    public Response getCalcInsReport(@QueryParam("reqNo") String reqNo , @Context SecurityContext securityContext) {

        try {
            byte[] byteStream = reportService.loadGuardianCalcReport(reqNo);
            logger.info("report log end.");
            return Response
                    .ok(byteStream)
                    .header("Content-Type", "application/pdf")
                    .build();
        }catch (Exception e){
            e.printStackTrace();
            return null;
        }
    }

    @GET
    @Path("/reports")
    @Produces("application/pdf")
    @RolesAllowed(Roles.ALL_USERS)
    public Response getGuardianReports(
            @QueryParam("sDate") Long sDate,
            @QueryParam("eDate") Long eDate,
            @Context SecurityContext securityContext) {

        OrgUser user = userManager.getUserByName(securityContext.getUserPrincipal().getName());

        try {
            byte[] byteStream = reportService.loadGuardianReports(user.getOrganization().getCode(), new Date(sDate), new Date(eDate) );
            logger.info("report log end.");
            return Response
                    .ok(byteStream)
                    .header("Content-Type", "application/pdf")
                    .build();
        }catch (Exception e){
            e.printStackTrace();
            return null;
        }
    }
    
    
    @GET
    @Path("/inspectorQueueReports")
    @Produces("application/pdf")
    @RolesAllowed(Roles.ALL_USERS)
    public Response getGuardianInspectorReports(
            @QueryParam("sDate") Long sDate,
            @QueryParam("eDate") Long eDate,
            @Context SecurityContext securityContext) {

        OrgUser user = userManager.getUserByName(securityContext.getUserPrincipal().getName());

        try {
            byte[] byteStream = reportService.loadGuardianInspectorReports(user.getOrganization().getCode() , new Date(sDate), new Date(eDate));
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
}
