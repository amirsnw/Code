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
@Mapping(input = RefundHistoryInput.class, output = RefundHistoryValue.class, type = MappingType.SINGLE)
public class RefundHistory extends AbstractDBFunction {

    public static final String QUERY = "{? =  call techins.pck_refund.Has_Active_Hist(?,?,?,?,?,?)}";

    @Override
    public DBFunctionCall createCall() {
        try {
            RefundHistoryInput refundHistoryInput = (RefundHistoryInput) inputResource;
            return new DBFunctionCall().createCall(QUERY)
                    .withInput(2, refundHistoryInput.getPrisuid())
                    .withInput(3, refundHistoryInput.getPuserid())
                    .withInput(4, refundHistoryInput.getPtypecode())
                    .withInput(5, refundHistoryInput.getPcategorytypecode())
                    .withInput(6, refundHistoryInput.getPsdate())
                    .withInput(7, refundHistoryInput.getPedate())
                    .returns(1, OracleTypes.VARCHAR);
        } catch (Exception e) {
            e.printStackTrace();
            return null;
        }
    }
}
