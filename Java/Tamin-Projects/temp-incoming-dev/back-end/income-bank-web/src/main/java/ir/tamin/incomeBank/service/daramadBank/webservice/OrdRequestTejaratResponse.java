
package ir.tamin.incomeBank.service.daramadBank.webservice;

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
 *         &lt;element name="OrdRequest_TejaratResult" type="{http://www.w3.org/2001/XMLSchema}string" minOccurs="0"/>
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
    "ordRequestTejaratResult"
})
@XmlRootElement(name = "OrdRequest_TejaratResponse")
public class OrdRequestTejaratResponse {

    @XmlElement(name = "OrdRequest_TejaratResult")
    protected String ordRequestTejaratResult;

    /**
     * Gets the value of the ordRequestTejaratResult property.
     * 
     * @return
     *     possible object is
     *     {@link String }
     *     
     */
    public String getOrdRequestTejaratResult() {
        return ordRequestTejaratResult;
    }

    /**
     * Sets the value of the ordRequestTejaratResult property.
     * 
     * @param value
     *     allowed object is
     *     {@link String }
     *     
     */
    public void setOrdRequestTejaratResult(String value) {
        this.ordRequestTejaratResult = value;
    }

}
