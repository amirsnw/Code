
package ir.tamin.insurance.technical.business.service.info;

import javax.xml.bind.annotation.*;


/**
 * <p>Java class for anonymous complex type.
 * 
 * <p>The following schema fragment specifies the expected content contained within this class.
 * 
 * <pre>
 * &lt;complexType>
 *   &lt;complexContent>
 *     &lt;restriction base="{http://www.w3.org/2001/XMLSchema}anyType">
 *       &lt;sequence>
 *         &lt;element name="SetPermit_ReciveStateResult" type="{http://www.w3.org/2001/XMLSchema}anyType" minOccurs="0"/>
 *       &lt;/sequence>
 *     &lt;/restriction>
 *   &lt;/complexContent>
 * &lt;/complexType>
 * </pre>
 * 
 * 
 */
@XmlAccessorType(XmlAccessType.FIELD)
@XmlType(name = "", propOrder = {
    "setPermitReciveStateResult"
})
@XmlRootElement(name = "SetPermit_ReciveStateResponse")
public class SetPermitReciveStateResponse {

    @XmlElement(name = "SetPermit_ReciveStateResult")
    protected Object setPermitReciveStateResult;

    /**
     * Gets the value of the setPermitReciveStateResult property.
     * 
     * @return
     *     possible object is
     *     {@link Object }
     *     
     */
    public Object getSetPermitReciveStateResult() {
        return setPermitReciveStateResult;
    }

    /**
     * Sets the value of the setPermitReciveStateResult property.
     * 
     * @param value
     *     allowed object is
     *     {@link Object }
     *     
     */
    public void setSetPermitReciveStateResult(Object value) {
        this.setPermitReciveStateResult = value;
    }

}
