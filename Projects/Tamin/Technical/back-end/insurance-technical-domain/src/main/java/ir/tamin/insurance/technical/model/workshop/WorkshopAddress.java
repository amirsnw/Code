package ir.tamin.insurance.technical.model.workshop;

import ir.tamin.framework.core.util.DateUtils;
import ir.tamin.framework.domain.AbstractEntity;
import ir.tamin.framework.ws.rest.repository.annotation.ResourceId;
import ir.tamin.framework.ws.rest.repository.annotation.ResourceIds;
import ir.tamin.insurance.technical.model.primaryKeyClass.WorkshopAddressPK;

import javax.persistence.*;
import javax.validation.constraints.Size;
import java.io.Serializable;
import java.util.Date;



/**
 *
 * @author h_mashal
 */
@Entity
@Table(name = "REGWORKSHOPADDRESS")
@IdClass(WorkshopAddressPK.class)
//@RESTResource(lookupProxy = "ir.tamin.insurance.technical.business.workshop.WorkshopAddressManager")
@ResourceIds({@ResourceId(fields = {"workshopId", "workshopDate", "workshopDropDate"})})
@NamedQueries({
        @NamedQuery(name = "WorkshopAddress.getAddress", query = "select wa.workShopAddress from WorkshopAddress wa where wa.workshopId = :rwshid and wa.workshopDropDate = (select max (rwshads.workshopDropDate) from WorkshopAddress rwshads where rwshads.workshopId = :rwshid)"
        )
})
public class WorkshopAddress extends AbstractEntity<WorkshopAddressPK> implements Serializable {

    @Id
    @Size(max = 10)
    @Column(name = "RWSHID", length = 10, nullable = false)
    private String workshopId;

    @Id
    @Size(max = 8)
    @Column(name = "rwshadrsdate", length = 8, nullable = false)
    private String workshopDate;

    @Id
    @Size(max = 7)
    @Column(name = "rwshadropdate", length = 7, nullable = false)
    private String workshopDropDate;

    @Column(name = "rwshadrdesc")
    private String workShopAddress;

    public String getWorkshopId() {
        return workshopId;
    }

    public void setWorkshopId(String workshopId) {
        this.workshopId = workshopId;
    }

    public Date getWorkshopDate() {
        return workshopDate == null ? null : DateUtils.parse(workshopDate, "yyyyMMdd");
    }

    public void setWorkshopDate(Date workshopDate) {
        if (workshopDate != null)
            this.workshopDate = DateUtils.encodeDateString(DateUtils.format(workshopDate, "yyyyMMdd"));
    }

    public Date getWorkshopDropDate() {
       return workshopDropDate == null ? null : DateUtils.parse(DateUtils.decodeDateString(workshopDropDate), "yyyyMMdd");

    }

    public void setWorkshopDropDate(Date workshopDropDate) {
        if (workshopDropDate != null)
            this.workshopDropDate = DateUtils.encodeDateString(DateUtils.format(workshopDropDate, "yyyyMMdd"));
    }

    public String getWorkShopAddress() {
        return workShopAddress;
    }

    public void setWorkShopAddress(String workShopAddress) {
        this.workShopAddress = workShopAddress;
    }

    @Override
    public WorkshopAddressPK getIdentifierInstance() {
        return new WorkshopAddressPK(workshopId, workshopDate, workshopDropDate);
    }
}
