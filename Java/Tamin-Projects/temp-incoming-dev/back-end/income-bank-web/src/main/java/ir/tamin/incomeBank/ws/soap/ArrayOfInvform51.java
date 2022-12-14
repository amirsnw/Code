
package ir.tamin.incomeBank.ws.soap;

import java.util.ArrayList;
import java.util.List;
import javax.xml.bind.annotation.XmlAccessType;
import javax.xml.bind.annotation.XmlAccessorType;
import javax.xml.bind.annotation.XmlElement;
import javax.xml.bind.annotation.XmlType;


/**
 * <p>Java class for ArrayOfInvform5_1 complex type.
 * 
 * <p>The following schema fragment specifies the expected content contained within this class.
 * 
 * <pre>
 * &lt;complexType name="ArrayOfInvform5_1">
 *   &lt;complexContent>
 *     &lt;restriction base="{http://www.w3.org/2001/XMLSchema}anyType">
 *       &lt;sequence>
 *         &lt;element name="Invform5_1" type="{http://tempuri.org/}Invform5_1" maxOccurs="unbounded" minOccurs="0"/>
 *       &lt;/sequence>
 *     &lt;/restriction>
 *   &lt;/complexContent>
 * &lt;/complexType>
 * </pre>
 * 
 * 
 */
@XmlAccessorType(XmlAccessType.FIELD)
@XmlType(name = "ArrayOfInvform5_1", propOrder = {
    "invform51"
})
public class ArrayOfInvform51 {

    @XmlElement(name = "Invform5_1", nillable = true)
    protected List<Invform51> invform51;

    /**
     * Gets the value of the invform51 property.
     * 
     * <p>
     * This accessor method returns a reference to the live list,
     * not a snapshot. Therefore any modification you make to the
     * returned list will be present inside the JAXB object.
     * This is why there is not a <CODE>set</CODE> method for the invform51 property.
     * 
     * <p>
     * For example, to add a new item, do as follows:
     * <pre>
     *    getInvform51().add(newItem);
     * </pre>
     * 
     * 
     * <p>
     * Objects of the following type(s) are allowed in the list
     * {@link Invform51 }
     * 
     * 
     */
    public List<Invform51> getInvform51() {
        if (invform51 == null) {
            invform51 = new ArrayList<Invform51>();
        }
        return this.invform51;
    }

}
