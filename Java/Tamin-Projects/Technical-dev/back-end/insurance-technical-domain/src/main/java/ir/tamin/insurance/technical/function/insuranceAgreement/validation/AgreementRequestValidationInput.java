package ir.tamin.insurance.technical.function.insuranceAgreement.validation;

import ir.tamin.framework.domain.function.DBFunctionInput;

public class AgreementRequestValidationInput implements DBFunctionInput {

    private String pCategoryTypeCode;
    private String pInsurTypeCode;
    private String pItemName;
    private String pItemValue;
   

    public AgreementRequestValidationInput() {
    }
    

    public AgreementRequestValidationInput(String pCategoryTypeCode, String pInsurTypeCode, String pItemName, String pItemValue) {
        this.pCategoryTypeCode = pCategoryTypeCode;
        this.pInsurTypeCode = pInsurTypeCode;
        this.pItemName = pItemName;
        this.pItemValue = pItemValue;
        
    }

    public String getpCategoryTypeCode() {
        return pCategoryTypeCode;
    }

    public void setpCategoryTypeCode(String pCategoryTypeCode) {
        this.pCategoryTypeCode = pCategoryTypeCode;
    }

    public String getpInsurTypeCode() {
        return pInsurTypeCode;
    }

    public void setpInsurTypeCode(String pInsurTypeCode) {
        this.pInsurTypeCode = pInsurTypeCode;
    }

    public String getpItemName() {
        return pItemName;
    }

    public void setpItemName(String pItemName) {
        this.pItemName = pItemName;
    }

    public String getpItemValue() {
        return pItemValue;
    }

    public void setpItemValue(String pItemValue) {
        this.pItemValue = pItemValue;
    }

   }
