
package ir.tamin.incomeBank.service.asnad.webservice.brefah;

import java.math.BigDecimal;
import javax.xml.bind.annotation.XmlAccessType;
import javax.xml.bind.annotation.XmlAccessorType;
import javax.xml.bind.annotation.XmlElement;
import javax.xml.bind.annotation.XmlType;


/**
 * <p>Java class for Request_Transfer complex type.
 * 
 * <p>The following schema fragment specifies the expected content contained within this class.
 * 
 * <pre>
 * &lt;complexType name="Request_Transfer">
 *   &lt;complexContent>
 *     &lt;restriction base="{http://www.w3.org/2001/XMLSchema}anyType">
 *       &lt;sequence>
 *         &lt;element name="ValidationCode" type="{http://www.w3.org/2001/XMLSchema}string" minOccurs="0"/>
 *         &lt;element name="VahedCode" type="{http://www.w3.org/2001/XMLSchema}string" minOccurs="0"/>
 *         &lt;element name="CustNo" type="{http://www.w3.org/2001/XMLSchema}string" minOccurs="0"/>
 *         &lt;element name="CustType" type="{http://www.w3.org/2001/XMLSchema}string" minOccurs="0"/>
 *         &lt;element name="Nos_Month" type="{http://www.w3.org/2001/XMLSchema}string" minOccurs="0"/>
 *         &lt;element name="Nos_Year" type="{http://www.w3.org/2001/XMLSchema}string" minOccurs="0"/>
 *         &lt;element name="EffectiveDate" type="{http://www.w3.org/2001/XMLSchema}string" minOccurs="0"/>
 *         &lt;element name="ShenaseNo" type="{http://www.w3.org/2001/XMLSchema}string" minOccurs="0"/>
 *         &lt;element name="Amount" type="{http://www.w3.org/2001/XMLSchema}decimal"/>
 *         &lt;element name="DestinationAccNo" type="{http://www.w3.org/2001/XMLSchema}string" minOccurs="0"/>
 *         &lt;element name="DestinationFName" type="{http://www.w3.org/2001/XMLSchema}string" minOccurs="0"/>
 *         &lt;element name="DestinationLName" type="{http://www.w3.org/2001/XMLSchema}string" minOccurs="0"/>
 *         &lt;element name="DestinationFatherName" type="{http://www.w3.org/2001/XMLSchema}string" minOccurs="0"/>
 *         &lt;element name="DestinationIDNO" type="{http://www.w3.org/2001/XMLSchema}string" minOccurs="0"/>
 *         &lt;element name="PayDateStart" type="{http://www.w3.org/2001/XMLSchema}string" minOccurs="0"/>
 *         &lt;element name="PayDateEnd" type="{http://www.w3.org/2001/XMLSchema}string" minOccurs="0"/>
 *         &lt;element name="DestinationMobileNo" type="{http://www.w3.org/2001/XMLSchema}string" minOccurs="0"/>
 *         &lt;element name="DestinationNationCode" type="{http://www.w3.org/2001/XMLSchema}string" minOccurs="0"/>
 *         &lt;element name="www_status" type="{http://www.w3.org/2001/XMLSchema}string" minOccurs="0"/>
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
@XmlType(name = "Request_Transfer", propOrder = {
    "validationCode",
    "vahedCode",
    "custNo",
    "custType",
    "nosMonth",
    "nosYear",
    "effectiveDate",
    "shenaseNo",
    "amount",
    "destinationAccNo",
    "destinationFName",
    "destinationLName",
    "destinationFatherName",
    "destinationIDNO",
    "payDateStart",
    "payDateEnd",
    "destinationMobileNo",
    "destinationNationCode",
    "wwwStatus",
    "loginType"
})
public class RequestTransfer {

    @XmlElement(name = "ValidationCode")
    protected String validationCode;
    @XmlElement(name = "VahedCode")
    protected String vahedCode;
    @XmlElement(name = "CustNo")
    protected String custNo;
    @XmlElement(name = "CustType")
    protected String custType;
    @XmlElement(name = "Nos_Month")
    protected String nosMonth;
    @XmlElement(name = "Nos_Year")
    protected String nosYear;
    @XmlElement(name = "EffectiveDate")
    protected String effectiveDate;
    @XmlElement(name = "ShenaseNo")
    protected String shenaseNo;
    @XmlElement(name = "Amount", required = true)
    protected BigDecimal amount;
    @XmlElement(name = "DestinationAccNo")
    protected String destinationAccNo;
    @XmlElement(name = "DestinationFName")
    protected String destinationFName;
    @XmlElement(name = "DestinationLName")
    protected String destinationLName;
    @XmlElement(name = "DestinationFatherName")
    protected String destinationFatherName;
    @XmlElement(name = "DestinationIDNO")
    protected String destinationIDNO;
    @XmlElement(name = "PayDateStart")
    protected String payDateStart;
    @XmlElement(name = "PayDateEnd")
    protected String payDateEnd;
    @XmlElement(name = "DestinationMobileNo")
    protected String destinationMobileNo;
    @XmlElement(name = "DestinationNationCode")
    protected String destinationNationCode;
    @XmlElement(name = "www_status")
    protected String wwwStatus;
    @XmlElement(name = "LoginType")
    protected String loginType;

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
     * Gets the value of the destinationFName property.
     * 
     * @return
     *     possible object is
     *     {@link String }
     *     
     */
    public String getDestinationFName() {
        return destinationFName;
    }

    /**
     * Sets the value of the destinationFName property.
     * 
     * @param value
     *     allowed object is
     *     {@link String }
     *     
     */
    public void setDestinationFName(String value) {
        this.destinationFName = value;
    }

    /**
     * Gets the value of the destinationLName property.
     * 
     * @return
     *     possible object is
     *     {@link String }
     *     
     */
    public String getDestinationLName() {
        return destinationLName;
    }

    /**
     * Sets the value of the destinationLName property.
     * 
     * @param value
     *     allowed object is
     *     {@link String }
     *     
     */
    public void setDestinationLName(String value) {
        this.destinationLName = value;
    }

    /**
     * Gets the value of the destinationFatherName property.
     * 
     * @return
     *     possible object is
     *     {@link String }
     *     
     */
    public String getDestinationFatherName() {
        return destinationFatherName;
    }

    /**
     * Sets the value of the destinationFatherName property.
     * 
     * @param value
     *     allowed object is
     *     {@link String }
     *     
     */
    public void setDestinationFatherName(String value) {
        this.destinationFatherName = value;
    }

    /**
     * Gets the value of the destinationIDNO property.
     * 
     * @return
     *     possible object is
     *     {@link String }
     *     
     */
    public String getDestinationIDNO() {
        return destinationIDNO;
    }

    /**
     * Sets the value of the destinationIDNO property.
     * 
     * @param value
     *     allowed object is
     *     {@link String }
     *     
     */
    public void setDestinationIDNO(String value) {
        this.destinationIDNO = value;
    }

    /**
     * Gets the value of the payDateStart property.
     * 
     * @return
     *     possible object is
     *     {@link String }
     *     
     */
    public String getPayDateStart() {
        return payDateStart;
    }

    /**
     * Sets the value of the payDateStart property.
     * 
     * @param value
     *     allowed object is
     *     {@link String }
     *     
     */
    public void setPayDateStart(String value) {
        this.payDateStart = value;
    }

    /**
     * Gets the value of the payDateEnd property.
     * 
     * @return
     *     possible object is
     *     {@link String }
     *     
     */
    public String getPayDateEnd() {
        return payDateEnd;
    }

    /**
     * Sets the value of the payDateEnd property.
     * 
     * @param value
     *     allowed object is
     *     {@link String }
     *     
     */
    public void setPayDateEnd(String value) {
        this.payDateEnd = value;
    }

    /**
     * Gets the value of the destinationMobileNo property.
     * 
     * @return
     *     possible object is
     *     {@link String }
     *     
     */
    public String getDestinationMobileNo() {
        return destinationMobileNo;
    }

    /**
     * Sets the value of the destinationMobileNo property.
     * 
     * @param value
     *     allowed object is
     *     {@link String }
     *     
     */
    public void setDestinationMobileNo(String value) {
        this.destinationMobileNo = value;
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
