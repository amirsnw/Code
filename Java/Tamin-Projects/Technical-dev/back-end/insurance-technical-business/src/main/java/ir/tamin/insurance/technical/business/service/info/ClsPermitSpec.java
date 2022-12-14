
package ir.tamin.insurance.technical.business.service.info;

import javax.xml.bind.annotation.XmlAccessType;
import javax.xml.bind.annotation.XmlAccessorType;
import javax.xml.bind.annotation.XmlElement;
import javax.xml.bind.annotation.XmlType;


/**
 * <p>Java class for clsPermitSpec complex type.
 * 
 * <p>The following schema fragment specifies the expected content contained within this class.
 * 
 * <pre>
 * &lt;complexType name="clsPermitSpec">
 *   &lt;complexContent>
 *     &lt;restriction base="{http://www.w3.org/2001/XMLSchema}anyType">
 *       &lt;sequence>
 *         &lt;element name="CREATEDT" type="{http://www.w3.org/2001/XMLSchema}string" minOccurs="0"/>
 *         &lt;element name="CREATEUID" type="{http://www.w3.org/2001/XMLSchema}string" minOccurs="0"/>
 *         &lt;element name="ISU_REFRENCEDID" type="{http://www.w3.org/2001/XMLSchema}string" minOccurs="0"/>
 *         &lt;element name="LETTER_DATE" type="{http://www.w3.org/2001/XMLSchema}string" minOccurs="0"/>
 *         &lt;element name="LETTER_NO" type="{http://www.w3.org/2001/XMLSchema}string" minOccurs="0"/>
 *         &lt;element name="PERMITDATE" type="{http://www.w3.org/2001/XMLSchema}string" minOccurs="0"/>
 *         &lt;element name="PERMITSERIALNO" type="{http://www.w3.org/2001/XMLSchema}string" minOccurs="0"/>
 *         &lt;element name="PERMITTYPECODE" type="{http://www.w3.org/2001/XMLSchema}string" minOccurs="0"/>
 *         &lt;element name="PERMITVALUE" type="{http://www.w3.org/2001/XMLSchema}string" minOccurs="0"/>
 *         &lt;element name="PERMIT_EDATE" type="{http://www.w3.org/2001/XMLSchema}string" minOccurs="0"/>
 *         &lt;element name="PERMIT_SDATE" type="{http://www.w3.org/2001/XMLSchema}string" minOccurs="0"/>
 *         &lt;element name="RISUID" type="{http://www.w3.org/2001/XMLSchema}string" minOccurs="0"/>
 *         &lt;element name="RWSHID" type="{http://www.w3.org/2001/XMLSchema}string" minOccurs="0"/>
 *       &lt;/sequence>
 *     &lt;/restriction>
 *   &lt;/complexContent>
 * &lt;/complexType>
 * </pre>
 * 
 * 
 */
@XmlAccessorType(XmlAccessType.FIELD)
@XmlType(name = "clsPermitSpec", propOrder = {
    "createdt",
    "createuid",
    "isurefrencedid",
    "letterdate",
    "letterno",
    "permitdate",
    "permitserialno",
    "permittypecode",
    "permitvalue",
    "permitedate",
    "permitsdate",
    "risuid",
    "rwshid"
})
public class ClsPermitSpec {

    @XmlElement(name = "CREATEDT")
    protected String createdt;
    @XmlElement(name = "CREATEUID")
    protected String createuid;
    @XmlElement(name = "ISU_REFRENCEDID")
    protected String isurefrencedid;
    @XmlElement(name = "LETTER_DATE")
    protected String letterdate;
    @XmlElement(name = "LETTER_NO")
    protected String letterno;
    @XmlElement(name = "PERMITDATE")
    protected String permitdate;
    @XmlElement(name = "PERMITSERIALNO")
    protected String permitserialno;
    @XmlElement(name = "PERMITTYPECODE")
    protected String permittypecode;
    @XmlElement(name = "PERMITVALUE")
    protected String permitvalue;
    @XmlElement(name = "PERMIT_EDATE")
    protected String permitedate;
    @XmlElement(name = "PERMIT_SDATE")
    protected String permitsdate;
    @XmlElement(name = "RISUID")
    protected String risuid;
    @XmlElement(name = "RWSHID")
    protected String rwshid;

    /**
     * Gets the value of the createdt property.
     * 
     * @return
     *     possible object is
     *     {@link String }
     *     
     */
    public String getCREATEDT() {
        return createdt;
    }

    /**
     * Sets the value of the createdt property.
     * 
     * @param value
     *     allowed object is
     *     {@link String }
     *     
     */
    public void setCREATEDT(String value) {
        this.createdt = value;
    }

    /**
     * Gets the value of the createuid property.
     * 
     * @return
     *     possible object is
     *     {@link String }
     *     
     */
    public String getCREATEUID() {
        return createuid;
    }

    /**
     * Sets the value of the createuid property.
     * 
     * @param value
     *     allowed object is
     *     {@link String }
     *     
     */
    public void setCREATEUID(String value) {
        this.createuid = value;
    }

    /**
     * Gets the value of the isurefrencedid property.
     * 
     * @return
     *     possible object is
     *     {@link String }
     *     
     */
    public String getISUREFRENCEDID() {
        return isurefrencedid;
    }

    /**
     * Sets the value of the isurefrencedid property.
     * 
     * @param value
     *     allowed object is
     *     {@link String }
     *     
     */
    public void setISUREFRENCEDID(String value) {
        this.isurefrencedid = value;
    }

    /**
     * Gets the value of the letterdate property.
     * 
     * @return
     *     possible object is
     *     {@link String }
     *     
     */
    public String getLETTERDATE() {
        return letterdate;
    }

    /**
     * Sets the value of the letterdate property.
     * 
     * @param value
     *     allowed object is
     *     {@link String }
     *     
     */
    public void setLETTERDATE(String value) {
        this.letterdate = value;
    }

    /**
     * Gets the value of the letterno property.
     * 
     * @return
     *     possible object is
     *     {@link String }
     *     
     */
    public String getLETTERNO() {
        return letterno;
    }

    /**
     * Sets the value of the letterno property.
     * 
     * @param value
     *     allowed object is
     *     {@link String }
     *     
     */
    public void setLETTERNO(String value) {
        this.letterno = value;
    }

    /**
     * Gets the value of the permitdate property.
     * 
     * @return
     *     possible object is
     *     {@link String }
     *     
     */
    public String getPERMITDATE() {
        return permitdate;
    }

    /**
     * Sets the value of the permitdate property.
     * 
     * @param value
     *     allowed object is
     *     {@link String }
     *     
     */
    public void setPERMITDATE(String value) {
        this.permitdate = value;
    }

    /**
     * Gets the value of the permitserialno property.
     * 
     * @return
     *     possible object is
     *     {@link String }
     *     
     */
    public String getPERMITSERIALNO() {
        return permitserialno;
    }

    /**
     * Sets the value of the permitserialno property.
     * 
     * @param value
     *     allowed object is
     *     {@link String }
     *     
     */
    public void setPERMITSERIALNO(String value) {
        this.permitserialno = value;
    }

    /**
     * Gets the value of the permittypecode property.
     * 
     * @return
     *     possible object is
     *     {@link String }
     *     
     */
    public String getPERMITTYPECODE() {
        return permittypecode;
    }

    /**
     * Sets the value of the permittypecode property.
     * 
     * @param value
     *     allowed object is
     *     {@link String }
     *     
     */
    public void setPERMITTYPECODE(String value) {
        this.permittypecode = value;
    }

    /**
     * Gets the value of the permitvalue property.
     * 
     * @return
     *     possible object is
     *     {@link String }
     *     
     */
    public String getPERMITVALUE() {
        return permitvalue;
    }

    /**
     * Sets the value of the permitvalue property.
     * 
     * @param value
     *     allowed object is
     *     {@link String }
     *     
     */
    public void setPERMITVALUE(String value) {
        this.permitvalue = value;
    }

    /**
     * Gets the value of the permitedate property.
     * 
     * @return
     *     possible object is
     *     {@link String }
     *     
     */
    public String getPERMITEDATE() {
        return permitedate;
    }

    /**
     * Sets the value of the permitedate property.
     * 
     * @param value
     *     allowed object is
     *     {@link String }
     *     
     */
    public void setPERMITEDATE(String value) {
        this.permitedate = value;
    }

    /**
     * Gets the value of the permitsdate property.
     * 
     * @return
     *     possible object is
     *     {@link String }
     *     
     */
    public String getPERMITSDATE() {
        return permitsdate;
    }

    /**
     * Sets the value of the permitsdate property.
     * 
     * @param value
     *     allowed object is
     *     {@link String }
     *     
     */
    public void setPERMITSDATE(String value) {
        this.permitsdate = value;
    }

    /**
     * Gets the value of the risuid property.
     * 
     * @return
     *     possible object is
     *     {@link String }
     *     
     */
    public String getRISUID() {
        return risuid;
    }

    /**
     * Sets the value of the risuid property.
     * 
     * @param value
     *     allowed object is
     *     {@link String }
     *     
     */
    public void setRISUID(String value) {
        this.risuid = value;
    }

    /**
     * Gets the value of the rwshid property.
     * 
     * @return
     *     possible object is
     *     {@link String }
     *     
     */
    public String getRWSHID() {
        return rwshid;
    }

    /**
     * Sets the value of the rwshid property.
     * 
     * @param value
     *     allowed object is
     *     {@link String }
     *     
     */
    public void setRWSHID(String value) {
        this.rwshid = value;
    }

}
