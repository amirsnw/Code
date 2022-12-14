
package ir.tamin.incomeBank.ws.soap;

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
 *         &lt;element name="GetFinancialConfirmResult" type="{http://tempuri.org/}FinancialConfirmEntity" minOccurs="0"/>
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
    "getFinancialConfirmResult"
})
@XmlRootElement(name = "GetFinancialConfirmResponse")
public class GetFinancialConfirmResponse {

    @XmlElement(name = "GetFinancialConfirmResult")
    protected FinancialConfirmEntity getFinancialConfirmResult;

    /**
     * Gets the value of the getFinancialConfirmResult property.
     * 
     * @return
     *     possible object is
     *     {@link FinancialConfirmEntity }
     *     
     */
    public FinancialConfirmEntity getGetFinancialConfirmResult() {
        return getFinancialConfirmResult;
    }

    /**
     * Sets the value of the getFinancialConfirmResult property.
     * 
     * @param value
     *     allowed object is
     *     {@link FinancialConfirmEntity }
     *     
     */
    public void setGetFinancialConfirmResult(FinancialConfirmEntity value) {
        this.getFinancialConfirmResult = value;
    }

}
