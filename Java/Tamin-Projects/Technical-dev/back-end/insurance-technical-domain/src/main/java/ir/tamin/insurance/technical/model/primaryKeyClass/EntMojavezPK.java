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
public class EntMojavezPK implements Serializable {

    private String ostanReqNo;
    private String entReqNo;
    private String mojRow;
    private String branchCode;

    public EntMojavezPK(String ostanReqNo, String entReqNo, String mojRow, String branchCode) {
        this.ostanReqNo = ostanReqNo;
        this.entReqNo = entReqNo;
        this.mojRow = mojRow;
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

    public String getMojRow() {
        return mojRow;
    }

    public void setMojRow(String mojRow) {
        this.mojRow = mojRow;
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
        hash = 59 * hash + Objects.hashCode(this.ostanReqNo);
        hash = 59 * hash + Objects.hashCode(this.entReqNo);
        hash = 59 * hash + Objects.hashCode(this.mojRow);
        hash = 59 * hash + Objects.hashCode(this.branchCode);
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
        final EntMojavezPK other = (EntMojavezPK) obj;
        if (!Objects.equals(this.ostanReqNo, other.ostanReqNo)) {
            return false;
        }
        if (!Objects.equals(this.entReqNo, other.entReqNo)) {
            return false;
        }
        if (!Objects.equals(this.mojRow, other.mojRow)) {
            return false;
        }
        if (!Objects.equals(this.branchCode, other.branchCode)) {
            return false;
        }
        return true;
    }

    @Override
    public String toString() {
        return "EntMojavezPK{" + "ostanReqNo=" + ostanReqNo + ", entReqNo=" + entReqNo + ", mojRow=" + mojRow + ", branchCode=" + branchCode + '}';
    }

}
