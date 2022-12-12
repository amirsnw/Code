package ir.tamin.insurance.technical.function.general.getLastHistInfo;

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
@Mapping( input = GetLastHisInfoInput.class,output = GetLastHisInfoValue.class, type = MappingType.COMPLEX)

public class GetLastHistInfo extends AbstractDBFunction{
    @Inject
    private Logger logger;
    private static final String QUERY = "{? = call pckSsupViews.get_last_hist_info(?, ?, ?)}";

    @Override
    public DBFunctionCall createCall() {
        try{
            GetLastHisInfoInput inputRes=(GetLastHisInfoInput) inputResource;
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
