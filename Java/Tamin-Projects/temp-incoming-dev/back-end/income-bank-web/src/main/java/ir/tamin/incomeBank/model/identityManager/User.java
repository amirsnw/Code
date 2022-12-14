package ir.tamin.incomeBank.model.identityManager;

import javax.persistence.Transient;
import java.io.Serializable;
import java.sql.Timestamp;
import java.util.List;

/**
 *
 * @author s_maknooni
 */
public class User implements Serializable {

    private static final long serialVersionUID = 1L;

    private String entityId;
    private String firstName;
    private String lastName;
    private String email;
    private String userName;
    private String gender;
    private String nationalCode;
    private String mobile;
    private Timestamp birthDate;
    private String userType;
    private String status;
    private List<Role> roles;
    private Organization organization;
    private GeoUnit geoUnit;
    @Transient
    boolean isEdareKol;

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

    public Timestamp getBirthDate() {
        return birthDate;
    }

    public void setBirthDate(Timestamp birthDate) {
        this.birthDate = birthDate;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
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

    public String getUserType() {
        return userType;
    }

    public void setUserType(String userType) {
        this.userType = userType;
    }

    public GeoUnit getGeoUnit() {
        return geoUnit;
    }

    public void setGeoUnit(GeoUnit geoUnit) {
        this.geoUnit = geoUnit;
    }

    public boolean isEdareKol() {
        return isEdareKol;
    }

    public void setEdareKol(boolean edareKol) {
        isEdareKol = edareKol;
    }
}
