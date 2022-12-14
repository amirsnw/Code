
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
 *         &lt;element name="OrdRequest_RefahResult" type="{http://www.w3.org/2001/XMLSchema}string" minOccurs="0"/>
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
    "ordRequestRefahResult"
})
@XmlRootElement(name = "OrdRequest_RefahResponse")
public class OrdRequestRefahResponse {

    @XmlElement(name = "OrdRequest_RefahResult")
    protected String ordRequestRefahResult;

    /**
     * Gets the value of the ordRequestRefahResult property.
     * 
     * @return
     *     possible object is
     *     {@link String }
     *     
     */
    public String getOrdRequestRefahResult() {
        return ordRequestRefahResult;
    }

    /**
     * Sets the value of the ordRequestRefahResult property.
     * 
     * @param value
     *     allowed object is
     *     {@link String }
     *     
     */
    public void setOrdRequestRefahResult(String value) {
        this.ordRequestRefahResult = value;
    }

}
