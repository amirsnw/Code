package ir.tamin.insurance.technical.ws.rest;

import ir.tamin.framework.ws.rest.ResourceRESTService;
import ir.tamin.framework.ws.rest.ResponseHelper;
import ir.tamin.framework.ws.rest.json.FilterWrapper;
import ir.tamin.framework.ws.rest.json.Sort;
import ir.tamin.framework.ws.rest.json.SortWrapper;
import ir.tamin.framework.ws.rest.security.RolesAllowed;
import ir.tamin.insurance.technical.business.general.RestServices;
import ir.tamin.insurance.technical.model.Roles;
import ir.tamin.insurance.technical.model.baseinfo.ItemPageOim;
import ir.tamin.insurance.technical.model.insurance.InsuranceRegisteration;
import ir.tamin.insurance.technical.service.RegInsuranceSpecService;

import javax.enterprise.context.RequestScoped;
import javax.inject.Inject;
import javax.servlet.http.HttpServletRequest;
import javax.ws.rs.*;
import javax.ws.rs.core.*;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

@Path("/insurance")
@Produces(MediaType.APPLICATION_JSON)
@RequestScoped
public class RegInsuranceSpecRESTService implements ResourceRESTService<InsuranceRegisteration> {

    @Inject
    RegInsuranceSpecService riss;

    @Inject
    private RestServices rs;

    @GET
    @Path("/data")
    @Produces({MediaType.APPLICATION_JSON})
    @RolesAllowed(Roles.ALL_USERS)
    public Response getRegInsuranceSpecWithNationaCode(@QueryParam("nationalCode") String nationalCode) throws SQLException {

        if (nationalCode == null || nationalCode.length() != 10) {
            return null;
        } else {
            return ResponseHelper.ok(riss.getRegInsuranceSpecWithNationaCode(nationalCode));
        }
    }

    @GET
    @Path("/foreignData")
    @Produces({MediaType.APPLICATION_JSON})
    @RolesAllowed(Roles.ALL_USERS)
    public Response getRegInsuranceSpecWithForeignCode(@QueryParam("foreignCode") String foreignCode) throws SQLException {

        if (foreignCode == null ) {
            return null;
        } else {
            return ResponseHelper.ok(riss.getRegInsuranceSpecWithForeignCode(foreignCode));
        }
    }

    @GET
    @Path("/city")
    @Produces({MediaType.APPLICATION_JSON})
    @RolesAllowed(Roles.ALL_USERS)
    public Response getCities(@QueryParam("filter") FilterWrapper fw, @QueryParam("start") Integer start, @QueryParam("limit") Integer limit, @QueryParam("sort") SortWrapper sw, @Context SecurityContext sc) throws SQLException, Exception {

        Set<Sort> ss = new HashSet<>();
        List<Sort> ls = new ArrayList<>();
        Sort s = new Sort();
        s.setDirection(Sort.Direction.ASC);
        s.setProperty("description");
        ss.add(s);

        sw = new SortWrapper();
        sw.setSortSet(ss);

        return ResponseHelper.ok(rs.getCitiesMap(fw, sw, start, limit));
    }

    @GET
    @Path("/province")
    @Produces({MediaType.APPLICATION_JSON})
    @RolesAllowed(Roles.ALL_USERS)
    public Response getProvinces(@QueryParam("filter") FilterWrapper fw, @QueryParam("start") Integer start, @QueryParam("limit") Integer limit, @QueryParam("sort") SortWrapper sw, @Context SecurityContext sc) throws SQLException, Exception {

        Set<Sort> ss = new HashSet<>();
        List<Sort> ls = new ArrayList<>();
        Sort s = new Sort();
        s.setDirection(Sort.Direction.ASC);
        s.setProperty("description");
        ss.add(s);

        sw = new SortWrapper();
        sw.setSortSet(ss);

        return ResponseHelper.ok(rs.getProvinceMap(fw, sw, start, limit));
    }

    @Override
    public Response get(String string, UriInfo ui, SecurityContext sc, HttpServletRequest request) throws
            WebApplicationException {
        throw new UnsupportedOperationException("Not supported yet."); //To change body of generated methods, choose Tools | Templates.
    }

    @Override
    @RolesAllowed(Roles.ALL_USERS)
    public Response getAll(FilterWrapper fw, Integer start, Integer limit, SortWrapper sw, UriInfo ui,
            SecurityContext sc, HttpServletRequest request) throws WebApplicationException {
        return ResponseHelper.ok(riss.getAll(fw, start, limit, sw, sc.getUserPrincipal().getName()));
    }

    @Override
    public Response save(InsuranceRegisteration t, UriInfo ui, SecurityContext sc, HttpServletRequest request) throws
            WebApplicationException {
        throw new UnsupportedOperationException("Not supported yet."); //To change body of generated methods, choose Tools | Templates.
    }

    @Override
    public Response edit(String string, InsuranceRegisteration t, UriInfo ui, SecurityContext sc, HttpServletRequest request) throws WebApplicationException {
        throw new UnsupportedOperationException("Not supported yet."); //To change body of generated methods, choose Tools | Templates.
    }

    @Override
    public Response remove(String string, UriInfo ui, SecurityContext sc, HttpServletRequest request) throws
            WebApplicationException {
        throw new UnsupportedOperationException("Not supported yet."); //To change body of generated methods, choose Tools | Templates.
    }

    @GET
    @Path("/cities/item-page")
    public Response getAllItemPage(@QueryParam("code") String code, @QueryParam("limit") String limit) throws WebApplicationException {
        // ItemPageOim l = rs.getAllItemPage(code, limit);
        ItemPageOim map = rs.getCitiesMapItemPage(code, limit);
        return ResponseHelper.ok(map);
    }
}
