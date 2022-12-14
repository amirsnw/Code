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
import ir.tamin.incomeBank.model.daramadBank.VwDftLetterB;
import ir.tamin.incomeBank.service.daramadBank.VwDftLetterBService;
import ir.tamin.incomeBank.service.identityManager.UserBean;
import ir.tamin.incomeBank.ws.rest.ResourceRESTService;
import ir.tamin.incomeBank.ws.rest.Roles;
import java.io.IOException;
import javax.annotation.security.RolesAllowed;
import javax.ws.rs.GET;
import javax.ws.rs.core.Context;
import ir.tamin.incomeBank.model.identityManager.User;

@Path("/vwDftLetterB")
@Produces(MediaType.APPLICATION_JSON)
@Consumes(MediaType.APPLICATION_JSON)
@RequestScoped
public class VwDftLetterBRestService implements ResourceRESTService<VwDftLetterB> {

    @Inject
    VwDftLetterBService vwDftLetterBService;

    @Inject
    UserBean userBean;

    @Override
    public Response get(String id, UriInfo uriInfo, SecurityContext securityContext, HttpServletRequest request) throws WebApplicationException {
        throw new UnsupportedOperationException("Not supported yet."); //To change body of generated methods, choose Tools | Templates.
    }

    @RolesAllowed({Roles.MALI_BRANCH_DRMD_USER, Roles.MALI_SETAD_DRMD_USER})
    @Override
    public Response getAll(FilterWrapper filterWrapper, Integer start, Integer limit, SortWrapper sortWrapper, UriInfo uriInfo, SecurityContext securityContext, HttpServletRequest request) throws WebApplicationException {
        return ResponseHelper.ok(vwDftLetterBService.getAll(filterWrapper, start, limit, sortWrapper));
    }

    @Override
    public Response save(VwDftLetterB t, UriInfo uriInfo, SecurityContext securityContext, HttpServletRequest request) throws WebApplicationException {
        throw new UnsupportedOperationException("Not supported yet."); //To change body of generated methods, choose Tools | Templates.
    }

    @Override
    public Response edit(String id, VwDftLetterB t, UriInfo uriInfo, SecurityContext securityContext, HttpServletRequest request) throws WebApplicationException {
        throw new UnsupportedOperationException("Not supported yet."); //To change body of generated methods, choose Tools | Templates.
    }

    @Override
    public Response remove(String id, UriInfo uriInfo, SecurityContext securityContext, HttpServletRequest request) throws WebApplicationException {
        throw new UnsupportedOperationException("Not supported yet."); //To change body of generated methods, choose Tools | Templates.
    }

    @GET
    @Path("/pdfReport")
    @Produces("application/pdf")
    @RolesAllowed({Roles.MALI_BRANCH_DRMD_USER, Roles.MALI_SETAD_DRMD_USER})
    public Response exportToPdf(@Context SecurityContext context, @Context HttpServletRequest request) throws IOException {
        User user = userBean.getUserByUserName(context.getUserPrincipal()
                .getName());
        byte[] byteStream = vwDftLetterBService.exportToPdf(request, user);
        return Response
                .ok(byteStream)
                .header("Content-Type", "application/pdf")
                .build();
    }

}
