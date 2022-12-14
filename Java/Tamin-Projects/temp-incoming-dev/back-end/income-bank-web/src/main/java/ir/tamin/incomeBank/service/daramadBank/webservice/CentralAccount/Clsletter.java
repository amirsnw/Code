
package ir.tamin.incomeBank.service.daramadBank.webservice.centralAccount;

import javax.xml.bind.annotation.XmlAccessType;
import javax.xml.bind.annotation.XmlAccessorType;
import javax.xml.bind.annotation.XmlElement;
import javax.xml.bind.annotation.XmlType;


/**
 * <p>Java class for clsletter complex type.
 * 
 * <p>The following schema fragment specifies the expected content contained within this class.
 * 
 * <pre>
 * &lt;complexType name="clsletter">
 *   &lt;complexContent>
 *     &lt;restriction base="{http://www.w3.org/2001/XMLSchema}anyType">
 *       &lt;sequence>
 *         &lt;element name="LETTER_SERIAL" type="{http://www.w3.org/2001/XMLSchema}string" minOccurs="0"/>
 *         &lt;element name="BRHCODE" type="{http://www.w3.org/2001/XMLSchema}string" minOccurs="0"/>
 *         &lt;element name="LETTER_NO" type="{http://www.w3.org/2001/XMLSchema}string" minOccurs="0"/>
 *         &lt;element name="LETTER_DATE" type="{http://www.w3.org/2001/XMLSchema}string" minOccurs="0"/>
 *         &lt;element name="LETTER_NAM" type="{http://www.w3.org/2001/XMLSchema}string" minOccurs="0"/>
 *         &lt;element name="LETTER_LNO" type="{http://www.w3.org/2001/XMLSchema}string" minOccurs="0"/>
 *         &lt;element name="LETTER_LDATE" type="{http://www.w3.org/2001/XMLSchema}string" minOccurs="0"/>
 *         &lt;element name="LETTER_TYPE" type="{http://www.w3.org/2001/XMLSchema}string" minOccurs="0"/>
 *         &lt;element name="LETTER_PRICE1" type="{http://www.w3.org/2001/XMLSchema}string" minOccurs="0"/>
 *         &lt;element name="LETTER_CODE1" type="{http://www.w3.org/2001/XMLSchema}string" minOccurs="0"/>
 *         &lt;element name="LETTER_PRICE2" type="{http://www.w3.org/2001/XMLSchema}string" minOccurs="0"/>
 *         &lt;element name="LETTER_CODE2" type="{http://www.w3.org/2001/XMLSchema}string" minOccurs="0"/>
 *         &lt;element name="LETTER_OBJDATE" type="{http://www.w3.org/2001/XMLSchema}string" minOccurs="0"/>
 *         &lt;element name="LETTER_RABET" type="{http://www.w3.org/2001/XMLSchema}string" minOccurs="0"/>
 *         &lt;element name="LETTER_SANADFLAG" type="{http://www.w3.org/2001/XMLSchema}string" minOccurs="0"/>
 *         &lt;element name="CREATEUID" type="{http://www.w3.org/2001/XMLSchema}string" minOccurs="0"/>
 *         &lt;element name="CREATEDT" type="{http://www.w3.org/2001/XMLSchema}string" minOccurs="0"/>
 *         &lt;element name="LETTER_PRINT" type="{http://www.w3.org/2001/XMLSchema}string" minOccurs="0"/>
 *         &lt;element name="LETTER_FLAG" type="{http://www.w3.org/2001/XMLSchema}string" minOccurs="0"/>
 *         &lt;element name="LETTER_SODOR" type="{http://www.w3.org/2001/XMLSchema}string" minOccurs="0"/>
 *         &lt;element name="LETTER_DEL" type="{http://www.w3.org/2001/XMLSchema}string" minOccurs="0"/>
 *         &lt;element name="saveBRHCODE" type="{http://www.w3.org/2001/XMLSchema}string" minOccurs="0"/>
 *         &lt;element name="BES_CNTDATE" type="{http://www.w3.org/2001/XMLSchema}string" minOccurs="0"/>
 *         &lt;element name="BES_CNTNO" type="{http://www.w3.org/2001/XMLSchema}string" minOccurs="0"/>
 *         &lt;element name="BES_EMPZFLAG" type="{http://www.w3.org/2001/XMLSchema}string" minOccurs="0"/>
 *         &lt;element name="BES_FUNCTIONDATE" type="{http://www.w3.org/2001/XMLSchema}string" minOccurs="0"/>
 *         &lt;element name="RWSHID" type="{http://www.w3.org/2001/XMLSchema}string" minOccurs="0"/>
 *         &lt;element name="RWSHNAME" type="{http://www.w3.org/2001/XMLSchema}string" minOccurs="0"/>
 *         &lt;element name="IDNO" type="{http://www.w3.org/2001/XMLSchema}string" minOccurs="0"/>
 *         &lt;element name="CODEDIGIT" type="{http://www.w3.org/2001/XMLSchema}string" minOccurs="0"/>
 *         &lt;element name="OURAG_GNO" type="{http://www.w3.org/2001/XMLSchema}string" minOccurs="0"/>
 *         &lt;element name="OURAG_SDATE" type="{http://www.w3.org/2001/XMLSchema}string" minOccurs="0"/>
 *       &lt;/sequence>
 *     &lt;/restriction>
 *   &lt;/complexContent>
 * &lt;/complexType>
 * </pre>
 * 
 * 
 */
@XmlAccessorType(XmlAccessType.FIELD)
@XmlType(name = "clsletter", propOrder = {
    "letterserial",
    "brhcode",
    "letterno",
    "letterdate",
    "letternam",
    "letterlno",
    "letterldate",
    "lettertype",
    "letterprice1",
    "lettercode1",
    "letterprice2",
    "lettercode2",
    "letterobjdate",
    "letterrabet",
    "lettersanadflag",
    "createuid",
    "createdt",
    "letterprint",
    "letterflag",
    "lettersodor",
    "letterdel",
    "saveBRHCODE",
    "bescntdate",
    "bescntno",
    "besempzflag",
    "besfunctiondate",
    "rwshid",
    "rwshname",
    "idno",
    "codedigit",
    "ouraggno",
    "ouragsdate"
})
public class Clsletter {

    @XmlElement(name = "LETTER_SERIAL")
    protected String letterserial;
    @XmlElement(name = "BRHCODE")
    protected String brhcode;
    @XmlElement(name = "LETTER_NO")
    protected String letterno;
    @XmlElement(name = "LETTER_DATE")
    protected String letterdate;
    @XmlElement(name = "LETTER_NAM")
    protected String letternam;
    @XmlElement(name = "LETTER_LNO")
    protected String letterlno;
    @XmlElement(name = "LETTER_LDATE")
    protected String letterldate;
    @XmlElement(name = "LETTER_TYPE")
    protected String lettertype;
    @XmlElement(name = "LETTER_PRICE1")
    protected String letterprice1;
    @XmlElement(name = "LETTER_CODE1")
    protected String lettercode1;
    @XmlElement(name = "LETTER_PRICE2")
    protected String letterprice2;
    @XmlElement(name = "LETTER_CODE2")
    protected String lettercode2;
    @XmlElement(name = "LETTER_OBJDATE")
    protected String letterobjdate;
    @XmlElement(name = "LETTER_RABET")
    protected String letterrabet;
    @XmlElement(name = "LETTER_SANADFLAG")
    protected String lettersanadflag;
    @XmlElement(name = "CREATEUID")
    protected String createuid;
    @XmlElement(name = "CREATEDT")
    protected String createdt;
    @XmlElement(name = "LETTER_PRINT")
    protected String letterprint;
    @XmlElement(name = "LETTER_FLAG")
    protected String letterflag;
    @XmlElement(name = "LETTER_SODOR")
    protected String lettersodor;
    @XmlElement(name = "LETTER_DEL")
    protected String letterdel;
    protected String saveBRHCODE;
    @XmlElement(name = "BES_CNTDATE")
    protected String bescntdate;
    @XmlElement(name = "BES_CNTNO")
    protected String bescntno;
    @XmlElement(name = "BES_EMPZFLAG")
    protected String besempzflag;
    @XmlElement(name = "BES_FUNCTIONDATE")
    protected String besfunctiondate;
    @XmlElement(name = "RWSHID")
    protected String rwshid;
    @XmlElement(name = "RWSHNAME")
    protected String rwshname;
    @XmlElement(name = "IDNO")
    protected String idno;
    @XmlElement(name = "CODEDIGIT")
    protected String codedigit;
    @XmlElement(name = "OURAG_GNO")
    protected String ouraggno;
    @XmlElement(name = "OURAG_SDATE")
    protected String ouragsdate;

    /**
     * Gets the value of the letterserial property.
     * 
     * @return
     *     possible object is
     *     {@link String }
     *     
     */
    public String getLETTERSERIAL() {
        return letterserial;
    }

    /**
     * Sets the value of the letterserial property.
     * 
     * @param value
     *     allowed object is
     *     {@link String }
     *     
     */
    public void setLETTERSERIAL(String value) {
        this.letterserial = value;
    }

    /**
     * Gets the value of the brhcode property.
     * 
     * @return
     *     possible object is
     *     {@link String }
     *     
     */
    public String getBRHCODE() {
        return brhcode;
    }

    /**
     * Sets the value of the brhcode property.
     * 
     * @param value
     *     allowed object is
     *     {@link String }
     *     
     */
    public void setBRHCODE(String value) {
        this.brhcode = value;
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
     * Gets the value of the letternam property.
     * 
     * @return
     *     possible object is
     *     {@link String }
     *     
     */
    public String getLETTERNAM() {
        return letternam;
    }

    /**
     * Sets the value of the letternam property.
     * 
     * @param value
     *     allowed object is
     *     {@link String }
     *     
     */
    public void setLETTERNAM(String value) {
        this.letternam = value;
    }

    /**
     * Gets the value of the letterlno property.
     * 
     * @return
     *     possible object is
     *     {@link String }
     *     
     */
    public String getLETTERLNO() {
        return letterlno;
    }

    /**
     * Sets the value of the letterlno property.
     * 
     * @param value
     *     allowed object is
     *     {@link String }
     *     
     */
    public void setLETTERLNO(String value) {
        this.letterlno = value;
    }

    /**
     * Gets the value of the letterldate property.
     * 
     * @return
     *     possible object is
     *     {@link String }
     *     
     */
    public String getLETTERLDATE() {
        return letterldate;
    }

    /**
     * Sets the value of the letterldate property.
     * 
     * @param value
     *     allowed object is
     *     {@link String }
     *     
     */
    public void setLETTERLDATE(String value) {
        this.letterldate = value;
    }

    /**
     * Gets the value of the lettertype property.
     * 
     * @return
     *     possible object is
     *     {@link String }
     *     
     */
    public String getLETTERTYPE() {
        return lettertype;
    }

    /**
     * Sets the value of the lettertype property.
     * 
     * @param value
     *     allowed object is
     *     {@link String }
     *     
     */
    public void setLETTERTYPE(String value) {
        this.lettertype = value;
    }

    /**
     * Gets the value of the letterprice1 property.
     * 
     * @return
     *     possible object is
     *     {@link String }
     *     
     */
    public String getLETTERPRICE1() {
        return letterprice1;
    }

    /**
     * Sets the value of the letterprice1 property.
     * 
     * @param value
     *     allowed object is
     *     {@link String }
     *     
     */
    public void setLETTERPRICE1(String value) {
        this.letterprice1 = value;
    }

    /**
     * Gets the value of the lettercode1 property.
     * 
     * @return
     *     possible object is
     *     {@link String }
     *     
     */
    public String getLETTERCODE1() {
        return lettercode1;
    }

    /**
     * Sets the value of the lettercode1 property.
     * 
     * @param value
     *     allowed object is
     *     {@link String }
     *     
     */
    public void setLETTERCODE1(String value) {
        this.lettercode1 = value;
    }

    /**
     * Gets the value of the letterprice2 property.
     * 
     * @return
     *     possible object is
     *     {@link String }
     *     
     */
    public String getLETTERPRICE2() {
        return letterprice2;
    }

    /**
     * Sets the value of the letterprice2 property.
     * 
     * @param value
     *     allowed object is
     *     {@link String }
     *     
     */
    public void setLETTERPRICE2(String value) {
        this.letterprice2 = value;
    }

    /**
     * Gets the value of the lettercode2 property.
     * 
     * @return
     *     possible object is
     *     {@link String }
     *     
     */
    public String getLETTERCODE2() {
        return lettercode2;
    }

    /**
     * Sets the value of the lettercode2 property.
     * 
     * @param value
     *     allowed object is
     *     {@link String }
     *     
     */
    public void setLETTERCODE2(String value) {
        this.lettercode2 = value;
    }

    /**
     * Gets the value of the letterobjdate property.
     * 
     * @return
     *     possible object is
     *     {@link String }
     *     
     */
    public String getLETTEROBJDATE() {
        return letterobjdate;
    }

    /**
     * Sets the value of the letterobjdate property.
     * 
     * @param value
     *     allowed object is
     *     {@link String }
     *     
     */
    public void setLETTEROBJDATE(String value) {
        this.letterobjdate = value;
    }

    /**
     * Gets the value of the letterrabet property.
     * 
     * @return
     *     possible object is
     *     {@link String }
     *     
     */
    public String getLETTERRABET() {
        return letterrabet;
    }

    /**
     * Sets the value of the letterrabet property.
     * 
     * @param value
     *     allowed object is
     *     {@link String }
     *     
     */
    public void setLETTERRABET(String value) {
        this.letterrabet = value;
    }

    /**
     * Gets the value of the lettersanadflag property.
     * 
     * @return
     *     possible object is
     *     {@link String }
     *     
     */
    public String getLETTERSANADFLAG() {
        return lettersanadflag;
    }

    /**
     * Sets the value of the lettersanadflag property.
     * 
     * @param value
     *     allowed object is
     *     {@link String }
     *     
     */
    public void setLETTERSANADFLAG(String value) {
        this.lettersanadflag = value;
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
     * Gets the value of the letterprint property.
     * 
     * @return
     *     possible object is
     *     {@link String }
     *     
     */
    public String getLETTERPRINT() {
        return letterprint;
    }

    /**
     * Sets the value of the letterprint property.
     * 
     * @param value
     *     allowed object is
     *     {@link String }
     *     
     */
    public void setLETTERPRINT(String value) {
        this.letterprint = value;
    }

    /**
     * Gets the value of the letterflag property.
     * 
     * @return
     *     possible object is
     *     {@link String }
     *     
     */
    public String getLETTERFLAG() {
        return letterflag;
    }

    /**
     * Sets the value of the letterflag property.
     * 
     * @param value
     *     allowed object is
     *     {@link String }
     *     
     */
    public void setLETTERFLAG(String value) {
        this.letterflag = value;
    }

    /**
     * Gets the value of the lettersodor property.
     * 
     * @return
     *     possible object is
     *     {@link String }
     *     
     */
    public String getLETTERSODOR() {
        return lettersodor;
    }

    /**
     * Sets the value of the lettersodor property.
     * 
     * @param value
     *     allowed object is
     *     {@link String }
     *     
     */
    public void setLETTERSODOR(String value) {
        this.lettersodor = value;
    }

    /**
     * Gets the value of the letterdel property.
     * 
     * @return
     *     possible object is
     *     {@link String }
     *     
     */
    public String getLETTERDEL() {
        return letterdel;
    }

    /**
     * Sets the value of the letterdel property.
     * 
     * @param value
     *     allowed object is
     *     {@link String }
     *     
     */
    public void setLETTERDEL(String value) {
        this.letterdel = value;
    }

    /**
     * Gets the value of the saveBRHCODE property.
     * 
     * @return
     *     possible object is
     *     {@link String }
     *     
     */
    public String getSaveBRHCODE() {
        return saveBRHCODE;
    }

    /**
     * Sets the value of the saveBRHCODE property.
     * 
     * @param value
     *     allowed object is
     *     {@link String }
     *     
     */
    public void setSaveBRHCODE(String value) {
        this.saveBRHCODE = value;
    }

    /**
     * Gets the value of the bescntdate property.
     * 
     * @return
     *     possible object is
     *     {@link String }
     *     
     */
    public String getBESCNTDATE() {
        return bescntdate;
    }

    /**
     * Sets the value of the bescntdate property.
     * 
     * @param value
     *     allowed object is
     *     {@link String }
     *     
     */
    public void setBESCNTDATE(String value) {
        this.bescntdate = value;
    }

    /**
     * Gets the value of the bescntno property.
     * 
     * @return
     *     possible object is
     *     {@link String }
     *     
     */
    public String getBESCNTNO() {
        return bescntno;
    }

    /**
     * Sets the value of the bescntno property.
     * 
     * @param value
     *     allowed object is
     *     {@link String }
     *     
     */
    public void setBESCNTNO(String value) {
        this.bescntno = value;
    }

    /**
     * Gets the value of the besempzflag property.
     * 
     * @return
     *     possible object is
     *     {@link String }
     *     
     */
    public String getBESEMPZFLAG() {
        return besempzflag;
    }

    /**
     * Sets the value of the besempzflag property.
     * 
     * @param value
     *     allowed object is
     *     {@link String }
     *     
     */
    public void setBESEMPZFLAG(String value) {
        this.besempzflag = value;
    }

    /**
     * Gets the value of the besfunctiondate property.
     * 
     * @return
     *     possible object is
     *     {@link String }
     *     
     */
    public String getBESFUNCTIONDATE() {
        return besfunctiondate;
    }

    /**
     * Sets the value of the besfunctiondate property.
     * 
     * @param value
     *     allowed object is
     *     {@link String }
     *     
     */
    public void setBESFUNCTIONDATE(String value) {
        this.besfunctiondate = value;
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

    /**
     * Gets the value of the idno property.
     * 
     * @return
     *     possible object is
     *     {@link String }
     *     
     */
    public String getIDNO() {
        return idno;
    }

    /**
     * Sets the value of the idno property.
     * 
     * @param value
     *     allowed object is
     *     {@link String }
     *     
     */
    public void setIDNO(String value) {
        this.idno = value;
    }

    /**
     * Gets the value of the codedigit property.
     * 
     * @return
     *     possible object is
     *     {@link String }
     *     
     */
    public String getCODEDIGIT() {
        return codedigit;
    }

    /**
     * Sets the value of the codedigit property.
     * 
     * @param value
     *     allowed object is
     *     {@link String }
     *     
     */
    public void setCODEDIGIT(String value) {
        this.codedigit = value;
    }

    /**
     * Gets the value of the ouraggno property.
     * 
     * @return
     *     possible object is
     *     {@link String }
     *     
     */
    public String getOURAGGNO() {
        return ouraggno;
    }

    /**
     * Sets the value of the ouraggno property.
     * 
     * @param value
     *     allowed object is
     *     {@link String }
     *     
     */
    public void setOURAGGNO(String value) {
        this.ouraggno = value;
    }

    /**
     * Gets the value of the ouragsdate property.
     * 
     * @return
     *     possible object is
     *     {@link String }
     *     
     */
    public String getOURAGSDATE() {
        return ouragsdate;
    }

    /**
     * Sets the value of the ouragsdate property.
     * 
     * @param value
     *     allowed object is
     *     {@link String }
     *     
     */
    public void setOURAGSDATE(String value) {
        this.ouragsdate = value;
    }

}
