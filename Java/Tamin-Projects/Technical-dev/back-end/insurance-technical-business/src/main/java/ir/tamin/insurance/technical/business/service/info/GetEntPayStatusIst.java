
package ir.tamin.insurance.technical.business.service.info;

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
 *         &lt;element name="sRisuid" type="{http://www.w3.org/2001/XMLSchema}string" minOccurs="0"/>
 *         &lt;element name="sFundCode" type="{http://www.w3.org/2001/XMLSchema}string" minOccurs="0"/>
 *         &lt;element name="sBrchCode" type="{http://www.w3.org/2001/XMLSchema}string" minOccurs="0"/>
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
    "sRisuid",
    "sFundCode",
    "sBrchCode"
})
@XmlRootElement(name = "GetEnt_PayStatus_Ist")
public class GetEntPayStatusIst {

    protected String sRisuid;
    protected String sFundCode;
    protected String sBrchCode;

    /**
     * Gets the value of the sRisuid property.
     * 
     * @return
     *     possible object is
     *     {@link String }
     *     
     */
    public String getSRisuid() {
        return sRisuid;
    }

    /**
     * Sets the value of the sRisuid property.
     * 
     * @param value
     *     allowed object is
     *     {@link String }
     *     
     */
    public void setSRisuid(String value) {
        this.sRisuid = value;
    }

    /**
     * Gets the value of the sFundCode property.
     * 
     * @return
     *     possible object is
     *     {@link String }
     *     
     */
    public String getSFundCode() {
        return sFundCode;
    }

    /**
     * Sets the value of the sFundCode property.
     * 
     * @param value
     *     allowed object is
     *     {@link String }
     *     
     */
    public void setSFundCode(String value) {
        this.sFundCode = value;
    }

    /**
     * Gets the value of the sBrchCode property.
     * 
     * @return
     *     possible object is
     *     {@link String }
     *     
     */
    public String getSBrchCode() {
        return sBrchCode;
    }

    /**
     * Sets the value of the sBrchCode property.
     * 
     * @param value
     *     allowed object is
     *     {@link String }
     *     
     */
    public void setSBrchCode(String value) {
        this.sBrchCode = value;
    }

}
