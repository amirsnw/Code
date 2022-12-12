/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package ir.tamin.insurance.technical.service;

import ir.tamin.framework.core.persistence.ProcedureManager;
import ir.tamin.framework.core.util.DateUtils;
import ir.tamin.framework.domain.proxy.ProxyProcessingException;
import ir.tamin.framework.ws.rest.ResponseHelper;
import ir.tamin.framework.ws.rest.proxy.DBFunctionProxy;
import ir.tamin.insurance.technical.function.general.calcDaysBetweenTwoDates.CalcDaysBetweenTwoDates;
import ir.tamin.insurance.technical.function.general.calcDaysBetweenTwoDates.CalcDaysBetweenTwoDatesInput;
import ir.tamin.insurance.technical.function.general.calcDaysBetweenTwoDates.CalcDaysBetweenTwoDatesValue;

import javax.ejb.Stateless;
import javax.inject.Inject;
import javax.inject.Named;
import javax.persistence.EntityManager;
import javax.ws.rs.QueryParam;
import javax.ws.rs.core.Response;
import java.math.BigDecimal;
import java.sql.SQLException;
import java.util.Date;

/**
 *
 * @author s_naghavi
 */
@Stateless
public class CalcAgeOverService {

    @Inject
    private EntityManager em;
    @Inject
    @Named("DefaultDBFunctionProxy")
    private DBFunctionProxy dBFunctionProxy;

    @Inject
    @Named("ProcedureManager")
    private ProcedureManager procedureManager;

    public Response calcAgeOver(@QueryParam("introducedDate") String introducedDate, @QueryParam("dateOfBirth") String dateOfBirth) throws SQLException, ProxyProcessingException {
        dBFunctionProxy.setProcedureManager(procedureManager);
         Date dt = new Date(Long.valueOf(introducedDate));
        String introduceDateNew = DateUtils.format(dt, "yyyyMMdd");
       // String introducedDate = DateUtils.format(new Date(introducedDate), dateOfBirth);
        CalcDaysBetweenTwoDatesValue calcDaysBetweenTwoDatesValue = null;
        calcDaysBetweenTwoDatesValue = (CalcDaysBetweenTwoDatesValue) dBFunctionProxy.execute(new CalcDaysBetweenTwoDates(), new CalcDaysBetweenTwoDatesInput(dateOfBirth, introduceDateNew));
        Response r = ResponseHelper.ok((calcDaysBetweenTwoDatesValue.getDays()).subtract(BigDecimal.valueOf(50*365)));
        return r;

    }
}
