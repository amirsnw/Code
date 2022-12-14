
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
 *         &lt;element name="RequestEntity" type="{http://tempuri.org/}httpsRequestEntity" minOccurs="0"/>
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
    "requestEntity"
})
@XmlRootElement(name = "CallRestService")
public class CallRestService {

    @XmlElement(name = "RequestEntity")
    protected HttpsRequestEntity requestEntity;

    /**
     * Gets the value of the requestEntity property.
     * 
     * @return
     *     possible object is
     *     {@link HttpsRequestEntity }
     *     
     */
    public HttpsRequestEntity getRequestEntity() {
        return requestEntity;
    }

    /**
     * Sets the value of the requestEntity property.
     * 
     * @param value
     *     allowed object is
     *     {@link HttpsRequestEntity }
     *     
     */
    public void setRequestEntity(HttpsRequestEntity value) {
        this.requestEntity = value;
    }

}
