
package ir.tamin.incomeBank.ws.soap;

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
 *         &lt;element name="CreateNewElamDaramadResult" type="{http://tempuri.org/}ServiceResult" minOccurs="0"/>
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
    "createNewElamDaramadResult"
})
@XmlRootElement(name = "CreateNewElamDaramadResponse")
public class CreateNewElamDaramadResponse {

    @XmlElement(name = "CreateNewElamDaramadResult")
    protected ServiceResult createNewElamDaramadResult;

    /**
     * Gets the value of the createNewElamDaramadResult property.
     * 
     * @return
     *     possible object is
     *     {@link ServiceResult }
     *     
     */
    public ServiceResult getCreateNewElamDaramadResult() {
        return createNewElamDaramadResult;
    }

    /**
     * Sets the value of the createNewElamDaramadResult property.
     * 
     * @param value
     *     allowed object is
     *     {@link ServiceResult }
     *     
     */
    public void setCreateNewElamDaramadResult(ServiceResult value) {
        this.createNewElamDaramadResult = value;
    }

}
