package ir.tamin.incomeBank.model.daramadBank;

import ir.tamin.incomeBank.model.daramadBank.ClmOrderPK;
import ir.tamin.incomeBank.model.daramadBank.ClmOrdpay;
import javax.annotation.Generated;
import javax.persistence.metamodel.SingularAttribute;
import javax.persistence.metamodel.StaticMetamodel;

@Generated(value="EclipseLink-2.5.1.v20130918-rNA", date="2022-12-13T16:15:32")
@StaticMetamodel(ClmOrder.class)
public class ClmOrder_ { 

    public static volatile SingularAttribute<ClmOrder, String> confirmdt;
    public static volatile SingularAttribute<ClmOrder, Character> ordOrdsta;
    public static volatile SingularAttribute<ClmOrder, String> confirmuid;
    public static volatile SingularAttribute<ClmOrder, String> ordDocno;
    public static volatile SingularAttribute<ClmOrder, String> ordBildat;
    public static volatile SingularAttribute<ClmOrder, ClmOrdpay> clmOrdpay;
    public static volatile SingularAttribute<ClmOrder, String> ordOrdmst;
    public static volatile SingularAttribute<ClmOrder, String> mastcusttype;
    public static volatile SingularAttribute<ClmOrder, String> createdt;
    public static volatile SingularAttribute<ClmOrder, ClmOrderPK> clmOrderPK;
    public static volatile SingularAttribute<ClmOrder, String> ordDocdat;
    public static volatile SingularAttribute<ClmOrder, Character> ordRcpflg;
    public static volatile SingularAttribute<ClmOrder, String> ordPymseq;
    public static volatile SingularAttribute<ClmOrder, String> ordMastcustcode;
    public static volatile SingularAttribute<ClmOrder, String> createuid;
    public static volatile SingularAttribute<ClmOrder, String> ordertype;

}