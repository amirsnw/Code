/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package ir.tamin.insurance.technical.model.agreement;

import ir.tamin.framework.domain.AbstractEntity;
import ir.tamin.framework.ws.rest.repository.annotation.RESTResource;
import ir.tamin.framework.ws.rest.repository.annotation.ResourceId;
import ir.tamin.framework.ws.rest.repository.annotation.ResourceIds;
import ir.tamin.insurance.technical.model.primaryKeyClass.AgreeActivityPK;

import javax.persistence.*;

/**
 *
 * @author s_naghavi
 */
@Entity
@IdClass(AgreeActivityPK.class)
@Table(name = "TB_SSUPAGREE_ACTIVITY")
@RESTResource
@ResourceIds({@ResourceId(fields = {"agreementCategoryId", "activityCode"})})
@NamedQueries({
    @NamedQuery(name = "AgreeAcctivity.countAllowedWorkshop", query = "select count(w) from AgreeActivity a,Workshop w  where a.agreementCategoryId=:agreementCategoryId and w.workshopId=:workshopId")// and a.activityCode= w.actitvityCode
})
public class AgreeActivity extends AbstractEntity<AgreeActivityPK> {

    @Id
    @Column(name = "SSUP_AGREEMENT_CATEID", nullable = false)
    private String agreementCategoryId;

    @Id
    @Column(name = "ACTIVITYCODE", nullable = false)
    private String activityCode;

    @Column(name = "STATUS", length = 1, nullable = false)
    private String status;

    @Column(name = "STATUSSTDATE", length = 8, nullable = false)
    private String statusDate;


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

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public String getStatusDate() {
        return statusDate;
    }

    public void setStatusDate(String statusDate) {
        this.statusDate = statusDate;
    }



    @Override
    public AgreeActivityPK getIdentifierInstance() {
        return new AgreeActivityPK(this.agreementCategoryId, this.activityCode);
    }

}
