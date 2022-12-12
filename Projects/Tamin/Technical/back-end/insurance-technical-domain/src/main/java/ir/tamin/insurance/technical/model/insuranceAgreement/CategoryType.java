/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package ir.tamin.insurance.technical.model.insuranceAgreement;

import ir.tamin.framework.domain.AbstractEntity;
import ir.tamin.framework.ws.rest.repository.annotation.RESTResource;
import ir.tamin.framework.ws.rest.repository.annotation.ResourceId;
import ir.tamin.framework.ws.rest.repository.annotation.ResourceIds;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name = "tb_category_types")
@RESTResource
//@RESTResource(lookupProxy = "ir.tamin.insurance.technical.business.insuranceAgreement.RefundSpecProxy")
@ResourceIds({
    @ResourceId(fields = {"categoryTypeCode"})})
//@NamedQueries({
//    @NamedQuery(name = "AgreeAcctivity.countAllowedWorkshop", query = "select count(w) from AgreeActivity a,Workshop w  where a.agreementCategoryId=:agreementCategoryId and w.workshopId=:workshopId")// and a.activityCode= w.actitvityCode
//})
public class CategoryType extends AbstractEntity<String> {

    //کد دسته بندي نوع بيمه
    @Id
    @Column(name = "CATEGORY_TYPE_CODE", nullable = false)
    private String categoryTypeCode;
    
    // بيمه شدگان خاص شرح دسته بندي نوع بيمه
    @Column(name = "CATEGORY_TYPE_DESC", nullable = false)
    private String categoryTypeDesc;
    
    //وضعيت
    @Column(name = "STATUS", nullable = false)
    private String status;
    


    public String getCategoryTypeCode() {
        return categoryTypeCode;
    }

    public void setCategoryTypeCode(String categoryTypeCode) {    
        this.categoryTypeCode = categoryTypeCode;
    }

    public String getCategoryTypeDesc() {
        return categoryTypeDesc;
    }

    public void setCategoryTypeDesc(String categoryTypeDesc) {      
        this.categoryTypeDesc = categoryTypeDesc;
    }
   
    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    @Override
    public String getIdentifierInstance() {
        return categoryTypeCode;        
    }

}
