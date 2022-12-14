package ir.tamin.incomeBank.model.centralPayment;

import ir.tamin.incomeBank.model.centralPayment.GlSystemType;
import java.util.Date;
import javax.annotation.Generated;
import javax.persistence.metamodel.SingularAttribute;
import javax.persistence.metamodel.StaticMetamodel;

@Generated(value="EclipseLink-2.5.1.v20130918-rNA", date="2022-12-13T16:15:32")
@StaticMetamodel(Setting.class)
public class Setting_ { 

    public static volatile SingularAttribute<Setting, String> userSignature;
    public static volatile SingularAttribute<Setting, String> certChainValidation;
    public static volatile SingularAttribute<Setting, Date> updateDate;
    public static volatile SingularAttribute<Setting, String> signEvaluation;
    public static volatile SingularAttribute<Setting, String> bonyadAccountNo;
    public static volatile SingularAttribute<Setting, String> updateUser;
    public static volatile SingularAttribute<Setting, Long> epMaxVal;
    public static volatile SingularAttribute<Setting, String> bonyadBankBrchCode;
    public static volatile SingularAttribute<Setting, String> bonyadBankBrchName;
    public static volatile SingularAttribute<Setting, String> certOcspValidation;
    public static volatile SingularAttribute<Setting, String> x509certificate;
    public static volatile SingularAttribute<Setting, GlSystemType> system;
    public static volatile SingularAttribute<Setting, String> tbsDesc;
    public static volatile SingularAttribute<Setting, String> rightelReturnId;
    public static volatile SingularAttribute<Setting, String> createUser;
    public static volatile SingularAttribute<Setting, String> certCrlValidation;
    public static volatile SingularAttribute<Setting, Long> settingId;
    public static volatile SingularAttribute<Setting, Date> createDate;

}