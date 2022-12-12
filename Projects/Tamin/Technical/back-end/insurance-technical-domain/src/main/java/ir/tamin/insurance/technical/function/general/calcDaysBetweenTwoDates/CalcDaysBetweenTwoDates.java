/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package ir.tamin.insurance.technical.function.general.calcDaysBetweenTwoDates;

import ir.tamin.framework.domain.function.AbstractDBFunction;
import ir.tamin.framework.domain.function.DBFunctionCall;
import ir.tamin.framework.domain.function.Mapping;
import ir.tamin.framework.domain.function.MappingType;
import ir.tamin.framework.ws.rest.repository.annotation.RESTResource;

import java.sql.Types;

/**
 *
 * @author s_naghavi
 */
@RESTResource
@Mapping(type = MappingType.SINGLE, input = CalcDaysBetweenTwoDatesInput.class, output = CalcDaysBetweenTwoDatesValue.class)
public class CalcDaysBetweenTwoDates extends AbstractDBFunction{
    private static final String QUERY = "{? = call general.dateutils.DAYSBETWEEN2DATES(?, ?)}";
    @Override
    public DBFunctionCall createCall() {
        
        CalcDaysBetweenTwoDatesInput calcDaysBetweenTwoDatesInput=(CalcDaysBetweenTwoDatesInput) inputResource;
      return new DBFunctionCall().createCall(QUERY)
                .withInput(2, calcDaysBetweenTwoDatesInput.getFirstDate())
                .withInput(3, calcDaysBetweenTwoDatesInput.getSecondDate())
                .returns(1,Types.DECIMAL);
       
}
}
