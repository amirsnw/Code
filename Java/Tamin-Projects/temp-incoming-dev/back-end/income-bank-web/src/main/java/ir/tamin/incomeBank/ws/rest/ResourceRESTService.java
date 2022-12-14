/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package ir.tamin.incomeBank.ws.rest;

import ir.tamin.framework.ws.rest.json.FilterWrapper;
import ir.tamin.framework.ws.rest.json.SortWrapper;
import javax.servlet.http.HttpServletRequest;
import javax.ws.rs.Consumes;
import javax.ws.rs.DELETE;
import javax.ws.rs.GET;
import javax.ws.rs.POST;
import javax.ws.rs.PUT;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.Produces;
import javax.ws.rs.QueryParam;
import javax.ws.rs.WebApplicationException;
import javax.ws.rs.core.Context;
import javax.ws.rs.core.Response;
import javax.ws.rs.core.SecurityContext;
import javax.ws.rs.core.UriInfo;

/**
 *
 * @author s_maknooni
 */
@Produces({"application/json"})
public abstract interface ResourceRESTService<T> {

    @GET
    @Path("/{id}")
    public abstract Response get(@PathParam("id") String id, @Context UriInfo uriInfo, @Context SecurityContext securityContext, @Context HttpServletRequest request)
            throws WebApplicationException;

    @GET
    public abstract Response getAll(@QueryParam("filter") FilterWrapper filterWrapper, @QueryParam("start") Integer start, @QueryParam("limit") Integer limit, @QueryParam("sort") SortWrapper sortWrapper, @Context UriInfo uriInfo, @Context SecurityContext securityContext, @Context HttpServletRequest request)
            throws WebApplicationException;

    @POST
    @Consumes({"application/json"})
    public abstract Response save(T t, @Context UriInfo uriInfo, @Context SecurityContext securityContext, @Context HttpServletRequest request)
            throws WebApplicationException;

    @PUT
    @Path("/{id}")
    @Consumes({"application/json"})
    public abstract Response edit(@PathParam("id") String id, T t, @Context UriInfo uriInfo, @Context SecurityContext securityContext, @Context HttpServletRequest request)
            throws WebApplicationException;

    @DELETE
    @Path("/{id}")
    public abstract Response remove(@PathParam("id") String id, @Context UriInfo uriInfo, @Context SecurityContext securityContext, @Context HttpServletRequest request)
            throws WebApplicationException;

    public static enum ResourceMethod {

        GET("get"), GET_ALL("getAll"), SAVE("save"), EDIT("edit"), REMOVE("remove");

        private String method;

        private ResourceMethod(String method) {
            this.method = method;
        }

        public String getMethod() {
            return this.method;
        }
    }
}
