
package ir.tamin.incomeBank.ws.soap;

import javax.xml.bind.annotation.XmlAccessType;
import javax.xml.bind.annotation.XmlAccessorType;
import javax.xml.bind.annotation.XmlElement;
import javax.xml.bind.annotation.XmlType;


/**
 * <p>Java class for UnknowElam complex type.
 * 
 * <p>The following schema fragment specifies the expected content contained within this class.
 * 
 * <pre>
 * &lt;complexType name="UnknowElam">
 *   &lt;complexContent>
 *     &lt;restriction base="{http://www.w3.org/2001/XMLSchema}anyType">
 *       &lt;sequence>
 *         &lt;element name="SndVahedcode" type="{http://www.w3.org/2001/XMLSchema}string" minOccurs="0"/>
 *         &lt;element name="RcvVahedcode" type="{http://www.w3.org/2001/XMLSchema}string" minOccurs="0"/>
 *         &lt;element name="IsWRKShop" type="{http://www.w3.org/2001/XMLSchema}string" minOccurs="0"/>
 *         &lt;element name="WorkShopID" type="{http://www.w3.org/2001/XMLSchema}string" minOccurs="0"/>
 *         &lt;element name="NationCode" type="{http://www.w3.org/2001/XMLSchema}string" minOccurs="0"/>
 *         &lt;element name="RisuID" type="{http://www.w3.org/2001/XMLSchema}string" minOccurs="0"/>
 *         &lt;element name="PaymentId" type="{http://www.w3.org/2001/XMLSchema}string" minOccurs="0"/>
 *         &lt;element name="RcvNumber" type="{http://www.w3.org/2001/XMLSchema}string" minOccurs="0"/>
 *         &lt;element name="EffectiveDate" type="{http://www.w3.org/2001/XMLSchema}string" minOccurs="0"/>
 *         &lt;element name="ElmDate" type="{http://www.w3.org/2001/XMLSchema}string" minOccurs="0"/>
 *         &lt;element name="Year" type="{http://www.w3.org/2001/XMLSchema}string" minOccurs="0"/>
 *         &lt;element name="Amount" type="{http://www.w3.org/2001/XMLSchema}long"/>
 *         &lt;element name="Description" type="{http://www.w3.org/2001/XMLSchema}string" minOccurs="0"/>
 *         &lt;element name="Status" type="{http://www.w3.org/2001/XMLSchema}string" minOccurs="0"/>
 *         &lt;element name="BankCode" type="{http://www.w3.org/2001/XMLSchema}string" minOccurs="0"/>
 *         &lt;element name="FullName" type="{http://www.w3.org/2001/XMLSchema}string" minOccurs="0"/>
 *         &lt;element name="SenderId" type="{http://www.w3.org/2001/XMLSchema}long"/>
 *         &lt;element name="IsSnd" type="{http://www.w3.org/2001/XMLSchema}string" minOccurs="0"/>
 *       &lt;/sequence>
 *     &lt;/restriction>
 *   &lt;/complexContent>
 * &lt;/complexType>
 * </pre>
 * 
 * 
 */
@XmlAccessorType(XmlAccessType.FIELD)
@XmlType(name = "UnknowElam", propOrder = {
    "sndVahedcode",
    "rcvVahedcode",
    "isWRKShop",
    "workShopID",
    "nationCode",
    "risuID",
    "paymentId",
    "rcvNumber",
    "effectiveDate",
    "elmDate",
    "year",
    "amount",
    "description",
    "status",
    "bankCode",
    "fullName",
    "senderId",
    "isSnd"
})
public class UnknowElam {

    @XmlElement(name = "SndVahedcode")
    protected String sndVahedcode;
    @XmlElement(name = "RcvVahedcode")
    protected String rcvVahedcode;
    @XmlElement(name = "IsWRKShop")
    protected String isWRKShop;
    @XmlElement(name = "WorkShopID")
    protected String workShopID;
    @XmlElement(name = "NationCode")
    protected String nationCode;
    @XmlElement(name = "RisuID")
    protected String risuID;
    @XmlElement(name = "PaymentId")
    protected String paymentId;
    @XmlElement(name = "RcvNumber")
    protected String rcvNumber;
    @XmlElement(name = "EffectiveDate")
    protected String effectiveDate;
    @XmlElement(name = "ElmDate")
    protected String elmDate;
    @XmlElement(name = "Year")
    protected String year;
    @XmlElement(name = "Amount")
    protected long amount;
    @XmlElement(name = "Description")
    protected String description;
    @XmlElement(name = "Status")
    protected String status;
    @XmlElement(name = "BankCode")
    protected String bankCode;
    @XmlElement(name = "FullName")
    protected String fullName;
    @XmlElement(name = "SenderId")
    protected long senderId;
    @XmlElement(name = "IsSnd")
    protected String isSnd;

    /**
     * Gets the value of the sndVahedcode property.
     * 
     * @return
     *     possible object is
     *     {@link String }
     *     
     */
    public String getSndVahedcode() {
        return sndVahedcode;
    }

    /**
     * Sets the value of the sndVahedcode property.
     * 
     * @param value
     *     allowed object is
     *     {@link String }
     *     
     */
    public void setSndVahedcode(String value) {
        this.sndVahedcode = value;
    }

    /**
     * Gets the value of the rcvVahedcode property.
     * 
     * @return
     *     possible object is
     *     {@link String }
     *     
     */
    public String getRcvVahedcode() {
        return rcvVahedcode;
    }

    /**
     * Sets the value of the rcvVahedcode property.
     * 
     * @param value
     *     allowed object is
     *     {@link String }
     *     
     */
    public void setRcvVahedcode(String value) {
        this.rcvVahedcode = value;
    }

    /**
     * Gets the value of the isWRKShop property.
     * 
     * @return
     *     possible object is
     *     {@link String }
     *     
     */
    public String getIsWRKShop() {
        return isWRKShop;
    }

    /**
     * Sets the value of the isWRKShop property.
     * 
     * @param value
     *     allowed object is
     *     {@link String }
     *     
     */
    public void setIsWRKShop(String value) {
        this.isWRKShop = value;
    }

    /**
     * Gets the value of the workShopID property.
     * 
     * @return
     *     possible object is
     *     {@link String }
     *     
     */
    public String getWorkShopID() {
        return workShopID;
    }

    /**
     * Sets the value of the workShopID property.
     * 
     * @param value
     *     allowed object is
     *     {@link String }
     *     
     */
    public void setWorkShopID(String value) {
        this.workShopID = value;
    }

    /**
     * Gets the value of the nationCode property.
     * 
     * @return
     *     possible object is
     *     {@link String }
     *     
     */
    public String getNationCode() {
        return nationCode;
    }

    /**
     * Sets the value of the nationCode property.
     * 
     * @param value
     *     allowed object is
     *     {@link String }
     *     
     */
    public void setNationCode(String value) {
        this.nationCode = value;
    }

    /**
     * Gets the value of the risuID property.
     * 
     * @return
     *     possible object is
     *     {@link String }
     *     
     */
    public String getRisuID() {
        return risuID;
    }

    /**
     * Sets the value of the risuID property.
     * 
     * @param value
     *     allowed object is
     *     {@link String }
     *     
     */
    public void setRisuID(String value) {
        this.risuID = value;
    }

    /**
     * Gets the value of the paymentId property.
     * 
     * @return
     *     possible object is
     *     {@link String }
     *     
     */
    public String getPaymentId() {
        return paymentId;
    }

    /**
     * Sets the value of the paymentId property.
     * 
     * @param value
     *     allowed object is
     *     {@link String }
     *     
     */
    public void setPaymentId(String value) {
        this.paymentId = value;
    }

    /**
     * Gets the value of the rcvNumber property.
     * 
     * @return
     *     possible object is
     *     {@link String }
     *     
     */
    public String getRcvNumber() {
        return rcvNumber;
    }

    /**
     * Sets the value of the rcvNumber property.
     * 
     * @param value
     *     allowed object is
     *     {@link String }
     *     
     */
    public void setRcvNumber(String value) {
        this.rcvNumber = value;
    }

    /**
     * Gets the value of the effectiveDate property.
     * 
     * @return
     *     possible object is
     *     {@link String }
     *     
     */
    public String getEffectiveDate() {
        return effectiveDate;
    }

    /**
     * Sets the value of the effectiveDate property.
     * 
     * @param value
     *     allowed object is
     *     {@link String }
     *     
     */
    public void setEffectiveDate(String value) {
        this.effectiveDate = value;
    }

    /**
     * Gets the value of the elmDate property.
     * 
     * @return
     *     possible object is
     *     {@link String }
     *     
     */
    public String getElmDate() {
        return elmDate;
    }

    /**
     * Sets the value of the elmDate property.
     * 
     * @param value
     *     allowed object is
     *     {@link String }
     *     
     */
    public void setElmDate(String value) {
        this.elmDate = value;
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
     * Gets the value of the amount property.
     * 
     */
    public long getAmount() {
        return amount;
    }

    /**
     * Sets the value of the amount property.
     * 
     */
    public void setAmount(long value) {
        this.amount = value;
    }

    /**
     * Gets the value of the description property.
     * 
     * @return
     *     possible object is
     *     {@link String }
     *     
     */
    public String getDescription() {
        return description;
    }

    /**
     * Sets the value of the description property.
     * 
     * @param value
     *     allowed object is
     *     {@link String }
     *     
     */
    public void setDescription(String value) {
        this.description = value;
    }

    /**
     * Gets the value of the status property.
     * 
     * @return
     *     possible object is
     *     {@link String }
     *     
     */
    public String getStatus() {
        return status;
    }

    /**
     * Sets the value of the status property.
     * 
     * @param value
     *     allowed object is
     *     {@link String }
     *     
     */
    public void setStatus(String value) {
        this.status = value;
    }

    /**
     * Gets the value of the bankCode property.
     * 
     * @return
     *     possible object is
     *     {@link String }
     *     
     */
    public String getBankCode() {
        return bankCode;
    }

    /**
     * Sets the value of the bankCode property.
     * 
     * @param value
     *     allowed object is
     *     {@link String }
     *     
     */
    public void setBankCode(String value) {
        this.bankCode = value;
    }

    /**
     * Gets the value of the fullName property.
     * 
     * @return
     *     possible object is
     *     {@link String }
     *     
     */
    public String getFullName() {
        return fullName;
    }

    /**
     * Sets the value of the fullName property.
     * 
     * @param value
     *     allowed object is
     *     {@link String }
     *     
     */
    public void setFullName(String value) {
        this.fullName = value;
    }

    /**
     * Gets the value of the senderId property.
     * 
     */
    public long getSenderId() {
        return senderId;
    }

    /**
     * Sets the value of the senderId property.
     * 
     */
    public void setSenderId(long value) {
        this.senderId = value;
    }

    /**
     * Gets the value of the isSnd property.
     * 
     * @return
     *     possible object is
     *     {@link String }
     *     
     */
    public String getIsSnd() {
        return isSnd;
    }

    /**
     * Sets the value of the isSnd property.
     * 
     * @param value
     *     allowed object is
     *     {@link String }
     *     
     */
    public void setIsSnd(String value) {
        this.isSnd = value;
    }

}
