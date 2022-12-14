package ir.tamin.insurance.technical.function.insuranceAgreement.medicalValidation;

import ir.tamin.framework.domain.function.AbstractDBFunction;
import ir.tamin.framework.domain.function.DBFunctionCall;
import ir.tamin.framework.domain.function.Mapping;
import ir.tamin.framework.domain.function.MappingType;
import ir.tamin.framework.ws.rest.repository.annotation.RESTResource;
import oracle.jdbc.OracleTypes;
import org.slf4j.Logger;

import javax.inject.Inject;

@RESTResource
@Mapping(type = MappingType.SINGLE, input = MedicalValidationInput.class, output = MedicalValidationValue.class)
public class MedicalValidation extends AbstractDBFunction {

    @Inject
    private Logger logger;
    private static final String QUERY = "{ ? = call pck_specialinscntrct.fnc_rethisformedical( ? , ? , ? )}";

    @Override
    public DBFunctionCall createCall() {
        try {
            MedicalValidationInput request = (MedicalValidationInput) inputResource;
            return new DBFunctionCall().createCall(QUERY)
                    .withInput(2, request.getInsuranceId())
                    .withInput(3, request.getNationalCode())
                    .withInput(4, request.getRequestDate())                    
                    .returns(1, OracleTypes.VARCHAR);

        } catch (Exception e) {
            logger.info(e.getMessage());
            return null;
        }
    }

}
