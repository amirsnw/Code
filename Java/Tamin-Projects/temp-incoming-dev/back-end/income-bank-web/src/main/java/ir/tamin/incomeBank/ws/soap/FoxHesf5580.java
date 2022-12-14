
package ir.tamin.incomeBank.ws.soap;

import javax.xml.bind.annotation.XmlAccessType;
import javax.xml.bind.annotation.XmlAccessorType;
import javax.xml.bind.annotation.XmlElement;
import javax.xml.bind.annotation.XmlType;


/**
 * <p>Java class for foxHesf5580 complex type.
 * 
 * <p>The following schema fragment specifies the expected content contained within this class.
 * 
 * <pre>
 * &lt;complexType name="foxHesf5580">
 *   &lt;complexContent>
 *     &lt;restriction base="{http://www.w3.org/2001/XMLSchema}anyType">
 *       &lt;sequence>
 *         &lt;element name="code_j" type="{http://www.w3.org/2001/XMLSchema}string" minOccurs="0"/>
 *         &lt;element name="coment" type="{http://www.w3.org/2001/XMLSchema}string" minOccurs="0"/>
 *         &lt;element name="code_r" type="{http://www.w3.org/2001/XMLSchema}string" minOccurs="0"/>
 *       &lt;/sequence>
 *     &lt;/restriction>
 *   &lt;/complexContent>
 * &lt;/complexType>
 * </pre>
 * 
 * 
 */
@XmlAccessorType(XmlAccessType.FIELD)
@XmlType(name = "foxHesf5580", propOrder = {
    "codeJ",
    "coment",
    "codeR"
})
public class FoxHesf5580 {

    @XmlElement(name = "code_j")
    protected String codeJ;
    protected String coment;
    @XmlElement(name = "code_r")
    protected String codeR;

    /**
     * Gets the value of the codeJ property.
     * 
     * @return
     *     possible object is
     *     {@link String }
     *     
     */
    public String getCodeJ() {
        return codeJ;
    }

    /**
     * Sets the value of the codeJ property.
     * 
     * @param value
     *     allowed object is
     *     {@link String }
     *     
     */
    public void setCodeJ(String value) {
        this.codeJ = value;
    }

    /**
     * Gets the value of the coment property.
     * 
     * @return
     *     possible object is
     *     {@link String }
     *     
     */
    public String getComent() {
        return coment;
    }

    /**
     * Sets the value of the coment property.
     * 
     * @param value
     *     allowed object is
     *     {@link String }
     *     
     */
    public void setComent(String value) {
        this.coment = value;
    }

    /**
     * Gets the value of the codeR property.
     * 
     * @return
     *     possible object is
     *     {@link String }
     *     
     */
    public String getCodeR() {
        return codeR;
    }

    /**
     * Sets the value of the codeR property.
     * 
     * @param value
     *     allowed object is
     *     {@link String }
     *     
     */
    public void setCodeR(String value) {
        this.codeR = value;
    }

}
