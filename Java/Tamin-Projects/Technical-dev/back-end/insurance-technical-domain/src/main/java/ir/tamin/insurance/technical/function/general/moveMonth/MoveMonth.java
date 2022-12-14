package ir.tamin.insurance.technical.function.general.moveMonth;

import ir.tamin.framework.domain.function.AbstractDBFunction;
import ir.tamin.framework.domain.function.DBFunctionCall;
import ir.tamin.framework.domain.function.Mapping;
import ir.tamin.framework.domain.function.MappingType;
import ir.tamin.framework.ws.rest.repository.annotation.RESTResource;

import java.sql.Types;



@RESTResource
@Mapping(type = MappingType.SINGLE, input = MoveMonthInput.class, output = MoveMonthValue.class)
public class MoveMonth extends AbstractDBFunction {
    private static final String QUERY = "{? = call GENERAL.DATEUTILS.MOVEMONTH(?, ?)}";
    @Override
    public DBFunctionCall createCall() {
        try{
            MoveMonthInput moveMonthInput=(MoveMonthInput) inputResource;
            return new DBFunctionCall().createCall(QUERY)
                    .withInput(2, moveMonthInput.getRequestDate())
                    .withInput(3,moveMonthInput.getIncer())
                    .returns(1, Types.VARCHAR);
        }
        catch(Exception e)
        {
            return null;
        }


    }

}
