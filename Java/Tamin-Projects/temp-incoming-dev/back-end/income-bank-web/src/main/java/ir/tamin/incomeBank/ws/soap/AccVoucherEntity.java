
package ir.tamin.incomeBank.ws.soap;

import javax.xml.bind.annotation.XmlAccessType;
import javax.xml.bind.annotation.XmlAccessorType;
import javax.xml.bind.annotation.XmlElement;
import javax.xml.bind.annotation.XmlType;


/**
 * <p>Java class for AccVoucherEntity complex type.
 * 
 * <p>The following schema fragment specifies the expected content contained within this class.
 * 
 * <pre>
 * &lt;complexType name="AccVoucherEntity">
 *   &lt;complexContent>
 *     &lt;restriction base="{http://www.w3.org/2001/XMLSchema}anyType">
 *       &lt;sequence>
 *         &lt;element name="Header" type="{http://tempuri.org/}HeadEntity" minOccurs="0"/>
 *         &lt;element name="Details" type="{http://tempuri.org/}ArrayOfDetailEntity" minOccurs="0"/>
 *       &lt;/sequence>
 *     &lt;/restriction>
 *   &lt;/complexContent>
 * &lt;/complexType>
 * </pre>
 * 
 * 
 */
@XmlAccessorType(XmlAccessType.FIELD)
@XmlType(name = "AccVoucherEntity", propOrder = {
    "header",
    "details"
})
public class AccVoucherEntity {

    @XmlElement(name = "Header")
    protected HeadEntity header;
    @XmlElement(name = "Details")
    protected ArrayOfDetailEntity details;

    /**
     * Gets the value of the header property.
     * 
     * @return
     *     possible object is
     *     {@link HeadEntity }
     *     
     */
    public HeadEntity getHeader() {
        return header;
    }

    /**
     * Sets the value of the header property.
     * 
     * @param value
     *     allowed object is
     *     {@link HeadEntity }
     *     
     */
    public void setHeader(HeadEntity value) {
        this.header = value;
    }

    /**
     * Gets the value of the details property.
     * 
     * @return
     *     possible object is
     *     {@link ArrayOfDetailEntity }
     *     
     */
    public ArrayOfDetailEntity getDetails() {
        return details;
    }

    /**
     * Sets the value of the details property.
     * 
     * @param value
     *     allowed object is
     *     {@link ArrayOfDetailEntity }
     *     
     */
    public void setDetails(ArrayOfDetailEntity value) {
        this.details = value;
    }

}
