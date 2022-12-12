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
@Mapping(input = RefundRefrencePaymentInput.class, output = RefundRefrencePaymentValue.class, type = MappingType.COMPLEX)
public class RefundRefrencePayment extends AbstractDBFunction {

    public static final String QUERY = "{? =  call techins.pck_refund.getpaymentinfo(?,?)}";

    @Override
    public DBFunctionCall createCall() {
        try {
            RefundRefrencePaymentInput refrencePaymentInput = (RefundRefrencePaymentInput) inputResource;
            return new DBFunctionCall().createCall(QUERY)
                    .withInput(2, refrencePaymentInput.getPtype())
                    .withInput(3, refrencePaymentInput.getPrisunatcode())
                    .returns(1, OracleTypes.CURSOR);
        } catch (Exception e) {
            e.printStackTrace();
            return null;
        }
    }
}

