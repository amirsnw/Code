package ir.tamin.insurance.technical.function.occur;

import ir.tamin.framework.domain.function.AbstractDBFunction;
import ir.tamin.framework.domain.function.DBFunctionCall;
import ir.tamin.framework.domain.function.Mapping;
import ir.tamin.framework.domain.function.MappingType;
import ir.tamin.framework.ws.rest.repository.annotation.RESTResource;
import ir.tamin.insurance.technical.function.baseinfo.GeneralFunctionResult;

import java.sql.Types;

/**
 * Created by sh-kalantari on 7/7/2019.
 */

@RESTResource
@Mapping( input = GetWshMasterFrstInput.class, output = GeneralFunctionResult.class, type = MappingType.SINGLE)
public class GetWshMasterFrst extends AbstractDBFunction {

    private static final String QUERY = "{? = call pckbrhpopularfunc.getwshmasterfrst (?,?,?)}";

       @Override
       public DBFunctionCall createCall() {

           GetWshMasterFrstInput inputFn = (GetWshMasterFrstInput) inputResource;

               return new DBFunctionCall().createCall(QUERY)
                       .withInput(2, inputFn.getBranchCode())
                       .withInput(3, inputFn.getPrwshid())
                       .withInput(4, inputFn.getPdate())
                       .returns(1, Types.VARCHAR);


       }
}
