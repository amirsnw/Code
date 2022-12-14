
package ir.tamin.incomeBank.service.asnad.webservice.brefah;

import javax.xml.bind.annotation.XmlAccessType;
import javax.xml.bind.annotation.XmlAccessorType;
import javax.xml.bind.annotation.XmlElement;
import javax.xml.bind.annotation.XmlType;


/**
 * <p>Java class for Result_SearchTransfer complex type.
 * 
 * <p>The following schema fragment specifies the expected content contained within this class.
 * 
 * <pre>
 * &lt;complexType name="Result_SearchTransfer">
 *   &lt;complexContent>
 *     &lt;restriction base="{http://www.w3.org/2001/XMLSchema}anyType">
 *       &lt;sequence>
 *         &lt;element name="HMR_ISSUTRANSDATE" type="{http://www.w3.org/2001/XMLSchema}string" minOccurs="0"/>
 *         &lt;element name="HMR_ISSUREFNO" type="{http://www.w3.org/2001/XMLSchema}string" minOccurs="0"/>
 *         &lt;element name="HavaleNo" type="{http://www.w3.org/2001/XMLSchema}string" minOccurs="0"/>
 *       &lt;/sequence>
 *     &lt;/restriction>
 *   &lt;/complexContent>
 * &lt;/complexType>
 * </pre>
 * 
 * 
 */
@XmlAccessorType(XmlAccessType.FIELD)
@XmlType(name = "Result_SearchTransfer", propOrder = {
    "hmrissutransdate",
    "hmrissurefno",
    "havaleNo"
})
public class ResultSearchTransfer {

    @XmlElement(name = "HMR_ISSUTRANSDATE")
    protected String hmrissutransdate;
    @XmlElement(name = "HMR_ISSUREFNO")
    protected String hmrissurefno;
    @XmlElement(name = "HavaleNo")
    protected String havaleNo;

    /**
     * Gets the value of the hmrissutransdate property.
     * 
     * @return
     *     possible object is
     *     {@link String }
     *     
     */
    public String getHMRISSUTRANSDATE() {
        return hmrissutransdate;
    }

    /**
     * Sets the value of the hmrissutransdate property.
     * 
     * @param value
     *     allowed object is
     *     {@link String }
     *     
     */
    public void setHMRISSUTRANSDATE(String value) {
        this.hmrissutransdate = value;
    }

    /**
     * Gets the value of the hmrissurefno property.
     * 
     * @return
     *     possible object is
     *     {@link String }
     *     
     */
    public String getHMRISSUREFNO() {
        return hmrissurefno;
    }

    /**
     * Sets the value of the hmrissurefno property.
     * 
     * @param value
     *     allowed object is
     *     {@link String }
     *     
     */
    public void setHMRISSUREFNO(String value) {
        this.hmrissurefno = value;
    }

    /**
     * Gets the value of the havaleNo property.
     * 
     * @return
     *     possible object is
     *     {@link String }
     *     
     */
    public String getHavaleNo() {
        return havaleNo;
    }

    /**
     * Sets the value of the havaleNo property.
     * 
     * @param value
     *     allowed object is
     *     {@link String }
     *     
     */
    public void setHavaleNo(String value) {
        this.havaleNo = value;
    }

}
