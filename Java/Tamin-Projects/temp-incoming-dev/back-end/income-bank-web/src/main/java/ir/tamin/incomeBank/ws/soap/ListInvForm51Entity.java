
package ir.tamin.incomeBank.ws.soap;

import javax.xml.bind.annotation.XmlAccessType;
import javax.xml.bind.annotation.XmlAccessorType;
import javax.xml.bind.annotation.XmlElement;
import javax.xml.bind.annotation.XmlType;


/**
 * <p>Java class for ListInvForm5_1Entity complex type.
 * 
 * <p>The following schema fragment specifies the expected content contained within this class.
 * 
 * <pre>
 * &lt;complexType name="ListInvForm5_1Entity">
 *   &lt;complexContent>
 *     &lt;restriction base="{http://www.w3.org/2001/XMLSchema}anyType">
 *       &lt;sequence>
 *         &lt;element name="Invform5_1EntityLst" type="{http://tempuri.org/}ArrayOfInvform5_1" minOccurs="0"/>
 *         &lt;element name="res" type="{http://tempuri.org/}ServiceResult" minOccurs="0"/>
 *       &lt;/sequence>
 *     &lt;/restriction>
 *   &lt;/complexContent>
 * &lt;/complexType>
 * </pre>
 * 
 * 
 */
@XmlAccessorType(XmlAccessType.FIELD)
@XmlType(name = "ListInvForm5_1Entity", propOrder = {
    "invform51EntityLst",
    "res"
})
public class ListInvForm51Entity {

    @XmlElement(name = "Invform5_1EntityLst")
    protected ArrayOfInvform51 invform51EntityLst;
    protected ServiceResult res;

    /**
     * Gets the value of the invform51EntityLst property.
     * 
     * @return
     *     possible object is
     *     {@link ArrayOfInvform51 }
     *     
     */
    public ArrayOfInvform51 getInvform51EntityLst() {
        return invform51EntityLst;
    }

    /**
     * Sets the value of the invform51EntityLst property.
     * 
     * @param value
     *     allowed object is
     *     {@link ArrayOfInvform51 }
     *     
     */
    public void setInvform51EntityLst(ArrayOfInvform51 value) {
        this.invform51EntityLst = value;
    }

    /**
     * Gets the value of the res property.
     * 
     * @return
     *     possible object is
     *     {@link ServiceResult }
     *     
     */
    public ServiceResult getRes() {
        return res;
    }

    /**
     * Sets the value of the res property.
     * 
     * @param value
     *     allowed object is
     *     {@link ServiceResult }
     *     
     */
    public void setRes(ServiceResult value) {
        this.res = value;
    }

}
