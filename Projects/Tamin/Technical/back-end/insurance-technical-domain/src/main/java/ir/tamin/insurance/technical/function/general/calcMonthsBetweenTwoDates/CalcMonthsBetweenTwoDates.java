package ir.tamin.insurance.technical.function.general.calcMonthsBetweenTwoDates;

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
@Mapping(type = MappingType.SINGLE, input = CalcMonthsBetweenTwoDatesInput.class, output = CalcMonthsBetweenTwoDatesValue.class)
public class CalcMonthsBetweenTwoDates extends AbstractDBFunction {

    private static final String QUERY = "{? = call general.dateutils.monthbetween2dates(?, ?)}";

    @Override
    public DBFunctionCall createCall() {
        try {
            CalcMonthsBetweenTwoDatesInput calcMonthsBetweenTwoDatesInput = (CalcMonthsBetweenTwoDatesInput) inputResource;
            return new DBFunctionCall().createCall(QUERY)
                    .withInput(2, calcMonthsBetweenTwoDatesInput.getFirstDate())
                    .withInput(3, calcMonthsBetweenTwoDatesInput.getSecondDate())
                    .returns(1, Types.DECIMAL);
        } catch (Exception e) {
            e.printStackTrace();
            return null;
        }
    }
}
