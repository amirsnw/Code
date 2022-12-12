
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
 *         &lt;element name="GetSsupPermitResult" type="{http://tempuri.org/SSupPermit/SsupServices}ArrayOfClsPermitSpec" minOccurs="0"/>
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
    "getSsupPermitResult"
})
@XmlRootElement(name = "GetSsupPermitResponse")
public class GetSsupPermitResponse {

    @XmlElement(name = "GetSsupPermitResult")
    protected ArrayOfClsPermitSpec getSsupPermitResult;

    /**
     * Gets the value of the getSsupPermitResult property.
     * 
     * @return
     *     possible object is
     *     {@link ArrayOfClsPermitSpec }
     *     
     */
    public ArrayOfClsPermitSpec getGetSsupPermitResult() {
        return getSsupPermitResult;
    }

    /**
     * Sets the value of the getSsupPermitResult property.
     * 
     * @param value
     *     allowed object is
     *     {@link ArrayOfClsPermitSpec }
     *     
     */
    public void setGetSsupPermitResult(ArrayOfClsPermitSpec value) {
        this.getSsupPermitResult = value;
    }

}
