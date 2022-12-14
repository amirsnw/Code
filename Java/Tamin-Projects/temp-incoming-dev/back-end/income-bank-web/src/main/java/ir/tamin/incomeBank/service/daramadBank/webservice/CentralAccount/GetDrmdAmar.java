
package ir.tamin.incomeBank.service.daramadBank.webservice.centralAccount;

import javax.xml.bind.annotation.XmlAccessType;
import javax.xml.bind.annotation.XmlAccessorType;
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
 *         &lt;element name="brchcode" type="{http://www.w3.org/2001/XMLSchema}string" minOccurs="0"/>
 *         &lt;element name="sdate" type="{http://www.w3.org/2001/XMLSchema}string" minOccurs="0"/>
 *         &lt;element name="edate" type="{http://www.w3.org/2001/XMLSchema}string" minOccurs="0"/>
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
    "brchcode",
    "sdate",
    "edate"
})
@XmlRootElement(name = "GetDrmd_Amar")
public class GetDrmdAmar {

    protected String brchcode;
    protected String sdate;
    protected String edate;

    /**
     * Gets the value of the brchcode property.
     * 
     * @return
     *     possible object is
     *     {@link String }
     *     
     */
    public String getBrchcode() {
        return brchcode;
    }

    /**
     * Sets the value of the brchcode property.
     * 
     * @param value
     *     allowed object is
     *     {@link String }
     *     
     */
    public void setBrchcode(String value) {
        this.brchcode = value;
    }

    /**
     * Gets the value of the sdate property.
     * 
     * @return
     *     possible object is
     *     {@link String }
     *     
     */
    public String getSdate() {
        return sdate;
    }

    /**
     * Sets the value of the sdate property.
     * 
     * @param value
     *     allowed object is
     *     {@link String }
     *     
     */
    public void setSdate(String value) {
        this.sdate = value;
    }

    /**
     * Gets the value of the edate property.
     * 
     * @return
     *     possible object is
     *     {@link String }
     *     
     */
    public String getEdate() {
        return edate;
    }

    /**
     * Sets the value of the edate property.
     * 
     * @param value
     *     allowed object is
     *     {@link String }
     *     
     */
    public void setEdate(String value) {
        this.edate = value;
    }

}
