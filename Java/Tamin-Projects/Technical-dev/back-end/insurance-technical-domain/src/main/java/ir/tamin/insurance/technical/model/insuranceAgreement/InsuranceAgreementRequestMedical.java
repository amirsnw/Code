package ir.tamin.insurance.technical.model.insuranceAgreement;

import ir.tamin.framework.core.util.DateUtils;
import ir.tamin.framework.domain.AbstractEntity;
import ir.tamin.framework.ws.rest.repository.annotation.RESTResource;
import ir.tamin.framework.ws.rest.repository.annotation.ResourceId;
import ir.tamin.framework.ws.rest.repository.annotation.ResourceIds;

import javax.persistence.*;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Pattern;
import javax.validation.constraints.Size;
import java.util.Date;

//import ir.tamin.insurance.technical.model.primaryKeyClass.AgreementMedicalPK;

@Entity
@Table(name = "Insured_MEDICALRSLT")
//@IdClass(AgreementMedicalPK.class)
//@RESTResource(lookupProxy = "")
//@ResourceIds({
//    @ResourceId(fields = {"medicalRequestId", "nationalCode", "requestId"})})
//public class InsuranceAgreementRequestMedical extends AbstractEntity<AgreementMedicalPK> {

@ResourceIds({
        @ResourceId(fields = {"medicalRequestId"})})
@RESTResource(lookupProxy = "ir.tamin.insurance.technical.business.insuranceAgreement.InsuranceAgreementRequestMedicalManager")
public class InsuranceAgreementRequestMedical extends AbstractEntity<String> {
    //شماره
    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @Column(name = "MED_MEDICALRSLTNO", length = 13, nullable = false)
    private String medicalRequestId;

    //کد ملي
    //@Id
    @Pattern(regexp = "[0-9]*")
    @Size(min = 10, max = 10)
    @Column(name = "RISUNATCODE", length = 10)
    private String nationalCode;

    //شماره قرارداد
//    @Id
//    @ManyToOne
//    @JoinColumn(name = "REQUESTID")
//    private InsuranceAgreementRequest insuranceAgreementRequest;

    //@Id
    @OneToOne
    @JoinColumns({
            @JoinColumn(name = "REQUESTID", referencedColumnName = "REQUESTID", nullable = true),
    })
    private InsuranceAgreementRequest insuranceAgreementRequest;


    //شماره بيمه
    @NotNull
    @Pattern(regexp = "[0-9]*")
    @Size(min = 10, max = 10)
    @Column(name = "RISUID", length = 10)
    private String insuranceId;

    //شماره نامه درمان
    @Pattern(regexp = "[0-9]*")
    @Size(min = 0, max = 20)
    @Column(name = "MED_NO", length = 20)
    private String medicalLetterNumber;

    //تاريخ نامه درمان
    @Pattern(regexp = "[0-9]*")
    @Size(min = 0, max = 8)
    @Column(name = "MED_DATE", length = 8)
    private String medicalLetterDate;

    //توضيحات نتيجه معاينات پزشکي
    @Column(name = "MED_RESULT", length = 4000)
    private String medicalResultDesc;

    //	وضعيت از کارافتادگي  1  سالم  2 ازکارافتاده کلي ميباشد 3 ازکار افتاده کلي نميباشد 4 نياز به طول درمان
    @Pattern(regexp = "[0-9]*")
    @Size(min = 0, max = 1)
    @Column(name = "MED_RISUSTAT", length = 1)
    private String medicalResultStatusCode;

    //	تاريخ ايجاد
    @Size(min = 0, max = 6)
    @Column(name = "CREATEDT", length = 6)
    private String createDate;

    //کد تصوير نتيجه معاينات
    @Size(min = 0, max = 36)
    @Column(name = "MED_GUID", length = 36)
    private String medicalImageId;

    //شرح تصوير
    @Column(name = "MED_GUNAME", length = 4000)
    private String medicaliImageDesc;

    //تعداد ماه طول درمان
    @Size(min = 0, max = 2)
    @Column(name = "MED_TREATDUR", length = 2)
    private String medicalTreatmentMonths;

    //تعداد روز طول درمان
    @Size(min = 0, max = 3)
    @Column(name = "MED_TREATDURDAY", length = 3)
    private String medicalTreatmentDays;

    //تصوير نتيجه معاينات
    @Column(name = "MED_RESULTPIC")
    @Lob
    private byte[] medicalResultImage;

    //فيلد ارسال پيامک
    @Size(min = 0, max = 1)
    @Column(name = "MED_SENDSMS", length = 1)
    private String medicalSendMessage;

    @Transient
    private String createDateString;

    public String getMedicalRequestId() {
        return medicalRequestId;
    }

    public void setMedicalRequestId(String medicalRequestId) {
        this.medicalRequestId = medicalRequestId;
    }

    public String getNationalCode() {
        return nationalCode;
    }

    public void setNationalCode(String nationalCode) {
        this.nationalCode = nationalCode;
    }

    public InsuranceAgreementRequest getInsuranceAgreementRequest() {
        return insuranceAgreementRequest;
    }

    public void setInsuranceAgreementRequest(InsuranceAgreementRequest insuranceAgreementRequest) {
        this.insuranceAgreementRequest = insuranceAgreementRequest;
    }

    public String getInsuranceId() {
        return insuranceId;
    }

    public void setInsuranceId(String insuranceId) {
        this.insuranceId = insuranceId;
    }

    public String getMedicalLetterNumber() {
        return medicalLetterNumber;
    }

    public void setMedicalLetterNumber(String medicalLetterNumber) {
        this.medicalLetterNumber = medicalLetterNumber;
    }

    public Date getMedicalLetterDate() {
        if (this.medicalLetterDate != null) {
            return DateUtils.parse(this.medicalLetterDate, "yyyyMMdd");
        } else {
            return null;
        }
    }

    public void setMedicalLetterDate(Date medicalLetterDate) {
        if (medicalLetterDate != null) {
            this.medicalLetterDate = DateUtils.format(medicalLetterDate, "yyyyMMdd");
        } else {
            this.medicalLetterDate = null;
        }
    }

    public String getMedicalResultDesc() {
        return medicalResultDesc;
    }

    public void setMedicalResultDesc(String medicalResultDesc) {
        this.medicalResultDesc = medicalResultDesc;
    }

    public String getMedicalResultStatusCode() {
        return medicalResultStatusCode;
    }

    public void setMedicalResultStatusCode(String medicalResultStatusCode) {
        this.medicalResultStatusCode = medicalResultStatusCode;
    }

    public Date getCreateDateString() {
        if (createDate != null) {
            return DateUtils.parse(DateUtils.decodeDateString(createDate), "yyyyMMdd");
        } else {
            return null;
        }
    }

    public void setCreateDateString(String createDateString) {
        this.createDateString = createDateString;
    }

    public String getMedicalImageId() {
        return medicalImageId;
    }

    public void setMedicalImageId(String medicalImageId) {
        this.medicalImageId = medicalImageId;
    }

    public String getMedicaliImageDesc() {
        return medicaliImageDesc;
    }

    public void setMedicaliImageDesc(String medicaliImageDesc) {
        this.medicaliImageDesc = medicaliImageDesc;
    }

    public String getMedicalTreatmentMonths() {
        return medicalTreatmentMonths;
    }

    public void setMedicalTreatmentMonths(String medicalTreatmentMonths) {
        this.medicalTreatmentMonths = medicalTreatmentMonths;
    }

    public String getMedicalTreatmentDays() {
        return medicalTreatmentDays;
    }

    public void setMedicalTreatmentDays(String medicalTreatmentDays) {
        this.medicalTreatmentDays = medicalTreatmentDays;
    }

    public byte[] getMedicalResultImage() {
        return medicalResultImage;
    }

    public void setMedicalResultImage(byte[] medicalResultImage) {
        this.medicalResultImage = medicalResultImage;
    }

    public String getMedicalSendMessage() {
        return medicalSendMessage;
    }

    public void setMedicalSendMessage(String medicalSendMessage) {
        this.medicalSendMessage = medicalSendMessage;
    }


    //    @Override
//    public AgreementMedicalPK getIdentifierInstance() {
//        return new AgreementMedicalPK(medicalRequestId, nationalCode, insuranceAgreementRequest.getRequestId());
//    }
    @Override
    public String getIdentifierInstance() {
        return  medicalRequestId;
    }


}
