package ir.tamin.incomeBank.model.accounting;

import ir.tamin.incomeBank.model.centralPayment.GlPayHead;
import java.math.BigDecimal;
import java.math.BigInteger;
import java.util.Date;
import javax.annotation.Generated;
import javax.persistence.metamodel.SingularAttribute;
import javax.persistence.metamodel.StaticMetamodel;

@Generated(value="EclipseLink-2.5.1.v20130918-rNA", date="2022-12-13T16:15:32")
@StaticMetamodel(GlOperationResult.class)
public class GlOperationResult_ { 

    public static volatile SingularAttribute<GlOperationResult, String> sendData;
    public static volatile SingularAttribute<GlOperationResult, Date> creationTime;
    public static volatile SingularAttribute<GlOperationResult, Date> controlDataData;
    public static volatile SingularAttribute<GlOperationResult, String> docType;
    public static volatile SingularAttribute<GlOperationResult, Date> sendDataDate;
    public static volatile SingularAttribute<GlOperationResult, BigInteger> voucherHeaderId;
    public static volatile SingularAttribute<GlOperationResult, String> issuDoc;
    public static volatile SingularAttribute<GlOperationResult, BigDecimal> id;
    public static volatile SingularAttribute<GlOperationResult, String> controlData;
    public static volatile SingularAttribute<GlOperationResult, Integer> systemTypeId;
    public static volatile SingularAttribute<GlOperationResult, Date> issuDocDate;
    public static volatile SingularAttribute<GlOperationResult, GlPayHead> payHeadId;

}