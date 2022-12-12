package ir.tamin.insurance.technical.function.refund.calcRefundParams;

import ir.tamin.framework.domain.function.AbstractDBFunction;
import ir.tamin.framework.domain.function.DBFunctionCall;
import ir.tamin.framework.domain.function.Mapping;
import ir.tamin.framework.domain.function.MappingType;
import ir.tamin.framework.ws.rest.repository.annotation.RESTResource;
import oracle.jdbc.OracleTypes;

@RESTResource
@Mapping(output = CalcRefundParamsValue.class, input =CalcRefundParamsInput.class, type = MappingType.COMPLEX)
public class CalcRefundParams extends AbstractDBFunction {
    private static final String QUERY = "{?=call  pck_recalsoldiers.Calc_refund_params(?,?,?,?,?)}";
    @Override
    public DBFunctionCall createCall() {

        CalcRefundParamsInput calcRefundParamsInput=(CalcRefundParamsInput) inputResource;
//        Date soldierDate= DateUtils.convertTimestampStringToDate(calcRefundParamsInput.getSolDate());
//        String soldDate =DateUtils.format(soldierDate, "yyyyMMdd");
        return new DBFunctionCall().createCall(QUERY)
                .withInput(2, calcRefundParamsInput.getBranchCode())
                .withInput(3, calcRefundParamsInput.getRisuid())
                .withInput(4, calcRefundParamsInput.getSolDate())
                .withInput(5, calcRefundParamsInput.getSequence())
                .withInput(6, calcRefundParamsInput.getRefundType())
                .returns(1, OracleTypes.CURSOR);
    }
}
