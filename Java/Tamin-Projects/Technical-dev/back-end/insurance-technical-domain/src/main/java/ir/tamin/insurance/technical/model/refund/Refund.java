package ir.tamin.insurance.technical.model.refund;

//import ir.tamin.framework.core.util.DateUtils;

import ir.tamin.framework.domain.AbstractEntity;
import ir.tamin.framework.ws.rest.repository.annotation.RESTResource;
import ir.tamin.framework.ws.rest.repository.annotation.ResourceId;
import ir.tamin.framework.ws.rest.repository.annotation.ResourceIds;
import ir.tamin.insurance.technical.model.baseinfo.PremiumType;
import ir.tamin.insurance.technical.model.baseinfo.RefundReason;
import ir.tamin.insurance.technical.model.insurance.InsuranceRegisteration;

import javax.persistence.*;
import javax.validation.constraints.Pattern;
import javax.validation.constraints.Size;
import java.util.Date;



@Entity
@Table(name = "techins.refund_debit_requests")
@RESTResource(lookupProxy = "ir.tamin.insurance.technical.business.refund.RefundSpecProxy")
@ResourceIds({
    @ResourceId(fields = "requestSerial")})
//@NamedQueries({
//    @NamedQuery(name = "Refund.findByReqStatus", query = "SELECT c FROM Refund c WHERE  c.nationalCode=:nationalCode"),
//    @NamedQuery(name = "Refund.findByBranchCode", query = "SELECT c FROM Refund c WHERE  c.nationalCode=:nationalCode and c.branchCode=:branchCode and c.guardianType=:guardianType and c.guardianNationalCode=:guardianNationalCode and c.requestType=:requestType and c.requesterType=:requesterType order by c.reqDate desc ")})
public class Refund extends AbstractEntity<String> {
    
    @Id
    @Column(name = "REQID", length = 20, nullable = false)
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    private String requestSerial;   

   // @NotNull
    @Column(name = "REQDATE")
    @Temporal(TemporalType.TIMESTAMP)
    private Date requestDate;

   // @NotNull
    @Pattern(regexp = "[a-zA-Z_0-9]*")
    @Size(min = 10, max = 10)
    @Column(name = "RISUID")
    private String insuranceId;
    
    
    @Pattern(regexp = "[0-9]*")
    @Size(max = 10)
    @Column(name = "NATIONALCODE", length = 10)
    private String nationalId;
    
    @ManyToOne
    @JoinColumns({
        @JoinColumn(name = "RISUID", referencedColumnName = "RISUID", updatable = false, insertable = false),
        @JoinColumn(name = "BRCH_CODE", referencedColumnName = "BRCH_CODE", updatable = false, insertable = false)
    })
    private InsuranceRegisteration insuranceRegisteration;

    //@NotNull
    @Pattern(regexp = "[0-9]*")
    @Size(min = 1, max = 100)
    @Column(name = "PAYMENT_REFID", length = 100)//resnum
    private String paymentRefrenceId;

    @Column(name = "CNT_CNTRCTNO")
    private String contractNo;

    @Column(name = "CWS_DBTNO")
    private String debitNo;

    @OneToOne
    @JoinColumn(name = "REASON_CODE" , referencedColumnName = "REASON_CODE")
    private RefundReason refundReason;

    @Pattern(regexp = "[0-9]*")
    @Size(min = 2, max = 2)
    @Column(name = "TYPECODE", length = 2)//typecode
    private String isuTypeCode;
    
    
    @ManyToOne
    @JoinColumns({        
        @JoinColumn(name = "TYPECODE", referencedColumnName = "SELFISUTYPECODE", updatable = false, insertable = false)
    })
    private PremiumType insuranceType;

    @Column(name = "ISU_SDATE", length = 6)
    @Temporal(TemporalType.TIMESTAMP)
    private Date isuStartDate;
    
    @Column(name = "ISU_EDATE", length = 6)
    @Temporal(TemporalType.TIMESTAMP)
    private Date isuEndDate;
    
    //@Pattern(regexp = "[0-9]*")
    //@Size( max = 4)
    @Column(name = "ISU_DAYS")
    private int isuDays;
	
    //@Pattern(regexp = "[0-9]*")
   // @Size(max = 15)
    @Column(name = "ISU_AMOUNT")
    private Long isuAmount;
	
    @Pattern(regexp = "[0-9]*")
    @Size( max = 3)
    @Column(name = "ISU_DEBITTYPECODE", length = 3)
    private String isuDebitTypeCode;
    
    @Column(name = "DARMAN_SDATE", length = 6)
    @Temporal(TemporalType.TIMESTAMP)
    private Date darmanStartDate;
    
    @Column(name = "DARMAN_EDATE", length = 6)
    @Temporal(TemporalType.TIMESTAMP)
    private Date darmanEndDate;
    
    //@Pattern(regexp = "[0-9]*")
    //@Size( max = 4)
    @Column(name = "DARMAN_DAYS")
    private int darmanDays;
	
    //@Pattern(regexp = "[0-9]*")
    //@Size( max = 15)
    @Column(name = "DARMAN_AMOUNT")
    private Long darmanAmount;	
    
    @Pattern(regexp = "[0-9]*")
    @Size(max = 3)
    @Column(name = "DRM_DEBITTYPECODE", length = 3)
    private String darmanDebitTypeCode;	
	
    @Pattern(regexp = "[0-9]*")
    @Size(max = 10)
    @Column(name = "CREATUID", length = 20)
    private String createUserId;	
			
    @Column(name = "CREATUDT", length = 6)
    @Temporal(TemporalType.TIMESTAMP)
    private Date createDate;

    @Pattern(regexp = "[0-9]*")
    @Size(max = 10)
    @Column(name = "EDITUID", length = 20)
    private String editUserId;

    @Column(name = "EDITDT", length = 6)
    @Temporal(TemporalType.TIMESTAMP)
    private Date editDate;
	
    @Pattern(regexp = "[0-9]*")
    @Size(max = 10)
    @Column(name = "TECHCONFUID", length = 20)
    private String techConfirmUserId;	
			
    @Column(name = "TECHCONFUDT", length = 6)
    @Temporal(TemporalType.TIMESTAMP)
    private Date techConfirmDate;	
    
    @Pattern(regexp = "[0-9]*")
    @Size(max = 10)
    @Column(name = "BOSSUID", length = 20)
    private String bossUserId;	   
			
    @Column(name = "BOSSUDT", length = 6)
    @Temporal(TemporalType.TIMESTAMP)
    private Date bossDate;	
	
    @Pattern(regexp = "[0-9]*")
    @Size(max = 10)
    @Column(name = "CANCELERUID", length = 20)
    private String cancelUserId;	
				
    @Column(name = "CANCELERDT", length = 6)
    @Temporal(TemporalType.TIMESTAMP)
    private Date canceldate;					
	
    @Pattern(regexp = "[0-9]*")
    @Size( max = 1)
    @Column(name = "STATUS", length =1)
    private String status;					
	
    @Pattern(regexp = "[0-9]*")
    @Size(max = 2)
    @Column(name = "CATEGORYTYPECODE", length =2)
    private String categoryTypeCode;
    
    //@NotNull
    @Pattern(regexp = "[0-9]*")
    @Size(max = 4)
    @Column(name = "BRCH_CODE", length = 4)
    private String branchCode;

    //@NotNull
    @Pattern(regexp = "[0-9]*")
    @Size(max = 4)
    @Column(name = "BRCH_REGISTER", length = 4)
    private String regBranchCode;

    @Transient
    private String actionType;

    public String getActionType() {
        return actionType;
    }

    public void setActionType(String actionType) {
        this.actionType = actionType;
    }
    
    public String getRequestSerial() {
        return requestSerial;
    }

    public void setRequestSerial(String requestSerial) {
        this.requestSerial = requestSerial;
    }

    public String getIsuTypeCode() {
        return isuTypeCode;
    }

    public void setIsuTypeCode(String isuTypeCode) {
        this.isuTypeCode = isuTypeCode;
    }   

    public Date getRequestDate() {
        return requestDate;
    }

    public void setRequestDate(Date requestDate) {
        this.requestDate = requestDate;
    }
  
    public String getInsuranceId() {
        return insuranceId;
    }

    public void setInsuranceId(String insuranceId) {
        this.insuranceId = insuranceId;
    }

    public InsuranceRegisteration getInsuranceRegisteration() {
        return insuranceRegisteration;
    }

    public void setInsuranceRegisteration(InsuranceRegisteration insuranceRegisteration) {
        this.insuranceRegisteration = insuranceRegisteration;
    }

    public String getPaymentRefrenceId() {
        return paymentRefrenceId;
    }

    public void setPaymentRefrenceId(String paymentRefrenceId) {
        this.paymentRefrenceId = paymentRefrenceId;
    }

    public RefundReason getRefundReason() {
        return refundReason;
    }

    public void setRefundReason(RefundReason refundReason) {
        this.refundReason = refundReason;
    }

    public Date getIsuStartDate() {
        return isuStartDate;
    }

    public void setIsuStartDate(Date isuStartDate) {
        this.isuStartDate = isuStartDate;
    }

    public Date getIsuEndDate() {
        return isuEndDate;
    }

    public void setIsuEndDate(Date isuEndDate) {
        this.isuEndDate = isuEndDate;
    }

    public int getIsuDays() {
        return isuDays;
    }

    public void setIsuDays(int isuDays) {
        this.isuDays = isuDays;
    }

    public Long getIsuAmount() {
        return isuAmount;
    }

    public void setIsuAmount(Long isuAmount) {
        this.isuAmount = isuAmount;
    }

    public String getIsuDebitTypeCode() {
        return isuDebitTypeCode;
    }

    public void setIsuDebitTypeCode(String isuDebitTypeCode) {
        this.isuDebitTypeCode = isuDebitTypeCode;
    }

    public Date getDarmanStartDate() {
        return darmanStartDate;
    }

    public void setDarmanStartDate(Date darmanStartDate) {
        this.darmanStartDate = darmanStartDate;
    }

    public Date getDarmanEndDate() {
        return darmanEndDate;
    }

    public void setDarmanEndDate(Date darmanEndDate) {
        this.darmanEndDate = darmanEndDate;
    }

    public int getDarmanDays() {
        return darmanDays;
    }

    public void setDarmanDays(int darmanDays) {
        this.darmanDays = darmanDays;
    }

    public Long getDarmanAmount() {
        return darmanAmount;
    }

    public void setDarmanAmount(Long darmanAmount) {
        this.darmanAmount = darmanAmount;
    }

    public String getDarmanDebitTypeCode() {
        return darmanDebitTypeCode;
    }

    public void setDarmanDebitTypeCode(String darmanDebitTypeCode) {
        this.darmanDebitTypeCode = darmanDebitTypeCode;
    }

    public String getCreateUserId() {
        return createUserId;
    }

    public void setCreateUserId(String createUserId) {
        this.createUserId = createUserId;
    }

    public Date getCreateDate() {
        return createDate;
    }

    public void setCreateDate(Date createDate) {
        this.createDate = createDate;
    }

    public String getEditUserId() {
        return editUserId;
    }

    public void setEditUserId(String editUserId) {
        this.editUserId = editUserId;
    }

    public Date getEditDate() {
        return editDate;
    }

    public void setEditDate(Date editDate) {
        this.editDate = editDate;
    }

    public String getTechConfirmUserId() {
        return techConfirmUserId;
    }

    public void setTechConfirmUserId(String techConfirmUserId) {
        this.techConfirmUserId = techConfirmUserId;
    }

    public Date getTechConfirmDate() {
        return techConfirmDate;
    }

    public void setTechConfirmDate(Date techConfirmDate) {
        this.techConfirmDate = techConfirmDate;
    }

    public String getBossUserId() {
        return bossUserId;
    }

    public void setBossUserId(String bossUserId) {
        this.bossUserId = bossUserId;
    }

    public Date getBossDate() {
        return bossDate;
    }

    public void setBossDate(Date bossDate) {
        this.bossDate = bossDate;
    }

    public String getCancelUserId() {
        return cancelUserId;
    }

    public void setCancelUserId(String cancelUserId) {
        this.cancelUserId = cancelUserId;
    }

    public Date getCanceldate() {
        return canceldate;
    }

    public void setCanceldate(Date canceldate) {
        this.canceldate = canceldate;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

   

    public String getBranchCode() {
        return branchCode;
    }

    public void setBranchCode(String branchCode) {
        this.branchCode = branchCode;
    }

    public String getRegBranchCode() {
        return regBranchCode;
    }

    public void setRegBranchCode(String regBranchCode) {
        this.regBranchCode = regBranchCode;
    }

    public String getNationalId() {
        return nationalId;
    }

    public void setNationalId(String nationalId) {
        this.nationalId = nationalId;
    }

    public PremiumType getInsuranceType() {
        return insuranceType;
    }

    public void setInsuranceType(PremiumType insuranceType) {
        this.insuranceType = insuranceType;
    }

    
    public String getCategoryTypeCode() {
        return categoryTypeCode;
    }

    public void setCategoryTypeCode(String categoryTypeCode) {
        this.categoryTypeCode = categoryTypeCode;
    }  

    public String getContractNo() {
        return contractNo;
    }

    public void setContractNo(String contractNo) {
        this.contractNo = contractNo;
    }

    public String getDebitNo() {
        return debitNo;
    }

    public void setDebitNo(String debitNo) {
        this.debitNo = debitNo;
    }

    @Override
    public String getIdentifierInstance() {
        return requestSerial;
    }
}
