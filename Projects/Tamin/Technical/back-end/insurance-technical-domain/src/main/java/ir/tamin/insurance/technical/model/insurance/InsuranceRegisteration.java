package ir.tamin.insurance.technical.model.insurance;

import ir.tamin.framework.core.util.DateUtils;
import ir.tamin.framework.domain.AbstractEntity;
import ir.tamin.framework.ws.rest.repository.annotation.RESTResource;
import ir.tamin.framework.ws.rest.repository.annotation.ResourceId;
import ir.tamin.framework.ws.rest.repository.annotation.ResourceIds;
import ir.tamin.insurance.technical.model.baseinfo.InsuranceStatus;
import ir.tamin.insurance.technical.model.baseinfo.InsuranceType;
import ir.tamin.insurance.technical.model.primaryKeyClass.RegInsuranceSpecPK;

import javax.persistence.*;
import javax.validation.constraints.Pattern;
import javax.validation.constraints.Size;
import java.util.Date;

/**
 *
 * @author h_poursafar uses by m_goharRiz
 */
@Entity
@Table(name = "CREGISTER.REGINSURANCESPEC")
@RESTResource(lookupProxy = "ir.tamin.insurance.technical.business.baseinfo.InsuranceRegisterationProxy")
@IdClass(RegInsuranceSpecPK.class)
@ResourceIds({
        @ResourceId(fields = {"id", "brchCode"})
})
public class  InsuranceRegisteration extends AbstractEntity<RegInsuranceSpecPK> {

    private static final long serialVersionUID = 1L;

    @Id
    @Size(max = 10)
    @Column(name = "RISUID", length = 10, nullable = false)
    private String id;

    @Id
    @Size(max = 4)
    @Column(name = "BRCH_CODE", length = 4)
    private String brchCode;

    @Size(max = 50)
    @Column(name = "RISULNAME", length = 50, nullable = false)
    private String lastName;

    @Size(max = 50)
    @Column(name = "RISUFNAME", length = 50, nullable = false)
    private String firstName;

    @Size(max = 50)
    @Column(name = "RISUDNAME", length = 50)
    private String fatherName;

//    @ManyToOne
//    @JoinColumn(name = "SEXCODE")
//    private Gender gender;
    @Column(name = "SEXCODE")
    private String gender;

//    @ManyToOne
//    @JoinColumn(name = "NATIONCODE")
//    private Nation nation;
    @Column(name = "NATIONCODE")
    private String nation;

//    @NationalCode
    @Pattern(regexp = "[0-9]*")
    @Size(max = 10)
    @Column(name = "RISUNATCODE", length = 10)
    private String nationalId;

    @Pattern(regexp = "[0-9]*")
    @Size(max = 15)
    @Column(name = "RISUIDNO", length = 15)
    private String idCardNumber;

    @Size(max = 4)
    @Column(name = "RISUIDSERIAL1", length = 4)
    private String idCardSerial1;

    @Size(max = 6)
    @Column(name = "RISUIDSERIAL2", length = 6)
    private String idCardSerial2;

    //@ManyToOne
    @Size(max = 50)
    @Column(name = "RISUIDPLC", length = 50)
    private String cityOfIssue;

    @Size(max = 8)
    @Column(name = "RISUBIRTHDATE", length = 8)
    private String dateOfBirth;

    // @ManyToOne
    @Size(max = 4)
    @Column(name = "BIRTHCITYCODE", length = 4)
    private String cityOfBirth;

    @Transient
    private String cityOfBirthDesc;

    @Size(max = 4)
    @Column(name = "EXPCITYCODE", length = 4)
    private String expCityCode;

    @Size(max = 8)
    @Column(name = "RISUREGDATE", length = 8, nullable = false)
    private String registerDate;

    @Column(name = "RREQNUMBER", length = 8)
    private Long requetNumber;

    @Size(max = 8)
    @Column(name = "CREATEDT", length = 8, nullable = false)
    private String creationTime;

    @Size(max = 20)
    @Column(name = "CREATEUID", length = 20, nullable = false)
    private String createdBy;

    @Size(max = 8)
    @Column(name = "RISUAPPROVDATE", length = 8, nullable = false)
    private String approveDate;

    @Size(max = 2)
    @Column(name = "MASTCUSTTYPE", length = 2, nullable = false)
    private String customerType;

//    @ManyToOne
//    @JoinColumn(name = "RECOGMETHODCODE")
    @Column(name = "RECOGMETHODCODE")
//    private RecognizeMethod recognizeMethod;
    private String recognizeMethod;
    
    
//    @Size(max = 2)
//    @Column(name = "ISUTYPECODE", length = 2)
//    private String isuTypeCode;
    
    @ManyToOne
    @JoinColumn(name = "ISUTYPECODE", referencedColumnName = "ISUTYPECODE", updatable = false, insertable = false)
    private InsuranceType isuType;

//    @Size(max = 2)
//    @Column(name = "ISUSTATCODE", length = 2)
//    private String isuStatCode;
    
    @ManyToOne
    @JoinColumn(name = "ISUSTATCODE", referencedColumnName = "ISUSTATCODE", updatable = false, insertable = false)
    private InsuranceStatus isuStat;

    @Size(max = 1)
    @Column(name = "FLAGTAEED", length = 1)
    private String flagTaeed;

    @Size(max = 1)
    @Column(name = "FLAGPRINT", length = 1)
    private String flagPrint;

    @Size(max = 8)
    @Column(name = "RECOGMETHODDATE", length = 8)
    private String recogMethodDate;

    @Size(max = 1)
    @Column(name = "FINALTAEED", length = 1)
    private String finalTaeed;

    @Size(max = 1)
    @Column(name = "FLAGSABT2", length = 1)
    private String flagSabt2;

    @Size(max = 1)
    @Column(name = "FLAGTAEED2", length = 1)
    private String flagTaeed2;

    @Size(max = 1)
    @Column(name = "FLAGNOTAEED2", length = 1)
    private String flagNoTaeed2;

    @Size(max = 10)
    @Column(name = "FISUID", length = 10)
    private String fisuId;

    @Pattern(regexp = "[0-9]*")
    @Size(max = 10)
    @Column(name = "SSN", length = 10)
    private String ssn;


    @Size(max = 1)
    @Column(name = "NATCIN", length = 1)
    private String natcin;

    @Transient
    private String brchName;

    @Transient
    private Date doB;
    
    @Transient
    private String ageDays;

    public String getAgeDays() {
        return ageDays;
    }

    public void setAgeDays(String ageDays) {
        this.ageDays = ageDays;
    } 

    public String getBrchName() {
        return brchName;
    }

    public void setBrchName(String brchName) {
        this.brchName = brchName;
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getLastName() {
        return lastName;
    }

    public void setLastName(String lastName) {
        this.lastName = lastName;
    }

    public String getFirstName() {
        return firstName;
    }

    public void setFirstName(String firstName) {
        this.firstName = firstName;
    }

    public String getFullName() {
        return firstName + " " + lastName;
    }

    public String getFatherName() {
        return fatherName;
    }

    public void setFatherName(String fatherName) {
        this.fatherName = fatherName;
    }

    public String getNationalId() {
        return nationalId;
    }

    public void setNationalId(String nationalId) {
        this.nationalId = nationalId;
    }

    public String getIdCardNumber() {
        return idCardNumber;
    }

    public void setIdCardNumber(String idCardNumber) {
        this.idCardNumber = idCardNumber;
    }

    public String getIdCardSerial1() {
        return idCardSerial1;
    }

    public void setIdCardSerial1(String idCardSerial1) {
        this.idCardSerial1 = idCardSerial1;
    }

    public String getIdCardSerial2() {
        return idCardSerial2;
    }

    public void setIdCardSerial2(String idCardSerial2) {
        this.idCardSerial2 = idCardSerial2;
    }

    public String getCityOfIssue() {
        return cityOfIssue;
    }

    public void setCityOfIssue(String cityOfIssue) {
        this.cityOfIssue = cityOfIssue;
    }

    public String getDateOfBirth() {
        return dateOfBirth;
    }

    public void setDateOfBirth(String dateOfBirth) {
        this.dateOfBirth = dateOfBirth;
    }

//    public Date getDateOfBirth() {
//        if (dateOfBirth != null) {
//            return DateUtils.parse(dateOfBirth, "yyyyMMdd");
//        } else {
//            return null;
//        }
//    }
//
//    public void setDateOfBirth(Date dateOfBirth) {
//        if (dateOfBirth != null) {
//            this.dateOfBirth = DateUtils.format(dateOfBirth, "yyyyMMdd");
//        } else {
//            this.dateOfBirth = null;
//        }
//    }
    public String getCityOfBirth() {
        return cityOfBirth;
    }

    public void setCityOfBirth(String cityOfBirth) {
        this.cityOfBirth = cityOfBirth;
    }

    public String getExpCityCode() {
        return expCityCode;
    }

    public void setExpCityCode(String expCityCode) {
        this.expCityCode = expCityCode;
    }

    public String getRegisterDate() {
        return registerDate;
    }

    public void setRegisterDate(String registerDate) {
        this.registerDate = registerDate;
    }

    public Long getRequetNumber() {
        return requetNumber;
    }

    public void setRequetNumber(Long requetNumber) {
        this.requetNumber = requetNumber;
    }

    public Date getCreationTime() {
        if (creationTime != null)
            return DateUtils.parse(DateUtils.decodeDateString(creationTime), "yyyyMMdd");
        return null;
    }

    public void setCreationTime(Date creationTime) {
        if (creationTime == null)
            return;
        this.creationTime = DateUtils.encodeDateString(DateUtils.format(creationTime, "yyyyMMdd"));

    }

    public String getCreatedBy() {
        return createdBy;
    }

    public void setCreatedBy(String createdBy) {
        this.createdBy = createdBy;
    }

    public String getApproveDate() {
        return approveDate;
    }

    public void setApproveDate(String approveDate) {
        this.approveDate = approveDate;
    }

    public String getCustomerType() {
        return customerType;
    }

    public void setCustomerType(String customerType) {
        this.customerType = customerType;
    }

//    public String getIsuTypeCode() {
//        return isuTypeCode;
//    }
//
//    public void setIsuTypeCode(String isuTypeCode) {
//        this.isuTypeCode = isuTypeCode;
//    }
//
//    public String getIsuStatCode() {
//        return isuStatCode;
//    }
//
//    public void setIsuStatCode(String isuStatCode) {
//        this.isuStatCode = isuStatCode;
//    }

    public InsuranceType getIsuType() {
        return isuType;
    }

    public void setIsuType(InsuranceType isuType) {
        this.isuType = isuType;
    }

    public InsuranceStatus getIsuStat() {
        return isuStat;
    }

    public void setIsuStat(InsuranceStatus isuStat) {
        this.isuStat = isuStat;
    }    

    public String getFlagTaeed() {
        return flagTaeed;
    }

    public void setFlagTaeed(String flagTaeed) {
        this.flagTaeed = flagTaeed;
    }

    public String getFlagPrint() {
        return flagPrint;
    }

    public void setFlagPrint(String flagPrint) {
        this.flagPrint = flagPrint;
    }

    public Date getRecogMethodDate() {
        if (recogMethodDate != null)
            return DateUtils.parse(DateUtils.decodeDateString(recogMethodDate), "yyyyMMdd");//DateUtils.decodeDateString(recogMethodDate).substring(0, 8);
        return null;
    }

    public void setRecogMethodDate(Date recogMethodDate) {
        if (recogMethodDate == null)
            return;
        //this.recogMethodDate = DateUtils.encodeDateString(recogMethodDate);
        this.recogMethodDate = DateUtils.encodeDateString(DateUtils.format(recogMethodDate, "yyyyMMdd"));
    }

    public String getFinalTaeed() {
        return finalTaeed;
    }

    public void setFinalTaeed(String finalTaeed) {
        this.finalTaeed = finalTaeed;
    }

    public String getFlagSabt2() {
        return flagSabt2;
    }

    public void setFlagSabt2(String flagSabt2) {
        this.flagSabt2 = flagSabt2;
    }

    public String getFlagTaeed2() {
        return flagTaeed2;
    }

    public void setFlagTaeed2(String flagTaeed2) {
        this.flagTaeed2 = flagTaeed2;
    }

    public String getFlagNoTaeed2() {
        return flagNoTaeed2;
    }

    public void setFlagNoTaeed2(String flagNoTaeed2) {
        this.flagNoTaeed2 = flagNoTaeed2;
    }

    public String getFisuId() {
        return fisuId;
    }

    public void setFisuId(String fisuId) {
        this.fisuId = fisuId;
    }

    public String getSsn() {
        return ssn;
    }

    public void setSsn(String ssn) {
        this.ssn = ssn;
    }

    public String getBrchCode() {
        return brchCode;
    }

    public void setBrchCode(String brchCode) {
        this.brchCode = brchCode;
    }

    public String getNatcin() {
        return natcin;
    }

    public void setNatcin(String natcin) {
        this.natcin = natcin;
    }

    public String getGender() {
        return gender;
    }

    public void setGender(String gender) {
        this.gender = gender;
    }

    public String getNation() {
        return nation;
    }

    public void setNation(String nation) {
        this.nation = nation;
    }

    public String getRecognizeMethod() {
        return recognizeMethod;
    }

    public void setRecognizeMethod(String recognizeMethod) {
        this.recognizeMethod = recognizeMethod;
    }

    public Date getDoB() {
        return dateOfBirth != null ? DateUtils.parse(dateOfBirth, "yyyyMMdd") : null;
    }
    public void setDoB(Date dateOfBirth) {
        if (dateOfBirth == null)
            return;
        this.dateOfBirth =DateUtils.format(dateOfBirth, "yyyyMMdd");
    }

    @Override
    public RegInsuranceSpecPK getIdentifierInstance() {
        return new RegInsuranceSpecPK(this.id, this.brchCode);
    }

    public String getCityOfBirthDesc() {
        return cityOfBirthDesc;
    }

    public void setCityOfBirthDesc(String cityOfBirthDesc) {
        this.cityOfBirthDesc = cityOfBirthDesc;
    }

    @Override
    public String toString() {
        return "InsuranceRegisteration{" +
                "id='" + id + '\'' +
                ", brchCode='" + brchCode + '\'' +
                ", lastName='" + lastName + '\'' +
                ", firstName='" + firstName + '\'' +
                ", fatherName='" + fatherName + '\'' +
                ", gender='" + gender + '\'' +
                ", nation='" + nation + '\'' +
                ", nationalId='" + nationalId + '\'' +
                ", idCardNumber='" + idCardNumber + '\'' +
                ", idCardSerial1='" + idCardSerial1 + '\'' +
                ", idCardSerial2='" + idCardSerial2 + '\'' +
                ", cityOfIssue='" + cityOfIssue + '\'' +
                ", dateOfBirth='" + dateOfBirth + '\'' +
                ", cityOfBirth='" + cityOfBirth + '\'' +
                ", cityOfBirthDesc='" + cityOfBirthDesc + '\'' +
                ", expCityCode='" + expCityCode + '\'' +
                ", registerDate='" + registerDate + '\'' +
                ", requetNumber=" + requetNumber +
                ", creationTime='" + creationTime + '\'' +
                ", createdBy='" + createdBy + '\'' +
                ", approveDate='" + approveDate + '\'' +
                ", customerType='" + customerType + '\'' +
                ", recognizeMethod='" + recognizeMethod + '\'' +
                ", isuTypeCode='" + isuType+ '\'' +
                ", isuStatCode='" + isuStat + '\'' +
                ", flagTaeed='" + flagTaeed + '\'' +
                ", flagPrint='" + flagPrint + '\'' +
                ", recogMethodDate='" + recogMethodDate + '\'' +
                ", finalTaeed='" + finalTaeed + '\'' +
                ", flagSabt2='" + flagSabt2 + '\'' +
                ", flagTaeed2='" + flagTaeed2 + '\'' +
                ", flagNoTaeed2='" + flagNoTaeed2 + '\'' +
                ", fisuId='" + fisuId + '\'' +
                ", ssn='" + ssn + '\'' +
                ", natcin='" + natcin + '\'' +
                ", brchName='" + brchName + '\'' +
                ", doB=" + doB +
                '}';
    }
}
