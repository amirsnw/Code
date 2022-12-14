/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package ir.tamin.insurance.technical.function.insuranceAgreement.retdastmozdday;

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
@Mapping(type = MappingType.COMPLEX, input = RetDastmozdDayInput.class, output = RetDastmozdDayValue.class)
public class RetDastmozdDay extends AbstractDBFunction{
    private static final String QUERY = "{? = call pck_recalsoldiers.ret_dastmozdday(?, ?, ?, ?, ?)}";
    
    @Override
    public DBFunctionCall createCall() {
       try {
           RetDastmozdDayInput retDastmozdDayInput = (RetDastmozdDayInput) inputResource;
           return new DBFunctionCall().createCall(QUERY)
                   .withInput(2, retDastmozdDayInput.getBranchCode())
                   .withInput(3, retDastmozdDayInput.getInsuranceNumber())
                   .withInput(4, retDastmozdDayInput.getNationalCode())
                   .withInput(5, retDastmozdDayInput.getNoDay())
                   .withInput(6, retDastmozdDayInput.getStartDate())
                   .returns(1, Types.ARRAY, "L_HISMTTBL");
       }catch (Exception e)
       {
           e.printStackTrace();
           return  null;
       }

    }
    
}
