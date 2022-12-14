package ir.tamin.insurance.technical.ws.rest.insuranceAgreement;

import ir.tamin.framework.domain.proxy.ProxyProcessingException;
import ir.tamin.framework.ws.rest.ResponseHelper;
import ir.tamin.framework.ws.rest.Roles;
import ir.tamin.insurance.technical.business.service.InsuranceAgreementRequestService;

import javax.annotation.security.RolesAllowed;
import javax.enterprise.context.RequestScoped;
import javax.inject.Inject;
import javax.ws.rs.*;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;
import java.sql.SQLException;

/**
 * @author s_naghavi
 */
@Path("/insurance-agreement")
@Produces(MediaType.APPLICATION_JSON)
@Consumes(MediaType.APPLICATION_JSON)
@RequestScoped
public class InsuranceAgreementRequestREST {

    @Inject
    private InsuranceAgreementRequestService insuranceAgreementRequestService;

    @GET
    @Path("control-medical")
    @RolesAllowed({Roles.DEFAULT_ROLE})
    public Response getHistoryDays(
            @QueryParam("insuranceId") String insuranceId,
            @QueryParam("nationalCode") String nationalCode,
            @QueryParam("requestDate") String requestDate)
            throws SQLException, Exception {
        return ResponseHelper.ok(insuranceAgreementRequestService.controlMedicalValidation(insuranceId, nationalCode, requestDate));
    }

    @GET
    @Path("get-province")
    @RolesAllowed({Roles.DEFAULT_ROLE})
    public Response getProvinceByBranchCode(
            @QueryParam("branchCode") String branchCode)
            throws SQLException, Exception {
        return ResponseHelper.ok(insuranceAgreementRequestService.getProvinceByBranchCode(branchCode));
    }

    @GET
    @Path("history-days-senfi")
    @RolesAllowed({Roles.DEFAULT_ROLE})
    public Response getHistoryDaysSenfi(@QueryParam("insuranceId") String insuranceId,
                                        @QueryParam("nationalCode") String nationalCode)
            throws SQLException {

        return ResponseHelper.ok(insuranceAgreementRequestService.calcHistDaysSenfi(insuranceId, nationalCode));
    }

    @GET
    @Path("lowhigh-wage-senfi")
    @RolesAllowed({Roles.DEFAULT_ROLE})
    public Response getLowHighWageSenfi(
            @QueryParam("introductionLetterDate") String introductionLetterDate,
            @QueryParam("insuranceId") String insuranceId,
            @QueryParam("nationalCode") String nationalCode,
            @QueryParam("branchCode") String branchCode,
            @QueryParam("workshopId") String workshopId,
            @QueryParam("requestDate") String requestDate)
            throws SQLException, ProxyProcessingException {

        return ResponseHelper.ok(insuranceAgreementRequestService.checkLowHighWageSenfi(insuranceId, nationalCode ,branchCode ,workshopId, requestDate));
    }
}
