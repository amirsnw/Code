
package ir.tamin.incomeBank.ws.soap;

import javax.xml.bind.annotation.XmlAccessType;
import javax.xml.bind.annotation.XmlAccessorType;
import javax.xml.bind.annotation.XmlElement;
import javax.xml.bind.annotation.XmlType;


/**
 * <p>Java class for foxRecv9240 complex type.
 * 
 * <p>The following schema fragment specifies the expected content contained within this class.
 * 
 * <pre>
 * &lt;complexType name="foxRecv9240">
 *   &lt;complexContent>
 *     &lt;restriction base="{http://www.w3.org/2001/XMLSchema}anyType">
 *       &lt;sequence>
 *         &lt;element name="eno" type="{http://www.w3.org/2001/XMLSchema}string" minOccurs="0"/>
 *         &lt;element name="edate" type="{http://www.w3.org/2001/XMLSchema}string" minOccurs="0"/>
 *         &lt;element name="sndcode" type="{http://www.w3.org/2001/XMLSchema}string" minOccurs="0"/>
 *         &lt;element name="yy" type="{http://www.w3.org/2001/XMLSchema}string" minOccurs="0"/>
 *         &lt;element name="relhesab" type="{http://www.w3.org/2001/XMLSchema}string" minOccurs="0"/>
 *         &lt;element name="prnno" type="{http://www.w3.org/2001/XMLSchema}long"/>
 *         &lt;element name="serialno" type="{http://www.w3.org/2001/XMLSchema}string" minOccurs="0"/>
 *         &lt;element name="no_doc" type="{http://www.w3.org/2001/XMLSchema}string" minOccurs="0"/>
 *       &lt;/sequence>
 *     &lt;/restriction>
 *   &lt;/complexContent>
 * &lt;/complexType>
 * </pre>
 * 
 * 
 */
@XmlAccessorType(XmlAccessType.FIELD)
@XmlType(name = "foxRecv9240", propOrder = {
    "eno",
    "edate",
    "sndcode",
    "yy",
    "relhesab",
    "prnno",
    "serialno",
    "noDoc"
})
public class FoxRecv9240 {

    protected String eno;
    protected String edate;
    protected String sndcode;
    protected String yy;
    protected String relhesab;
    protected long prnno;
    protected String serialno;
    @XmlElement(name = "no_doc")
    protected String noDoc;

    /**
     * Gets the value of the eno property.
     * 
     * @return
     *     possible object is
     *     {@link String }
     *     
     */
    public String getEno() {
        return eno;
    }

    /**
     * Sets the value of the eno property.
     * 
     * @param value
     *     allowed object is
     *     {@link String }
     *     
     */
    public void setEno(String value) {
        this.eno = value;
    }

    /**
     * Gets the value of the edate property.
     * 
     * @return
     *     possible object is
     *     {@link String }
     *     
     */
    public String getEdate() {
        return edate;
    }

    /**
     * Sets the value of the edate property.
     * 
     * @param value
     *     allowed object is
     *     {@link String }
     *     
     */
    public void setEdate(String value) {
        this.edate = value;
    }

    /**
     * Gets the value of the sndcode property.
     * 
     * @return
     *     possible object is
     *     {@link String }
     *     
     */
    public String getSndcode() {
        return sndcode;
    }

    /**
     * Sets the value of the sndcode property.
     * 
     * @param value
     *     allowed object is
     *     {@link String }
     *     
     */
    public void setSndcode(String value) {
        this.sndcode = value;
    }

    /**
     * Gets the value of the yy property.
     * 
     * @return
     *     possible object is
     *     {@link String }
     *     
     */
    public String getYy() {
        return yy;
    }

    /**
     * Sets the value of the yy property.
     * 
     * @param value
     *     allowed object is
     *     {@link String }
     *     
     */
    public void setYy(String value) {
        this.yy = value;
    }

    /**
     * Gets the value of the relhesab property.
     * 
     * @return
     *     possible object is
     *     {@link String }
     *     
     */
    public String getRelhesab() {
        return relhesab;
    }

    /**
     * Sets the value of the relhesab property.
     * 
     * @param value
     *     allowed object is
     *     {@link String }
     *     
     */
    public void setRelhesab(String value) {
        this.relhesab = value;
    }

    /**
     * Gets the value of the prnno property.
     * 
     */
    public long getPrnno() {
        return prnno;
    }

    /**
     * Sets the value of the prnno property.
     * 
     */
    public void setPrnno(long value) {
        this.prnno = value;
    }

    /**
     * Gets the value of the serialno property.
     * 
     * @return
     *     possible object is
     *     {@link String }
     *     
     */
    public String getSerialno() {
        return serialno;
    }

    /**
     * Sets the value of the serialno property.
     * 
     * @param value
     *     allowed object is
     *     {@link String }
     *     
     */
    public void setSerialno(String value) {
        this.serialno = value;
    }

    /**
     * Gets the value of the noDoc property.
     * 
     * @return
     *     possible object is
     *     {@link String }
     *     
     */
    public String getNoDoc() {
        return noDoc;
    }

    /**
     * Sets the value of the noDoc property.
     * 
     * @param value
     *     allowed object is
     *     {@link String }
     *     
     */
    public void setNoDoc(String value) {
        this.noDoc = value;
    }

}
