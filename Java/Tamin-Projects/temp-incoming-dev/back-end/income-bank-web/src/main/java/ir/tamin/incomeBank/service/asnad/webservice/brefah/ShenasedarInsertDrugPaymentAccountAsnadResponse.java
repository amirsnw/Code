
package ir.tamin.incomeBank.service.asnad.webservice.brefah;

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
 *         &lt;element name="Shenasedar_InsertDrugPaymentAccount_AsnadResult" type="{http://www.w3.org/2001/XMLSchema}boolean"/>
 *         &lt;element name="Message" type="{http://www.w3.org/2001/XMLSchema}string" minOccurs="0"/>
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
    "shenasedarInsertDrugPaymentAccountAsnadResult",
    "message"
})
@XmlRootElement(name = "Shenasedar_InsertDrugPaymentAccount_AsnadResponse")
public class ShenasedarInsertDrugPaymentAccountAsnadResponse {

    @XmlElement(name = "Shenasedar_InsertDrugPaymentAccount_AsnadResult")
    protected boolean shenasedarInsertDrugPaymentAccountAsnadResult;
    @XmlElement(name = "Message")
    protected String message;

    /**
     * Gets the value of the shenasedarInsertDrugPaymentAccountAsnadResult property.
     * 
     */
    public boolean isShenasedarInsertDrugPaymentAccountAsnadResult() {
        return shenasedarInsertDrugPaymentAccountAsnadResult;
    }

    /**
     * Sets the value of the shenasedarInsertDrugPaymentAccountAsnadResult property.
     * 
     */
    public void setShenasedarInsertDrugPaymentAccountAsnadResult(boolean value) {
        this.shenasedarInsertDrugPaymentAccountAsnadResult = value;
    }

    /**
     * Gets the value of the message property.
     * 
     * @return
     *     possible object is
     *     {@link String }
     *     
     */
    public String getMessage() {
        return message;
    }

    /**
     * Sets the value of the message property.
     * 
     * @param value
     *     allowed object is
     *     {@link String }
     *     
     */
    public void setMessage(String value) {
        this.message = value;
    }

}
