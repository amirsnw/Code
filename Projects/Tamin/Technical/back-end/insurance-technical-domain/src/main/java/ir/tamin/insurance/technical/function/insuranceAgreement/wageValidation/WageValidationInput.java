package ir.tamin.insurance.technical.function.insuranceAgreement.wageValidation;

import ir.tamin.framework.domain.function.DBFunctionInput;

/**
 *
 * @author m_hoseini
 */

public class WageValidationInput implements DBFunctionInput {

    private String pCategoryTypeCode;
    private String pInsurTypeCode;
    private String pItem1Value;//تاريخ ثبت معرفينامه
    private String pItem2Value;//کدملي
    private String pItem3Value;//شماره بيمه
    private Long pItem4Value;//تعداد روز سابقه
    private String pItem5Value;//جنسيت
    private String pItem6Value;// سن

    public WageValidationInput() {
    }

    public WageValidationInput(String pCategoryTypeCode, String pInsurTypeCode, String pItem1Value, String pItem2Value, String pItem3Value, Long pItem4Value, String pItem5Value, String pItem6Value) {
        this.pCategoryTypeCode = pCategoryTypeCode;
        this.pInsurTypeCode = pInsurTypeCode;
        this.pItem1Value = pItem1Value;
        this.pItem2Value = pItem2Value;
        this.pItem3Value = pItem3Value;
        this.pItem4Value = pItem4Value;
        this.pItem5Value = pItem5Value;
        this.pItem6Value = pItem6Value;
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

    public String getpItem1Value() {
        return pItem1Value;
    }

    public void setpItem1Value(String pItem1Value) {
        this.pItem1Value = pItem1Value;
    }

    public String getpItem2Value() {
        return pItem2Value;
    }

    public void setpItem2Value(String pItem2Value) {
        this.pItem2Value = pItem2Value;
    }

    public String getpItem3Value() {
        return pItem3Value;
    }

    public void setpItem3Value(String pItem3Value) {
        this.pItem3Value = pItem3Value;
    }

    public Long getpItem4Value() {
        return pItem4Value;
    }

    public void setpItem4Value(Long pItem4Value) {
        this.pItem4Value = pItem4Value;
    }

    public String getpItem5Value() {
        return pItem5Value;
    }

    public void setpItem5Value(String pItem5Value) {
        this.pItem5Value = pItem5Value;
    }

    public String getpItem6Value() {
        return pItem6Value;
    }

    public void setpItem6Value(String pItem6Value) {
        this.pItem6Value = pItem6Value;
    }
    
   
   

    
}
