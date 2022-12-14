
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
 *         &lt;element name="OrdRequest_Refah_oldResult" type="{http://www.w3.org/2001/XMLSchema}string" minOccurs="0"/>
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
    "ordRequestRefahOldResult"
})
@XmlRootElement(name = "OrdRequest_Refah_oldResponse")
public class OrdRequestRefahOldResponse {

    @XmlElement(name = "OrdRequest_Refah_oldResult")
    protected String ordRequestRefahOldResult;

    /**
     * Gets the value of the ordRequestRefahOldResult property.
     * 
     * @return
     *     possible object is
     *     {@link String }
     *     
     */
    public String getOrdRequestRefahOldResult() {
        return ordRequestRefahOldResult;
    }

    /**
     * Sets the value of the ordRequestRefahOldResult property.
     * 
     * @param value
     *     allowed object is
     *     {@link String }
     *     
     */
    public void setOrdRequestRefahOldResult(String value) {
        this.ordRequestRefahOldResult = value;
    }

}
