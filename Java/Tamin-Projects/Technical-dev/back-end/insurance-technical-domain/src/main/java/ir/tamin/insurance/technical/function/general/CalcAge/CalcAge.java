/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package ir.tamin.insurance.technical.function.general.CalcAge;

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
@Mapping(type = MappingType.SINGLE, input = CalcAgeInput.class, output = CalcAgeValue.class)
public class CalcAge extends AbstractDBFunction{
private static final String QUERY = "{? = call GENERAL.DATEUTILS.DiffDate(?, ?)}";
    @Override
    public DBFunctionCall createCall() {
        try{
        CalcAgeInput calcAgeInput=(CalcAgeInput) inputResource;
      return new DBFunctionCall().createCall(QUERY)
                .withInput(2, calcAgeInput.getInsurancedBirthDate())
                .withInput(3, calcAgeInput.getReqDate())
                .returns(1,Types.VARCHAR);
        }
        catch(Exception e)
        {
            return null;
        }
        
       
    }
    
}
