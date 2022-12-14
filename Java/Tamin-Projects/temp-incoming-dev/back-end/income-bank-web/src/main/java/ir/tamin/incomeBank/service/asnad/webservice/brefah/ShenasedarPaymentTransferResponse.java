
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
 *         &lt;element name="Shenasedar_PaymentTransferResult" type="{http://tempuri.org/}Result_Transfer" minOccurs="0"/>
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
    "shenasedarPaymentTransferResult"
})
@XmlRootElement(name = "Shenasedar_PaymentTransferResponse")
public class ShenasedarPaymentTransferResponse {

    @XmlElement(name = "Shenasedar_PaymentTransferResult")
    protected ResultTransfer shenasedarPaymentTransferResult;

    /**
     * Gets the value of the shenasedarPaymentTransferResult property.
     * 
     * @return
     *     possible object is
     *     {@link ResultTransfer }
     *     
     */
    public ResultTransfer getShenasedarPaymentTransferResult() {
        return shenasedarPaymentTransferResult;
    }

    /**
     * Sets the value of the shenasedarPaymentTransferResult property.
     * 
     * @param value
     *     allowed object is
     *     {@link ResultTransfer }
     *     
     */
    public void setShenasedarPaymentTransferResult(ResultTransfer value) {
        this.shenasedarPaymentTransferResult = value;
    }

}
