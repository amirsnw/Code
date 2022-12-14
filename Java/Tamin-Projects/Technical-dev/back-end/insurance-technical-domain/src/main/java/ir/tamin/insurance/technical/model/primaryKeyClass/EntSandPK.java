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
public class EntSandPK implements Serializable {

    private String sandReqNo;
    private String entReqNo;
    private String branchCode;

    public EntSandPK(String sandReqNo, String entReqNo, String branchCode) {
        this.sandReqNo = sandReqNo;
        this.entReqNo = entReqNo;
        this.branchCode = branchCode;
    }

    public String getSandReqNo() {
        return sandReqNo;
    }

    public void setSandReqNo(String sandReqNo) {
        this.sandReqNo = sandReqNo;
    }

    public String getEntReqNo() {
        return entReqNo;
    }

    public void setEntReqNo(String entReqNo) {
        this.entReqNo = entReqNo;
    }

    public String getBranchCode() {
        return branchCode;
    }

    public void setBranchCode(String branchCode) {
        this.branchCode = branchCode;
    }

    @Override
    public int hashCode() {
        int hash = 7;
        hash = 67 * hash + Objects.hashCode(this.sandReqNo);
        hash = 67 * hash + Objects.hashCode(this.entReqNo);
        hash = 67 * hash + Objects.hashCode(this.branchCode);
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
        final EntSandPK other = (EntSandPK) obj;
        if (!Objects.equals(this.sandReqNo, other.sandReqNo)) {
            return false;
        }
        if (!Objects.equals(this.entReqNo, other.entReqNo)) {
            return false;
        }
        if (!Objects.equals(this.branchCode, other.branchCode)) {
            return false;
        }
        return true;
    }

    @Override
    public String toString() {
        return "EntSandPK{" + "sandReqNo=" + sandReqNo + ", entReqNo=" + entReqNo + ", branchCode=" + branchCode + '}';
    }
    
    
}
