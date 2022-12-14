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

    
    @Mapping(input = RefundModifyHistoryInput.class, output = RefundModifyHistoryValue.class, type = MappingType.SINGLE)
    public class RefundModifyHistory extends AbstractDBFunction {

        public static final String QUERY = "{? =  call techins.pck_refund.Modify_Hist(?,?)}";

        @Override
        public DBFunctionCall createCall() {
            try {
                RefundModifyHistoryInput modifyHistoryInput = (RefundModifyHistoryInput) inputResource;
                return new DBFunctionCall().createCall(QUERY)
                        .withInput(2, modifyHistoryInput.getPreqid())
                        .withInput(3, modifyHistoryInput.getPcategorytypecode())
                        .returns(1, OracleTypes.VARCHAR);
            } catch (Exception e) {
                e.printStackTrace();
                return null;
            }
        }
    }
