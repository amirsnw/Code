package ir.tamin.insurance.technical.model.insuranceAgreement;

import ir.tamin.insurance.baseinfo.model.Branch;
import ir.tamin.insurance.technical.model.baseinfo.InsuranceStatus;
import ir.tamin.insurance.technical.model.baseinfo.InsuranceType;
import ir.tamin.insurance.technical.model.insurance.InsuranceRegisteration;
import ir.tamin.insurance.technical.model.insuranceAgreement.AgreementCategoryType;
import ir.tamin.insurance.technical.model.insuranceAgreement.CategoryType;
import ir.tamin.insurance.technical.model.insuranceAgreement.InsuranceAgreementRequestDetail;
import ir.tamin.insurance.technical.model.insuranceAgreement.InsuranceAgreementRequestMedical;
import ir.tamin.insurance.technical.model.insuranceAgreement.SpecialGroupType;
import ir.tamin.insurance.technical.model.workshop.Workshop;
import java.math.BigDecimal;
import javax.annotation.Generated;
import javax.persistence.metamodel.ListAttribute;
import javax.persistence.metamodel.SingularAttribute;
import javax.persistence.metamodel.StaticMetamodel;

@Generated(value="EclipseLink-2.5.1.v20130918-rNA", date="2022-12-05T12:38:24")
@StaticMetamodel(InsuranceAgreementRequest.class)
public class InsuranceAgreementRequest_ { 

    public static volatile SingularAttribute<InsuranceAgreementRequest, String> nationalCode;
    public static volatile SingularAttribute<InsuranceAgreementRequest, String> createUserId;
    public static volatile SingularAttribute<InsuranceAgreementRequest, String> flag;
    public static volatile SingularAttribute<InsuranceAgreementRequest, String> gender;
    public static volatile SingularAttribute<InsuranceAgreementRequest, InsuranceType> insuranceType;
    public static volatile ListAttribute<InsuranceAgreementRequest, InsuranceAgreementRequestDetail> insuranceAgreementRequestDetailList;
    public static volatile SingularAttribute<InsuranceAgreementRequest, AgreementCategoryType> agreementCategoryType;
    public static volatile SingularAttribute<InsuranceAgreementRequest, Branch> branch;
    public static volatile SingularAttribute<InsuranceAgreementRequest, String> confirmUserId;
    public static volatile SingularAttribute<InsuranceAgreementRequest, String> requestNumber;
    public static volatile SingularAttribute<InsuranceAgreementRequest, InsuranceAgreementRequestMedical> insuranceAgreementRequestMedical;
    public static volatile SingularAttribute<InsuranceAgreementRequest, String> requestId;
    public static volatile SingularAttribute<InsuranceAgreementRequest, String> requestDate;
    public static volatile SingularAttribute<InsuranceAgreementRequest, String> selfIsuTypeCode;
    public static volatile SingularAttribute<InsuranceAgreementRequest, String> insuranceId;
    public static volatile SingularAttribute<InsuranceAgreementRequest, SpecialGroupType> specialGroupType;
    public static volatile SingularAttribute<InsuranceAgreementRequest, Long> wage;
    public static volatile SingularAttribute<InsuranceAgreementRequest, String> createDate;
    public static volatile SingularAttribute<InsuranceAgreementRequest, Long> historyDay;
    public static volatile SingularAttribute<InsuranceAgreementRequest, String> introductionLetterNumber;
    public static volatile SingularAttribute<InsuranceAgreementRequest, Long> ageYear;
    public static volatile SingularAttribute<InsuranceAgreementRequest, BigDecimal> insuranceRate;
    public static volatile SingularAttribute<InsuranceAgreementRequest, Workshop> workshop;
    public static volatile SingularAttribute<InsuranceAgreementRequest, InsuranceStatus> insuranceStatus;
    public static volatile SingularAttribute<InsuranceAgreementRequest, CategoryType> categoryType;
    public static volatile SingularAttribute<InsuranceAgreementRequest, String> confirmDate;
    public static volatile SingularAttribute<InsuranceAgreementRequest, InsuranceRegisteration> person;
    public static volatile SingularAttribute<InsuranceAgreementRequest, String> introductionLetterDate;
    public static volatile SingularAttribute<InsuranceAgreementRequest, Long> ageDay;
    public static volatile SingularAttribute<InsuranceAgreementRequest, Long> ageMonth;
    public static volatile SingularAttribute<InsuranceAgreementRequest, String> status;

}