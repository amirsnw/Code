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
@Mapping(input = RefundReduceHistInput.class, output = RefundReduceHistValue.class, type = MappingType.SINGLE)
public class RefundReduceHist extends AbstractDBFunction {

    public static final String QUERY = "{? =  call rinda.pck_ins_histacnt.reducekhashist(?,?,?,?,?,?,?,?,?,?,?)}";

    @Override
    public DBFunctionCall createCall() {
        try {
            RefundReduceHistInput refundReduceHistInput = (RefundReduceHistInput) inputResource;
            return new DBFunctionCall().createCall(QUERY)
                    .withInput(2, refundReduceHistInput.getPnatid())
                    .withInput(3, refundReduceHistInput.getPbrch_code())
                    .withInput(4, refundReduceHistInput.getPuserid())
                    .withInput(5, refundReduceHistInput.getP_risuid())
                    .withInput(6, refundReduceHistInput.getP_ordno())
                    .withInput(7, refundReduceHistInput.getP_dordno())
                    .withInput(8, refundReduceHistInput.getP_worsdate())
                    .withInput(9, refundReduceHistInput.getP_woredate())
                    .withInput(10, refundReduceHistInput.getP_wordays())
                    .withInput(11, refundReduceHistInput.getP_mazadflg())
                    .returns(12, OracleTypes.VARCHAR)
                    .returns(1, OracleTypes.NUMBER);
        } catch (Exception e) {
            e.printStackTrace();
            return null;
        }
    }
}
