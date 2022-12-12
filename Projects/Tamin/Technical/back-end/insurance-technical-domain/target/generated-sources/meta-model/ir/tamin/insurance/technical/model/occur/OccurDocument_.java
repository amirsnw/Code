package ir.tamin.insurance.technical.model.occur;

import java.util.Date;
import javax.annotation.Generated;
import javax.persistence.metamodel.SingularAttribute;
import javax.persistence.metamodel.StaticMetamodel;

@Generated(value="EclipseLink-2.5.1.v20130918-rNA", date="2022-11-02T13:02:50")
@StaticMetamodel(OccurDocument.class)
public class OccurDocument_ { 

    public static volatile SingularAttribute<OccurDocument, byte[]> image;
    public static volatile SingularAttribute<OccurDocument, Date> uploadDate;
    public static volatile SingularAttribute<OccurDocument, String> guid;
    public static volatile SingularAttribute<OccurDocument, String> userName;
    public static volatile SingularAttribute<OccurDocument, String> reqId;

}