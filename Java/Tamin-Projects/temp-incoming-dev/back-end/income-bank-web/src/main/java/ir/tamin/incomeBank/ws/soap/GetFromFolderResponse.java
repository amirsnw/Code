
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
 *         &lt;element name="GetFromFolderResult" type="{http://www.w3.org/2001/XMLSchema}base64Binary" minOccurs="0"/>
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
    "getFromFolderResult"
})
@XmlRootElement(name = "GetFromFolderResponse")
public class GetFromFolderResponse {

    @XmlElement(name = "GetFromFolderResult")
    protected byte[] getFromFolderResult;

    /**
     * Gets the value of the getFromFolderResult property.
     * 
     * @return
     *     possible object is
     *     byte[]
     */
    public byte[] getGetFromFolderResult() {
        return getFromFolderResult;
    }

    /**
     * Sets the value of the getFromFolderResult property.
     * 
     * @param value
     *     allowed object is
     *     byte[]
     */
    public void setGetFromFolderResult(byte[] value) {
        this.getFromFolderResult = value;
    }

}
