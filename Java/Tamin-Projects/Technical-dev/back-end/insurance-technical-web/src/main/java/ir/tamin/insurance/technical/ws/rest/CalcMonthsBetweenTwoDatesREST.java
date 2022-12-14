package ir.tamin.insurance.technical.ws.rest;

import ir.tamin.framework.domain.proxy.ProxyProcessingException;
import ir.tamin.framework.ws.rest.ResponseHelper;
import ir.tamin.insurance.technical.business.service.CalcMonthsBetweenTwoDatesService;

import javax.enterprise.context.RequestScoped;
import javax.inject.Inject;
import javax.ws.rs.*;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;
import java.sql.SQLException;


@Path("/calc-months-between-two-dates-rest")
@Produces(MediaType.APPLICATION_JSON)
@Consumes(MediaType.APPLICATION_JSON)
@RequestScoped

public class CalcMonthsBetweenTwoDatesREST {

    @Inject 
           
    private CalcMonthsBetweenTwoDatesService calcMonthsBetweenTwoDatesService;

    @GET
    public Response CalcMonthsBetweenTwoDates(@QueryParam("firstDate") String firstDate, @QueryParam("secondDate") String secondDate) throws SQLException, ProxyProcessingException {
        Response r = ResponseHelper.ok(calcMonthsBetweenTwoDatesService.getCalcMonthsBetweenTwoDates(firstDate, secondDate));
        return r;
    }
}
