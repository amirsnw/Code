/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package ir.tamin.incomeBank.ws.rest.baseinfo;

import ir.tamin.incomeBank.model.centralPayment.enums.PayStepEnum;
import ir.tamin.incomeBank.ws.rest.Roles;
import ir.tamin.framework.ws.rest.ResponseHelper;
import ir.tamin.framework.ws.rest.json.Filter;
import ir.tamin.framework.ws.rest.json.FilterWrapper;
import ir.tamin.framework.ws.rest.json.SortWrapper;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
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
 * @author s_maknooni
 */
@Path("/paySteps")
@Produces(MediaType.APPLICATION_JSON)
@Consumes(MediaType.APPLICATION_JSON)
@RequestScoped
public class PaySTepEnumRestService {

    @GET
    @RolesAllowed(Roles.PUBLIC_USER)
    public Response getAll(@QueryParam(value = "query") FilterWrapper query, @QueryParam(value = "filter") FilterWrapper fw, @QueryParam(value = "start") Integer start, @QueryParam(value = "limit") Integer limit, @QueryParam(value = "sort") SortWrapper sw, @Context UriInfo ui, @Context HttpServletRequest request) throws WebApplicationException {
        Map<String, Object> map = new HashMap<>();
        String value = "";
        if (query != null && query.getFilters() != null && query.getFilters().size() == 1) {
            for (Filter filter : query.getFilters()) {
                if ("codeName".equals(filter.getProperty())) {
                    value = filter.getValue().replaceAll("%", "");
                    map.put("list", PayStepEnum.getEnum(value));
                    map.put("total", PayStepEnum.values().length);
                }
                if ("code".equals(filter.getProperty())) {
                    value = filter.getValue();
                    List<Map> list = new ArrayList<>();
                    list.add(PayStepEnum.getEnum(PayStepEnum.find(value.charAt(0)).getName()).get(0));
                    list.add(PayStepEnum.getEnum(PayStepEnum.find(value.charAt(1)).getName()).get(0));

                    map.put("list", list);
                    map.put("total", list.size());

                }
            }
        } else {
            map.put("list", PayStepEnum.getEnum(value));
            map.put("total", PayStepEnum.values().length);
        }

        return ResponseHelper.ok(map);
    }

}
