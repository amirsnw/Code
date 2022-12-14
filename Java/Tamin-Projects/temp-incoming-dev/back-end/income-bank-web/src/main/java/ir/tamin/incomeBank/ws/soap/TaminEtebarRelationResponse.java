
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
 *         &lt;element name="TaminEtebarRelationResult" type="{http://www.w3.org/2001/XMLSchema}string" minOccurs="0"/>
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
    "taminEtebarRelationResult"
})
@XmlRootElement(name = "TaminEtebarRelationResponse")
public class TaminEtebarRelationResponse {

    @XmlElement(name = "TaminEtebarRelationResult")
    protected String taminEtebarRelationResult;

    /**
     * Gets the value of the taminEtebarRelationResult property.
     * 
     * @return
     *     possible object is
     *     {@link String }
     *     
     */
    public String getTaminEtebarRelationResult() {
        return taminEtebarRelationResult;
    }

    /**
     * Sets the value of the taminEtebarRelationResult property.
     * 
     * @param value
     *     allowed object is
     *     {@link String }
     *     
     */
    public void setTaminEtebarRelationResult(String value) {
        this.taminEtebarRelationResult = value;
    }

}
