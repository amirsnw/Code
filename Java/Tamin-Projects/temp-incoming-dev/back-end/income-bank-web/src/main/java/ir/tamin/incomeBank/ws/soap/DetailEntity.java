
package ir.tamin.incomeBank.ws.soap;

import ir.tamin.incomeBank.model.financialDoc.ElmDetail;
import ir.tamin.incomeBank.model.financialDoc.ElmHeader;

import java.math.BigDecimal;
import javax.xml.bind.annotation.XmlAccessType;
import javax.xml.bind.annotation.XmlAccessorType;
import javax.xml.bind.annotation.XmlElement;
import javax.xml.bind.annotation.XmlType;


/**
 * <p>Java class for DetailEntity complex type.
 * 
 * <p>The following schema fragment specifies the expected content contained within this class.
 * 
 * <pre>
 * &lt;complexType name="DetailEntity">
 *   &lt;complexContent>
 *     &lt;restriction base="{http://www.w3.org/2001/XMLSchema}anyType">
 *       &lt;sequence>
 *         &lt;element name="VAHEDCODE" type="{http://www.w3.org/2001/XMLSchema}string" minOccurs="0"/>
 *         &lt;element name="SEQ_DETAIL" type="{http://www.w3.org/2001/XMLSchema}string" minOccurs="0"/>
 *         &lt;element name="COD_KOL" type="{http://www.w3.org/2001/XMLSchema}string" minOccurs="0"/>
 *         &lt;element name="COD_MOI" type="{http://www.w3.org/2001/XMLSchema}string" minOccurs="0"/>
 *         &lt;element name="COD_TAF" type="{http://www.w3.org/2001/XMLSchema}string" minOccurs="0"/>
 *         &lt;element name="COD_JOZ" type="{http://www.w3.org/2001/XMLSchema}string" minOccurs="0"/>
 *         &lt;element name="COD_RIZ" type="{http://www.w3.org/2001/XMLSchema}string" minOccurs="0"/>
 *         &lt;element name="DETAIL_DESC" type="{http://www.w3.org/2001/XMLSchema}string" minOccurs="0"/>
 *         &lt;element name="AMOU_BED" type="{http://www.w3.org/2001/XMLSchema}decimal"/>
 *         &lt;element name="AMOU_BES" type="{http://www.w3.org/2001/XMLSchema}decimal"/>
 *         &lt;element name="TYPE_DOC" type="{http://www.w3.org/2001/XMLSchema}string" minOccurs="0"/>
 *         &lt;element name="VALUE" type="{http://www.w3.org/2001/XMLSchema}string" minOccurs="0"/>
 *         &lt;element name="CHECK_DATE" type="{http://www.w3.org/2001/XMLSchema}string" minOccurs="0"/>
 *         &lt;element name="YEAR" type="{http://www.w3.org/2001/XMLSchema}string" minOccurs="0"/>
 *       &lt;/sequence>
 *     &lt;/restriction>
 *   &lt;/complexContent>
 * &lt;/complexType>
 * </pre>
 * 
 * 
 */
@XmlAccessorType(XmlAccessType.FIELD)
@XmlType(name = "DetailEntity", propOrder = {
    "vahedcode",
    "seqdetail",
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
    "checkdate",
    "year"
})
public class DetailEntity {

    @XmlElement(name = "VAHEDCODE")
    protected String vahedcode;
    @XmlElement(name = "SEQ_DETAIL")
    protected String seqdetail;
    @XmlElement(name = "COD_KOL")
    protected String codkol;
    @XmlElement(name = "COD_MOI")
    protected String codmoi;
    @XmlElement(name = "COD_TAF")
    protected String codtaf;
    @XmlElement(name = "COD_JOZ")
    protected String codjoz;
    @XmlElement(name = "COD_RIZ")
    protected String codriz;
    @XmlElement(name = "DETAIL_DESC")
    protected String detaildesc;
    @XmlElement(name = "AMOU_BED", required = true)
    protected BigDecimal amoubed;
    @XmlElement(name = "AMOU_BES", required = true)
    protected BigDecimal amoubes;
    @XmlElement(name = "TYPE_DOC")
    protected String typedoc;
    @XmlElement(name = "VALUE")
    protected String value;
    @XmlElement(name = "CHECK_DATE")
    protected String checkdate;
    @XmlElement(name = "YEAR")
    protected String year;

    public DetailEntity() {
    }

    public DetailEntity(ElmDetail elmDetail) {
        this.vahedcode = elmDetail.getVahedcode();
        this.seqdetail = elmDetail.getSeqdetail();
        this.codkol = elmDetail.getCodkol();
        this.codmoi = elmDetail.getCodmoi();
        this.codtaf = elmDetail.getCodtaf();
        this.codjoz = elmDetail.getCodjoz();
        this.codriz = elmDetail.getCodriz();
        this.detaildesc = elmDetail.getDetaildesc();
        this.amoubed = elmDetail.getAmoubed();
        this.amoubes = elmDetail.getAmoubes();
        this.typedoc = elmDetail.getTypedoc();
        this.value = elmDetail.getValue();
        this.checkdate = elmDetail.getCheckdate();
        this.year = elmDetail.getYear();
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
     * Gets the value of the seqdetail property.
     * 
     * @return
     *     possible object is
     *     {@link String }
     *     
     */
    public String getSEQDETAIL() {
        return seqdetail;
    }

    /**
     * Sets the value of the seqdetail property.
     * 
     * @param value
     *     allowed object is
     *     {@link String }
     *     
     */
    public void setSEQDETAIL(String value) {
        this.seqdetail = value;
    }

    /**
     * Gets the value of the codkol property.
     * 
     * @return
     *     possible object is
     *     {@link String }
     *     
     */
    public String getCODKOL() {
        return codkol;
    }

    /**
     * Sets the value of the codkol property.
     * 
     * @param value
     *     allowed object is
     *     {@link String }
     *     
     */
    public void setCODKOL(String value) {
        this.codkol = value;
    }

    /**
     * Gets the value of the codmoi property.
     * 
     * @return
     *     possible object is
     *     {@link String }
     *     
     */
    public String getCODMOI() {
        return codmoi;
    }

    /**
     * Sets the value of the codmoi property.
     * 
     * @param value
     *     allowed object is
     *     {@link String }
     *     
     */
    public void setCODMOI(String value) {
        this.codmoi = value;
    }

    /**
     * Gets the value of the codtaf property.
     * 
     * @return
     *     possible object is
     *     {@link String }
     *     
     */
    public String getCODTAF() {
        return codtaf;
    }

    /**
     * Sets the value of the codtaf property.
     * 
     * @param value
     *     allowed object is
     *     {@link String }
     *     
     */
    public void setCODTAF(String value) {
        this.codtaf = value;
    }

    /**
     * Gets the value of the codjoz property.
     * 
     * @return
     *     possible object is
     *     {@link String }
     *     
     */
    public String getCODJOZ() {
        return codjoz;
    }

    /**
     * Sets the value of the codjoz property.
     * 
     * @param value
     *     allowed object is
     *     {@link String }
     *     
     */
    public void setCODJOZ(String value) {
        this.codjoz = value;
    }

    /**
     * Gets the value of the codriz property.
     * 
     * @return
     *     possible object is
     *     {@link String }
     *     
     */
    public String getCODRIZ() {
        return codriz;
    }

    /**
     * Sets the value of the codriz property.
     * 
     * @param value
     *     allowed object is
     *     {@link String }
     *     
     */
    public void setCODRIZ(String value) {
        this.codriz = value;
    }

    /**
     * Gets the value of the detaildesc property.
     * 
     * @return
     *     possible object is
     *     {@link String }
     *     
     */
    public String getDETAILDESC() {
        return detaildesc;
    }

    /**
     * Sets the value of the detaildesc property.
     * 
     * @param value
     *     allowed object is
     *     {@link String }
     *     
     */
    public void setDETAILDESC(String value) {
        this.detaildesc = value;
    }

    /**
     * Gets the value of the amoubed property.
     * 
     * @return
     *     possible object is
     *     {@link BigDecimal }
     *     
     */
    public BigDecimal getAMOUBED() {
        return amoubed;
    }

    /**
     * Sets the value of the amoubed property.
     * 
     * @param value
     *     allowed object is
     *     {@link BigDecimal }
     *     
     */
    public void setAMOUBED(BigDecimal value) {
        this.amoubed = value;
    }

    /**
     * Gets the value of the amoubes property.
     * 
     * @return
     *     possible object is
     *     {@link BigDecimal }
     *     
     */
    public BigDecimal getAMOUBES() {
        return amoubes;
    }

    /**
     * Sets the value of the amoubes property.
     * 
     * @param value
     *     allowed object is
     *     {@link BigDecimal }
     *     
     */
    public void setAMOUBES(BigDecimal value) {
        this.amoubes = value;
    }

    /**
     * Gets the value of the typedoc property.
     * 
     * @return
     *     possible object is
     *     {@link String }
     *     
     */
    public String getTYPEDOC() {
        return typedoc;
    }

    /**
     * Sets the value of the typedoc property.
     * 
     * @param value
     *     allowed object is
     *     {@link String }
     *     
     */
    public void setTYPEDOC(String value) {
        this.typedoc = value;
    }

    /**
     * Gets the value of the value property.
     * 
     * @return
     *     possible object is
     *     {@link String }
     *     
     */
    public String getVALUE() {
        return value;
    }

    /**
     * Sets the value of the value property.
     * 
     * @param value
     *     allowed object is
     *     {@link String }
     *     
     */
    public void setVALUE(String value) {
        this.value = value;
    }

    /**
     * Gets the value of the checkdate property.
     * 
     * @return
     *     possible object is
     *     {@link String }
     *     
     */
    public String getCHECKDATE() {
        return checkdate;
    }

    /**
     * Sets the value of the checkdate property.
     * 
     * @param value
     *     allowed object is
     *     {@link String }
     *     
     */
    public void setCHECKDATE(String value) {
        this.checkdate = value;
    }

    /**
     * Gets the value of the year property.
     * 
     * @return
     *     possible object is
     *     {@link String }
     *     
     */
    public String getYEAR() {
        return year;
    }

    /**
     * Sets the value of the year property.
     * 
     * @param value
     *     allowed object is
     *     {@link String }
     *     
     */
    public void setYEAR(String value) {
        this.year = value;
    }

}
