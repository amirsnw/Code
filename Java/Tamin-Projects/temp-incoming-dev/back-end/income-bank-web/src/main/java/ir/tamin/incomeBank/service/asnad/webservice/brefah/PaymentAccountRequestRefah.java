
package ir.tamin.incomeBank.service.asnad.webservice.brefah;

import java.math.BigDecimal;
import javax.xml.bind.annotation.XmlAccessType;
import javax.xml.bind.annotation.XmlAccessorType;
import javax.xml.bind.annotation.XmlElement;
import javax.xml.bind.annotation.XmlType;


/**
 * <p>Java class for PaymentAccountRequest_Refah complex type.
 * 
 * <p>The following schema fragment specifies the expected content contained within this class.
 * 
 * <pre>
 * &lt;complexType name="PaymentAccountRequest_Refah">
 *   &lt;complexContent>
 *     &lt;restriction base="{http://www.w3.org/2001/XMLSchema}anyType">
 *       &lt;sequence>
 *         &lt;element name="VahedCode" type="{http://www.w3.org/2001/XMLSchema}string" minOccurs="0"/>
 *         &lt;element name="CustNo" type="{http://www.w3.org/2001/XMLSchema}string" minOccurs="0"/>
 *         &lt;element name="CustType" type="{http://www.w3.org/2001/XMLSchema}string" minOccurs="0"/>
 *         &lt;element name="www_status" type="{http://www.w3.org/2001/XMLSchema}string" minOccurs="0"/>
 *         &lt;element name="ValidationCode" type="{http://www.w3.org/2001/XMLSchema}string" minOccurs="0"/>
 *         &lt;element name="Nos_Month" type="{http://www.w3.org/2001/XMLSchema}string" minOccurs="0"/>
 *         &lt;element name="Nos_Year" type="{http://www.w3.org/2001/XMLSchema}string" minOccurs="0"/>
 *         &lt;element name="CurrentDate" type="{http://www.w3.org/2001/XMLSchema}string" minOccurs="0"/>
 *         &lt;element name="PaymentOrderNo" type="{http://www.w3.org/2001/XMLSchema}string" minOccurs="0"/>
 *         &lt;element name="Amount" type="{http://www.w3.org/2001/XMLSchema}decimal"/>
 *         &lt;element name="DestinationAccNo" type="{http://www.w3.org/2001/XMLSchema}string" minOccurs="0"/>
 *         &lt;element name="DestinationName" type="{http://www.w3.org/2001/XMLSchema}string" minOccurs="0"/>
 *         &lt;element name="DestinationNationCode" type="{http://www.w3.org/2001/XMLSchema}string" minOccurs="0"/>
 *         &lt;element name="ShenaseNo" type="{http://www.w3.org/2001/XMLSchema}string" minOccurs="0"/>
 *         &lt;element name="Type" type="{http://www.w3.org/2001/XMLSchema}string" minOccurs="0"/>
 *         &lt;element name="RevisedAmount" type="{http://www.w3.org/2001/XMLSchema}long"/>
 *         &lt;element name="LoginType" type="{http://www.w3.org/2001/XMLSchema}string" minOccurs="0"/>
 *       &lt;/sequence>
 *     &lt;/restriction>
 *   &lt;/complexContent>
 * &lt;/complexType>
 * </pre>
 * 
 * 
 */
@XmlAccessorType(XmlAccessType.FIELD)
@XmlType(name = "PaymentAccountRequest_Refah", propOrder = {
    "vahedCode",
    "custNo",
    "custType",
    "wwwStatus",
    "validationCode",
    "nosMonth",
    "nosYear",
    "currentDate",
    "paymentOrderNo",
    "amount",
    "destinationAccNo",
    "destinationName",
    "destinationNationCode",
    "shenaseNo",
    "type",
    "revisedAmount",
    "loginType"
})
public class PaymentAccountRequestRefah {

    @XmlElement(name = "VahedCode")
    protected String vahedCode;
    @XmlElement(name = "CustNo")
    protected String custNo;
    @XmlElement(name = "CustType")
    protected String custType;
    @XmlElement(name = "www_status")
    protected String wwwStatus;
    @XmlElement(name = "ValidationCode")
    protected String validationCode;
    @XmlElement(name = "Nos_Month")
    protected String nosMonth;
    @XmlElement(name = "Nos_Year")
    protected String nosYear;
    @XmlElement(name = "CurrentDate")
    protected String currentDate;
    @XmlElement(name = "PaymentOrderNo")
    protected String paymentOrderNo;
    @XmlElement(name = "Amount", required = true)
    protected BigDecimal amount;
    @XmlElement(name = "DestinationAccNo")
    protected String destinationAccNo;
    @XmlElement(name = "DestinationName")
    protected String destinationName;
    @XmlElement(name = "DestinationNationCode")
    protected String destinationNationCode;
    @XmlElement(name = "ShenaseNo")
    protected String shenaseNo;
    @XmlElement(name = "Type")
    protected String type;
    @XmlElement(name = "RevisedAmount", required = true, type = Long.class, nillable = true)
    protected Long revisedAmount;
    @XmlElement(name = "LoginType")
    protected String loginType;

    /**
     * Gets the value of the vahedCode property.
     * 
     * @return
     *     possible object is
     *     {@link String }
     *     
     */
    public String getVahedCode() {
        return vahedCode;
    }

    /**
     * Sets the value of the vahedCode property.
     * 
     * @param value
     *     allowed object is
     *     {@link String }
     *     
     */
    public void setVahedCode(String value) {
        this.vahedCode = value;
    }

    /**
     * Gets the value of the custNo property.
     * 
     * @return
     *     possible object is
     *     {@link String }
     *     
     */
    public String getCustNo() {
        return custNo;
    }

    /**
     * Sets the value of the custNo property.
     * 
     * @param value
     *     allowed object is
     *     {@link String }
     *     
     */
    public void setCustNo(String value) {
        this.custNo = value;
    }

    /**
     * Gets the value of the custType property.
     * 
     * @return
     *     possible object is
     *     {@link String }
     *     
     */
    public String getCustType() {
        return custType;
    }

    /**
     * Sets the value of the custType property.
     * 
     * @param value
     *     allowed object is
     *     {@link String }
     *     
     */
    public void setCustType(String value) {
        this.custType = value;
    }

    /**
     * Gets the value of the wwwStatus property.
     * 
     * @return
     *     possible object is
     *     {@link String }
     *     
     */
    public String getWwwStatus() {
        return wwwStatus;
    }

    /**
     * Sets the value of the wwwStatus property.
     * 
     * @param value
     *     allowed object is
     *     {@link String }
     *     
     */
    public void setWwwStatus(String value) {
        this.wwwStatus = value;
    }

    /**
     * Gets the value of the validationCode property.
     * 
     * @return
     *     possible object is
     *     {@link String }
     *     
     */
    public String getValidationCode() {
        return validationCode;
    }

    /**
     * Sets the value of the validationCode property.
     * 
     * @param value
     *     allowed object is
     *     {@link String }
     *     
     */
    public void setValidationCode(String value) {
        this.validationCode = value;
    }

    /**
     * Gets the value of the nosMonth property.
     * 
     * @return
     *     possible object is
     *     {@link String }
     *     
     */
    public String getNosMonth() {
        return nosMonth;
    }

    /**
     * Sets the value of the nosMonth property.
     * 
     * @param value
     *     allowed object is
     *     {@link String }
     *     
     */
    public void setNosMonth(String value) {
        this.nosMonth = value;
    }

    /**
     * Gets the value of the nosYear property.
     * 
     * @return
     *     possible object is
     *     {@link String }
     *     
     */
    public String getNosYear() {
        return nosYear;
    }

    /**
     * Sets the value of the nosYear property.
     * 
     * @param value
     *     allowed object is
     *     {@link String }
     *     
     */
    public void setNosYear(String value) {
        this.nosYear = value;
    }

    /**
     * Gets the value of the currentDate property.
     * 
     * @return
     *     possible object is
     *     {@link String }
     *     
     */
    public String getCurrentDate() {
        return currentDate;
    }

    /**
     * Sets the value of the currentDate property.
     * 
     * @param value
     *     allowed object is
     *     {@link String }
     *     
     */
    public void setCurrentDate(String value) {
        this.currentDate = value;
    }

    /**
     * Gets the value of the paymentOrderNo property.
     * 
     * @return
     *     possible object is
     *     {@link String }
     *     
     */
    public String getPaymentOrderNo() {
        return paymentOrderNo;
    }

    /**
     * Sets the value of the paymentOrderNo property.
     * 
     * @param value
     *     allowed object is
     *     {@link String }
     *     
     */
    public void setPaymentOrderNo(String value) {
        this.paymentOrderNo = value;
    }

    /**
     * Gets the value of the amount property.
     * 
     * @return
     *     possible object is
     *     {@link BigDecimal }
     *     
     */
    public BigDecimal getAmount() {
        return amount;
    }

    /**
     * Sets the value of the amount property.
     * 
     * @param value
     *     allowed object is
     *     {@link BigDecimal }
     *     
     */
    public void setAmount(BigDecimal value) {
        this.amount = value;
    }

    /**
     * Gets the value of the destinationAccNo property.
     * 
     * @return
     *     possible object is
     *     {@link String }
     *     
     */
    public String getDestinationAccNo() {
        return destinationAccNo;
    }

    /**
     * Sets the value of the destinationAccNo property.
     * 
     * @param value
     *     allowed object is
     *     {@link String }
     *     
     */
    public void setDestinationAccNo(String value) {
        this.destinationAccNo = value;
    }

    /**
     * Gets the value of the destinationName property.
     * 
     * @return
     *     possible object is
     *     {@link String }
     *     
     */
    public String getDestinationName() {
        return destinationName;
    }

    /**
     * Sets the value of the destinationName property.
     * 
     * @param value
     *     allowed object is
     *     {@link String }
     *     
     */
    public void setDestinationName(String value) {
        this.destinationName = value;
    }

    /**
     * Gets the value of the destinationNationCode property.
     * 
     * @return
     *     possible object is
     *     {@link String }
     *     
     */
    public String getDestinationNationCode() {
        return destinationNationCode;
    }

    /**
     * Sets the value of the destinationNationCode property.
     * 
     * @param value
     *     allowed object is
     *     {@link String }
     *     
     */
    public void setDestinationNationCode(String value) {
        this.destinationNationCode = value;
    }

    /**
     * Gets the value of the shenaseNo property.
     * 
     * @return
     *     possible object is
     *     {@link String }
     *     
     */
    public String getShenaseNo() {
        return shenaseNo;
    }

    /**
     * Sets the value of the shenaseNo property.
     * 
     * @param value
     *     allowed object is
     *     {@link String }
     *     
     */
    public void setShenaseNo(String value) {
        this.shenaseNo = value;
    }

    /**
     * Gets the value of the type property.
     * 
     * @return
     *     possible object is
     *     {@link String }
     *     
     */
    public String getType() {
        return type;
    }

    /**
     * Sets the value of the type property.
     * 
     * @param value
     *     allowed object is
     *     {@link String }
     *     
     */
    public void setType(String value) {
        this.type = value;
    }

    /**
     * Gets the value of the revisedAmount property.
     * 
     * @return
     *     possible object is
     *     {@link Long }
     *     
     */
    public Long getRevisedAmount() {
        return revisedAmount;
    }

    /**
     * Sets the value of the revisedAmount property.
     * 
     * @param value
     *     allowed object is
     *     {@link Long }
     *     
     */
    public void setRevisedAmount(Long value) {
        this.revisedAmount = value;
    }

    /**
     * Gets the value of the loginType property.
     * 
     * @return
     *     possible object is
     *     {@link String }
     *     
     */
    public String getLoginType() {
        return loginType;
    }

    /**
     * Sets the value of the loginType property.
     * 
     * @param value
     *     allowed object is
     *     {@link String }
     *     
     */
    public void setLoginType(String value) {
        this.loginType = value;
    }

}
