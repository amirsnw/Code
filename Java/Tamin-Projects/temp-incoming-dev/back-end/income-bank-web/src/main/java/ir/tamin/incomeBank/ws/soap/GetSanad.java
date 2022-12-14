
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
 *         &lt;element name="snd" type="{http://tempuri.org/}Sanad" minOccurs="0"/>
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
    "snd"
})
@XmlRootElement(name = "getSanad")
public class GetSanad {

    protected Sanad snd;

    /**
     * Gets the value of the snd property.
     * 
     * @return
     *     possible object is
     *     {@link Sanad }
     *     
     */
    public Sanad getSnd() {
        return snd;
    }

    /**
     * Sets the value of the snd property.
     * 
     * @param value
     *     allowed object is
     *     {@link Sanad }
     *     
     */
    public void setSnd(Sanad value) {
        this.snd = value;
    }

}
