
package ir.tamin.incomeBank.ws.soap;

import javax.xml.bind.annotation.XmlAccessType;
import javax.xml.bind.annotation.XmlAccessorType;
import javax.xml.bind.annotation.XmlElement;
import javax.xml.bind.annotation.XmlType;


/**
 * <p>Java class for foxHesf5510 complex type.
 * 
 * <p>The following schema fragment specifies the expected content contained within this class.
 * 
 * <pre>
 * &lt;complexType name="foxHesf5510">
 *   &lt;complexContent>
 *     &lt;restriction base="{http://www.w3.org/2001/XMLSchema}anyType">
 *       &lt;sequence>
 *         &lt;element name="cod_indep" type="{http://www.w3.org/2001/XMLSchema}string" minOccurs="0"/>
 *         &lt;element name="nam_indep" type="{http://www.w3.org/2001/XMLSchema}string" minOccurs="0"/>
 *         &lt;element name="addres" type="{http://www.w3.org/2001/XMLSchema}string" minOccurs="0"/>
 *         &lt;element name="descript" type="{http://www.w3.org/2001/XMLSchema}string" minOccurs="0"/>
 *       &lt;/sequence>
 *     &lt;/restriction>
 *   &lt;/complexContent>
 * &lt;/complexType>
 * </pre>
 * 
 * 
 */
@XmlAccessorType(XmlAccessType.FIELD)
@XmlType(name = "foxHesf5510", propOrder = {
    "codIndep",
    "namIndep",
    "addres",
    "descript"
})
public class FoxHesf5510 {

    @XmlElement(name = "cod_indep")
    protected String codIndep;
    @XmlElement(name = "nam_indep")
    protected String namIndep;
    protected String addres;
    protected String descript;

    /**
     * Gets the value of the codIndep property.
     * 
     * @return
     *     possible object is
     *     {@link String }
     *     
     */
    public String getCodIndep() {
        return codIndep;
    }

    /**
     * Sets the value of the codIndep property.
     * 
     * @param value
     *     allowed object is
     *     {@link String }
     *     
     */
    public void setCodIndep(String value) {
        this.codIndep = value;
    }

    /**
     * Gets the value of the namIndep property.
     * 
     * @return
     *     possible object is
     *     {@link String }
     *     
     */
    public String getNamIndep() {
        return namIndep;
    }

    /**
     * Sets the value of the namIndep property.
     * 
     * @param value
     *     allowed object is
     *     {@link String }
     *     
     */
    public void setNamIndep(String value) {
        this.namIndep = value;
    }

    /**
     * Gets the value of the addres property.
     * 
     * @return
     *     possible object is
     *     {@link String }
     *     
     */
    public String getAddres() {
        return addres;
    }

    /**
     * Sets the value of the addres property.
     * 
     * @param value
     *     allowed object is
     *     {@link String }
     *     
     */
    public void setAddres(String value) {
        this.addres = value;
    }

    /**
     * Gets the value of the descript property.
     * 
     * @return
     *     possible object is
     *     {@link String }
     *     
     */
    public String getDescript() {
        return descript;
    }

    /**
     * Sets the value of the descript property.
     * 
     * @param value
     *     allowed object is
     *     {@link String }
     *     
     */
    public void setDescript(String value) {
        this.descript = value;
    }

}
