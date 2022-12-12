package ir.tamin.insurance.technical.business.service;

import ir.tamin.framework.core.persistence.ProcedureManager;
import ir.tamin.framework.domain.proxy.ProxyProcessingException;
import ir.tamin.framework.ws.rest.proxy.DBFunctionProxy;
import ir.tamin.insurance.technical.function.general.calcMonthsBetweenTwoDates.CalcMonthsBetweenTwoDates;
import ir.tamin.insurance.technical.function.general.calcMonthsBetweenTwoDates.CalcMonthsBetweenTwoDatesInput;
import ir.tamin.insurance.technical.function.general.calcMonthsBetweenTwoDates.CalcMonthsBetweenTwoDatesValue;

import javax.inject.Inject;
import javax.inject.Named;

/**
 *
 * @author m_hoseini
 */
public class CalcMonthsBetweenTwoDatesService{
    
    @Inject
    @Named("DefaultDBFunctionProxy")
    protected DBFunctionProxy dbFunctionProxy;

    @Inject
    @Named("ProcedureManager")
    private ProcedureManager procedureManager;

    public CalcMonthsBetweenTwoDatesValue getCalcMonthsBetweenTwoDates(String firstDate, String secondDate) throws ProxyProcessingException {
        dbFunctionProxy.setProcedureManager(procedureManager);
        return (CalcMonthsBetweenTwoDatesValue) dbFunctionProxy.execute(new CalcMonthsBetweenTwoDates(),
                new CalcMonthsBetweenTwoDatesInput(firstDate, secondDate));
    }
     
}
