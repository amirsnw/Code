package ir.tamin.insurance.technical.function.insuranceAgreement.isuStatus;

import ir.tamin.framework.domain.function.AbstractDBFunction;
import ir.tamin.framework.domain.function.DBFunctionCall;
import ir.tamin.framework.domain.function.Mapping;
import ir.tamin.framework.domain.function.MappingType;
import ir.tamin.framework.ws.rest.repository.annotation.RESTResource;
import oracle.jdbc.OracleTypes;
import org.slf4j.Logger;

import javax.inject.Inject;

@RESTResource
@Mapping(type = MappingType.SINGLE, input = IsuStatusInput.class, output = IsuStatusValue.class)
public class IsuStatus extends AbstractDBFunction {

    @Inject
    private Logger logger;
    private static final String QUERY = "{ ? = call cregister.pckcpopularfuncs.getstatofisu( ? , ? )}";

    @Override
    public DBFunctionCall createCall() {
        try {
            IsuStatusInput request = (IsuStatusInput) inputResource;
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
