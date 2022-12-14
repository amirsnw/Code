package ir.tamin.insurance.technical.ws.rest;

import ir.tamin.framework.domain.proxy.ProxyProcessingException;
import ir.tamin.insurance.technical.service.report.InsuranceAgreementRequestReportService;
import org.slf4j.Logger;

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
 * @author m_hoseini
 */
@Path("/insurance-agreement-report")
public class InsuranceAgreementRequestReportREST {

    @Inject
    private Logger logger;

    @Inject
    private InsuranceAgreementRequestReportService insuranceAgreementRequestReportService;
    
    //medical
    @GET
    @Path("introduction-report")
    @Produces("application/pdf")
    //@RolesAllowed({Roles.DEFAULT_ROLE})
    public Response AgreementMedicalIntroductionReport(
            @QueryParam("reqId") Long reqId,
            @Context SecurityContext security) throws Exception, ProxyProcessingException {

        try {
            byte[] byteStream = insuranceAgreementRequestReportService.loadReportMedicalInfo(reqId);//reportService.loadReport(null);
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
    
    //answer rep
    @GET
    @Path("answer-report")
    @Produces("application/pdf")
    //@RolesAllowed({Roles.DEFAULT_ROLE})
    public Response AgreementMedicalIntroductionReport2(
            @QueryParam("reqId") Long reqId,
            @Context SecurityContext security) throws Exception {

        try {
            byte[] byteStream = insuranceAgreementRequestReportService.loadReport2(reqId);//reportService.loadReport(null);
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
