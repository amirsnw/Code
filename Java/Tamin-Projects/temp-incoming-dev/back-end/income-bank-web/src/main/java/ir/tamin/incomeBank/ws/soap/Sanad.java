
package ir.tamin.incomeBank.ws.soap;

import javax.xml.bind.annotation.XmlAccessType;
import javax.xml.bind.annotation.XmlAccessorType;
import javax.xml.bind.annotation.XmlElement;
import javax.xml.bind.annotation.XmlType;


/**
 * <p>Java class for Sanad complex type.
 * 
 * <p>The following schema fragment specifies the expected content contained within this class.
 * 
 * <pre>
 * &lt;complexType name="Sanad">
 *   &lt;complexContent>
 *     &lt;restriction base="{http://www.w3.org/2001/XMLSchema}anyType">
 *       &lt;sequence>
 *         &lt;element name="SEQ_HEADER" type="{http://www.w3.org/2001/XMLSchema}long"/>
 *         &lt;element name="SANAD_YY" type="{http://www.w3.org/2001/XMLSchema}string" minOccurs="0"/>
 *         &lt;element name="VAHEDCODE" type="{http://www.w3.org/2001/XMLSchema}string" minOccurs="0"/>
 *         &lt;element name="DATE_DOC" type="{http://www.w3.org/2001/XMLSchema}string" minOccurs="0"/>
 *         &lt;element name="HEAD_DESC" type="{http://www.w3.org/2001/XMLSchema}string" minOccurs="0"/>
 *         &lt;element name="SYS_TYPE" type="{http://www.w3.org/2001/XMLSchema}string" minOccurs="0"/>
 *         &lt;element name="COD_KOL" type="{http://tempuri.org/}ArrayOfString" minOccurs="0"/>
 *         &lt;element name="COD_MOI" type="{http://tempuri.org/}ArrayOfString" minOccurs="0"/>
 *         &lt;element name="COD_TAF" type="{http://tempuri.org/}ArrayOfString" minOccurs="0"/>
 *         &lt;element name="COD_JOZ" type="{http://tempuri.org/}ArrayOfString" minOccurs="0"/>
 *         &lt;element name="COD_RIZ" type="{http://tempuri.org/}ArrayOfString" minOccurs="0"/>
 *         &lt;element name="DETAIL_DESC" type="{http://tempuri.org/}ArrayOfString" minOccurs="0"/>
 *         &lt;element name="AMOU_BED" type="{http://tempuri.org/}ArrayOfLong" minOccurs="0"/>
 *         &lt;element name="AMOU_BES" type="{http://tempuri.org/}ArrayOfLong" minOccurs="0"/>
 *         &lt;element name="TYPE_DOC" type="{http://tempuri.org/}ArrayOfString" minOccurs="0"/>
 *         &lt;element name="VALUE" type="{http://tempuri.org/}ArrayOfString" minOccurs="0"/>
 *         &lt;element name="CHECK_DATE" type="{http://tempuri.org/}ArrayOfString" minOccurs="0"/>
 *       &lt;/sequence>
 *     &lt;/restriction>
 *   &lt;/complexContent>
 * &lt;/complexType>
 * </pre>
 * 
 * 
 */
@XmlAccessorType(XmlAccessType.FIELD)
@XmlType(name = "Sanad", propOrder = {
    "seqheader",
    "sanadyy",
    "vahedcode",
    "datedoc",
    "headdesc",
    "systype",
    "codkol",
    "codmoi",
    "codtaf",
    "codjoz",
    "codriz",
    "detaildesc",
    "amoubed",
    "amoubes",
    "typedoc",
    "value",
    "checkdate"
})
public class Sanad {

    @XmlElement(name = "SEQ_HEADER")
    protected long seqheader;
    @XmlElement(name = "SANAD_YY")
    protected String sanadyy;
    @XmlElement(name = "VAHEDCODE")
    protected String vahedcode;
    @XmlElement(name = "DATE_DOC")
    protected String datedoc;
    @XmlElement(name = "HEAD_DESC")
    protected String headdesc;
    @XmlElement(name = "SYS_TYPE")
    protected String systype;
    @XmlElement(name = "COD_KOL")
    protected ArrayOfString codkol;
    @XmlElement(name = "COD_MOI")
    protected ArrayOfString codmoi;
    @XmlElement(name = "COD_TAF")
    protected ArrayOfString codtaf;
    @XmlElement(name = "COD_JOZ")
    protected ArrayOfString codjoz;
    @XmlElement(name = "COD_RIZ")
    protected ArrayOfString codriz;
    @XmlElement(name = "DETAIL_DESC")
    protected ArrayOfString detaildesc;
    @XmlElement(name = "AMOU_BED")
    protected ArrayOfLong amoubed;
    @XmlElement(name = "AMOU_BES")
    protected ArrayOfLong amoubes;
    @XmlElement(name = "TYPE_DOC")
    protected ArrayOfString typedoc;
    @XmlElement(name = "VALUE")
    protected ArrayOfString value;
    @XmlElement(name = "CHECK_DATE")
    protected ArrayOfString checkdate;

    /**
     * Gets the value of the seqheader property.
     * 
     */
    public long getSEQHEADER() {
        return seqheader;
    }

    /**
     * Sets the value of the seqheader property.
     * 
     */
    public void setSEQHEADER(long value) {
        this.seqheader = value;
    }

    /**
     * Gets the value of the sanadyy property.
     * 
     * @return
     *     possible object is
     *     {@link String }
     *     
     */
    public String getSANADYY() {
        return sanadyy;
    }

    /**
     * Sets the value of the sanadyy property.
     * 
     * @param value
     *     allowed object is
     *     {@link String }
     *     
     */
    public void setSANADYY(String value) {
        this.sanadyy = value;
    }

    /**
     * Gets the value of the vahedcode property.
     * 
     * @return
     *     possible object is
     *     {@link String }
     *     
     */
    public String getVAHEDCODE() {
        return vahedcode;
    }

    /**
     * Sets the value of the vahedcode property.
     * 
     * @param value
     *     allowed object is
     *     {@link String }
     *     
     */
    public void setVAHEDCODE(String value) {
        this.vahedcode = value;
    }

    /**
     * Gets the value of the datedoc property.
     * 
     * @return
     *     possible object is
     *     {@link String }
     *     
     */
    public String getDATEDOC() {
        return datedoc;
    }

    /**
     * Sets the value of the datedoc property.
     * 
     * @param value
     *     allowed object is
     *     {@link String }
     *     
     */
    public void setDATEDOC(String value) {
        this.datedoc = value;
    }

    /**
     * Gets the value of the headdesc property.
     * 
     * @return
     *     possible object is
     *     {@link String }
     *     
     */
    public String getHEADDESC() {
        return headdesc;
    }

    /**
     * Sets the value of the headdesc property.
     * 
     * @param value
     *     allowed object is
     *     {@link String }
     *     
     */
    public void setHEADDESC(String value) {
        this.headdesc = value;
    }

    /**
     * Gets the value of the systype property.
     * 
     * @return
     *     possible object is
     *     {@link String }
     *     
     */
    public String getSYSTYPE() {
        return systype;
    }

    /**
     * Sets the value of the systype property.
     * 
     * @param value
     *     allowed object is
     *     {@link String }
     *     
     */
    public void setSYSTYPE(String value) {
        this.systype = value;
    }

    /**
     * Gets the value of the codkol property.
     * 
     * @return
     *     possible object is
     *     {@link ArrayOfString }
     *     
     */
    public ArrayOfString getCODKOL() {
        return codkol;
    }

    /**
     * Sets the value of the codkol property.
     * 
     * @param value
     *     allowed object is
     *     {@link ArrayOfString }
     *     
     */
    public void setCODKOL(ArrayOfString value) {
        this.codkol = value;
    }

    /**
     * Gets the value of the codmoi property.
     * 
     * @return
     *     possible object is
     *     {@link ArrayOfString }
     *     
     */
    public ArrayOfString getCODMOI() {
        return codmoi;
    }

    /**
     * Sets the value of the codmoi property.
     * 
     * @param value
     *     allowed object is
     *     {@link ArrayOfString }
     *     
     */
    public void setCODMOI(ArrayOfString value) {
        this.codmoi = value;
    }

    /**
     * Gets the value of the codtaf property.
     * 
     * @return
     *     possible object is
     *     {@link ArrayOfString }
     *     
     */
    public ArrayOfString getCODTAF() {
        return codtaf;
    }

    /**
     * Sets the value of the codtaf property.
     * 
     * @param value
     *     allowed object is
     *     {@link ArrayOfString }
     *     
     */
    public void setCODTAF(ArrayOfString value) {
        this.codtaf = value;
    }

    /**
     * Gets the value of the codjoz property.
     * 
     * @return
     *     possible object is
     *     {@link ArrayOfString }
     *     
     */
    public ArrayOfString getCODJOZ() {
        return codjoz;
    }

    /**
     * Sets the value of the codjoz property.
     * 
     * @param value
     *     allowed object is
     *     {@link ArrayOfString }
     *     
     */
    public void setCODJOZ(ArrayOfString value) {
        this.codjoz = value;
    }

    /**
     * Gets the value of the codriz property.
     * 
     * @return
     *     possible object is
     *     {@link ArrayOfString }
     *     
     */
    public ArrayOfString getCODRIZ() {
        return codriz;
    }

    /**
     * Sets the value of the codriz property.
     * 
     * @param value
     *     allowed object is
     *     {@link ArrayOfString }
     *     
     */
    public void setCODRIZ(ArrayOfString value) {
        this.codriz = value;
    }

    /**
     * Gets the value of the detaildesc property.
     * 
     * @return
     *     possible object is
     *     {@link ArrayOfString }
     *     
     */
    public ArrayOfString getDETAILDESC() {
        return detaildesc;
    }

    /**
     * Sets the value of the detaildesc property.
     * 
     * @param value
     *     allowed object is
     *     {@link ArrayOfString }
     *     
     */
    public void setDETAILDESC(ArrayOfString value) {
        this.detaildesc = value;
    }

    /**
     * Gets the value of the amoubed property.
     * 
     * @return
     *     possible object is
     *     {@link ArrayOfLong }
     *     
     */
    public ArrayOfLong getAMOUBED() {
        return amoubed;
    }

    /**
     * Sets the value of the amoubed property.
     * 
     * @param value
     *     allowed object is
     *     {@link ArrayOfLong }
     *     
     */
    public void setAMOUBED(ArrayOfLong value) {
        this.amoubed = value;
    }

    /**
     * Gets the value of the amoubes property.
     * 
     * @return
     *     possible object is
     *     {@link ArrayOfLong }
     *     
     */
    public ArrayOfLong getAMOUBES() {
        return amoubes;
    }

    /**
     * Sets the value of the amoubes property.
     * 
     * @param value
     *     allowed object is
     *     {@link ArrayOfLong }
     *     
     */
    public void setAMOUBES(ArrayOfLong value) {
        this.amoubes = value;
    }

    /**
     * Gets the value of the typedoc property.
     * 
     * @return
     *     possible object is
     *     {@link ArrayOfString }
     *     
     */
    public ArrayOfString getTYPEDOC() {
        return typedoc;
    }

    /**
     * Sets the value of the typedoc property.
     * 
     * @param value
     *     allowed object is
     *     {@link ArrayOfString }
     *     
     */
    public void setTYPEDOC(ArrayOfString value) {
        this.typedoc = value;
    }

    /**
     * Gets the value of the value property.
     * 
     * @return
     *     possible object is
     *     {@link ArrayOfString }
     *     
     */
    public ArrayOfString getVALUE() {
        return value;
    }

    /**
     * Sets the value of the value property.
     * 
     * @param value
     *     allowed object is
     *     {@link ArrayOfString }
     *     
     */
    public void setVALUE(ArrayOfString value) {
        this.value = value;
    }

    /**
     * Gets the value of the checkdate property.
     * 
     * @return
     *     possible object is
     *     {@link ArrayOfString }
     *     
     */
    public ArrayOfString getCHECKDATE() {
        return checkdate;
    }

    /**
     * Sets the value of the checkdate property.
     * 
     * @param value
     *     allowed object is
     *     {@link ArrayOfString }
     *     
     */
    public void setCHECKDATE(ArrayOfString value) {
        this.checkdate = value;
    }

}
