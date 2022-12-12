package ir.tamin.insurance.technical.model.primaryKeyClass;

import java.io.Serializable;
import java.util.Objects;

/**
 *
 * @author m_hoseini
 */
public class ContractPK implements Serializable {

    private String workshopId;
    private String contractRow;
    private String branchCode;
    private String contractSequence;

    public ContractPK() {
    }

    public ContractPK(String workshopId, String contractRow, String branchCode, String contractSequence) {
        this.workshopId = workshopId;
        this.contractRow = contractRow;
        this.branchCode = branchCode;
        this.contractSequence = contractSequence;
    }

    public String getWorkshopId() {
        return workshopId;
    }

    public void setWorkshopId(String workshopId) {
        this.workshopId = workshopId;
    }

    public String getContractRow() {
        return contractRow;
    }

    public void setContractRow(String contractRow) {
        this.contractRow = contractRow;
    }

    public String getBranchCode() {
        return branchCode;
    }

    public void setBranchCode(String branchCode) {
        this.branchCode = branchCode;
    }

    public String getContractSequence() {
        return contractSequence;
    }

    public void setContractSequence(String contractSequence) {
        this.contractSequence = contractSequence;
    }
    
    @Override
    public boolean equals(Object obj) {
        if (obj == null) {
            return false;
        }
        if (getClass() != obj.getClass()) {
            return false;
        }
        final ContractPK other = (ContractPK) obj;
        if (!Objects.equals(this.workshopId, other.workshopId)) {
            return false;
        }
        if (!Objects.equals(this.contractRow, other.contractRow)) {
            return false;
        }
        if (!Objects.equals(this.branchCode, other.branchCode)) {
            return false;
        }
        if (!Objects.equals(this.contractSequence, other.contractSequence)) {
            return false;
        }
        return true;
    }


    @Override
    public int hashCode() {
        int hash = 3;
        hash = 29 * hash + Objects.hashCode(this.workshopId);
        hash = 29 * hash + Objects.hashCode(this.contractRow);
        hash = 29 * hash + Objects.hashCode(this.branchCode);
        hash = 29 * hash + Objects.hashCode(this.contractSequence);
        return hash;
    }
   
    
}
