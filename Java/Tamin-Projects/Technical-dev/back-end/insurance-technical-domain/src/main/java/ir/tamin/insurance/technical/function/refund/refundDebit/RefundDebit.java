package ir.tamin.insurance.technical.function.refund.refundDebit;

import ir.tamin.framework.domain.function.AbstractDBFunction;
import ir.tamin.framework.domain.function.DBFunctionCall;
import ir.tamin.framework.domain.function.Mapping;
import ir.tamin.framework.domain.function.MappingType;
import ir.tamin.framework.ws.rest.repository.annotation.RESTResource;



@RESTResource
@Mapping(type = MappingType.SINGLE, input =RefundDebitInput.class)
public class RefundDebit extends AbstractDBFunction {
    private static final String QUERY = "{call  pck_recalsoldiers.refunddebit(?,?,?,?)}";
    @Override
    public DBFunctionCall createCall() {
        try {


            RefundDebitInput refundDebitInput = (RefundDebitInput) inputResource;
            return new DBFunctionCall().createCall(QUERY)
                    .withInput(1, refundDebitInput.getBranchCode())
                    .withInput(2, refundDebitInput.getSoldierDebt())
                    .withInput(3, refundDebitInput.getPrefundAmount())
                    .withInput(4, refundDebitInput.getPrefType());

        }catch (Exception e)
        {
            e.getMessage();
        return  null;
        }
    }
}
