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
import ir.tamin.incomeBank.service.daramadBank.IncomingLetterOfficeService;
import javax.enterprise.context.RequestScoped;
import javax.inject.Inject;
import javax.ws.rs.Consumes;
import javax.ws.rs.GET;
import javax.ws.rs.Path;
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
 * @author e_shoghi
 */
@Path("/incoming-letter-office")
@Produces(MediaType.APPLICATION_JSON)
@Consumes(MediaType.APPLICATION_JSON)
@RequestScoped
public class IncomingLetterOfficeRESTService {

    @Inject
    IncomingLetterOfficeService service;

    
    @GET
    public Response getAll(@QueryParam(value = "query") FilterWrapper query, @QueryParam(value = "filter") FilterWrapper fw, @QueryParam(value = "start") Integer start, @QueryParam(value = "limit") Integer limit, @QueryParam(value = "sort") SortWrapper sw, @Context UriInfo ui, @Context SecurityContext sc) throws WebApplicationException {

        if (query != null) { // search in Combo
            if (fw == null) {
                fw = query;
            } else if (fw.getFilters() != null) {
                for (Filter queryFilter : query.getFilters()) {
                    fw.getFilters().add(queryFilter);
                }
            } else {
                fw.setFilters(query.getFilters());
            }
        }
        return ResponseHelper.ok(service.getAll(fw, start, limit, sw));
    }
}
