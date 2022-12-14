package ir.tamin.insurance.technical.model.insuranceAgreement;

import ir.tamin.framework.domain.AbstractEntity;
import ir.tamin.framework.ws.rest.repository.annotation.RESTResource;
import ir.tamin.framework.ws.rest.repository.annotation.ResourceId;
import ir.tamin.framework.ws.rest.repository.annotation.ResourceIds;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name = "KARVARZIFILE")
@RESTResource
//@RESTResource(lookupProxy = "ir.tamin.insurance.technical.business.insuranceAgreement.RefundSpecProxy")
@ResourceIds({
    @ResourceId(fields = {"rowId"})})
//@NamedQueries({
//    @NamedQuery(name = "AgreeAcctivity.countAllowedWorkshop", query = "select count(w) from AgreeActivity a,Workshop w  where a.agreementCategoryId=:agreementCategoryId and w.workshopId=:workshopId")// and a.activityCode= w.actitvityCode
//})
public class KarvarzanInsurance extends AbstractEntity<Long> {   
    @Id
    @Column(name = "RADIF")
    private Long rowId;
    @Column(name = "OSTAN")
    private String provinceName;
    @Column(name = "SHAHR")
    private String cityName;
    @Column(name = "SHOBEH")
    private String branchCode;
    @Column(name = "RWSHID")
    private String workshopId;
    @Column(name = "RWSHNAME")
    private String workshopName;
    @Column(name = "RISUFNAME")
    private String firstName;
    @Column(name = "RISULNAME")
    private String lastName;
    @Column(name = "RISUDNAME")
    private String fatherName;
    @Column(name = "RISUIDNO")
    private String idNumber;   
    @Column(name = "RISUNATCODE")
    private String nationalCode;
    @Column(name = "RISUID")
    private String insuranceNumber;
    @Column(name = "RISUBIRTHDATE")
    private String birthDate;
    @Column(name = "LETNO")
    private String letterNumber;
    @Column(name = "LETDATE")
    private String letterDate;
    @Column(name = "REQNO")
    private String requestNumber;
    @Column(name = "REQDATE")
    private String requestDate;
    @Column(name = "HSDATE")
    private String hsDate;
    @Column(name = "HMAB")
    private String hmab;
    @Column(name = "MOLAHEZAT")
    private String note;
    
    @Column(name = "FLAG")
    private String falg1;    
    @Column(name = "FLAG2")
    private String flag2;    
    @Column(name = "FLAG3")
    private String flag3;    
    @Column(name = "SABTDATE")
    private String registerDate;   
    
    public String getProvinceName() {
        return provinceName;
    }

    public void setProvinceName(String provinceName) {
        this.provinceName = provinceName;
    }

    public String getCityName() {
        return cityName;
    }

    public void setCityName(String cityName) {
        this.cityName = cityName;
    }

    public String getBranchCode() {
        return branchCode;
    }

    public void setBranchCode(String branchCode) {
        this.branchCode = branchCode;
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

    public String getIdNumber() {
        return idNumber;
    }

    public void setIdNumber(String idNumber) {
        this.idNumber = idNumber;
    }

    public String getNationalCode() {
        return nationalCode;
    }

    public void setNationalCode(String nationalCode) {
        this.nationalCode = nationalCode;
    }

    public String getInsuranceNumber() {
        return insuranceNumber;
    }

    public void setInsuranceNumber(String insuranceNumber) {
        this.insuranceNumber = insuranceNumber;
    }

    public String getBirthDate() {
        return birthDate;
    }

    public void setBirthDate(String birthDate) {
        this.birthDate = birthDate;
    }

    public String getLetterNumber() {
        return letterNumber;
    }

    public void setLetterNumber(String letterNumber) {
        this.letterNumber = letterNumber;
    }

    public String getLetterDate() {
        return letterDate;
    }

    public void setLetterDate(String letterDate) {
        this.letterDate = letterDate;
    }

    public String getRequestNumber() {
        return requestNumber;
    }

    public void setRequestNumber(String requestNumber) {
        this.requestNumber = requestNumber;
    }

    public String getRequestDate() {
        return requestDate;
    }

    public void setRequestDate(String requestDate) {
        this.requestDate = requestDate;
    }

    public String getHsDate() {
        return hsDate;
    }

    public void setHsDate(String hsDate) {
        this.hsDate = hsDate;
    }

    public String getHmab() {
        return hmab;
    }

    public void setHmab(String hmab) {
        this.hmab = hmab;
    }

    public String getNote() {
        return note;
    }

    public void setNote(String note) {
        this.note = note;
    }

    public Long getRowId() {
        return rowId;
    }

    public void setRowId(Long rowId) {
        this.rowId = rowId;
    }

    public String getFalg1() {
        return falg1;
    }

    public void setFalg1(String falg1) {
        this.falg1 = falg1;
    }

    public String getFlag2() {
        return flag2;
    }

    public void setFlag2(String flag2) {
        this.flag2 = flag2;
    }

    public String getFlag3() {
        return flag3;
    }

    public void setFlag3(String flag3) {
        this.flag3 = flag3;
    }

    public String getRegisterDate() {
        return registerDate;
    }

    public void setRegisterDate(String registerDate) {
        this.registerDate = registerDate;
    }

    @Override
    public Long getIdentifierInstance() {
        return rowId;
    }
    
}
