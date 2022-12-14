/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package ir.tamin.insurance.technical.function.general.provinceDetailList;

import ir.tamin.framework.domain.function.AbstractDBFunction;
import ir.tamin.framework.domain.function.DBFunctionCall;
import ir.tamin.framework.domain.function.Mapping;
import ir.tamin.framework.domain.function.MappingType;
import ir.tamin.framework.ws.rest.repository.annotation.RESTResource;
import oracle.jdbc.OracleTypes;
import org.slf4j.Logger;

import javax.inject.Inject;

/**
 *
 * @author s_naghavi
 */
@RESTResource
@Mapping( input = ProvinceDetailListInput.class,output = ProvinceDetailListValue.class, type = MappingType.COMPLEX)

public class ProvinceDetailList extends AbstractDBFunction{
@Inject
    private Logger logger;
    private static final String QUERY = "{? = call pckssupviews.get_vwentlstostanfeh(?, ?, ?)}";
    @Override
    public DBFunctionCall createCall() {
        try{
            ProvinceDetailListInput inputRes=(ProvinceDetailListInput) inputResource;
            return new DBFunctionCall().createCall(QUERY)
                    .withInput(2, inputRes.getBranchCode())
                    .withInput(3, inputRes.getReqNo())
                    .withInput(4, inputRes.getOstanReqNo())
                    .returns(1, OracleTypes.CURSOR);
        }
        catch(Exception e){
            logger.info(e.getMessage());
            return null;
        }
    }
    
}
