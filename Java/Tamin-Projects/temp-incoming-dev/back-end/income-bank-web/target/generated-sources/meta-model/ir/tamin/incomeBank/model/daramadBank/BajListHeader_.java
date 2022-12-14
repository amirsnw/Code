package ir.tamin.incomeBank.model.daramadBank;

import ir.tamin.incomeBank.model.baseinfo.Workshop;
import ir.tamin.incomeBank.model.daramadBank.BajListHeaderPK;
import ir.tamin.incomeBank.model.daramadBank.CoWorkersPoursantaj;
import ir.tamin.incomeBank.model.daramadBank.DebitStatus;
import ir.tamin.incomeBank.model.daramadBank.DebitStep;
import ir.tamin.incomeBank.model.daramadBank.ListType;
import ir.tamin.incomeBank.model.daramadBank.TechnicalCalculationDetail;
import javax.annotation.Generated;
import javax.persistence.metamodel.ListAttribute;
import javax.persistence.metamodel.SingularAttribute;
import javax.persistence.metamodel.StaticMetamodel;

@Generated(value="EclipseLink-2.5.1.v20130918-rNA", date="2022-12-13T16:15:32")
@StaticMetamodel(BajListHeader.class)
public class BajListHeader_ { 

    public static volatile SingularAttribute<BajListHeader, String> listDate;
    public static volatile SingularAttribute<BajListHeader, String> clasorNumber;
    public static volatile SingularAttribute<BajListHeader, String> creationTime;
    public static volatile SingularAttribute<BajListHeader, BajListHeaderPK> bajListHeaderPK;
    public static volatile SingularAttribute<BajListHeader, CoWorkersPoursantaj> coWorkersPoursantaj;
    public static volatile SingularAttribute<BajListHeader, String> year;
    public static volatile SingularAttribute<BajListHeader, String> listIndex;
    public static volatile SingularAttribute<BajListHeader, String> lstSTA;
    public static volatile SingularAttribute<BajListHeader, Long> totalEmployerPremium;
    public static volatile SingularAttribute<BajListHeader, Long> totalAmountInsurance;
    public static volatile SingularAttribute<BajListHeader, Long> inclusiveBenefit;
    public static volatile SingularAttribute<BajListHeader, ListType> listType;
    public static volatile SingularAttribute<BajListHeader, String> clasorComment;
    public static volatile SingularAttribute<BajListHeader, Long> totalInclusiveWageAndBenefit;
    public static volatile SingularAttribute<BajListHeader, String> confirmedBy;
    public static volatile SingularAttribute<BajListHeader, DebitStatus> debitStatus;
    public static volatile SingularAttribute<BajListHeader, Long> totalWageAndBenefit;
    public static volatile SingularAttribute<BajListHeader, Long> totalEmployeePremium;
    public static volatile SingularAttribute<BajListHeader, Workshop> workshop;
    public static volatile SingularAttribute<BajListHeader, Long> totalUnemploymentPremium;
    public static volatile SingularAttribute<BajListHeader, String> contractNumber;
    public static volatile SingularAttribute<BajListHeader, String> confirmTime;
    public static volatile SingularAttribute<BajListHeader, Long> hardJobPremium;
    public static volatile SingularAttribute<BajListHeader, String> sendListMethodCode;
    public static volatile SingularAttribute<BajListHeader, String> listStatusCode;
    public static volatile ListAttribute<BajListHeader, TechnicalCalculationDetail> technicalCalculationDetail;
    public static volatile SingularAttribute<BajListHeader, DebitStep> debitStep;
    public static volatile SingularAttribute<BajListHeader, String> workshopHistoryId;
    public static volatile SingularAttribute<BajListHeader, String> month;
    public static volatile SingularAttribute<BajListHeader, String> createdBy;
    public static volatile SingularAttribute<BajListHeader, Long> employeesCount;
    public static volatile SingularAttribute<BajListHeader, Long> listPage;

}