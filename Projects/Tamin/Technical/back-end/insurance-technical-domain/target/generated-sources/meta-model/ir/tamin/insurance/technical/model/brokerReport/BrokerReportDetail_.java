package ir.tamin.insurance.technical.model.brokerReport;

import ir.tamin.insurance.baseinfo.model.Branch;
import javax.annotation.Generated;
import javax.persistence.metamodel.SingularAttribute;
import javax.persistence.metamodel.StaticMetamodel;

@Generated(value="EclipseLink-2.5.1.v20130918-rNA", date="2022-11-02T13:02:50")
@StaticMetamodel(BrokerReportDetail.class)
public class BrokerReportDetail_ { 

    public static volatile SingularAttribute<BrokerReportDetail, String> paymentMonthCount;
    public static volatile SingularAttribute<BrokerReportDetail, String> contractDate;
    public static volatile SingularAttribute<BrokerReportDetail, Long> amount;
    public static volatile SingularAttribute<BrokerReportDetail, String> nationalCode;
    public static volatile SingularAttribute<BrokerReportDetail, String> reportId;
    public static volatile SingularAttribute<BrokerReportDetail, String> provinceCode;
    public static volatile SingularAttribute<BrokerReportDetail, String> contractNumber;
    public static volatile SingularAttribute<BrokerReportDetail, Branch> broker;
    public static volatile SingularAttribute<BrokerReportDetail, Branch> branch;
    public static volatile SingularAttribute<BrokerReportDetail, Long> percent;
    public static volatile SingularAttribute<BrokerReportDetail, Long> monthWage;
    public static volatile SingularAttribute<BrokerReportDetail, Long> reportRow;
    public static volatile SingularAttribute<BrokerReportDetail, Long> brokerWage;

}