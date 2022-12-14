
package ir.tamin.incomeBank.ws.soap;

import javax.xml.bind.annotation.XmlAccessType;
import javax.xml.bind.annotation.XmlAccessorType;
import javax.xml.bind.annotation.XmlElement;
import javax.xml.bind.annotation.XmlType;


/**
 * <p>Java class for foxHesf2110 complex type.
 * 
 * <p>The following schema fragment specifies the expected content contained within this class.
 * 
 * <pre>
 * &lt;complexType name="foxHesf2110">
 *   &lt;complexContent>
 *     &lt;restriction base="{http://www.w3.org/2001/XMLSchema}anyType">
 *       &lt;sequence>
 *         &lt;element name="no_doc" type="{http://www.w3.org/2001/XMLSchema}string" minOccurs="0"/>
 *         &lt;element name="desc1" type="{http://www.w3.org/2001/XMLSchema}string" minOccurs="0"/>
 *         &lt;element name="desc2" type="{http://www.w3.org/2001/XMLSchema}string" minOccurs="0"/>
 *         &lt;element name="desc3" type="{http://www.w3.org/2001/XMLSchema}string" minOccurs="0"/>
 *         &lt;element name="mada1" type="{http://www.w3.org/2001/XMLSchema}string" minOccurs="0"/>
 *         &lt;element name="mada2" type="{http://www.w3.org/2001/XMLSchema}string" minOccurs="0"/>
 *         &lt;element name="mada3" type="{http://www.w3.org/2001/XMLSchema}string" minOccurs="0"/>
 *       &lt;/sequence>
 *     &lt;/restriction>
 *   &lt;/complexContent>
 * &lt;/complexType>
 * </pre>
 * 
 * 
 */
@XmlAccessorType(XmlAccessType.FIELD)
@XmlType(name = "foxHesf2110", propOrder = {
    "noDoc",
    "desc1",
    "desc2",
    "desc3",
    "mada1",
    "mada2",
    "mada3"
})
public class FoxHesf2110 {

    @XmlElement(name = "no_doc")
    protected String noDoc;
    protected String desc1;
    protected String desc2;
    protected String desc3;
    protected String mada1;
    protected String mada2;
    protected String mada3;

    /**
     * Gets the value of the noDoc property.
     * 
     * @return
     *     possible object is
     *     {@link String }
     *     
     */
    public String getNoDoc() {
        return noDoc;
    }

    /**
     * Sets the value of the noDoc property.
     * 
     * @param value
     *     allowed object is
     *     {@link String }
     *     
     */
    public void setNoDoc(String value) {
        this.noDoc = value;
    }

    /**
     * Gets the value of the desc1 property.
     * 
     * @return
     *     possible object is
     *     {@link String }
     *     
     */
    public String getDesc1() {
        return desc1;
    }

    /**
     * Sets the value of the desc1 property.
     * 
     * @param value
     *     allowed object is
     *     {@link String }
     *     
     */
    public void setDesc1(String value) {
        this.desc1 = value;
    }

    /**
     * Gets the value of the desc2 property.
     * 
     * @return
     *     possible object is
     *     {@link String }
     *     
     */
    public String getDesc2() {
        return desc2;
    }

    /**
     * Sets the value of the desc2 property.
     * 
     * @param value
     *     allowed object is
     *     {@link String }
     *     
     */
    public void setDesc2(String value) {
        this.desc2 = value;
    }

    /**
     * Gets the value of the desc3 property.
     * 
     * @return
     *     possible object is
     *     {@link String }
     *     
     */
    public String getDesc3() {
        return desc3;
    }

    /**
     * Sets the value of the desc3 property.
     * 
     * @param value
     *     allowed object is
     *     {@link String }
     *     
     */
    public void setDesc3(String value) {
        this.desc3 = value;
    }

    /**
     * Gets the value of the mada1 property.
     * 
     * @return
     *     possible object is
     *     {@link String }
     *     
     */
    public String getMada1() {
        return mada1;
    }

    /**
     * Sets the value of the mada1 property.
     * 
     * @param value
     *     allowed object is
     *     {@link String }
     *     
     */
    public void setMada1(String value) {
        this.mada1 = value;
    }

    /**
     * Gets the value of the mada2 property.
     * 
     * @return
     *     possible object is
     *     {@link String }
     *     
     */
    public String getMada2() {
        return mada2;
    }

    /**
     * Sets the value of the mada2 property.
     * 
     * @param value
     *     allowed object is
     *     {@link String }
     *     
     */
    public void setMada2(String value) {
        this.mada2 = value;
    }

    /**
     * Gets the value of the mada3 property.
     * 
     * @return
     *     possible object is
     *     {@link String }
     *     
     */
    public String getMada3() {
        return mada3;
    }

    /**
     * Sets the value of the mada3 property.
     * 
     * @param value
     *     allowed object is
     *     {@link String }
     *     
     */
    public void setMada3(String value) {
        this.mada3 = value;
    }

}
