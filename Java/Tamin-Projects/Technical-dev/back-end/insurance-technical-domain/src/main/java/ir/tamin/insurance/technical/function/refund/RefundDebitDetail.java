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
@Mapping(input = RefundDebitDetailInput.class, output = RefundDebitDetailValue.class, type = MappingType.COMPLEX)
public class RefundDebitDetail extends AbstractDBFunction {

    public static final String QUERY = "{? =  call techins.pck_refund.get_debit_detail(?,?,?,?)}";

    @Override
    public DBFunctionCall createCall() {
        try {
            RefundDebitDetailInput refundDebitDetailInput = (RefundDebitDetailInput) inputResource;
            return new DBFunctionCall().createCall(QUERY)
                    .withInput(2, refundDebitDetailInput.getPcws_dbtno())
                    .withInput(3, refundDebitDetailInput.getPnatcode())
                    .withInput(4, refundDebitDetailInput.getPsdate())
                    .withInput(5, refundDebitDetailInput.getPedate())
                    .returns(1, OracleTypes.CURSOR);
        } catch (Exception e) {
            e.printStackTrace();
            return null;
        }
    }
}
