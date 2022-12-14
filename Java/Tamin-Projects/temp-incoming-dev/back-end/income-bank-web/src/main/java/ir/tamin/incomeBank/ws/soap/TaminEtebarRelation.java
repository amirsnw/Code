
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
 *         &lt;element name="sData" type="{http://www.w3.org/2001/XMLSchema}string" minOccurs="0"/>
 *         &lt;element name="sUrl" type="{http://www.w3.org/2001/XMLSchema}string" minOccurs="0"/>
 *         &lt;element name="sMethod" type="{http://www.w3.org/2001/XMLSchema}string" minOccurs="0"/>
 *         &lt;element name="sToken" type="{http://www.w3.org/2001/XMLSchema}string" minOccurs="0"/>
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
    "sData",
    "sUrl",
    "sMethod",
    "sToken"
})
@XmlRootElement(name = "TaminEtebarRelation")
public class TaminEtebarRelation {

    protected String sData;
    protected String sUrl;
    protected String sMethod;
    protected String sToken;

    /**
     * Gets the value of the sData property.
     * 
     * @return
     *     possible object is
     *     {@link String }
     *     
     */
    public String getSData() {
        return sData;
    }

    /**
     * Sets the value of the sData property.
     * 
     * @param value
     *     allowed object is
     *     {@link String }
     *     
     */
    public void setSData(String value) {
        this.sData = value;
    }

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
     * Gets the value of the sMethod property.
     * 
     * @return
     *     possible object is
     *     {@link String }
     *     
     */
    public String getSMethod() {
        return sMethod;
    }

    /**
     * Sets the value of the sMethod property.
     * 
     * @param value
     *     allowed object is
     *     {@link String }
     *     
     */
    public void setSMethod(String value) {
        this.sMethod = value;
    }

    /**
     * Gets the value of the sToken property.
     * 
     * @return
     *     possible object is
     *     {@link String }
     *     
     */
    public String getSToken() {
        return sToken;
    }

    /**
     * Sets the value of the sToken property.
     * 
     * @param value
     *     allowed object is
     *     {@link String }
     *     
     */
    public void setSToken(String value) {
        this.sToken = value;
    }

}
