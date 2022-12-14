
package ir.tamin.incomeBank.ws.soap;

import javax.xml.bind.annotation.XmlAccessType;
import javax.xml.bind.annotation.XmlAccessorType;
import javax.xml.bind.annotation.XmlElement;
import javax.xml.bind.annotation.XmlType;


/**
 * <p>Java class for foxHesf5520 complex type.
 * 
 * <p>The following schema fragment specifies the expected content contained within this class.
 * 
 * <pre>
 * &lt;complexType name="foxHesf5520">
 *   &lt;complexContent>
 *     &lt;restriction base="{http://www.w3.org/2001/XMLSchema}anyType">
 *       &lt;sequence>
 *         &lt;element name="cod_riz" type="{http://www.w3.org/2001/XMLSchema}string" minOccurs="0"/>
 *         &lt;element name="nam_haz" type="{http://www.w3.org/2001/XMLSchema}string" minOccurs="0"/>
 *         &lt;element name="cod_joz" type="{http://www.w3.org/2001/XMLSchema}string" minOccurs="0"/>
 *       &lt;/sequence>
 *     &lt;/restriction>
 *   &lt;/complexContent>
 * &lt;/complexType>
 * </pre>
 * 
 * 
 */
@XmlAccessorType(XmlAccessType.FIELD)
@XmlType(name = "foxHesf5520", propOrder = {
    "codRiz",
    "namHaz",
    "codJoz"
})
public class FoxHesf5520 {

    @XmlElement(name = "cod_riz")
    protected String codRiz;
    @XmlElement(name = "nam_haz")
    protected String namHaz;
    @XmlElement(name = "cod_joz")
    protected String codJoz;

    /**
     * Gets the value of the codRiz property.
     * 
     * @return
     *     possible object is
     *     {@link String }
     *     
     */
    public String getCodRiz() {
        return codRiz;
    }

    /**
     * Sets the value of the codRiz property.
     * 
     * @param value
     *     allowed object is
     *     {@link String }
     *     
     */
    public void setCodRiz(String value) {
        this.codRiz = value;
    }

    /**
     * Gets the value of the namHaz property.
     * 
     * @return
     *     possible object is
     *     {@link String }
     *     
     */
    public String getNamHaz() {
        return namHaz;
    }

    /**
     * Sets the value of the namHaz property.
     * 
     * @param value
     *     allowed object is
     *     {@link String }
     *     
     */
    public void setNamHaz(String value) {
        this.namHaz = value;
    }

    /**
     * Gets the value of the codJoz property.
     * 
     * @return
     *     possible object is
     *     {@link String }
     *     
     */
    public String getCodJoz() {
        return codJoz;
    }

    /**
     * Sets the value of the codJoz property.
     * 
     * @param value
     *     allowed object is
     *     {@link String }
     *     
     */
    public void setCodJoz(String value) {
        this.codJoz = value;
    }

}
