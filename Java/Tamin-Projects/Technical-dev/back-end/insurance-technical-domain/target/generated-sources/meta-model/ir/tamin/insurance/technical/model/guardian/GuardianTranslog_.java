package ir.tamin.insurance.technical.model.guardian;

import java.sql.Timestamp;
import javax.annotation.Generated;
import javax.persistence.metamodel.SingularAttribute;
import javax.persistence.metamodel.StaticMetamodel;

@Generated(value="EclipseLink-2.5.1.v20130918-rNA", date="2022-12-05T12:38:24")
@StaticMetamodel(GuardianTranslog.class)
public class GuardianTranslog_ { 

    public static volatile SingularAttribute<GuardianTranslog, String> transReqId;
    public static volatile SingularAttribute<GuardianTranslog, String> brchSender;
    public static volatile SingularAttribute<GuardianTranslog, String> brchOwner;
    public static volatile SingularAttribute<GuardianTranslog, String> reqSerial;
    public static volatile SingularAttribute<GuardianTranslog, Timestamp> transDate;
    public static volatile SingularAttribute<GuardianTranslog, String> brchReciver;
    public static volatile SingularAttribute<GuardianTranslog, String> opuId;

}