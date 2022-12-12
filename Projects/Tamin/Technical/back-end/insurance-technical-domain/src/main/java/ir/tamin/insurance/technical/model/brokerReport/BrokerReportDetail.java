package ir.tamin.insurance.technical.model.brokerReport;

import ir.tamin.framework.domain.AbstractEntity;
import ir.tamin.framework.ws.rest.repository.annotation.RESTResource;
import ir.tamin.framework.ws.rest.repository.annotation.ResourceId;
import ir.tamin.framework.ws.rest.repository.annotation.ResourceIds;
import ir.tamin.insurance.baseinfo.model.Branch;
import ir.tamin.insurance.technical.model.primaryKeyClass.BrokerReportDetailPK;

import javax.persistence.*;

/**
 *
 * @author a_khalighi
 */

@Entity
@Table(name = "BROKER_REPORT_DETAIL", schema = "specialins")
@RESTResource(lookupProxy = "ir.tamin.insurance.technical.business.brokerReport.BrokerReportDetailManager")
@ResourceIds({
        @ResourceId(fields = {"reportId" ,"reportRow"})})
public class BrokerReportDetail extends AbstractEntity<BrokerReportDetailPK> {

    @Id
    @Column(name = "REPORT_ID")
    private String reportId;

    @Id
    @Column(name = "REPORT_ROW")
    private Long reportRow;

    @OneToOne(cascade = {CascadeType.REFRESH, CascadeType.DETACH})
    @JoinColumn(name = "BRCHCODE", referencedColumnName = "BRHCODE")
    private Branch branch;

    @OneToOne(cascade = {CascadeType.REFRESH, CascadeType.DETACH})
    @JoinColumn(name = "BROKERCODE", referencedColumnName = "BRHCODE")
    private Branch broker;

    @Column(name = "CNT_CNTRCTNO")
    private String contractNumber;

    @Column(name = "CNT_CNTRCTDATE")
    private String contractDate;

    @Column(name = "CNT_MONWAGE")
    private Long monthWage;

    @Column(name = "SPCRPDPRCNT")
    private Long percent;

    @Column(name = "BROKER_WAGE")
    private Long brokerWage;

    @Column(name = "AMOUNT")
    private Long amount;

    @Column(name = "RISUNATCODE")
    private String nationalCode;

    @Column(name = "PROVCODE")
    private String provinceCode;

    @Column(name = "PAYMENT_MON")
    private String paymentMonthCount;

    public String getReportId() {
        return reportId;
    }

    public void setReportId(String reportId) {
        this.reportId = reportId;
    }

    public Long getReportRow() {
        return reportRow;
    }

    public void setReportRow(Long reportRow) {
        this.reportRow = reportRow;
    }

    public String getContractNumber() {
        return contractNumber;
    }

    public void setContractNumber(String contractNumber) {
        this.contractNumber = contractNumber;
    }

    public String getContractDate() {
        return contractDate;
    }

    public void setContractDate(String contractDate) {
        this.contractDate = contractDate;
    }

    public Long getMonthWage() {
        return monthWage;
    }

    public void setMonthWage(Long monthWage) {
        this.monthWage = monthWage;
    }

    public Long getPercent() {
        return percent;
    }

    public void setPercent(Long percent) {
        this.percent = percent;
    }

    public Long getBrokerWage() {
        return brokerWage;
    }

    public void setBrokerWage(Long brokerWage) {
        this.brokerWage = brokerWage;
    }

    public Long getAmount() {
        return amount;
    }

    public void setAmount(Long amount) {
        this.amount = amount;
    }

    public String getNationalCode() {
        return nationalCode;
    }

    public void setNationalCode(String nationalCode) {
        this.nationalCode = nationalCode;
    }

    public String getProvinceCode() {
        return provinceCode;
    }

    public void setProvinceCode(String provinceCode) {
        this.provinceCode = provinceCode;
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

    public String getPaymentMonthCount() {
        return paymentMonthCount;
    }

    public void setPaymentMonthCount(String paymentMonthCount) {
        this.paymentMonthCount = paymentMonthCount;
    }


    @Override
    public BrokerReportDetailPK getIdentifierInstance() {
        return new BrokerReportDetailPK(this.reportId, this.reportRow);
    }
}
