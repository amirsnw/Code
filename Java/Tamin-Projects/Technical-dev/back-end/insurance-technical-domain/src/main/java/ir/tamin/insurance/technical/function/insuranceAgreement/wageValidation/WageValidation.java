package ir.tamin.insurance.technical.function.insuranceAgreement.wageValidation;

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
@Mapping(type = MappingType.SINGLE, input = WageValidationInput.class, output = WageValidationValue.class)
public class WageValidation extends AbstractDBFunction {

    @Inject
    private Logger logger;
    private static final String QUERY = "{ ? = call Pck_Insured_request.Check_WageValidation( ? , ? , ? ,? ,? ,?,?,?,? ,?)}";

    @Override
    public DBFunctionCall createCall() {
        try {
            WageValidationInput request = (WageValidationInput) inputResource;
            return new DBFunctionCall().createCall(QUERY)
                    .withInput(2, request.getpCategoryTypeCode())
                    .withInput(3, request.getpInsurTypeCode())
                    .withInput(4, request.getpItem1Value())
                    .withInput(5, request.getpItem2Value())
                    .withInput(6, request.getpItem3Value())
                    .withInput(7, request.getpItem4Value())
                    .withInput(8, request.getpItem5Value())
                    .withInput(9, request.getpItem6Value())                   
                    .returns(1, OracleTypes.VARCHAR)
                    .returns(10, OracleTypes.VARCHAR)
                    .returns(11, OracleTypes.VARCHAR);

        } catch (Exception e) {
            logger.info(e.getMessage());
            return null;
        }
    }

}
