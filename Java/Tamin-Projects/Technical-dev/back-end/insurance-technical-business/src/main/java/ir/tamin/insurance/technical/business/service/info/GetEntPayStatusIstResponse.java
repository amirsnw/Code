
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
 *         &lt;element name="GetEnt_PayStatus_IstResult" type="{http://tempuri.org/SSupPermit/SsupServices}ArrayOfClsEnt_PayStatus_Ist" minOccurs="0"/>
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
    "getEntPayStatusIstResult"
})
@XmlRootElement(name = "GetEnt_PayStatus_IstResponse")
public class GetEntPayStatusIstResponse {

    @XmlElement(name = "GetEnt_PayStatus_IstResult")
    protected ArrayOfClsEntPayStatusIst getEntPayStatusIstResult;

    /**
     * Gets the value of the getEntPayStatusIstResult property.
     * 
     * @return
     *     possible object is
     *     {@link ArrayOfClsEntPayStatusIst }
     *     
     */
    public ArrayOfClsEntPayStatusIst getGetEntPayStatusIstResult() {
        return getEntPayStatusIstResult;
    }

    /**
     * Sets the value of the getEntPayStatusIstResult property.
     * 
     * @param value
     *     allowed object is
     *     {@link ArrayOfClsEntPayStatusIst }
     *     
     */
    public void setGetEntPayStatusIstResult(ArrayOfClsEntPayStatusIst value) {
        this.getEntPayStatusIstResult = value;
    }

}
