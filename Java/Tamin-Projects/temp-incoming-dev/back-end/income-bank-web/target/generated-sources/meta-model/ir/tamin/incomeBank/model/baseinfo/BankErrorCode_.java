package ir.tamin.incomeBank.model.baseinfo;

import java.math.BigDecimal;
import java.util.Date;
import javax.annotation.Generated;
import javax.persistence.metamodel.SingularAttribute;
import javax.persistence.metamodel.StaticMetamodel;

@Generated(value="EclipseLink-2.5.1.v20130918-rNA", date="2022-12-13T16:15:32")
@StaticMetamodel(BankErrorCode.class)
public class BankErrorCode_ { 

    public static volatile SingularAttribute<BankErrorCode, String> bankCode;
    public static volatile SingularAttribute<BankErrorCode, Date> updateDate;
    public static volatile SingularAttribute<BankErrorCode, String> errorDesc;
    public static volatile SingularAttribute<BankErrorCode, String> errorCode;
    public static volatile SingularAttribute<BankErrorCode, String> updateUser;
    public static volatile SingularAttribute<BankErrorCode, String> createUser;
    public static volatile SingularAttribute<BankErrorCode, BigDecimal> errorId;
    public static volatile SingularAttribute<BankErrorCode, Date> createDate;

}