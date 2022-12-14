
package ir.tamin.incomeBank.ws.soap;

import java.math.BigDecimal;
import javax.xml.bind.annotation.XmlAccessType;
import javax.xml.bind.annotation.XmlAccessorType;
import javax.xml.bind.annotation.XmlElement;
import javax.xml.bind.annotation.XmlType;


/**
 * <p>Java class for ServiceResult complex type.
 * 
 * <p>The following schema fragment specifies the expected content contained within this class.
 * 
 * <pre>
 * &lt;complexType name="ServiceResult">
 *   &lt;complexContent>
 *     &lt;restriction base="{http://www.w3.org/2001/XMLSchema}anyType">
 *       &lt;sequence>
 *         &lt;element name="GetServiceErrorList" type="{http://tempuri.org/}ArrayOfString" minOccurs="0"/>
 *         &lt;element name="GetServiceMessageList" type="{http://tempuri.org/}ArrayOfString" minOccurs="0"/>
 *         &lt;element name="VoucherSequenceInAcc" type="{http://www.w3.org/2001/XMLSchema}decimal"/>
 *         &lt;element name="ServiceResultObject" type="{http://www.w3.org/2001/XMLSchema}anyType" minOccurs="0"/>
 *         &lt;element name="bill" type="{http://tempuri.org/}ArrayOfArrayOfAnyType" minOccurs="0"/>
 *       &lt;/sequence>
 *     &lt;/restriction>
 *   &lt;/complexContent>
 * &lt;/complexType>
 * </pre>
 * 
 * 
 */
@XmlAccessorType(XmlAccessType.FIELD)
@XmlType(name = "ServiceResult", propOrder = {
    "getServiceErrorList",
    "getServiceMessageList",
    "voucherSequenceInAcc",
    "serviceResultObject",
    "bill"
})
public class ServiceResult {

    @XmlElement(name = "GetServiceErrorList")
    protected ArrayOfString getServiceErrorList;
    @XmlElement(name = "GetServiceMessageList")
    protected ArrayOfString getServiceMessageList;
    @XmlElement(name = "VoucherSequenceInAcc", required = true)
    protected BigDecimal voucherSequenceInAcc;
    @XmlElement(name = "ServiceResultObject")
    protected Object serviceResultObject;
    protected ArrayOfArrayOfAnyType bill;

    /**
     * Gets the value of the getServiceErrorList property.
     * 
     * @return
     *     possible object is
     *     {@link ArrayOfString }
     *     
     */
    public ArrayOfString getGetServiceErrorList() {
        return getServiceErrorList;
    }

    /**
     * Sets the value of the getServiceErrorList property.
     * 
     * @param value
     *     allowed object is
     *     {@link ArrayOfString }
     *     
     */
    public void setGetServiceErrorList(ArrayOfString value) {
        this.getServiceErrorList = value;
    }

    /**
     * Gets the value of the getServiceMessageList property.
     * 
     * @return
     *     possible object is
     *     {@link ArrayOfString }
     *     
     */
    public ArrayOfString getGetServiceMessageList() {
        return getServiceMessageList;
    }

    /**
     * Sets the value of the getServiceMessageList property.
     * 
     * @param value
     *     allowed object is
     *     {@link ArrayOfString }
     *     
     */
    public void setGetServiceMessageList(ArrayOfString value) {
        this.getServiceMessageList = value;
    }

    /**
     * Gets the value of the voucherSequenceInAcc property.
     * 
     * @return
     *     possible object is
     *     {@link BigDecimal }
     *     
     */
    public BigDecimal getVoucherSequenceInAcc() {
        return voucherSequenceInAcc;
    }

    /**
     * Sets the value of the voucherSequenceInAcc property.
     * 
     * @param value
     *     allowed object is
     *     {@link BigDecimal }
     *     
     */
    public void setVoucherSequenceInAcc(BigDecimal value) {
        this.voucherSequenceInAcc = value;
    }

    /**
     * Gets the value of the serviceResultObject property.
     * 
     * @return
     *     possible object is
     *     {@link Object }
     *     
     */
    public Object getServiceResultObject() {
        return serviceResultObject;
    }

    /**
     * Sets the value of the serviceResultObject property.
     * 
     * @param value
     *     allowed object is
     *     {@link Object }
     *     
     */
    public void setServiceResultObject(Object value) {
        this.serviceResultObject = value;
    }

    /**
     * Gets the value of the bill property.
     * 
     * @return
     *     possible object is
     *     {@link ArrayOfArrayOfAnyType }
     *     
     */
    public ArrayOfArrayOfAnyType getBill() {
        return bill;
    }

    /**
     * Sets the value of the bill property.
     * 
     * @param value
     *     allowed object is
     *     {@link ArrayOfArrayOfAnyType }
     *     
     */
    public void setBill(ArrayOfArrayOfAnyType value) {
        this.bill = value;
    }

}
