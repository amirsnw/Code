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
public class EntProvincePK implements Serializable {

    private String ostanReqNo;
    private String entReqNo;
    private String branchCode;

    public EntProvincePK(String ostanReqNo, String entReqNo, String branchCode) {
        this.ostanReqNo = ostanReqNo;
        this.entReqNo = entReqNo;
        this.branchCode = branchCode;
    }

    public String getOstanReqNo() {
        return ostanReqNo;
    }

    public void setOstanReqNo(String ostanReqNo) {
        this.ostanReqNo = ostanReqNo;
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
        int hash = 3;
        hash = 29 * hash + Objects.hashCode(this.ostanReqNo);
        hash = 29 * hash + Objects.hashCode(this.entReqNo);
        hash = 29 * hash + Objects.hashCode(this.branchCode);
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
        final EntProvincePK other = (EntProvincePK) obj;
        if (!Objects.equals(this.ostanReqNo, other.ostanReqNo)) {
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
        return "EntProvincePK{" + "ostanReqNo=" + ostanReqNo + ", entReqNo=" + entReqNo + ", branchCode=" + branchCode + '}';
    }

}
