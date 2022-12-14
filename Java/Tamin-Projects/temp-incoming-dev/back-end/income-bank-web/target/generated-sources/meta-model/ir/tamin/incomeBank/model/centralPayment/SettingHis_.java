package ir.tamin.incomeBank.model.centralPayment;

import ir.tamin.incomeBank.model.centralPayment.GlSystemType;
import java.math.BigDecimal;
import java.util.Date;
import javax.annotation.Generated;
import javax.persistence.metamodel.SingularAttribute;
import javax.persistence.metamodel.StaticMetamodel;

@Generated(value="EclipseLink-2.5.1.v20130918-rNA", date="2022-12-13T16:15:32")
@StaticMetamodel(SettingHis.class)
public class SettingHis_ { 

    public static volatile SingularAttribute<SettingHis, String> userSignature;
    public static volatile SingularAttribute<SettingHis, String> certChainValidation;
    public static volatile SingularAttribute<SettingHis, Date> updateDate;
    public static volatile SingularAttribute<SettingHis, String> signEvaluation;
    public static volatile SingularAttribute<SettingHis, String> bonyadAccountNo;
    public static volatile SingularAttribute<SettingHis, String> updateUser;
    public static volatile SingularAttribute<SettingHis, Long> epMaxVal;
    public static volatile SingularAttribute<SettingHis, String> bonyadBankBrchCode;
    public static volatile SingularAttribute<SettingHis, String> bonyadBankBrchName;
    public static volatile SingularAttribute<SettingHis, String> certOcspValidation;
    public static volatile SingularAttribute<SettingHis, Long> tbsId;
    public static volatile SingularAttribute<SettingHis, String> rightelreturnid;
    public static volatile SingularAttribute<SettingHis, String> x509certificate;
    public static volatile SingularAttribute<SettingHis, GlSystemType> system;
    public static volatile SingularAttribute<SettingHis, String> tbsDesc;
    public static volatile SingularAttribute<SettingHis, BigDecimal> tbsHisId;
    public static volatile SingularAttribute<SettingHis, String> deleteUser;
    public static volatile SingularAttribute<SettingHis, String> createUser;
    public static volatile SingularAttribute<SettingHis, String> certCrlValidation;
    public static volatile SingularAttribute<SettingHis, Date> createDate;
    public static volatile SingularAttribute<SettingHis, Date> deleteDate;

}