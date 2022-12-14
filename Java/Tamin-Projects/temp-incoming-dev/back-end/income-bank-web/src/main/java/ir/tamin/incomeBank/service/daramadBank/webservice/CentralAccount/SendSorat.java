
package ir.tamin.incomeBank.service.daramadBank.webservice.centralAccount;

import javax.xml.bind.annotation.XmlAccessType;
import javax.xml.bind.annotation.XmlAccessorType;
import javax.xml.bind.annotation.XmlElement;
import javax.xml.bind.annotation.XmlRootElement;
import javax.xml.bind.annotation.XmlType;


/**
 * <p>Java class for anonymous complex type.
 * 
 * <p>The following schema fragment specifies the expected content contained within this class.
 * 
 * <pre>
 * &lt;complexType>
 *   &lt;complexContent>
 *     &lt;restriction base="{http://www.w3.org/2001/XMLSchema}anyType">
 *       &lt;sequence>
 *         &lt;element name="vSORAT_DATE" type="{http://www.w3.org/2001/XMLSchema}string" minOccurs="0"/>
 *         &lt;element name="vSORAT_ORDPAY" type="{http://www.w3.org/2001/XMLSchema}string" minOccurs="0"/>
 *         &lt;element name="vSORAT_RCVTYPE" type="{http://www.w3.org/2001/XMLSchema}string" minOccurs="0"/>
 *         &lt;element name="vSORAT_RCVNO" type="{http://www.w3.org/2001/XMLSchema}string" minOccurs="0"/>
 *         &lt;element name="vSORAT_ATTRIB" type="{http://www.w3.org/2001/XMLSchema}string" minOccurs="0"/>
 *         &lt;element name="vSORAT_MDATE" type="{http://www.w3.org/2001/XMLSchema}string" minOccurs="0"/>
 *         &lt;element name="vSORAT_RETU" type="{http://www.w3.org/2001/XMLSchema}string" minOccurs="0"/>
 *         &lt;element name="vSORAT_PASS" type="{http://www.w3.org/2001/XMLSchema}string" minOccurs="0"/>
 *         &lt;element name="vSORAT_COMMENT" type="{http://www.w3.org/2001/XMLSchema}string" minOccurs="0"/>
 *         &lt;element name="vCREATEUID" type="{http://www.w3.org/2001/XMLSchema}string" minOccurs="0"/>
 *         &lt;element name="vCREATEDT" type="{http://www.w3.org/2001/XMLSchema}string" minOccurs="0"/>
 *         &lt;element name="vSORAT_RADIF" type="{http://www.w3.org/2001/XMLSchema}string" minOccurs="0"/>
 *         &lt;element name="vSORAT_MANDEH" type="{http://www.w3.org/2001/XMLSchema}double"/>
 *         &lt;element name="vEDITUID" type="{http://www.w3.org/2001/XMLSchema}string" minOccurs="0"/>
 *         &lt;element name="vEDITDT" type="{http://www.w3.org/2001/XMLSchema}string" minOccurs="0"/>
 *         &lt;element name="vSORAT_BANK" type="{http://www.w3.org/2001/XMLSchema}string" minOccurs="0"/>
 *         &lt;element name="vSORAT_PRICE1" type="{http://www.w3.org/2001/XMLSchema}double"/>
 *         &lt;element name="vSORAT_PRICE2" type="{http://www.w3.org/2001/XMLSchema}double"/>
 *         &lt;element name="vSORAT_DESC" type="{http://www.w3.org/2001/XMLSchema}string" minOccurs="0"/>
 *         &lt;element name="vSORAT_ROWH" type="{http://www.w3.org/2001/XMLSchema}int"/>
 *         &lt;element name="vSORAT_STAT" type="{http://www.w3.org/2001/XMLSchema}string" minOccurs="0"/>
 *         &lt;element name="vSORAT_EFDATE" type="{http://www.w3.org/2001/XMLSchema}string" minOccurs="0"/>
 *       &lt;/sequence>
 *     &lt;/restriction>
 *   &lt;/complexContent>
 * &lt;/complexType>
 * </pre>
 * 
 * 
 */
@XmlAccessorType(XmlAccessType.FIELD)
@XmlType(name = "", propOrder = {
    "vsoratdate",
    "vsoratordpay",
    "vsoratrcvtype",
    "vsoratrcvno",
    "vsoratattrib",
    "vsoratmdate",
    "vsoratretu",
    "vsoratpass",
    "vsoratcomment",
    "vcreateuid",
    "vcreatedt",
    "vsoratradif",
    "vsoratmandeh",
    "vedituid",
    "veditdt",
    "vsoratbank",
    "vsoratprice1",
    "vsoratprice2",
    "vsoratdesc",
    "vsoratrowh",
    "vsoratstat",
    "vsoratefdate"
})
@XmlRootElement(name = "SendSorat")
public class SendSorat {

    @XmlElement(name = "vSORAT_DATE")
    protected String vsoratdate;
    @XmlElement(name = "vSORAT_ORDPAY")
    protected String vsoratordpay;
    @XmlElement(name = "vSORAT_RCVTYPE")
    protected String vsoratrcvtype;
    @XmlElement(name = "vSORAT_RCVNO")
    protected String vsoratrcvno;
    @XmlElement(name = "vSORAT_ATTRIB")
    protected String vsoratattrib;
    @XmlElement(name = "vSORAT_MDATE")
    protected String vsoratmdate;
    @XmlElement(name = "vSORAT_RETU")
    protected String vsoratretu;
    @XmlElement(name = "vSORAT_PASS")
    protected String vsoratpass;
    @XmlElement(name = "vSORAT_COMMENT")
    protected String vsoratcomment;
    @XmlElement(name = "vCREATEUID")
    protected String vcreateuid;
    @XmlElement(name = "vCREATEDT")
    protected String vcreatedt;
    @XmlElement(name = "vSORAT_RADIF")
    protected String vsoratradif;
    @XmlElement(name = "vSORAT_MANDEH")
    protected double vsoratmandeh;
    @XmlElement(name = "vEDITUID")
    protected String vedituid;
    @XmlElement(name = "vEDITDT")
    protected String veditdt;
    @XmlElement(name = "vSORAT_BANK")
    protected String vsoratbank;
    @XmlElement(name = "vSORAT_PRICE1")
    protected double vsoratprice1;
    @XmlElement(name = "vSORAT_PRICE2")
    protected double vsoratprice2;
    @XmlElement(name = "vSORAT_DESC")
    protected String vsoratdesc;
    @XmlElement(name = "vSORAT_ROWH")
    protected int vsoratrowh;
    @XmlElement(name = "vSORAT_STAT")
    protected String vsoratstat;
    @XmlElement(name = "vSORAT_EFDATE")
    protected String vsoratefdate;

    /**
     * Gets the value of the vsoratdate property.
     * 
     * @return
     *     possible object is
     *     {@link String }
     *     
     */
    public String getVSORATDATE() {
        return vsoratdate;
    }

    /**
     * Sets the value of the vsoratdate property.
     * 
     * @param value
     *     allowed object is
     *     {@link String }
     *     
     */
    public void setVSORATDATE(String value) {
        this.vsoratdate = value;
    }

    /**
     * Gets the value of the vsoratordpay property.
     * 
     * @return
     *     possible object is
     *     {@link String }
     *     
     */
    public String getVSORATORDPAY() {
        return vsoratordpay;
    }

    /**
     * Sets the value of the vsoratordpay property.
     * 
     * @param value
     *     allowed object is
     *     {@link String }
     *     
     */
    public void setVSORATORDPAY(String value) {
        this.vsoratordpay = value;
    }

    /**
     * Gets the value of the vsoratrcvtype property.
     * 
     * @return
     *     possible object is
     *     {@link String }
     *     
     */
    public String getVSORATRCVTYPE() {
        return vsoratrcvtype;
    }

    /**
     * Sets the value of the vsoratrcvtype property.
     * 
     * @param value
     *     allowed object is
     *     {@link String }
     *     
     */
    public void setVSORATRCVTYPE(String value) {
        this.vsoratrcvtype = value;
    }

    /**
     * Gets the value of the vsoratrcvno property.
     * 
     * @return
     *     possible object is
     *     {@link String }
     *     
     */
    public String getVSORATRCVNO() {
        return vsoratrcvno;
    }

    /**
     * Sets the value of the vsoratrcvno property.
     * 
     * @param value
     *     allowed object is
     *     {@link String }
     *     
     */
    public void setVSORATRCVNO(String value) {
        this.vsoratrcvno = value;
    }

    /**
     * Gets the value of the vsoratattrib property.
     * 
     * @return
     *     possible object is
     *     {@link String }
     *     
     */
    public String getVSORATATTRIB() {
        return vsoratattrib;
    }

    /**
     * Sets the value of the vsoratattrib property.
     * 
     * @param value
     *     allowed object is
     *     {@link String }
     *     
     */
    public void setVSORATATTRIB(String value) {
        this.vsoratattrib = value;
    }

    /**
     * Gets the value of the vsoratmdate property.
     * 
     * @return
     *     possible object is
     *     {@link String }
     *     
     */
    public String getVSORATMDATE() {
        return vsoratmdate;
    }

    /**
     * Sets the value of the vsoratmdate property.
     * 
     * @param value
     *     allowed object is
     *     {@link String }
     *     
     */
    public void setVSORATMDATE(String value) {
        this.vsoratmdate = value;
    }

    /**
     * Gets the value of the vsoratretu property.
     * 
     * @return
     *     possible object is
     *     {@link String }
     *     
     */
    public String getVSORATRETU() {
        return vsoratretu;
    }

    /**
     * Sets the value of the vsoratretu property.
     * 
     * @param value
     *     allowed object is
     *     {@link String }
     *     
     */
    public void setVSORATRETU(String value) {
        this.vsoratretu = value;
    }

    /**
     * Gets the value of the vsoratpass property.
     * 
     * @return
     *     possible object is
     *     {@link String }
     *     
     */
    public String getVSORATPASS() {
        return vsoratpass;
    }

    /**
     * Sets the value of the vsoratpass property.
     * 
     * @param value
     *     allowed object is
     *     {@link String }
     *     
     */
    public void setVSORATPASS(String value) {
        this.vsoratpass = value;
    }

    /**
     * Gets the value of the vsoratcomment property.
     * 
     * @return
     *     possible object is
     *     {@link String }
     *     
     */
    public String getVSORATCOMMENT() {
        return vsoratcomment;
    }

    /**
     * Sets the value of the vsoratcomment property.
     * 
     * @param value
     *     allowed object is
     *     {@link String }
     *     
     */
    public void setVSORATCOMMENT(String value) {
        this.vsoratcomment = value;
    }

    /**
     * Gets the value of the vcreateuid property.
     * 
     * @return
     *     possible object is
     *     {@link String }
     *     
     */
    public String getVCREATEUID() {
        return vcreateuid;
    }

    /**
     * Sets the value of the vcreateuid property.
     * 
     * @param value
     *     allowed object is
     *     {@link String }
     *     
     */
    public void setVCREATEUID(String value) {
        this.vcreateuid = value;
    }

    /**
     * Gets the value of the vcreatedt property.
     * 
     * @return
     *     possible object is
     *     {@link String }
     *     
     */
    public String getVCREATEDT() {
        return vcreatedt;
    }

    /**
     * Sets the value of the vcreatedt property.
     * 
     * @param value
     *     allowed object is
     *     {@link String }
     *     
     */
    public void setVCREATEDT(String value) {
        this.vcreatedt = value;
    }

    /**
     * Gets the value of the vsoratradif property.
     * 
     * @return
     *     possible object is
     *     {@link String }
     *     
     */
    public String getVSORATRADIF() {
        return vsoratradif;
    }

    /**
     * Sets the value of the vsoratradif property.
     * 
     * @param value
     *     allowed object is
     *     {@link String }
     *     
     */
    public void setVSORATRADIF(String value) {
        this.vsoratradif = value;
    }

    /**
     * Gets the value of the vsoratmandeh property.
     * 
     */
    public double getVSORATMANDEH() {
        return vsoratmandeh;
    }

    /**
     * Sets the value of the vsoratmandeh property.
     * 
     */
    public void setVSORATMANDEH(double value) {
        this.vsoratmandeh = value;
    }

    /**
     * Gets the value of the vedituid property.
     * 
     * @return
     *     possible object is
     *     {@link String }
     *     
     */
    public String getVEDITUID() {
        return vedituid;
    }

    /**
     * Sets the value of the vedituid property.
     * 
     * @param value
     *     allowed object is
     *     {@link String }
     *     
     */
    public void setVEDITUID(String value) {
        this.vedituid = value;
    }

    /**
     * Gets the value of the veditdt property.
     * 
     * @return
     *     possible object is
     *     {@link String }
     *     
     */
    public String getVEDITDT() {
        return veditdt;
    }

    /**
     * Sets the value of the veditdt property.
     * 
     * @param value
     *     allowed object is
     *     {@link String }
     *     
     */
    public void setVEDITDT(String value) {
        this.veditdt = value;
    }

    /**
     * Gets the value of the vsoratbank property.
     * 
     * @return
     *     possible object is
     *     {@link String }
     *     
     */
    public String getVSORATBANK() {
        return vsoratbank;
    }

    /**
     * Sets the value of the vsoratbank property.
     * 
     * @param value
     *     allowed object is
     *     {@link String }
     *     
     */
    public void setVSORATBANK(String value) {
        this.vsoratbank = value;
    }

    /**
     * Gets the value of the vsoratprice1 property.
     * 
     */
    public double getVSORATPRICE1() {
        return vsoratprice1;
    }

    /**
     * Sets the value of the vsoratprice1 property.
     * 
     */
    public void setVSORATPRICE1(double value) {
        this.vsoratprice1 = value;
    }

    /**
     * Gets the value of the vsoratprice2 property.
     * 
     */
    public double getVSORATPRICE2() {
        return vsoratprice2;
    }

    /**
     * Sets the value of the vsoratprice2 property.
     * 
     */
    public void setVSORATPRICE2(double value) {
        this.vsoratprice2 = value;
    }

    /**
     * Gets the value of the vsoratdesc property.
     * 
     * @return
     *     possible object is
     *     {@link String }
     *     
     */
    public String getVSORATDESC() {
        return vsoratdesc;
    }

    /**
     * Sets the value of the vsoratdesc property.
     * 
     * @param value
     *     allowed object is
     *     {@link String }
     *     
     */
    public void setVSORATDESC(String value) {
        this.vsoratdesc = value;
    }

    /**
     * Gets the value of the vsoratrowh property.
     * 
     */
    public int getVSORATROWH() {
        return vsoratrowh;
    }

    /**
     * Sets the value of the vsoratrowh property.
     * 
     */
    public void setVSORATROWH(int value) {
        this.vsoratrowh = value;
    }

    /**
     * Gets the value of the vsoratstat property.
     * 
     * @return
     *     possible object is
     *     {@link String }
     *     
     */
    public String getVSORATSTAT() {
        return vsoratstat;
    }

    /**
     * Sets the value of the vsoratstat property.
     * 
     * @param value
     *     allowed object is
     *     {@link String }
     *     
     */
    public void setVSORATSTAT(String value) {
        this.vsoratstat = value;
    }

    /**
     * Gets the value of the vsoratefdate property.
     * 
     * @return
     *     possible object is
     *     {@link String }
     *     
     */
    public String getVSORATEFDATE() {
        return vsoratefdate;
    }

    /**
     * Sets the value of the vsoratefdate property.
     * 
     * @param value
     *     allowed object is
     *     {@link String }
     *     
     */
    public void setVSORATEFDATE(String value) {
        this.vsoratefdate = value;
    }

}
