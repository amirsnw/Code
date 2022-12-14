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
@Mapping(input = RefundDetailInput.class, output = RefundDetailValue.class, type = MappingType.COMPLEX)
public class RefundDetail extends AbstractDBFunction {

    public static final String QUERY = "{? =  call techins.pck_refund.get_refund_detail(?)}";

    @Override
    public DBFunctionCall createCall() {
        try {
            RefundDetailInput refundDetailInput = (RefundDetailInput) inputResource;
            return new DBFunctionCall().createCall(QUERY)
                    .withInput(2, refundDetailInput.getPaymentrefid())
                    .returns(1, OracleTypes.CURSOR);
        } catch (Exception e) {
            e.printStackTrace();
            return null;
        }
    }
}
