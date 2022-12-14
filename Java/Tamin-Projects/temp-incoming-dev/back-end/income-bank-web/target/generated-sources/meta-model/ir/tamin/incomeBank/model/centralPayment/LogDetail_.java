package ir.tamin.incomeBank.model.centralPayment;

import ir.tamin.incomeBank.model.centralPayment.Log;
import javax.annotation.Generated;
import javax.persistence.metamodel.SingularAttribute;
import javax.persistence.metamodel.StaticMetamodel;

@Generated(value="EclipseLink-2.5.1.v20130918-rNA", date="2022-12-13T16:15:32")
@StaticMetamodel(LogDetail.class)
public class LogDetail_ { 

    public static volatile SingularAttribute<LogDetail, Log> log;
    public static volatile SingularAttribute<LogDetail, String> shenasePayment;
    public static volatile SingularAttribute<LogDetail, String> errorMessage;
    public static volatile SingularAttribute<LogDetail, String> errorCode;
    public static volatile SingularAttribute<LogDetail, Long> logDetailId;

}