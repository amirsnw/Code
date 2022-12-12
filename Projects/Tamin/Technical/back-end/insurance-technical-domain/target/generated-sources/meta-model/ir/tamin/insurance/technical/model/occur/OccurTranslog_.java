package ir.tamin.insurance.technical.model.occur;

import java.sql.Timestamp;
import javax.annotation.Generated;
import javax.persistence.metamodel.SingularAttribute;
import javax.persistence.metamodel.StaticMetamodel;

@Generated(value="EclipseLink-2.5.1.v20130918-rNA", date="2022-11-02T13:02:50")
@StaticMetamodel(OccurTranslog.class)
public class OccurTranslog_ { 

    public static volatile SingularAttribute<OccurTranslog, String> transReqId;
    public static volatile SingularAttribute<OccurTranslog, String> brchSender;
    public static volatile SingularAttribute<OccurTranslog, String> brchOwner;
    public static volatile SingularAttribute<OccurTranslog, Timestamp> transDate;
    public static volatile SingularAttribute<OccurTranslog, String> brchReciver;
    public static volatile SingularAttribute<OccurTranslog, Long> reqId;
    public static volatile SingularAttribute<OccurTranslog, String> opuId;

}