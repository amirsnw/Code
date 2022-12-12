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
public class AgreementRequestPK implements Serializable {

    private String reqNo;
    private String branchCode;

    public AgreementRequestPK() {

    }

    public AgreementRequestPK(String reqNo, String branchCode) {
        this.reqNo = reqNo;
        this.branchCode = branchCode;
    }

    public String getReqNo() {
        return reqNo;
    }

    public void setReqNo(String reqNo) {
        this.reqNo = reqNo;
    }

    public String getBranchCode() {
        return branchCode;
    }

    public void setBranchCode(String branchCode) {
        this.branchCode = branchCode;
    }

    @Override
    public int hashCode() {
        int hash = 5;
        hash = 71 * hash + Objects.hashCode(this.reqNo);
        hash = 71 * hash + Objects.hashCode(this.branchCode);
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
        final AgreementRequestPK other = (AgreementRequestPK) obj;
        return true;
    }

    @Override
    public String toString() {
        return "AgreementRequestPK{" + "reqNo=" + reqNo + ", branchCode=" + branchCode + '}';
    }

}
