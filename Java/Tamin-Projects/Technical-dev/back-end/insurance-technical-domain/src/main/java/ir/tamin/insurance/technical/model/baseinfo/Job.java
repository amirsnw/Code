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
@Table(name = "TB_JOB", schema = "BASEINFO")
@ResourceIds({
    @ResourceId(fields = {"jobCode"})})
@RESTResource()
public class Job extends AbstractEntity<String> {

    @Id
    @Column(name = "JOBCODE")
    private String jobCode;

    @Column(name = "JOBDESC")
    private String jobDesc;

    @Column(name = "STATUS")
    private String status;

    @Column(name = "STATUSSTDATE")
    private String statusStartDate;

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
        return jobCode;
    }

}
