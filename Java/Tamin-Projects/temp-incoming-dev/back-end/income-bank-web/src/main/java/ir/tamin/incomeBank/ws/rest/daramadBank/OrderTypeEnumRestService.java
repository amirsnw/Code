/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package ir.tamin.incomeBank.ws.rest.daramadBank;

import ir.tamin.framework.ws.rest.ResponseHelper;
import ir.tamin.framework.ws.rest.json.Filter;
import ir.tamin.framework.ws.rest.json.FilterWrapper;
import ir.tamin.framework.ws.rest.json.SortWrapper;
import ir.tamin.incomeBank.model.daramadBank.enums.OrderTypeEnum;
import ir.tamin.incomeBank.ws.rest.Roles;
import java.util.HashMap;
import java.util.Map;
import javax.annotation.security.RolesAllowed;
import javax.enterprise.context.RequestScoped;
import javax.servlet.http.HttpServletRequest;
import javax.ws.rs.Consumes;
import javax.ws.rs.GET;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.QueryParam;
import javax.ws.rs.WebApplicationException;
import javax.ws.rs.core.Context;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;
import javax.ws.rs.core.UriInfo;

/**
 *
 * @author e_shoghi
 */
@Path("/order-type")
@Produces(MediaType.APPLICATION_JSON)
@Consumes(MediaType.APPLICATION_JSON)
@RequestScoped
public class OrderTypeEnumRestService {
        @GET
    @RolesAllowed({Roles.MALI_SETAD_DRMD_USER,Roles.MALI_BRANCH_DRMD_USER})
    public Response getAll(@QueryParam(value = "query") FilterWrapper query, @QueryParam(value = "filter") FilterWrapper fw, @QueryParam(value = "start") Integer start, @QueryParam(value = "limit") Integer limit, @QueryParam(value = "sort") SortWrapper sw, @Context UriInfo ui, @Context HttpServletRequest request) throws WebApplicationException {
        Map<String, Object> map = new HashMap<>();
        String value = "";
        if (query != null && query.getFilters() != null && query.getFilters().size() == 1) {
            for (Filter filter : query.getFilters()) {
                if ("codeName".equals(filter.getProperty())) {
                    value = filter.getValue().replaceAll("%", "");
                }
            }
        }
        map.put("list", OrderTypeEnum.getEnum(value));
        map.put("total", OrderTypeEnum.values().length);
        return ResponseHelper.ok(map);
    }
}
