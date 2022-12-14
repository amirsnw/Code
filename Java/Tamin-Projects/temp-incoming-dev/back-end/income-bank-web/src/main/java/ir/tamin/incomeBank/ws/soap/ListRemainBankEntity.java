
package ir.tamin.incomeBank.ws.soap;

import javax.xml.bind.annotation.XmlAccessType;
import javax.xml.bind.annotation.XmlAccessorType;
import javax.xml.bind.annotation.XmlElement;
import javax.xml.bind.annotation.XmlType;


/**
 * <p>Java class for ListRemainBankEntity complex type.
 * 
 * <p>The following schema fragment specifies the expected content contained within this class.
 * 
 * <pre>
 * &lt;complexType name="ListRemainBankEntity">
 *   &lt;complexContent>
 *     &lt;restriction base="{http://www.w3.org/2001/XMLSchema}anyType">
 *       &lt;sequence>
 *         &lt;element name="RemainBankEntityLst" type="{http://tempuri.org/}ArrayOfRemainBankEntity" minOccurs="0"/>
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
@XmlType(name = "ListRemainBankEntity", propOrder = {
    "remainBankEntityLst",
    "res"
})
public class ListRemainBankEntity {

    @XmlElement(name = "RemainBankEntityLst")
    protected ArrayOfRemainBankEntity remainBankEntityLst;
    protected ServiceResult res;

    /**
     * Gets the value of the remainBankEntityLst property.
     * 
     * @return
     *     possible object is
     *     {@link ArrayOfRemainBankEntity }
     *     
     */
    public ArrayOfRemainBankEntity getRemainBankEntityLst() {
        return remainBankEntityLst;
    }

    /**
     * Sets the value of the remainBankEntityLst property.
     * 
     * @param value
     *     allowed object is
     *     {@link ArrayOfRemainBankEntity }
     *     
     */
    public void setRemainBankEntityLst(ArrayOfRemainBankEntity value) {
        this.remainBankEntityLst = value;
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
