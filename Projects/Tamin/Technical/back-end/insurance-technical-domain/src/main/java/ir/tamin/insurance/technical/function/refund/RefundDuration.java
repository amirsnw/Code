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
@Mapping(input = RefundDurationInput.class, output = RefundDurationValue.class, type = MappingType.COMPLEX)
public class RefundDuration extends AbstractDBFunction {

    public static final String QUERY = "{? =  call techins.pck_refund.get_refund_duration(?)}";

    @Override
    public DBFunctionCall createCall() {
        try {
            RefundDurationInput refundDurationInput = (RefundDurationInput) inputResource;
            return new DBFunctionCall().createCall(QUERY)
                    .withInput(2, refundDurationInput.getPaymentrefid())
                    .returns(1, OracleTypes.CURSOR);
        } catch (Exception e) {
            e.printStackTrace();
            return null;
        }
    }
}
