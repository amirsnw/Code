package ir.tamin.insurance.technical.function.insuranceAgreement.existHistory88;

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
    @Mapping(type = MappingType.SINGLE, input = ExistHistory88Input.class, output = ExistHistory88Value.class)
    public class ExistHistory88 extends AbstractDBFunction {

        @Inject
        private Logger logger;
        private static final String QUERY = "{ ? = call pck_insured_request.existhistfrom88( ? , ? )}";

        @Override
        public DBFunctionCall createCall() {
            try {
                ExistHistory88Input request = (ExistHistory88Input) inputResource;
                return new DBFunctionCall().createCall(QUERY)
                        .withInput(2, request.getBranchCode())
                        .withInput(3, request.getInsuranceId())
                        .returns(1, OracleTypes.VARCHAR);

            } catch (Exception e) {
                logger.info(e.getMessage());
                return null;
            }
        }
    
}
