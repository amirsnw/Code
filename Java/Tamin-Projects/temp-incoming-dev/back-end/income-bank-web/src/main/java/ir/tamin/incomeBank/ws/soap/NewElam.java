
package ir.tamin.incomeBank.ws.soap;

import javax.xml.bind.annotation.XmlAccessType;
import javax.xml.bind.annotation.XmlAccessorType;
import javax.xml.bind.annotation.XmlElement;
import javax.xml.bind.annotation.XmlType;


/**
 * <p>Java class for NewElam complex type.
 * 
 * <p>The following schema fragment specifies the expected content contained within this class.
 * 
 * <pre>
 * &lt;complexType name="NewElam">
 *   &lt;complexContent>
 *     &lt;restriction base="{http://www.w3.org/2001/XMLSchema}anyType">
 *       &lt;sequence>
 *         &lt;element name="WEB_ELH_SEQ" type="{http://www.w3.org/2001/XMLSchema}long"/>
 *         &lt;element name="ELAMH_SERIALNO" type="{http://www.w3.org/2001/XMLSchema}string" minOccurs="0"/>
 *         &lt;element name="WEB_STAT" type="{http://www.w3.org/2001/XMLSchema}string" minOccurs="0"/>
 *         &lt;element name="ELAMH_CODE" type="{http://www.w3.org/2001/XMLSchema}string" minOccurs="0"/>
 *         &lt;element name="ELAMH_ENO" type="{http://www.w3.org/2001/XMLSchema}string" minOccurs="0"/>
 *         &lt;element name="ELAMH_EDATE" type="{http://www.w3.org/2001/XMLSchema}string" minOccurs="0"/>
 *         &lt;element name="ELAMH_DATE" type="{http://www.w3.org/2001/XMLSchema}string" minOccurs="0"/>
 *         &lt;element name="NOW_DATE" type="{http://www.w3.org/2001/XMLSchema}string" minOccurs="0"/>
 *         &lt;element name="ELM_RCVVAHED" type="{http://www.w3.org/2001/XMLSchema}string" minOccurs="0"/>
 *         &lt;element name="ELM_SNDVAHED" type="{http://www.w3.org/2001/XMLSchema}string" minOccurs="0"/>
 *         &lt;element name="ELAMH_YY" type="{http://www.w3.org/2001/XMLSchema}string" minOccurs="0"/>
 *         &lt;element name="ELAMH_CASE" type="{http://www.w3.org/2001/XMLSchema}string" minOccurs="0"/>
 *         &lt;element name="ATTRIBSEC" type="{http://www.w3.org/2001/XMLSchema}string" minOccurs="0"/>
 *         &lt;element name="AMOUNT" type="{http://www.w3.org/2001/XMLSchema}long"/>
 *         &lt;element name="COD_KOL" type="{http://tempuri.org/}ArrayOfString" minOccurs="0"/>
 *         &lt;element name="COD_MOI" type="{http://tempuri.org/}ArrayOfString" minOccurs="0"/>
 *         &lt;element name="COD_TAF" type="{http://tempuri.org/}ArrayOfString" minOccurs="0"/>
 *         &lt;element name="SND_DT" type="{http://www.w3.org/2001/XMLSchema}string" minOccurs="0"/>
 *         &lt;element name="AMOU_BED" type="{http://tempuri.org/}ArrayOfLong" minOccurs="0"/>
 *         &lt;element name="AMOU_BES" type="{http://tempuri.org/}ArrayOfLong" minOccurs="0"/>
 *         &lt;element name="ELAMD_DESC" type="{http://tempuri.org/}ArrayOfString" minOccurs="0"/>
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
@XmlType(name = "NewElam", propOrder = {
    "webelhseq",
    "elamhserialno",
    "webstat",
    "elamhcode",
    "elamheno",
    "elamhedate",
    "elamhdate",
    "nowdate",
    "elmrcvvahed",
    "elmsndvahed",
    "elamhyy",
    "elamhcase",
    "attribsec",
    "amount",
    "codkol",
    "codmoi",
    "codtaf",
    "snddt",
    "amoubed",
    "amoubes",
    "elamddesc",
    "version"
})
public class NewElam {

    @XmlElement(name = "WEB_ELH_SEQ")
    protected long webelhseq;
    @XmlElement(name = "ELAMH_SERIALNO")
    protected String elamhserialno;
    @XmlElement(name = "WEB_STAT")
    protected String webstat;
    @XmlElement(name = "ELAMH_CODE")
    protected String elamhcode;
    @XmlElement(name = "ELAMH_ENO")
    protected String elamheno;
    @XmlElement(name = "ELAMH_EDATE")
    protected String elamhedate;
    @XmlElement(name = "ELAMH_DATE")
    protected String elamhdate;
    @XmlElement(name = "NOW_DATE")
    protected String nowdate;
    @XmlElement(name = "ELM_RCVVAHED")
    protected String elmrcvvahed;
    @XmlElement(name = "ELM_SNDVAHED")
    protected String elmsndvahed;
    @XmlElement(name = "ELAMH_YY")
    protected String elamhyy;
    @XmlElement(name = "ELAMH_CASE")
    protected String elamhcase;
    @XmlElement(name = "ATTRIBSEC")
    protected String attribsec;
    @XmlElement(name = "AMOUNT")
    protected long amount;
    @XmlElement(name = "COD_KOL")
    protected ArrayOfString codkol;
    @XmlElement(name = "COD_MOI")
    protected ArrayOfString codmoi;
    @XmlElement(name = "COD_TAF")
    protected ArrayOfString codtaf;
    @XmlElement(name = "SND_DT")
    protected String snddt;
    @XmlElement(name = "AMOU_BED")
    protected ArrayOfLong amoubed;
    @XmlElement(name = "AMOU_BES")
    protected ArrayOfLong amoubes;
    @XmlElement(name = "ELAMD_DESC")
    protected ArrayOfString elamddesc;
    @XmlElement(name = "VERSION")
    protected String version;

    /**
     * Gets the value of the webelhseq property.
     * 
     */
    public long getWEBELHSEQ() {
        return webelhseq;
    }

    /**
     * Sets the value of the webelhseq property.
     * 
     */
    public void setWEBELHSEQ(long value) {
        this.webelhseq = value;
    }

    /**
     * Gets the value of the elamhserialno property.
     * 
     * @return
     *     possible object is
     *     {@link String }
     *     
     */
    public String getELAMHSERIALNO() {
        return elamhserialno;
    }

    /**
     * Sets the value of the elamhserialno property.
     * 
     * @param value
     *     allowed object is
     *     {@link String }
     *     
     */
    public void setELAMHSERIALNO(String value) {
        this.elamhserialno = value;
    }

    /**
     * Gets the value of the webstat property.
     * 
     * @return
     *     possible object is
     *     {@link String }
     *     
     */
    public String getWEBSTAT() {
        return webstat;
    }

    /**
     * Sets the value of the webstat property.
     * 
     * @param value
     *     allowed object is
     *     {@link String }
     *     
     */
    public void setWEBSTAT(String value) {
        this.webstat = value;
    }

    /**
     * Gets the value of the elamhcode property.
     * 
     * @return
     *     possible object is
     *     {@link String }
     *     
     */
    public String getELAMHCODE() {
        return elamhcode;
    }

    /**
     * Sets the value of the elamhcode property.
     * 
     * @param value
     *     allowed object is
     *     {@link String }
     *     
     */
    public void setELAMHCODE(String value) {
        this.elamhcode = value;
    }

    /**
     * Gets the value of the elamheno property.
     * 
     * @return
     *     possible object is
     *     {@link String }
     *     
     */
    public String getELAMHENO() {
        return elamheno;
    }

    /**
     * Sets the value of the elamheno property.
     * 
     * @param value
     *     allowed object is
     *     {@link String }
     *     
     */
    public void setELAMHENO(String value) {
        this.elamheno = value;
    }

    /**
     * Gets the value of the elamhedate property.
     * 
     * @return
     *     possible object is
     *     {@link String }
     *     
     */
    public String getELAMHEDATE() {
        return elamhedate;
    }

    /**
     * Sets the value of the elamhedate property.
     * 
     * @param value
     *     allowed object is
     *     {@link String }
     *     
     */
    public void setELAMHEDATE(String value) {
        this.elamhedate = value;
    }

    /**
     * Gets the value of the elamhdate property.
     * 
     * @return
     *     possible object is
     *     {@link String }
     *     
     */
    public String getELAMHDATE() {
        return elamhdate;
    }

    /**
     * Sets the value of the elamhdate property.
     * 
     * @param value
     *     allowed object is
     *     {@link String }
     *     
     */
    public void setELAMHDATE(String value) {
        this.elamhdate = value;
    }

    /**
     * Gets the value of the nowdate property.
     * 
     * @return
     *     possible object is
     *     {@link String }
     *     
     */
    public String getNOWDATE() {
        return nowdate;
    }

    /**
     * Sets the value of the nowdate property.
     * 
     * @param value
     *     allowed object is
     *     {@link String }
     *     
     */
    public void setNOWDATE(String value) {
        this.nowdate = value;
    }

    /**
     * Gets the value of the elmrcvvahed property.
     * 
     * @return
     *     possible object is
     *     {@link String }
     *     
     */
    public String getELMRCVVAHED() {
        return elmrcvvahed;
    }

    /**
     * Sets the value of the elmrcvvahed property.
     * 
     * @param value
     *     allowed object is
     *     {@link String }
     *     
     */
    public void setELMRCVVAHED(String value) {
        this.elmrcvvahed = value;
    }

    /**
     * Gets the value of the elmsndvahed property.
     * 
     * @return
     *     possible object is
     *     {@link String }
     *     
     */
    public String getELMSNDVAHED() {
        return elmsndvahed;
    }

    /**
     * Sets the value of the elmsndvahed property.
     * 
     * @param value
     *     allowed object is
     *     {@link String }
     *     
     */
    public void setELMSNDVAHED(String value) {
        this.elmsndvahed = value;
    }

    /**
     * Gets the value of the elamhyy property.
     * 
     * @return
     *     possible object is
     *     {@link String }
     *     
     */
    public String getELAMHYY() {
        return elamhyy;
    }

    /**
     * Sets the value of the elamhyy property.
     * 
     * @param value
     *     allowed object is
     *     {@link String }
     *     
     */
    public void setELAMHYY(String value) {
        this.elamhyy = value;
    }

    /**
     * Gets the value of the elamhcase property.
     * 
     * @return
     *     possible object is
     *     {@link String }
     *     
     */
    public String getELAMHCASE() {
        return elamhcase;
    }

    /**
     * Sets the value of the elamhcase property.
     * 
     * @param value
     *     allowed object is
     *     {@link String }
     *     
     */
    public void setELAMHCASE(String value) {
        this.elamhcase = value;
    }

    /**
     * Gets the value of the attribsec property.
     * 
     * @return
     *     possible object is
     *     {@link String }
     *     
     */
    public String getATTRIBSEC() {
        return attribsec;
    }

    /**
     * Sets the value of the attribsec property.
     * 
     * @param value
     *     allowed object is
     *     {@link String }
     *     
     */
    public void setATTRIBSEC(String value) {
        this.attribsec = value;
    }

    /**
     * Gets the value of the amount property.
     * 
     */
    public long getAMOUNT() {
        return amount;
    }

    /**
     * Sets the value of the amount property.
     * 
     */
    public void setAMOUNT(long value) {
        this.amount = value;
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
     * Gets the value of the snddt property.
     * 
     * @return
     *     possible object is
     *     {@link String }
     *     
     */
    public String getSNDDT() {
        return snddt;
    }

    /**
     * Sets the value of the snddt property.
     * 
     * @param value
     *     allowed object is
     *     {@link String }
     *     
     */
    public void setSNDDT(String value) {
        this.snddt = value;
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
     * Gets the value of the elamddesc property.
     * 
     * @return
     *     possible object is
     *     {@link ArrayOfString }
     *     
     */
    public ArrayOfString getELAMDDESC() {
        return elamddesc;
    }

    /**
     * Sets the value of the elamddesc property.
     * 
     * @param value
     *     allowed object is
     *     {@link ArrayOfString }
     *     
     */
    public void setELAMDDESC(ArrayOfString value) {
        this.elamddesc = value;
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
