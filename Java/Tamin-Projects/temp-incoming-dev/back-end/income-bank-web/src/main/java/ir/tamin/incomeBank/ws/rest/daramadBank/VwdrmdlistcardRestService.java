/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package ir.tamin.incomeBank.ws.rest.daramadBank;

import com.healthmarketscience.jackcess.Database;
import ir.tamin.incomeBank.model.daramadBank.Vwdrmdlistcard;
import ir.tamin.incomeBank.service.daramadBank.VwdrmdlistcardService;
import ir.tamin.incomeBank.util.DateUtils;
import ir.tamin.incomeBank.ws.rest.Roles;
import ir.tamin.framework.ws.rest.ResponseHelper;
import ir.tamin.framework.ws.rest.json.Filter;
import ir.tamin.framework.ws.rest.json.FilterWrapper;
import ir.tamin.framework.ws.rest.json.SortWrapper;
import java.io.FileInputStream;
import java.io.IOException;
import java.io.OutputStream;
import java.sql.SQLException;
import java.util.HashSet;
import java.util.List;
import java.util.Map;
import javax.annotation.security.RolesAllowed;
import javax.enterprise.context.RequestScoped;
import javax.inject.Inject;
import javax.servlet.http.HttpServletRequest;
import javax.ws.rs.Consumes;
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
import javax.ws.rs.core.StreamingOutput;
import javax.ws.rs.core.UriInfo;
import org.apache.poi.ss.usermodel.Workbook;

/**
 *
 * @author m_salami
 */
@Path("/vwdrmdlistcard")
@Produces(MediaType.APPLICATION_JSON)
@Consumes(MediaType.APPLICATION_JSON)
@RequestScoped
public class VwdrmdlistcardRestService{

    @Inject
    VwdrmdlistcardService service;


    @GET
    @Path("/get/{brchCode}/{cardRow}")
    @RolesAllowed(Roles.MALI_BRANCH_DRMD_USER)
    public Response getAllCard(@PathParam(value = "brchCode") String brchCode, @PathParam(value = "cardRow") String cardRow, @QueryParam(value = "filter") FilterWrapper filter, @QueryParam(value = "start") Integer start, @QueryParam(value = "limit") Integer limit, @QueryParam(value = "sort") SortWrapper sort, @Context UriInfo ui, @Context SecurityContext securityContext, @Context HttpServletRequest request) throws WebApplicationException {

        if (filter == null) {
            filter = new FilterWrapper();
            filter.setFilters(new HashSet<Filter>());
        }
        Filter f = new Filter();
        f.setOperator(Filter.Operator.EQUAL);
        f.setProperty("vwdrmdlistcardPK.brchCode");
        f.setValue(brchCode);
        filter.getFilters().add(f);
        f = new Filter();
        f.setOperator(Filter.Operator.EQUAL);
        f.setProperty("vwdrmdlistcardPK.cardRow");
        f.setValue(cardRow);
        filter.getFilters().add(f);
        Map<String, Object> result = service.getAll(filter, start, limit, sort);
        List<Vwdrmdlistcard> list = (List) result.get("list");
        for (Vwdrmdlistcard drmdcard : list) {
            drmdcard.setCardDateTimeStamp(DateUtils.convertDateToTimestampString(DateUtils.convertPersianDateStringToDate(drmdcard.getCardDate())));
        }
        result.put("list", list);
        return ResponseHelper.ok(result);
    }

    @GET
    @RolesAllowed(Roles.MALI_BRANCH_DRMD_USER)
    public Response getAll(@QueryParam(value = "filter") FilterWrapper filterWrapper,@QueryParam(value = "start") Integer start,@QueryParam(value = "limit") Integer limit,@QueryParam(value = "sort") SortWrapper sortWrapper,@Context UriInfo uriInfo,@Context SecurityContext securityContext,@Context HttpServletRequest request) throws WebApplicationException {
        return ResponseHelper.ok(service.getAll(filterWrapper, start, limit, sortWrapper));
}

    @GET
    @Path("/exportToExcel")
    @Produces("application/vnd.ms-excel")
    public Response doExcel(@QueryParam("filter") FilterWrapper filterWrapper, @Context UriInfo ui, @Context HttpServletRequest request, @Context SecurityContext sc) throws WebApplicationException, IOException {

        final Workbook workbook = service.writeToExcel(filterWrapper, null, null, null);

        StreamingOutput output = new StreamingOutput() {

            @Override
            public void write(java.io.OutputStream output) throws IOException, WebApplicationException {
                workbook.write(output);
                output.close();
            }

        };
        String fileName = "daramadcard.xlsx";
        return Response.ok(output).header("Content-Disposition", "attachment; filename=" + fileName).build();

    }

    @GET
    @Path("/exportToXml")
    @Produces("application/xml")
    public Response doXml(@QueryParam("filter") FilterWrapper filterWrapper, @Context HttpServletRequest request, @Context SecurityContext sc) throws WebApplicationException, IOException {

        final String xml = service.writeToXml(filterWrapper, null, null, null);
        StreamingOutput output = new StreamingOutput() {
            @Override
            public void write(OutputStream output) throws IOException, WebApplicationException {
                output.write(xml.getBytes("Unicode"));
                output.close();
            }
        };
        String fileName = "daramadcard.xml";
        return Response.ok(output).header("Content-Disposition", "attachment; filename=" + fileName).build();

    }

    @GET
    @Path("/exportToAccess")
    @Produces("application/vnd.ms-access")
    public Response exportToAccess(@QueryParam("filter") FilterWrapper filterWrapper, @Context HttpServletRequest request, @Context SecurityContext sc) throws WebApplicationException, IOException, ClassNotFoundException, SQLException {

        Database db = service.writeToAccess(filterWrapper, null, null, null);
        final FileInputStream fis = new FileInputStream(db.getFile());
        final byte[] buffer = new byte[1024];
        StreamingOutput output = new StreamingOutput() {
            @Override
            public void write(java.io.OutputStream output) throws IOException, WebApplicationException {
                int byteRead = 0;
                while ((byteRead = fis.read(buffer)) != -1) {
                    output.write(buffer, 0, byteRead);
                }
                output.close();
            }
        };
        String fileName = "daramadcard.accdb";
        return Response.ok(output).header("Content-Disposition", "attachment; filename=" + fileName).build();
    }

}
