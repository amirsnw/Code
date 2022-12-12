package ir.tamin.insurance.technical.model.primaryKeyClass;

import java.io.Serializable;

/**
 * Created by na_chabok on 10/9/2019.
 */
public class EntPayStatusPK  implements Serializable {
    private String branchCode;
    private String entReqNo;
    private String debitSubCode;

    public EntPayStatusPK() {
    }

    public EntPayStatusPK(String branchCode, String entReqNo, String debitSubCode) {
        this.branchCode = branchCode;
        this.entReqNo = entReqNo;
        this.debitSubCode = debitSubCode;
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

    public String getDebitSubCode() {
        return debitSubCode;
    }

    public void setDebitSubCode(String debitSubCode) {
        this.debitSubCode = debitSubCode;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;

        EntPayStatusPK that = (EntPayStatusPK) o;

        if (branchCode != null ? !branchCode.equals(that.branchCode) : that.branchCode != null) return false;
        if (entReqNo != null ? !entReqNo.equals(that.entReqNo) : that.entReqNo != null) return false;
        return debitSubCode != null ? debitSubCode.equals(that.debitSubCode) : that.debitSubCode == null;
    }

    @Override
    public int hashCode() {
        int result = branchCode != null ? branchCode.hashCode() : 0;
        result = 31 * result + (entReqNo != null ? entReqNo.hashCode() : 0);
        result = 31 * result + (debitSubCode != null ? debitSubCode.hashCode() : 0);
        return result;
    }

    @Override
    public String toString() {
        return "EntPayStatusPK{" +
                "branchCode='" + branchCode + '\'' +
                ", entReqNo='" + entReqNo + '\'' +
                ", debitSubCode='" + debitSubCode + '\'' +
                '}';
    }
}
