
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
 *         &lt;element name="CallRestServiceResult" type="{http://tempuri.org/}ServiceCallResult" minOccurs="0"/>
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
    "callRestServiceResult"
})
@XmlRootElement(name = "CallRestServiceResponse")
public class CallRestServiceResponse {

    @XmlElement(name = "CallRestServiceResult")
    protected ServiceCallResult callRestServiceResult;

    /**
     * Gets the value of the callRestServiceResult property.
     * 
     * @return
     *     possible object is
     *     {@link ServiceCallResult }
     *     
     */
    public ServiceCallResult getCallRestServiceResult() {
        return callRestServiceResult;
    }

    /**
     * Sets the value of the callRestServiceResult property.
     * 
     * @param value
     *     allowed object is
     *     {@link ServiceCallResult }
     *     
     */
    public void setCallRestServiceResult(ServiceCallResult value) {
        this.callRestServiceResult = value;
    }

}
