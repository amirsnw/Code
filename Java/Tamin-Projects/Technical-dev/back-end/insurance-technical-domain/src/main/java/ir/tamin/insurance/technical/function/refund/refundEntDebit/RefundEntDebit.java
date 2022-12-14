package ir.tamin.insurance.technical.function.refund.refundEntDebit;

import ir.tamin.framework.domain.function.AbstractDBFunction;
import ir.tamin.framework.domain.function.DBFunctionCall;
import ir.tamin.framework.domain.function.Mapping;
import ir.tamin.framework.domain.function.MappingType;
import ir.tamin.framework.ws.rest.repository.annotation.RESTResource;

import java.sql.Types;

@RESTResource
@Mapping(type = MappingType.SINGLE, input = RefundEntDebitInput.class, output = RefundEntDebitValue.class)
public class RefundEntDebit extends AbstractDBFunction {
    private static final String QUERY = "{? = call pck_ssuClaim.Refund_Ent_Debit(?,?)}";

    @Override
    public DBFunctionCall createCall() {
        try {
        RefundEntDebitInput refundEntDebitInput = (RefundEntDebitInput) inputResource;
        return new DBFunctionCall().createCall(QUERY)
                .withInput(2, refundEntDebitInput.getBranchCode())
                .withInput(3, refundEntDebitInput.getEntRequestNo())
                .returns(1,  Types.VARCHAR);
        }catch (Exception e)
        {
            e.printStackTrace();
            return  null;
        }
    }
}
