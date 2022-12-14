
package ir.tamin.incomeBank.ws.soap;

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
 *         &lt;element name="ReverseDocumentResult" type="{http://tempuri.org/}ServiceResult" minOccurs="0"/>
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
    "reverseDocumentResult"
})
@XmlRootElement(name = "ReverseDocumentResponse")
public class ReverseDocumentResponse {

    @XmlElement(name = "ReverseDocumentResult")
    protected ServiceResult reverseDocumentResult;

    /**
     * Gets the value of the reverseDocumentResult property.
     * 
     * @return
     *     possible object is
     *     {@link ServiceResult }
     *     
     */
    public ServiceResult getReverseDocumentResult() {
        return reverseDocumentResult;
    }

    /**
     * Sets the value of the reverseDocumentResult property.
     * 
     * @param value
     *     allowed object is
     *     {@link ServiceResult }
     *     
     */
    public void setReverseDocumentResult(ServiceResult value) {
        this.reverseDocumentResult = value;
    }

}
