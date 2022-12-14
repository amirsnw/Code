package ir.tamin.insurance.technical.model.guardian;

import java.util.Date;
import javax.annotation.Generated;
import javax.persistence.metamodel.SingularAttribute;
import javax.persistence.metamodel.StaticMetamodel;

@Generated(value="EclipseLink-2.5.1.v20130918-rNA", date="2022-12-05T12:38:24")
@StaticMetamodel(GuardianDocument.class)
public class GuardianDocument_ { 

    public static volatile SingularAttribute<GuardianDocument, byte[]> blob;
    public static volatile SingularAttribute<GuardianDocument, Date> uploadDate;
    public static volatile SingularAttribute<GuardianDocument, String> reqSerial;
    public static volatile SingularAttribute<GuardianDocument, String> guid;
    public static volatile SingularAttribute<GuardianDocument, String> userName;

}