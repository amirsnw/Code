package ir.tamin.insurance.technical.ws.rest.occur;

import ir.tamin.framework.domain.proxy.ProxyProcessingException;
import ir.tamin.framework.ws.rest.security.TokenContext;
import ir.tamin.insurance.technical.business.user.UserManager;
import ir.tamin.insurance.technical.model.Roles;
import ir.tamin.insurance.technical.model.user.OrgUser;
import ir.tamin.insurance.technical.service.occur.OccurService;
import ir.tamin.insurance.technical.service.report.occur.OccurIdeaService;
import org.slf4j.Logger;

import javax.annotation.security.RolesAllowed;
import javax.inject.Inject;
import javax.ws.rs.*;
import javax.ws.rs.core.Context;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;
import javax.ws.rs.core.SecurityContext;

/**
 * Created by a-khalighi on 5/17/2022
 */
@Path("/occur-idea-report")
public class OccurIdeaReportREST {
    @Inject
    private Logger logger;

    @Inject
    private UserManager userManager;

    @Inject
    private OccurIdeaService reportService;

    @Inject
    private OccurService occurService;

    @Inject
    private TokenContext tokenContext;

    @GET
    @Produces("application/pdf")
    @RolesAllowed(Roles.ALL_USERS)
    public Response getOccurReport(
            @QueryParam("reqId") String reqId,
            @QueryParam("ideaSeq") String ideaSeq,
            @Context SecurityContext securityContext) {

        try {
            OrgUser user = userManager.getUserByName(tokenContext.getCurrentUser().getName());
            byte[] byteStream = reportService.loadOccurIdeaReports(reqId, ideaSeq , user.getOrganization().getCode());
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

    @POST
    @Produces(MediaType.APPLICATION_JSON)
    @RolesAllowed({ir.tamin.framework.ws.rest.Roles.DEFAULT_ROLE})
    public Response getDocumentInfo(@QueryParam("reqId") String reqId,
                                    @QueryParam("ideaSeq") String ideaSeq,
                                    @QueryParam("nationalCode") String nationalCode,
                                    @QueryParam("branchCode") String branchCode,
                                    @Context SecurityContext securityContext) throws ProxyProcessingException, Exception {
        if (reqId == null || ideaSeq == null) {
            throw new ProxyProcessingException("insurance.technical.occur.ErrorSendDocument", new String[0]);
        } else {
            try {
                OrgUser user = userManager.getUserByName(tokenContext.getCurrentUser().getName());
                byte[] byteStream = reportService.loadOccurIdeaReports(reqId, ideaSeq , user.getOrganization().getCode());
                occurService.sendReportToUCM(byteStream, tokenContext.getCurrentUser().getUsername(), branchCode, nationalCode,"pdf");
            } catch (Exception e) {
                throw new ProxyProcessingException("insurance.technical.occur.ErrorSendDocument", new String[0]);
            }
            return Response.ok().build();
        }
    }
}
