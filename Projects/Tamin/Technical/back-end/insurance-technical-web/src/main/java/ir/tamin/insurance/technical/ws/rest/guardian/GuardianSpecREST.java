package ir.tamin.insurance.technical.ws.rest.guardian;

import ir.tamin.framework.domain.proxy.ProxyProcessingException;
import ir.tamin.framework.ws.rest.ResponseHelper;
import ir.tamin.framework.ws.rest.Roles;
import ir.tamin.framework.ws.rest.json.FilterWrapper;
import ir.tamin.framework.ws.rest.proxy.EntityProxy;
import ir.tamin.insurance.technical.model.guardian.GuardianDocument;
import ir.tamin.insurance.technical.service.GuardianService;

import javax.annotation.security.RolesAllowed;
import javax.enterprise.context.RequestScoped;
import javax.inject.Inject;
import javax.inject.Named;
import javax.ws.rs.*;
import javax.ws.rs.core.Context;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;
import javax.ws.rs.core.SecurityContext;

/**
 *
 * @author m_hoseini
 */
@Path("/guardian-spec")
@Produces(MediaType.APPLICATION_JSON)
@Consumes(MediaType.APPLICATION_JSON)
@RequestScoped
public class GuardianSpecREST {// mishe war filei ke paeen hast ro neshun bedid

    @Inject
    private GuardianService guardianService;
    
    @Inject
    @Named("GuardianTranslogProxy")
    private EntityProxy guardianManager;

    @GET
    @RolesAllowed({Roles.DEFAULT_ROLE})
    public Response getSandPayInfo(@QueryParam("guardianNationalCode") String gnationalCode,
            @QueryParam("guardianNationalCode2") String gnationalCode2,
            @QueryParam("guardianType") String guardianType,
            @QueryParam("reqSerial") String reqSerial,
            @QueryParam("eRequestId") String eRequestId) throws ProxyProcessingException, Exception {
        try {
            return ResponseHelper.ok(guardianService.getGuardianSpecService(gnationalCode, gnationalCode2, guardianType, reqSerial , eRequestId));           
        } catch (Exception e) {
            throw new Exception(e.getMessage());
        }
    }

    @DELETE
    @RolesAllowed({Roles.DEFAULT_ROLE})
    @Path("/delete-document/{guid}")
    public Response getSandPayInfo(@PathParam("guid") String imageGuid) throws ProxyProcessingException {
        guardianService.deleteGuardianDocument(imageGuid);
        return ResponseHelper.ok();
    }
}
