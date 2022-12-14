package ir.tamin.incomeBank.ws.rest.telegraph;

import ir.tamin.framework.ws.rest.ResponseHelper;
import ir.tamin.framework.ws.rest.json.FilterWrapper;
import ir.tamin.framework.ws.rest.json.SortWrapper;
import ir.tamin.incomeBank.model.telegraph.TelSumDaily;
import ir.tamin.incomeBank.service.telegraph.TelSumDailyService;
import ir.tamin.incomeBank.ws.rest.Roles;
import org.apache.poi.ss.usermodel.Workbook;

import javax.annotation.security.RolesAllowed;
import javax.enterprise.context.RequestScoped;
import javax.inject.Inject;
import javax.servlet.http.HttpServletRequest;
import javax.ws.rs.*;
import javax.ws.rs.core.*;
import java.io.IOException;
import java.io.OutputStream;
import java.sql.SQLException;
import java.util.List;

@Path("/telSumDaily")
@RequestScoped
@Produces(MediaType.APPLICATION_JSON)
public class TelSumDailyRESTService {

    @Inject
    TelSumDailyService service;

    @GET
    @Path("/getAll")
    @RolesAllowed({Roles.ALL_USERS})
    public Response getTelSumDaily(@QueryParam("filter") FilterWrapper filterWrapper,
                                   @QueryParam("start") Integer start,
                                   @QueryParam("limit") Integer limit,
                                   @QueryParam("sort") SortWrapper sort,
                                   @Context SecurityContext sc) throws Exception {

        return ResponseHelper.ok(service.getAll(filterWrapper, start, limit, sort));
    }

    @GET
    @Path("/get-sum")
    // @RolesAllowed({Roles.MALI_SETAD_DRMD_USER, Roles.MALI_BRANCH_DRMD_USER})
    public Response getAll(@QueryParam("filters") FilterWrapper filterWrapper,
                           @Context UriInfo ui,
                           @Context HttpServletRequest request,
                           @Context SecurityContext sc)
            throws WebApplicationException, IOException, SQLException {

        return ResponseHelper.ok(service.getSummery(filterWrapper));
    }

    @GET
    @Produces("application/vnd.ms-excel")
    @Path("/excel-export")
    @RolesAllowed({Roles.ALL_USERS})
    public Response excelReportHeader(@QueryParam("filter") FilterWrapper filterWrapper,
                                      @QueryParam("start") Integer start,
                                      @QueryParam("limit") Integer limit,
                                      @QueryParam("sort") SortWrapper sort,
                                      @Context UriInfo ui,
                                      @Context SecurityContext sc) throws Exception {

        return Response.ok(service.loadExcel(filterWrapper)).build();
    }
}
