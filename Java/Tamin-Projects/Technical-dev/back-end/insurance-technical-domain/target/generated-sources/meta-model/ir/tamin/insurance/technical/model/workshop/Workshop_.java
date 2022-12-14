package ir.tamin.insurance.technical.model.workshop;

import ir.tamin.insurance.technical.model.workshop.Activity;
import javax.annotation.Generated;
import javax.persistence.metamodel.SingularAttribute;
import javax.persistence.metamodel.StaticMetamodel;

@Generated(value="EclipseLink-2.5.1.v20130918-rNA", date="2022-12-05T12:38:24")
@StaticMetamodel(Workshop.class)
public class Workshop_ { 

    public static volatile SingularAttribute<Workshop, String> branchCode;
    public static volatile SingularAttribute<Workshop, String> workshopRateCode;
    public static volatile SingularAttribute<Workshop, Activity> activity;
    public static volatile SingularAttribute<Workshop, String> workshopName;
    public static volatile SingularAttribute<Workshop, String> workshopApproveDate;
    public static volatile SingularAttribute<Workshop, String> workshopId;

}