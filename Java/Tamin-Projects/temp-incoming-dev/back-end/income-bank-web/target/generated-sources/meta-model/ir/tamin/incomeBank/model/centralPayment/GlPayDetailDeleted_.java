package ir.tamin.incomeBank.model.centralPayment;

import ir.tamin.incomeBank.model.baseinfo.Branch;
import ir.tamin.incomeBank.model.centralPayment.GlSubsystemType;
import ir.tamin.incomeBank.model.centralPayment.GlSystemType;
import java.math.BigDecimal;
import java.util.Date;
import javax.annotation.Generated;
import javax.persistence.metamodel.SingularAttribute;
import javax.persistence.metamodel.StaticMetamodel;

@Generated(value="EclipseLink-2.5.1.v20130918-rNA", date="2022-12-13T16:15:32")
@StaticMetamodel(GlPayDetailDeleted.class)
public class GlPayDetailDeleted_ { 

    public static volatile SingularAttribute<GlPayDetailDeleted, String> secondConfirmDate;
    public static volatile SingularAttribute<GlPayDetailDeleted, String> lastName;
    public static volatile SingularAttribute<GlPayDetailDeleted, Date> updateDate;
    public static volatile SingularAttribute<GlPayDetailDeleted, GlSubsystemType> subSystem;
    public static volatile SingularAttribute<GlPayDetailDeleted, String> calcStartDate;
    public static volatile SingularAttribute<GlPayDetailDeleted, BigDecimal> payDetailDeletedId;
    public static volatile SingularAttribute<GlPayDetailDeleted, String> calcEndDate;
    public static volatile SingularAttribute<GlPayDetailDeleted, String> natcode;
    public static volatile SingularAttribute<GlPayDetailDeleted, Integer> alphabetCode;
    public static volatile SingularAttribute<GlPayDetailDeleted, String> sendToMaliUser;
    public static volatile SingularAttribute<GlPayDetailDeleted, String> alphabet;
    public static volatile SingularAttribute<GlPayDetailDeleted, Branch> branch;
    public static volatile SingularAttribute<GlPayDetailDeleted, BigDecimal> payHeadId;
    public static volatile SingularAttribute<GlPayDetailDeleted, String> ssn;
    public static volatile SingularAttribute<GlPayDetailDeleted, String> isDead;
    public static volatile SingularAttribute<GlPayDetailDeleted, Date> payDocdat;
    public static volatile SingularAttribute<GlPayDetailDeleted, String> sendToMaliDate;
    public static volatile SingularAttribute<GlPayDetailDeleted, Long> payAmount;
    public static volatile SingularAttribute<GlPayDetailDeleted, String> isustatdesc;
    public static volatile SingularAttribute<GlPayDetailDeleted, String> refIdOfPayDoc;
    public static volatile SingularAttribute<GlPayDetailDeleted, String> refIdOfPayDocDate;
    public static volatile SingularAttribute<GlPayDetailDeleted, String> secondConfirmUser;
    public static volatile SingularAttribute<GlPayDetailDeleted, String> accountNo;
    public static volatile SingularAttribute<GlPayDetailDeleted, String> pensionerId;
    public static volatile SingularAttribute<GlPayDetailDeleted, String> firstConfirmDate;
    public static volatile SingularAttribute<GlPayDetailDeleted, String> payDocno;
    public static volatile SingularAttribute<GlPayDetailDeleted, Date> payFromDate;
    public static volatile SingularAttribute<GlPayDetailDeleted, String> isutypedesc;
    public static volatile SingularAttribute<GlPayDetailDeleted, Date> deleteDate;
    public static volatile SingularAttribute<GlPayDetailDeleted, String> bankCode;
    public static volatile SingularAttribute<GlPayDetailDeleted, String> payMode;
    public static volatile SingularAttribute<GlPayDetailDeleted, String> updateUser;
    public static volatile SingularAttribute<GlPayDetailDeleted, String> sendToMaliUserDesc;
    public static volatile SingularAttribute<GlPayDetailDeleted, String> deleteReason;
    public static volatile SingularAttribute<GlPayDetailDeleted, String> isustatcode;
    public static volatile SingularAttribute<GlPayDetailDeleted, String> firstName;
    public static volatile SingularAttribute<GlPayDetailDeleted, String> accCode;
    public static volatile SingularAttribute<GlPayDetailDeleted, String> risuid;
    public static volatile SingularAttribute<GlPayDetailDeleted, GlSystemType> system;
    public static volatile SingularAttribute<GlPayDetailDeleted, String> hasAgent;
    public static volatile SingularAttribute<GlPayDetailDeleted, String> nationality;
    public static volatile SingularAttribute<GlPayDetailDeleted, String> accidentcode;
    public static volatile SingularAttribute<GlPayDetailDeleted, String> firstConfirmUser;
    public static volatile SingularAttribute<GlPayDetailDeleted, String> deleteUser;
    public static volatile SingularAttribute<GlPayDetailDeleted, Date> payToDate;
    public static volatile SingularAttribute<GlPayDetailDeleted, String> isutypecode;
    public static volatile SingularAttribute<GlPayDetailDeleted, String> isHamkar;
    public static volatile SingularAttribute<GlPayDetailDeleted, Character> status;

}