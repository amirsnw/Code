package ir.tamin.insurance.technical.function.guardian.guardianReport;

import ir.tamin.framework.domain.function.AbstractDBFunction;
import ir.tamin.framework.domain.function.DBFunctionCall;
import ir.tamin.framework.domain.function.Mapping;
import ir.tamin.framework.domain.function.MappingType;
import ir.tamin.framework.ws.rest.repository.annotation.RESTResource;
import oracle.jdbc.OracleTypes;


@RESTResource
@Mapping(type = MappingType.COMPLEX, input = GuardianReportInput.class, output = GuardianReportValue.class)
public class GuardianReport extends AbstractDBFunction {
    private static final String QUERY = "{? = call pckssupviews.get_vwrepssup_guardian(?, ?, ?)}";

    @Override
    public DBFunctionCall createCall() {
        try {
            GuardianReportInput input = (GuardianReportInput) inputResource;
            return new DBFunctionCall().createCall(QUERY)
                    .withInput(2, input.getBranchCode())
                    .withInput(3, input.getStartDate())
                    .withInput(4, input.getEndDate())
                    .returns(1, OracleTypes.CURSOR);
        } catch (Exception e) {
            return null;
        }
    }

}
