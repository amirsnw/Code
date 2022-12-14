
package ir.tamin.incomeBank.ws.soap;

import javax.xml.bind.annotation.XmlAccessType;
import javax.xml.bind.annotation.XmlAccessorType;
import javax.xml.bind.annotation.XmlElement;
import javax.xml.bind.annotation.XmlType;


/**
 * <p>Java class for foxHesf5540 complex type.
 * 
 * <p>The following schema fragment specifies the expected content contained within this class.
 * 
 * <pre>
 * &lt;complexType name="foxHesf5540">
 *   &lt;complexContent>
 *     &lt;restriction base="{http://www.w3.org/2001/XMLSchema}anyType">
 *       &lt;sequence>
 *         &lt;element name="cod_kol" type="{http://www.w3.org/2001/XMLSchema}string" minOccurs="0"/>
 *         &lt;element name="cod_moi" type="{http://www.w3.org/2001/XMLSchema}string" minOccurs="0"/>
 *         &lt;element name="cod_taf" type="{http://www.w3.org/2001/XMLSchema}string" minOccurs="0"/>
 *         &lt;element name="cod_hes" type="{http://www.w3.org/2001/XMLSchema}string" minOccurs="0"/>
 *         &lt;element name="des_hes" type="{http://www.w3.org/2001/XMLSchema}string" minOccurs="0"/>
 *         &lt;element name="debit" type="{http://www.w3.org/2001/XMLSchema}long"/>
 *         &lt;element name="credit" type="{http://www.w3.org/2001/XMLSchema}long"/>
 *       &lt;/sequence>
 *     &lt;/restriction>
 *   &lt;/complexContent>
 * &lt;/complexType>
 * </pre>
 * 
 * 
 */
@XmlAccessorType(XmlAccessType.FIELD)
@XmlType(name = "foxHesf5540", propOrder = {
    "codKol",
    "codMoi",
    "codTaf",
    "codHes",
    "desHes",
    "debit",
    "credit"
})
public class FoxHesf5540 {

    @XmlElement(name = "cod_kol")
    protected String codKol;
    @XmlElement(name = "cod_moi")
    protected String codMoi;
    @XmlElement(name = "cod_taf")
    protected String codTaf;
    @XmlElement(name = "cod_hes")
    protected String codHes;
    @XmlElement(name = "des_hes")
    protected String desHes;
    protected long debit;
    protected long credit;

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
     * Gets the value of the codHes property.
     * 
     * @return
     *     possible object is
     *     {@link String }
     *     
     */
    public String getCodHes() {
        return codHes;
    }

    /**
     * Sets the value of the codHes property.
     * 
     * @param value
     *     allowed object is
     *     {@link String }
     *     
     */
    public void setCodHes(String value) {
        this.codHes = value;
    }

    /**
     * Gets the value of the desHes property.
     * 
     * @return
     *     possible object is
     *     {@link String }
     *     
     */
    public String getDesHes() {
        return desHes;
    }

    /**
     * Sets the value of the desHes property.
     * 
     * @param value
     *     allowed object is
     *     {@link String }
     *     
     */
    public void setDesHes(String value) {
        this.desHes = value;
    }

    /**
     * Gets the value of the debit property.
     * 
     */
    public long getDebit() {
        return debit;
    }

    /**
     * Sets the value of the debit property.
     * 
     */
    public void setDebit(long value) {
        this.debit = value;
    }

    /**
     * Gets the value of the credit property.
     * 
     */
    public long getCredit() {
        return credit;
    }

    /**
     * Sets the value of the credit property.
     * 
     */
    public void setCredit(long value) {
        this.credit = value;
    }

}
