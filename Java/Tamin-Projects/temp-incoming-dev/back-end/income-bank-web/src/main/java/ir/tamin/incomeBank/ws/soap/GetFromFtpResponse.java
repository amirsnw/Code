
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
 *         &lt;element name="GetFromFtpResult" type="{http://www.w3.org/2001/XMLSchema}base64Binary" minOccurs="0"/>
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
    "getFromFtpResult"
})
@XmlRootElement(name = "GetFromFtpResponse")
public class GetFromFtpResponse {

    @XmlElement(name = "GetFromFtpResult")
    protected byte[] getFromFtpResult;

    /**
     * Gets the value of the getFromFtpResult property.
     * 
     * @return
     *     possible object is
     *     byte[]
     */
    public byte[] getGetFromFtpResult() {
        return getFromFtpResult;
    }

    /**
     * Sets the value of the getFromFtpResult property.
     * 
     * @param value
     *     allowed object is
     *     byte[]
     */
    public void setGetFromFtpResult(byte[] value) {
        this.getFromFtpResult = value;
    }

}
