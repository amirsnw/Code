package ir.tamin.insurance.technical.model.brokerReport;

import ir.tamin.insurance.baseinfo.model.Branch;
import ir.tamin.insurance.technical.model.baseinfo.Province;
import ir.tamin.insurance.technical.model.brokerReport.BrokerReportDetail;
import javax.annotation.Generated;
import javax.persistence.metamodel.ListAttribute;
import javax.persistence.metamodel.SingularAttribute;
import javax.persistence.metamodel.StaticMetamodel;

@Generated(value="EclipseLink-2.5.1.v20130918-rNA", date="2022-11-02T13:02:50")
@StaticMetamodel(BrokerReport.class)
public class BrokerReport_ { 

    public static volatile SingularAttribute<BrokerReport, String> provinceConfirmUserId;
    public static volatile SingularAttribute<BrokerReport, String> createUserId;
    public static volatile SingularAttribute<BrokerReport, String> reportId;
    public static volatile SingularAttribute<BrokerReport, String> endDate;
    public static volatile SingularAttribute<BrokerReport, String> provinceConfirmDate;
    public static volatile SingularAttribute<BrokerReport, String> branchConfirmDate;
    public static volatile SingularAttribute<BrokerReport, Branch> broker;
    public static volatile SingularAttribute<BrokerReport, Branch> branch;
    public static volatile ListAttribute<BrokerReport, BrokerReportDetail> brokerReportDetailList;
    public static volatile SingularAttribute<BrokerReport, String> branchConfirmUserId;
    public static volatile SingularAttribute<BrokerReport, String> reportDate;
    public static volatile SingularAttribute<BrokerReport, Province> province;
    public static volatile SingularAttribute<BrokerReport, String> startDate;
    public static volatile SingularAttribute<BrokerReport, String> status;
    public static volatile SingularAttribute<BrokerReport, String> createDate;

}