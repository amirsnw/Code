
package ir.tamin.incomeBank.ws.soap;

import javax.xml.bind.annotation.XmlAccessType;
import javax.xml.bind.annotation.XmlAccessorType;
import javax.xml.bind.annotation.XmlElement;
import javax.xml.bind.annotation.XmlType;


/**
 * <p>Java class for RemainBankEntity complex type.
 * 
 * <p>The following schema fragment specifies the expected content contained within this class.
 * 
 * <pre>
 * &lt;complexType name="RemainBankEntity">
 *   &lt;complexContent>
 *     &lt;restriction base="{http://www.w3.org/2001/XMLSchema}anyType">
 *       &lt;sequence>
 *         &lt;element name="COD_HES" type="{http://www.w3.org/2001/XMLSchema}string" minOccurs="0"/>
 *         &lt;element name="Mali_Code" type="{http://www.w3.org/2001/XMLSchema}string" minOccurs="0"/>
 *         &lt;element name="MONTH" type="{http://www.w3.org/2001/XMLSchema}string" minOccurs="0"/>
 *         &lt;element name="REMAINDAF" type="{http://www.w3.org/2001/XMLSchema}string" minOccurs="0"/>
 *         &lt;element name="REMAINBANK" type="{http://www.w3.org/2001/XMLSchema}string" minOccurs="0"/>
 *       &lt;/sequence>
 *     &lt;/restriction>
 *   &lt;/complexContent>
 * &lt;/complexType>
 * </pre>
 * 
 * 
 */
@XmlAccessorType(XmlAccessType.FIELD)
@XmlType(name = "RemainBankEntity", propOrder = {
    "codhes",
    "maliCode",
    "month",
    "remaindaf",
    "remainbank"
})
public class RemainBankEntity {

    @XmlElement(name = "COD_HES")
    protected String codhes;
    @XmlElement(name = "Mali_Code")
    protected String maliCode;
    @XmlElement(name = "MONTH")
    protected String month;
    @XmlElement(name = "REMAINDAF")
    protected String remaindaf;
    @XmlElement(name = "REMAINBANK")
    protected String remainbank;

    /**
     * Gets the value of the codhes property.
     * 
     * @return
     *     possible object is
     *     {@link String }
     *     
     */
    public String getCODHES() {
        return codhes;
    }

    /**
     * Sets the value of the codhes property.
     * 
     * @param value
     *     allowed object is
     *     {@link String }
     *     
     */
    public void setCODHES(String value) {
        this.codhes = value;
    }

    /**
     * Gets the value of the maliCode property.
     * 
     * @return
     *     possible object is
     *     {@link String }
     *     
     */
    public String getMaliCode() {
        return maliCode;
    }

    /**
     * Sets the value of the maliCode property.
     * 
     * @param value
     *     allowed object is
     *     {@link String }
     *     
     */
    public void setMaliCode(String value) {
        this.maliCode = value;
    }

    /**
     * Gets the value of the month property.
     * 
     * @return
     *     possible object is
     *     {@link String }
     *     
     */
    public String getMONTH() {
        return month;
    }

    /**
     * Sets the value of the month property.
     * 
     * @param value
     *     allowed object is
     *     {@link String }
     *     
     */
    public void setMONTH(String value) {
        this.month = value;
    }

    /**
     * Gets the value of the remaindaf property.
     * 
     * @return
     *     possible object is
     *     {@link String }
     *     
     */
    public String getREMAINDAF() {
        return remaindaf;
    }

    /**
     * Sets the value of the remaindaf property.
     * 
     * @param value
     *     allowed object is
     *     {@link String }
     *     
     */
    public void setREMAINDAF(String value) {
        this.remaindaf = value;
    }

    /**
     * Gets the value of the remainbank property.
     * 
     * @return
     *     possible object is
     *     {@link String }
     *     
     */
    public String getREMAINBANK() {
        return remainbank;
    }

    /**
     * Sets the value of the remainbank property.
     * 
     * @param value
     *     allowed object is
     *     {@link String }
     *     
     */
    public void setREMAINBANK(String value) {
        this.remainbank = value;
    }

}
