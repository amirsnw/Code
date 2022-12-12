package ir.tamin.insurance.technical.model.occur;

import ir.tamin.framework.domain.AbstractEntity;
import ir.tamin.framework.ws.rest.repository.annotation.RESTResource;
import ir.tamin.framework.ws.rest.repository.annotation.ResourceId;
import ir.tamin.framework.ws.rest.repository.annotation.ResourceIds;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

/**
 * Created by a-khalighi on 5/17/2022
*/

@Entity
@Table(name = "TB_OCCUR_Cause", schema = "BASEINFO")
@RESTResource(lookupProxy = "ir.tamin.insurance.technical.business.baseinfo.TbOccurCauseManager")
@ResourceIds({@ResourceId(fields = {"causeCode"})})
public class TbOccurCause extends AbstractEntity<String> {


    @Id
    @Column(name = "CAUSE_CODE", nullable = false)
    private String causeCode;

    @Column(name = "CAUSE_DESC", nullable = false)
    private String causeDesc;

    @Column(name = "STATUS", nullable = false)
    private String status;

    @Column(name = "STATUSSTDATE", nullable = false)
    private String statusstdate;

    public String getCauseCode() {
        return causeCode;
    }

    public void setCauseCode(String causeCode) {
        this.causeCode = causeCode;
    }

    public String getCauseDesc() {
        return causeDesc;
    }

    public void setCauseDesc(String causeDesc) {
        this.causeDesc = causeDesc;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public String getStatusstdate() {
        return statusstdate;
    }

    public void setStatusstdate(String statusstdate) {
        this.statusstdate = statusstdate;
    }

    @Override
    public String getIdentifierInstance() {
        return causeCode;
    }
}
