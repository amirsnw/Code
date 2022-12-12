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

@Mapping(type = MappingType.COMPLEX, input = OccurReviewReportInput.class, output = OccurReviewReportValue.class)
public class OccurReviewReport extends AbstractDBFunction {
    @Inject
    private Logger logger;
    private static final String QUERY = "{? = call pckssupviews.get_vwssup_occur_review (?)}";

    @Override
    public DBFunctionCall createCall() {
        try {
            OccurReviewReportInput input = (OccurReviewReportInput) inputResource;
            return new DBFunctionCall().createCall(QUERY)
                    .withInput(2, input.getReqId())
                    .returns(1, OracleTypes.CURSOR);
        } catch (Exception e) {
            logger.info(e.getMessage());
            return null;
        }
    }

}



