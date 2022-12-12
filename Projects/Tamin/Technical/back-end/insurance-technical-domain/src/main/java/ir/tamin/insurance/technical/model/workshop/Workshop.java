/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package ir.tamin.insurance.technical.model.workshop;

import ir.tamin.framework.domain.AbstractEntity;
import ir.tamin.framework.ws.rest.repository.annotation.RESTResource;
import ir.tamin.framework.ws.rest.repository.annotation.ResourceId;
import ir.tamin.framework.ws.rest.repository.annotation.ResourceIds;
import ir.tamin.insurance.technical.model.primaryKeyClass.WorkshopPK;

import javax.persistence.*;
import javax.validation.constraints.Size;
import java.io.Serializable;

/**
 * @author h_poursafar
 */
@Entity
@Table(name = "REGWORKSHOPSPEC")
@IdClass(WorkshopPK.class)
@RESTResource(lookupProxy = "ir.tamin.insurance.technical.business.workshop.WorkshopManager")
@ResourceIds({
    @ResourceId(fields = {"workshopId", "branchCode"})})
@NamedQueries({
    @NamedQuery(name = "Workshop.AllowedWorkshop", query = "select w from AgreeActivity a,Workshop w  where a.agreementCategoryId=:agreementCategoryId") ,// and a.activityCode= w.actitvityCode
    @NamedQuery(name = "Workshop.AllowedWorkshopBySubCode", query = "select w from Workshop w  where SUBSTRING(w.workshopId,4,3)=:workshopSubCode and w.branchCode =:branchCode") 
})
public class Workshop extends AbstractEntity<WorkshopPK> implements Serializable {

    @Id
    @Size(max = 10)
    @Column(name = "RWSHID", length = 10, nullable = false)
    private String workshopId;

    @Id
    @Column(name = "BRCH_CODE", length = 4)
    @Size(max = 4)
    private String branchCode;

    @Column(name = "RWSHNAME", length = 100)
    @Size(max = 100)
    private String workshopName;

    @Column(name = "RWSHAPPROVDATE", length = 8)
    @Size(max = 8)
    private String workshopApproveDate;

    @OneToOne
    @JoinColumn(name = "ACTIVITYCODE", referencedColumnName = "ACTIVITYCODE")
    private Activity activity;

    @Column(name = "WSHRATECODE")
    @Size(max = 2)
    private String workshopRateCode;

    public String getWorkshopId() {
        return workshopId;
    }

    public Workshop(String workshopId, String branchCode) {
        this.workshopId = workshopId;
        this.branchCode = branchCode;
    }

    public Workshop() {
    }

    public void setWorkshopId(String workshopId) {
        this.workshopId = workshopId;
    }

    public String getWorkshopName() {
        return workshopName;
    }

    public void setWorkshopName(String workshopName) {
        this.workshopName = workshopName;
    }

    public String getWorkshopApproveDate() {
        return workshopApproveDate;
    }

    public void setWorkshopApproveDate(String workshopApproveDate) {
        this.workshopApproveDate = workshopApproveDate;
    }

    public Activity getActivity() {
        return activity;
    }

    public void setActivity(Activity activity) {
        this.activity = activity;
    }

    public String getBranchCode() {
        return branchCode;
    }

    public void setBranchCode(String branchCode) {
        this.branchCode = branchCode;
    }

    public String getWorkshopRateCode() {
        return workshopRateCode;
    }

    public void setWorkshopRateCode(String workshopRateCode) {
        this.workshopRateCode = workshopRateCode;
    }

    @Override
    public WorkshopPK getIdentifierInstance() {
        return new WorkshopPK(this.workshopId, this.branchCode);
    }
}
