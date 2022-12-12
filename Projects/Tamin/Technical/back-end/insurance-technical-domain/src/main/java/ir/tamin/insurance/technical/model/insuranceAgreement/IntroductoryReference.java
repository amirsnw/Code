
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
@Table(name = "SWSH_TRANS_REFERLIST")
@RESTResource
@ResourceIds({
    @ResourceId(fields = {"categoryTypeCode"})})
//@NamedQueries({
//    @NamedQuery(name = "AgreeAcctivity.countAllowedWorkshop", query = "select count(w) from AgreeActivity a,Workshop w  where a.agreementCategoryId=:agreementCategoryId and w.workshopId=:workshopId")// and a.activityCode= w.actitvityCode
//})
public class IntroductoryReference extends AbstractEntity<String> {
    
    @Id
    @Column(name = "REFER_ID")
    private String refrenceId;
    
    @Column(name = "REFER_DESC")
    private String refrenceDesc;
    
    @Column(name = "STATUS")
    private String status;

    public String getRefrenceId() {
        return refrenceId;
    }

    public void setRefrenceId(String refrenceId) {
        this.refrenceId = refrenceId;
    }

    public String getRefrenceDesc() {
        return refrenceDesc;
    }

    public void setRefrenceDesc(String refrenceDesc) {
        this.refrenceDesc = refrenceDesc;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    @Override
    public String getIdentifierInstance() {
        return refrenceId;
    }    
}
