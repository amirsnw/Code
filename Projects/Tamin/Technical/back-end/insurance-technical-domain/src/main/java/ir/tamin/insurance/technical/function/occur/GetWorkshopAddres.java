package ir.tamin.insurance.technical.function.occur;

import ir.tamin.framework.domain.function.AbstractDBFunction;
import ir.tamin.framework.domain.function.DBFunctionCall;
import ir.tamin.framework.domain.function.Mapping;
import ir.tamin.framework.domain.function.MappingType;
import ir.tamin.framework.ws.rest.repository.annotation.RESTResource;
import ir.tamin.insurance.technical.function.baseinfo.GeneralFunctionResult;

import java.sql.Types;


/**
 * Created by a-khalighi on 5/17/2022
*/
@RESTResource
@Mapping( input = GetWorkshopAddresInput.class, output = GeneralFunctionResult.class, type = MappingType.SINGLE)
public class GetWorkshopAddres extends AbstractDBFunction {
  
    private static final String QUERY = "{? = call pckssupviews.get_workshop_address(?,?,?)}";

       @Override
       public DBFunctionCall createCall() {

           GetWorkshopAddresInput inputFn = (GetWorkshopAddresInput) inputResource;

               return new DBFunctionCall().createCall(QUERY)
                       .withInput(2, inputFn.getBranchCode())
                       .withInput(3, inputFn.getPrwshid())
                       .withInput(4, inputFn.getPdate())
                       .returns(1, Types.VARCHAR);


       }

}
