
package ir.tamin.incomeBank.service.daramadBank.webservice;

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
 *         &lt;element name="s_Account" type="{http://www.w3.org/2001/XMLSchema}string" minOccurs="0"/>
 *         &lt;element name="s_RowId" type="{http://www.w3.org/2001/XMLSchema}string" minOccurs="0"/>
 *         &lt;element name="s_Dt" type="{http://www.w3.org/2001/XMLSchema}string" minOccurs="0"/>
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
    "sAccount",
    "sRowId",
    "sDt"
})
@XmlRootElement(name = "OrdRequest_Refah_old")
public class OrdRequestRefahOld {

    @XmlElement(name = "s_Account")
    protected String sAccount;
    @XmlElement(name = "s_RowId")
    protected String sRowId;
    @XmlElement(name = "s_Dt")
    protected String sDt;

    /**
     * Gets the value of the sAccount property.
     * 
     * @return
     *     possible object is
     *     {@link String }
     *     
     */
    public String getSAccount() {
        return sAccount;
    }

    /**
     * Sets the value of the sAccount property.
     * 
     * @param value
     *     allowed object is
     *     {@link String }
     *     
     */
    public void setSAccount(String value) {
        this.sAccount = value;
    }

    /**
     * Gets the value of the sRowId property.
     * 
     * @return
     *     possible object is
     *     {@link String }
     *     
     */
    public String getSRowId() {
        return sRowId;
    }

    /**
     * Sets the value of the sRowId property.
     * 
     * @param value
     *     allowed object is
     *     {@link String }
     *     
     */
    public void setSRowId(String value) {
        this.sRowId = value;
    }

    /**
     * Gets the value of the sDt property.
     * 
     * @return
     *     possible object is
     *     {@link String }
     *     
     */
    public String getSDt() {
        return sDt;
    }

    /**
     * Sets the value of the sDt property.
     * 
     * @param value
     *     allowed object is
     *     {@link String }
     *     
     */
    public void setSDt(String value) {
        this.sDt = value;
    }

}
