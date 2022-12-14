
package ir.tamin.incomeBank.ws.soap;

import java.math.BigDecimal;
import javax.xml.bind.annotation.XmlAccessType;
import javax.xml.bind.annotation.XmlAccessorType;
import javax.xml.bind.annotation.XmlElement;
import javax.xml.bind.annotation.XmlType;


/**
 * <p>Java class for EntVWSOORAT_VAZIYAT complex type.
 * 
 * <p>The following schema fragment specifies the expected content contained within this class.
 * 
 * <pre>
 * &lt;complexType name="EntVWSOORAT_VAZIYAT">
 *   &lt;complexContent>
 *     &lt;restriction base="{http://www.w3.org/2001/XMLSchema}anyType">
 *       &lt;sequence>
 *         &lt;element name="CODKOL" type="{http://www.w3.org/2001/XMLSchema}string" minOccurs="0"/>
 *         &lt;element name="MANDEH_JARI" type="{http://www.w3.org/2001/XMLSchema}decimal"/>
 *         &lt;element name="MANDEH_PER" type="{http://www.w3.org/2001/XMLSchema}decimal"/>
 *       &lt;/sequence>
 *     &lt;/restriction>
 *   &lt;/complexContent>
 * &lt;/complexType>
 * </pre>
 * 
 * 
 */
@XmlAccessorType(XmlAccessType.FIELD)
@XmlType(name = "EntVWSOORAT_VAZIYAT", propOrder = {
    "codkol",
    "mandehjari",
    "mandehper"
})
public class EntVWSOORATVAZIYAT {

    @XmlElement(name = "CODKOL")
    protected String codkol;
    @XmlElement(name = "MANDEH_JARI", required = true)
    protected BigDecimal mandehjari;
    @XmlElement(name = "MANDEH_PER", required = true)
    protected BigDecimal mandehper;

    /**
     * Gets the value of the codkol property.
     * 
     * @return
     *     possible object is
     *     {@link String }
     *     
     */
    public String getCODKOL() {
        return codkol;
    }

    /**
     * Sets the value of the codkol property.
     * 
     * @param value
     *     allowed object is
     *     {@link String }
     *     
     */
    public void setCODKOL(String value) {
        this.codkol = value;
    }

    /**
     * Gets the value of the mandehjari property.
     * 
     * @return
     *     possible object is
     *     {@link BigDecimal }
     *     
     */
    public BigDecimal getMANDEHJARI() {
        return mandehjari;
    }

    /**
     * Sets the value of the mandehjari property.
     * 
     * @param value
     *     allowed object is
     *     {@link BigDecimal }
     *     
     */
    public void setMANDEHJARI(BigDecimal value) {
        this.mandehjari = value;
    }

    /**
     * Gets the value of the mandehper property.
     * 
     * @return
     *     possible object is
     *     {@link BigDecimal }
     *     
     */
    public BigDecimal getMANDEHPER() {
        return mandehper;
    }

    /**
     * Sets the value of the mandehper property.
     * 
     * @param value
     *     allowed object is
     *     {@link BigDecimal }
     *     
     */
    public void setMANDEHPER(BigDecimal value) {
        this.mandehper = value;
    }

}
