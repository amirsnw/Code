
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
 *         &lt;element name="DeserializeObjectResult" type="{http://tempuri.org/}ArrayOfResponse" minOccurs="0"/>
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
    "deserializeObjectResult"
})
@XmlRootElement(name = "DeserializeObjectResponse")
public class DeserializeObjectResponse {

    @XmlElement(name = "DeserializeObjectResult")
    protected ArrayOfResponse deserializeObjectResult;

    /**
     * Gets the value of the deserializeObjectResult property.
     * 
     * @return
     *     possible object is
     *     {@link ArrayOfResponse }
     *     
     */
    public ArrayOfResponse getDeserializeObjectResult() {
        return deserializeObjectResult;
    }

    /**
     * Sets the value of the deserializeObjectResult property.
     * 
     * @param value
     *     allowed object is
     *     {@link ArrayOfResponse }
     *     
     */
    public void setDeserializeObjectResult(ArrayOfResponse value) {
        this.deserializeObjectResult = value;
    }

}
