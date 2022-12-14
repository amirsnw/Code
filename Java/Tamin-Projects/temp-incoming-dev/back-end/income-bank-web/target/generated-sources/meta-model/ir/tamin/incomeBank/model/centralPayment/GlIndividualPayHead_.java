package ir.tamin.incomeBank.model.centralPayment;

import ir.tamin.incomeBank.model.centralPayment.GlIndividualPay;
import ir.tamin.incomeBank.model.centralPayment.GlSubsystemType;
import ir.tamin.incomeBank.model.centralPayment.GlSystemType;
import java.math.BigDecimal;
import java.util.Date;
import javax.annotation.Generated;
import javax.persistence.metamodel.ListAttribute;
import javax.persistence.metamodel.SingularAttribute;
import javax.persistence.metamodel.StaticMetamodel;

@Generated(value="EclipseLink-2.5.1.v20130918-rNA", date="2022-12-13T16:15:32")
@StaticMetamodel(GlIndividualPayHead.class)
public class GlIndividualPayHead_ { 

    public static volatile SingularAttribute<GlIndividualPayHead, BigDecimal> totalAmount;
    public static volatile SingularAttribute<GlIndividualPayHead, String> listDesc;
    public static volatile SingularAttribute<GlIndividualPayHead, GlSystemType> system;
    public static volatile SingularAttribute<GlIndividualPayHead, String> sendToBankUser;
    public static volatile SingularAttribute<GlIndividualPayHead, GlSubsystemType> subSystem;
    public static volatile ListAttribute<GlIndividualPayHead, GlIndividualPay> individualPayDetailList;
    public static volatile SingularAttribute<GlIndividualPayHead, Long> totalQty;
    public static volatile SingularAttribute<GlIndividualPayHead, String> createUser;
    public static volatile SingularAttribute<GlIndividualPayHead, Date> sendToBankDate;
    public static volatile SingularAttribute<GlIndividualPayHead, BigDecimal> payHeadId;
    public static volatile SingularAttribute<GlIndividualPayHead, Date> createDate;
    public static volatile SingularAttribute<GlIndividualPayHead, String> status;

}