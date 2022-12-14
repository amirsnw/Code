package ir.tamin.insurance.technical.model.guardian;

import ir.tamin.framework.domain.AbstractEntity;
import ir.tamin.framework.ws.rest.repository.annotation.RESTResource;
import ir.tamin.framework.ws.rest.repository.annotation.ResourceId;
import ir.tamin.framework.ws.rest.repository.annotation.ResourceIds;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

/**
 *
 * @author m_hoseini
 */
@Entity
@Table(name = "BASEINFO.TB_PORFTYPE")
@RESTResource(lookupProxy = "ir.tamin.insurance.erequest.business.registration.BailTypeManager")
@ResourceIds({
    @ResourceId(fields = {"code"})})
public class BaseBailType extends AbstractEntity<String> {

    @Id   
    @Column(name = "PORFTYPECODE")
    private String code;

    @Column(name = "PORFTYPEDESC")
    private String description;

    @Column(name = "STATUS")
    private String status;

    @Column(name = "STATUSSTDATE")
    private String statusDate;

    public String getCode() {
        return code;
    }

    public void setCode(String code) {
        this.code = code;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
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
    public String getIdentifierInstance() {
        return this.code;
    }

}
