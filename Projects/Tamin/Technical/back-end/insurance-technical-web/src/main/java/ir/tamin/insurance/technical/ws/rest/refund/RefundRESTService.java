package ir.tamin.insurance.technical.ws.rest.refund;

import ir.tamin.framework.core.persistence.ProcedureManager;
import ir.tamin.framework.domain.proxy.ProxyProcessingException;
import ir.tamin.framework.ws.rest.ResponseHelper;
import ir.tamin.framework.ws.rest.Roles;
import ir.tamin.framework.ws.rest.json.Filter;
import ir.tamin.framework.ws.rest.json.FilterWrapper;
import ir.tamin.framework.ws.rest.json.SortWrapper;
import ir.tamin.framework.ws.rest.proxy.DBFunctionProxy;
import ir.tamin.framework.ws.rest.security.TokenContext;
import ir.tamin.insurance.technical.business.user.UserManager;
import ir.tamin.insurance.technical.model.refund.IncomingFinanceModel;
import ir.tamin.insurance.technical.service.RefundService;

import javax.annotation.security.RolesAllowed;
import javax.enterprise.context.RequestScoped;
import javax.inject.Inject;
import javax.inject.Named;
import javax.persistence.EntityManager;
import javax.ws.rs.*;
import javax.ws.rs.core.*;

/**
 *
 * @author m_hoseini
 */
@Path("/refund-spec")
@Produces(MediaType.APPLICATION_JSON)
@Consumes(MediaType.APPLICATION_JSON)
@RequestScoped
public class RefundRESTService {

    @Inject
    private UserManager userManager;

    @Inject
    private RefundService refundService;

    @Inject
    @Named("DefaultDBFunctionProxy")
    protected DBFunctionProxy dBFunctionProxy;
    @Inject
    @Named("ProcedureManager")
    private ProcedureManager procedure;
    @Inject
    private TokenContext tokenContext;

    @Inject
    private UserManager um;

    @Inject
    EntityManager em;

    @GET
    @Path("refund-calculate")
    @RolesAllowed({Roles.DEFAULT_ROLE})
    public Response getrefundCalculate(
            @QueryParam("resNumber") String resNumber,
            @QueryParam("isuRefundStartDate") String isuRefundStartDate,
            @QueryParam("isuRefundEndDate") String isuRefundEndDate,
            @QueryParam("darmanRefundStartDate") String darmanRefundStartDate,
            @QueryParam("darmanRefundEndDate") String darmanRefundEndDate,
            @QueryParam("selfIsuType") String selfIsuType,
            @QueryParam("spcRate") String spcRate,
            @QueryParam("reasonCode") String reasonCode,
            @QueryParam("isuRefund") String isuRefund,
            @QueryParam("darmanRefund") String darmanRefund,
            @QueryParam("editMode") boolean editMode,
            @Context SecurityContext securityContext) throws ProxyProcessingException, Exception {

        try {
            return ResponseHelper.ok(refundService.getRefundCalculateService(isuRefund, darmanRefund, resNumber,
                    isuRefundStartDate, isuRefundEndDate, darmanRefundStartDate, darmanRefundEndDate, selfIsuType,
                    spcRate, reasonCode, editMode));
        } catch (Exception e) {
            throw new Exception(e.getMessage());
        }
    }

    @GET
    @Path("active-subdominant")
    @RolesAllowed({Roles.DEFAULT_ROLE})
    public Response getActiveSubdominanat(
            @QueryParam(value = "filter") FilterWrapper filters,
            @QueryParam(value = "start") Integer start,
            @QueryParam(value = "limit") Integer limit,
            @QueryParam(value = "sort") SortWrapper sort,
            @Context UriInfo ui,
            @Context SecurityContext securityContext) throws ProxyProcessingException, Exception {
        String nationalId = null;
        if (filters != null && filters.getFilters() != null) {
            for (Filter filter : filters.getFilters()) {

                if (filter.getProperty().equals("nationalId")) {
                    nationalId = filter.getValue();
                }
            }
        }
        try {
            return ResponseHelper.ok(refundService.getActiveSubdominanat(nationalId));
        } catch (Exception e) {
            throw new Exception(e.getMessage());
        }
    }

    @POST
    @Path("refund-payment")
    @RolesAllowed({Roles.DEFAULT_ROLE})
    public Response refundPaymentInfo(
            IncomingFinanceModel financeModel,
            @Context SecurityContext securityContext) throws ProxyProcessingException, Exception {
        String finanaceStatus = null;
        try {
            if (financeModel != null) {
                finanaceStatus = financeModel.getStatus();
            }
            refundService.updateRefundInfo(finanaceStatus, financeModel);
            return ResponseHelper.ok();
        } catch (Exception ex) {
            System.out.println(ex.getMessage());
            return null;
        }
    }

    @GET
    @Path("get-refund-detail")
    @RolesAllowed({Roles.DEFAULT_ROLE})
    public Response getRefundDetail(
            @QueryParam(value = "filter") FilterWrapper filter,
            @QueryParam(value = "start") Integer start,
            @QueryParam(value = "limit") Integer limit,
            @QueryParam(value = "sort") SortWrapper sort,
            @Context UriInfo ui,
            @Context SecurityContext securityContext) throws ProxyProcessingException, Exception {

        String resnum = "";
        if (filter != null && filter.getFilters() != null) {
            for (Filter ft : filter.getFilters()) {
                if (ft.getProperty().equalsIgnoreCase("resnum")) {
                    resnum = ft.getValue();
                }
            }
        }
        try {
            return ResponseHelper.ok(refundService.getRefundDetails(resnum));
        } catch (Exception e) {
            throw new Exception(e.getMessage());
        }

    }

    @GET
    @Path("get-debit-detail")
    @RolesAllowed({Roles.DEFAULT_ROLE})
    public Response getDebitDetail(
            @QueryParam(value = "filter") FilterWrapper filter,
            @QueryParam(value = "start") Integer start,
            @QueryParam(value = "limit") Integer limit,
            @QueryParam(value = "sort") SortWrapper sort,
            @Context UriInfo ui,
            @Context SecurityContext securityContext) throws ProxyProcessingException, Exception {

        String pcws_dbtno = "";
        String pnatcode = "";
        String psdate = "";
        String pedate = "";
        if (filter != null && filter.getFilters() != null) {
            for (Filter ft : filter.getFilters()) {

                switch (ft.getProperty().toLowerCase()) {
                    case "pcws_dbtno":
                        pcws_dbtno = ft.getValue();
                        break;
                    case "pnatcode":
                        pnatcode = ft.getValue();
                        break;
                    case "psdate":
                        psdate = ft.getValue();
                        break;
                    case "pedate":
                        pedate = ft.getValue();
                        break;
                }
            }
        }
        try {
            return ResponseHelper.ok(refundService.getDebitDetails(pcws_dbtno, pnatcode, psdate, pedate));
        } catch (Exception e) {
            throw new Exception(e.getMessage());
        }

    }
}
