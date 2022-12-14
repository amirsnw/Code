/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package ir.tamin.insurance.technical.ws.rest.guardian;

import ir.tamin.framework.domain.proxy.ProxyProcessingException;
import ir.tamin.framework.ws.rest.ResponseHelper;
import ir.tamin.insurance.technical.business.general.RestServices;
import ir.tamin.insurance.technical.business.user.UserManager;
import ir.tamin.insurance.technical.model.Roles;
import ir.tamin.insurance.technical.model.guardian.Guardian;
import ir.tamin.insurance.technical.model.user.OrgUser;
import ir.tamin.insurance.technical.service.GuardianService;

import javax.annotation.security.RolesAllowed;
import javax.enterprise.context.RequestScoped;
import javax.inject.Inject;
import javax.servlet.http.HttpServletRequest;
import javax.ws.rs.*;
import javax.ws.rs.core.*;
import java.util.logging.Level;
import java.util.logging.Logger;

@Path("/guardian-other-branch")
@Produces(MediaType.APPLICATION_JSON)
@Consumes(MediaType.APPLICATION_JSON)
@RequestScoped
public class GuardianOtherBranchREST {

    @Inject
    private UserManager userManager;

    @Inject
    private GuardianService guardianService;

    @Inject
    RestServices restServices;

    //دریافت عکس ها
    @GET
    @Path("/documentData")
    @RolesAllowed(Roles.ALL_USERS)
    public Response getGuardianDocumentInfo(@QueryParam("reqId") String reqId, @Context SecurityContext securityContext) throws ProxyProcessingException, Exception {
        return Response.ok(restServices.getEguardianRequestDocument(reqId)).build();
    }

    @GET
    @RolesAllowed(Roles.ALL_USERS)
    public Response getGuardianInfo(@QueryParam("reqSerial") String reqSerial, @Context SecurityContext securityContext) throws ProxyProcessingException {
        OrgUser user = userManager.getUserByName(securityContext.getUserPrincipal().getName());

        Guardian guardian = guardianService.getGuardianOverBranch(reqSerial);
        if (guardian == null) {
            return ResponseHelper.noContent();
        }

        if ((new Character('2')).equals(guardian.getBrhReqType())) {
            guardian.setBranchRequester(user.getOrganization().code);
        } else {
            guardian.setBranchResponder(user.getOrganization().code);
        }

        if (guardian.getBranchResponder() == null || guardian.getBranchResponder().equals("")) {
            guardian.setBranchResponder(guardian.getBranchInspLet());
        }
        if (guardian != null && guardian.geteRequestId() != null) {
            String protestDesc = guardianService.getEguardianReq(guardian.geteRequestId());
            guardian.setProtestDesc(protestDesc);
        } 
        if(guardian.getTechConfUserId()!= null && guardian.getTechConfUserId() != "" && guardian.getTechConfStatus() != null ){
             String technicalFullName =  guardianService.getInsuranceRegisteration(guardian.getTechConfUserId() , guardian.getBranchCode());
             guardian.setTechnicalFullName(technicalFullName);
        }else if (guardian.getTechConfStatus() != null && (guardian.getTechConfUserId() == null || guardian.getTechConfUserId() == "")){
            guardian.setTechnicalFullName("در دسترس نمی باشد");
        }
        return ResponseHelper.ok(guardian);
    }

    @Path("/eservices")
    @POST
    @RolesAllowed(Roles.ALL_USERS)
    public Response taminSave(Guardian t, @Context UriInfo ui, @Context SecurityContext sc, @Context HttpServletRequest request) throws
            WebApplicationException {
        try {
            Logger.getLogger(Guardian.class.getName()).log(Level.INFO, "before tamin saveeee ");
            Boolean result = guardianService.taminSave(t, sc.getUserPrincipal().getName());
            return ResponseHelper.ok(result);

        } catch (Exception e) {
            Logger.getLogger(Guardian.class
                    .getName()).log(Level.SEVERE, null, e);
            return ResponseHelper.serverError(e);
    }
    }

    @Path("/eservices/update")
    @POST
    @RolesAllowed(Roles.ALL_USERS)
    public Response taminUpdate(Guardian t, @Context UriInfo ui, @Context SecurityContext sc, @Context HttpServletRequest request) throws
            WebApplicationException {
        try {

            Boolean result = guardianService.taminUpdate(t, sc.getUserPrincipal().getName());
            return ResponseHelper.ok(result);

        } catch (Exception e) {
            Logger.getLogger(Guardian.class
                    .getName()).log(Level.SEVERE, null, e);
            return ResponseHelper.serverError(e);
        }
    }

    @GET
    @Path("/nationalId/{nationalId}/{guardianType}/{requestType}")
    @RolesAllowed(Roles.ALL_USERS)
    public Response getPortalRequests(
            @PathParam(value = "nationalId") String nationalId,
            @PathParam(value = "guardianType") String guardianType,
            @PathParam(value = "requestType") String requestType,
            @Context SecurityContext sc) throws WebApplicationException {

        return ResponseHelper.ok(guardianService.getRequests(nationalId, guardianType , requestType));
    }

}
