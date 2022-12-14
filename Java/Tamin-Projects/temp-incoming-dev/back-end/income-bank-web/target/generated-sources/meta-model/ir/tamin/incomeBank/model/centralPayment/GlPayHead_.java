package ir.tamin.incomeBank.model.centralPayment;

import ir.tamin.incomeBank.model.centralPayment.GlPayDetail;
import ir.tamin.incomeBank.model.centralPayment.GlSubsystemType;
import ir.tamin.incomeBank.model.centralPayment.GlSystemType;
import java.math.BigDecimal;
import java.util.Date;
import javax.annotation.Generated;
import javax.persistence.metamodel.ListAttribute;
import javax.persistence.metamodel.SingularAttribute;
import javax.persistence.metamodel.StaticMetamodel;

@Generated(value="EclipseLink-2.5.1.v20130918-rNA", date="2022-12-13T16:15:32")
@StaticMetamodel(GlPayHead.class)
public class GlPayHead_ { 

    public static volatile SingularAttribute<GlPayHead, String> bankCode;
    public static volatile SingularAttribute<GlPayHead, Date> updateDate;
    public static volatile SingularAttribute<GlPayHead, Character> payStep;
    public static volatile SingularAttribute<GlPayHead, GlSubsystemType> subSystem;
    public static volatile SingularAttribute<GlPayHead, Date> toDate;
    public static volatile SingularAttribute<GlPayHead, Long> vocherHeaderId;
    public static volatile SingularAttribute<GlPayHead, String> updateUser;
    public static volatile SingularAttribute<GlPayHead, String> bankName;
    public static volatile SingularAttribute<GlPayHead, Date> checkDate;
    public static volatile SingularAttribute<GlPayHead, BigDecimal> payHeadId;
    public static volatile SingularAttribute<GlPayHead, Date> fromDate;
    public static volatile SingularAttribute<GlPayHead, String> payType;
    public static volatile ListAttribute<GlPayHead, GlPayDetail> payDetailList;
    public static volatile SingularAttribute<GlPayHead, GlSystemType> system;
    public static volatile SingularAttribute<GlPayHead, String> checkNo;
    public static volatile SingularAttribute<GlPayHead, String> createUser;
    public static volatile SingularAttribute<GlPayHead, String> listDescription;
    public static volatile SingularAttribute<GlPayHead, Date> createDate;

}