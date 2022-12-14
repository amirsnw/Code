
package ir.tamin.incomeBank.ws.soap;

import java.util.ArrayList;
import java.util.List;
import javax.xml.bind.annotation.XmlAccessType;
import javax.xml.bind.annotation.XmlAccessorType;
import javax.xml.bind.annotation.XmlElement;
import javax.xml.bind.annotation.XmlType;


/**
 * <p>Java class for ArrayOfEntVWSOORATMALI complex type.
 * 
 * <p>The following schema fragment specifies the expected content contained within this class.
 * 
 * <pre>
 * &lt;complexType name="ArrayOfEntVWSOORATMALI">
 *   &lt;complexContent>
 *     &lt;restriction base="{http://www.w3.org/2001/XMLSchema}anyType">
 *       &lt;sequence>
 *         &lt;element name="EntVWSOORATMALI" type="{http://tempuri.org/}EntVWSOORATMALI" maxOccurs="unbounded" minOccurs="0"/>
 *       &lt;/sequence>
 *     &lt;/restriction>
 *   &lt;/complexContent>
 * &lt;/complexType>
 * </pre>
 * 
 * 
 */
@XmlAccessorType(XmlAccessType.FIELD)
@XmlType(name = "ArrayOfEntVWSOORATMALI", propOrder = {
    "entVWSOORATMALI"
})
public class ArrayOfEntVWSOORATMALI {

    @XmlElement(name = "EntVWSOORATMALI", nillable = true)
    protected List<EntVWSOORATMALI> entVWSOORATMALI;

    /**
     * Gets the value of the entVWSOORATMALI property.
     * 
     * <p>
     * This accessor method returns a reference to the live list,
     * not a snapshot. Therefore any modification you make to the
     * returned list will be present inside the JAXB object.
     * This is why there is not a <CODE>set</CODE> method for the entVWSOORATMALI property.
     * 
     * <p>
     * For example, to add a new item, do as follows:
     * <pre>
     *    getEntVWSOORATMALI().add(newItem);
     * </pre>
     * 
     * 
     * <p>
     * Objects of the following type(s) are allowed in the list
     * {@link EntVWSOORATMALI }
     * 
     * 
     */
    public List<EntVWSOORATMALI> getEntVWSOORATMALI() {
        if (entVWSOORATMALI == null) {
            entVWSOORATMALI = new ArrayList<EntVWSOORATMALI>();
        }
        return this.entVWSOORATMALI;
    }

}
