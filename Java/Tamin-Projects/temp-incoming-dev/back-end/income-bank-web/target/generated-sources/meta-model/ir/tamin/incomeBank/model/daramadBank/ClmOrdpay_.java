package ir.tamin.incomeBank.model.daramadBank;

import ir.tamin.incomeBank.model.daramadBank.BajRcvCasSpec;
import ir.tamin.incomeBank.model.daramadBank.BajRcvchqspec;
import ir.tamin.incomeBank.model.daramadBank.BajRcvtrfspec;
import ir.tamin.incomeBank.model.daramadBank.ClmOrder;
import ir.tamin.incomeBank.model.daramadBank.ClmOrdpayPK;
import javax.annotation.Generated;
import javax.persistence.metamodel.SingularAttribute;
import javax.persistence.metamodel.StaticMetamodel;

@Generated(value="EclipseLink-2.5.1.v20130918-rNA", date="2022-12-13T16:15:32")
@StaticMetamodel(ClmOrdpay.class)
public class ClmOrdpay_ { 

    public static volatile SingularAttribute<ClmOrdpay, String> paykindcode;
    public static volatile SingularAttribute<ClmOrdpay, Long> orpPayseqamt;
    public static volatile SingularAttribute<ClmOrdpay, BajRcvCasSpec> bajRcvCasSpec;
    public static volatile SingularAttribute<ClmOrdpay, String> orpPayseqdate;
    public static volatile SingularAttribute<ClmOrdpay, String> orpPrnstat;
    public static volatile SingularAttribute<ClmOrdpay, BajRcvtrfspec> bajRcvtrfspec;
    public static volatile SingularAttribute<ClmOrdpay, Character> orpStat;
    public static volatile SingularAttribute<ClmOrdpay, BajRcvchqspec> bajRcvchqspec;
    public static volatile SingularAttribute<ClmOrdpay, ClmOrder> clmOrder;
    public static volatile SingularAttribute<ClmOrdpay, String> orpStatdate;
    public static volatile SingularAttribute<ClmOrdpay, ClmOrdpayPK> clmOrdpayPK;
    public static volatile SingularAttribute<ClmOrdpay, String> orpCarddate;
    public static volatile SingularAttribute<ClmOrdpay, String> deleteuid;

}