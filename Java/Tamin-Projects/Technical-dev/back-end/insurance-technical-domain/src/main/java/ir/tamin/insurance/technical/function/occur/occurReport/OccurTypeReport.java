package ir.tamin.insurance.technical.function.occur.occurReport;

import ir.tamin.framework.domain.function.AbstractDBFunction;
import ir.tamin.framework.domain.function.DBFunctionCall;
import ir.tamin.framework.domain.function.Mapping;
import ir.tamin.framework.domain.function.MappingType;
import oracle.jdbc.OracleTypes;
import org.slf4j.Logger;

import javax.inject.Inject;

/**
 * Created by a-khalighi on 5/17/2022
*/
@Mapping(type = MappingType.COMPLEX, input = OccurTypeReportInput.class, output = OccurTypeReportValue.class)
public class OccurTypeReport extends  AbstractDBFunction {
    @Inject
    private Logger logger;
    private static final String QUERY = "{? = call  pckssupviews.get_vwrepssup_occur_type (?, ?, ?)}";


    @Override
    public DBFunctionCall createCall() {
        try {
            OccurTypeReportInput input = (OccurTypeReportInput) inputResource;
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
