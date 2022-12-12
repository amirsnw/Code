package ir.tamin.insurance.technical.model.guardian;

import ir.tamin.framework.domain.AbstractEntity;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name = "BASEINFO.TB_DEPPERRELTYPE")
public class BaseDependentType extends AbstractEntity<String> {

    public BaseDependentType(String code) {
        this.code = code;
    }

    public BaseDependentType() {
    }

    @Id
    @Column(name = "DEPPERRELTYPECODE")
    private String code;
    
    @Column(name = "DEPPERRELTYPEDESC")
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
