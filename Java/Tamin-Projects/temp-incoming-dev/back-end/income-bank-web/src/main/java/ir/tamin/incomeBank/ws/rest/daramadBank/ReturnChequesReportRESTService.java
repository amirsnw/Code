/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package ir.tamin.incomeBank.ws.rest.daramadBank;

import ir.tamin.incomeBank.service.daramadBank.ReturnChequesReportService;
import ir.tamin.incomeBank.ws.rest.Roles;
import javax.annotation.security.RolesAllowed;
import javax.enterprise.context.RequestScoped;
import javax.inject.Inject;
import javax.ws.rs.GET;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.QueryParam;
import javax.ws.rs.core.Context;
import javax.ws.rs.core.Response;
import javax.ws.rs.core.SecurityContext;

/**
 *
 * @author e_shoghi
 */
@Path("/return-cheques-report")
@RequestScoped
public class ReturnChequesReportRESTService {

    @Inject
    private org.slf4j.Logger logger;
    @Inject
    private ReturnChequesReportService returnChequesReportService;

    @GET
    @Produces("application/pdf")
    @RolesAllowed(Roles.ALL_USERS)
    public Response loadReport(@QueryParam("branchCode") String branchCode, @QueryParam("from") String dateFrom, @QueryParam("to") String dateTo, @Context SecurityContext security) throws Exception {
        try {
            byte[] byteStream = returnChequesReportService.loadReport(branchCode, dateFrom, dateTo, security);
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
