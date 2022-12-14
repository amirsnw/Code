
package ir.tamin.incomeBank.ws.soap;

import java.util.ArrayList;
import java.util.List;
import javax.xml.bind.annotation.XmlAccessType;
import javax.xml.bind.annotation.XmlAccessorType;
import javax.xml.bind.annotation.XmlElement;
import javax.xml.bind.annotation.XmlType;


/**
 * <p>Java class for ArrayOfRemainBankEntity complex type.
 * 
 * <p>The following schema fragment specifies the expected content contained within this class.
 * 
 * <pre>
 * &lt;complexType name="ArrayOfRemainBankEntity">
 *   &lt;complexContent>
 *     &lt;restriction base="{http://www.w3.org/2001/XMLSchema}anyType">
 *       &lt;sequence>
 *         &lt;element name="RemainBankEntity" type="{http://tempuri.org/}RemainBankEntity" maxOccurs="unbounded" minOccurs="0"/>
 *       &lt;/sequence>
 *     &lt;/restriction>
 *   &lt;/complexContent>
 * &lt;/complexType>
 * </pre>
 * 
 * 
 */
@XmlAccessorType(XmlAccessType.FIELD)
@XmlType(name = "ArrayOfRemainBankEntity", propOrder = {
    "remainBankEntity"
})
public class ArrayOfRemainBankEntity {

    @XmlElement(name = "RemainBankEntity", nillable = true)
    protected List<RemainBankEntity> remainBankEntity;

    /**
     * Gets the value of the remainBankEntity property.
     * 
     * <p>
     * This accessor method returns a reference to the live list,
     * not a snapshot. Therefore any modification you make to the
     * returned list will be present inside the JAXB object.
     * This is why there is not a <CODE>set</CODE> method for the remainBankEntity property.
     * 
     * <p>
     * For example, to add a new item, do as follows:
     * <pre>
     *    getRemainBankEntity().add(newItem);
     * </pre>
     * 
     * 
     * <p>
     * Objects of the following type(s) are allowed in the list
     * {@link RemainBankEntity }
     * 
     * 
     */
    public List<RemainBankEntity> getRemainBankEntity() {
        if (remainBankEntity == null) {
            remainBankEntity = new ArrayList<RemainBankEntity>();
        }
        return this.remainBankEntity;
    }

}
