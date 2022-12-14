
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
 *         &lt;element name="binaryF" type="{http://www.w3.org/2001/XMLSchema}base64Binary" minOccurs="0"/>
 *         &lt;element name="atch" type="{http://tempuri.org/}Attach" minOccurs="0"/>
 *         &lt;element name="elm" type="{http://tempuri.org/}NewElam" minOccurs="0"/>
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
    "binaryF",
    "atch",
    "elm"
})
@XmlRootElement(name = "NewwriteBinaryFELM")
public class NewwriteBinaryFELM {

    protected byte[] binaryF;
    protected Attach atch;
    protected NewElam elm;

    /**
     * Gets the value of the binaryF property.
     * 
     * @return
     *     possible object is
     *     byte[]
     */
    public byte[] getBinaryF() {
        return binaryF;
    }

    /**
     * Sets the value of the binaryF property.
     * 
     * @param value
     *     allowed object is
     *     byte[]
     */
    public void setBinaryF(byte[] value) {
        this.binaryF = value;
    }

    /**
     * Gets the value of the atch property.
     * 
     * @return
     *     possible object is
     *     {@link Attach }
     *     
     */
    public Attach getAtch() {
        return atch;
    }

    /**
     * Sets the value of the atch property.
     * 
     * @param value
     *     allowed object is
     *     {@link Attach }
     *     
     */
    public void setAtch(Attach value) {
        this.atch = value;
    }

    /**
     * Gets the value of the elm property.
     * 
     * @return
     *     possible object is
     *     {@link NewElam }
     *     
     */
    public NewElam getElm() {
        return elm;
    }

    /**
     * Sets the value of the elm property.
     * 
     * @param value
     *     allowed object is
     *     {@link NewElam }
     *     
     */
    public void setElm(NewElam value) {
        this.elm = value;
    }

}
