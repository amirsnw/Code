
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
 *         &lt;element name="GetDrmd_AmarKolResult" type="{http://www.w3.org/2001/XMLSchema}string" minOccurs="0"/>
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
    "getDrmdAmarKolResult"
})
@XmlRootElement(name = "GetDrmd_AmarKolResponse")
public class GetDrmdAmarKolResponse {

    @XmlElement(name = "GetDrmd_AmarKolResult")
    protected String getDrmdAmarKolResult;

    /**
     * Gets the value of the getDrmdAmarKolResult property.
     * 
     * @return
     *     possible object is
     *     {@link String }
     *     
     */
    public String getGetDrmdAmarKolResult() {
        return getDrmdAmarKolResult;
    }

    /**
     * Sets the value of the getDrmdAmarKolResult property.
     * 
     * @param value
     *     allowed object is
     *     {@link String }
     *     
     */
    public void setGetDrmdAmarKolResult(String value) {
        this.getDrmdAmarKolResult = value;
    }

}
