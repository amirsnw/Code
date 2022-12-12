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
@Mapping(input = RefundDarmanCalcInput.class, output = RefundDarmanCalcValue.class, type = MappingType.SINGLE)
public class RefundDarmanCalc extends AbstractDBFunction {

    public static final String QUERY = "{? =  call techins.pck_refund.sis_calcrefund_darman(?,?,?,?,?,?)}";

    @Override
    public DBFunctionCall createCall() {
        try {
            RefundDarmanCalcInput refundDarmanCalcInput = (RefundDarmanCalcInput) inputResource;
            return new DBFunctionCall().createCall(QUERY)
                    .withInput(2, refundDarmanCalcInput.getP_cws_dbtno())
                    .withInput(3, refundDarmanCalcInput.getP_ref_sdate())
                    .withInput(4, refundDarmanCalcInput.getP_ref_edate())                    
                    .withInput(5, refundDarmanCalcInput.getP_selftype())
                    .withInput(6, refundDarmanCalcInput.getP_spcrate())
                    .withInput(7, refundDarmanCalcInput.getP_reason_code())
                    .returns(1, OracleTypes.NUMBER);
        } catch (Exception e) {
            e.printStackTrace();
            return null;
        }
    }
}
