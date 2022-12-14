/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package ir.tamin.incomeBank.model.centralPayment.sign;

/**
 *
 * @author s_maknooni
 */
public class SignVerifyResult {

    boolean mapCheckResult;
    boolean cmsVerifyResult;
    boolean validateCertificateResult;
    boolean ocspOrCRLCheckResult;

    public SignVerifyResult() {
        mapCheckResult = true;
        cmsVerifyResult = true;
        validateCertificateResult = true;
        ocspOrCRLCheckResult = true;
    }

    public boolean isMapCheckResult() {
        return mapCheckResult;
    }

    public void setMapCheckResult(boolean mapCheckResult) {
        this.mapCheckResult = mapCheckResult;
    }

    public boolean isCmsVerifyResult() {
        return cmsVerifyResult;
    }

    public void setCmsVerifyResult(boolean cmsVerifyResult) {
        this.cmsVerifyResult = cmsVerifyResult;
    }

    public boolean isValidateCertificateResult() {
        return validateCertificateResult;
    }

    public void setValidateCertificateResult(boolean validateCertificateResult) {
        this.validateCertificateResult = validateCertificateResult;
    }

    public boolean isOcspOrCRLCheckResult() {
        return ocspOrCRLCheckResult;
    }

    public void setOcspOrCRLCheckResult(boolean ocspOrCRLCheckResult) {
        this.ocspOrCRLCheckResult = ocspOrCRLCheckResult;
    }

}
