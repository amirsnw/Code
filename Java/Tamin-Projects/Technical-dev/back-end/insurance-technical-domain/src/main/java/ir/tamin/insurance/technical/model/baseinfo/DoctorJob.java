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
@Table(name = "TB_INSDOCTRATE", schema = "BASEINFO")
@ResourceIds({
    @ResourceId(fields = {"jobCode"})})
@RESTResource()
public class DoctorJob extends AbstractEntity<String> {

    @Id
    @Column(name = "P_JOBCODE")
    private String jobCode;
    
    @Column(name = "P_JOBDESC")
    private String jobDesc;
    
    @Column(name = "P_YY")
    private String jobY;
    
    @Column(name = "P_RATE")
    private String jobRate;

    public String getJobCode() {
        return jobCode;
    }

    public void setJobCode(String jobCode) {
        this.jobCode = jobCode;
    }

    public String getJobDesc() {
        return jobDesc;
    }

    public void setJobDesc(String jobDesc) {
        this.jobDesc = jobDesc;
    }

    public String getJobY() {
        return jobY;
    }

    public void setJobY(String jobY) {
        this.jobY = jobY;
    }

    public String getJobRate() {
        return jobRate;
    }

    public void setJobRate(String jobRate) {
        this.jobRate = jobRate;
    }

    @Override
    public String getIdentifierInstance() {
        return jobCode;
    }
    
}


