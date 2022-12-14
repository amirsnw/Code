package ir.tamin.insurance.technical.model.insuranceAgreement;

import ir.tamin.framework.domain.AbstractEntity;
import ir.tamin.framework.ws.rest.repository.annotation.RESTResource;
import ir.tamin.framework.ws.rest.repository.annotation.ResourceId;
import ir.tamin.framework.ws.rest.repository.annotation.ResourceIds;
import ir.tamin.insurance.technical.model.primaryKeyClass.ContractPK;

import javax.persistence.*;

/**
 *
 * @author m_hoseini
 */
@Entity
@Table(name = "regcontractspec")
@IdClass(ContractPK.class)
@RESTResource(lookupProxy = "ir.tamin.insurance.technical.business.transferInsuredToTamin.EntPayStatusManager")
@ResourceIds({
    @ResourceId(fields = {"workshopId", "contractRow", "contractSequence","branchCode"})})
public class Contract extends AbstractEntity<ContractPK> {
    
  
    @Id
    @Column(name = "RWSHID")
    private String workshopId;
    @Id
    @Column(name = "RCNTROW")
    private String contractRow;
    @Id
    @Column(name = "RCNTSEQ")
    private String contractSequence;
    @Id
    @Column(name = "BRCH_CODE")
    private String branchCode;
    
    @Column(name = "RCNTNO")
    private String contractNumber;
    @Column(name = "RCNTDATE")
    private String contractDate;
    @Column(name = "RCNTASSIGNTYPE")
    private String contractAssignType;
    @Column(name = "RCNTASSIGNCODE")
    private String contractAssignCode;
    @Column(name = "RCNTSDATE")
    private String contractStartDate;
    @Column(name = "RCNTEDATE")
    private String contractEndDate;
    @Column(name = "RCNTSUBJECT")
    private String contractSubject;
    @Column(name = "RCNTADDRESS")
    private String contractAddress;
    @Column(name = "CONTRACTSTATUSCODE")
    private String contractStatusCode;
    @Column(name = "RCNTCERTIFNO")
    private String contractCertificateNumber;
    @Column(name = "RCNTCERTIFDATE")
    private String contractCertificateDate;
    @Column(name = "CREATEUID")
    private String createUserId;
    @Column(name = "CREATEDT")
    private String createUserDate;
    @Column(name = "RCNTASSIGNNAME")
    private String contractAssignName;
    @Column(name = "RCNTASSIGNROW")
    private String contractAssignRow;
    @Column(name = "WSHRATECODE")
    private String workshopRateCode;
    @Column(name = "CSP_SUPTYP")
    private String csp_supportType;
    @Column(name = "CWS_DBTNO")
    private String debitNumber;    
    @Column(name = "RCNTAMOUNT")
    private String contractAmount;   
    @Column(name = "CHARACTER")
    private String character;
    @Column(name = "LEGAL_ID")
    private String legalCode;
    @Column(name = "NATIONAL_CODE")
    private String nationalCode;
    @Column(name = "LICESNSE_DATE")
    private String licesnseDate;
    @Column(name = "LICENSE_NUMBER")
    private String licesnsenumber;
    @Column(name = "BIRTH_DATE")
    private String birthDate;
    @Column(name = "CONFIDENTIAL")
    private String confidential;
    @Column(name = "P_RWSHID")
    private String p_workshopId;
    @Column(name = "P_RCNTROW")
    private String p_contractRow;
    @Column(name = "P_RCNTNO")
    private String p_contractnumber;
    @Column(name = "P_RCNTDATE")
    private String p_contractDate;
    @Column(name = "P_RCNTSEQ")
    private String p_contractSequence;
    @Column(name = "P_BRCH_CODE")
    private String p_branchCode;
    @Column(name = "CLAIM_DT")
    private String claimDate;
    @Column(name = "CLAIM_UID")
    private String claimUserId;
    @Column(name = "INCOM_DT")
    private String incomDate;
    @Column(name = "INCOM_UID")
    private String incomUserId;
    @Column(name = "STATUS")
    private String status;
    @Column(name = "CONTRACT_DESCRIPTION")
    private String contractDesc;
    @Column(name = "IS_NEW")
    private String isNew;
    @Column(name = "RWSHID_COPY_CONTRACT")
    private String workshopIdCopyContract;
    @Column(name = "BRCH_CODE_COPY_CONTRACT")
    private String branchCodeCopyContract;
    @Column(name = "CONTRACT_DATE_COPY_CONTRACT")
    private String contractDateCopyContract;
    @Column(name = "CONTRACT_NO_COPY_CONTRACT")
    private String contractNumberCopyContract;
    @Column(name = "IGNORE_INQUIRY")
    private String ignoreInquiry;
    @Column(name = "A_RWSHID")
    private String a_workshopId;
    @Column(name = "A_BRCH_CODE")
    private String a_branchCode;
    @Column(name = "CREATOR_SOURCE")
    private String creatorSource;
    @Column(name = "FROM_OTHER_BRANCH")
    private String fromOtherBranch;

    public String getWorkshopId() {
        return workshopId;
    }

    public void setWorkshopId(String workshopId) {
        this.workshopId = workshopId;
    }

    public String getContractRow() {
        return contractRow;
    }

    public void setContractRow(String contractRow) {
        this.contractRow = contractRow;
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

    public String getContractAssignType() {
        return contractAssignType;
    }

    public void setContractAssignType(String contractAssignType) {
        this.contractAssignType = contractAssignType;
    }

    public String getContractAssignCode() {
        return contractAssignCode;
    }

    public void setContractAssignCode(String contractAssignCode) {
        this.contractAssignCode = contractAssignCode;
    }

    public String getContractStartDate() {
        return contractStartDate;
    }

    public void setContractStartDate(String contractStartDate) {
        this.contractStartDate = contractStartDate;
    }

    public String getContractEndDate() {
        return contractEndDate;
    }

    public void setContractEndDate(String contractEndDate) {
        this.contractEndDate = contractEndDate;
    }

    public String getContractSubject() {
        return contractSubject;
    }

    public void setContractSubject(String contractSubject) {
        this.contractSubject = contractSubject;
    }

    public String getContractAddress() {
        return contractAddress;
    }

    public void setContractAddress(String contractAddress) {
        this.contractAddress = contractAddress;
    }

    public String getContractStatusCode() {
        return contractStatusCode;
    }

    public void setContractStatusCode(String contractStatusCode) {
        this.contractStatusCode = contractStatusCode;
    }

    public String getContractCertificateNumber() {
        return contractCertificateNumber;
    }

    public void setContractCertificateNumber(String contractCertificateNumber) {
        this.contractCertificateNumber = contractCertificateNumber;
    }

    public String getContractCertificateDate() {
        return contractCertificateDate;
    }

    public void setContractCertificateDate(String contractCertificateDate) {
        this.contractCertificateDate = contractCertificateDate;
    }

    public String getCreateUserId() {
        return createUserId;
    }

    public void setCreateUserId(String createUserId) {
        this.createUserId = createUserId;
    }

    public String getCreateUserDate() {
        return createUserDate;
    }

    public void setCreateUserDate(String createUserDate) {
        this.createUserDate = createUserDate;
    }

    public String getContractAssignName() {
        return contractAssignName;
    }

    public void setContractAssignName(String contractAssignName) {
        this.contractAssignName = contractAssignName;
    }

    public String getContractAssignRow() {
        return contractAssignRow;
    }

    public void setContractAssignRow(String contractAssignRow) {
        this.contractAssignRow = contractAssignRow;
    }

    public String getWorkshopRateCode() {
        return workshopRateCode;
    }

    public void setWorkshopRateCode(String workshopRateCode) {
        this.workshopRateCode = workshopRateCode;
    }

    public String getCsp_supportType() {
        return csp_supportType;
    }

    public void setCsp_supportType(String csp_supportType) {
        this.csp_supportType = csp_supportType;
    }

    public String getDebitNumber() {
        return debitNumber;
    }

    public void setDebitNumber(String debitNumber) {
        this.debitNumber = debitNumber;
    }

    public String getContractSequence() {
        return contractSequence;
    }

    public void setContractSequence(String contractSequence) {
        this.contractSequence = contractSequence;
    }

    public String getContractAmount() {
        return contractAmount;
    }

    public void setContractAmount(String contractAmount) {
        this.contractAmount = contractAmount;
    }

    public String getBranchCode() {
        return branchCode;
    }

    public void setBranchCode(String branchCode) {
        this.branchCode = branchCode;
    }

    public String getCharacter() {
        return character;
    }

    public void setCharacter(String character) {
        this.character = character;
    }

    public String getLegalCode() {
        return legalCode;
    }

    public void setLegalCode(String legalCode) {
        this.legalCode = legalCode;
    }

    public String getNationalCode() {
        return nationalCode;
    }

    public void setNationalCode(String nationalCode) {
        this.nationalCode = nationalCode;
    }

    public String getLicesnseDate() {
        return licesnseDate;
    }

    public void setLicesnseDate(String licesnseDate) {
        this.licesnseDate = licesnseDate;
    }

    public String getLicesnsenumber() {
        return licesnsenumber;
    }

    public void setLicesnsenumber(String licesnsenumber) {
        this.licesnsenumber = licesnsenumber;
    }

    public String getBirthDate() {
        return birthDate;
    }

    public void setBirthDate(String birthDate) {
        this.birthDate = birthDate;
    }

    public String getConfidential() {
        return confidential;
    }

    public void setConfidential(String confidential) {
        this.confidential = confidential;
    }

    public String getP_workshopId() {
        return p_workshopId;
    }

    public void setP_workshopId(String p_workshopId) {
        this.p_workshopId = p_workshopId;
    }

    public String getP_contractRow() {
        return p_contractRow;
    }

    public void setP_contractRow(String p_contractRow) {
        this.p_contractRow = p_contractRow;
    }

    public String getP_contractnumber() {
        return p_contractnumber;
    }

    public void setP_contractnumber(String p_contractnumber) {
        this.p_contractnumber = p_contractnumber;
    }

    public String getP_contractDate() {
        return p_contractDate;
    }

    public void setP_contractDate(String p_contractDate) {
        this.p_contractDate = p_contractDate;
    }

    public String getP_contractSequence() {
        return p_contractSequence;
    }

    public void setP_contractSequence(String p_contractSequence) {
        this.p_contractSequence = p_contractSequence;
    }

    public String getP_branchCode() {
        return p_branchCode;
    }

    public void setP_branchCode(String p_branchCode) {
        this.p_branchCode = p_branchCode;
    }

    public String getClaimDate() {
        return claimDate;
    }

    public void setClaimDate(String claimDate) {
        this.claimDate = claimDate;
    }

    public String getClaimUserId() {
        return claimUserId;
    }

    public void setClaimUserId(String claimUserId) {
        this.claimUserId = claimUserId;
    }

    public String getIncomDate() {
        return incomDate;
    }

    public void setIncomDate(String incomDate) {
        this.incomDate = incomDate;
    }

    public String getIncomUserId() {
        return incomUserId;
    }

    public void setIncomUserId(String incomUserId) {
        this.incomUserId = incomUserId;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public String getContractDesc() {
        return contractDesc;
    }

    public void setContractDesc(String contractDesc) {
        this.contractDesc = contractDesc;
    }

    public String getIsNew() {
        return isNew;
    }

    public void setIsNew(String isNew) {
        this.isNew = isNew;
    }

    public String getWorkshopIdCopyContract() {
        return workshopIdCopyContract;
    }

    public void setWorkshopIdCopyContract(String workshopIdCopyContract) {
        this.workshopIdCopyContract = workshopIdCopyContract;
    }

    public String getBranchCodeCopyContract() {
        return branchCodeCopyContract;
    }

    public void setBranchCodeCopyContract(String branchCodeCopyContract) {
        this.branchCodeCopyContract = branchCodeCopyContract;
    }

    public String getContractDateCopyContract() {
        return contractDateCopyContract;
    }

    public void setContractDateCopyContract(String contractDateCopyContract) {
        this.contractDateCopyContract = contractDateCopyContract;
    }

    public String getContractNumberCopyContract() {
        return contractNumberCopyContract;
    }

    public void setContractNumberCopyContract(String contractNumberCopyContract) {
        this.contractNumberCopyContract = contractNumberCopyContract;
    }

    public String getIgnoreInquiry() {
        return ignoreInquiry;
    }

    public void setIgnoreInquiry(String ignoreInquiry) {
        this.ignoreInquiry = ignoreInquiry;
    }

    public String getA_workshopId() {
        return a_workshopId;
    }

    public void setA_workshopId(String a_workshopId) {
        this.a_workshopId = a_workshopId;
    }

    public String getA_branchCode() {
        return a_branchCode;
    }

    public void setA_branchCode(String a_branchCode) {
        this.a_branchCode = a_branchCode;
    }

    public String getCreatorSource() {
        return creatorSource;
    }

    public void setCreatorSource(String creatorSource) {
        this.creatorSource = creatorSource;
    }

    public String getFromOtherBranch() {
        return fromOtherBranch;
    }

    public void setFromOtherBranch(String fromOtherBranch) {
        this.fromOtherBranch = fromOtherBranch;
    }
    
    @Override
    public ContractPK getIdentifierInstance() {
        return new ContractPK( workshopId ,  contractRow,  branchCode,  contractSequence);
    } 

}
