
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
 *         &lt;element name="DeleteDocumentResult" type="{http://tempuri.org/}ServiceResult" minOccurs="0"/>
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
    "deleteDocumentResult"
})
@XmlRootElement(name = "DeleteDocumentResponse")
public class DeleteDocumentResponse {

    @XmlElement(name = "DeleteDocumentResult")
    protected ServiceResult deleteDocumentResult;

    /**
     * Gets the value of the deleteDocumentResult property.
     * 
     * @return
     *     possible object is
     *     {@link ServiceResult }
     *     
     */
    public ServiceResult getDeleteDocumentResult() {
        return deleteDocumentResult;
    }

    /**
     * Sets the value of the deleteDocumentResult property.
     * 
     * @param value
     *     allowed object is
     *     {@link ServiceResult }
     *     
     */
    public void setDeleteDocumentResult(ServiceResult value) {
        this.deleteDocumentResult = value;
    }

}
