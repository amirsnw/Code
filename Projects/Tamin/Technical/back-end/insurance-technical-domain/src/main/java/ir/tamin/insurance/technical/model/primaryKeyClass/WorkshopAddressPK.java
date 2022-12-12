package ir.tamin.insurance.technical.model.primaryKeyClass;

import java.io.Serializable;
import java.util.Objects;

public class WorkshopAddressPK implements Serializable {

    private String workshopId;
    private String workshopDate;
    private String workshopDropDate;

    public WorkshopAddressPK(String workshopId, String workshopDate, String workshopDropDate){
        this.workshopId = workshopId;
        this.workshopDate = workshopDate;
        this.workshopDropDate = workshopDropDate;
    }

    public String getWorkshopId() {
        return workshopId;
    }

    public void setWorkshopId(String workshopId) {
        this.workshopId = workshopId;
    }

    public String getWorkshopDate() {
        return workshopDate;
    }

    public void setWorkshopDate(String workshopDate) {
        this.workshopDate = workshopDate;
    }

    public String getWorkshopDropDate() {
        return workshopDropDate;
    }

    public void setWorkshopDropDate(String workshopDropDate) {
        this.workshopDropDate = workshopDropDate;
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

        final WorkshopAddressPK other = (WorkshopAddressPK) obj;

        return  Objects.equals(this.workshopId, other.workshopId)
                && Objects.equals(this.workshopDate, other.workshopDate)
                && Objects.equals(this.workshopDropDate, other.workshopDropDate);
    }
}
