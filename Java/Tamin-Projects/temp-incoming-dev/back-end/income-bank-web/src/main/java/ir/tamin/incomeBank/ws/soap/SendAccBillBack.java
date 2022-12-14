
package ir.tamin.incomeBank.ws.soap;

import javax.xml.bind.annotation.XmlAccessType;
import javax.xml.bind.annotation.XmlAccessorType;
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
 *         &lt;element name="blbc" type="{http://tempuri.org/}BillBack" minOccurs="0"/>
 *         &lt;element name="blbcFile" type="{http://www.w3.org/2001/XMLSchema}base64Binary" minOccurs="0"/>
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
    "blbc",
    "blbcFile"
})
@XmlRootElement(name = "SendAccBillBack")
public class SendAccBillBack {

    protected BillBack blbc;
    protected byte[] blbcFile;

    /**
     * Gets the value of the blbc property.
     * 
     * @return
     *     possible object is
     *     {@link BillBack }
     *     
     */
    public BillBack getBlbc() {
        return blbc;
    }

    /**
     * Sets the value of the blbc property.
     * 
     * @param value
     *     allowed object is
     *     {@link BillBack }
     *     
     */
    public void setBlbc(BillBack value) {
        this.blbc = value;
    }

    /**
     * Gets the value of the blbcFile property.
     * 
     * @return
     *     possible object is
     *     byte[]
     */
    public byte[] getBlbcFile() {
        return blbcFile;
    }

    /**
     * Sets the value of the blbcFile property.
     * 
     * @param value
     *     allowed object is
     *     byte[]
     */
    public void setBlbcFile(byte[] value) {
        this.blbcFile = value;
    }

}
