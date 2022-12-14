
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
 *         &lt;element name="Send_Letter_NewResult" type="{http://www.w3.org/2001/XMLSchema}string" minOccurs="0"/>
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
    "sendLetterNewResult"
})
@XmlRootElement(name = "Send_Letter_NewResponse")
public class SendLetterNewResponse {

    @XmlElement(name = "Send_Letter_NewResult")
    protected String sendLetterNewResult;

    /**
     * Gets the value of the sendLetterNewResult property.
     * 
     * @return
     *     possible object is
     *     {@link String }
     *     
     */
    public String getSendLetterNewResult() {
        return sendLetterNewResult;
    }

    /**
     * Sets the value of the sendLetterNewResult property.
     * 
     * @param value
     *     allowed object is
     *     {@link String }
     *     
     */
    public void setSendLetterNewResult(String value) {
        this.sendLetterNewResult = value;
    }

}
