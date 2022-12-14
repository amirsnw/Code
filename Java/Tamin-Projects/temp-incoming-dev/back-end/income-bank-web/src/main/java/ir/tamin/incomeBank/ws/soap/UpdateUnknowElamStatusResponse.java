
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
 *         &lt;element name="UpdateUnknowElamStatusResult" type="{http://tempuri.org/}ServiceResult" minOccurs="0"/>
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
    "updateUnknowElamStatusResult"
})
@XmlRootElement(name = "UpdateUnknowElamStatusResponse")
public class UpdateUnknowElamStatusResponse {

    @XmlElement(name = "UpdateUnknowElamStatusResult")
    protected ServiceResult updateUnknowElamStatusResult;

    /**
     * Gets the value of the updateUnknowElamStatusResult property.
     * 
     * @return
     *     possible object is
     *     {@link ServiceResult }
     *     
     */
    public ServiceResult getUpdateUnknowElamStatusResult() {
        return updateUnknowElamStatusResult;
    }

    /**
     * Sets the value of the updateUnknowElamStatusResult property.
     * 
     * @param value
     *     allowed object is
     *     {@link ServiceResult }
     *     
     */
    public void setUpdateUnknowElamStatusResult(ServiceResult value) {
        this.updateUnknowElamStatusResult = value;
    }

}
