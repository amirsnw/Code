package ir.tamin.insurance.technical.model.guardian;

import ir.tamin.insurance.technical.model.guardian.BaseBailType;
import ir.tamin.insurance.technical.model.guardian.BaseDependentType;
import ir.tamin.insurance.technical.model.guardian.Dependency;
import ir.tamin.insurance.technical.model.guardian.Personal;
import java.sql.Timestamp;
import javax.annotation.Generated;
import javax.persistence.metamodel.SingularAttribute;
import javax.persistence.metamodel.StaticMetamodel;

@Generated(value="EclipseLink-2.5.1.v20130918-rNA", date="2022-12-05T12:38:24")
@StaticMetamodel(Personal.class)
public class Personal_ { 

    public static volatile SingularAttribute<Personal, String> lastName;
    public static volatile SingularAttribute<Personal, String> fatherName;
    public static volatile SingularAttribute<Personal, String> cityOfBirthId;
    public static volatile SingularAttribute<Personal, String> idCardSerial1;
    public static volatile SingularAttribute<Personal, String> gender;
    public static volatile SingularAttribute<Personal, Timestamp> creationTime;
    public static volatile SingularAttribute<Personal, String> idCardSerial2;
    public static volatile SingularAttribute<Personal, String> nation;
    public static volatile SingularAttribute<Personal, Timestamp> lastModificationTime;
    public static volatile SingularAttribute<Personal, BaseBailType> bailType;
    public static volatile SingularAttribute<Personal, Long> portalRequestId;
    public static volatile SingularAttribute<Personal, String> countryId;
    public static volatile SingularAttribute<Personal, String> ssn;
    public static volatile SingularAttribute<Personal, String> organizationId;
    public static volatile SingularAttribute<Personal, Long> id;
    public static volatile SingularAttribute<Personal, String> refrenceCode;
    public static volatile SingularAttribute<Personal, Dependency> dependency;
    public static volatile SingularAttribute<Personal, String> lastModifiedBy;
    public static volatile SingularAttribute<Personal, BaseDependentType> dependentType;
    public static volatile SingularAttribute<Personal, Timestamp> dateOfBirth;
    public static volatile SingularAttribute<Personal, Personal> parentId;
    public static volatile SingularAttribute<Personal, String> firstName;
    public static volatile SingularAttribute<Personal, String> foreignId;
    public static volatile SingularAttribute<Personal, String> nationalId;
    public static volatile SingularAttribute<Personal, String> createdBy;
    public static volatile SingularAttribute<Personal, String> cityOfIssueId;
    public static volatile SingularAttribute<Personal, String> idCardNumber;
    public static volatile SingularAttribute<Personal, String> user;
    public static volatile SingularAttribute<Personal, Boolean> isForien;

}