package ir.tamin.insurance.technical.function.occur;

/**
 * Created by a-khalighi on 5/17/2022
*/

import ir.tamin.framework.domain.function.AbstractDBFunction;
import ir.tamin.framework.domain.function.DBFunctionCall;
import ir.tamin.framework.domain.function.Mapping;
import ir.tamin.framework.domain.function.MappingType;
import ir.tamin.framework.ws.rest.repository.annotation.RESTResource;
import ir.tamin.insurance.technical.function.baseinfo.GeneralFunctionResult;

import java.sql.Types;

@RESTResource
@Mapping( input = GetOccurideaSeqInput.class, output = GeneralFunctionResult.class, type = MappingType.SINGLE)
public class GetOccurideaSeq extends AbstractDBFunction {

    private static final String QUERY = "{? = call pckssupviews.get_occur_idea_seq(?)}";

       @Override
       public DBFunctionCall createCall() {

           GetOccurideaSeqInput inputFn = (GetOccurideaSeqInput) inputResource;

               return new DBFunctionCall().createCall(QUERY)
                       .withInput(2, inputFn.getReqId())
                       .returns(1, Types.VARCHAR);
       }
}
