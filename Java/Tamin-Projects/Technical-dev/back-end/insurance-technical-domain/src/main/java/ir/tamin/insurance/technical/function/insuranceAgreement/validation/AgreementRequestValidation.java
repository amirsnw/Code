package ir.tamin.insurance.technical.function.insuranceAgreement.validation;

import ir.tamin.framework.domain.function.AbstractDBFunction;
import ir.tamin.framework.domain.function.DBFunctionCall;
import ir.tamin.framework.domain.function.Mapping;
import ir.tamin.framework.domain.function.MappingType;
import ir.tamin.framework.ws.rest.repository.annotation.RESTResource;
import oracle.jdbc.OracleTypes;
import org.slf4j.Logger;

import javax.inject.Inject;


    @RESTResource
    @Mapping(type = MappingType.SINGLE, input = AgreementRequestValidationInput.class, output = AgreementRequestValidationValue.class)
    public class AgreementRequestValidation extends AbstractDBFunction {

        @Inject
        private Logger logger;
        private static final String QUERY = "{ ? = call Pck_Insured_request.Check_validation( ? , ? , ? ,? )}";

        @Override
        public DBFunctionCall createCall() {
            try {
                AgreementRequestValidationInput request = (AgreementRequestValidationInput) inputResource;
                return new DBFunctionCall().createCall(QUERY)
                        .withInput(2, request.getpCategoryTypeCode())
                        .withInput(3, request.getpInsurTypeCode())
                        .withInput(4, request.getpItemName())
                        .withInput(5, request.getpItemValue())
                        .returns(1, OracleTypes.VARCHAR);

            } catch (Exception e) {
                logger.info(e.getMessage());
                return null;
            }
        }

    }
