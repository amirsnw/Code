
package ir.tamin.insurance.technical.model.insuranceAgreement;

import ir.tamin.framework.domain.AbstractEntity;
import ir.tamin.framework.ws.rest.repository.annotation.ResourceId;
import ir.tamin.framework.ws.rest.repository.annotation.ResourceIds;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name = "BAJ_SAYADMAIN")
@ResourceIds({
    @ResourceId(fields = {"insuranceId"})})
//@RESTResource(lookupProxy = "ir.tamin.insurance.technical.business.transferInsuredToTamin.EntPayStatusManager")

public class Sayadan extends AbstractEntity<String> {
    @Id
    @Column(name = "SRISUID")
    private String insuranceId;
    
    @Column(name = "SRISUNATCODE")
    private String nationalCode;
    
    @Column(name = "SRWSHID")
    private String workshopId;
    
    @Column(name = "SRWSHNAME")
    private String workshopName;
    
    @Column(name = "SRISUFNAME")
    private String firstName;
    
    @Column(name = "SRISULNAME")
    private String lastName;
    
    @Column(name = "SRISUDNAME")
    private String fatherName;
    
    @Column(name = "SRISUIDNO")
    private String idNo;
    
    @Column(name = "SRISUIDPLC")
    private String birthCityCode;
    
    @Column(name = "SRISUBIRTHDATE")
    private String birthDate;
    
    @Column(name = "SROOZBIRTHDATE")
    private String birthDateDay;
    
    @Column(name = "SMAHBIRTHDATE")
    private String birthDateMonth;
    
    @Column(name = "SSALBIRTHDATE")
    private String birthDateYear;
    
    @Column(name = "SBRHNAME")
    private String branchName;

    public String getInsuranceId() {
        return insuranceId;
    }

    public void setInsuranceId(String insuranceId) {
        this.insuranceId = insuranceId;
    }

    public String getNationalCode() {
        return nationalCode;
    }

    public void setNationalCode(String nationalCode) {
        this.nationalCode = nationalCode;
    }

    public String getWorkshopId() {
        return workshopId;
    }

    public void setWorkshopId(String workshopId) {
        this.workshopId = workshopId;
    }

    public String getWorkshopName() {
        return workshopName;
    }

    public void setWorkshopName(String workshopName) {
        this.workshopName = workshopName;
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

    public String getFatherName() {
        return fatherName;
    }

    public void setFatherName(String fatherName) {
        this.fatherName = fatherName;
    }

    public String getIdNo() {
        return idNo;
    }

    public void setIdNo(String idNo) {
        this.idNo = idNo;
    }

    public String getBirthCityCode() {
        return birthCityCode;
    }

    public void setBirthCityCode(String birthCityCode) {
        this.birthCityCode = birthCityCode;
    }

    public String getBirthDate() {
        return birthDate;
    }

    public void setBirthDate(String birthDate) {
        this.birthDate = birthDate;
    }

    public String getBirthDateDay() {
        return birthDateDay;
    }

    public void setBirthDateDay(String birthDateDay) {
        this.birthDateDay = birthDateDay;
    }

    public String getBirthDateMonth() {
        return birthDateMonth;
    }

    public void setBirthDateMonth(String birthDateMonth) {
        this.birthDateMonth = birthDateMonth;
    }

    public String getBirthDateYear() {
        return birthDateYear;
    }

    public void setBirthDateYear(String birthDateYear) {
        this.birthDateYear = birthDateYear;
    }

    public String getBranchName() {
        return branchName;
    }

    public void setBranchName(String branchName) {
        this.branchName = branchName;
    }
    
    @Override
    public String getIdentifierInstance() {
        return insuranceId;
    }
    
}
