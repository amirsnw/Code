
package ir.tamin.incomeBank.service.daramadBank.webservice.centralAccount;

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
 *         &lt;element name="Send_LetterNResult" type="{http://www.w3.org/2001/XMLSchema}string" minOccurs="0"/>
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
    "sendLetterNResult"
})
@XmlRootElement(name = "Send_LetterNResponse")
public class SendLetterNResponse {

    @XmlElement(name = "Send_LetterNResult")
    protected String sendLetterNResult;

    /**
     * Gets the value of the sendLetterNResult property.
     * 
     * @return
     *     possible object is
     *     {@link String }
     *     
     */
    public String getSendLetterNResult() {
        return sendLetterNResult;
    }

    /**
     * Sets the value of the sendLetterNResult property.
     * 
     * @param value
     *     allowed object is
     *     {@link String }
     *     
     */
    public void setSendLetterNResult(String value) {
        this.sendLetterNResult = value;
    }

}
