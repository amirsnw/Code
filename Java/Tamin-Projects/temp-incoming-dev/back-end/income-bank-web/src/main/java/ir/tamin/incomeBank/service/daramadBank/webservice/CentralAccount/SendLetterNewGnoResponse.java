
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
 *         &lt;element name="Send_Letter_NewGnoResult" type="{http://www.w3.org/2001/XMLSchema}string" minOccurs="0"/>
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
    "sendLetterNewGnoResult"
})
@XmlRootElement(name = "Send_Letter_NewGnoResponse")
public class SendLetterNewGnoResponse {

    @XmlElement(name = "Send_Letter_NewGnoResult")
    protected String sendLetterNewGnoResult;

    /**
     * Gets the value of the sendLetterNewGnoResult property.
     * 
     * @return
     *     possible object is
     *     {@link String }
     *     
     */
    public String getSendLetterNewGnoResult() {
        return sendLetterNewGnoResult;
    }

    /**
     * Sets the value of the sendLetterNewGnoResult property.
     * 
     * @param value
     *     allowed object is
     *     {@link String }
     *     
     */
    public void setSendLetterNewGnoResult(String value) {
        this.sendLetterNewGnoResult = value;
    }

}
