package ir.tamin.insurance.technical.model.primaryKeyClass;

import java.io.Serializable;

/**
 *
 * @author m_hoseini
 */
public class RefundRelationPK implements Serializable {

    private String relationTypeCode;
    private String reasonCode;

    public RefundRelationPK() {
    }

    public RefundRelationPK(String relationTypeCode, String reasonCode) {
        this.relationTypeCode = relationTypeCode;
        this.reasonCode = reasonCode;
    }   
    

    public String getRelationTypeCode() {
        return relationTypeCode;
    }

    public void setRelationTypeCode(String relationTypeCode) {
        this.relationTypeCode = relationTypeCode;
    }

    public String getReasonCode() {
        return reasonCode;
    }

    public void setReasonCode(String reasonCode) {
        this.reasonCode = reasonCode;
    }
    
    @Override
    public String toString() {
        return "RefundRelationPK{"
                + "relationTypeCode='" + relationTypeCode + '\''              
                + ", reasonCode=" + reasonCode
                + '}';
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }

        RefundRelationPK that = (RefundRelationPK) o;

        if (relationTypeCode != null ? !relationTypeCode.equals(that.relationTypeCode) : that.relationTypeCode != null) {
            return false;
        }
        
        return reasonCode != null ? reasonCode.equals(that.reasonCode) : that.reasonCode == null;
    }

    @Override
    public int hashCode() {
        int result = relationTypeCode != null ? relationTypeCode.hashCode() : 0;
        result = 31 * result + (reasonCode != null ? reasonCode.hashCode() : 0);       
        return result;
    }

   
    
}
