
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
 *         &lt;element name="CheckValidationCodeResult" type="{http://www.w3.org/2001/XMLSchema}boolean"/>
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
    "checkValidationCodeResult"
})
@XmlRootElement(name = "CheckValidationCodeResponse")
public class CheckValidationCodeResponse {

    @XmlElement(name = "CheckValidationCodeResult")
    protected boolean checkValidationCodeResult;

    /**
     * Gets the value of the checkValidationCodeResult property.
     * 
     */
    public boolean isCheckValidationCodeResult() {
        return checkValidationCodeResult;
    }

    /**
     * Sets the value of the checkValidationCodeResult property.
     * 
     */
    public void setCheckValidationCodeResult(boolean value) {
        this.checkValidationCodeResult = value;
    }

}
