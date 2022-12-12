package ir.tamin.insurance.technical.model.primaryKeyClass;

import java.io.Serializable;
import java.util.Objects;

public class RegInsAddressPK implements Serializable {

    private String regInsId;
    private String regInsDate;
    private String regInsDropDate;

    public RegInsAddressPK(String regInsId, String regInsDate, String regInsDropDate){
        this.regInsId = regInsId;
        this.regInsDate = regInsDate;
        this.regInsDropDate = regInsDropDate;
    }

    public String getRegInsId() {
        return regInsId;
    }

    public void setRegInsId(String workshopId) {
        this.regInsId = workshopId;
    }

    public String getRegInsDate() {
        return regInsDate;
    }

    public void setRegInsDate(String workshopDate) {
        this.regInsDate = workshopDate;
    }

    public String getRegInsDropDate() {
        return regInsDropDate;
    }

    public void setRegInsDropDate(String workshopDropDate) {
        this.regInsDropDate = workshopDropDate;
    }

    @Override
    public int hashCode() {
        int hash = 3;
        hash = 79 * hash + Objects.hashCode(this.regInsId);
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

        final RegInsAddressPK other = (RegInsAddressPK) obj;

        return  Objects.equals(this.regInsId, other.regInsId)
                && Objects.equals(this.regInsDate, other.regInsDate)
                && Objects.equals(this.regInsDropDate, other.regInsDropDate);
    }
}
