/**
 *
 * @author h_riazat
 */
package ir.tamin.incomeBank.ws.rest.daramadBank;

import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;
import javax.enterprise.context.RequestScoped;
import javax.inject.Inject;
import javax.ws.rs.Consumes;
import javax.ws.rs.core.Response;
import javax.ws.rs.core.SecurityContext;
import javax.ws.rs.core.UriInfo;
import javax.servlet.http.HttpServletRequest;
import javax.ws.rs.WebApplicationException;
import ir.tamin.framework.ws.rest.ResponseHelper;
import ir.tamin.framework.ws.rest.json.FilterWrapper;
import ir.tamin.framework.ws.rest.json.SortWrapper;
import ir.tamin.incomeBank.model.daramadBank.DrmdSorat;
import ir.tamin.incomeBank.model.daramadBank.DrmdSoratPK;
import ir.tamin.incomeBank.service.daramadBank.DrmdSoratService;
import ir.tamin.incomeBank.service.identityManager.UserBean;
import ir.tamin.incomeBank.ws.rest.ResourceRESTService;
import ir.tamin.incomeBank.ws.rest.Roles;
import javax.annotation.security.RolesAllowed;
import javax.ws.rs.GET;
import javax.ws.rs.PathParam;
import javax.ws.rs.core.Context;
import ir.tamin.incomeBank.model.identityManager.User;
import javax.ws.rs.PUT;
import ir.tamin.incomeBank.service.common.CommonService;
import ir.tamin.framework.cdi.util.MessageBundle;
import ir.tamin.framework.core.util.Bundle;

@Path("/drmdSorat")
@Produces(MediaType.APPLICATION_JSON)
@Consumes(MediaType.APPLICATION_JSON)
@RequestScoped
public class DrmdSoratRestService implements ResourceRESTService<DrmdSorat> {

    @Inject
    DrmdSoratService drmdSoratService;

    @Inject
    UserBean userBean;

    @Inject
    CommonService commonService;

    @Inject
    @MessageBundle
    Bundle messageBundle;

    @Override
    public Response get(String id, UriInfo uriInfo, SecurityContext securityContext, HttpServletRequest request) throws WebApplicationException {
        throw new UnsupportedOperationException("Not supported yet."); //To change body of generated methods, choose Tools | Templates.
    }

    @GET
    @Path("/{soratRow}/{brchCode}")
    @RolesAllowed({Roles.MALI_BRANCH_DRMD_USER, Roles.MALI_SETAD_DRMD_USER})
    public Response getDrmdSorat(@PathParam("soratRow") Integer soratRow, @PathParam("brchCode") String brchCode, @Context UriInfo uriInfo, @Context SecurityContext securityContext,
            @Context HttpServletRequest request) throws WebApplicationException {
        DrmdSoratPK drmdSoratPK = new DrmdSoratPK(soratRow, brchCode);
        return ResponseHelper.ok(drmdSoratService.get(drmdSoratPK));
    }

    @Override
    public Response getAll(FilterWrapper filterWrapper, Integer start, Integer limit, SortWrapper sortWrapper, UriInfo uriInfo, SecurityContext securityContext, HttpServletRequest request) throws WebApplicationException {
        throw new UnsupportedOperationException("Not supported yet."); //To change body of generated methods, choose Tools | Templates.
    }

    @Override
    public Response save(DrmdSorat t, UriInfo uriInfo, SecurityContext securityContext, HttpServletRequest request) throws WebApplicationException {
        throw new UnsupportedOperationException("Not supported yet."); //To change body of generated methods, choose Tools | Templates.
    }

    @PUT
    @Path("/{soratRow}/{brchCode}")
    @RolesAllowed(Roles.MALI_BRANCH_DRMD_USER)
    public Response editBranchDesc(@PathParam("soratRow") Integer soratRow, @PathParam("brchCode") String brchCode, DrmdSorat drmdSoratNew, @Context UriInfo uriInfo, @Context SecurityContext securityContext,
            @Context HttpServletRequest request) throws WebApplicationException {
        User user = userBean.getUserByUserName(securityContext.getUserPrincipal().getName());
        boolean authResult = commonService.checkUserAccessibility(brchCode, user);
        if (!authResult) {
            Response response = Response.status(Response.Status.FORBIDDEN).entity(messageBundle.getProperty("coreaccount.daramadbank.EXC_INVALID_USER_BRANCH")).build();
            return ResponseHelper.ok(response);
        } else {
            DrmdSoratPK drmdSoratPK = new DrmdSoratPK(soratRow, brchCode);
            DrmdSorat drmdSorat = drmdSoratService.get(drmdSoratPK);
            drmdSorat.setSoratDesc(drmdSoratNew.getSoratDesc());
            return ResponseHelper.ok(drmdSoratService.editBranchDesc(drmdSorat));
        }
    }

    @Override
    public Response edit(String id, DrmdSorat t, UriInfo uriInfo, SecurityContext securityContext, HttpServletRequest request) throws WebApplicationException {
        throw new UnsupportedOperationException("Not supported yet."); //To change body of generated methods, choose Tools | Templates.
    }

    @Override
    public Response remove(String id, UriInfo uriInfo, SecurityContext securityContext, HttpServletRequest request) throws WebApplicationException {
        throw new UnsupportedOperationException("Not supported yet."); //To change body of generated methods, choose Tools | Templates.
    }

}
