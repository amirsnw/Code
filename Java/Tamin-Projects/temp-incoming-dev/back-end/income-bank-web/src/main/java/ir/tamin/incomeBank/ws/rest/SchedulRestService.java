///*
// * To change this license header, choose License Headers in Project Properties.
// * To change this template file, choose Tools | Templates
// * and open the template in the editor.
// */
//package ir.tamin.incomeBank.ws.rest;
//
//import ir.tamin.incomeBank.service.schedulers.treasury.ScheduledGetTreasuryDocFromMelliBank;
//import ir.tamin.framework.ws.rest.ResponseHelper;
//import javax.enterprise.context.RequestScoped;
//import javax.inject.Inject;
//import javax.servlet.http.HttpServletRequest;
//import javax.ws.rs.Consumes;
//import javax.ws.rs.GET;
//import javax.ws.rs.POST;
//import javax.ws.rs.Path;
//import javax.ws.rs.PathParam;
//import javax.ws.rs.Produces;
//import javax.ws.rs.WebApplicationException;
//import javax.ws.rs.core.Context;
//import javax.ws.rs.core.MediaType;
//import javax.ws.rs.core.Response;
//import javax.ws.rs.core.UriInfo;
//
///**
// *
// * @author s_maknooni
// */
//@Path("/scheduler")
//@Produces(MediaType.APPLICATION_JSON)
//@Consumes(MediaType.APPLICATION_JSON)
//@RequestScoped
//public class SchedulRestService {
//
//    @Inject
//    ScheduledGetTreasuryDocFromMelliBank service;
//
////    @Inject
////    ScheduledSendDocsToAcc docService;
//
//    @GET
//    public Response getAll(@Context UriInfo ui, @Context HttpServletRequest request) throws WebApplicationException {
//        service.treasuryDocsTimer();
//        return ResponseHelper.ok();
//    }
//
//    @GET
//    @Path("/{date}")
//    public Response getByDate(@PathParam(value = "date") String date8, @Context UriInfo ui, @Context HttpServletRequest request) throws WebApplicationException {
//        service.treasuryDocsTimer(date8);
//        return ResponseHelper.ok();
//    }
//
////    @POST
////    @Path("/sendDocToAcc")
////    public Response sendDocToAcc(@PathParam(value = "date") String date6, @Context UriInfo ui, @Context HttpServletRequest request) throws WebApplicationException {
////        docService.sendDocsToAccTimer();
////        return ResponseHelper.ok();
////    }
//
//}
