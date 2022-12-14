package ir.tamin.incomeBank.model.baseinfo;

import javax.persistence.*;
import java.io.Serializable;

@Entity
@Table(name = "VWBRANCH")
public class BranchView implements Serializable {

    @Id
    @Column(name = "BRCH_CODE")
    private String brhCode;

    @Column(name = "BRCH_NAME")
    private String brhName;

    @Column(name = "EDKOL_CODE")
    private String edareCode;

    @Column(name = "EDKOL_NAME")
    private String edareName;

    @Column(name = "BRHKIND")
    private String brhKind;

    public String getBrhCode() {
        return brhCode;
    }

    public void setBrhCode(String brhCode) {
        this.brhCode = brhCode;
    }

    public String getBrhName() {
        return brhName;
    }

    public void setBrhName(String brhName) {
        this.brhName = brhName;
    }

    public String getEdareCode() {
        return edareCode;
    }

    public void setEdareCode(String edareCode) {
        this.edareCode = edareCode;
    }

    public String getEdareName() {
        return edareName;
    }

    public void setEdareName(String edareName) {
        this.edareName = edareName;
    }

    public String getBrhKind() {
        return brhKind;
    }

    public void setBrhKind(String brhKind) {
        this.brhKind = brhKind;
    }
}
