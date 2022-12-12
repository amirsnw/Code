package ir.tamin.insurance.technical.model.primaryKeyClass;

import java.io.Serializable;
import java.util.Objects;

public class RegInsuranceSpecPK implements Serializable {

    private String id;
    private String brchCode;

    public RegInsuranceSpecPK() {
    }

    public RegInsuranceSpecPK(String risuid, String brchCode) {
        this.id = risuid;
        this.brchCode = brchCode;
    }

    public String getRisuid() {
        return id;
    }

    public void setRisuid(String risuid) {
        this.id = risuid;
    }

    public String getBrchCode() {
        return brchCode;
    }

    public void setBrchCode(String brchCode) {
        this.brchCode = brchCode;
    }

    @Override
    public int hashCode() {
        int hash = 7;
        hash = 53 * hash + Objects.hashCode(this.id);
        hash = 53 * hash + Objects.hashCode(this.brchCode);
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
        final RegInsuranceSpecPK other = (RegInsuranceSpecPK) obj;
        if (!Objects.equals(this.id, other.id)) {
            return false;
        }
        if (!Objects.equals(this.brchCode, other.brchCode)) {
            return false;
        }
        return true;
    }

}
