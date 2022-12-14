package ir.tamin.insurance.technical.model.insurance;

import ir.tamin.insurance.technical.model.baseinfo.InsuranceStatus;
import ir.tamin.insurance.technical.model.insurance.InsuranceRegisteration;
import javax.annotation.Generated;
import javax.persistence.metamodel.SingularAttribute;
import javax.persistence.metamodel.StaticMetamodel;

@Generated(value="EclipseLink-2.5.1.v20130918-rNA", date="2022-12-05T12:38:24")
@StaticMetamodel(RegistrationInsuranceStatus.class)
public class RegistrationInsuranceStatus_ { 

    public static volatile SingularAttribute<RegistrationInsuranceStatus, String> brchCode;
    public static volatile SingularAttribute<RegistrationInsuranceStatus, String> rIsuRecType;
    public static volatile SingularAttribute<RegistrationInsuranceStatus, String> rIsuStatEndDate;
    public static volatile SingularAttribute<RegistrationInsuranceStatus, String> rIsuStatStartDate;
    public static volatile SingularAttribute<RegistrationInsuranceStatus, InsuranceRegisteration> insuranceRegisteration;
    public static volatile SingularAttribute<RegistrationInsuranceStatus, InsuranceStatus> insuranceStatus;
    public static volatile SingularAttribute<RegistrationInsuranceStatus, String> rIsuStatOpDate;

}