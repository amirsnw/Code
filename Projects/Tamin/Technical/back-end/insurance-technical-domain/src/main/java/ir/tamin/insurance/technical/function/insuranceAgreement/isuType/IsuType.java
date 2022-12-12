package ir.tamin.insurance.technical.function.insuranceAgreement.isuType;

import ir.tamin.framework.domain.function.AbstractDBFunction;
import ir.tamin.framework.domain.function.DBFunctionCall;
import ir.tamin.framework.domain.function.Mapping;
import ir.tamin.framework.domain.function.MappingType;
import ir.tamin.framework.ws.rest.repository.annotation.RESTResource;
import oracle.jdbc.OracleTypes;
import org.slf4j.Logger;

import javax.inject.Inject;

@RESTResource
@Mapping(type = MappingType.SINGLE, input = IsuTypeInput.class, output = IsuTypeValue.class)
public class IsuType extends AbstractDBFunction {

    @Inject
    private Logger logger;
    private static final String QUERY = "{ ? = call cregister.pckcpopularfuncs.getisutypeofisu( ? , ? )}";

    @Override
    public DBFunctionCall createCall() {
        try {
            IsuTypeInput request = (IsuTypeInput) inputResource;
            return new DBFunctionCall().createCall(QUERY)
                    .withInput(2, request.getInsuranceId())
                    .withInput(3, request.getStartDate())
                    .returns(1, OracleTypes.VARCHAR);

        } catch (Exception e) {
            logger.info(e.getMessage());
            return null;
        }
    }

}
