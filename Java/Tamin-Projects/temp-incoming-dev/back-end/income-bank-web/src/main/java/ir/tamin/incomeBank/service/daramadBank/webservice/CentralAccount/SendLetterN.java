
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
 *         &lt;element name="oclsLetterN" type="{http://tempuri.org/Sorat/CentralAccount}clsLetterN" minOccurs="0"/>
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
    "oclsLetterN"
})
@XmlRootElement(name = "Send_LetterN")
public class SendLetterN {

    protected ClsLetterN oclsLetterN;

    /**
     * Gets the value of the oclsLetterN property.
     * 
     * @return
     *     possible object is
     *     {@link ClsLetterN }
     *     
     */
    public ClsLetterN getOclsLetterN() {
        return oclsLetterN;
    }

    /**
     * Sets the value of the oclsLetterN property.
     * 
     * @param value
     *     allowed object is
     *     {@link ClsLetterN }
     *     
     */
    public void setOclsLetterN(ClsLetterN value) {
        this.oclsLetterN = value;
    }

}
