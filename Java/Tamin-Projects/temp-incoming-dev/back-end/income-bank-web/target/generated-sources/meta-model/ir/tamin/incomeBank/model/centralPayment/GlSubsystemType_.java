package ir.tamin.incomeBank.model.centralPayment;

import ir.tamin.incomeBank.model.centralPayment.GlSystemType;
import javax.annotation.Generated;
import javax.persistence.metamodel.SingularAttribute;
import javax.persistence.metamodel.StaticMetamodel;

@Generated(value="EclipseLink-2.5.1.v20130918-rNA", date="2022-12-13T16:15:32")
@StaticMetamodel(GlSubsystemType.class)
public class GlSubsystemType_ { 

    public static volatile SingularAttribute<GlSubsystemType, String> code;
    public static volatile SingularAttribute<GlSubsystemType, GlSystemType> system;
    public static volatile SingularAttribute<GlSubsystemType, Integer> subSystemId;
    public static volatile SingularAttribute<GlSubsystemType, String> description;
    public static volatile SingularAttribute<GlSubsystemType, String> title;
    public static volatile SingularAttribute<GlSubsystemType, Integer> priority;
    public static volatile SingularAttribute<GlSubsystemType, String> latintitle;

}