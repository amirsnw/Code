/**
 *
 * @author h_riazat
 */
package ir.tamin.incomeBank.ws.rest.daramadBank;

import com.healthmarketscience.jackcess.Database;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;
import javax.enterprise.context.RequestScoped;
import javax.inject.Inject;
import javax.ws.rs.Consumes;
import javax.ws.rs.core.Response;
import javax.ws.rs.core.SecurityContext;
import javax.ws.rs.core.UriInfo;
import javax.servlet.http.HttpServletRequest;
import javax.ws.rs.WebApplicationException;
import ir.tamin.framework.ws.rest.ResponseHelper;
import ir.tamin.framework.ws.rest.json.FilterWrapper;
import ir.tamin.framework.ws.rest.json.SortWrapper;
import ir.tamin.incomeBank.model.daramadBank.VwDrmdListDisk;
import ir.tamin.incomeBank.model.daramadBank.VwDrmdListDiskPK;
import ir.tamin.incomeBank.service.daramadBank.VwDrmdListDiskService;
import ir.tamin.incomeBank.ws.rest.ResourceRESTService;
import ir.tamin.incomeBank.ws.rest.Roles;
import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.io.IOException;
import java.io.OutputStream;
import java.util.HashMap;
import java.util.Map;
import java.util.logging.Level;
import java.util.logging.Logger;
import javax.annotation.security.RolesAllowed;
import javax.ws.rs.GET;
import javax.ws.rs.PathParam;
import javax.ws.rs.core.Context;
import javax.ws.rs.core.StreamingOutput;
import org.apache.poi.ss.usermodel.Workbook;

@Path("/vwDrmdListDisk")
@Produces(MediaType.APPLICATION_JSON)
@Consumes(MediaType.APPLICATION_JSON)
@RequestScoped
public class VwDrmdListDiskRestService implements ResourceRESTService<VwDrmdListDisk> {

    @Inject
    VwDrmdListDiskService vwDrmdListDiskService;

    @Override
    public Response get(String id, UriInfo uriInfo, SecurityContext securityContext, HttpServletRequest request) throws WebApplicationException {
        throw new UnsupportedOperationException("Not supported yet."); //To change body of generated methods, choose Tools | Templates.
    }

    @GET
    @Path("/{cardRow}/{brchCode}")
    @RolesAllowed({Roles.MALI_BRANCH_DRMD_USER, Roles.MALI_SETAD_DRMD_USER})
    public Response getPK(@PathParam("cardRow") Integer cardRow, @PathParam("brchCode") String brchCode, @Context UriInfo uriInfo, @Context SecurityContext securityContext,
            @Context HttpServletRequest request) throws WebApplicationException {
        VwDrmdListDiskPK vwDrmdListDiskPK = new VwDrmdListDiskPK(cardRow, brchCode);
        return ResponseHelper.ok(vwDrmdListDiskService.get(vwDrmdListDiskPK));
    }

    @Override
    @RolesAllowed({Roles.MALI_BRANCH_DRMD_USER, Roles.MALI_SETAD_DRMD_USER})
    public Response getAll(FilterWrapper filterWrapper, Integer start, Integer limit, SortWrapper sortWrapper, UriInfo uriInfo, SecurityContext securityContext, HttpServletRequest request) throws WebApplicationException {
        try {
            Map<String, Object> map = vwDrmdListDiskService.getAll(filterWrapper, start, limit, sortWrapper);
            return ResponseHelper.ok(map);
        }
        catch(Exception ex){
            Logger.getLogger(VwDrmdListDiskRestService.class.getName()).log(Level.SEVERE, ex.getMessage(), ex);
            return null;
        }

    }

    @Override
    public Response save(VwDrmdListDisk t, UriInfo uriInfo, SecurityContext securityContext, HttpServletRequest request) throws WebApplicationException {
        throw new UnsupportedOperationException("Not supported yet."); //To change body of generated methods, choose Tools | Templates.
    }

    @Override
    public Response edit(String id, VwDrmdListDisk t, UriInfo uriInfo, SecurityContext securityContext, HttpServletRequest request) throws WebApplicationException {
        throw new UnsupportedOperationException("Not supported yet."); //To change body of generated methods, choose Tools | Templates.
    }

    @Override
    public Response remove(String id, UriInfo uriInfo, SecurityContext securityContext, HttpServletRequest request) throws WebApplicationException {
        throw new UnsupportedOperationException("Not supported yet."); //To change body of generated methods, choose Tools | Templates.
    }

    @GET
    @Path("/excelReport")
    @Produces("application/vnd.ms-excel")
    public Response exportToExcel(@Context HttpServletRequest request) {
        final Workbook workbook = vwDrmdListDiskService.exportToExcel(request);
        StreamingOutput output = new StreamingOutput() {
            @Override
            public void write(java.io.OutputStream output) throws IOException, WebApplicationException {
                workbook.write(output);
                output.close();
            }
        };
        String fileName = "excelReport.xlsx";
        return Response.ok(output).header("Content-Disposition", "attachment; filename=" + fileName).build();
    }

    @GET
    @Path("/xmlReport")
    @Produces("application/xml")
    public Response exportToXml(@Context HttpServletRequest request) {
        final String xml = vwDrmdListDiskService.exportToXml(request);
        StreamingOutput output = new StreamingOutput() {
            @Override
            public void write(OutputStream output) throws IOException, WebApplicationException {
                output.write(xml.getBytes("Unicode"));
                output.close();
            }
        };
        String fileName = "xmlReport.xml";
        return Response.ok(output).header("Content-Disposition", "attachment; filename=" + fileName).build();
    }

    @GET
    @Path("/accessReport")
    @Produces("application/vnd.ms-access")
    public Response exportToAccess(@Context HttpServletRequest request) throws FileNotFoundException {
        Database db = vwDrmdListDiskService.exportToAccess(request);
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
        String fileName = "accessReport.accdb";
        return Response.ok(output).header("Content-Disposition", "attachment; filename=" + fileName).build();
    }

}
