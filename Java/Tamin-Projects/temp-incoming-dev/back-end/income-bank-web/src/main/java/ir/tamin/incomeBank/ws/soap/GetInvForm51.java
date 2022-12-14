
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
 *         &lt;element name="strVahedCode" type="{http://www.w3.org/2001/XMLSchema}string" minOccurs="0"/>
 *         &lt;element name="strYear" type="{http://www.w3.org/2001/XMLSchema}string" minOccurs="0"/>
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
    "strVahedCode",
    "strYear"
})
@XmlRootElement(name = "GetInvForm5_1")
public class GetInvForm51 {

    protected String strVahedCode;
    protected String strYear;

    /**
     * Gets the value of the strVahedCode property.
     * 
     * @return
     *     possible object is
     *     {@link String }
     *     
     */
    public String getStrVahedCode() {
        return strVahedCode;
    }

    /**
     * Sets the value of the strVahedCode property.
     * 
     * @param value
     *     allowed object is
     *     {@link String }
     *     
     */
    public void setStrVahedCode(String value) {
        this.strVahedCode = value;
    }

    /**
     * Gets the value of the strYear property.
     * 
     * @return
     *     possible object is
     *     {@link String }
     *     
     */
    public String getStrYear() {
        return strYear;
    }

    /**
     * Sets the value of the strYear property.
     * 
     * @param value
     *     allowed object is
     *     {@link String }
     *     
     */
    public void setStrYear(String value) {
        this.strYear = value;
    }

}
