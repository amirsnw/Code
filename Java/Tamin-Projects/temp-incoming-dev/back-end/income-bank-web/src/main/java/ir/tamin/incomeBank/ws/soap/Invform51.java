
package ir.tamin.incomeBank.ws.soap;

import javax.xml.bind.annotation.XmlAccessType;
import javax.xml.bind.annotation.XmlAccessorType;
import javax.xml.bind.annotation.XmlType;


/**
 * <p>Java class for Invform5_1 complex type.
 * 
 * <p>The following schema fragment specifies the expected content contained within this class.
 * 
 * <pre>
 * &lt;complexType name="Invform5_1">
 *   &lt;complexContent>
 *     &lt;restriction base="{http://www.w3.org/2001/XMLSchema}anyType">
 *       &lt;sequence>
 *         &lt;element name="invNo" type="{http://www.w3.org/2001/XMLSchema}string" minOccurs="0"/>
 *         &lt;element name="invName" type="{http://www.w3.org/2001/XMLSchema}string" minOccurs="0"/>
 *         &lt;element name="mojudiGblShmaresh" type="{http://www.w3.org/2001/XMLSchema}float"/>
 *         &lt;element name="rialGblShmaresh" type="{http://www.w3.org/2001/XMLSchema}long"/>
 *         &lt;element name="numEzafi" type="{http://www.w3.org/2001/XMLSchema}float"/>
 *         &lt;element name="rialEzafi" type="{http://www.w3.org/2001/XMLSchema}long"/>
 *         &lt;element name="numKasri" type="{http://www.w3.org/2001/XMLSchema}float"/>
 *         &lt;element name="rialKasri" type="{http://www.w3.org/2001/XMLSchema}long"/>
 *         &lt;element name="mojudiTbgShmreshAnbar" type="{http://www.w3.org/2001/XMLSchema}float"/>
 *         &lt;element name="rialTbgShmreshAnbar" type="{http://www.w3.org/2001/XMLSchema}long"/>
 *         &lt;element name="sendOp" type="{http://www.w3.org/2001/XMLSchema}string" minOccurs="0"/>
 *         &lt;element name="sendDt" type="{http://www.w3.org/2001/XMLSchema}string" minOccurs="0"/>
 *       &lt;/sequence>
 *     &lt;/restriction>
 *   &lt;/complexContent>
 * &lt;/complexType>
 * </pre>
 * 
 * 
 */
@XmlAccessorType(XmlAccessType.FIELD)
@XmlType(name = "Invform5_1", propOrder = {
    "invNo",
    "invName",
    "mojudiGblShmaresh",
    "rialGblShmaresh",
    "numEzafi",
    "rialEzafi",
    "numKasri",
    "rialKasri",
    "mojudiTbgShmreshAnbar",
    "rialTbgShmreshAnbar",
    "sendOp",
    "sendDt"
})
public class Invform51 {

    protected String invNo;
    protected String invName;
    protected float mojudiGblShmaresh;
    protected long rialGblShmaresh;
    protected float numEzafi;
    protected long rialEzafi;
    protected float numKasri;
    protected long rialKasri;
    protected float mojudiTbgShmreshAnbar;
    protected long rialTbgShmreshAnbar;
    protected String sendOp;
    protected String sendDt;

    /**
     * Gets the value of the invNo property.
     * 
     * @return
     *     possible object is
     *     {@link String }
     *     
     */
    public String getInvNo() {
        return invNo;
    }

    /**
     * Sets the value of the invNo property.
     * 
     * @param value
     *     allowed object is
     *     {@link String }
     *     
     */
    public void setInvNo(String value) {
        this.invNo = value;
    }

    /**
     * Gets the value of the invName property.
     * 
     * @return
     *     possible object is
     *     {@link String }
     *     
     */
    public String getInvName() {
        return invName;
    }

    /**
     * Sets the value of the invName property.
     * 
     * @param value
     *     allowed object is
     *     {@link String }
     *     
     */
    public void setInvName(String value) {
        this.invName = value;
    }

    /**
     * Gets the value of the mojudiGblShmaresh property.
     * 
     */
    public float getMojudiGblShmaresh() {
        return mojudiGblShmaresh;
    }

    /**
     * Sets the value of the mojudiGblShmaresh property.
     * 
     */
    public void setMojudiGblShmaresh(float value) {
        this.mojudiGblShmaresh = value;
    }

    /**
     * Gets the value of the rialGblShmaresh property.
     * 
     */
    public long getRialGblShmaresh() {
        return rialGblShmaresh;
    }

    /**
     * Sets the value of the rialGblShmaresh property.
     * 
     */
    public void setRialGblShmaresh(long value) {
        this.rialGblShmaresh = value;
    }

    /**
     * Gets the value of the numEzafi property.
     * 
     */
    public float getNumEzafi() {
        return numEzafi;
    }

    /**
     * Sets the value of the numEzafi property.
     * 
     */
    public void setNumEzafi(float value) {
        this.numEzafi = value;
    }

    /**
     * Gets the value of the rialEzafi property.
     * 
     */
    public long getRialEzafi() {
        return rialEzafi;
    }

    /**
     * Sets the value of the rialEzafi property.
     * 
     */
    public void setRialEzafi(long value) {
        this.rialEzafi = value;
    }

    /**
     * Gets the value of the numKasri property.
     * 
     */
    public float getNumKasri() {
        return numKasri;
    }

    /**
     * Sets the value of the numKasri property.
     * 
     */
    public void setNumKasri(float value) {
        this.numKasri = value;
    }

    /**
     * Gets the value of the rialKasri property.
     * 
     */
    public long getRialKasri() {
        return rialKasri;
    }

    /**
     * Sets the value of the rialKasri property.
     * 
     */
    public void setRialKasri(long value) {
        this.rialKasri = value;
    }

    /**
     * Gets the value of the mojudiTbgShmreshAnbar property.
     * 
     */
    public float getMojudiTbgShmreshAnbar() {
        return mojudiTbgShmreshAnbar;
    }

    /**
     * Sets the value of the mojudiTbgShmreshAnbar property.
     * 
     */
    public void setMojudiTbgShmreshAnbar(float value) {
        this.mojudiTbgShmreshAnbar = value;
    }

    /**
     * Gets the value of the rialTbgShmreshAnbar property.
     * 
     */
    public long getRialTbgShmreshAnbar() {
        return rialTbgShmreshAnbar;
    }

    /**
     * Sets the value of the rialTbgShmreshAnbar property.
     * 
     */
    public void setRialTbgShmreshAnbar(long value) {
        this.rialTbgShmreshAnbar = value;
    }

    /**
     * Gets the value of the sendOp property.
     * 
     * @return
     *     possible object is
     *     {@link String }
     *     
     */
    public String getSendOp() {
        return sendOp;
    }

    /**
     * Sets the value of the sendOp property.
     * 
     * @param value
     *     allowed object is
     *     {@link String }
     *     
     */
    public void setSendOp(String value) {
        this.sendOp = value;
    }

    /**
     * Gets the value of the sendDt property.
     * 
     * @return
     *     possible object is
     *     {@link String }
     *     
     */
    public String getSendDt() {
        return sendDt;
    }

    /**
     * Sets the value of the sendDt property.
     * 
     * @param value
     *     allowed object is
     *     {@link String }
     *     
     */
    public void setSendDt(String value) {
        this.sendDt = value;
    }

}
