package ir.tamin.insurance.technical.model.occur;

import java.util.Date;
import javax.annotation.Generated;
import javax.persistence.metamodel.SingularAttribute;
import javax.persistence.metamodel.StaticMetamodel;

@Generated(value="EclipseLink-2.5.1.v20130918-rNA", date="2022-11-02T13:02:50")
@StaticMetamodel(OccurSignature.class)
public class OccurSignature_ { 

    public static volatile SingularAttribute<OccurSignature, String> branchCode;
    public static volatile SingularAttribute<OccurSignature, byte[]> image;
    public static volatile SingularAttribute<OccurSignature, String> nationalId;
    public static volatile SingularAttribute<OccurSignature, Date> uploadDate;
    public static volatile SingularAttribute<OccurSignature, String> guid;
    public static volatile SingularAttribute<OccurSignature, String> roleType;
    public static volatile SingularAttribute<OccurSignature, String> userName;
    public static volatile SingularAttribute<OccurSignature, String> status;

}