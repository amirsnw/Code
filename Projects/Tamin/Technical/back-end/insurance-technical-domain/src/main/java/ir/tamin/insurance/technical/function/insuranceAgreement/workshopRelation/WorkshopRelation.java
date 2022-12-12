package ir.tamin.insurance.technical.function.insuranceAgreement.workshopRelation;

import ir.tamin.framework.domain.function.AbstractDBFunction;
import ir.tamin.framework.domain.function.DBFunctionCall;
import ir.tamin.framework.domain.function.Mapping;
import ir.tamin.framework.domain.function.MappingType;
import ir.tamin.framework.ws.rest.repository.annotation.RESTResource;
import oracle.jdbc.OracleTypes;
import org.slf4j.Logger;

import javax.inject.Inject;

/**
 *
 * @author m_hoseini
 */
@RESTResource
@Mapping(type = MappingType.SINGLE, input = WorkshopRelationInput.class, output = WorkshopRelationValue.class)
public class WorkshopRelation extends AbstractDBFunction {

    @Inject
    private Logger logger;
    private static final String QUERY = "{ ? = call techins.pckbrhpopularfunc.getwshofisurel( ? ,?,?,? )}";

    @Override
    public DBFunctionCall createCall() {
        try {
            WorkshopRelationInput request = (WorkshopRelationInput) inputResource;
            return new DBFunctionCall().createCall(QUERY)
                    .withInput(2, request.getInsuranceId())
                    .withInput(3, request.getWorkshopId())
                    .withInput(4, request.getCurrentDate())
                    .withInput(5, request.getBranchCode())
                    .returns(1, OracleTypes.VARCHAR);

        } catch (Exception e) {
            logger.info(e.getMessage());
            return null;
        }
    }

}
