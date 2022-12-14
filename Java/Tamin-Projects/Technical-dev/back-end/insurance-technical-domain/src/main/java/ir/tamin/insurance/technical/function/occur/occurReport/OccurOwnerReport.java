package ir.tamin.insurance.technical.function.occur.occurReport;

import ir.tamin.framework.domain.function.AbstractDBFunction;
import ir.tamin.framework.domain.function.DBFunctionCall;
import ir.tamin.framework.domain.function.Mapping;
import ir.tamin.framework.domain.function.MappingType;
import ir.tamin.framework.ws.rest.repository.annotation.RESTResource;
import oracle.jdbc.OracleTypes;
import org.slf4j.Logger;

import javax.inject.Inject;

/**
 * Created by a-khalighi on 5/17/2022
*/
@RESTResource

@Mapping(type = MappingType.COMPLEX, input = OccurOwnerReportInput.class, output = OccurOwnerReportValue.class)
public class OccurOwnerReport extends AbstractDBFunction {
    @Inject
    private Logger logger;
    private static final String QUERY = "{? = call pckssupviews.get_vwrepssup_occur_owner (?, ?, ?)}";


    @Override
    public DBFunctionCall createCall() {
        try {
            OccurOwnerReportInput input = (OccurOwnerReportInput) inputResource;
            return new DBFunctionCall().createCall(QUERY)
                    .withInput(2, input.getBranchCode())
                    .withInput(3, input.getStartDate())
                    .withInput(4, input.getEndDate())
                  /*  .withInput(5, null)
                    .withInput(6, null)*/
                    .returns(1, OracleTypes.CURSOR);
        } catch (Exception e) {
            logger.info(e.getMessage());
            return null;
        }
    }

}
