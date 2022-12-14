/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package ir.tamin.insurance.technical.business.service;

import ir.tamin.framework.core.persistence.ProcedureManager;
import ir.tamin.framework.domain.proxy.ProxyProcessingException;
import ir.tamin.framework.ws.rest.proxy.DBFunctionProxy;
import ir.tamin.insurance.technical.function.general.calcDaysBetweenTwoDates.CalcDaysBetweenTwoDates;
import ir.tamin.insurance.technical.function.general.calcDaysBetweenTwoDates.CalcDaysBetweenTwoDatesInput;
import ir.tamin.insurance.technical.function.general.calcDaysBetweenTwoDates.CalcDaysBetweenTwoDatesValue;

import javax.inject.Inject;
import javax.inject.Named;

/**
 *
 * @author s_naghavi
 */
public class CalcDaysBetweenTwoDatesService {
      @Inject
    @Named("DefaultDBFunctionProxy")
    protected DBFunctionProxy dbFunctionProxy;
      
          @Inject
    @Named("ProcedureManager")
    private ProcedureManager procedureManager;
       public CalcDaysBetweenTwoDatesValue getCalcDaysBetweenTwoDates(String firstDate, String secondDate) throws ProxyProcessingException{
        dbFunctionProxy.setProcedureManager(procedureManager);
        return (CalcDaysBetweenTwoDatesValue) dbFunctionProxy.execute(new CalcDaysBetweenTwoDates(),
                new CalcDaysBetweenTwoDatesInput(firstDate, secondDate));
    }
    
}
