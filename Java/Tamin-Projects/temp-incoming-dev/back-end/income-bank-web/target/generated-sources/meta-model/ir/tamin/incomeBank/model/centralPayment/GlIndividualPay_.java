package ir.tamin.incomeBank.model.centralPayment;

import ir.tamin.incomeBank.model.centralPayment.GlIndividualPayHead;
import ir.tamin.incomeBank.model.centralPayment.GlSubsystemType;
import ir.tamin.incomeBank.model.centralPayment.GlSystemType;
import java.math.BigDecimal;
import java.math.BigInteger;
import java.util.Date;
import javax.annotation.Generated;
import javax.persistence.metamodel.SingularAttribute;
import javax.persistence.metamodel.StaticMetamodel;

@Generated(value="EclipseLink-2.5.1.v20130918-rNA", date="2022-12-13T16:15:32")
@StaticMetamodel(GlIndividualPay.class)
public class GlIndividualPay_ { 

    public static volatile SingularAttribute<GlIndividualPay, String> lastName;
    public static volatile SingularAttribute<GlIndividualPay, String> fatherName;
    public static volatile SingularAttribute<GlIndividualPay, Date> updateDate;
    public static volatile SingularAttribute<GlIndividualPay, String> accountSideType;
    public static volatile SingularAttribute<GlIndividualPay, GlSubsystemType> subSystem;
    public static volatile SingularAttribute<GlIndividualPay, String> natcode;
    public static volatile SingularAttribute<GlIndividualPay, String> shenasepayment;
    public static volatile SingularAttribute<GlIndividualPay, Date> sendToBankDate;
    public static volatile SingularAttribute<GlIndividualPay, String> effectivedate;
    public static volatile SingularAttribute<GlIndividualPay, String> ssn;
    public static volatile SingularAttribute<GlIndividualPay, String> accountSideNo;
    public static volatile SingularAttribute<GlIndividualPay, GlIndividualPayHead> individualPayHead;
    public static volatile SingularAttribute<GlIndividualPay, BigInteger> payAmount;
    public static volatile SingularAttribute<GlIndividualPay, String> unitCode;
    public static volatile SingularAttribute<GlIndividualPay, String> destinationaccno;
    public static volatile SingularAttribute<GlIndividualPay, String> errordescSend;
    public static volatile SingularAttribute<GlIndividualPay, String> wwwStatus;
    public static volatile SingularAttribute<GlIndividualPay, String> errorcode;
    public static volatile SingularAttribute<GlIndividualPay, Long> bnkamount;
    public static volatile SingularAttribute<GlIndividualPay, Date> createDate;
    public static volatile SingularAttribute<GlIndividualPay, String> errorcodeSend;
    public static volatile SingularAttribute<GlIndividualPay, String> unitName;
    public static volatile SingularAttribute<GlIndividualPay, String> chequeNo;
    public static volatile SingularAttribute<GlIndividualPay, String> mobile;
    public static volatile SingularAttribute<GlIndividualPay, String> updateUser;
    public static volatile SingularAttribute<GlIndividualPay, String> shenasehNo;
    public static volatile SingularAttribute<GlIndividualPay, String> idNO;
    public static volatile SingularAttribute<GlIndividualPay, String> chequeDate;
    public static volatile SingularAttribute<GlIndividualPay, String> firstName;
    public static volatile SingularAttribute<GlIndividualPay, String> errordesc;
    public static volatile SingularAttribute<GlIndividualPay, GlSystemType> system;
    public static volatile SingularAttribute<GlIndividualPay, String> sendType;
    public static volatile SingularAttribute<GlIndividualPay, String> createUser;
    public static volatile SingularAttribute<GlIndividualPay, BigDecimal> payId;
    public static volatile SingularAttribute<GlIndividualPay, String> status;

}