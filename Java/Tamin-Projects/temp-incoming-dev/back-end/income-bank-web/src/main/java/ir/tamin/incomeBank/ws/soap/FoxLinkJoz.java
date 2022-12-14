
package ir.tamin.incomeBank.ws.soap;

import javax.xml.bind.annotation.XmlAccessType;
import javax.xml.bind.annotation.XmlAccessorType;
import javax.xml.bind.annotation.XmlElement;
import javax.xml.bind.annotation.XmlType;


/**
 * <p>Java class for foxLinkJoz complex type.
 * 
 * <p>The following schema fragment specifies the expected content contained within this class.
 * 
 * <pre>
 * &lt;complexType name="foxLinkJoz">
 *   &lt;complexContent>
 *     &lt;restriction base="{http://www.w3.org/2001/XMLSchema}anyType">
 *       &lt;sequence>
 *         &lt;element name="cod_kol" type="{http://www.w3.org/2001/XMLSchema}string" minOccurs="0"/>
 *         &lt;element name="cod_moi" type="{http://www.w3.org/2001/XMLSchema}string" minOccurs="0"/>
 *         &lt;element name="cod_taf" type="{http://www.w3.org/2001/XMLSchema}string" minOccurs="0"/>
 *         &lt;element name="cod_joz" type="{http://www.w3.org/2001/XMLSchema}string" minOccurs="0"/>
 *         &lt;element name="cod_riz" type="{http://www.w3.org/2001/XMLSchema}string" minOccurs="0"/>
 *       &lt;/sequence>
 *     &lt;/restriction>
 *   &lt;/complexContent>
 * &lt;/complexType>
 * </pre>
 * 
 * 
 */
@XmlAccessorType(XmlAccessType.FIELD)
@XmlType(name = "foxLinkJoz", propOrder = {
    "codKol",
    "codMoi",
    "codTaf",
    "codJoz",
    "codRiz"
})
public class FoxLinkJoz {

    @XmlElement(name = "cod_kol")
    protected String codKol;
    @XmlElement(name = "cod_moi")
    protected String codMoi;
    @XmlElement(name = "cod_taf")
    protected String codTaf;
    @XmlElement(name = "cod_joz")
    protected String codJoz;
    @XmlElement(name = "cod_riz")
    protected String codRiz;

    /**
     * Gets the value of the codKol property.
     * 
     * @return
     *     possible object is
     *     {@link String }
     *     
     */
    public String getCodKol() {
        return codKol;
    }

    /**
     * Sets the value of the codKol property.
     * 
     * @param value
     *     allowed object is
     *     {@link String }
     *     
     */
    public void setCodKol(String value) {
        this.codKol = value;
    }

    /**
     * Gets the value of the codMoi property.
     * 
     * @return
     *     possible object is
     *     {@link String }
     *     
     */
    public String getCodMoi() {
        return codMoi;
    }

    /**
     * Sets the value of the codMoi property.
     * 
     * @param value
     *     allowed object is
     *     {@link String }
     *     
     */
    public void setCodMoi(String value) {
        this.codMoi = value;
    }

    /**
     * Gets the value of the codTaf property.
     * 
     * @return
     *     possible object is
     *     {@link String }
     *     
     */
    public String getCodTaf() {
        return codTaf;
    }

    /**
     * Sets the value of the codTaf property.
     * 
     * @param value
     *     allowed object is
     *     {@link String }
     *     
     */
    public void setCodTaf(String value) {
        this.codTaf = value;
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

}
