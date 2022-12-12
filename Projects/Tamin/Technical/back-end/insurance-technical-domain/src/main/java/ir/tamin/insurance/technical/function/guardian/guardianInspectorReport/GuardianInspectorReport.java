package ir.tamin.insurance.technical.function.guardian.guardianInspectorReport;

import ir.tamin.framework.domain.function.AbstractDBFunction;
import ir.tamin.framework.domain.function.DBFunctionCall;
import ir.tamin.framework.domain.function.Mapping;
import ir.tamin.framework.domain.function.MappingType;
import ir.tamin.framework.ws.rest.repository.annotation.RESTResource;
import oracle.jdbc.OracleTypes;

/**
 *
 * @author m_hoseini
 */
@RESTResource
@Mapping(type = MappingType.COMPLEX, input = GuardianInspectorReportInput.class, output = GuardianInspectorReportValue.class)
public class GuardianInspectorReport extends AbstractDBFunction {

    private static final String QUERY = "{? = call pckssupviews.get_vwrepssup_guardian_Insp(?, ?, ?)}";

    @Override
    public DBFunctionCall createCall() {
        try {
            GuardianInspectorReportInput input = (GuardianInspectorReportInput) inputResource;
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
