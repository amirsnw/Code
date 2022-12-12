package ir.tamin.insurance.technical.function.occur;

import ir.tamin.framework.domain.function.AbstractDBFunction;
import ir.tamin.framework.domain.function.DBFunctionCall;
import ir.tamin.framework.domain.function.Mapping;
import ir.tamin.framework.domain.function.MappingType;
import ir.tamin.framework.ws.rest.repository.annotation.RESTResource;

import java.sql.Types;

/**
 * Created by a-khalighi on 5/17/2022
*/
@RESTResource
@Mapping(input = GetOccureqIdInput.class, output = GetOccureqIdValue.class, type = MappingType.SINGLE)
public class GetOccureqId extends AbstractDBFunction {

    private static final String QUERY = "{? = call get_occur_reqid(?)}";

    @Override
    public DBFunctionCall createCall() {

        GetOccureqIdInput inputFn = (GetOccureqIdInput) inputResource;

        return new DBFunctionCall().createCall(QUERY)
                .withInput(2, inputFn.getBranchCode())
                .returns(1, Types.INTEGER);


    }

}

