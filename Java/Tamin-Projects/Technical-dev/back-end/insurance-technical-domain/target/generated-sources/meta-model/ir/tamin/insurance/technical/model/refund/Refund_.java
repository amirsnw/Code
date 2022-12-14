package ir.tamin.insurance.technical.model.refund;

import ir.tamin.insurance.technical.model.baseinfo.PremiumType;
import ir.tamin.insurance.technical.model.baseinfo.RefundReason;
import ir.tamin.insurance.technical.model.insurance.InsuranceRegisteration;
import java.util.Date;
import javax.annotation.Generated;
import javax.persistence.metamodel.SingularAttribute;
import javax.persistence.metamodel.StaticMetamodel;

@Generated(value="EclipseLink-2.5.1.v20130918-rNA", date="2022-12-05T12:38:24")
@StaticMetamodel(Refund.class)
public class Refund_ { 

    public static volatile SingularAttribute<Refund, String> createUserId;
    public static volatile SingularAttribute<Refund, Date> bossDate;
    public static volatile SingularAttribute<Refund, String> editUserId;
    public static volatile SingularAttribute<Refund, String> contractNo;
    public static volatile SingularAttribute<Refund, String> regBranchCode;
    public static volatile SingularAttribute<Refund, String> cancelUserId;
    public static volatile SingularAttribute<Refund, String> categoryTypeCode;
    public static volatile SingularAttribute<Refund, PremiumType> insuranceType;
    public static volatile SingularAttribute<Refund, Date> isuStartDate;
    public static volatile SingularAttribute<Refund, String> debitNo;
    public static volatile SingularAttribute<Refund, Long> isuAmount;
    public static volatile SingularAttribute<Refund, String> paymentRefrenceId;
    public static volatile SingularAttribute<Refund, Date> requestDate;
    public static volatile SingularAttribute<Refund, String> insuranceId;
    public static volatile SingularAttribute<Refund, InsuranceRegisteration> insuranceRegisteration;
    public static volatile SingularAttribute<Refund, String> isuDebitTypeCode;
    public static volatile SingularAttribute<Refund, Long> darmanAmount;
    public static volatile SingularAttribute<Refund, Date> createDate;
    public static volatile SingularAttribute<Refund, RefundReason> refundReason;
    public static volatile SingularAttribute<Refund, String> isuTypeCode;
    public static volatile SingularAttribute<Refund, Date> darmanEndDate;
    public static volatile SingularAttribute<Refund, Date> editDate;
    public static volatile SingularAttribute<Refund, String> requestSerial;
    public static volatile SingularAttribute<Refund, String> branchCode;
    public static volatile SingularAttribute<Refund, String> techConfirmUserId;
    public static volatile SingularAttribute<Refund, Date> canceldate;
    public static volatile SingularAttribute<Refund, String> nationalId;
    public static volatile SingularAttribute<Refund, String> darmanDebitTypeCode;
    public static volatile SingularAttribute<Refund, Date> techConfirmDate;
    public static volatile SingularAttribute<Refund, Date> isuEndDate;
    public static volatile SingularAttribute<Refund, Date> darmanStartDate;
    public static volatile SingularAttribute<Refund, Integer> darmanDays;
    public static volatile SingularAttribute<Refund, Integer> isuDays;
    public static volatile SingularAttribute<Refund, String> bossUserId;
    public static volatile SingularAttribute<Refund, String> status;

}