
package ir.tamin.incomeBank.service.daramadBank.webservice.centralAccount;

import javax.xml.bind.annotation.XmlAccessType;
import javax.xml.bind.annotation.XmlAccessorType;
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
 *         &lt;element name="brchCode" type="{http://www.w3.org/2001/XMLSchema}string" minOccurs="0"/>
 *         &lt;element name="mafasaNo" type="{http://www.w3.org/2001/XMLSchema}string" minOccurs="0"/>
 *         &lt;element name="rcntNo" type="{http://www.w3.org/2001/XMLSchema}string" minOccurs="0"/>
 *         &lt;element name="rcntDat" type="{http://www.w3.org/2001/XMLSchema}string" minOccurs="0"/>
 *         &lt;element name="rcontractfee" type="{http://www.w3.org/2001/XMLSchema}string" minOccurs="0"/>
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
    "brchCode",
    "mafasaNo",
    "rcntNo",
    "rcntDat",
    "rcontractfee"
})
@XmlRootElement(name = "GetMafasaInfo")
public class GetMafasaInfo {

    protected String brchCode;
    protected String mafasaNo;
    protected String rcntNo;
    protected String rcntDat;
    protected String rcontractfee;

    /**
     * Gets the value of the brchCode property.
     * 
     * @return
     *     possible object is
     *     {@link String }
     *     
     */
    public String getBrchCode() {
        return brchCode;
    }

    /**
     * Sets the value of the brchCode property.
     * 
     * @param value
     *     allowed object is
     *     {@link String }
     *     
     */
    public void setBrchCode(String value) {
        this.brchCode = value;
    }

    /**
     * Gets the value of the mafasaNo property.
     * 
     * @return
     *     possible object is
     *     {@link String }
     *     
     */
    public String getMafasaNo() {
        return mafasaNo;
    }

    /**
     * Sets the value of the mafasaNo property.
     * 
     * @param value
     *     allowed object is
     *     {@link String }
     *     
     */
    public void setMafasaNo(String value) {
        this.mafasaNo = value;
    }

    /**
     * Gets the value of the rcntNo property.
     * 
     * @return
     *     possible object is
     *     {@link String }
     *     
     */
    public String getRcntNo() {
        return rcntNo;
    }

    /**
     * Sets the value of the rcntNo property.
     * 
     * @param value
     *     allowed object is
     *     {@link String }
     *     
     */
    public void setRcntNo(String value) {
        this.rcntNo = value;
    }

    /**
     * Gets the value of the rcntDat property.
     * 
     * @return
     *     possible object is
     *     {@link String }
     *     
     */
    public String getRcntDat() {
        return rcntDat;
    }

    /**
     * Sets the value of the rcntDat property.
     * 
     * @param value
     *     allowed object is
     *     {@link String }
     *     
     */
    public void setRcntDat(String value) {
        this.rcntDat = value;
    }

    /**
     * Gets the value of the rcontractfee property.
     * 
     * @return
     *     possible object is
     *     {@link String }
     *     
     */
    public String getRcontractfee() {
        return rcontractfee;
    }

    /**
     * Sets the value of the rcontractfee property.
     * 
     * @param value
     *     allowed object is
     *     {@link String }
     *     
     */
    public void setRcontractfee(String value) {
        this.rcontractfee = value;
    }

}
