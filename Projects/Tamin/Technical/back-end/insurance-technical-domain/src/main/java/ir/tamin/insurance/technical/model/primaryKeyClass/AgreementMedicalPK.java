package ir.tamin.insurance.technical.model.primaryKeyClass;

import java.io.Serializable;
import java.util.Objects;

/**
 *
 * @author m_hoseini
 */
public class AgreementMedicalPK implements Serializable {

    private String medicalRequestId;
    private String nationalCode;
    private String insuranceAgreementRequest;

    public AgreementMedicalPK() {
    }

    public AgreementMedicalPK(String medicalRequestId, String nationalCode, String requestId) {
        this.medicalRequestId = medicalRequestId;
        this.nationalCode = nationalCode;
        this.insuranceAgreementRequest = requestId;
    }

    public String getMedicalRequestId() {
        return medicalRequestId;
    }

    public void setMedicalRequestId(String medicalRequestId) {
        this.medicalRequestId = medicalRequestId;
    }

    public String getNationalCode() {
        return nationalCode;
    }

    public void setNationalCode(String nationalCode) {
        this.nationalCode = nationalCode;
    }

    public String getInsuranceAgreementRequest() {
        return insuranceAgreementRequest;
    }

    public void setInsuranceAgreementRequest(String insuranceAgreementRequest) {
        this.insuranceAgreementRequest = insuranceAgreementRequest;
    }
    

    @Override
    public boolean equals(Object obj) {
        if (obj == null) {
            return false;
        }
        if (getClass() != obj.getClass()) {
            return false;
        }
        final AgreementMedicalPK other = (AgreementMedicalPK) obj;
        if (!Objects.equals(this.medicalRequestId, other.medicalRequestId)) {
            return false;
        }
        if (!Objects.equals(this.nationalCode, other.nationalCode)) {
            return false;
        }
        if (!Objects.equals(this.insuranceAgreementRequest, other.insuranceAgreementRequest)) {
            return false;
        }
        return true;
    }

    @Override
    public int hashCode() {
        int hash = 3;
        hash = 29 * hash + Objects.hashCode(this.medicalRequestId);
        hash = 29 * hash + Objects.hashCode(this.nationalCode);
        hash = 29 * hash + Objects.hashCode(this.insuranceAgreementRequest);       
        return hash;
    }

}
