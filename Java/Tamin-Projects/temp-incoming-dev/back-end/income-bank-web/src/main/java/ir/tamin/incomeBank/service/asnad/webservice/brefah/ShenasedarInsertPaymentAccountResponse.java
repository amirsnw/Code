
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
 *         &lt;element name="Shenasedar_InsertPaymentAccountResult" type="{http://tempuri.org/}PaymentAccountResult_Refah" minOccurs="0"/>
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
    "shenasedarInsertPaymentAccountResult"
})
@XmlRootElement(name = "Shenasedar_InsertPaymentAccountResponse")
public class ShenasedarInsertPaymentAccountResponse {

    @XmlElement(name = "Shenasedar_InsertPaymentAccountResult")
    protected PaymentAccountResultRefah shenasedarInsertPaymentAccountResult;

    /**
     * Gets the value of the shenasedarInsertPaymentAccountResult property.
     * 
     * @return
     *     possible object is
     *     {@link PaymentAccountResultRefah }
     *     
     */
    public PaymentAccountResultRefah getShenasedarInsertPaymentAccountResult() {
        return shenasedarInsertPaymentAccountResult;
    }

    /**
     * Sets the value of the shenasedarInsertPaymentAccountResult property.
     * 
     * @param value
     *     allowed object is
     *     {@link PaymentAccountResultRefah }
     *     
     */
    public void setShenasedarInsertPaymentAccountResult(PaymentAccountResultRefah value) {
        this.shenasedarInsertPaymentAccountResult = value;
    }

}
