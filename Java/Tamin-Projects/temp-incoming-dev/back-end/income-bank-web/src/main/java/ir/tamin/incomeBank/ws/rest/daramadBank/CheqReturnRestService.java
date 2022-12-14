/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package ir.tamin.incomeBank.ws.rest.daramadBank;

import ir.tamin.incomeBank.model.daramadBank.CheqReturn;
import ir.tamin.incomeBank.model.identityManager.User;
import ir.tamin.incomeBank.service.daramadBank.CheqReturnService;
import ir.tamin.incomeBank.service.identityManager.UserBean;
import ir.tamin.incomeBank.ws.rest.ResourceRESTService;
import ir.tamin.incomeBank.ws.rest.Roles;
import ir.tamin.framework.ws.rest.ResponseHelper;
import ir.tamin.framework.ws.rest.json.FilterWrapper;
import ir.tamin.framework.ws.rest.json.SortWrapper;
import javax.annotation.security.RolesAllowed;
import javax.enterprise.context.RequestScoped;
import javax.inject.Inject;
import javax.servlet.http.HttpServletRequest;
import javax.ws.rs.Consumes;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.WebApplicationException;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;
import javax.ws.rs.core.SecurityContext;
import javax.ws.rs.core.UriInfo;

/**
 *
 * @author f_fotuhi
 */
@Path("/cheqReturn")
@Produces(MediaType.APPLICATION_JSON)
@Consumes(MediaType.APPLICATION_JSON)
@RequestScoped
public class CheqReturnRestService implements ResourceRESTService<CheqReturn> {

    @Inject
    CheqReturnService service;
    
    @Inject
    UserBean userBean;

    @Override
    public Response get(String id, UriInfo uriInfo, SecurityContext securityContext, HttpServletRequest request) throws WebApplicationException {
        throw new UnsupportedOperationException("Not supported yet."); //To change body of generated methods, choose Tools | Templates.
    }

    @Override
    public Response getAll(FilterWrapper filterWrapper, Integer start, Integer limit, SortWrapper sortWrapper, UriInfo uriInfo, SecurityContext securityContext, HttpServletRequest request) throws WebApplicationException {
        throw new UnsupportedOperationException("Not supported yet."); //To change body of generated methods, choose Tools | Templates.
    }

    @Override
    @RolesAllowed(Roles.MALI_SETAD_DRMD_USER)
    public Response save(CheqReturn t, UriInfo uriInfo, SecurityContext securityContext, HttpServletRequest request) throws WebApplicationException {

        User user = userBean.getUserByUserName(securityContext.getUserPrincipal().getName());
        t.setReturnUserID(user.getUserName());
        return ResponseHelper.ok(service.save(t));
    }

    @Override
    public Response edit(String id, CheqReturn t, UriInfo uriInfo, SecurityContext securityContext, HttpServletRequest request) throws WebApplicationException {
        throw new UnsupportedOperationException("Not supported yet."); //To change body of generated methods, choose Tools | Templates.
    }

    @Override
    @RolesAllowed(Roles.MALI_SETAD_DRMD_USER)
    public Response remove(String id, UriInfo uriInfo, SecurityContext securityContext, HttpServletRequest request) throws WebApplicationException {
        int index = id.indexOf('-');
        String ordOrdno = id.substring(0, index);
        String orpOrdrow = id.substring(index + 1);

        User user = userBean.getUserByUserName(securityContext.getUserPrincipal().getName());       
        return ResponseHelper.ok(service.delete(service.get(ordOrdno, orpOrdrow),user.getUserName()));
    }

}
