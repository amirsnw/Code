
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
 *         &lt;element name="GetInvForm5_1Result" type="{http://tempuri.org/}ListInvForm5_1Entity" minOccurs="0"/>
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
    "getInvForm51Result"
})
@XmlRootElement(name = "GetInvForm5_1Response")
public class GetInvForm51Response {

    @XmlElement(name = "GetInvForm5_1Result")
    protected ListInvForm51Entity getInvForm51Result;

    /**
     * Gets the value of the getInvForm51Result property.
     * 
     * @return
     *     possible object is
     *     {@link ListInvForm51Entity }
     *     
     */
    public ListInvForm51Entity getGetInvForm51Result() {
        return getInvForm51Result;
    }

    /**
     * Sets the value of the getInvForm51Result property.
     * 
     * @param value
     *     allowed object is
     *     {@link ListInvForm51Entity }
     *     
     */
    public void setGetInvForm51Result(ListInvForm51Entity value) {
        this.getInvForm51Result = value;
    }

}
