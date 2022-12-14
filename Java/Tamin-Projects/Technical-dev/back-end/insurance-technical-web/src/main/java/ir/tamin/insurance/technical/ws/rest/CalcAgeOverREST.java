/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package ir.tamin.insurance.technical.ws.rest;

import ir.tamin.framework.domain.proxy.ProxyProcessingException;
import ir.tamin.framework.ws.rest.ResponseHelper;
import ir.tamin.insurance.technical.service.CalcAgeOverService;

import javax.enterprise.context.RequestScoped;
import javax.inject.Inject;
import javax.ws.rs.*;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;
import java.sql.SQLException;

/**
 *
 * @author s_naghavi
 */
@Path("/calc-age-over")
@Produces(MediaType.APPLICATION_JSON)
@Consumes(MediaType.APPLICATION_JSON)
@RequestScoped
public class CalcAgeOverREST {
    @Inject
    private CalcAgeOverService calcAgeOverService;
    
    @GET
    public  Response getCalcAgeOver(@QueryParam("introducedDate") String introducedDate, @QueryParam("dateOfBirth") String dateOfBirth) throws SQLException, ProxyProcessingException {
        Response r = ResponseHelper.ok(calcAgeOverService.calcAgeOver(introducedDate,dateOfBirth));
        return r;
    }
    
}
