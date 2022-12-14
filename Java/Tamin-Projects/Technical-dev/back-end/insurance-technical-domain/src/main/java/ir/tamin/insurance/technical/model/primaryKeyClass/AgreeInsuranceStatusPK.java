/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package ir.tamin.insurance.technical.model.primaryKeyClass;

import java.io.Serializable;
import java.util.Objects;

;

/**
 *
 * @author s_naghavi
 */
public class AgreeInsuranceStatusPK implements Serializable{
     private String agreementCategoryId;

    private String insuranceStatusCode;
    
    public AgreeInsuranceStatusPK(String agreementCategoryId, String activityCode) {
        this.agreementCategoryId = agreementCategoryId;
        this.insuranceStatusCode = activityCode;
    }

    public String getAgreementCategoryId() {
        return agreementCategoryId;
    }

    public void setAgreementCategoryId(String agreementCategoryId) {
        this.agreementCategoryId = agreementCategoryId;
    }

    public String getInsuranceStatusCode() {
        return insuranceStatusCode;
    }

    public void setInsuranceStatusCode(String insuranceStatusCode) {
        this.insuranceStatusCode = insuranceStatusCode;
    }    

     @Override
    public int hashCode() {
        int hash = 5;
        hash = 71 * hash + Objects.hashCode(this.agreementCategoryId);
        hash = 71 * hash + Objects.hashCode(this.insuranceStatusCode);
        return hash;
    }

    @Override
    public boolean equals(Object obj) {
        if (this == obj) {
            return true;
        }
        if (obj == null) {
            return false;
        }
        if (getClass() != obj.getClass()) {
            return false;
        }
        final AgreeInsuranceStatusPK other = (AgreeInsuranceStatusPK) obj;
        return true;
    }
     @Override
    public String toString() {
        return "AgreeInsuranceStatusPK{" + "agreementCategoryId=" + agreementCategoryId + ", insuranceStatusCode=" + insuranceStatusCode + '}';
    }

    
    
}
