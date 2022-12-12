package ir.tamin.insurance.technical.model.guardian;

import com.fasterxml.jackson.annotation.JsonIdentityInfo;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.ObjectIdGenerators;
import ir.tamin.framework.domain.AbstractEntity;

import javax.persistence.Entity;
import javax.persistence.Id;
import java.sql.Timestamp;

@Entity
@JsonIdentityInfo(generator = ObjectIdGenerators.IntSequenceGenerator.class)
@JsonIgnoreProperties(ignoreUnknown = true)
public class Personal extends AbstractEntity<Long> {

    public Personal(Long id) {
        this.id = id;
    }

    public Personal() {
    }

    @Id
    //@GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")    
    private Long id;    
    private String nationalId;  
    private String firstName;  
    private String lastName;  
    private String idCardNumber;   
    private String idCardSerial1;
    private String idCardSerial2;
    private String fatherName;
    private Timestamp dateOfBirth;
    private String countryId;
    private String cityOfBirthId;
    private String cityOfIssueId;
    private String foreignId;
    private String nation;
    private Boolean isForien;
    private String gender;
    private Timestamp creationTime;
    private Timestamp lastModificationTime;
    private String createdBy;
    private String lastModifiedBy;
    private String refrenceCode;
    private Personal parentId;
    private BaseDependentType dependentType;
    private BaseBailType bailType;  
    private String organizationId;
    private String user;
    private String ssn;
    private Dependency dependency;  
    private Long portalRequestId;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getNationalId() {
        return nationalId;
    }

    public void setNationalId(String nationalId) {
        this.nationalId = nationalId;
    }

    public String getFirstName() {
        return firstName;
    }

    public void setFirstName(String firstName) {
        this.firstName = firstName;
    }

    public String getLastName() {
        return lastName;
    }

    public void setLastName(String lastName) {
        this.lastName = lastName;
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

    public String getFatherName() {
        return fatherName;
    }

    public void setFatherName(String fatherName) {
        this.fatherName = fatherName;
    }

    public Timestamp getDateOfBirth() {
        return dateOfBirth;
    }

    public void setDateOfBirth(Timestamp dateOfBirth) {
        this.dateOfBirth = dateOfBirth;
    }

    public String getCityOfBirthId() {
        return cityOfBirthId;
    }

    public void setCityOfBirthId(String cityOfBirthId) {
        this.cityOfBirthId = cityOfBirthId;

    }

    public String getCityOfIssueId() {
        return cityOfIssueId;
    }

    public void setCityOfIssueId(String cityOfIssueId) {
        this.cityOfIssueId = cityOfIssueId;
    }

    public String getNation() {
        return nation;
    }

    public void setNation(String nation) {
        this.nation = nation;
    }

    public String getGender() {
        return gender;
    }

    public void setGender(String gender) {
        this.gender = gender;
    }

    public Timestamp getCreationTime() {
        return creationTime;
    }

    public void setCreationTime(Timestamp creationTime) {
        this.creationTime = creationTime;
    }

    public Timestamp getLastModificationTime() {
        return lastModificationTime;
    }

    public void setLastModificationTime(Timestamp lastModificationTime) {
        this.lastModificationTime = lastModificationTime;
    }

    public String getCreatedBy() {
        return createdBy;
    }

    public void setCreatedBy(String createdBy) {
        this.createdBy = createdBy;
    }

    public String getLastModifiedBy() {
        return lastModifiedBy;
    }

    public void setLastModifiedBy(String lastModifiedBy) {
        this.lastModifiedBy = lastModifiedBy;
    }

    public String getForeignId() {
        return foreignId;
    }

    public void setForeignId(String foreignId) {
        this.foreignId = foreignId;
    }

    public String getCountryId() {
        return countryId;
    }

    public void setCountryId(String countryId) {
        this.countryId = countryId;
    }

    public Boolean getIsForien() {
        return isForien;
    }

    public void setIsForien(Boolean isForien) {
        this.isForien = isForien;
    }

    @Override
    public Long getIdentifierInstance() {
        return this.id;
    }

    public String getRefrenceCode() {
        return refrenceCode;
    }

    public void setRefrenceCode(String refrenceCode) {
        this.refrenceCode = refrenceCode;
    }

    public Personal getParentId() {
        return parentId;
    }

    public void setParentId(Personal parentId) {
        this.parentId = parentId;
    }

    public BaseDependentType getDependentType() {
        return dependentType;
    }

    public void setDependentType(BaseDependentType dependentType) {
        this.dependentType = dependentType;
    }

    public BaseBailType getBailType() {
        return bailType;
    }

    public void setBailType(BaseBailType bailType) {
        this.bailType = bailType;
    }
    public String getUser() {
        return user;
    }

    public void setUser(String user) {
        this.user = user;
    }

    public String getSsn() {
        return ssn;
    }

    public void setSsn(String ssn) {
        this.ssn = ssn;
    }

//    public RequestEntity getRequest() {
//        return request;
//    }
//
//    public void setRequest(RequestEntity request) {
//        this.request = request;
//    }

    public String getOrganizationId() {
        return organizationId;
    }

    public void setOrganizationId(String organizationId) {
        this.organizationId = organizationId;
    }

    public Dependency getDependency() {
        return dependency;
    }

    public void setDependency(Dependency dependency) {
        this.dependency = dependency;
    }

    public Long getPortalRequestId() {
        return portalRequestId;
    }

    public void setPortalRequestId(Long portalRequestId) {
        this.portalRequestId = portalRequestId;
    }
}
