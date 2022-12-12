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
 * @author p_pourjahani
 */
public class WorkshopPK implements Serializable {
    private String workshopId;
    private String branchCode;

    public WorkshopPK(String workshopId, String branchCode)
    {
        this.workshopId = workshopId;
        this.branchCode = branchCode;
    }
    public String getWorkshopId() {
        return workshopId;
    }

    public void setWorkshopId(String workshopId) {
        this.workshopId = workshopId;
    }

    public String getBrchCode() {
        return branchCode;
    }

    public void setBrchCode(String brchCode) {
        this.branchCode = brchCode;
    }
    
    @Override
    public int hashCode() {
        int hash = 3;
        hash = 79 * hash + Objects.hashCode(this.workshopId);
        return hash;
    }

    @Override
    public boolean equals(Object obj) {
        if (obj == null) {
            return false;
        }
        if (getClass() != obj.getClass()) {
            return false;
        }
        final WorkshopPK other = (WorkshopPK) obj;
        if (!Objects.equals(this.workshopId, other.workshopId)) {
            return false;
        }
        if (!Objects.equals(this.branchCode, other.branchCode)) {
            return false;
        }
        return true;
    }
}
