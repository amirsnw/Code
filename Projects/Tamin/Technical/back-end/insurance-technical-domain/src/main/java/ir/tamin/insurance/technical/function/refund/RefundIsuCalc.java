package ir.tamin.insurance.technical.function.refund;

import ir.tamin.framework.domain.function.AbstractDBFunction;
import ir.tamin.framework.domain.function.DBFunctionCall;
import ir.tamin.framework.domain.function.Mapping;
import ir.tamin.framework.domain.function.MappingType;
import oracle.jdbc.OracleTypes;

/**
 *
 * @author a_khalighi
 */

@Mapping(input = RefundIsuCalcInput.class, output = RefundIsuCalcValue.class, type = MappingType.SINGLE)
public class RefundIsuCalc extends AbstractDBFunction {

    public static final String QUERY = "{? =  call techins.pck_refund.sis_calcrefund_isu(?,?,?,?,?,?)}";

    @Override
    public DBFunctionCall createCall() {
        try {
            RefundIsuCalcInput refundIsuCalcInput = (RefundIsuCalcInput) inputResource;
            return new DBFunctionCall().createCall(QUERY)
                    .withInput(2, refundIsuCalcInput.getP_cws_dbtno())
                    .withInput(3, refundIsuCalcInput.getP_ref_sdate())
                    .withInput(4, refundIsuCalcInput.getP_ref_edate())                                     
                    .withInput(5, refundIsuCalcInput.getP_selftype())
                    .withInput(6, refundIsuCalcInput.getP_spcrate())
                    .withInput(7, refundIsuCalcInput.getP_reason_code())
                    .returns(1, OracleTypes.NUMBER);
        } catch (Exception e) {
            e.printStackTrace();
            return null;
        }
    }
}
