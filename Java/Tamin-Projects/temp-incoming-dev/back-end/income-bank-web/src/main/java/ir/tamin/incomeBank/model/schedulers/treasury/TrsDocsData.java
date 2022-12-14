///*
// * To change this license header, choose License Headers in Project Properties.
// * To change this template file, choose Tools | Templates
// * and open the template in the editor.
// */
//package ir.tamin.incomeBank.model.schedulers.treasury;
//
//import java.io.Serializable;
//import java.util.Date;
//import javax.persistence.Column;
//import javax.persistence.Entity;
//import javax.persistence.GeneratedValue;
//import javax.persistence.GenerationType;
//import javax.persistence.Id;
//import javax.persistence.JoinColumn;
//import javax.persistence.ManyToOne;
//import javax.persistence.Table;
//import javax.persistence.Temporal;
//import javax.persistence.TemporalType;
//
///**
// *
// * @author s_maknooni
// */
//@Entity
//@Table(name = "TRS_DOCS_DATA")
//public class TrsDocsData implements Serializable {
//
//    private static final long serialVersionUID = 1L;
//    @Id
//    @GeneratedValue(generator = "sequenceGenerator", strategy = GenerationType.SEQUENCE)
//    @Column(name = "TRS_DOC_ID")
//    private Integer trsDocId;
//    @Column(name = "ARTICLE_ID")
//    private Integer articleId;
//    @Column(name = "ISSUE_APPROVAL_DATE")
//    @Temporal(TemporalType.TIMESTAMP)
//    private Date issueApprovalDate;
//    @Column(name = "DUE_DATE")
//    private String dueDate;
//    @Column(name = "STOCK_CODE")
//    private String stockCode;
//    @Column(name = "BILLS_NUMBER")
//    private Integer billsNumber;
//    @Column(name = "BILLS_AMOUNT")
//    private Long billsAmount;
//    @Column(name = "EMPLOYER_NAME")
//    private String employerName;
//    @Column(name = "EDAREOMOOR_CODE")
//    private String edareomoorCode;
//    @Column(name = "EDAREOMOOR_NAME")
//    private String edareomoorName;
//    @Column(name = "BNK_BRCH_CODE")
//    private String bnkBrchCode;
//    @Column(name = "BNK_BRCH_NAME")
//    private String bnkBrchName;
//    @Column(name = "CREATE_DATE")
//    @Temporal(TemporalType.TIMESTAMP)
//    private Date createDate;
//    @Column(name = "BILLS_NAME")
//    private String billsName;
//    @Column(name = "ORGANIZATION_NAME")
//    private String organizationName;
//    @Column(name = "ORGANIZATION_IDENTIFIER")
//    private String organizationIdentifier;
//    @Column(name = "LAST_MODIFIED_DATE")
//    @Temporal(TemporalType.TIMESTAMP)
//    private Date lastModifiedDate;
//    @Column(name = "EMPLOYER_IDENTIFIER")
//    private String employerIdentifier;
//    @Column(name = "BANK_CODE")
//    private String bankCode;
//    @Column(name = "BANK_NAME")
//    private String bankName;
//    @Column(name = "IBAN")
//    private String iban;
//    @Column(name = "BILLS_STATUS")
//    private String billsStatus;
//    @JoinColumn(name = "TRS_FILE_FK", referencedColumnName = "ID")
//    @ManyToOne
//    private TrsFileInfo fileInfo;
//
//    public TrsDocsData() {
//    }
//
//    public TrsDocsData(Integer trsDocId) {
//        this.trsDocId = trsDocId;
//    }
//
//    public TrsDocsData(Integer trsDocId, Date createDate) {
//        this.trsDocId = trsDocId;
//        this.createDate = createDate;
//    }
//
//    public Integer getTrsDocId() {
//        return trsDocId;
//    }
//
//    public void setTrsDocId(Integer trsDocId) {
//        this.trsDocId = trsDocId;
//    }
//
//    public Integer getArticleId() {
//        return articleId;
//    }
//
//    public void setArticleId(Integer articleId) {
//        this.articleId = articleId;
//    }
//
//    public Date getIssueApprovalDate() {
//        return issueApprovalDate;
//    }
//
//    public void setIssueApprovalDate(Date issueApprovalDate) {
//        this.issueApprovalDate = issueApprovalDate;
//    }
//
//    public String getDueDate() {
//        return dueDate;
//    }
//
//    public void setDueDate(String dueDate) {
//        this.dueDate = dueDate;
//    }
//
//    public String getStockCode() {
//        return stockCode;
//    }
//
//    public void setStockCode(String stockCode) {
//        this.stockCode = stockCode;
//    }
//
//    public Integer getBillsNumber() {
//        return billsNumber;
//    }
//
//    public void setBillsNumber(Integer billsNumber) {
//        this.billsNumber = billsNumber;
//    }
//
//    public Long getBillsAmount() {
//        return billsAmount;
//    }
//
//    public void setBillsAmount(Long billsAmount) {
//        this.billsAmount = billsAmount;
//    }
//
//    public String getEmployerName() {
//        return employerName;
//    }
//
//    public void setEmployerName(String employerName) {
//        this.employerName = employerName;
//    }
//
//    public String getEdareomoorCode() {
//        return edareomoorCode;
//    }
//
//    public void setEdareomoorCode(String edareomoorCode) {
//        this.edareomoorCode = edareomoorCode;
//    }
//
//    public String getEdareomoorName() {
//        return edareomoorName;
//    }
//
//    public void setEdareomoorName(String edareomoorName) {
//        this.edareomoorName = edareomoorName;
//    }
//
//    public String getBnkBrchCode() {
//        return bnkBrchCode;
//    }
//
//    public void setBnkBrchCode(String bnkBrchCode) {
//        this.bnkBrchCode = bnkBrchCode;
//    }
//
//    public String getBnkBrchName() {
//        return bnkBrchName;
//    }
//
//    public void setBnkBrchName(String bnkBrchName) {
//        this.bnkBrchName = bnkBrchName;
//    }
//
//    public Date getCreateDate() {
//        return createDate;
//    }
//
//    public void setCreateDate(Date createDate) {
//        this.createDate = createDate;
//    }
//
//    public String getBillsName() {
//        return billsName;
//    }
//
//    public void setBillsName(String billsName) {
//        this.billsName = billsName;
//    }
//
//    public String getOrganizationName() {
//        return organizationName;
//    }
//
//    public void setOrganizationName(String organizationName) {
//        this.organizationName = organizationName;
//    }
//
//    public String getOrganizationIdentifier() {
//        return organizationIdentifier;
//    }
//
//    public void setOrganizationIdentifier(String organizationIdentifier) {
//        this.organizationIdentifier = organizationIdentifier;
//    }
//
//    public Date getLastModifiedDate() {
//        return lastModifiedDate;
//    }
//
//    public void setLastModifiedDate(Date lastModifiedDate) {
//        this.lastModifiedDate = lastModifiedDate;
//    }
//
//    public String getEmployerIdentifier() {
//        return employerIdentifier;
//    }
//
//    public void setEmployerIdentifier(String employerIdentifier) {
//        this.employerIdentifier = employerIdentifier;
//    }
//
//    public String getBankCode() {
//        return bankCode;
//    }
//
//    public void setBankCode(String bankCode) {
//        this.bankCode = bankCode;
//    }
//
//    public String getBankName() {
//        return bankName;
//    }
//
//    public void setBankName(String bankName) {
//        this.bankName = bankName;
//    }
//
//    public String getIban() {
//        return iban;
//    }
//
//    public void setIban(String iban) {
//        this.iban = iban;
//    }
//
//    public String getBillsStatus() {
//        return billsStatus;
//    }
//
//    public void setBillsStatus(String billsStatus) {
//        this.billsStatus = billsStatus;
//    }
//
//    public TrsFileInfo getFileInfo() {
//        return fileInfo;
//    }
//
//    public void setFileInfo(TrsFileInfo fileInfo) {
//        this.fileInfo = fileInfo;
//    }
//
//}
