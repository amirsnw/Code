package ir.tamin.insurance.technical.model.guardian;

import ir.tamin.framework.domain.AbstractEntity;
import ir.tamin.framework.ws.rest.repository.annotation.RESTResource;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;


@Entity
@Table(name = "REG_BASEDEPENDENCY")
@RESTResource(lookupProxy = "ir.tamin.insurance.erequest.business.registration.DependentTypeManager")
public class Dependency extends AbstractEntity<Long> {

    @Id   
    @Column(name = "id")
    private Long id;   
    @Column(name = "dependencyCode")
    private String dependencyCode;  
    @Column(name = "dependencyDesc")
    private String dependencyDesc;   
    @Column(name = "reasonCode")
    private String reasonCode;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getDependencyCode() {
        return dependencyCode;
    }

    public void setDependencyCode(String dependencyCode) {
        this.dependencyCode = dependencyCode;
    }

    public String getDependencyDesc() {
        return dependencyDesc;
    }

    public void setDependencyDesc(String dependencyDesc) {
        this.dependencyDesc = dependencyDesc;
    }

    public String getReasonCode() {
        return reasonCode;
    }

    public void setReasonCode(String reasonCode) {
        this.reasonCode = reasonCode;
    }

    @Override
    public Long getIdentifierInstance() {
        return this.id;
    }

}
