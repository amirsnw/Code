
package ir.tamin.incomeBank.ws.soap;

import java.util.ArrayList;
import java.util.List;
import javax.xml.bind.annotation.XmlAccessType;
import javax.xml.bind.annotation.XmlAccessorType;
import javax.xml.bind.annotation.XmlElement;
import javax.xml.bind.annotation.XmlType;


/**
 * <p>Java class for ArrayOfFreeCheqListEntity complex type.
 * 
 * <p>The following schema fragment specifies the expected content contained within this class.
 * 
 * <pre>
 * &lt;complexType name="ArrayOfFreeCheqListEntity">
 *   &lt;complexContent>
 *     &lt;restriction base="{http://www.w3.org/2001/XMLSchema}anyType">
 *       &lt;sequence>
 *         &lt;element name="FreeCheqListEntity" type="{http://tempuri.org/}FreeCheqListEntity" maxOccurs="unbounded" minOccurs="0"/>
 *       &lt;/sequence>
 *     &lt;/restriction>
 *   &lt;/complexContent>
 * &lt;/complexType>
 * </pre>
 * 
 * 
 */
@XmlAccessorType(XmlAccessType.FIELD)
@XmlType(name = "ArrayOfFreeCheqListEntity", propOrder = {
    "freeCheqListEntity"
})
public class ArrayOfFreeCheqListEntity {

    @XmlElement(name = "FreeCheqListEntity", nillable = true)
    protected List<FreeCheqListEntity> freeCheqListEntity;

    /**
     * Gets the value of the freeCheqListEntity property.
     * 
     * <p>
     * This accessor method returns a reference to the live list,
     * not a snapshot. Therefore any modification you make to the
     * returned list will be present inside the JAXB object.
     * This is why there is not a <CODE>set</CODE> method for the freeCheqListEntity property.
     * 
     * <p>
     * For example, to add a new item, do as follows:
     * <pre>
     *    getFreeCheqListEntity().add(newItem);
     * </pre>
     * 
     * 
     * <p>
     * Objects of the following type(s) are allowed in the list
     * {@link FreeCheqListEntity }
     * 
     * 
     */
    public List<FreeCheqListEntity> getFreeCheqListEntity() {
        if (freeCheqListEntity == null) {
            freeCheqListEntity = new ArrayList<FreeCheqListEntity>();
        }
        return this.freeCheqListEntity;
    }

}
