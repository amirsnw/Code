
package ir.tamin.incomeBank.service.asnad.webservice.authentication;

import javax.xml.bind.annotation.XmlAccessType;
import javax.xml.bind.annotation.XmlAccessorType;
import javax.xml.bind.annotation.XmlElement;
import javax.xml.bind.annotation.XmlRootElement;
import javax.xml.bind.annotation.XmlType;


/**
 * <p>Java class for anonymous complex type.
 * 
 * <p>The following schema fragment specifies the expected content contained within this class.
 * 
 * <pre>
 * &lt;complexType>
 *   &lt;complexContent>
 *     &lt;restriction base="{http://www.w3.org/2001/XMLSchema}anyType">
 *       &lt;sequence>
 *         &lt;element name="GetValidationCodeResult" type="{http://www.w3.org/2001/XMLSchema}boolean"/>
 *         &lt;element name="Validate_Code" type="{http://www.w3.org/2001/XMLSchema}string" minOccurs="0"/>
 *       &lt;/sequence>
 *     &lt;/restriction>
 *   &lt;/complexContent>
 * &lt;/complexType>
 * </pre>
 * 
 * 
 */
@XmlAccessorType(XmlAccessType.FIELD)
@XmlType(name = "", propOrder = {
    "getValidationCodeResult",
    "validateCode"
})
@XmlRootElement(name = "GetValidationCodeResponse")
public class GetValidationCodeResponse {

    @XmlElement(name = "GetValidationCodeResult")
    protected boolean getValidationCodeResult;
    @XmlElement(name = "Validate_Code")
    protected String validateCode;

    /**
     * Gets the value of the getValidationCodeResult property.
     * 
     */
    public boolean isGetValidationCodeResult() {
        return getValidationCodeResult;
    }

    /**
     * Sets the value of the getValidationCodeResult property.
     * 
     */
    public void setGetValidationCodeResult(boolean value) {
        this.getValidationCodeResult = value;
    }

    /**
     * Gets the value of the validateCode property.
     * 
     * @return
     *     possible object is
     *     {@link String }
     *     
     */
    public String getValidateCode() {
        return validateCode;
    }

    /**
     * Sets the value of the validateCode property.
     * 
     * @param value
     *     allowed object is
     *     {@link String }
     *     
     */
    public void setValidateCode(String value) {
        this.validateCode = value;
    }

}
