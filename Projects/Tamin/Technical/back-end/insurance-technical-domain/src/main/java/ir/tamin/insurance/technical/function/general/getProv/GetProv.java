package ir.tamin.insurance.technical.function.general.getProv;

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
@Mapping(input = GetProvInput.class, output = GetProvValue.class, type = MappingType.SINGLE)

public class GetProv extends AbstractDBFunction {

    @Inject
    private Logger logger;
    private static final String QUERY = "{? = call GETPROVCODE(?)}";

    @Override
    public DBFunctionCall createCall() {
        try {
            GetProvInput inputRes = (GetProvInput) inputResource;
            return new DBFunctionCall().createCall(QUERY)
                    .withInput(2, inputRes.getBranchCode())                    
                    .returns(1, OracleTypes.VARCHAR);
        } catch (Exception e) {
            logger.info(e.getMessage());
            return null;
        }
    }
}
