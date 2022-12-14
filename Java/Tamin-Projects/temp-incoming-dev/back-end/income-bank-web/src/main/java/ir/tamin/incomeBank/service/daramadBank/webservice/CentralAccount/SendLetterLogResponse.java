
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
 *         &lt;element name="Send_Letter_LogResult" type="{http://www.w3.org/2001/XMLSchema}string" minOccurs="0"/>
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
    "sendLetterLogResult"
})
@XmlRootElement(name = "Send_Letter_LogResponse")
public class SendLetterLogResponse {

    @XmlElement(name = "Send_Letter_LogResult")
    protected String sendLetterLogResult;

    /**
     * Gets the value of the sendLetterLogResult property.
     * 
     * @return
     *     possible object is
     *     {@link String }
     *     
     */
    public String getSendLetterLogResult() {
        return sendLetterLogResult;
    }

    /**
     * Sets the value of the sendLetterLogResult property.
     * 
     * @param value
     *     allowed object is
     *     {@link String }
     *     
     */
    public void setSendLetterLogResult(String value) {
        this.sendLetterLogResult = value;
    }

}
