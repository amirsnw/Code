package ir.tamin.insurance.technical.model.refund;

import java.util.Date;
import javax.annotation.Generated;
import javax.persistence.metamodel.SingularAttribute;
import javax.persistence.metamodel.StaticMetamodel;

@Generated(value="EclipseLink-2.5.1.v20130918-rNA", date="2022-12-05T12:38:24")
@StaticMetamodel(RefundFinanceLog.class)
public class RefundFinanceLog_ { 

    public static volatile SingularAttribute<RefundFinanceLog, String> requestSerial;
    public static volatile SingularAttribute<RefundFinanceLog, String> operationDate;
    public static volatile SingularAttribute<RefundFinanceLog, String> statusDesc;
    public static volatile SingularAttribute<RefundFinanceLog, Date> logDate;
    public static volatile SingularAttribute<RefundFinanceLog, String> paymentId;
    public static volatile SingularAttribute<RefundFinanceLog, String> chequeNumber;
    public static volatile SingularAttribute<RefundFinanceLog, String> status;

}