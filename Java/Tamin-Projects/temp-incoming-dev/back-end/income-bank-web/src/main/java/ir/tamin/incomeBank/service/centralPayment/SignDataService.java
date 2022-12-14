/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package ir.tamin.incomeBank.service.centralPayment;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.ObjectWriter;
import ir.co.pki.jpktb.CertificateStatus;
import java.util.logging.Level;
import java.util.logging.Logger;
import javax.ejb.Stateless;
import javax.ws.rs.WebApplicationException;
import javax.ws.rs.core.Response;

import ir.co.pki.jpktb.Crypto;
import ir.co.pki.jpktb.VAClient;
import ir.tamin.incomeBank.model.centralPayment.sign.SignVerifyResult;
import ir.tamin.incomeBank.util.TextUtils;
import ir.tamin.framework.cdi.util.WebProperties;
import ir.tamin.framework.core.util.Bundle;
import java.io.UnsupportedEncodingException;
import java.security.Principal;
import java.security.cert.X509Certificate;
import javax.inject.Inject;

/**
 *
 * @author s_maknooni
 */
@Stateless
public class SignDataService<T> {

    private Crypto crypto;
    private VAClient vAClient;

    @Inject
    @WebProperties
    Bundle webBundle;

    private Crypto getCryptoObject() {

        try {
            if (crypto == null) {
                crypto = new Crypto(webBundle.getProperty("pktb.xml.address"));
            }
            return crypto;

        } catch (Exception ex) {
            Logger.getLogger(SignDataService.class.getName()).log(Level.SEVERE, null, ex);
            Response response = Response.status(Response.Status.INTERNAL_SERVER_ERROR).entity("خطا در ساخت آبجکت Crypto").build();
            throw new WebApplicationException(response);

        }
    }

    private VAClient getVAClientObject() {
        try {
            if (vAClient == null) {
                vAClient = new VAClient(webBundle.getProperty("pktb.xml.address"));
            }
            return vAClient;

        } catch (Exception ex) {
            Logger.getLogger(SignDataService.class.getName()).log(Level.SEVERE, null, ex);
            Response response = Response.status(Response.Status.INTERNAL_SERVER_ERROR).entity("خطا در ساخت آبجکت VAClient").build();
            throw new WebApplicationException(response);

        }
    }

    public String convertSignedModelToBase64(T dataModel) throws JsonProcessingException, WebApplicationException {

        ObjectWriter ow = new ObjectMapper().writer().withDefaultPrettyPrinter();
        String jsonString = ow.writeValueAsString(dataModel);
//        jsonString = jsonString.replaceAll(" ", "");
        String b64DataEncrypt = "";
        try {
            b64DataEncrypt = convertStringToBase64(jsonString);
        } catch (WebApplicationException wex) {
            throw wex;
        }
        return b64DataEncrypt;
    }

    public String convertStringToBase64(String value) {

        String hash = TextUtils.getMD5(value);
        String b64DataEncrypt;
        try {
            b64DataEncrypt = getCryptoObject().unicodeToBase64(hash);
        } catch (UnsupportedEncodingException ex) {
            Logger.getLogger(SignDataService.class.getName()).log(Level.SEVERE, null, ex);
            return "";
        } catch (WebApplicationException wex) {
            throw wex;
        } catch (Exception ex) {
            String message = "خطا در تبدیل داده رشته ای به فرمت Base64";
            Logger.getLogger(SignDataService.class.getName()).log(Level.SEVERE, message, ex);
            Response response = Response.status(Response.Status.INTERNAL_SERVER_ERROR).entity(message).build();
            throw new WebApplicationException(response);
        }

        return b64DataEncrypt;
    }

    public SignVerifyResult verifySign(String sign, String dataInBase64, String userName) throws JsonProcessingException, Exception {
        // 1- check map between Doctor and certificate (check national code)
        // 2- cmsVerify
        // 3- validateCertificate
        // 4- check OCSP or CRL

//        String dataInBase64 = convertSignedModelToBase64(dataModel);
        X509Certificate[] x509Certificate = null;
        try {
            x509Certificate = getCryptoObject().cmsExtractCertificates((String) sign);

        } catch (Exception ex) {
            Logger.getLogger(SignDataService.class
                    .getName()).log(Level.SEVERE, null, ex);
            Response response = Response.status(Response.Status.INTERNAL_SERVER_ERROR).entity("خطا در واکشی گواهینامه از امضای دیجیتال").build();

            throw new WebApplicationException(response);
        }
        X509Certificate cert = x509Certificate[0];

        SignVerifyResult resulu = new SignVerifyResult();
        // 1- check map between Doctor and certificate (check national code)
        boolean mapCheckingResult = doctorAndCertMapChecking(cert, userName);
        if (!mapCheckingResult) {
            resulu.setMapCheckResult(false);
            return resulu;
        }
        // 2- cmsVerify
        boolean cmsVerifyResult = cmsVerify(sign, dataInBase64);
        if (!cmsVerifyResult) {
            resulu.setCmsVerifyResult(false);
            return resulu;
        }
        // 3- validateCertificate
        boolean validateCertificateResult = validateCertificate(cert);
        if (!validateCertificateResult) {
            resulu.setValidateCertificateResult(false);
            return resulu;
        }

//        // 4- check OCSP or CRL
//        boolean ocspOrCRLCheckResult = validateCertificateByOCSPOrCRL(cert);
//        if (!ocspOrCRLCheckResult) {
//            resulu.setOcspOrCRLCheckResult(false);
//            return resulu;
//        }

        return resulu;
    }

    private boolean doctorAndCertMapChecking(X509Certificate cert, String userName) throws Exception {
        Principal dN;
        try {
            dN = cert.getSubjectDN();
            String dNName = dN.getName();
            if (!dNName.substring(4, 14).equals(userName)) {
                return false;
            }
            return true;

        } catch (Error | Exception e) {
            String message = "خطا در واکشی کد ملی ازگواهینامه ";
            Logger.getLogger(SignDataService.class.getName()).log(Level.SEVERE, message, e);
            Response response = Response.status(Response.Status.INTERNAL_SERVER_ERROR).entity(message).build();
            throw new WebApplicationException(response);
        }
    }

    private boolean cmsVerify(String sign, String dataInBase64) {
        try {
            boolean verify = getCryptoObject().cmsVerify((String) sign, (String) dataInBase64);

            if (!verify) {
                return false;
            }
            return true;

        } catch (Exception ex) {
            String message = "خطا در تصدیق امضای دیجیتال";
            Logger.getLogger(SignDataService.class.getName()).log(Level.SEVERE, message, ex);
            Response response = Response.status(Response.Status.INTERNAL_SERVER_ERROR).entity(message).build();
            throw new WebApplicationException(response);
        }

    }

    private boolean validateCertificate(X509Certificate cert) {
        try {
            boolean validate = getVAClientObject().validateCertificate(cert);

            if (!validate) {
                return false;
            }
            return true;

        } catch (Error | Exception e) {
            String message = "خطا در بررسی امضای دیجیتال و تاریخ اعتبار گواهینامه";
            Logger.getLogger(SignDataService.class.getName()).log(Level.SEVERE, message, e);
            Response response = Response.status(Response.Status.INTERNAL_SERVER_ERROR).entity(message).build();
            throw new WebApplicationException(response);
        }

    }

    private boolean validateCertificateByOCSPOrCRL(X509Certificate cert) {
        try {
            boolean validateOCSP = validateCertificateByOCSP(cert);
            if (!validateOCSP) {
                return false;
            }
            return true;

        } catch (Exception e) {
            try {
                //check CRL
                boolean crlCheckResult = validateCertificateByCRL(cert);
                if (!crlCheckResult) {
                    return false;
                }
                return true;
            } catch (WebApplicationException wex) {
                throw wex;
            }

        }
    }

    private boolean validateCertificateByOCSP(X509Certificate cert) {
        try {
            String profileName = webBundle.getProperty("pktb.vaProfile.name");
            CertificateStatus validationResult = getVAClientObject().validateCertificateByOCSP(cert, profileName);
            String resultMessageValidateOCSP = "Result:" + validationResult;
            if (resultMessageValidateOCSP.equalsIgnoreCase("Result:Good")) {
                return true;
            } else {
                return false;
            }

        } catch (Exception ex) {
            String message = "خطا در بررسی وضعیت گواهینامه با سرویس استعلام آنلاین وضعیت گواهینامه ) OCSP )";
            Logger.getLogger(SignDataService.class.getName()).log(Level.SEVERE, message, ex);
            Response response = Response.status(Response.Status.INTERNAL_SERVER_ERROR).entity(message).build();
            throw new WebApplicationException(response);
        }
    }

    private boolean validateCertificateByCRL(X509Certificate cert) {
        String profileName = webBundle.getProperty("pktb.vaProfile.name");
        try {
            boolean validationCrlResult = getVAClientObject().validateCertificateByCRL(cert, profileName);

            if (!validationCrlResult) {
                return false;
            }
            return true;

        } catch (Exception ex) {
            String message = "خطا در بررسی وضعیت گواهینامه با لیست گواهینامه باطله ) CRL ";
            Logger
                    .getLogger(SignDataService.class
                            .getName()).log(Level.SEVERE, message, ex);
            Response response = Response.status(Response.Status.INTERNAL_SERVER_ERROR).entity(message).build();

            throw new WebApplicationException(response);
        }

    }

    public boolean parsSignVerifyResult(SignVerifyResult signVerifyResult) {
        Response response = null;
        String message = "";
        if (!signVerifyResult.isMapCheckResult()) {
            message = "کاربر محترم، کارت متصل به سیستم متعلق به شما نمیباشد و به همین جهت امکان ثبت اطلاعات وجود ندارد.لطفا با کارت خود مجددا اقدام نمایید";
            Logger
                    .getLogger(SignDataService.class
                            .getName()).log(Level.SEVERE, message);
            response = Response.status(Response.Status.INTERNAL_SERVER_ERROR).entity(message).build();
        } else if (!signVerifyResult.isCmsVerifyResult()) {
            message = "کاربر محترم ، امضا دیجیتال ارسال شده معتبر نمیباشد و به همین جهت امکان ثبت اطلاعات وجود ندارد.";
            Logger
                    .getLogger(SignDataService.class
                            .getName()).log(Level.SEVERE, message);
            response = Response.status(Response.Status.INTERNAL_SERVER_ERROR).entity(message).build();
        } else if (!signVerifyResult.isValidateCertificateResult()) {
            message = "کاربر محترم ، گواهی شما معتبر نمیباشد و همین جهت امکان ثبت اطلاعات وجود ندارد.";
            Logger
                    .getLogger(SignDataService.class
                            .getName()).log(Level.SEVERE, message);
            response = Response.status(Response.Status.INTERNAL_SERVER_ERROR).entity(message).build();
        } else if (!signVerifyResult.isOcspOrCRLCheckResult()) {
            message = "کاربر محترم، گواهی شما باطل شده است و به همین جهت امکان ثبت اطلاعات وجود ندارد.";
            Logger
                    .getLogger(SignDataService.class
                            .getName()).log(Level.SEVERE, message);
            response = Response.status(Response.Status.INTERNAL_SERVER_ERROR).entity(message).build();
        } else {
            return true;
        }

        throw new WebApplicationException(response);

    }
}
