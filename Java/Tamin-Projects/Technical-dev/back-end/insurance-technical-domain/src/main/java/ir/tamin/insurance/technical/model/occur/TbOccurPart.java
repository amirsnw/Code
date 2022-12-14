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
@Table(name = "TB_OCCUR_PART", schema = "BASEINFO")
@RESTResource(lookupProxy = "ir.tamin.insurance.technical.business.baseinfo.TbOccurPartManager")
@ResourceIds({@ResourceId(fields = {"partCode"})})
public class TbOccurPart extends AbstractEntity<String>{

    @Id
       @Column(name = "PART_CODE", nullable = false)
       private String partCode;

       @Column(name = "PART_DESC", nullable = false)
       private String partDesc;

       @Column(name = "STATUS", nullable = false)
       private String status;

       @Column(name = "STATUSSTDATE", nullable = false)
       private String statusstdate;

    public String getPartCode() {
        return partCode;
    }

    public void setPartCode(String partCode) {
        this.partCode = partCode;
    }

    public String getPartDesc() {
        return partDesc;
    }

    public void setPartDesc(String partDesc) {
        this.partDesc = partDesc;
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
           return partCode;
       }
   }

