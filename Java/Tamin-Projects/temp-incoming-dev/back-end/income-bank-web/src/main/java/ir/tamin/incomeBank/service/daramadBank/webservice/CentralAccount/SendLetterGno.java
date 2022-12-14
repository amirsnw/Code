
package ir.tamin.incomeBank.service.daramadBank.webservice.centralAccount;

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
 *         &lt;element name="oclsletter" type="{http://tempuri.org/Sorat/CentralAccount}clsletter" minOccurs="0"/>
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
    "oclsletter"
})
@XmlRootElement(name = "Send_LetterGno")
public class SendLetterGno {

    protected Clsletter oclsletter;

    /**
     * Gets the value of the oclsletter property.
     * 
     * @return
     *     possible object is
     *     {@link Clsletter }
     *     
     */
    public Clsletter getOclsletter() {
        return oclsletter;
    }

    /**
     * Sets the value of the oclsletter property.
     * 
     * @param value
     *     allowed object is
     *     {@link Clsletter }
     *     
     */
    public void setOclsletter(Clsletter value) {
        this.oclsletter = value;
    }

}
