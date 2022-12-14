
package ir.tamin.insurance.technical.business.service.info;

import javax.xml.bind.annotation.XmlAccessType;
import javax.xml.bind.annotation.XmlAccessorType;
import javax.xml.bind.annotation.XmlElement;
import javax.xml.bind.annotation.XmlType;
import java.util.ArrayList;
import java.util.List;


/**
 * <p>Java class for ArrayOfClsEnt_PayStatus_Ist complex type.
 * 
 * <p>The following schema fragment specifies the expected content contained within this class.
 * 
 * <pre>
 * &lt;complexType name="ArrayOfClsEnt_PayStatus_Ist">
 *   &lt;complexContent>
 *     &lt;restriction base="{http://www.w3.org/2001/XMLSchema}anyType">
 *       &lt;sequence>
 *         &lt;element name="clsEnt_PayStatus_Ist" type="{http://tempuri.org/SSupPermit/SsupServices}clsEnt_PayStatus_Ist" maxOccurs="unbounded" minOccurs="0"/>
 *       &lt;/sequence>
 *     &lt;/restriction>
 *   &lt;/complexContent>
 * &lt;/complexType>
 * </pre>
 * 
 * 
 */
@XmlAccessorType(XmlAccessType.FIELD)
@XmlType(name = "ArrayOfClsEnt_PayStatus_Ist", propOrder = {
    "clsEntPayStatusIst"
})
public class ArrayOfClsEntPayStatusIst {

    @XmlElement(name = "clsEnt_PayStatus_Ist", nillable = true)
    protected List<ClsEntPayStatusIst> clsEntPayStatusIst;

    /**
     * Gets the value of the clsEntPayStatusIst property.
     * 
     * <p>
     * This accessor method returns a reference to the live list,
     * not a snapshot. Therefore any modification you make to the
     * returned list will be present inside the JAXB object.
     * This is why there is not a <CODE>set</CODE> method for the clsEntPayStatusIst property.
     * 
     * <p>
     * For example, to add a new item, do as follows:
     * <pre>
     *    getClsEntPayStatusIst().add(newItem);
     * </pre>
     * 
     * 
     * <p>
     * Objects of the following type(s) are allowed in the list
     * {@link ClsEntPayStatusIst }
     * 
     * 
     */
    public List<ClsEntPayStatusIst> getClsEntPayStatusIst() {
        if (clsEntPayStatusIst == null) {
            clsEntPayStatusIst = new ArrayList<ClsEntPayStatusIst>();
        }
        return this.clsEntPayStatusIst;
    }

}
