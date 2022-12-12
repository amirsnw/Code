/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package ir.tamin.insurance.technical.ws.rest;

import ir.tamin.framework.domain.proxy.ProxyProcessingException;
import ir.tamin.framework.ws.rest.ResponseHelper;
import ir.tamin.insurance.technical.business.service.CalcDaysBetweenTwoDatesService;

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
@Path("/calc-days-between-two-dates-rest")
@Produces(MediaType.APPLICATION_JSON)
@Consumes(MediaType.APPLICATION_JSON)
@RequestScoped

public class CalcDaysBetweenTwoDatesREST {
    
     @Inject 
    private CalcDaysBetweenTwoDatesService calcDaysBetweenTwoDatesService ;
     
      @GET
    public  Response CalcDaysBetweenTwoDates(@QueryParam("firstDate") String firstDate, @QueryParam("secondDate") String secondDate) throws SQLException, ProxyProcessingException {
        Response r = ResponseHelper.ok(calcDaysBetweenTwoDatesService.getCalcDaysBetweenTwoDates(firstDate,secondDate));
        return r;
    }
}
