package ir.tamin.insurance.technical.model.baseinfo;

import ir.tamin.framework.domain.AbstractEntity;
import ir.tamin.framework.ws.rest.repository.annotation.RESTResource;
import ir.tamin.framework.ws.rest.repository.annotation.ResourceId;
import ir.tamin.framework.ws.rest.repository.annotation.ResourceIds;

import javax.persistence.*;

@Entity
@NamedQueries({ 
    //@NamedQuery(name = "City.findAll", query = "SELECT p FROM City p "),
    //@NamedQuery(name = "City.findByCityCode", query = "select c.cityName from City c  where c.cityCode = :cityCode")
})
@Table(name = "TB_EDUCATION", schema = "BASEINFO")
@ResourceIds({
    @ResourceId(fields = {"jobCode"})})
@RESTResource()
public class Education extends AbstractEntity<String> {
    
    @Id
    @Column(name = "EDUCATIONCODE")
    private String educationCode;
    
    @Column(name = "EDUCATIONDESC")
    private String educationDesc;
    
    @Column(name = "STATUS")
    private String status;
    
    @Column(name = "STATUSSTDATE")
    private String statusStartDate;

    public String getEducationCode() {
        return educationCode;
    }

    public void setEducationCode(String educationCode) {
        this.educationCode = educationCode;
    }

    public String getEducationDesc() {
        return educationDesc;
    }

    public void setEducationDesc(String educationDesc) {
        this.educationDesc = educationDesc;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public String getStatusStartDate() {
        return statusStartDate;
    }

    public void setStatusStartDate(String statusStartDate) {
        this.statusStartDate = statusStartDate;
    }

    @Override
    public String getIdentifierInstance() {
        return educationCode;
    }
    
}
