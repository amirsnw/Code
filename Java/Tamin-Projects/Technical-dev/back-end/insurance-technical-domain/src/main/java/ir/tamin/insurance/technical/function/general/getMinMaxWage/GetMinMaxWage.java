package ir.tamin.insurance.technical.function.general.getMinMaxWage;

import ir.tamin.framework.domain.function.AbstractDBFunction;
import ir.tamin.framework.domain.function.DBFunctionCall;
import ir.tamin.framework.domain.function.Mapping;
import ir.tamin.framework.domain.function.MappingType;
import ir.tamin.framework.ws.rest.repository.annotation.RESTResource;

import java.sql.Types;

/**
 *
 * @author m_Alipour
 */

@RESTResource
@Mapping(type = MappingType.SINGLE, input = GetMinMaxWageInput.class, output = GetMinMaxWageValue.class)
public class GetMinMaxWage extends AbstractDBFunction {
    private static final String QUERY = "{? = call pckbrhpopularfunc.Setgetlowhighwagehis(?, ?, ?, ?)}";

    @Override
    public DBFunctionCall createCall() {
        try{
            GetMinMaxWageInput inputRes=(GetMinMaxWageInput) inputResource;
            return new DBFunctionCall().createCall(QUERY)
                    .withInput(2, inputRes.getYear())
                    .withInput(3, inputRes.getMonth())
                    .returns(1, Types.NUMERIC)
                    .returns(4, Types.NUMERIC)
                    .returns(5, Types.NUMERIC);
        }
        catch(Exception e){
            return null;
        }

    }
}
