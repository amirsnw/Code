
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
 *         &lt;element name="Shenasedar_SearchPaymentTransferResult" type="{http://tempuri.org/}Result_SearchTransfer" minOccurs="0"/>
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
    "shenasedarSearchPaymentTransferResult"
})
@XmlRootElement(name = "Shenasedar_SearchPaymentTransferResponse")
public class ShenasedarSearchPaymentTransferResponse {

    @XmlElement(name = "Shenasedar_SearchPaymentTransferResult")
    protected ResultSearchTransfer shenasedarSearchPaymentTransferResult;

    /**
     * Gets the value of the shenasedarSearchPaymentTransferResult property.
     * 
     * @return
     *     possible object is
     *     {@link ResultSearchTransfer }
     *     
     */
    public ResultSearchTransfer getShenasedarSearchPaymentTransferResult() {
        return shenasedarSearchPaymentTransferResult;
    }

    /**
     * Sets the value of the shenasedarSearchPaymentTransferResult property.
     * 
     * @param value
     *     allowed object is
     *     {@link ResultSearchTransfer }
     *     
     */
    public void setShenasedarSearchPaymentTransferResult(ResultSearchTransfer value) {
        this.shenasedarSearchPaymentTransferResult = value;
    }

}
