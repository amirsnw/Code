package ir.tamin.insurance.technical.model.insurance;

import ir.tamin.framework.core.util.DateUtils;
import ir.tamin.framework.ws.rest.repository.annotation.ResourceId;
import ir.tamin.framework.ws.rest.repository.annotation.ResourceIds;
import ir.tamin.insurance.technical.model.primaryKeyClass.RegInsAddressPK;

import javax.persistence.*;
import javax.validation.constraints.Size;

@Entity
@Table(name = "REGINSURDADDRESS")
@IdClass(RegInsAddressPK.class)
//@RESTResource(lookupProxy = "ir.tamin.insurance.technical.business.workshop.WorkshopAddressManager")
@ResourceIds({@ResourceId(fields = {"regInsId", "regInsDate", "regInsDropDate"})})
@NamedQueries({
        @NamedQuery(name = "RegInsAddress.getHomeAddress", query = "select wa.regInsAddress from RegistrationInsuranceAddress wa where wa.regInsId = :regInsId and wa.regInsDropDate = (select max (isuads.regInsDropDate) from RegistrationInsuranceAddress isuads where isuads.regInsId = :regInsId)"
        ),
        @NamedQuery(name = "RegInsAddress.getTel", query = "select wa.regInsTel from RegistrationInsuranceAddress wa where wa.regInsId = :regInsId and wa.regInsDropDate = (select max (isuads.regInsDropDate) from RegistrationInsuranceAddress isuads where isuads.regInsId = :regInsId)")
})
public class RegistrationInsuranceAddress {
    @Id
    @Size(max = 10)
    @Column(name = "risuid", length = 10, nullable = false)
    private String regInsId;

    @Id
    @Size(max = 8)
    @Column(name = "risuadrsdate", length = 8, nullable = false)
    private String regInsDate;

    @Id
    @Size(max = 7)
    @Column(name = "risuadropdate", length = 7, nullable = false)
    private String regInsDropDate;

    @Column(name = "risuadrdesc")
    private String regInsAddress;

    @Column(name = "risuadrtel")
    private String regInsTel;

    public String getRegInsId() {
        return regInsId;
    }

    public void setRegInsId(String regInsId) {
        this.regInsId = regInsId;
    }

    public String getRegInsDate() {
        return regInsDate;
    }

    public void setRegInsDate(String regInsDate) {
        this.regInsDate = regInsDate;
    }

    public String getRegInsDropDate() {
        if (regInsDropDate != null)
            DateUtils.decodeDateString(regInsDropDate);
        return null;
    }

    public void setRegInsDropDate(String regInsDropDate) {
        if (regInsDropDate == null)
            return;
        this.regInsDropDate = DateUtils.encodeDateString(regInsDropDate);
    }

    public String getRegInsAddress() {
        return regInsAddress;
    }

    public void setRegInsAddress(String regInsAddress) {
        this.regInsAddress = regInsAddress;
    }

    public String getRegInsTel() {
        return regInsTel;
    }

    public void setRegInsTel(String regInsTel) {
        this.regInsTel = regInsTel;
    }
}
