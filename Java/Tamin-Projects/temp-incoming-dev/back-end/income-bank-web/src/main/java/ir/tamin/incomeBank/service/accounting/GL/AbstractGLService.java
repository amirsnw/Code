/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package ir.tamin.incomeBank.service.accounting.GL;

import ir.tamin.incomeBank.model.accounting.GlOperationResult;
import ir.tamin.incomeBank.model.centralPayment.GlPayHead;
import ir.tamin.incomeBank.service.accounting.GlOperationResultService;
import ir.tamin.framework.cdi.util.MessageBundle;
import ir.tamin.framework.core.util.Bundle;
import java.math.BigDecimal;
import java.util.Date;
import javax.inject.Inject;
import javax.ws.rs.WebApplicationException;
import javax.ws.rs.core.Response;

/**
 *
 * @author s_maknooni
 */
public abstract class AbstractGLService implements GLService {
    
    @Inject
    private GlOperationResultService glOperationResultService;
    
    @Inject
    @MessageBundle
    Bundle messageBundle;
    
    public boolean accept(Integer systemId) {
        return getSystemId().equals(systemId);
    }
    
    public void preControlAccCode(BigDecimal payHeadId, Integer systemId) {
        int controlAccOpResult = glOperationResultService.checkRecord(payHeadId);
        if (controlAccOpResult == 1) {// Account code control is already done
            Response response = Response.status(Response.Status.FOUND).entity(messageBundle.getProperty("coreaccount.glservice.AccountCodeControlIsAlreadyDone")).build();
            throw new WebApplicationException(response);
        } else if (controlAccOpResult == 2) {// Account code control is in progress
            Response response = Response.status(Response.Status.CONFLICT).entity(messageBundle.getProperty("coreaccount.glservice.AccountCodeControlIsInProgress")).build();
            throw new WebApplicationException(response);
        } else { // No action has yet been taken to control the account code
            GlOperationResult cpGlOperationResult = new GlOperationResult();
            cpGlOperationResult.setPayHeadId(new GlPayHead(payHeadId));
            cpGlOperationResult.setDocType("01"); // سند پرداختی
            cpGlOperationResult.setSystemTypeId(systemId);
            cpGlOperationResult.setCreationTime(new Date());
            glOperationResultService.save(cpGlOperationResult);
            
        }
    }
    
    protected abstract Integer getSystemId();
}
