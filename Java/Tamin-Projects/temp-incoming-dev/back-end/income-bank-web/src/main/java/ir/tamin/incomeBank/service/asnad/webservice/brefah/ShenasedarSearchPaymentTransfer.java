
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
 *         &lt;element name="ShenasePayment" type="{http://www.w3.org/2001/XMLSchema}string" minOccurs="0"/>
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
    "shenasePayment"
})
@XmlRootElement(name = "Shenasedar_SearchPaymentTransfer")
public class ShenasedarSearchPaymentTransfer {

    @XmlElement(name = "ShenasePayment")
    protected String shenasePayment;

    /**
     * Gets the value of the shenasePayment property.
     * 
     * @return
     *     possible object is
     *     {@link String }
     *     
     */
    public String getShenasePayment() {
        return shenasePayment;
    }

    /**
     * Sets the value of the shenasePayment property.
     * 
     * @param value
     *     allowed object is
     *     {@link String }
     *     
     */
    public void setShenasePayment(String value) {
        this.shenasePayment = value;
    }

}
