package ir.tamin.insurance.technical.model.baseinfo;

import ir.tamin.framework.domain.AbstractEntity;
import ir.tamin.framework.ws.rest.repository.annotation.RESTResource;
import ir.tamin.framework.ws.rest.repository.annotation.ResourceId;
import ir.tamin.framework.ws.rest.repository.annotation.ResourceIds;

import javax.persistence.*;

@Entity
@Table(name = "tb_special_group_activity")
@RESTResource
@ResourceIds({
    @ResourceId(fields = {"specialCategoryId"})})
@NamedQueries({
    @NamedQuery(name = "SpecialActivity.getCatBySpecialId", query = "select c.activityCode from SpecialActivity c where c.specialCategoryId=:specialCategoryId"),
    @NamedQuery(name = "SpecialActivity.getSubBySpecialId", query = "select c.workshopSubCode from SpecialActivity c where c.specialCategoryId=:specialCategoryId")
})
public class SpecialActivity extends AbstractEntity<String> {

    @Id
    @Column(name = "SPECIAL_GROUPS_CODE")
    private String specialCategoryId;

    @Column(name = "ACTIVITYCODE")
    private String activityCode;

    @Column(name = "STATUS")
    private String status;
    
    @Column(name = "WORKSHOP_SUBCODE")
    private String workshopSubCode;

    public String getSpecialCategoryId() {
        return specialCategoryId;
    }

    public void setSpecialCategoryId(String specialCategoryId) {
        this.specialCategoryId = specialCategoryId;
    }

    public String getActivityCode() {
        return activityCode;
    }

    public void setActivityCode(String activityCode) {
        this.activityCode = activityCode;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public String getWorkshopSubCode() {
        return workshopSubCode;
    }

    public void setWorkshopSubCode(String workshopSubCode) {
        this.workshopSubCode = workshopSubCode;
    }
    
    @Override
    public String getIdentifierInstance() {
        return specialCategoryId;
    }

}
