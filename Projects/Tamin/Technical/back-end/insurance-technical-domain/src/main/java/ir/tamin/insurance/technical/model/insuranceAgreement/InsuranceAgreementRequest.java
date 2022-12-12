package ir.tamin.insurance.technical.model.insuranceAgreement;

import com.fasterxml.jackson.annotation.JsonIdentityInfo;
import com.fasterxml.jackson.annotation.ObjectIdGenerators;
import ir.tamin.framework.core.util.DateUtils;
import ir.tamin.framework.domain.AbstractEntity;
import ir.tamin.framework.ws.rest.repository.annotation.RESTResource;
import ir.tamin.framework.ws.rest.repository.annotation.ResourceId;
import ir.tamin.framework.ws.rest.repository.annotation.ResourceIds;
import ir.tamin.insurance.baseinfo.model.Branch;
import ir.tamin.insurance.technical.model.baseinfo.InsuranceStatus;
import ir.tamin.insurance.technical.model.baseinfo.InsuranceType;
import ir.tamin.insurance.technical.model.insurance.InsuranceRegisteration;
import ir.tamin.insurance.technical.model.workshop.Workshop;

import javax.persistence.*;
import javax.validation.constraints.Pattern;
import javax.validation.constraints.Size;
import java.math.BigDecimal;
import java.util.Date;
import java.util.List;

@Entity
@Table(name = "INSURED_REQUESTS_LIST", schema = "techins")
@RESTResource(lookupProxy = "ir.tamin.insurance.technical.business.insuranceAgreement.InsuranceAgreementRequestManager")
@ResourceIds({
        @ResourceId(fields = {"requestId"})})
@NamedQueries({
        @NamedQuery(name = "InsuranceAgreementRequest.getByNationalCode", query = "select i from InsuranceAgreementRequest i  where  i.nationalCode=:nationalCode and i.status in ('0' ,'1')"),
        @NamedQuery(name = "InsuranceAgreementRequest.getByRequestId", query = "select i from InsuranceAgreementRequest i  where  i.requestId=:requestId ")
})
@JsonIdentityInfo(generator = ObjectIdGenerators.PropertyGenerator.class, property = "requestId")
public class InsuranceAgreementRequest extends AbstractEntity<String> {

    //شناسه درخواست
    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @Column(name = "REQUESTID", length = 20, nullable = false)
    private String requestId;

    //کد ملي
    @Pattern(regexp = "[0-9]*")
    @Size(min = 10, max = 10)
    @Column(name = "NATCODE", length = 10)
    private String nationalCode;

    //شماره بيمه
    @Pattern(regexp = "[0-9]*")
    @Size(min = 10, max = 10)
    @Column(name = "RISUID", length = 10)
    private String insuranceId;

    @ManyToOne
    @JoinColumns({
            @JoinColumn(name = "RISUID", referencedColumnName = "RISUID", updatable = false, insertable = false),
            @JoinColumn(name = "BRCHCODE", referencedColumnName = "BRCH_CODE", updatable = false, insertable = false)
    })
    private InsuranceRegisteration person;

    //کد کارگاه
//    @Pattern(regexp = "[0-9]*")
//    @Size(min = 10, max = 10)
//    @Column(name = "RWSHID", length = 10)
//    private String workshopCode;
    @ManyToOne(cascade = {CascadeType.REFRESH, CascadeType.DETACH})
    @JoinColumns({
            @JoinColumn(name = "RWSHID", referencedColumnName = "RWSHID", nullable = false),
            @JoinColumn(name = "BRCHCODE", referencedColumnName = "BRCH_CODE", nullable = false, insertable = false, updatable = false)})
    private Workshop workshop;

    //جنسيت 1=مرد 2= زن
    @Pattern(regexp = "[0-9]*")
    @Size(max = 2)
    @Column(name = "GENDER", length = 2)
    private String gender;

    //کد نوع بيمه
//    @Pattern(regexp = "[0-9]*")
//    @Size(min = 2, max = 2)
//    @Column(name = "ISUTYPECODE", length = 2)
//    private String isuTypeCode;  0010570639
    @ManyToOne
    @JoinColumn(name = "ISUTYPECODE", referencedColumnName = "ISUTYPECODE")
    private InsuranceType insuranceType;

    //وضعیت بیمه
    @ManyToOne
    @JoinColumn(name = "ISUSTATCODE", referencedColumnName = "ISUSTATCODE")
    private InsuranceStatus insuranceStatus;

    //شماره درخواست
    @Column(name = "REQUEST_NO", length = 20)
    private String requestNumber;

    //تاريخ درخواست
//    @Temporal(TemporalType.TIMESTAMP)
    @Column(name = "REQUEST_DATE")
    private String requestDate;
//    private Date requestDate;

    //شماره معرفينامه
    @Column(name = "INTRODUCTION_LETTER_NO", length = 20)
    private String introductionLetterNumber;

    //تاريخ معرفينامه
//    @Temporal(TemporalType.TIMESTAMP)
    @Column(name = "INTRODUCTION_LETTER_DATE")
    private String introductionLetterDate;
//    private Date introductionLetterDate;

    //نوع دسته بندی بیمه
    @ManyToOne
    @JoinColumn(name = "CATEGORY_TYPE_CODE", referencedColumnName = "CATEGORY_TYPE_CODE")
    private CategoryType categoryType;

    //کد نوع بيمه در صورت بيمه شده خاص بودن
    @Column(name = "SELFISUTYPECODE", length = 2)
    private String selfIsuTypeCode;

    //	کد نوع بيمه در صورت عضو گروههاي توافقي بودن
//    @Column(name = "SSUP_AGREEMENT_CATEID", length = 6)
//    private String agreementCategoryId;
    @ManyToOne
    @JoinColumn(name = "SSUP_AGREEMENT_CATEID", referencedColumnName = "SSUP_AGREEMENT_CATEID")
    private AgreementCategoryType agreementCategoryType;

    // کد نوع بيمه در صورت عضو گروههاي خاص بيمه ايي بودن
//    @Column(name = "SPECIAL_GROUP_TYPE", length = 2)
//    private String specialGroupType;
    @ManyToOne
    @JoinColumn(name = "SPECIAL_GROUPS_CODE", referencedColumnName = "SPECIAL_GROUPS_CODE")
    private SpecialGroupType specialGroupType;

    //دستمزد
    @Column(name = "WAGE")
    private Long wage;

    //سال سن بيمه شده در زمان درخواست
    @Column(name = "AGE_YEAR", length = 2)
    private Long ageYear;

    //	ماه سن بيمه شده در زمان درخواست
    @Column(name = "AGE_MONTH", length = 2)
    private Long ageMonth;

    //روز سن بيمه شده در زمان درخواست
    @Column(name = "AGE_DAY", length = 2)
    private Long ageDay;

    //سابقه بيمه پردازي بر اساس روز در زمان درخواست
    @Column(name = "HISTORY_IN_DAY", length = 5)
    private Long historyDay;

    //درصد نرخ حق بيمه
    @Column(name = "INSURE_RATE")
    private BigDecimal insuranceRate;
    //N	NUMBER(4,1)	Y

    //کد شعبه بيمه پردازي
    //@Column(name = "BRCHCODE", length = 4)
    //private String branchCode;
    @OneToOne(cascade = {CascadeType.REFRESH, CascadeType.DETACH})
    @JoinColumn(name = "BRCHCODE", referencedColumnName = "BRHCODE")
    private Branch branch;

    //کد کاربر ايجاد کننده
    @Column(name = "CREATE_UID", length = 20)
    private String createUserId;

    //تاريخ ثبت توسط کاربر
    @Column(name = "CREATE_DATE", length = 7)
    private String createDate;

    //کد کاربر تاييد کننده
    @Column(name = "CONFIRM_UID", length = 20)
    private String confirmUserId;

    //تاريخ تاييد توسط کاربر
    @Column(name = "CONFIRM_DATE", length = 7)
    private String confirmDate;

    //وضعيت
    @Column(name = "STATUS", length = 2)
    private String status;

    //0-convert  1- ijad shode/ersal nashode  2 - ersal shode
    @Column(name = "FLAG", length = 2)
    private String flag;

    @Transient
    private String createDateString;

    @OneToMany(mappedBy = "insuranceAgreementRequest", cascade = CascadeType.ALL)
    private List<InsuranceAgreementRequestDetail> insuranceAgreementRequestDetailList;

    @OneToOne(mappedBy = "insuranceAgreementRequest", cascade = CascadeType.ALL)
    private InsuranceAgreementRequestMedical insuranceAgreementRequestMedical;

    public Date getCreateDateString() {
        if (createDate != null) {
            return DateUtils.parse(DateUtils.decodeDateString(createDate), "yyyyMMdd");
        } else {
            return null;
        }
    }

    public InsuranceAgreementRequestMedical getInsuranceAgreementRequestMedical() {
        return insuranceAgreementRequestMedical;
    }

    public void setInsuranceAgreementRequestMedical(InsuranceAgreementRequestMedical insuranceAgreementRequestMedical) {
        this.insuranceAgreementRequestMedical = insuranceAgreementRequestMedical;
    }

    public void setCreateDateString(String createDateString) {
        this.createDateString = createDateString;
    }

    public List<InsuranceAgreementRequestDetail> getInsuranceAgreementRequestDetailList() {
        return insuranceAgreementRequestDetailList;
    }

    public void setInsuranceAgreementRequestDetailList(List<InsuranceAgreementRequestDetail> insuranceAgreementRequestDetailList) {
        this.insuranceAgreementRequestDetailList = insuranceAgreementRequestDetailList;
    }

    public InsuranceStatus getInsuranceStatus() {
        return insuranceStatus;
    }

    public void setInsuranceStatus(InsuranceStatus insuranceStatus) {
        this.insuranceStatus = insuranceStatus;
    }

    public String getRequestId() {
        return requestId;
    }

    public void setRequestId(String requestId) {
        this.requestId = requestId;
    }

    public String getNationalCode() {
        return nationalCode;
    }

    public void setNationalCode(String nationalCode) {
        this.nationalCode = nationalCode;
    }

    public String getInsuranceId() {
        return insuranceId;
    }

    public void setInsuranceId(String insuranceId) {
        this.insuranceId = insuranceId;
    }

    public Workshop getWorkshop() {
        return workshop;
    }

    public void setWorkshop(Workshop workshop) {
        this.workshop = workshop;
    }

    public String getGender() {
        return gender;
    }

    public void setGender(String gender) {
        this.gender = gender;
    }

    public String getRequestNumber() {
        return requestNumber;
    }

    public void setRequestNumber(String requestNumber) {
        this.requestNumber = requestNumber;
    }

    public String getIntroductionLetterNumber() {
        return introductionLetterNumber;
    }

    public void setIntroductionLetterNumber(String introductionLetterNumber) {
        this.introductionLetterNumber = introductionLetterNumber;
    }

    public Date getRequestDate() {
        if (this.requestDate != null) {
            return DateUtils.parse(this.requestDate, "yyyyMMdd");
        } else {
            return null;
        }
    }

    public void setRequestDate(Date requestDate) {
        if (requestDate != null) {
            this.requestDate = DateUtils.format(requestDate, "yyyyMMdd");
        } else {
            this.requestDate = null;
        }
    }
    public Date getIntroductionLetterDate() {
        if (this.introductionLetterDate != null) {
            return DateUtils.parse(this.introductionLetterDate, "yyyyMMdd");
        } else {
            return null;
        }
    }

    public void setIntroductionLetterDate(Date introductionLetterDate) {
        if (introductionLetterDate != null) {
            this.introductionLetterDate = DateUtils.format(introductionLetterDate, "yyyyMMdd");
        } else {
            this.introductionLetterDate = null;
        }
    }

    public CategoryType getCategoryType() {
        return categoryType;
    }

    public void setCategoryType(CategoryType categoryType) {
        this.categoryType = categoryType;
    }

    //    public String getCategoryTypeCode() {
//        return categoryTypeCode;
//    }
//
//    public void setCategoryTypeCode(String categoryTypeCode) {
//        this.categoryTypeCode = categoryTypeCode;
//    }
    public String getSelfIsuTypeCode() {
        return selfIsuTypeCode;
    }

    public void setSelfIsuTypeCode(String selfIsuTypeCode) {
        this.selfIsuTypeCode = selfIsuTypeCode;
    }

    //    public String getAgreementCategoryId() {
//        return agreementCategoryId;
//    }
//
//    public void setAgreementCategoryId(String agreementCategoryId) {
//        this.agreementCategoryId = agreementCategoryId;
//    }
    public AgreementCategoryType getAgreementCategoryType() {
        return agreementCategoryType;
    }

    public void setAgreementCategoryType(AgreementCategoryType agreementCategoryType) {
        this.agreementCategoryType = agreementCategoryType;
    }

    public SpecialGroupType getSpecialGroupType() {
        return specialGroupType;
    }

    public void setSpecialGroupType(SpecialGroupType specialGroupType) {
        this.specialGroupType = specialGroupType;
    }

    public Long getWage() {
        return wage;
    }

    public void setWage(Long wage) {
        this.wage = wage;
    }

    public Long getAgeYear() {
        return ageYear;
    }

    public void setAgeYear(Long ageYear) {
        this.ageYear = ageYear;
    }

    public Long getAgeMonth() {
        return ageMonth;
    }

    public void setAgeMonth(Long ageMonth) {
        this.ageMonth = ageMonth;
    }

    public Long getAgeDay() {
        return ageDay;
    }

    public void setAgeDay(Long ageDay) {
        this.ageDay = ageDay;
    }

    public Long getHistoryDay() {
        return historyDay;
    }

    public void setHistoryDay(Long historyDay) {
        this.historyDay = historyDay;
    }

    public BigDecimal getInsuranceRate() {
        return insuranceRate;
    }

    public void setInsuranceRate(BigDecimal insuranceRate) {
        this.insuranceRate = insuranceRate;
    }

    public Branch getBranch() {
        return branch;
    }

    public void setBranch(Branch branch) {
        this.branch = branch;
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

    public String getConfirmUserId() {
        return confirmUserId;
    }

    public void setConfirmUserId(String confirmUserId) {
        this.confirmUserId = confirmUserId;
    }

    public String getConfirmDate() {
        return confirmDate;
    }

    public void setConfirmDate(String confirmDate) {
        this.confirmDate = confirmDate;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public InsuranceRegisteration getPerson() {
        return person;
    }

    public void setPerson(InsuranceRegisteration person) {
        this.person = person;
    }

    //    public String getIsuTypeCode() {
//        return isuTypeCode;
//    }
//
//    public void setIsuTypeCode(String isuTypeCode) {
//        this.isuTypeCode = isuTypeCode;
//    }
    public InsuranceType getInsuranceType() {
        return insuranceType;
    }

    public void setInsuranceType(InsuranceType insuranceType) {
        this.insuranceType = insuranceType;
    }

    public String getFlag() {
        return flag;
    }

    public void setFlag(String flag) {
        this.flag = flag;
    }

    @Override
    public String getIdentifierInstance() {
        return requestId;
    }

}
