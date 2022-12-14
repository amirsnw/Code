
package ir.tamin.insurance.technical.business.service.info;

import javax.xml.bind.annotation.*;


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
 *         &lt;element name="GetEnt_PayStatus_FundResult" type="{http://tempuri.org/SSupPermit/SsupServices}ArrayOfClsEnt_PayStatus_Ist" minOccurs="0"/>
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
    "getEntPayStatusFundResult"
})
@XmlRootElement(name = "GetEnt_PayStatus_FundResponse")
public class GetEntPayStatusFundResponse {

    @XmlElement(name = "GetEnt_PayStatus_FundResult")
    protected ArrayOfClsEntPayStatusIst getEntPayStatusFundResult;

    /**
     * Gets the value of the getEntPayStatusFundResult property.
     * 
     * @return
     *     possible object is
     *     {@link ArrayOfClsEntPayStatusIst }
     *     
     */
    public ArrayOfClsEntPayStatusIst getGetEntPayStatusFundResult() {
        return getEntPayStatusFundResult;
    }

    /**
     * Sets the value of the getEntPayStatusFundResult property.
     * 
     * @param value
     *     allowed object is
     *     {@link ArrayOfClsEntPayStatusIst }
     *     
     */
    public void setGetEntPayStatusFundResult(ArrayOfClsEntPayStatusIst value) {
        this.getEntPayStatusFundResult = value;
    }

}
