package ir.tamin.insurance.technical.model.baseinfo;

import ir.tamin.insurance.technical.model.baseinfo.RefundReason;
import javax.annotation.Generated;
import javax.persistence.metamodel.SingularAttribute;
import javax.persistence.metamodel.StaticMetamodel;

@Generated(value="EclipseLink-2.5.1.v20130918-rNA", date="2022-12-05T12:38:24")
@StaticMetamodel(RefundRelation.class)
public class RefundRelation_ { 

    public static volatile SingularAttribute<RefundRelation, String> deleteHistory;
    public static volatile SingularAttribute<RefundRelation, RefundReason> refundReason;
    public static volatile SingularAttribute<RefundRelation, String> relationTypeCode;
    public static volatile SingularAttribute<RefundRelation, Long> refundDarman;
    public static volatile SingularAttribute<RefundRelation, Long> refundIsu;
    public static volatile SingularAttribute<RefundRelation, String> status;

}