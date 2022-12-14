
package ir.tamin.incomeBank.ws.soap;

import javax.xml.bind.annotation.XmlAccessType;
import javax.xml.bind.annotation.XmlAccessorType;
import javax.xml.bind.annotation.XmlElement;
import javax.xml.bind.annotation.XmlType;


/**
 * <p>Java class for Attach complex type.
 * 
 * <p>The following schema fragment specifies the expected content contained within this class.
 * 
 * <pre>
 * &lt;complexType name="Attach">
 *   &lt;complexContent>
 *     &lt;restriction base="{http://www.w3.org/2001/XMLSchema}anyType">
 *       &lt;sequence>
 *         &lt;element name="ATCH_NAME" type="{http://www.w3.org/2001/XMLSchema}string" minOccurs="0"/>
 *         &lt;element name="ATCH_SIZE" type="{http://www.w3.org/2001/XMLSchema}long"/>
 *         &lt;element name="ATCH_ID" type="{http://www.w3.org/2001/XMLSchema}string" minOccurs="0"/>
 *         &lt;element name="ATCH_RCV" type="{http://www.w3.org/2001/XMLSchema}string" minOccurs="0"/>
 *         &lt;element name="ATCH_SND" type="{http://www.w3.org/2001/XMLSchema}string" minOccurs="0"/>
 *         &lt;element name="ATCH_KIND" type="{http://www.w3.org/2001/XMLSchema}string" minOccurs="0"/>
 *         &lt;element name="ATCH_NO" type="{http://www.w3.org/2001/XMLSchema}string" minOccurs="0"/>
 *         &lt;element name="ATCH_STAT" type="{http://www.w3.org/2001/XMLSchema}string" minOccurs="0"/>
 *         &lt;element name="ATCH_GTDT" type="{http://www.w3.org/2001/XMLSchema}string" minOccurs="0"/>
 *         &lt;element name="VERSION" type="{http://www.w3.org/2001/XMLSchema}string" minOccurs="0"/>
 *       &lt;/sequence>
 *     &lt;/restriction>
 *   &lt;/complexContent>
 * &lt;/complexType>
 * </pre>
 * 
 * 
 */
@XmlAccessorType(XmlAccessType.FIELD)
@XmlType(name = "Attach", propOrder = {
    "atchname",
    "atchsize",
    "atchid",
    "atchrcv",
    "atchsnd",
    "atchkind",
    "atchno",
    "atchstat",
    "atchgtdt",
    "version"
})
public class Attach {

    @XmlElement(name = "ATCH_NAME")
    protected String atchname;
    @XmlElement(name = "ATCH_SIZE")
    protected long atchsize;
    @XmlElement(name = "ATCH_ID")
    protected String atchid;
    @XmlElement(name = "ATCH_RCV")
    protected String atchrcv;
    @XmlElement(name = "ATCH_SND")
    protected String atchsnd;
    @XmlElement(name = "ATCH_KIND")
    protected String atchkind;
    @XmlElement(name = "ATCH_NO")
    protected String atchno;
    @XmlElement(name = "ATCH_STAT")
    protected String atchstat;
    @XmlElement(name = "ATCH_GTDT")
    protected String atchgtdt;
    @XmlElement(name = "VERSION")
    protected String version;

    /**
     * Gets the value of the atchname property.
     * 
     * @return
     *     possible object is
     *     {@link String }
     *     
     */
    public String getATCHNAME() {
        return atchname;
    }

    /**
     * Sets the value of the atchname property.
     * 
     * @param value
     *     allowed object is
     *     {@link String }
     *     
     */
    public void setATCHNAME(String value) {
        this.atchname = value;
    }

    /**
     * Gets the value of the atchsize property.
     * 
     */
    public long getATCHSIZE() {
        return atchsize;
    }

    /**
     * Sets the value of the atchsize property.
     * 
     */
    public void setATCHSIZE(long value) {
        this.atchsize = value;
    }

    /**
     * Gets the value of the atchid property.
     * 
     * @return
     *     possible object is
     *     {@link String }
     *     
     */
    public String getATCHID() {
        return atchid;
    }

    /**
     * Sets the value of the atchid property.
     * 
     * @param value
     *     allowed object is
     *     {@link String }
     *     
     */
    public void setATCHID(String value) {
        this.atchid = value;
    }

    /**
     * Gets the value of the atchrcv property.
     * 
     * @return
     *     possible object is
     *     {@link String }
     *     
     */
    public String getATCHRCV() {
        return atchrcv;
    }

    /**
     * Sets the value of the atchrcv property.
     * 
     * @param value
     *     allowed object is
     *     {@link String }
     *     
     */
    public void setATCHRCV(String value) {
        this.atchrcv = value;
    }

    /**
     * Gets the value of the atchsnd property.
     * 
     * @return
     *     possible object is
     *     {@link String }
     *     
     */
    public String getATCHSND() {
        return atchsnd;
    }

    /**
     * Sets the value of the atchsnd property.
     * 
     * @param value
     *     allowed object is
     *     {@link String }
     *     
     */
    public void setATCHSND(String value) {
        this.atchsnd = value;
    }

    /**
     * Gets the value of the atchkind property.
     * 
     * @return
     *     possible object is
     *     {@link String }
     *     
     */
    public String getATCHKIND() {
        return atchkind;
    }

    /**
     * Sets the value of the atchkind property.
     * 
     * @param value
     *     allowed object is
     *     {@link String }
     *     
     */
    public void setATCHKIND(String value) {
        this.atchkind = value;
    }

    /**
     * Gets the value of the atchno property.
     * 
     * @return
     *     possible object is
     *     {@link String }
     *     
     */
    public String getATCHNO() {
        return atchno;
    }

    /**
     * Sets the value of the atchno property.
     * 
     * @param value
     *     allowed object is
     *     {@link String }
     *     
     */
    public void setATCHNO(String value) {
        this.atchno = value;
    }

    /**
     * Gets the value of the atchstat property.
     * 
     * @return
     *     possible object is
     *     {@link String }
     *     
     */
    public String getATCHSTAT() {
        return atchstat;
    }

    /**
     * Sets the value of the atchstat property.
     * 
     * @param value
     *     allowed object is
     *     {@link String }
     *     
     */
    public void setATCHSTAT(String value) {
        this.atchstat = value;
    }

    /**
     * Gets the value of the atchgtdt property.
     * 
     * @return
     *     possible object is
     *     {@link String }
     *     
     */
    public String getATCHGTDT() {
        return atchgtdt;
    }

    /**
     * Sets the value of the atchgtdt property.
     * 
     * @param value
     *     allowed object is
     *     {@link String }
     *     
     */
    public void setATCHGTDT(String value) {
        this.atchgtdt = value;
    }

    /**
     * Gets the value of the version property.
     * 
     * @return
     *     possible object is
     *     {@link String }
     *     
     */
    public String getVERSION() {
        return version;
    }

    /**
     * Sets the value of the version property.
     * 
     * @param value
     *     allowed object is
     *     {@link String }
     *     
     */
    public void setVERSION(String value) {
        this.version = value;
    }

}
