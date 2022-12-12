//package ir.tamin.insurance.technical.ws.rest.baseinfo;
//
//import ir.tamin.framework.ws.rest.ResourceRESTService;
//import ir.tamin.framework.ws.rest.ResponseHelper;
//import ir.tamin.framework.ws.rest.json.FilterWrapper;
//import ir.tamin.framework.ws.rest.json.SortWrapper;
//import ir.tamin.insurance.technical.model.baseinfo.City;
//import ir.tamin.insurance.technical.business.baseinfo.CityService;
//import ir.tamin.portal.model.org.User;
//import javax.annotation.security.RolesAllowed;
//import javax.enterprise.context.RequestScoped;
//import javax.inject.Inject;
//import javax.ws.rs.Path;
//import javax.ws.rs.Produces;
//import javax.ws.rs.WebApplicationException;
//import javax.ws.rs.core.MediaType;
//import javax.ws.rs.core.Response;
//import javax.ws.rs.core.SecurityContext;
//
//import javax.ws.rs.core.UriInfo;
//
///**
// *
// * @author m_hoseini
// */
//@Path("/city")
//@RequestScoped
//@Produces(MediaType.APPLICATION_JSON)
//public class CityRESTService implements GeneralResourceRESTService<City> {
//
//    @Inject
//    CityService cityService;
//
//    @Inject
//    UserCache userCache;
//
//    @Override
//    @RolesAllowed({Roles.ALL_USERS})
//    public Response get(String string, UriInfo ui, SecurityContext sc) throws WebApplicationException {
//        return ResponseHelper.ok(cityService.getCityById(string));
//    }
//
//    @Override
//    @RolesAllowed({Roles.ALL_USERS})
//    public Response getAll(FilterWrapper fw, Integer intgr, Integer intgr1, SortWrapper sw, UriInfo ui, SecurityContext securityContext) throws WebApplicationException {
//        User userPortal = null;
//        try {
//            userPortal = userCache.getUserByUsername(securityContext.getUserPrincipal().getName());
//        } catch (Exception e) {
//            e.printStackTrace();
//        }
//        return ResponseHelper.ok(cityService.getCities(fw, intgr, intgr1, sw, userPortal.getOrganization().getCode()));
//    }
//
//    @Override
//    public Response save(City t, UriInfo ui, SecurityContext sc) throws WebApplicationException {
//        throw new UnsupportedOperationException("Not supported yet.");
//    }
//
//    @Override
//    public Response edit(String string, City t, UriInfo ui, SecurityContext sc) throws WebApplicationException {
//        throw new UnsupportedOperationException("Not supported yet.");
//    }
//
//    @Override
//    public Response remove(String string, UriInfo ui, SecurityContext sc) throws WebApplicationException {
//        throw new UnsupportedOperationException("Not supported yet.");
//    }
//
//}
