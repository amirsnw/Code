/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package ir.tamin.insurance.technical.function.general.typeOfIsu;

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
@Mapping(type = MappingType.SINGLE, input = TypeOfIsuInput.class, output = TypeOfIsuValue.class)
public class TypeOfIsu extends AbstractDBFunction{
    private static final String QUERY = "{? = call pckbrhpopularfunc.Getisutypeofisu(?, ?, ?, ?)}";
    @Override
    public DBFunctionCall createCall() {
        try{
        TypeOfIsuInput isuType=(TypeOfIsuInput) inputResource;
        return new DBFunctionCall().createCall(QUERY)
                .withInput(2, isuType.getInsuranceCode())
                .withInput(3, isuType.getIntroduceDate())
                .withInput(5, isuType.getBranchCode())
                .returns(4, Types.VARCHAR)
                .returns(1, Types.VARCHAR);
        }
        catch(Exception e){
            return null;
        }
            
    
    }
    
}
