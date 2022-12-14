/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package ir.tamin.insurance.technical.ws.rest;

import ir.tamin.framework.ws.rest.ResponseHelper;
import ir.tamin.framework.ws.rest.Roles;
import ir.tamin.insurance.technical.service.CalcHistory;

import javax.annotation.security.RolesAllowed;
import javax.enterprise.context.RequestScoped;
import javax.inject.Inject;
import javax.ws.rs.*;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;
import java.sql.SQLException;

/**
 *
 * @author h_mashal
 */
@Path("/acquire-history-info")
@Produces(MediaType.APPLICATION_JSON)
@Consumes(MediaType.APPLICATION_JSON)
@RequestScoped
public class HistoryInfoREST {

    @Inject
    private CalcHistory calcHistory;

    @GET
    public Response getHistoryCategory(@QueryParam("insuranceID") String insID,
            @QueryParam("intDate") String intDate)
            throws SQLException {

        return ResponseHelper.ok(calcHistory.calcHistID(insID, intDate));
    }

    @GET
    @Path("history-days")
    @RolesAllowed({Roles.DEFAULT_ROLE})
    public Response getHistoryDays(@QueryParam("insuranceId") String insuranceId,
            @QueryParam("nationalCode") String nationalCode)
            throws SQLException {

        return ResponseHelper.ok(calcHistory.calcHistDays(insuranceId, nationalCode));
    }

}
