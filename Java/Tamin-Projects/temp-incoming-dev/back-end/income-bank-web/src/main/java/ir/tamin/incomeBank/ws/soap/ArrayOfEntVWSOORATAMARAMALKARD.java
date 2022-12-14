
package ir.tamin.incomeBank.ws.soap;

import java.util.ArrayList;
import java.util.List;
import javax.xml.bind.annotation.XmlAccessType;
import javax.xml.bind.annotation.XmlAccessorType;
import javax.xml.bind.annotation.XmlElement;
import javax.xml.bind.annotation.XmlType;


/**
 * <p>Java class for ArrayOfEntVWSOORAT_AMARAMALKARD complex type.
 * 
 * <p>The following schema fragment specifies the expected content contained within this class.
 * 
 * <pre>
 * &lt;complexType name="ArrayOfEntVWSOORAT_AMARAMALKARD">
 *   &lt;complexContent>
 *     &lt;restriction base="{http://www.w3.org/2001/XMLSchema}anyType">
 *       &lt;sequence>
 *         &lt;element name="EntVWSOORAT_AMARAMALKARD" type="{http://tempuri.org/}EntVWSOORAT_AMARAMALKARD" maxOccurs="unbounded" minOccurs="0"/>
 *       &lt;/sequence>
 *     &lt;/restriction>
 *   &lt;/complexContent>
 * &lt;/complexType>
 * </pre>
 * 
 * 
 */
@XmlAccessorType(XmlAccessType.FIELD)
@XmlType(name = "ArrayOfEntVWSOORAT_AMARAMALKARD", propOrder = {
    "entVWSOORATAMARAMALKARD"
})
public class ArrayOfEntVWSOORATAMARAMALKARD {

    @XmlElement(name = "EntVWSOORAT_AMARAMALKARD", nillable = true)
    protected List<EntVWSOORATAMARAMALKARD> entVWSOORATAMARAMALKARD;

    /**
     * Gets the value of the entVWSOORATAMARAMALKARD property.
     * 
     * <p>
     * This accessor method returns a reference to the live list,
     * not a snapshot. Therefore any modification you make to the
     * returned list will be present inside the JAXB object.
     * This is why there is not a <CODE>set</CODE> method for the entVWSOORATAMARAMALKARD property.
     * 
     * <p>
     * For example, to add a new item, do as follows:
     * <pre>
     *    getEntVWSOORATAMARAMALKARD().add(newItem);
     * </pre>
     * 
     * 
     * <p>
     * Objects of the following type(s) are allowed in the list
     * {@link EntVWSOORATAMARAMALKARD }
     * 
     * 
     */
    public List<EntVWSOORATAMARAMALKARD> getEntVWSOORATAMARAMALKARD() {
        if (entVWSOORATAMARAMALKARD == null) {
            entVWSOORATAMARAMALKARD = new ArrayList<EntVWSOORATAMARAMALKARD>();
        }
        return this.entVWSOORATAMARAMALKARD;
    }

}
