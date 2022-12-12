package ir.tamin.insurance.technical.function.general.updateLsu;

import ir.tamin.framework.domain.function.AbstractDBFunction;
import ir.tamin.framework.domain.function.DBFunctionCall;
import ir.tamin.framework.domain.function.Mapping;
import ir.tamin.framework.domain.function.MappingType;
import ir.tamin.framework.ws.rest.repository.annotation.RESTResource;

import java.sql.Types;

/**
 *
 * @author m_hoseini
 */

@RESTResource
@Mapping(type = MappingType.SINGLE, input = UpdateLsuStatusInput.class, output = UpdateLsuStatusValue.class)

public class UpdateLsuStatus extends AbstractDBFunction {

    private static final String QUERY = "{? = call techins.fnclsu_update_guardian_result(?,?,?,?, ?)}";

    @Override
    public DBFunctionCall createCall() {
        try {
            UpdateLsuStatusInput lsuStatusInput = (UpdateLsuStatusInput) inputResource;
            return new DBFunctionCall().createCall(QUERY)
                    .withInput(2, lsuStatusInput.getReqNo())
                    .withInput(3, lsuStatusInput.getBranchCode())
                    .withInput(4, lsuStatusInput.getRisuid())
                    .withInput(5, lsuStatusInput.getInspOpinion())
                    .withInput(6, lsuStatusInput.getStatusCode())
                    .returns(1, Types.VARCHAR);
        } catch (Exception e) {
            return null;
        }

    }
}
