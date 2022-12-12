package ir.tamin.insurance.technical.model.insuranceAgreement;

import ir.tamin.framework.domain.AbstractEntity;
import ir.tamin.framework.ws.rest.repository.annotation.RESTResource;
import ir.tamin.framework.ws.rest.repository.annotation.ResourceId;
import ir.tamin.framework.ws.rest.repository.annotation.ResourceIds;

import javax.persistence.*;

@Entity
@Table(name = "TB_SPECIAL_GROUPS_TYPE")
@RESTResource(lookupProxy = "ir.tamin.insurance.technical.business.insuranceAgreement.SpecialGroupTypeManager")
@ResourceIds({
    @ResourceId(fields = {"specialGroupCode"})})
//@NamedQueries({
//    @NamedQuery(name = "AgreeAcctivity.countAllowedWorkshop", query = "select count(w) from AgreeActivity a,Workshop w  where a.agreementCategoryId=:agreementCategoryId and w.workshopId=:workshopId")// and a.activityCode= w.actitvityCode
//})
public class SpecialGroupType extends AbstractEntity<String> {
    
    //کد گروه بيمه ايي خاص
    @Id
    @Column(name = "SPECIAL_GROUPS_CODE", length = 2, nullable = false)   
    private String specialGroupCode;
    
    //نام گروه بيمه ايي خاص
    @Column(name = "SPECIAL_GROUPS_DESC", nullable = false)
    private String specialGroupDesc;
    
    //وضعيت
    @Column(name = "STATUS")
    private String status;  
    
    //معرفينامه 		اخذ شماره و تاريخ
    @Column(name = "GET_INTRODUCTION_INFO")
    private String introductionInfo;     
    
    //اخذ شماره و تاريخ  درخواست
    @Column(name = "GET_LETTER_INFO")
    private String requestInfo;  
    
    // دستمزد
    @Column(name = "GET_WAGE")
    private String wageInfo;  
    
    @Transient
    private String code;

    @Transient
    private String desc;
    
    @Transient
    private String activityCode;
    
    @Transient
    private String subCode;

    public String getIntroductionInfo() {
        return introductionInfo;
    }

    public void setIntroductionInfo(String introductionInfo) {
        this.introductionInfo = introductionInfo;
    }

    public String getRequestInfo() {
        return requestInfo;
    }

    public void setRequestInfo(String requestInfo) {
        this.requestInfo = requestInfo;
    }

    public String getWageInfo() {
        return wageInfo;
    }

    public void setWageInfo(String wageInfo) {
        this.wageInfo = wageInfo;
    }    

    public String getActivityCode() {
        return activityCode;
    }

    public void setActivityCode(String activityCode) {
        this.activityCode = activityCode;
    }

    public String getSubCode() {
        return subCode;
    }

    public void setSubCode(String subCode) {
        this.subCode = subCode;
    }

    public String getCode() {
        return specialGroupCode;
    }

    public void setCode(String specialGroupCode) {
        this.code = specialGroupCode;
    }

    public String getDesc() {
        return specialGroupDesc;
    }

    public void setDesc(String specialGroupDesc) {
        this.desc = specialGroupDesc;
    }

    public String getSpecialGroupCode() {
        return specialGroupCode;
    }

    public void setSpecialGroupCode(String specialGroupCode) {
        this.specialGroupCode = specialGroupCode;
    }

    public String getSpecialGroupDesc() {
        return specialGroupDesc;
    }

    public void setSpecialGroupDesc(String specialGroupDesc) {
        this.specialGroupDesc = specialGroupDesc;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    @Override
    public String getIdentifierInstance() {
        return specialGroupCode;
    }	


}
