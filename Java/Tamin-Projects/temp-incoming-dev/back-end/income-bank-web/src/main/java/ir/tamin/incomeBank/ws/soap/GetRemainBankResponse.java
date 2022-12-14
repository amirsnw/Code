
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
 *         &lt;element name="GetRemainBankResult" type="{http://tempuri.org/}ListRemainBankEntity" minOccurs="0"/>
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
    "getRemainBankResult"
})
@XmlRootElement(name = "GetRemainBankResponse")
public class GetRemainBankResponse {

    @XmlElement(name = "GetRemainBankResult")
    protected ListRemainBankEntity getRemainBankResult;

    /**
     * Gets the value of the getRemainBankResult property.
     * 
     * @return
     *     possible object is
     *     {@link ListRemainBankEntity }
     *     
     */
    public ListRemainBankEntity getGetRemainBankResult() {
        return getRemainBankResult;
    }

    /**
     * Sets the value of the getRemainBankResult property.
     * 
     * @param value
     *     allowed object is
     *     {@link ListRemainBankEntity }
     *     
     */
    public void setGetRemainBankResult(ListRemainBankEntity value) {
        this.getRemainBankResult = value;
    }

}
