package ir.tamin.incomeBank.model.centralPayment;

import ir.tamin.incomeBank.model.centralPayment.BankAccountControl;
import ir.tamin.incomeBank.model.centralPayment.GlSubsystemType;
import java.math.BigDecimal;
import java.util.Date;
import javax.annotation.Generated;
import javax.persistence.metamodel.SingularAttribute;
import javax.persistence.metamodel.StaticMetamodel;

@Generated(value="EclipseLink-2.5.1.v20130918-rNA", date="2022-12-13T16:15:32")
@StaticMetamodel(BankAccountControlHis.class)
public class BankAccountControlHis_ { 

    public static volatile SingularAttribute<BankAccountControlHis, String> bankCode;
    public static volatile SingularAttribute<BankAccountControlHis, String> lastName;
    public static volatile SingularAttribute<BankAccountControlHis, String> invalidationReason;
    public static volatile SingularAttribute<BankAccountControlHis, String> validationResult;
    public static volatile SingularAttribute<BankAccountControlHis, BigDecimal> hisId;
    public static volatile SingularAttribute<BankAccountControlHis, GlSubsystemType> validateBySubSystem;
    public static volatile SingularAttribute<BankAccountControlHis, Date> hisDate;
    public static volatile SingularAttribute<BankAccountControlHis, String> natcode;
    public static volatile SingularAttribute<BankAccountControlHis, Date> validationDate;
    public static volatile SingularAttribute<BankAccountControlHis, String> firstName;
    public static volatile SingularAttribute<BankAccountControlHis, String> risuid;
    public static volatile SingularAttribute<BankAccountControlHis, String> nationality;
    public static volatile SingularAttribute<BankAccountControlHis, BankAccountControl> mainAccountControl;
    public static volatile SingularAttribute<BankAccountControlHis, String> accountNo;

}