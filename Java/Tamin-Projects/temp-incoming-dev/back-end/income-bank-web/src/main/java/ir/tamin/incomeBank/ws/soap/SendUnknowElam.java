
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
 *         &lt;element name="_unknowElam" type="{http://tempuri.org/}UnknowElam" minOccurs="0"/>
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
    "unknowElam"
})
@XmlRootElement(name = "SendUnknowElam")
public class SendUnknowElam {

    @XmlElement(name = "_unknowElam")
    protected UnknowElam unknowElam;

    /**
     * Gets the value of the unknowElam property.
     * 
     * @return
     *     possible object is
     *     {@link UnknowElam }
     *     
     */
    public UnknowElam getUnknowElam() {
        return unknowElam;
    }

    /**
     * Sets the value of the unknowElam property.
     * 
     * @param value
     *     allowed object is
     *     {@link UnknowElam }
     *     
     */
    public void setUnknowElam(UnknowElam value) {
        this.unknowElam = value;
    }

}
