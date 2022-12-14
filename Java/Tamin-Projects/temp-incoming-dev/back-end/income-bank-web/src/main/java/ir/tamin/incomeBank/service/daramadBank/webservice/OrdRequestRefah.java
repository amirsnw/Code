
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
 *         &lt;element name="s_AccountNo" type="{http://www.w3.org/2001/XMLSchema}string" minOccurs="0"/>
 *         &lt;element name="s_RowID" type="{http://www.w3.org/2001/XMLSchema}string" minOccurs="0"/>
 *         &lt;element name="s_Dt" type="{http://www.w3.org/2001/XMLSchema}string" minOccurs="0"/>
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
    "sAccountNo",
    "sRowID",
    "sDt"
})
@XmlRootElement(name = "OrdRequest_Refah")
public class OrdRequestRefah {

    @XmlElement(name = "s_AccountNo")
    protected String sAccountNo;
    @XmlElement(name = "s_RowID")
    protected String sRowID;
    @XmlElement(name = "s_Dt")
    protected String sDt;

    /**
     * Gets the value of the sAccountNo property.
     * 
     * @return
     *     possible object is
     *     {@link String }
     *     
     */
    public String getSAccountNo() {
        return sAccountNo;
    }

    /**
     * Sets the value of the sAccountNo property.
     * 
     * @param value
     *     allowed object is
     *     {@link String }
     *     
     */
    public void setSAccountNo(String value) {
        this.sAccountNo = value;
    }

    /**
     * Gets the value of the sRowID property.
     * 
     * @return
     *     possible object is
     *     {@link String }
     *     
     */
    public String getSRowID() {
        return sRowID;
    }

    /**
     * Sets the value of the sRowID property.
     * 
     * @param value
     *     allowed object is
     *     {@link String }
     *     
     */
    public void setSRowID(String value) {
        this.sRowID = value;
    }

    /**
     * Gets the value of the sDt property.
     * 
     * @return
     *     possible object is
     *     {@link String }
     *     
     */
    public String getSDt() {
        return sDt;
    }

    /**
     * Sets the value of the sDt property.
     * 
     * @param value
     *     allowed object is
     *     {@link String }
     *     
     */
    public void setSDt(String value) {
        this.sDt = value;
    }

}
