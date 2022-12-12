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
public class RegistrationInsuranceStatusPK implements Serializable {

    private String insuranceStatus;
    private RegInsuranceSpecPK insuranceRegisteration;
    private String rIsuStatOpDate;
    private String rIsuStatStartDate;

    public RegistrationInsuranceStatusPK(String insuranceStatus, RegInsuranceSpecPK insuranceRegisteration, String rIsuStatOpDate, String rIsuStatStartDate) {
        this.insuranceStatus = insuranceStatus;
        this.insuranceRegisteration = insuranceRegisteration;
        this.rIsuStatOpDate = rIsuStatOpDate;
        this.rIsuStatStartDate = rIsuStatStartDate;
    }
    
    public String getInsuranceStatus() {
        return insuranceStatus;
    }

    public void setInsuranceStatus(String insuranceStatus) {
        this.insuranceStatus = insuranceStatus;
    }

    public RegInsuranceSpecPK getInsuranceRegisteration() {
        return insuranceRegisteration;
    }

    public void setInsuranceRegisteration(RegInsuranceSpecPK insuranceRegisteration) {
        this.insuranceRegisteration = insuranceRegisteration;
    }

    public String getrIsuStatOpDate() {
        return rIsuStatOpDate;
    }

    public void setrIsuStatOpDate(String rIsuStatOpDate) {
        this.rIsuStatOpDate = rIsuStatOpDate;
    }

    public String getrIsuStatStartDate() {
        return rIsuStatStartDate;
    }

    public void setrIsuStatStartDate(String rIsuStatStartDate) {
        this.rIsuStatStartDate = rIsuStatStartDate;
    }

    @Override
    public int hashCode() {
        int hash = 5;
        hash = 79 * hash + Objects.hashCode(this.insuranceStatus);
        hash = 79 * hash + Objects.hashCode(this.insuranceRegisteration);
        hash = 79 * hash + Objects.hashCode(this.rIsuStatOpDate);
        hash = 79 * hash + Objects.hashCode(this.rIsuStatStartDate);
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
        final RegistrationInsuranceStatusPK other = (RegistrationInsuranceStatusPK) obj;
        if (!Objects.equals(this.insuranceStatus, other.insuranceStatus)) {
            return false;
        }
        if (!Objects.equals(this.rIsuStatOpDate, other.rIsuStatOpDate)) {
            return false;
        }
        if (!Objects.equals(this.rIsuStatStartDate, other.rIsuStatStartDate)) {
            return false;
        }
        if (!Objects.equals(this.insuranceRegisteration, other.insuranceRegisteration)) {
            return false;
        }
        return true;
    }

    @Override
    public String toString() {
        return "RegistrationInsuranceStatusPK{" + "insuranceStatus=" + insuranceStatus + ", insuranceRegisteration=" + insuranceRegisteration + ", rIsuStatOpDate=" + rIsuStatOpDate + ", rIsuStatStartDate=" + rIsuStatStartDate + '}';
    }

   
  

}
