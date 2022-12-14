
package ir.tamin.insurance.technical.business.service.info;

import javax.xml.bind.annotation.XmlAccessType;
import javax.xml.bind.annotation.XmlAccessorType;
import javax.xml.bind.annotation.XmlElement;
import javax.xml.bind.annotation.XmlType;
import java.util.ArrayList;
import java.util.List;


/**
 * <p>Java class for ArrayOfClsPermitSpec complex type.
 * 
 * <p>The following schema fragment specifies the expected content contained within this class.
 * 
 * <pre>
 * &lt;complexType name="ArrayOfClsPermitSpec">
 *   &lt;complexContent>
 *     &lt;restriction base="{http://www.w3.org/2001/XMLSchema}anyType">
 *       &lt;sequence>
 *         &lt;element name="clsPermitSpec" type="{http://tempuri.org/SSupPermit/SsupServices}clsPermitSpec" maxOccurs="unbounded" minOccurs="0"/>
 *       &lt;/sequence>
 *     &lt;/restriction>
 *   &lt;/complexContent>
 * &lt;/complexType>
 * </pre>
 * 
 * 
 */
@XmlAccessorType(XmlAccessType.FIELD)
@XmlType(name = "ArrayOfClsPermitSpec", propOrder = {
    "clsPermitSpec"
})
public class ArrayOfClsPermitSpec {

    @XmlElement(nillable = true)
    protected List<ClsPermitSpec> clsPermitSpec;

    /**
     * Gets the value of the clsPermitSpec property.
     * 
     * <p>
     * This accessor method returns a reference to the live list,
     * not a snapshot. Therefore any modification you make to the
     * returned list will be present inside the JAXB object.
     * This is why there is not a <CODE>set</CODE> method for the clsPermitSpec property.
     * 
     * <p>
     * For example, to add a new item, do as follows:
     * <pre>
     *    getClsPermitSpec().add(newItem);
     * </pre>
     * 
     * 
     * <p>
     * Objects of the following type(s) are allowed in the list
     * {@link ClsPermitSpec }
     * 
     * 
     */
    public List<ClsPermitSpec> getClsPermitSpec() {
        if (clsPermitSpec == null) {
            clsPermitSpec = new ArrayList<ClsPermitSpec>();
        }
        return this.clsPermitSpec;
    }

}
