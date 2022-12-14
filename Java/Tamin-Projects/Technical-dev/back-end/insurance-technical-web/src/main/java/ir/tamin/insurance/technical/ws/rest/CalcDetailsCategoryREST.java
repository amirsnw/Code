/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package ir.tamin.insurance.technical.ws.rest;

import ir.tamin.framework.domain.proxy.ProxyProcessingException;
import ir.tamin.framework.ws.rest.ResponseHelper;
import ir.tamin.insurance.technical.service.CalcDetailsCategoryService;

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
@Path("/calc-details-category")
@Produces(MediaType.APPLICATION_JSON)
@Consumes(MediaType.APPLICATION_JSON)
@RequestScoped
public class CalcDetailsCategoryREST {
     @Inject
    private CalcDetailsCategoryService calcDetail;


    @GET
    public Response getDetailsCategory(@QueryParam("agreementCategoryId") String agreementCategoryId) throws SQLException,ProxyProcessingException {
        
        Response r = ResponseHelper.ok(calcDetail.calcMinMaxWageAgeHist(agreementCategoryId));
        return r;
       
    }


    
}
