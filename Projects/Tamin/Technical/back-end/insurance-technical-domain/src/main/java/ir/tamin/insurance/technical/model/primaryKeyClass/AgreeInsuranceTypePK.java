/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package ir.tamin.insurance.technical.model.primaryKeyClass;

import java.io.Serializable;
import java.util.Objects;

/**
 *
 * @author s_naghavi
 */
public class AgreeInsuranceTypePK implements Serializable{

    private String agreementCategoryId;
    private String insuranceUserTypeCode;
    
    public AgreeInsuranceTypePK(String agreementCategoryId, String insuranceUserTypeCode) {
        this.agreementCategoryId = agreementCategoryId;
        this.insuranceUserTypeCode = insuranceUserTypeCode;
    }

    
    public String getAgreementCategoryId() {
        return agreementCategoryId;
    }

    public void setAgreementCategoryId(String agreementCategoryId) {
        this.agreementCategoryId = agreementCategoryId;
    }

    public String getInsuranceUserTypeCode() {
        return insuranceUserTypeCode;
    }

    public void setInsuranceUserTypeCode(String insuranceUserTypeCode) {
        this.insuranceUserTypeCode = insuranceUserTypeCode;
    }

    @Override
    public int hashCode() {
        int hash = 5;
        hash = 71 * hash + Objects.hashCode(this.agreementCategoryId);
        hash = 71 * hash + Objects.hashCode(this.insuranceUserTypeCode);
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
        final AgreeInsuranceTypePK other = (AgreeInsuranceTypePK) obj;
        return true;
    }
     @Override
    public String toString() {
        return "AgreeInsuranceTypePK{" + "agreementCategoryId=" + agreementCategoryId + ", insuranceUserTypeCode=" + insuranceUserTypeCode + '}';
    }

    
    
}
