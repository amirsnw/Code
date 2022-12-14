
package ir.tamin.incomeBank.ws.soap;

import javax.xml.bind.annotation.XmlAccessType;
import javax.xml.bind.annotation.XmlAccessorType;
import javax.xml.bind.annotation.XmlElement;
import javax.xml.bind.annotation.XmlType;


/**
 * <p>Java class for FinancialConfirmEntity complex type.
 * 
 * <p>The following schema fragment specifies the expected content contained within this class.
 * 
 * <pre>
 * &lt;complexType name="FinancialConfirmEntity">
 *   &lt;complexContent>
 *     &lt;restriction base="{http://www.w3.org/2001/XMLSchema}anyType">
 *       &lt;sequence>
 *         &lt;element name="res" type="{http://tempuri.org/}ServiceResult" minOccurs="0"/>
 *         &lt;element name="FRSTUSER_ID" type="{http://www.w3.org/2001/XMLSchema}string" minOccurs="0"/>
 *         &lt;element name="FRSTUSERNAME" type="{http://www.w3.org/2001/XMLSchema}string" minOccurs="0"/>
 *         &lt;element name="FRSTDATE" type="{http://www.w3.org/2001/XMLSchema}string" minOccurs="0"/>
 *         &lt;element name="LSTUSER_ID" type="{http://www.w3.org/2001/XMLSchema}string" minOccurs="0"/>
 *         &lt;element name="LSTUSERNAME" type="{http://www.w3.org/2001/XMLSchema}string" minOccurs="0"/>
 *         &lt;element name="LSTDATE" type="{http://www.w3.org/2001/XMLSchema}string" minOccurs="0"/>
 *         &lt;element name="TYPE_TAEID" type="{http://www.w3.org/2001/XMLSchema}string" minOccurs="0"/>
 *       &lt;/sequence>
 *     &lt;/restriction>
 *   &lt;/complexContent>
 * &lt;/complexType>
 * </pre>
 * 
 * 
 */
@XmlAccessorType(XmlAccessType.FIELD)
@XmlType(name = "FinancialConfirmEntity", propOrder = {
    "res",
    "frstuserid",
    "frstusername",
    "frstdate",
    "lstuserid",
    "lstusername",
    "lstdate",
    "typetaeid"
})
public class FinancialConfirmEntity {

    protected ServiceResult res;
    @XmlElement(name = "FRSTUSER_ID")
    protected String frstuserid;
    @XmlElement(name = "FRSTUSERNAME")
    protected String frstusername;
    @XmlElement(name = "FRSTDATE")
    protected String frstdate;
    @XmlElement(name = "LSTUSER_ID")
    protected String lstuserid;
    @XmlElement(name = "LSTUSERNAME")
    protected String lstusername;
    @XmlElement(name = "LSTDATE")
    protected String lstdate;
    @XmlElement(name = "TYPE_TAEID")
    protected String typetaeid;

    /**
     * Gets the value of the res property.
     * 
     * @return
     *     possible object is
     *     {@link ServiceResult }
     *     
     */
    public ServiceResult getRes() {
        return res;
    }

    /**
     * Sets the value of the res property.
     * 
     * @param value
     *     allowed object is
     *     {@link ServiceResult }
     *     
     */
    public void setRes(ServiceResult value) {
        this.res = value;
    }

    /**
     * Gets the value of the frstuserid property.
     * 
     * @return
     *     possible object is
     *     {@link String }
     *     
     */
    public String getFRSTUSERID() {
        return frstuserid;
    }

    /**
     * Sets the value of the frstuserid property.
     * 
     * @param value
     *     allowed object is
     *     {@link String }
     *     
     */
    public void setFRSTUSERID(String value) {
        this.frstuserid = value;
    }

    /**
     * Gets the value of the frstusername property.
     * 
     * @return
     *     possible object is
     *     {@link String }
     *     
     */
    public String getFRSTUSERNAME() {
        return frstusername;
    }

    /**
     * Sets the value of the frstusername property.
     * 
     * @param value
     *     allowed object is
     *     {@link String }
     *     
     */
    public void setFRSTUSERNAME(String value) {
        this.frstusername = value;
    }

    /**
     * Gets the value of the frstdate property.
     * 
     * @return
     *     possible object is
     *     {@link String }
     *     
     */
    public String getFRSTDATE() {
        return frstdate;
    }

    /**
     * Sets the value of the frstdate property.
     * 
     * @param value
     *     allowed object is
     *     {@link String }
     *     
     */
    public void setFRSTDATE(String value) {
        this.frstdate = value;
    }

    /**
     * Gets the value of the lstuserid property.
     * 
     * @return
     *     possible object is
     *     {@link String }
     *     
     */
    public String getLSTUSERID() {
        return lstuserid;
    }

    /**
     * Sets the value of the lstuserid property.
     * 
     * @param value
     *     allowed object is
     *     {@link String }
     *     
     */
    public void setLSTUSERID(String value) {
        this.lstuserid = value;
    }

    /**
     * Gets the value of the lstusername property.
     * 
     * @return
     *     possible object is
     *     {@link String }
     *     
     */
    public String getLSTUSERNAME() {
        return lstusername;
    }

    /**
     * Sets the value of the lstusername property.
     * 
     * @param value
     *     allowed object is
     *     {@link String }
     *     
     */
    public void setLSTUSERNAME(String value) {
        this.lstusername = value;
    }

    /**
     * Gets the value of the lstdate property.
     * 
     * @return
     *     possible object is
     *     {@link String }
     *     
     */
    public String getLSTDATE() {
        return lstdate;
    }

    /**
     * Sets the value of the lstdate property.
     * 
     * @param value
     *     allowed object is
     *     {@link String }
     *     
     */
    public void setLSTDATE(String value) {
        this.lstdate = value;
    }

    /**
     * Gets the value of the typetaeid property.
     * 
     * @return
     *     possible object is
     *     {@link String }
     *     
     */
    public String getTYPETAEID() {
        return typetaeid;
    }

    /**
     * Sets the value of the typetaeid property.
     * 
     * @param value
     *     allowed object is
     *     {@link String }
     *     
     */
    public void setTYPETAEID(String value) {
        this.typetaeid = value;
    }

}
