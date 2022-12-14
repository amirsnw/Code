package ir.tamin.insurance.technical.model.user;

import ir.tamin.insurance.technical.model.workshop.Workshop;
import javax.annotation.Generated;
import javax.persistence.metamodel.SingularAttribute;
import javax.persistence.metamodel.StaticMetamodel;

@Generated(value="EclipseLink-2.5.1.v20130918-rNA", date="2022-12-05T12:38:24")
@StaticMetamodel(WorkshopUser.class)
public class WorkshopUser_ { 

    public static volatile SingularAttribute<WorkshopUser, String> branchCode;
    public static volatile SingularAttribute<WorkshopUser, String> deleted;
    public static volatile SingularAttribute<WorkshopUser, Workshop> workshop;
    public static volatile SingularAttribute<WorkshopUser, Long> id;
    public static volatile SingularAttribute<WorkshopUser, String> userId;

}