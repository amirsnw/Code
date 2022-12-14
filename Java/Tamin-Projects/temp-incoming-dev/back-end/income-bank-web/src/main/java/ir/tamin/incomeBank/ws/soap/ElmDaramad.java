
package ir.tamin.incomeBank.ws.soap;

import javax.xml.bind.annotation.XmlAccessType;
import javax.xml.bind.annotation.XmlAccessorType;
import javax.xml.bind.annotation.XmlElement;
import javax.xml.bind.annotation.XmlType;


/**
 * <p>Java class for ElmDaramad complex type.
 * 
 * <p>The following schema fragment specifies the expected content contained within this class.
 * 
 * <pre>
 * &lt;complexType name="ElmDaramad">
 *   &lt;complexContent>
 *     &lt;restriction base="{http://www.w3.org/2001/XMLSchema}anyType">
 *       &lt;sequence>
 *         &lt;element name="TahatorKey" type="{http://www.w3.org/2001/XMLSchema}string" minOccurs="0"/>
 *         &lt;element name="Elam_Atrib_No" type="{http://www.w3.org/2001/XMLSchema}string" minOccurs="0"/>
 *         &lt;element name="year" type="{http://www.w3.org/2001/XMLSchema}string" minOccurs="0"/>
 *         &lt;element name="ELAMH_SERIALNO" type="{http://www.w3.org/2001/XMLSchema}string" minOccurs="0"/>
 *         &lt;element name="ELAMH_CODE" type="{http://www.w3.org/2001/XMLSchema}string" minOccurs="0"/>
 *         &lt;element name="elamh_rcvno" type="{http://www.w3.org/2001/XMLSchema}string" minOccurs="0"/>
 *         &lt;element name="elamh_rcvdt" type="{http://www.w3.org/2001/XMLSchema}string" minOccurs="0"/>
 *         &lt;element name="elamh_srvahed" type="{http://www.w3.org/2001/XMLSchema}string" minOccurs="0"/>
 *         &lt;element name="elamh_yy" type="{http://www.w3.org/2001/XMLSchema}string" minOccurs="0"/>
 *         &lt;element name="elamh_prnno" type="{http://www.w3.org/2001/XMLSchema}string" minOccurs="0"/>
 *         &lt;element name="elamh_case" type="{http://www.w3.org/2001/XMLSchema}string" minOccurs="0"/>
 *         &lt;element name="vahedcode" type="{http://www.w3.org/2001/XMLSchema}string" minOccurs="0"/>
 *         &lt;element name="web_stat" type="{http://www.w3.org/2001/XMLSchema}string" minOccurs="0"/>
 *         &lt;element name="elamh_date" type="{http://www.w3.org/2001/XMLSchema}string" minOccurs="0"/>
 *         &lt;element name="elamh_desc" type="{http://www.w3.org/2001/XMLSchema}string" minOccurs="0"/>
 *         &lt;element name="bnh_seq" type="{http://www.w3.org/2001/XMLSchema}string" minOccurs="0"/>
 *         &lt;element name="elamh_lstmon" type="{http://www.w3.org/2001/XMLSchema}string" minOccurs="0"/>
 *         &lt;element name="Acc_Code" type="{http://www.w3.org/2001/XMLSchema}string" minOccurs="0"/>
 *         &lt;element name="Amou_Bed" type="{http://www.w3.org/2001/XMLSchema}string" minOccurs="0"/>
 *         &lt;element name="Amou_Bes" type="{http://www.w3.org/2001/XMLSchema}string" minOccurs="0"/>
 *         &lt;element name="Elamd_Desc" type="{http://www.w3.org/2001/XMLSchema}string" minOccurs="0"/>
 *         &lt;element name="Current_Year" type="{http://www.w3.org/2001/XMLSchema}string" minOccurs="0"/>
 *         &lt;element name="ElamAccCode" type="{http://www.w3.org/2001/XMLSchema}string" minOccurs="0"/>
 *         &lt;element name="elm_seq" type="{http://www.w3.org/2001/XMLSchema}string" minOccurs="0"/>
 *         &lt;element name="RWSHID" type="{http://www.w3.org/2001/XMLSchema}string" minOccurs="0"/>
 *         &lt;element name="RWSHNAME" type="{http://www.w3.org/2001/XMLSchema}string" minOccurs="0"/>
 *       &lt;/sequence>
 *     &lt;/restriction>
 *   &lt;/complexContent>
 * &lt;/complexType>
 * </pre>
 * 
 * 
 */
@XmlAccessorType(XmlAccessType.FIELD)
@XmlType(name = "ElmDaramad", propOrder = {
    "tahatorKey",
    "elamAtribNo",
    "year",
    "elamhserialno",
    "elamhcode",
    "elamhRcvno",
    "elamhRcvdt",
    "elamhSrvahed",
    "elamhYy",
    "elamhPrnno",
    "elamhCase",
    "vahedcode",
    "webStat",
    "elamhDate",
    "elamhDesc",
    "bnhSeq",
    "elamhLstmon",
    "accCode",
    "amouBed",
    "amouBes",
    "elamdDesc",
    "currentYear",
    "elamAccCode",
    "elmSeq",
    "rwshid",
    "rwshname"
})
public class ElmDaramad {

    @XmlElement(name = "TahatorKey")
    protected String tahatorKey;
    @XmlElement(name = "Elam_Atrib_No")
    protected String elamAtribNo;
    protected String year;
    @XmlElement(name = "ELAMH_SERIALNO")
    protected String elamhserialno;
    @XmlElement(name = "ELAMH_CODE")
    protected String elamhcode;
    @XmlElement(name = "elamh_rcvno")
    protected String elamhRcvno;
    @XmlElement(name = "elamh_rcvdt")
    protected String elamhRcvdt;
    @XmlElement(name = "elamh_srvahed")
    protected String elamhSrvahed;
    @XmlElement(name = "elamh_yy")
    protected String elamhYy;
    @XmlElement(name = "elamh_prnno")
    protected String elamhPrnno;
    @XmlElement(name = "elamh_case")
    protected String elamhCase;
    protected String vahedcode;
    @XmlElement(name = "web_stat")
    protected String webStat;
    @XmlElement(name = "elamh_date")
    protected String elamhDate;
    @XmlElement(name = "elamh_desc")
    protected String elamhDesc;
    @XmlElement(name = "bnh_seq")
    protected String bnhSeq;
    @XmlElement(name = "elamh_lstmon")
    protected String elamhLstmon;
    @XmlElement(name = "Acc_Code")
    protected String accCode;
    @XmlElement(name = "Amou_Bed")
    protected String amouBed;
    @XmlElement(name = "Amou_Bes")
    protected String amouBes;
    @XmlElement(name = "Elamd_Desc")
    protected String elamdDesc;
    @XmlElement(name = "Current_Year")
    protected String currentYear;
    @XmlElement(name = "ElamAccCode")
    protected String elamAccCode;
    @XmlElement(name = "elm_seq")
    protected String elmSeq;
    @XmlElement(name = "RWSHID")
    protected String rwshid;
    @XmlElement(name = "RWSHNAME")
    protected String rwshname;

    /**
     * Gets the value of the tahatorKey property.
     * 
     * @return
     *     possible object is
     *     {@link String }
     *     
     */
    public String getTahatorKey() {
        return tahatorKey;
    }

    /**
     * Sets the value of the tahatorKey property.
     * 
     * @param value
     *     allowed object is
     *     {@link String }
     *     
     */
    public void setTahatorKey(String value) {
        this.tahatorKey = value;
    }

    /**
     * Gets the value of the elamAtribNo property.
     * 
     * @return
     *     possible object is
     *     {@link String }
     *     
     */
    public String getElamAtribNo() {
        return elamAtribNo;
    }

    /**
     * Sets the value of the elamAtribNo property.
     * 
     * @param value
     *     allowed object is
     *     {@link String }
     *     
     */
    public void setElamAtribNo(String value) {
        this.elamAtribNo = value;
    }

    /**
     * Gets the value of the year property.
     * 
     * @return
     *     possible object is
     *     {@link String }
     *     
     */
    public String getYear() {
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
    public void setYear(String value) {
        this.year = value;
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
     * Gets the value of the elamhRcvno property.
     * 
     * @return
     *     possible object is
     *     {@link String }
     *     
     */
    public String getElamhRcvno() {
        return elamhRcvno;
    }

    /**
     * Sets the value of the elamhRcvno property.
     * 
     * @param value
     *     allowed object is
     *     {@link String }
     *     
     */
    public void setElamhRcvno(String value) {
        this.elamhRcvno = value;
    }

    /**
     * Gets the value of the elamhRcvdt property.
     * 
     * @return
     *     possible object is
     *     {@link String }
     *     
     */
    public String getElamhRcvdt() {
        return elamhRcvdt;
    }

    /**
     * Sets the value of the elamhRcvdt property.
     * 
     * @param value
     *     allowed object is
     *     {@link String }
     *     
     */
    public void setElamhRcvdt(String value) {
        this.elamhRcvdt = value;
    }

    /**
     * Gets the value of the elamhSrvahed property.
     * 
     * @return
     *     possible object is
     *     {@link String }
     *     
     */
    public String getElamhSrvahed() {
        return elamhSrvahed;
    }

    /**
     * Sets the value of the elamhSrvahed property.
     * 
     * @param value
     *     allowed object is
     *     {@link String }
     *     
     */
    public void setElamhSrvahed(String value) {
        this.elamhSrvahed = value;
    }

    /**
     * Gets the value of the elamhYy property.
     * 
     * @return
     *     possible object is
     *     {@link String }
     *     
     */
    public String getElamhYy() {
        return elamhYy;
    }

    /**
     * Sets the value of the elamhYy property.
     * 
     * @param value
     *     allowed object is
     *     {@link String }
     *     
     */
    public void setElamhYy(String value) {
        this.elamhYy = value;
    }

    /**
     * Gets the value of the elamhPrnno property.
     * 
     * @return
     *     possible object is
     *     {@link String }
     *     
     */
    public String getElamhPrnno() {
        return elamhPrnno;
    }

    /**
     * Sets the value of the elamhPrnno property.
     * 
     * @param value
     *     allowed object is
     *     {@link String }
     *     
     */
    public void setElamhPrnno(String value) {
        this.elamhPrnno = value;
    }

    /**
     * Gets the value of the elamhCase property.
     * 
     * @return
     *     possible object is
     *     {@link String }
     *     
     */
    public String getElamhCase() {
        return elamhCase;
    }

    /**
     * Sets the value of the elamhCase property.
     * 
     * @param value
     *     allowed object is
     *     {@link String }
     *     
     */
    public void setElamhCase(String value) {
        this.elamhCase = value;
    }

    /**
     * Gets the value of the vahedcode property.
     * 
     * @return
     *     possible object is
     *     {@link String }
     *     
     */
    public String getVahedcode() {
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
    public void setVahedcode(String value) {
        this.vahedcode = value;
    }

    /**
     * Gets the value of the webStat property.
     * 
     * @return
     *     possible object is
     *     {@link String }
     *     
     */
    public String getWebStat() {
        return webStat;
    }

    /**
     * Sets the value of the webStat property.
     * 
     * @param value
     *     allowed object is
     *     {@link String }
     *     
     */
    public void setWebStat(String value) {
        this.webStat = value;
    }

    /**
     * Gets the value of the elamhDate property.
     * 
     * @return
     *     possible object is
     *     {@link String }
     *     
     */
    public String getElamhDate() {
        return elamhDate;
    }

    /**
     * Sets the value of the elamhDate property.
     * 
     * @param value
     *     allowed object is
     *     {@link String }
     *     
     */
    public void setElamhDate(String value) {
        this.elamhDate = value;
    }

    /**
     * Gets the value of the elamhDesc property.
     * 
     * @return
     *     possible object is
     *     {@link String }
     *     
     */
    public String getElamhDesc() {
        return elamhDesc;
    }

    /**
     * Sets the value of the elamhDesc property.
     * 
     * @param value
     *     allowed object is
     *     {@link String }
     *     
     */
    public void setElamhDesc(String value) {
        this.elamhDesc = value;
    }

    /**
     * Gets the value of the bnhSeq property.
     * 
     * @return
     *     possible object is
     *     {@link String }
     *     
     */
    public String getBnhSeq() {
        return bnhSeq;
    }

    /**
     * Sets the value of the bnhSeq property.
     * 
     * @param value
     *     allowed object is
     *     {@link String }
     *     
     */
    public void setBnhSeq(String value) {
        this.bnhSeq = value;
    }

    /**
     * Gets the value of the elamhLstmon property.
     * 
     * @return
     *     possible object is
     *     {@link String }
     *     
     */
    public String getElamhLstmon() {
        return elamhLstmon;
    }

    /**
     * Sets the value of the elamhLstmon property.
     * 
     * @param value
     *     allowed object is
     *     {@link String }
     *     
     */
    public void setElamhLstmon(String value) {
        this.elamhLstmon = value;
    }

    /**
     * Gets the value of the accCode property.
     * 
     * @return
     *     possible object is
     *     {@link String }
     *     
     */
    public String getAccCode() {
        return accCode;
    }

    /**
     * Sets the value of the accCode property.
     * 
     * @param value
     *     allowed object is
     *     {@link String }
     *     
     */
    public void setAccCode(String value) {
        this.accCode = value;
    }

    /**
     * Gets the value of the amouBed property.
     * 
     * @return
     *     possible object is
     *     {@link String }
     *     
     */
    public String getAmouBed() {
        return amouBed;
    }

    /**
     * Sets the value of the amouBed property.
     * 
     * @param value
     *     allowed object is
     *     {@link String }
     *     
     */
    public void setAmouBed(String value) {
        this.amouBed = value;
    }

    /**
     * Gets the value of the amouBes property.
     * 
     * @return
     *     possible object is
     *     {@link String }
     *     
     */
    public String getAmouBes() {
        return amouBes;
    }

    /**
     * Sets the value of the amouBes property.
     * 
     * @param value
     *     allowed object is
     *     {@link String }
     *     
     */
    public void setAmouBes(String value) {
        this.amouBes = value;
    }

    /**
     * Gets the value of the elamdDesc property.
     * 
     * @return
     *     possible object is
     *     {@link String }
     *     
     */
    public String getElamdDesc() {
        return elamdDesc;
    }

    /**
     * Sets the value of the elamdDesc property.
     * 
     * @param value
     *     allowed object is
     *     {@link String }
     *     
     */
    public void setElamdDesc(String value) {
        this.elamdDesc = value;
    }

    /**
     * Gets the value of the currentYear property.
     * 
     * @return
     *     possible object is
     *     {@link String }
     *     
     */
    public String getCurrentYear() {
        return currentYear;
    }

    /**
     * Sets the value of the currentYear property.
     * 
     * @param value
     *     allowed object is
     *     {@link String }
     *     
     */
    public void setCurrentYear(String value) {
        this.currentYear = value;
    }

    /**
     * Gets the value of the elamAccCode property.
     * 
     * @return
     *     possible object is
     *     {@link String }
     *     
     */
    public String getElamAccCode() {
        return elamAccCode;
    }

    /**
     * Sets the value of the elamAccCode property.
     * 
     * @param value
     *     allowed object is
     *     {@link String }
     *     
     */
    public void setElamAccCode(String value) {
        this.elamAccCode = value;
    }

    /**
     * Gets the value of the elmSeq property.
     * 
     * @return
     *     possible object is
     *     {@link String }
     *     
     */
    public String getElmSeq() {
        return elmSeq;
    }

    /**
     * Sets the value of the elmSeq property.
     * 
     * @param value
     *     allowed object is
     *     {@link String }
     *     
     */
    public void setElmSeq(String value) {
        this.elmSeq = value;
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

    /**
     * Gets the value of the rwshname property.
     * 
     * @return
     *     possible object is
     *     {@link String }
     *     
     */
    public String getRWSHNAME() {
        return rwshname;
    }

    /**
     * Sets the value of the rwshname property.
     * 
     * @param value
     *     allowed object is
     *     {@link String }
     *     
     */
    public void setRWSHNAME(String value) {
        this.rwshname = value;
    }

}
