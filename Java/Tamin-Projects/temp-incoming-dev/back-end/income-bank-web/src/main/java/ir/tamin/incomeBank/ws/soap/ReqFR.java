
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
 *         &lt;element name="ar" type="{http://www.w3.org/2001/XMLSchema}string" minOccurs="0"/>
 *         &lt;element name="ramz" type="{http://www.w3.org/2001/XMLSchema}string" minOccurs="0"/>
 *         &lt;element name="esk" type="{http://www.w3.org/2001/XMLSchema}string" minOccurs="0"/>
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
    "ar",
    "ramz",
    "esk"
})
@XmlRootElement(name = "req_f_r")
public class ReqFR {

    protected String ar;
    protected String ramz;
    protected String esk;

    /**
     * Gets the value of the ar property.
     * 
     * @return
     *     possible object is
     *     {@link String }
     *     
     */
    public String getAr() {
        return ar;
    }

    /**
     * Sets the value of the ar property.
     * 
     * @param value
     *     allowed object is
     *     {@link String }
     *     
     */
    public void setAr(String value) {
        this.ar = value;
    }

    /**
     * Gets the value of the ramz property.
     * 
     * @return
     *     possible object is
     *     {@link String }
     *     
     */
    public String getRamz() {
        return ramz;
    }

    /**
     * Sets the value of the ramz property.
     * 
     * @param value
     *     allowed object is
     *     {@link String }
     *     
     */
    public void setRamz(String value) {
        this.ramz = value;
    }

    /**
     * Gets the value of the esk property.
     * 
     * @return
     *     possible object is
     *     {@link String }
     *     
     */
    public String getEsk() {
        return esk;
    }

    /**
     * Sets the value of the esk property.
     * 
     * @param value
     *     allowed object is
     *     {@link String }
     *     
     */
    public void setEsk(String value) {
        this.esk = value;
    }

}
