package ir.tamin.incomeBank.ws.rest.identityManager;

import ir.tamin.incomeBank.model.identityManager.UserRoleModel;
import ir.tamin.incomeBank.service.identityManager.UserBean;
import ir.tamin.incomeBank.ws.rest.Roles;
import ir.tamin.framework.ws.rest.ResponseHelper;
import javax.annotation.security.RolesAllowed;
import javax.enterprise.context.RequestScoped;
import javax.inject.Inject;
import javax.servlet.http.HttpServletRequest;
import javax.ws.rs.GET;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.Produces;
import javax.ws.rs.QueryParam;
import javax.ws.rs.WebApplicationException;
import javax.ws.rs.core.Context;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;
import javax.ws.rs.core.SecurityContext;
import javax.ws.rs.core.UriInfo;

/**
 *
 * @author s_maknooni
 */
@Path("/users")
@RequestScoped
@Produces(MediaType.APPLICATION_JSON)
public class UserRestService {

    @Inject
    private UserBean userBean;

    @GET
    @Path("/current-user")
    @RolesAllowed({Roles.ALL_USERS})
    public Response get(@Context SecurityContext context) {
        return ResponseHelper.ok(userBean.getUserByUserName(context.getUserPrincipal().getName()));
    }

    @GET
    @Path("/updateUserCache/{userName}")
    public Response updateUserCache(@PathParam("userName") String userName, @Context SecurityContext context) {
        return ResponseHelper.ok(userBean.updateUserCashe(userName));
    }

    @GET
    @Path("/checkUserRoles")
    @RolesAllowed({Roles.PUBLIC_USER})
    public Response checkUserRoles(@Context SecurityContext context) {
        UserRoleModel userRoleModel = new UserRoleModel();
        userRoleModel.setIsSupporter(context.isUserInRole(Roles.SUPPORTER));
        return ResponseHelper.ok(userRoleModel);
    }

    @GET
    @Path("getNameByNatCode")
    @RolesAllowed(Roles.PUBLIC_USER)
    public Response getUserByNatCode(@QueryParam("natCode") String natCode, @Context UriInfo uriInfo, @Context SecurityContext securityContext, @Context HttpServletRequest request) throws WebApplicationException {
        return ResponseHelper.ok(userBean.getUserByUserName(natCode).getFirstName() + " " + userBean.getUserByUserName(natCode).getLastName());
    }

    @GET
    @Path("/checkAccess")
    @RolesAllowed({Roles.SUPPORTER, Roles.MALI_SETAD_SHORTTERM_DOCUMENT})
    public Response checkAccess(@Context SecurityContext context) {
        boolean hasAccess = (context.isUserInRole(Roles.SUPPORTER) || context.isUserInRole(Roles.MALI_SETAD_SHORTTERM_DOCUMENT));
        return ResponseHelper.ok(hasAccess);
    }
}
