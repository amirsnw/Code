
package ir.tamin.incomeBank.ws.soap;

import javax.xml.bind.annotation.XmlAccessType;
import javax.xml.bind.annotation.XmlAccessorType;
import javax.xml.bind.annotation.XmlElement;
import javax.xml.bind.annotation.XmlType;


/**
 * <p>Java class for foxHesf5560 complex type.
 * 
 * <p>The following schema fragment specifies the expected content contained within this class.
 * 
 * <pre>
 * &lt;complexType name="foxHesf5560">
 *   &lt;complexContent>
 *     &lt;restriction base="{http://www.w3.org/2001/XMLSchema}anyType">
 *       &lt;sequence>
 *         &lt;element name="no_doc" type="{http://www.w3.org/2001/XMLSchema}string" minOccurs="0"/>
 *         &lt;element name="date_doc" type="{http://www.w3.org/2001/XMLSchema}string" minOccurs="0"/>
 *       &lt;/sequence>
 *     &lt;/restriction>
 *   &lt;/complexContent>
 * &lt;/complexType>
 * </pre>
 * 
 * 
 */
@XmlAccessorType(XmlAccessType.FIELD)
@XmlType(name = "foxHesf5560", propOrder = {
    "noDoc",
    "dateDoc"
})
public class FoxHesf5560 {

    @XmlElement(name = "no_doc")
    protected String noDoc;
    @XmlElement(name = "date_doc")
    protected String dateDoc;

    /**
     * Gets the value of the noDoc property.
     * 
     * @return
     *     possible object is
     *     {@link String }
     *     
     */
    public String getNoDoc() {
        return noDoc;
    }

    /**
     * Sets the value of the noDoc property.
     * 
     * @param value
     *     allowed object is
     *     {@link String }
     *     
     */
    public void setNoDoc(String value) {
        this.noDoc = value;
    }

    /**
     * Gets the value of the dateDoc property.
     * 
     * @return
     *     possible object is
     *     {@link String }
     *     
     */
    public String getDateDoc() {
        return dateDoc;
    }

    /**
     * Sets the value of the dateDoc property.
     * 
     * @param value
     *     allowed object is
     *     {@link String }
     *     
     */
    public void setDateDoc(String value) {
        this.dateDoc = value;
    }

}
