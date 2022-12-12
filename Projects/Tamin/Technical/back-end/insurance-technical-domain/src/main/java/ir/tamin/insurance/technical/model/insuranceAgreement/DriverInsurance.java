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
@Table(name = "DRIVERISUSPEC")
@RESTResource
//@RESTResource(lookupProxy = "ir.tamin.insurance.technical.business.insuranceAgreement.RefundSpecProxy")
@ResourceIds({
    @ResourceId(fields = {"id"})})
//@NamedQueries({
//    @NamedQuery(name = "AgreeAcctivity.countAllowedWorkshop", query = "select count(w) from AgreeActivity a,Workshop w  where a.agreementCategoryId=:agreementCategoryId and w.workshopId=:workshopId")// and a.activityCode= w.actitvityCode
//})
public class DriverInsurance extends AbstractEntity<String> {

    @Id
    @Column(name = "ROW_SEQ")
    private String id;    
    @Column(name = "DISUNATCODE")
    private String driverNationalCode;
    @Column(name = "ROW_ID")
    private String rowId;
    @Column(name = "DISUFNAME")
    private String driverFirstName;
    @Column(name = "DISULNAME")
    private String driverLastName;
    @Column(name = "DISUIDNO")
    private String driverIdNumber;
    @Column(name = "DISUBDATE")
    private String driverBirthDate;
    @Column(name = "DISUDNAME")
    private String driverFatherName;    
    @Column(name = "VINCODE")
    private String vinCode;
    @Column(name = "PANCODE")
    private String panCode;
    @Column(name = "CARPLATE")
    private String carPlate;
    @Column(name = "CARTYPECODE")
    private String carTypeCode;
    @Column(name = "CARTYPEDESC")
    private String carTypeDesc;
    @Column(name = "OWNERTYPE")
    private String ownerTypeCode;
    @Column(name = "OWNERTYPEDESC")
    private String ownerTypedesc;
    @Column(name = "FUELTYPE")
    private String fuelTypeCode;
    @Column(name = "FUELTYPEDESC")
    private String fueltypeDesc;
    @Column(name = "ACTAREA")
    private String actionAreaCode;
    @Column(name = "ACTAREADESC")
    private String actionAreaDesc;
    @Column(name = "CAPACITY")
    private String capacity;    
    @Column(name = "DTELLNUMBER")
    private String driverTelephonNumber;
    @Column(name = "BRHCODE")
    private String branchCode;
    @Column(name = "CITYCODE")
    private String cityCode;
    @Column(name = "PROVINCECODE")
    private String provinceCode;
    @Column(name = "DISUID")
    private String driverInsuranceId;
    @Column(name = "PREBRHCODE")
    private String preBranchCode;
    @Column(name = "CREATEUID")
    private String createUserId;
    @Column(name = "CREATEDT")
    private String createDate;
    @Column(name = "ROWSTAT")
    private String rowStatus;
    @Column(name = "DELUID")
    private String deleteUserId;
    @Column(name = "DELDATE")
    private String deleteDate;
    @Column(name = "LYEAR")
    private String year;
    @Column(name = "LMON")
    private String month;
    @Column(name = "PROVINCE")
    private String  province;                                                                  
    @Column(name = "CITY")
    private String city;
    @Column(name = "SENDSTEP")
    private String sendStep;
    @Column(name = "PROVINCECODE1")
    private String provinceCode1;

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getDriverFirstName() {
        return driverFirstName;
    }

    public void setDriverFirstName(String driverFirstName) {
        this.driverFirstName = driverFirstName;
    }

   

    public String getDriverIdNumber() {
        return driverIdNumber;
    }

    public void setDriverIdNumber(String driverIdNumber) {
        this.driverIdNumber = driverIdNumber;
    }

    public String getDriverBirthDate() {
        return driverBirthDate;
    }

    public void setDriverBirthDate(String driverBirthDate) {
        this.driverBirthDate = driverBirthDate;
    }

    public String getDriverFatherName() {
        return driverFatherName;
    }

    public void setDriverFatherName(String driverFatherName) {
        this.driverFatherName = driverFatherName;
    }

    public String getDriverNationalCode() {
        return driverNationalCode;
    }

    public void setDriverNationalCode(String driverNationalCode) {
        this.driverNationalCode = driverNationalCode;
    }

    public String getVinCode() {
        return vinCode;
    }

    public void setVinCode(String vinCode) {
        this.vinCode = vinCode;
    }

    public String getPanCode() {
        return panCode;
    }

    public void setPanCode(String panCode) {
        this.panCode = panCode;
    }

    public String getCarPlate() {
        return carPlate;
    }

    public void setCarPlate(String carPlate) {
        this.carPlate = carPlate;
    }

    public String getCarTypeCode() {
        return carTypeCode;
    }

    public void setCarTypeCode(String carTypeCode) {
        this.carTypeCode = carTypeCode;
    }

    public String getCarTypeDesc() {
        return carTypeDesc;
    }

    public void setCarTypeDesc(String carTypeDesc) {
        this.carTypeDesc = carTypeDesc;
    }

    public String getOwnerTypeCode() {
        return ownerTypeCode;
    }

    public void setOwnerTypeCode(String ownerTypeCode) {
        this.ownerTypeCode = ownerTypeCode;
    }

    public String getOwnerTypedesc() {
        return ownerTypedesc;
    }

    public void setOwnerTypedesc(String ownerTypedesc) {
        this.ownerTypedesc = ownerTypedesc;
    }

    public String getFuelTypeCode() {
        return fuelTypeCode;
    }

    public void setFuelTypeCode(String fuelTypeCode) {
        this.fuelTypeCode = fuelTypeCode;
    }

    public String getFueltypeDesc() {
        return fueltypeDesc;
    }

    public void setFueltypeDesc(String fueltypeDesc) {
        this.fueltypeDesc = fueltypeDesc;
    }

    public String getActionAreaCode() {
        return actionAreaCode;
    }

    public void setActionAreaCode(String actionAreaCode) {
        this.actionAreaCode = actionAreaCode;
    }

    public String getActionAreaDesc() {
        return actionAreaDesc;
    }

    public void setActionAreaDesc(String actionAreaDesc) {
        this.actionAreaDesc = actionAreaDesc;
    }

    public String getCapacity() {
        return capacity;
    }

    public void setCapacity(String capacity) {
        this.capacity = capacity;
    }

    public String getDriverTelephonNumber() {
        return driverTelephonNumber;
    }

    public void setDriverTelephonNumber(String driverTelephonNumber) {
        this.driverTelephonNumber = driverTelephonNumber;
    }

    public String getBranchCode() {
        return branchCode;
    }

    public void setBranchCode(String branchCode) {
        this.branchCode = branchCode;
    }

    public String getCityCode() {
        return cityCode;
    }

    public void setCityCode(String cityCode) {
        this.cityCode = cityCode;
    }

    public String getProvinceCode() {
        return provinceCode;
    }

    public void setProvinceCode(String provinceCode) {
        this.provinceCode = provinceCode;
    }

    public String getDriverInsuranceId() {
        return driverInsuranceId;
    }

    public void setDriverInsuranceId(String driverInsuranceId) {
        this.driverInsuranceId = driverInsuranceId;
    }

    public String getPreBranchCode() {
        return preBranchCode;
    }

    public void setPreBranchCode(String preBranchCode) {
        this.preBranchCode = preBranchCode;
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

    public String getRowStatus() {
        return rowStatus;
    }

    public void setRowStatus(String rowStatus) {
        this.rowStatus = rowStatus;
    }

    public String getDeleteUserId() {
        return deleteUserId;
    }

    public void setDeleteUserId(String deleteUserId) {
        this.deleteUserId = deleteUserId;
    }

    public String getDeleteDate() {
        return deleteDate;
    }

    public void setDeleteDate(String deleteDate) {
        this.deleteDate = deleteDate;
    }

    public String getYear() {
        return year;
    }

    public void setYear(String year) {
        this.year = year;
    }

    public String getMonth() {
        return month;
    }

    public void setMonth(String month) {
        this.month = month;
    }

    public String getProvince() {
        return province;
    }

    public void setProvince(String province) {
        this.province = province;
    }

    public String getCity() {
        return city;
    }

    public void setCity(String city) {
        this.city = city;
    }

    public String getSendStep() {
        return sendStep;
    }

    public void setSendStep(String sendStep) {
        this.sendStep = sendStep;
    }

    public String getProvinceCode1() {
        return provinceCode1;
    }

    public void setProvinceCode1(String provinceCode1) {
        this.provinceCode1 = provinceCode1;
    }

    public String getDriverLastName() {
        return driverLastName;
    }

    public void setDriverLastName(String driverLastName) {
        this.driverLastName = driverLastName;
    }   
    
    @Override
    public String getIdentifierInstance() {
        return id;
    }  

}
