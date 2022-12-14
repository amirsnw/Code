package ir.tamin.insurance.technical.model.baseinfo;

import ir.tamin.framework.domain.AbstractEntity;
import ir.tamin.framework.ws.rest.repository.annotation.RESTResource;
import ir.tamin.framework.ws.rest.repository.annotation.ResourceId;
import ir.tamin.framework.ws.rest.repository.annotation.ResourceIds;
import ir.tamin.insurance.technical.model.primaryKeyClass.AgreeActivityPK;

import javax.persistence.*;

@Entity
@Table(name = "tb_ssupagree_activity", schema = "baseinfo")
@RESTResource
@ResourceIds({
    @ResourceId(fields = {"agreementCategoryId", "activityCode"})})
@NamedQueries({
   @NamedQuery(name = "AgreementActivity.getByCategoryId", query = "select c.activityCode from AgreementActivity c where c.agreementCategoryId=:agreementCategoryId")
})
public class AgreementActivity extends AbstractEntity<AgreeActivityPK> {

    @Id
    @Column(name = "SSUP_AGREEMENT_CATEID", nullable = false)
    private String agreementCategoryId;

    @Id
    @Column(name = "ACTIVITYCODE", nullable = false)
    private String activityCode;   
    
    @Column(name = "STATUSSTDATE")
    private String statusStartDate;
    
    @Column(name = "STATUS")
    private String status;

    public String getAgreementCategoryId() {
        return agreementCategoryId;
    }

    public void setAgreementCategoryId(String agreementCategoryId) {
        this.agreementCategoryId = agreementCategoryId;
    }

    public String getActivityCode() {
        return activityCode;
    }

    public void setActivityCode(String activityCode) {
        this.activityCode = activityCode;
    }

    public String getStatusStartDate() {
        return statusStartDate;
    }

    public void setStatusStartDate(String statusStartDate) {
        this.statusStartDate = statusStartDate;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    @Override
    public AgreeActivityPK getIdentifierInstance() {
        return new AgreeActivityPK(this.agreementCategoryId, this.activityCode);
    }

}
