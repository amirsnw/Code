package ir.tamin.incomeBank.model.centralPayment;

import ir.tamin.incomeBank.model.centralPayment.GlSystemType;
import ir.tamin.incomeBank.model.centralPayment.LogDetail;
import java.util.Date;
import javax.annotation.Generated;
import javax.persistence.metamodel.ListAttribute;
import javax.persistence.metamodel.SingularAttribute;
import javax.persistence.metamodel.StaticMetamodel;

@Generated(value="EclipseLink-2.5.1.v20130918-rNA", date="2022-12-13T16:15:32")
@StaticMetamodel(Log.class)
public class Log_ { 

    public static volatile SingularAttribute<Log, GlSystemType> system;
    public static volatile SingularAttribute<Log, Long> logId;
    public static volatile SingularAttribute<Log, String> createUser;
    public static volatile ListAttribute<Log, LogDetail> logDetails;
    public static volatile SingularAttribute<Log, String> priority;
    public static volatile SingularAttribute<Log, String> logText;
    public static volatile SingularAttribute<Log, Date> createDate;

}