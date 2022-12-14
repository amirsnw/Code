
package ir.tamin.incomeBank.ws.soap;

import javax.xml.bind.annotation.XmlAccessType;
import javax.xml.bind.annotation.XmlAccessorType;
import javax.xml.bind.annotation.XmlElement;
import javax.xml.bind.annotation.XmlType;


/**
 * <p>Java class for foxHesf5530 complex type.
 * 
 * <p>The following schema fragment specifies the expected content contained within this class.
 * 
 * <pre>
 * &lt;complexType name="foxHesf5530">
 *   &lt;complexContent>
 *     &lt;restriction base="{http://www.w3.org/2001/XMLSchema}anyType">
 *       &lt;sequence>
 *         &lt;element name="c_source" type="{http://www.w3.org/2001/XMLSchema}string" minOccurs="0"/>
 *         &lt;element name="desc_c" type="{http://www.w3.org/2001/XMLSchema}string" minOccurs="0"/>
 *         &lt;element name="type" type="{http://www.w3.org/2001/XMLSchema}string" minOccurs="0"/>
 *       &lt;/sequence>
 *     &lt;/restriction>
 *   &lt;/complexContent>
 * &lt;/complexType>
 * </pre>
 * 
 * 
 */
@XmlAccessorType(XmlAccessType.FIELD)
@XmlType(name = "foxHesf5530", propOrder = {
    "cSource",
    "descC",
    "type"
})
public class FoxHesf5530 {

    @XmlElement(name = "c_source")
    protected String cSource;
    @XmlElement(name = "desc_c")
    protected String descC;
    protected String type;

    /**
     * Gets the value of the cSource property.
     * 
     * @return
     *     possible object is
     *     {@link String }
     *     
     */
    public String getCSource() {
        return cSource;
    }

    /**
     * Sets the value of the cSource property.
     * 
     * @param value
     *     allowed object is
     *     {@link String }
     *     
     */
    public void setCSource(String value) {
        this.cSource = value;
    }

    /**
     * Gets the value of the descC property.
     * 
     * @return
     *     possible object is
     *     {@link String }
     *     
     */
    public String getDescC() {
        return descC;
    }

    /**
     * Sets the value of the descC property.
     * 
     * @param value
     *     allowed object is
     *     {@link String }
     *     
     */
    public void setDescC(String value) {
        this.descC = value;
    }

    /**
     * Gets the value of the type property.
     * 
     * @return
     *     possible object is
     *     {@link String }
     *     
     */
    public String getType() {
        return type;
    }

    /**
     * Sets the value of the type property.
     * 
     * @param value
     *     allowed object is
     *     {@link String }
     *     
     */
    public void setType(String value) {
        this.type = value;
    }

}
