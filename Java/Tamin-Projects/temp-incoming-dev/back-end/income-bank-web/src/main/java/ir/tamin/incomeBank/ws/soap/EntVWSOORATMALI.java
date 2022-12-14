
package ir.tamin.incomeBank.ws.soap;

import java.math.BigDecimal;
import javax.xml.bind.annotation.XmlAccessType;
import javax.xml.bind.annotation.XmlAccessorType;
import javax.xml.bind.annotation.XmlElement;
import javax.xml.bind.annotation.XmlType;


/**
 * <p>Java class for EntVWSOORATMALI complex type.
 * 
 * <p>The following schema fragment specifies the expected content contained within this class.
 * 
 * <pre>
 * &lt;complexType name="EntVWSOORATMALI">
 *   &lt;complexContent>
 *     &lt;restriction base="{http://www.w3.org/2001/XMLSchema}anyType">
 *       &lt;sequence>
 *         &lt;element name="CODKOL" type="{http://www.w3.org/2001/XMLSchema}string" minOccurs="0"/>
 *         &lt;element name="CREDIT_JARI" type="{http://www.w3.org/2001/XMLSchema}decimal"/>
 *         &lt;element name="DEBIT_JARI" type="{http://www.w3.org/2001/XMLSchema}decimal"/>
 *         &lt;element name="CREDIT_PER" type="{http://www.w3.org/2001/XMLSchema}decimal"/>
 *         &lt;element name="DEBIT_PER" type="{http://www.w3.org/2001/XMLSchema}decimal"/>
 *       &lt;/sequence>
 *     &lt;/restriction>
 *   &lt;/complexContent>
 * &lt;/complexType>
 * </pre>
 * 
 * 
 */
@XmlAccessorType(XmlAccessType.FIELD)
@XmlType(name = "EntVWSOORATMALI", propOrder = {
    "codkol",
    "creditjari",
    "debitjari",
    "creditper",
    "debitper"
})
public class EntVWSOORATMALI {

    @XmlElement(name = "CODKOL")
    protected String codkol;
    @XmlElement(name = "CREDIT_JARI", required = true)
    protected BigDecimal creditjari;
    @XmlElement(name = "DEBIT_JARI", required = true)
    protected BigDecimal debitjari;
    @XmlElement(name = "CREDIT_PER", required = true)
    protected BigDecimal creditper;
    @XmlElement(name = "DEBIT_PER", required = true)
    protected BigDecimal debitper;

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
     * Gets the value of the creditjari property.
     * 
     * @return
     *     possible object is
     *     {@link BigDecimal }
     *     
     */
    public BigDecimal getCREDITJARI() {
        return creditjari;
    }

    /**
     * Sets the value of the creditjari property.
     * 
     * @param value
     *     allowed object is
     *     {@link BigDecimal }
     *     
     */
    public void setCREDITJARI(BigDecimal value) {
        this.creditjari = value;
    }

    /**
     * Gets the value of the debitjari property.
     * 
     * @return
     *     possible object is
     *     {@link BigDecimal }
     *     
     */
    public BigDecimal getDEBITJARI() {
        return debitjari;
    }

    /**
     * Sets the value of the debitjari property.
     * 
     * @param value
     *     allowed object is
     *     {@link BigDecimal }
     *     
     */
    public void setDEBITJARI(BigDecimal value) {
        this.debitjari = value;
    }

    /**
     * Gets the value of the creditper property.
     * 
     * @return
     *     possible object is
     *     {@link BigDecimal }
     *     
     */
    public BigDecimal getCREDITPER() {
        return creditper;
    }

    /**
     * Sets the value of the creditper property.
     * 
     * @param value
     *     allowed object is
     *     {@link BigDecimal }
     *     
     */
    public void setCREDITPER(BigDecimal value) {
        this.creditper = value;
    }

    /**
     * Gets the value of the debitper property.
     * 
     * @return
     *     possible object is
     *     {@link BigDecimal }
     *     
     */
    public BigDecimal getDEBITPER() {
        return debitper;
    }

    /**
     * Sets the value of the debitper property.
     * 
     * @param value
     *     allowed object is
     *     {@link BigDecimal }
     *     
     */
    public void setDEBITPER(BigDecimal value) {
        this.debitper = value;
    }

}
