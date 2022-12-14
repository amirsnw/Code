
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
 *         &lt;element name="elm" type="{http://tempuri.org/}ElmDaramad" minOccurs="0"/>
 *         &lt;element name="isTahator" type="{http://www.w3.org/2001/XMLSchema}boolean"/>
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
    "elm",
    "isTahator"
})
@XmlRootElement(name = "CreateNewElamDaramad")
public class CreateNewElamDaramad {

    protected ElmDaramad elm;
    protected boolean isTahator;

    /**
     * Gets the value of the elm property.
     * 
     * @return
     *     possible object is
     *     {@link ElmDaramad }
     *     
     */
    public ElmDaramad getElm() {
        return elm;
    }

    /**
     * Sets the value of the elm property.
     * 
     * @param value
     *     allowed object is
     *     {@link ElmDaramad }
     *     
     */
    public void setElm(ElmDaramad value) {
        this.elm = value;
    }

    /**
     * Gets the value of the isTahator property.
     * 
     */
    public boolean isIsTahator() {
        return isTahator;
    }

    /**
     * Sets the value of the isTahator property.
     * 
     */
    public void setIsTahator(boolean value) {
        this.isTahator = value;
    }

}
