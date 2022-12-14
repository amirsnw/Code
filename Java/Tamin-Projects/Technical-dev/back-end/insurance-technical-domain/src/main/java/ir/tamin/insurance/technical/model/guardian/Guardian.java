package ir.tamin.insurance.technical.model.guardian;

import ir.tamin.framework.core.util.DateUtils;
import ir.tamin.framework.domain.AbstractEntity;
import ir.tamin.framework.ws.rest.repository.annotation.RESTResource;
import ir.tamin.framework.ws.rest.repository.annotation.ResourceId;
import ir.tamin.framework.ws.rest.repository.annotation.ResourceIds;
import ir.tamin.insurance.technical.model.insurance.InsuranceRegisteration;

import javax.persistence.*;
import java.util.Date;

@Entity
@Table(name = "SSUP_GUARDIAN")
@RESTResource(lookupProxy = "ir.tamin.insurance.technical.business.guardian.GuardianSpecProxy")
@ResourceIds({
    @ResourceId(fields = "reqSerial")})
@NamedQueries({
    @NamedQuery(name = "Guardian.findByReqStatus", query = "SELECT c FROM Guardian c WHERE  c.nationalCode=:nationalCode and c.requestType=:requestType"),
    @NamedQuery(name = "Guardian.countByReqNo", query = "SELECT count(c) FROM Guardian c WHERE  c.reqNo=:reqNo"),
    @NamedQuery(name = "Guardian.findByBranchCode", query = "SELECT c FROM Guardian c WHERE  c.nationalCode=:nationalCode and c.branchCode=:branchCode and c.guardianType=:guardianType and c.guardianNationalCode=:guardianNationalCode and c.requestType=:requestType and c.requesterType=:requesterType order by c.reqDate desc ")})
public class Guardian extends AbstractEntity<String> {
//    @Id

    @Column(name = "REQNO", length = 20)
    private String reqNo;

    @Id
    @Column(name = "REQ_SERIAL", length = 20, nullable = false)
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    private String reqSerial;

    @Column(name = "RISUID", nullable = false)
    private String insuranceId;

    @ManyToOne
    @JoinColumns({
        @JoinColumn(name = "RISUID", referencedColumnName = "RISUID", updatable = false, insertable = false),
        @JoinColumn(name = "BRCH_CODE", referencedColumnName = "BRCH_CODE", updatable = false, insertable = false)
    })
    private InsuranceRegisteration insuranceRegisteration;

    @Column(name = "REQDATE", length = 8)
    private String reqDate;

    @Column(name = "INSP_DATE", length = 8)
    private String inspDate;

    @Column(name = "ISU_DEADDATE", length = 8)
    private String isuDeadDate;

    @Column(name = "BIRTHDATE", length = 8)
    private String birthDate;

    @Column(name = "GUAR_BIRTHDATE", length = 8)
    private String guardianBirthDate;

    @Column(name = "GUAR_BIRTHDATE2", length = 8)
    private String guardianBirthDate2;

    @Column(name = "REQ_REASON_FANNI")
    private Character reasonFanni;

    @Column(name = "STATUS")
    private Character status;

    @Column(name = "BRHREQTYPE")
    private Character brhReqType;

    @Column(name = "REQUESTER_TYPE")
    private Character requesterType;

    @Column(name = "CAUSE_AGE")
    private Character causeAge;

    @Column(name = "GUAR_TYPE")
    private Character guardianType;

    @Column(name = "REQUEST_TYPE")
    private Character requestType;

    @Column(name = "TECH_CONFSTATUS")
    private Character techConfStatus;

    @Column(name = "TECH_CONFDT")
    private String techConfDate;

    @Column(name = "TECH_CONFUID")
    private String techConfUserId;

    @Column(name = "HAVEMEDICALDOC")
    private Character haveMedicalDoc;

    @Column(name = "INSP_CONFIRM")
    private Character inspectorConfirm;

    @Column(name = "INSPECTOR_NAME", length = 150)
    private String inspectorName;

    @Column(name = "CAN_NOPEN", length = 10)
    private String pensionNo;

    @Column(name = "NATCODE", length = 10)
    private String nationalCode;
    
    @Column(name = "FOREIGNCODE")
    private String foreignCode;

    @Column(name = "GUAR_NATCODE", length = 10)
    private String guardianNationalCode;
    
    @Column(name = "GUAR_FOREIGNCODE")
    private String guardianForeignCode;

    @Column(name = "GUAR_NATCODE2", length = 10)
    private String guardianNationalCode2;
    
    @Column(name = "GUAR_FOREIGNCODE2")
    private String guardianForeignCode2;

    @Column(name = "IDNO", length = 15)
    private String idNo;

    @Column(name = "LNAME", length = 50)
    private String lastName;

    @Column(name = "DOCTOR_NAME", length = 40)
    private String doctorName;

    @Column(name = "FNAME", length = 50)
    private String firstName;

    @Column(name = "GUAR_FULLNAME", length = 100)
    private String guardianFullName;

    @Column(name = "GUAR_FULLNAME2", length = 100)
    private String guardianFullName2;

    @Column(name = "SUBISU_ADDR", length = 400)
    private String subIsuAddress;

    @Column(name = "TECHCONF_DESC", length = 400)
    private String techConfDesc;

    @Column(name = "INSPECTOR_NOTE", length = 4000)
    private String inspectorNote;

    @Column(name = "DOCTOR_CODE", length = 12)
    private String doctorCode;

    @Column(name = "BRCH_CODE", length = 4, nullable = false)
    private String branchCode;

    @Column(name = "BRCH_REQUESTER", length = 4)
    private String branchRequester;

    @Column(name = "BRCH_INSPECTER_LETNO", length = 12)
    private String branchInspLetterNo;

    @Column(name = "BRCH_INSPECTER_LETDATE", length = 8)
    private String branchInspLetterDate;

    @Column(name = "INSP_OPDATE", length = 7)
    private String inspectedDate;

    @Column(name = "INSP_OPNO")
    private String inspectorUserId;

    @Column(name = "BRCH_INSPECTER_RESPLET", length = 4)
    private String branchResponder;

    @Column(name = "BRCH_INSPECTER_RESPLETNO", length = 12)
    private String branchInspRespLetterNo;

    @Column(name = "BRCH_INSPECTER_RESPLETDATE", length = 8)
    private String branchInspRespLetterDate;

    @Column(name = "BRCH_INSPECTER_RESP")
    private Character branchInspResponse;

    @Column(name = "BRCH_INSPECTER_LET", length = 4)
    private String branchInspLet;

    @Column(name = "BRHINTROLETNO", length = 20)
    private String brhIntRoleLetterNo;

    @Column(name = "COMT_CONFIRM")
    private Character committeeConfirm;

    @Column(name = "COMT_OPDATE", length = 7)
    private String committeeConfirmOpDate;

    @Column(name = "COMT_OPNO")
    private String committeeConfirmUserId;

    @Column(name = "BRHINTROLETDATE", length = 8)
    private String brhIntRoleDate;

    @Column(name = "PROVRESP")
    private Character provResponse;

    @Column(name = "PROVRESPREGLETNO", length = 20)
    private String provResponseRegLetterNo;

    @Column(name = "PROVRESPREGLETDATE", length = 8)
    private String provResponseRegLetterDate;

    @Column(name = "PROVRESPLETNO", length = 20)
    private String provResponseLetterNo;

    @Column(name = "PROVRESPLETDATE", length = 8)
    private String provResponseLetterDate;

    @Column(name = "EREQID", length = 20)
    private String eRequestId;

    @Column(name = "guar_birthcitycode")
    private String guarBirthCityCode;

    @Column(name = "guar_expcitycode")
    private String guarExpCityCode;

    @Column(name = "guar_birthcitycode2")
    private String guarBirthCityCode2;

    @Column(name = "guar_expcitycode2")
    private String guarExpCityCode2;

    @Column(name = "INSURE_MOBILE")
    private String insuredMobile;

    @Column(name = "CREATEUID")
    private String createUserId;

    @Column(name = "CREATEDT")
    private String createDate;

    @Column(name = "EDITUID")
    private String editUserId;

    @Column(name = "EDITDT")
    private String editDate;

    @Transient
    private String actionType;

    @Column(name = "PROTEST_STATUS", length = 1)
    private String protestStatus;

    @Column(name = "PROTEST_INSP_NOTE")
    private String protestInspNote;

    @Column(name = "PROTEST_INSP_NAME")
    private String protestInspName;

    @Column(name = "PROTEST_INSP_DATE", length = 8)
    private String protestInspDate;

    @Column(name = "PROTEST_INSP_OPNO")
    private String protestInspUserId;

    @Column(name = "PROTEST_INSP_OPDATE", length = 7)
    private String protestInspOpDate;

    @Column(name = "PROTEST_TECH_NOTE")
    private String protestTechNote;

    @Column(name = "PROTEST_TECH_OPNO", length = 20)
    private String protestTechUserId;

    @Column(name = "PROTEST_TECH_OPDATE", length = 7)
    private String protestTechOpDate;

    @Transient
    private String protestDesc;

    @Transient
    private String technicalFullName;
    @Transient
    private String provinceFullName;

    @Column(name = "PENSIONFUNDSCODE", length = 7)
    private String pensionFundsCode; 
    
    @Column(name = "ProvApproval_Desc")
    private String provApprovalDesc;  
    
    @Column(name = "ProvCode")
    private String provCode; 
    
    @Column(name = "ProvUserID")
    private String provUserId;  
    
    @Transient
    private String referDate; 
    
    @Column(name = "CANCELLATION_DESC")
    private String cancelationDesc;

    public String getCancelationDesc() {
        return cancelationDesc;
    }

    public void setCancelationDesc(String cancelationDesc) {
        this.cancelationDesc = cancelationDesc;
    }    

    public String getReferDate() {
        return referDate;
    }

    public void setReferDate(String referDate) {
        this.referDate = referDate;
    }  

    public String getProvApprovalDesc() {
        return provApprovalDesc;
    }

    public void setProvApprovalDesc(String provApprovalDesc) {
        this.provApprovalDesc = provApprovalDesc;
    }

    public String getProvCode() {
        return provCode;
    }

    public void setProvCode(String provCode) {
        this.provCode = provCode;
    }

    public String getProvUserId() {
        return provUserId;
    }

    public void setProvUserId(String provUserId) {
        this.provUserId = provUserId;
    } 

    public String getPensionFundsCode() {
        return pensionFundsCode;
    }

    public void setPensionFundsCode(String pensionFundsCode) {
        this.pensionFundsCode = pensionFundsCode;
    }

    public String getProtestDesc() {
        return protestDesc;
    }

    public void setProtestDesc(String protestDesc) {
        this.protestDesc = protestDesc;
    }

    public String getProtestInspName() {
        return protestInspName;
    }

//    @Transient
//    private Integer flagBrch;
    public void setProtestInspName(String protestInspName) {
        this.protestInspName = protestInspName;
    }

    public String getProtestStatus() {
        return protestStatus;
    }

    public void setProtestStatus(String protestStatus) {
        this.protestStatus = protestStatus;
    }

    public String getProtestInspNote() {
        return protestInspNote;
    }

    public void setProtestInspNote(String protestInspNote) {
        this.protestInspNote = protestInspNote;
    }

    public Date getProtestInspDate() {
        return protestInspDate != null ? DateUtils.parse(protestInspDate, "yyyyMMdd") : null;
    }

    public void setProtestInspDate(Date protestInspDate) {
        if (protestInspDate != null) {
            this.protestInspDate = DateUtils.format(protestInspDate, "yyyyMMdd");
        }
    }

    public String getProtestInspUserId() {
        return protestInspUserId;
    }

    public void setProtestInspUserId(String protestInspUserId) {
        this.protestInspUserId = protestInspUserId;
    }

    public Date getProtestInspOpDate() {
        return protestInspOpDate != null ? DateUtils.parse(DateUtils.decodeDateString(protestInspOpDate), "yyyyMMdd") : null;
    }

    public void setProtestInspOpDate(Date protestInspOpDate) {
        if (protestInspOpDate != null) {
            this.protestInspOpDate = DateUtils.encodeDateString(DateUtils.format(protestInspOpDate, "yyyyMMdd"));
        }
    }

    public Date getProtestTechOpDate() {
        return protestTechOpDate != null ? DateUtils.parse(DateUtils.decodeDateString(protestTechOpDate), "yyyyMMdd") : null;
    }

    public void setProtestTechOpDate(Date protestTechOpDate) {
        if (protestTechOpDate != null) {
            this.protestTechOpDate = DateUtils.encodeDateString(DateUtils.format(protestTechOpDate, "yyyyMMdd"));
        }
    }

    public String getProtestTechNote() {
        return protestTechNote;
    }

    public void setProtestTechNote(String protestTechNote) {
        this.protestTechNote = protestTechNote;
    }

    public String getProtestTechUserId() {
        return protestTechUserId;
    }

    public void setProtestTechUserId(String protestTechUserId) {
        this.protestTechUserId = protestTechUserId;
    }

    public String getInspectorUserId() {
        return inspectorUserId;
    }

    public void setInspectorUserId(String inspectorUserId) {
        this.inspectorUserId = inspectorUserId;
    }

    public String getTechConfUserId() {
        return techConfUserId;
    }

    public void setTechConfUserId(String techConfUserId) {
        this.techConfUserId = techConfUserId;
    }

    public String getInsuredMobile() {
        return insuredMobile;
    }

    public void setInsuredMobile(String insuredMobile) {
        this.insuredMobile = insuredMobile;
    }

    public String getGuarBirthCityCode() {
        return guarBirthCityCode;
    }

    public void setGuarBirthCityCode(String guarBirthCityCode) {
        this.guarBirthCityCode = guarBirthCityCode;
    }

    public String getGuarExpCityCode() {
        return guarExpCityCode;
    }

    public void setGuarExpCityCode(String guarExpCityCode) {
        this.guarExpCityCode = guarExpCityCode;
    }

    public String getGuarBirthCityCode2() {
        return guarBirthCityCode2;
    }

    public void setGuarBirthCityCode2(String guarBirthCityCode2) {
        this.guarBirthCityCode2 = guarBirthCityCode2;
    }

    public String getGuarExpCityCode2() {
        return guarExpCityCode2;
    }

    public void setGuarExpCityCode2(String guarExpCityCode2) {
        this.guarExpCityCode2 = guarExpCityCode2;
    }

    public String getReqSerial() {
        return reqSerial;
    }

    public void setReqSerial(String reqSerial) {
        this.reqSerial = reqSerial;
    }

    public String getReqNo() {
        return reqNo;
    }

    public InsuranceRegisteration getInsuranceRegisteration() {
        return insuranceRegisteration;
    }

    public void setInsuranceRegisteration(InsuranceRegisteration insuranceRegisteration) {
        this.insuranceRegisteration = insuranceRegisteration;
    }

    public void setReqNo(String reqNo) {
        this.reqNo = reqNo;
    }

    public Date getReqDate() {
        return reqDate != null ? DateUtils.parse(reqDate, "yyyyMMdd") : null;
    }

    public void setReqDate(Date reqDate) {
        if (reqDate != null) {
            this.reqDate = DateUtils.format(reqDate, "yyyyMMdd");
        }
    }

    public String getInsuranceId() {
        return insuranceId;
    }

    public void setInsuranceId(String insuranceReg) {
        this.insuranceId = insuranceReg;
    }

    public Date getInspDate() {
        return inspDate != null ? DateUtils.parse(inspDate, "yyyyMMdd") : null;

    }

    public void setInspDate(Date inspDate) {
        if (inspDate != null) {
            this.inspDate = DateUtils.format(inspDate, "yyyyMMdd");
        }
    }

    public Date getInspectedDate() {
        return inspectedDate != null ? DateUtils.parse(DateUtils.decodeDateString(inspectedDate), "yyyyMMdd") : null;
    }

    public void setInspectedDate(Date inspectedDate) {
        if (inspectedDate != null) {
            this.inspectedDate = DateUtils.encodeDateString(DateUtils.format(inspectedDate, "yyyyMMdd"));
        }
    }

    public Date getTechConfDate() {
        return techConfDate != null ? DateUtils.parse(DateUtils.decodeDateString(techConfDate), "yyyyMMdd") : null;
    }

    public void setTechConfDate(Date techConfDate) {
        if (techConfDate != null) {
            this.techConfDate = DateUtils.encodeDateString(DateUtils.format(techConfDate, "yyyyMMdd"));
        }
    }

    public Character getStatus() {
        return status;
    }

    public void setStatus(Character status) {
        this.status = status;
    }

    public Character getBrhReqType() {
        return brhReqType;
    }

    public void setBrhReqType(Character brhReqType) {
        this.brhReqType = brhReqType;
    }

    public Character getRequesterType() {
        return requesterType;
    }

    public void setRequesterType(Character requesterType) {
        this.requesterType = requesterType;
    }

    public Character getTechConfStatus() {
        return techConfStatus;
    }

    public void setTechConfStatus(Character techConfStatus) {
        this.techConfStatus = techConfStatus;
    }

    public String getBranchCode() {
        return branchCode;
    }

    public void setBranchCode(String banchCode) {
        this.branchCode = banchCode;
    }

    public Date getIsuDeadDate() {
        return isuDeadDate != null ? DateUtils.parse(isuDeadDate, "yyyyMMdd") : null;
    }

    public void setIsuDeadDate(Date isuDeadDate) {
        if (isuDeadDate != null) {
            this.isuDeadDate = DateUtils.format(isuDeadDate, "yyyyMMdd");
        }
    }

    public Character getCauseAge() {
        return causeAge;
    }

    public void setCauseAge(Character causeAge) {
        this.causeAge = causeAge;
    }

    public Date getBirthDate() {
        return birthDate != null ? DateUtils.parse(birthDate, "yyyyMMdd") : null;
    }

    public void setBirthDate(Date birthDate) {
        if (birthDate != null) {
            this.birthDate = DateUtils.format(birthDate, "yyyyMMdd");
        }
    }

    public Date getGuardianBirthDate() {
        return guardianBirthDate != null ? DateUtils.parse(guardianBirthDate, "yyyyMMdd") : null;
    }

    public void setGuardianBirthDate(Date guardianBirthDate) {
        if (guardianBirthDate != null) {
            this.guardianBirthDate = DateUtils.format(guardianBirthDate, "yyyyMMdd");
        }
    }

    public Date getGuardianBirthDate2() {
        return guardianBirthDate2 != null ? DateUtils.parse(guardianBirthDate2, "yyyyMMdd") : null;
    }

    public void setGuardianBirthDate2(Date guardianBirthDate2) {
        if (guardianBirthDate2 != null) {
            this.guardianBirthDate2 = DateUtils.format(guardianBirthDate2, "yyyyMMdd");
        }
    }

    public Date getCreateDate() {
        return createDate != null ? DateUtils.parse(DateUtils.decodeDateString(createDate), "yyyyMMdd") : null;
    }

    public void setCreateDate(Date createDate) {
        if (createDate != null) {
            this.createDate = DateUtils.encodeDateString(DateUtils.format(createDate, "yyyyMMdd"));
        }
    }

    public Character getReasonFanni() {
        return reasonFanni;
    }

    public void setReasonFanni(Character reasonFanni) {
        this.reasonFanni = reasonFanni;
    }

    public Character getGuardianType() {
        return guardianType;
    }

    public void setGuardianType(Character guardianType) {
        this.guardianType = guardianType;
    }

    public Character getRequestType() {
        return requestType;
    }

    public void setRequestType(Character requestType) {
        this.requestType = requestType;
    }

    public Character getHaveMedicalDoc() {
        return haveMedicalDoc;
    }

    public void setHaveMedicalDoc(Character haveMedicalDoc) {
        this.haveMedicalDoc = haveMedicalDoc;
    }

    public String getPensionNo() {
        return pensionNo;
    }

    public void setPensionNo(String pensionNo) {
        this.pensionNo = pensionNo;
    }

    public String getNationalCode() {
        return nationalCode;
    }

    public void setNationalCode(String nationalCode) {
        this.nationalCode = nationalCode;
    }

    public String getGuardianNationalCode() {
        return guardianNationalCode;
    }

    public void setGuardianNationalCode(String guardianNationalCode) {
        this.guardianNationalCode = guardianNationalCode;
    }

    public String getGuardianNationalCode2() {
        return guardianNationalCode2;
    }

    public void setGuardianNationalCode2(String guardianNationalCode2) {
        this.guardianNationalCode2 = guardianNationalCode2;
    }

    public String getIdNo() {
        return idNo;
    }

    public void setIdNo(String idNo) {
        this.idNo = idNo;
    }

    public String getLastName() {
        return lastName;
    }

    public void setLastName(String lastName) {
        this.lastName = lastName;
    }

    public String getDoctorName() {
        return doctorName;
    }

    public void setDoctorName(String doctorName) {
        this.doctorName = doctorName;
    }

    public String getFirstName() {
        return firstName;
    }

    public void setFirstName(String firstName) {
        this.firstName = firstName;
    }

    public String getGuardianFullName() {
        return guardianFullName;
    }

    public void setGuardianFullName(String guardianFullName) {
        this.guardianFullName = guardianFullName;
    }

    public String getGuardianFullName2() {
        return guardianFullName2;
    }

    public void setGuardianFullName2(String guardianFullName2) {
        this.guardianFullName2 = guardianFullName2;
    }

    public String getSubIsuAddress() {
        return subIsuAddress;
    }

    public void setSubIsuAddress(String subIsuAddress) {
        this.subIsuAddress = subIsuAddress;
    }

    public String getDoctorCode() {
        return doctorCode;
    }

    public void setDoctorCode(String doctorCode) {
        this.doctorCode = doctorCode;
    }

    public String getBranchRequester() {
        return branchRequester;
    }

    public void setBranchRequester(String branchRequester) {
        this.branchRequester = branchRequester;
    }

    public String getBranchInspLetterNo() {
        return branchInspLetterNo;
    }

    public String getTechConfDesc() {
        return techConfDesc;
    }

    public void setTechConfDesc(String techConfDesc) {
        this.techConfDesc = techConfDesc;
    }

    public void setBranchInspLetterNo(String branchInspLetterNo) {
        this.branchInspLetterNo = branchInspLetterNo;
    }

    public Date getBranchInspLetterDate() {
        return branchInspLetterDate != null ? DateUtils.parse(branchInspLetterDate, "yyyyMMdd") : null;
    }

    public void setBranchInspLetterDate(Date branchInspLetterDate) {
        if (branchInspLetterDate != null) {
            this.branchInspLetterDate = DateUtils.format(branchInspLetterDate, "yyyyMMdd");
        }
    }

    public String getBranchResponder() {
        return branchResponder;
    }

    public void setBranchResponder(String branchResponder) {
        this.branchResponder = branchResponder;
    }

    public String getBranchInspRespLetterNo() {
        return branchInspRespLetterNo;
    }

    public void setBranchInspRespLetterNo(String branchInspRespLetterNo) {
        this.branchInspRespLetterNo = branchInspRespLetterNo;
    }

    public Date getBranchInspRespLetterDate() {
        return branchInspRespLetterDate != null ? DateUtils.parse(branchInspRespLetterDate, "yyyyMMdd") : null;

    }

    public void setBranchInspRespLetterDate(Date branchInspRespLetterDate) {
        if (branchInspRespLetterDate != null) {
            this.branchInspRespLetterDate = DateUtils.format(branchInspRespLetterDate, "yyyyMMdd");
        }
    }

    public Character getBranchInspResponse() {
        return branchInspResponse;
    }

    public void setBranchInspResponse(Character branchInspResponse) {
        this.branchInspResponse = branchInspResponse;
    }

    public String getBranchInspLet() {
        return branchInspLet;
    }

    public void setBranchInspLet(String branchInspLet) {
        this.branchInspLet = branchInspLet;
    }

    public String getActionType() {
        return actionType;
    }

    public void setActionType(String actionType) {
        this.actionType = actionType;
    }

    public Character getInspectorConfirm() {
        return inspectorConfirm;
    }

    public void setInspectorConfirm(Character inspectorConfirm) {
        this.inspectorConfirm = inspectorConfirm;
    }

    public String getInspectorName() {
        return inspectorName;
    }

    public void setInspectorName(String inspectorName) {
        this.inspectorName = inspectorName;
    }

    public String getInspectorNote() {
        return inspectorNote;
    }

    public void setInspectorNote(String inspectorNote) {
        this.inspectorNote = inspectorNote;
    }

    public String getBrhIntRoleLetterNo() {
        return brhIntRoleLetterNo;
    }

    public void setBrhIntRoleLetterNo(String introLetterNo) {
        this.brhIntRoleLetterNo = introLetterNo;
    }

    public Character getCommitteeConfirm() {
        return committeeConfirm;
    }

    public void setCommitteeConfirm(Character committeeConfirm) {
        this.committeeConfirm = committeeConfirm;
    }

    public Date getBrhIntRoleDate() {
        return brhIntRoleDate != null ? DateUtils.parse(brhIntRoleDate, "yyyyMMdd") : null;
    }

    public void setBrhIntRoleDate(Date brhIntRoleDate) {
        if (brhIntRoleDate != null) {
            this.brhIntRoleDate = DateUtils.format(brhIntRoleDate, "yyyyMMdd");
        }
    }

    public Date getEditDate() {
        return editDate != null ? DateUtils.parse(DateUtils.decodeDateString(editDate), "yyyyMMdd") : null;
    }

    public void setEditDate(Date editDate) {
        if (editDate != null) {
            this.editDate = DateUtils.encodeDateString(DateUtils.format(editDate, "yyyyMMdd"));
        }
    }

    public Character getProvResponse() {
        return provResponse;
    }

    public void setProvResponse(Character provResponse) {
        this.provResponse = provResponse;
    }

    public String getProvResponseRegLetterNo() {
        return provResponseRegLetterNo;
    }

    public void setProvResponseRegLetterNo(String provResponseRegLetterNo) {
        this.provResponseRegLetterNo = provResponseRegLetterNo;
    }

    public Date getProvResponseRegLetterDate() {
        return provResponseRegLetterDate != null ? DateUtils.parse(provResponseRegLetterDate, "yyyyMMdd") : null;
    }

    public void setProvResponseRegLetterDate(Date provResponseRegLetterDate) {
        if (provResponseRegLetterDate != null) {
            this.provResponseRegLetterDate = DateUtils.format(provResponseRegLetterDate, "yyyyMMdd");
        }
    }

    public String getProvResponseLetterNo() {
        return provResponseLetterNo;
    }

    public void setProvResponseLetterNo(String provResponseLetterNo) {
        this.provResponseLetterNo = provResponseLetterNo;
    }

    public Date getProvResponseLetterDate() {
        return provResponseLetterDate != null ? DateUtils.parse(provResponseLetterDate, "yyyyMMdd") : null;
    }

    public void setProvResponseLetterDate(Date provResponseLetterDate) {
        if (provResponseLetterDate != null) {
            this.provResponseLetterDate = DateUtils.format(provResponseLetterDate, "yyyyMMdd");
        }
    }

    public String geteRequestId() {
        return eRequestId;
    }

    public void seteRequestId(String eRequestId) {
        this.eRequestId = eRequestId;
    }

    public String getCreateUserId() {
        return createUserId;
    }

    public void setCreateUserId(String createUserId) {
        this.createUserId = createUserId;
    }

    public String getEditUserId() {
        return editUserId;
    }

    public void setEditUserId(String editUserId) {
        this.editUserId = editUserId;
    }

    public Date getCommitteeConfirmOpDate() {
        return committeeConfirmOpDate != null ? DateUtils.parse(DateUtils.decodeDateString(committeeConfirmOpDate), "yyyyMMdd") : null;
    }

    public void setCommitteeConfirmOpDate(Date committeeConfirmOpDate) {
        if (committeeConfirmOpDate != null) {
            this.committeeConfirmOpDate = DateUtils.encodeDateString(DateUtils.format(committeeConfirmOpDate, "yyyyMMdd"));
        }
    }

    public String getCommitteeConfirmUserId() {
        return committeeConfirmUserId;
    }

    public void setCommitteeConfirmUserId(String committeeConfirmUserId) {
        this.committeeConfirmUserId = committeeConfirmUserId;
    }

    public String getTechnicalFullName() {
        return technicalFullName;
    }

    public void setTechnicalFullName(String technicalFullName) {
        this.technicalFullName = technicalFullName;
    }

    public String getProvinceFullName() {
        return provinceFullName;
    }

    public void setProvinceFullName(String provinceFullName) {
        this.provinceFullName = provinceFullName;
    }

    public String getForeignCode() {
        return foreignCode;
    }

    public void setForeignCode(String foreignCode) {
        this.foreignCode = foreignCode;
    }

    public String getGuardianForeignCode() {
        return guardianForeignCode;
    }

    public void setGuardianForeignCode(String guardianForeignCode) {
        this.guardianForeignCode = guardianForeignCode;
    }

    public String getGuardianForeignCode2() {
        return guardianForeignCode2;
    }

    public void setGuardianForeignCode2(String guardianForeignCode2) {
        this.guardianForeignCode2 = guardianForeignCode2;
    }
    
    

//    public Integer getFlagBrch() {
//        return flagBrch;
//    }
//
//    public void setFlagBrch(Integer flagBrch) {
//        this.flagBrch = flagBrch;
//    }
    @Override
    public String getIdentifierInstance() {
        return reqSerial;
    }
}
