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
@Table(name = "TB_OCCUR_TYPE", schema = "BASEINFO")
@RESTResource(lookupProxy = "ir.tamin.insurance.technical.business.baseinfo.TbOccurTypeManager")
@ResourceIds({@ResourceId(fields = {"typeCode"})})
public class TbOccurType extends AbstractEntity<String> {

    @Id
    @Column(name = "TYPE_CODE", nullable = false)
    private String typeCode;

    @Column(name = "TYPE_DESC", nullable = false)
    private String typeDesc;

    @Column(name = "STATUS", nullable = false)
    private String status;

    @Column(name = "statusstdate", nullable = false)
    private String statusstdate;

    @Override
    public String getIdentifierInstance() {
        return typeCode;
    }

    public String getTypeCode() {
        return typeCode;
    }

    public void setTypeCode(String typeCode) {
        this.typeCode = typeCode;
    }

    public String getTypeDesc() {
        return typeDesc;
    }

    public void setTypeDesc(String typeDesc) {
        this.typeDesc = typeDesc;
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
}
