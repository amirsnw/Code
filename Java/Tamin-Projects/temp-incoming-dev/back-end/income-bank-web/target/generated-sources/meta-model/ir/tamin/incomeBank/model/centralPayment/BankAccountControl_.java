package ir.tamin.incomeBank.model.centralPayment;

import ir.tamin.incomeBank.model.centralPayment.GlSubsystemType;
import java.math.BigDecimal;
import java.util.Date;
import javax.annotation.Generated;
import javax.persistence.metamodel.SingularAttribute;
import javax.persistence.metamodel.StaticMetamodel;

@Generated(value="EclipseLink-2.5.1.v20130918-rNA", date="2022-12-13T16:15:32")
@StaticMetamodel(BankAccountControl.class)
public class BankAccountControl_ { 

    public static volatile SingularAttribute<BankAccountControl, String> bankCode;
    public static volatile SingularAttribute<BankAccountControl, String> lastName;
    public static volatile SingularAttribute<BankAccountControl, String> firstName;
    public static volatile SingularAttribute<BankAccountControl, String> invalidationReason;
    public static volatile SingularAttribute<BankAccountControl, String> risuid;
    public static volatile SingularAttribute<BankAccountControl, String> validationResult;
    public static volatile SingularAttribute<BankAccountControl, String> nationality;
    public static volatile SingularAttribute<BankAccountControl, String> accountNo;
    public static volatile SingularAttribute<BankAccountControl, GlSubsystemType> validateBySubSystem;
    public static volatile SingularAttribute<BankAccountControl, String> natcode;
    public static volatile SingularAttribute<BankAccountControl, Date> validationDate;
    public static volatile SingularAttribute<BankAccountControl, BigDecimal> id;

}