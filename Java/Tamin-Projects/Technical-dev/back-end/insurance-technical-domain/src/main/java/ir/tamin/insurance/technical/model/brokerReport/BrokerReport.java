package ir.tamin.insurance.technical.model.brokerReport;

import ir.tamin.framework.domain.AbstractEntity;
import ir.tamin.framework.ws.rest.repository.annotation.RESTResource;
import ir.tamin.framework.ws.rest.repository.annotation.ResourceId;
import ir.tamin.framework.ws.rest.repository.annotation.ResourceIds;
import ir.tamin.insurance.baseinfo.model.Branch;
import ir.tamin.insurance.technical.model.baseinfo.Province;

import javax.persistence.*;
import java.util.List;

@Entity
@Table(name = "broker_report_list", schema = "specialins")
@RESTResource(lookupProxy = "ir.tamin.insurance.technical.business.brokerReport.BrokerReportManager")
@ResourceIds({
    @ResourceId(fields = {"reportId"})})
public class BrokerReport extends AbstractEntity<String> {

    @Id
    @Column(name = "REPORT_ID")
    private String reportId;
    
    @Column(name = "REPORT_DATE")
    private String reportDate;


    @OneToOne(cascade = {CascadeType.REFRESH, CascadeType.DETACH})
    @JoinColumn(name = "BRCHCODE", referencedColumnName = "BRHCODE")
    private Branch branch;

    @OneToOne(cascade = {CascadeType.REFRESH, CascadeType.DETACH})
    @JoinColumn(name = "PROVCODE", referencedColumnName = "PROVINCECODE")
    private Province province;

    @OneToOne(cascade = {CascadeType.REFRESH, CascadeType.DETACH})
    @JoinColumn(name = "BROKERCODE", referencedColumnName = "BRHCODE")
    private Branch broker;

    @OneToOne(cascade = {CascadeType.REFRESH, CascadeType.DETACH})
    @JoinColumn(name = "REPORT_ID", referencedColumnName = "REPORT_ID")
    private List<BrokerReportDetail> brokerReportDetailList;
    
    @Column(name = "SDATE")
    private String startDate;
    
    @Column(name = "EDATE")
    private String endDate;
    
    @Column(name = "STATUS")
    private String status;
    
    @Column(name = "CREATION_USERID")
    private String createUserId;
    
    @Column(name = "CREATION_DATE")
    private String createDate;
    
    @Column(name = "BRCH_CONFIRM_USERID")
    private String branchConfirmUserId;
    
    @Column(name = "BRCH_CONFIRM__DATE")
    private String branchConfirmDate;
    
    @Column(name = "PROV_CONFIRM_USERID")
    private String provinceConfirmUserId;
    
    @Column(name = "PROV_CONFIRM__DATE")
    private String provinceConfirmDate;

    public String getReportId() {
        return reportId;
    }

    public void setReportId(String reportId) {
        this.reportId = reportId;
    }

    public String getReportDate() {
        return reportDate;
    }

    public void setReportDate(String reportDate) {
        this.reportDate = reportDate;
    }

    public Branch getBranch() {
        return branch;
    }

    public void setBranch(Branch branch) {
        this.branch = branch;
    }

    public Branch getBroker() {
        return broker;
    }

    public void setBroker(Branch broker) {
        this.broker = broker;
    }

    public String getStartDate() {
        return startDate;
    }

    public void setStartDate(String startDate) {
        this.startDate = startDate;
    }

    public String getEndDate() {
        return endDate;
    }

    public void setEndDate(String endDate) {
        this.endDate = endDate;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public String getCreateUserId() {
        return createUserId;
    }

    public void setCreateUserId(String createUserId) {
        this.createUserId = createUserId;
    }

    public String getCreateDate() {
        return createDate;
    }

    public void setCreateDate(String createDate) {
        this.createDate = createDate;
    }

    public String getBranchConfirmUserId() {
        return branchConfirmUserId;
    }

    public void setBranchConfirmUserId(String branchConfirmUserId) {
        this.branchConfirmUserId = branchConfirmUserId;
    }

    public String getBranchConfirmDate() {
        return branchConfirmDate;
    }

    public void setBranchConfirmDate(String branchConfirmDate) {
        this.branchConfirmDate = branchConfirmDate;
    }

    public String getProvinceConfirmUserId() {
        return provinceConfirmUserId;
    }

    public void setProvinceConfirmUserId(String provinceConfirmUserId) {
        this.provinceConfirmUserId = provinceConfirmUserId;
    }

    public String getProvinceConfirmDate() {
        return provinceConfirmDate;
    }

    public void setProvinceConfirmDate(String provinceConfirmDate) {
        this.provinceConfirmDate = provinceConfirmDate;
    }

    public Province getProvince() {
        return province;
    }

    public void setProvince(Province province) {
        this.province = province;
    }

    public List<BrokerReportDetail> getBrokerReportDetailList() {
        return brokerReportDetailList;
    }

    public void setBrokerReportDetailList(List<BrokerReportDetail> brokerReportDetailList) {
        this.brokerReportDetailList = brokerReportDetailList;
    }

    @Override
    public String getIdentifierInstance() {
        return this.reportId;
    }
}



