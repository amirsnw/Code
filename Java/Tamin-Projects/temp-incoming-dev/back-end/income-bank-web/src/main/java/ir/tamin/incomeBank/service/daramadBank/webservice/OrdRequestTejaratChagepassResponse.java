
package ir.tamin.incomeBank.service.daramadBank.webservice;

import javax.xml.bind.annotation.XmlAccessType;
import javax.xml.bind.annotation.XmlAccessorType;
import javax.xml.bind.annotation.XmlElement;
import javax.xml.bind.annotation.XmlRootElement;
import javax.xml.bind.annotation.XmlType;


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
 *         &lt;element name="OrdRequest_Tejarat_chagepassResult" type="{http://www.w3.org/2001/XMLSchema}boolean"/>
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
    "ordRequestTejaratChagepassResult"
})
@XmlRootElement(name = "OrdRequest_Tejarat_chagepassResponse")
public class OrdRequestTejaratChagepassResponse {

    @XmlElement(name = "OrdRequest_Tejarat_chagepassResult")
    protected boolean ordRequestTejaratChagepassResult;

    /**
     * Gets the value of the ordRequestTejaratChagepassResult property.
     * 
     */
    public boolean isOrdRequestTejaratChagepassResult() {
        return ordRequestTejaratChagepassResult;
    }

    /**
     * Sets the value of the ordRequestTejaratChagepassResult property.
     * 
     */
    public void setOrdRequestTejaratChagepassResult(boolean value) {
        this.ordRequestTejaratChagepassResult = value;
    }

}
