/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package ir.tamin.insurance.technical.model.primaryKeyClass;

import java.io.Serializable;

/**
 *
 * @author s_naghavi
 */
public class AgreeActivityPK implements Serializable{
    
    private String agreementCategoryId;

    private String activityCode;
    
    public AgreeActivityPK(String agreementCategoryId, String activityCode) {
        this.agreementCategoryId = agreementCategoryId;
        this.activityCode = activityCode;
    }

    public String getAgreementCategoryId() {
        return agreementCategoryId;
    }

    public void setAgreementCategoryId(String agreementCategoryId) {
        this.agreementCategoryId = agreementCategoryId;
    }

    public String getActivityCode() {
        return activityCode;
    }

    public void setActivityCode(String activityCode) {
        this.activityCode = activityCode;
    }    

    @Override
    public boolean equals(Object obj) {
        return super.equals(obj); //To change body of generated methods, choose Tools | Templates.
    }

    @Override
    public int hashCode() {
        return super.hashCode(); //To change body of generated methods, choose Tools | Templates.
    }
    
    
    
    
}
