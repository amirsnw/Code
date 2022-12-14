
package ir.tamin.incomeBank.ws.soap;

import javax.xml.bind.annotation.XmlAccessType;
import javax.xml.bind.annotation.XmlAccessorType;
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
 *         &lt;element name="sUrl" type="{http://www.w3.org/2001/XMLSchema}string" minOccurs="0"/>
 *         &lt;element name="sUserName" type="{http://www.w3.org/2001/XMLSchema}string" minOccurs="0"/>
 *         &lt;element name="sPass" type="{http://www.w3.org/2001/XMLSchema}string" minOccurs="0"/>
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
    "sUrl",
    "sUserName",
    "sPass"
})
@XmlRootElement(name = "GetTokenOAM")
public class GetTokenOAM {

    protected String sUrl;
    protected String sUserName;
    protected String sPass;

    /**
     * Gets the value of the sUrl property.
     * 
     * @return
     *     possible object is
     *     {@link String }
     *     
     */
    public String getSUrl() {
        return sUrl;
    }

    /**
     * Sets the value of the sUrl property.
     * 
     * @param value
     *     allowed object is
     *     {@link String }
     *     
     */
    public void setSUrl(String value) {
        this.sUrl = value;
    }

    /**
     * Gets the value of the sUserName property.
     * 
     * @return
     *     possible object is
     *     {@link String }
     *     
     */
    public String getSUserName() {
        return sUserName;
    }

    /**
     * Sets the value of the sUserName property.
     * 
     * @param value
     *     allowed object is
     *     {@link String }
     *     
     */
    public void setSUserName(String value) {
        this.sUserName = value;
    }

    /**
     * Gets the value of the sPass property.
     * 
     * @return
     *     possible object is
     *     {@link String }
     *     
     */
    public String getSPass() {
        return sPass;
    }

    /**
     * Sets the value of the sPass property.
     * 
     * @param value
     *     allowed object is
     *     {@link String }
     *     
     */
    public void setSPass(String value) {
        this.sPass = value;
    }

}
