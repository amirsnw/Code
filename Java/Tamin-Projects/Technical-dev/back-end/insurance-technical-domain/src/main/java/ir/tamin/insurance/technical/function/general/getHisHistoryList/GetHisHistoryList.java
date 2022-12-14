package ir.tamin.insurance.technical.function.general.getHisHistoryList;

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
 * @author m_Alipour
 */

@RESTResource
@Mapping( input = GetHisHistoryListInput.class,output = GetHisHistoryListValue.class, type = MappingType.COMPLEX)

public class GetHisHistoryList  extends AbstractDBFunction {

    @Inject
    private Logger logger;
    private static final String QUERY = "{? = call pckssupviews.get_showhist_14_27(?, ?, ?)}";

    @Override
    public DBFunctionCall createCall() {
        try{
            GetHisHistoryListInput inputRes=(GetHisHistoryListInput) inputResource;
            return new DBFunctionCall().createCall(QUERY)
                    .withInput(2, inputRes.getBranchCode())
                    .withInput(3, inputRes.getIsuID())
                    .withInput(4, inputRes.getIsuNatCode())
                    .returns(1, OracleTypes.CURSOR);
        }
        catch(Exception e){
            logger.info(e.getMessage());
            return null;
        }

    }
}
