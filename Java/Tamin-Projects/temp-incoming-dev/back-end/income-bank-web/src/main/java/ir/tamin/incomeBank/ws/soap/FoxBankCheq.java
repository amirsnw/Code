
package ir.tamin.incomeBank.ws.soap;

import javax.xml.bind.annotation.XmlAccessType;
import javax.xml.bind.annotation.XmlAccessorType;
import javax.xml.bind.annotation.XmlType;


/**
 * <p>Java class for foxBankCheq complex type.
 * 
 * <p>The following schema fragment specifies the expected content contained within this class.
 * 
 * <pre>
 * &lt;complexType name="foxBankCheq">
 *   &lt;complexContent>
 *     &lt;restriction base="{http://www.w3.org/2001/XMLSchema}anyType">
 *       &lt;sequence>
 *         &lt;element name="hescode" type="{http://www.w3.org/2001/XMLSchema}string" minOccurs="0"/>
 *         &lt;element name="month" type="{http://www.w3.org/2001/XMLSchema}string" minOccurs="0"/>
 *         &lt;element name="type" type="{http://www.w3.org/2001/XMLSchema}string" minOccurs="0"/>
 *         &lt;element name="cheqno" type="{http://www.w3.org/2001/XMLSchema}string" minOccurs="0"/>
 *         &lt;element name="bankdate" type="{http://www.w3.org/2001/XMLSchema}string" minOccurs="0"/>
 *         &lt;element name="bed" type="{http://www.w3.org/2001/XMLSchema}long"/>
 *         &lt;element name="bes" type="{http://www.w3.org/2001/XMLSchema}long"/>
 *       &lt;/sequence>
 *     &lt;/restriction>
 *   &lt;/complexContent>
 * &lt;/complexType>
 * </pre>
 * 
 * 
 */
@XmlAccessorType(XmlAccessType.FIELD)
@XmlType(name = "foxBankCheq", propOrder = {
    "hescode",
    "month",
    "type",
    "cheqno",
    "bankdate",
    "bed",
    "bes"
})
public class FoxBankCheq {

    protected String hescode;
    protected String month;
    protected String type;
    protected String cheqno;
    protected String bankdate;
    protected long bed;
    protected long bes;

    /**
     * Gets the value of the hescode property.
     * 
     * @return
     *     possible object is
     *     {@link String }
     *     
     */
    public String getHescode() {
        return hescode;
    }

    /**
     * Sets the value of the hescode property.
     * 
     * @param value
     *     allowed object is
     *     {@link String }
     *     
     */
    public void setHescode(String value) {
        this.hescode = value;
    }

    /**
     * Gets the value of the month property.
     * 
     * @return
     *     possible object is
     *     {@link String }
     *     
     */
    public String getMonth() {
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
    public void setMonth(String value) {
        this.month = value;
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

    /**
     * Gets the value of the cheqno property.
     * 
     * @return
     *     possible object is
     *     {@link String }
     *     
     */
    public String getCheqno() {
        return cheqno;
    }

    /**
     * Sets the value of the cheqno property.
     * 
     * @param value
     *     allowed object is
     *     {@link String }
     *     
     */
    public void setCheqno(String value) {
        this.cheqno = value;
    }

    /**
     * Gets the value of the bankdate property.
     * 
     * @return
     *     possible object is
     *     {@link String }
     *     
     */
    public String getBankdate() {
        return bankdate;
    }

    /**
     * Sets the value of the bankdate property.
     * 
     * @param value
     *     allowed object is
     *     {@link String }
     *     
     */
    public void setBankdate(String value) {
        this.bankdate = value;
    }

    /**
     * Gets the value of the bed property.
     * 
     */
    public long getBed() {
        return bed;
    }

    /**
     * Sets the value of the bed property.
     * 
     */
    public void setBed(long value) {
        this.bed = value;
    }

    /**
     * Gets the value of the bes property.
     * 
     */
    public long getBes() {
        return bes;
    }

    /**
     * Sets the value of the bes property.
     * 
     */
    public void setBes(long value) {
        this.bes = value;
    }

}
