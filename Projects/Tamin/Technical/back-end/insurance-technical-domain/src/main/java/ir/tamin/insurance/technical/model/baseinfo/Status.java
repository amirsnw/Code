/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package ir.tamin.insurance.technical.model.baseinfo;

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
 * @author p_tahmasbi uses by m_goharRiz
 */
@Entity
@Table(name = "BASE_STATUS")
@RESTResource()
@ResourceIds({@ResourceId(fields = {"id" })})
//@RESTResource(lookupProxy = "ir.tamin.insurance.list.business.Baseinfo.NationManager")
public class Status extends AbstractEntity<String> {

    private static final long serialVersionUID = 1L;

    @Id
    @Column(name = "ID")
    //   @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    private String id;

    @Column(name = "STATUS_DESC")
    private String statusDescription;


    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getStatusDescription() {
        return statusDescription;
    }

    public void setStatusDescription(String statusDescription) {
        this.statusDescription = statusDescription;
    }

    @Override
    public int hashCode() {
        int hash = 0;
        hash += (id != null ? id.hashCode() : 0);
        return hash;
    }

    @Override
    public boolean equals(Object object) {
        // TODO: Warning - this method won't work in the case the id fields are not set
        if (!(object instanceof Status)) {
            return false;
        }
        Status other = (Status) object;
        if ((this.id == null && other.id != null) || (this.id != null && !this.id.equals(other.id))) {
            return false;
        }
        return true;
    }

    @Override
    public String toString() {
        return "ir.tamin.insurance.technical.model.baseinfo.Status[ id=" + id + " ]";
    }

    @Override
    public String getIdentifierInstance() {
        return this.id;
    }
}
