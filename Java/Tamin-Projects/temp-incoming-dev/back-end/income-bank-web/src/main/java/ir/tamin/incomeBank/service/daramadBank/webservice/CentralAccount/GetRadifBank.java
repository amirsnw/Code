
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
 *         &lt;element name="brchcode" type="{http://www.w3.org/2001/XMLSchema}string" minOccurs="0"/>
 *         &lt;element name="bnkcode" type="{http://www.w3.org/2001/XMLSchema}string" minOccurs="0"/>
 *         &lt;element name="bnkhesab" type="{http://www.w3.org/2001/XMLSchema}string" minOccurs="0"/>
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
    "brchcode",
    "bnkcode",
    "bnkhesab"
})
@XmlRootElement(name = "GetRadif_Bank")
public class GetRadifBank {

    protected String brchcode;
    protected String bnkcode;
    protected String bnkhesab;

    /**
     * Gets the value of the brchcode property.
     * 
     * @return
     *     possible object is
     *     {@link String }
     *     
     */
    public String getBrchcode() {
        return brchcode;
    }

    /**
     * Sets the value of the brchcode property.
     * 
     * @param value
     *     allowed object is
     *     {@link String }
     *     
     */
    public void setBrchcode(String value) {
        this.brchcode = value;
    }

    /**
     * Gets the value of the bnkcode property.
     * 
     * @return
     *     possible object is
     *     {@link String }
     *     
     */
    public String getBnkcode() {
        return bnkcode;
    }

    /**
     * Sets the value of the bnkcode property.
     * 
     * @param value
     *     allowed object is
     *     {@link String }
     *     
     */
    public void setBnkcode(String value) {
        this.bnkcode = value;
    }

    /**
     * Gets the value of the bnkhesab property.
     * 
     * @return
     *     possible object is
     *     {@link String }
     *     
     */
    public String getBnkhesab() {
        return bnkhesab;
    }

    /**
     * Sets the value of the bnkhesab property.
     * 
     * @param value
     *     allowed object is
     *     {@link String }
     *     
     */
    public void setBnkhesab(String value) {
        this.bnkhesab = value;
    }

}
