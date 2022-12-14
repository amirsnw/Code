package ir.tamin.incomeBank.model.centralPayment;

import ir.tamin.incomeBank.model.baseinfo.Branch;
import ir.tamin.incomeBank.model.centralPayment.GlPayHead;
import ir.tamin.incomeBank.model.centralPayment.GlSubsystemType;
import java.math.BigDecimal;
import java.util.Date;
import javax.annotation.Generated;
import javax.persistence.metamodel.SingularAttribute;
import javax.persistence.metamodel.StaticMetamodel;

@Generated(value="EclipseLink-2.5.1.v20130918-rNA", date="2022-12-13T16:15:32")
@StaticMetamodel(GlPayDetail.class)
public class GlPayDetail_ { 

    public static volatile SingularAttribute<GlPayDetail, String> secondConfirmDate;
    public static volatile SingularAttribute<GlPayDetail, String> lastName;
    public static volatile SingularAttribute<GlPayDetail, Date> updateDate;
    public static volatile SingularAttribute<GlPayDetail, GlSubsystemType> subSystem;
    public static volatile SingularAttribute<GlPayDetail, String> calcStartDate;
    public static volatile SingularAttribute<GlPayDetail, Long> returnVocherHeaderId;
    public static volatile SingularAttribute<GlPayDetail, String> calcEndDate;
    public static volatile SingularAttribute<GlPayDetail, String> natcode;
    public static volatile SingularAttribute<GlPayDetail, Integer> alphabetCode;
    public static volatile SingularAttribute<GlPayDetail, String> sendToMaliUser;
    public static volatile SingularAttribute<GlPayDetail, String> alphabet;
    public static volatile SingularAttribute<GlPayDetail, Branch> branch;
    public static volatile SingularAttribute<GlPayDetail, BigDecimal> payDetailId;
    public static volatile SingularAttribute<GlPayDetail, String> ssn;
    public static volatile SingularAttribute<GlPayDetail, String> isDead;
    public static volatile SingularAttribute<GlPayDetail, Date> payDocdat;
    public static volatile SingularAttribute<GlPayDetail, String> sendToMaliDate;
    public static volatile SingularAttribute<GlPayDetail, Date> returnDate;
    public static volatile SingularAttribute<GlPayDetail, Long> payAmount;
    public static volatile SingularAttribute<GlPayDetail, String> isustatdesc;
    public static volatile SingularAttribute<GlPayDetail, String> refIdOfPayDoc;
    public static volatile SingularAttribute<GlPayDetail, String> refIdOfPayDocDate;
    public static volatile SingularAttribute<GlPayDetail, String> secondConfirmUser;
    public static volatile SingularAttribute<GlPayDetail, String> returnReason;
    public static volatile SingularAttribute<GlPayDetail, String> accountNo;
    public static volatile SingularAttribute<GlPayDetail, String> pensionerId;
    public static volatile SingularAttribute<GlPayDetail, String> firstConfirmDate;
    public static volatile SingularAttribute<GlPayDetail, String> payDocno;
    public static volatile SingularAttribute<GlPayDetail, String> isutypedesc;
    public static volatile SingularAttribute<GlPayDetail, GlPayHead> payHead;
    public static volatile SingularAttribute<GlPayDetail, String> payMode;
    public static volatile SingularAttribute<GlPayDetail, String> updateUser;
    public static volatile SingularAttribute<GlPayDetail, String> sendToMaliUserDesc;
    public static volatile SingularAttribute<GlPayDetail, String> returnVocherHeaderNo;
    public static volatile SingularAttribute<GlPayDetail, String> returnUser;
    public static volatile SingularAttribute<GlPayDetail, String> isustatcode;
    public static volatile SingularAttribute<GlPayDetail, String> returnVocherHeaderStatus;
    public static volatile SingularAttribute<GlPayDetail, String> firstName;
    public static volatile SingularAttribute<GlPayDetail, String> accCode;
    public static volatile SingularAttribute<GlPayDetail, String> risuid;
    public static volatile SingularAttribute<GlPayDetail, String> hasAgent;
    public static volatile SingularAttribute<GlPayDetail, String> nationality;
    public static volatile SingularAttribute<GlPayDetail, String> accidentcode;
    public static volatile SingularAttribute<GlPayDetail, String> firstConfirmUser;
    public static volatile SingularAttribute<GlPayDetail, String> isutypecode;
    public static volatile SingularAttribute<GlPayDetail, String> isHamkar;
    public static volatile SingularAttribute<GlPayDetail, Character> status;

}