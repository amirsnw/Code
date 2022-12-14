
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
 *         &lt;element name="RequestTran" type="{http://tempuri.org/}Request_Transfer" minOccurs="0"/>
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
    "requestTran"
})
@XmlRootElement(name = "Shenasedar_PaymentTransfer")
public class ShenasedarPaymentTransfer {

    @XmlElement(name = "RequestTran")
    protected RequestTransfer requestTran;

    /**
     * Gets the value of the requestTran property.
     * 
     * @return
     *     possible object is
     *     {@link RequestTransfer }
     *     
     */
    public RequestTransfer getRequestTran() {
        return requestTran;
    }

    /**
     * Sets the value of the requestTran property.
     * 
     * @param value
     *     allowed object is
     *     {@link RequestTransfer }
     *     
     */
    public void setRequestTran(RequestTransfer value) {
        this.requestTran = value;
    }

}
