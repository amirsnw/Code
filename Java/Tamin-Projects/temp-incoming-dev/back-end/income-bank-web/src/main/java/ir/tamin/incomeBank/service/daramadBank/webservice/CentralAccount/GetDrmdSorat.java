
package ir.tamin.incomeBank.service.daramadBank.webservice.centralAccount;

import javax.xml.bind.annotation.XmlAccessType;
import javax.xml.bind.annotation.XmlAccessorType;
import javax.xml.bind.annotation.XmlElement;
import javax.xml.bind.annotation.XmlRootElement;
import javax.xml.bind.annotation.XmlType;


/**
 * <p>Java class for anonymous complex type.
 * 
 * <p>The following schema fragment specifies the expected content contained within this class.
 * 
 * <pre>
 * &lt;complexType>
 *   &lt;complexContent>
 *     &lt;restriction base="{http://www.w3.org/2001/XMLSchema}anyType">
 *       &lt;sequence>
 *         &lt;element name="brchcode" type="{http://www.w3.org/2001/XMLSchema}string" minOccurs="0"/>
 *         &lt;element name="ordpay" type="{http://www.w3.org/2001/XMLSchema}string" minOccurs="0"/>
 *         &lt;element name="rcvno" type="{http://www.w3.org/2001/XMLSchema}string" minOccurs="0"/>
 *         &lt;element name="price" type="{http://www.w3.org/2001/XMLSchema}string" minOccurs="0"/>
 *         &lt;element name="crd_date" type="{http://www.w3.org/2001/XMLSchema}string" minOccurs="0"/>
 *         &lt;element name="rcvtype" type="{http://www.w3.org/2001/XMLSchema}string" minOccurs="0"/>
 *       &lt;/sequence>
 *     &lt;/restriction>
 *   &lt;/complexContent>
 * &lt;/complexType>
 * </pre>
 * 
 * 
 */
@XmlAccessorType(XmlAccessType.FIELD)
@XmlType(name = "", propOrder = {
    "brchcode",
    "ordpay",
    "rcvno",
    "price",
    "crdDate",
    "rcvtype"
})
@XmlRootElement(name = "GetDrmd_Sorat")
public class GetDrmdSorat {

    protected String brchcode;
    protected String ordpay;
    protected String rcvno;
    protected String price;
    @XmlElement(name = "crd_date")
    protected String crdDate;
    protected String rcvtype;

    /**
     * Gets the value of the brchcode property.
     * 
     * @return
     *     possible object is
     *     {@link String }
     *     
     */
    public String getBrchcode() {
        return brchcode;
    }

    /**
     * Sets the value of the brchcode property.
     * 
     * @param value
     *     allowed object is
     *     {@link String }
     *     
     */
    public void setBrchcode(String value) {
        this.brchcode = value;
    }

    /**
     * Gets the value of the ordpay property.
     * 
     * @return
     *     possible object is
     *     {@link String }
     *     
     */
    public String getOrdpay() {
        return ordpay;
    }

    /**
     * Sets the value of the ordpay property.
     * 
     * @param value
     *     allowed object is
     *     {@link String }
     *     
     */
    public void setOrdpay(String value) {
        this.ordpay = value;
    }

    /**
     * Gets the value of the rcvno property.
     * 
     * @return
     *     possible object is
     *     {@link String }
     *     
     */
    public String getRcvno() {
        return rcvno;
    }

    /**
     * Sets the value of the rcvno property.
     * 
     * @param value
     *     allowed object is
     *     {@link String }
     *     
     */
    public void setRcvno(String value) {
        this.rcvno = value;
    }

    /**
     * Gets the value of the price property.
     * 
     * @return
     *     possible object is
     *     {@link String }
     *     
     */
    public String getPrice() {
        return price;
    }

    /**
     * Sets the value of the price property.
     * 
     * @param value
     *     allowed object is
     *     {@link String }
     *     
     */
    public void setPrice(String value) {
        this.price = value;
    }

    /**
     * Gets the value of the crdDate property.
     * 
     * @return
     *     possible object is
     *     {@link String }
     *     
     */
    public String getCrdDate() {
        return crdDate;
    }

    /**
     * Sets the value of the crdDate property.
     * 
     * @param value
     *     allowed object is
     *     {@link String }
     *     
     */
    public void setCrdDate(String value) {
        this.crdDate = value;
    }

    /**
     * Gets the value of the rcvtype property.
     * 
     * @return
     *     possible object is
     *     {@link String }
     *     
     */
    public String getRcvtype() {
        return rcvtype;
    }

    /**
     * Sets the value of the rcvtype property.
     * 
     * @param value
     *     allowed object is
     *     {@link String }
     *     
     */
    public void setRcvtype(String value) {
        this.rcvtype = value;
    }

}
