/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package ir.tamin.insurance.technical.model.user;


import java.io.Serializable;
import java.util.Date;
import java.util.List;

public class OrgUser implements Serializable {

    private static final long serialVersionUID = 1L;
    
    private String entityId;
    private String firstName;
    private String lastName;
    private String email;
    private String userName;
    private String gender;
    private String nationalCode;
    private String mobile;
    private Date birthDate;
    private String status;
    private String userType;
    private List<Role> roles;
    private Organization organization;
    private GeoUnit geoUnit;
    private String type;
    private List<WorkshopUser> workshopUsers;
    public String getEntityId() {
        return entityId;
    }

    public void setEntityId(String entityId) {
        this.entityId = entityId;
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

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getUserName() {
        return userName;
    }

    public void setUserName(String userName) {
        this.userName = userName;
    }

    public String getGender() {
        return gender;
    }

    public void setGender(String gender) {
        this.gender = gender;
    }

    public String getNationalCode() {
        return nationalCode;
    }

    public void setNationalCode(String nationalCode) {
        this.nationalCode = nationalCode;
    }

    public String getMobile() {
        return mobile;
    }

    public void setMobile(String mobile) {
        this.mobile = mobile;
    }

    public Date getBirthDate() {
        return birthDate;
    }

    public void setBirthDate(Date birthDate) {
        this.birthDate = birthDate;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public String getUserType() {
        return userType;
    }

    public void setUserType(String userType) {
        this.userType = userType;
    }

    public List<Role> getRoles() {
        return roles;
    }

    public void setRoles(List<Role> roles) {
        this.roles = roles;
    }

    public Organization getOrganization() {
        return organization;
    }

    public void setOrganization(Organization organization) {
        this.organization = organization;
    }

    public GeoUnit getGeoUnit() {
        return geoUnit;
    }

    public void setGeoUnit(GeoUnit geoUnit) {
        this.geoUnit = geoUnit;
    }

    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type;
    }

    @Override
    public String toString() {
        return "OrgUser{" + "entityId=" + entityId + ", firstName=" + firstName + ", lastName=" + lastName + ", email=" + email + ", userName=" + userName + ", gender=" + gender + ", nationalCode=" + nationalCode + ", mobile=" + mobile + ", birthDate=" + birthDate + ", status=" + status + ", userType=" + userType + '}';
    }

    public List<WorkshopUser> getWorkshopUsers() {
        return workshopUsers;
    }

    public void setWorkshopUsers(List<WorkshopUser> workshopUsers) {
        this.workshopUsers = workshopUsers;
    }
    
    
}
