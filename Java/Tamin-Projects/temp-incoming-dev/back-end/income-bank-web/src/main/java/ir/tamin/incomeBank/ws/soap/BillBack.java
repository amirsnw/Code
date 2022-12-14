
package ir.tamin.incomeBank.ws.soap;

import javax.xml.bind.annotation.XmlAccessType;
import javax.xml.bind.annotation.XmlAccessorType;
import javax.xml.bind.annotation.XmlElement;
import javax.xml.bind.annotation.XmlType;


/**
 * <p>Java class for BillBack complex type.
 * 
 * <p>The following schema fragment specifies the expected content contained within this class.
 * 
 * <pre>
 * &lt;complexType name="BillBack">
 *   &lt;complexContent>
 *     &lt;restriction base="{http://www.w3.org/2001/XMLSchema}anyType">
 *       &lt;sequence>
 *         &lt;element name="BillBack_NAME" type="{http://www.w3.org/2001/XMLSchema}string" minOccurs="0"/>
 *         &lt;element name="BillBack_SIZE" type="{http://www.w3.org/2001/XMLSchema}long"/>
 *         &lt;element name="BillBack_RCV" type="{http://www.w3.org/2001/XMLSchema}string" minOccurs="0"/>
 *         &lt;element name="BillBack_SND" type="{http://www.w3.org/2001/XMLSchema}string" minOccurs="0"/>
 *         &lt;element name="BillBack_KIND" type="{http://www.w3.org/2001/XMLSchema}string" minOccurs="0"/>
 *         &lt;element name="BillBack_STAT" type="{http://www.w3.org/2001/XMLSchema}string" minOccurs="0"/>
 *         &lt;element name="BillBack_GTDT" type="{http://www.w3.org/2001/XMLSchema}string" minOccurs="0"/>
 *         &lt;element name="BillBack_YY" type="{http://www.w3.org/2001/XMLSchema}string" minOccurs="0"/>
 *         &lt;element name="BillBack_MON" type="{http://www.w3.org/2001/XMLSchema}string" minOccurs="0"/>
 *       &lt;/sequence>
 *     &lt;/restriction>
 *   &lt;/complexContent>
 * &lt;/complexType>
 * </pre>
 * 
 * 
 */
@XmlAccessorType(XmlAccessType.FIELD)
@XmlType(name = "BillBack", propOrder = {
    "billBackNAME",
    "billBackSIZE",
    "billBackRCV",
    "billBackSND",
    "billBackKIND",
    "billBackSTAT",
    "billBackGTDT",
    "billBackYY",
    "billBackMON"
})
public class BillBack {

    @XmlElement(name = "BillBack_NAME")
    protected String billBackNAME;
    @XmlElement(name = "BillBack_SIZE")
    protected long billBackSIZE;
    @XmlElement(name = "BillBack_RCV")
    protected String billBackRCV;
    @XmlElement(name = "BillBack_SND")
    protected String billBackSND;
    @XmlElement(name = "BillBack_KIND")
    protected String billBackKIND;
    @XmlElement(name = "BillBack_STAT")
    protected String billBackSTAT;
    @XmlElement(name = "BillBack_GTDT")
    protected String billBackGTDT;
    @XmlElement(name = "BillBack_YY")
    protected String billBackYY;
    @XmlElement(name = "BillBack_MON")
    protected String billBackMON;

    /**
     * Gets the value of the billBackNAME property.
     * 
     * @return
     *     possible object is
     *     {@link String }
     *     
     */
    public String getBillBackNAME() {
        return billBackNAME;
    }

    /**
     * Sets the value of the billBackNAME property.
     * 
     * @param value
     *     allowed object is
     *     {@link String }
     *     
     */
    public void setBillBackNAME(String value) {
        this.billBackNAME = value;
    }

    /**
     * Gets the value of the billBackSIZE property.
     * 
     */
    public long getBillBackSIZE() {
        return billBackSIZE;
    }

    /**
     * Sets the value of the billBackSIZE property.
     * 
     */
    public void setBillBackSIZE(long value) {
        this.billBackSIZE = value;
    }

    /**
     * Gets the value of the billBackRCV property.
     * 
     * @return
     *     possible object is
     *     {@link String }
     *     
     */
    public String getBillBackRCV() {
        return billBackRCV;
    }

    /**
     * Sets the value of the billBackRCV property.
     * 
     * @param value
     *     allowed object is
     *     {@link String }
     *     
     */
    public void setBillBackRCV(String value) {
        this.billBackRCV = value;
    }

    /**
     * Gets the value of the billBackSND property.
     * 
     * @return
     *     possible object is
     *     {@link String }
     *     
     */
    public String getBillBackSND() {
        return billBackSND;
    }

    /**
     * Sets the value of the billBackSND property.
     * 
     * @param value
     *     allowed object is
     *     {@link String }
     *     
     */
    public void setBillBackSND(String value) {
        this.billBackSND = value;
    }

    /**
     * Gets the value of the billBackKIND property.
     * 
     * @return
     *     possible object is
     *     {@link String }
     *     
     */
    public String getBillBackKIND() {
        return billBackKIND;
    }

    /**
     * Sets the value of the billBackKIND property.
     * 
     * @param value
     *     allowed object is
     *     {@link String }
     *     
     */
    public void setBillBackKIND(String value) {
        this.billBackKIND = value;
    }

    /**
     * Gets the value of the billBackSTAT property.
     * 
     * @return
     *     possible object is
     *     {@link String }
     *     
     */
    public String getBillBackSTAT() {
        return billBackSTAT;
    }

    /**
     * Sets the value of the billBackSTAT property.
     * 
     * @param value
     *     allowed object is
     *     {@link String }
     *     
     */
    public void setBillBackSTAT(String value) {
        this.billBackSTAT = value;
    }

    /**
     * Gets the value of the billBackGTDT property.
     * 
     * @return
     *     possible object is
     *     {@link String }
     *     
     */
    public String getBillBackGTDT() {
        return billBackGTDT;
    }

    /**
     * Sets the value of the billBackGTDT property.
     * 
     * @param value
     *     allowed object is
     *     {@link String }
     *     
     */
    public void setBillBackGTDT(String value) {
        this.billBackGTDT = value;
    }

    /**
     * Gets the value of the billBackYY property.
     * 
     * @return
     *     possible object is
     *     {@link String }
     *     
     */
    public String getBillBackYY() {
        return billBackYY;
    }

    /**
     * Sets the value of the billBackYY property.
     * 
     * @param value
     *     allowed object is
     *     {@link String }
     *     
     */
    public void setBillBackYY(String value) {
        this.billBackYY = value;
    }

    /**
     * Gets the value of the billBackMON property.
     * 
     * @return
     *     possible object is
     *     {@link String }
     *     
     */
    public String getBillBackMON() {
        return billBackMON;
    }

    /**
     * Sets the value of the billBackMON property.
     * 
     * @param value
     *     allowed object is
     *     {@link String }
     *     
     */
    public void setBillBackMON(String value) {
        this.billBackMON = value;
    }

}
