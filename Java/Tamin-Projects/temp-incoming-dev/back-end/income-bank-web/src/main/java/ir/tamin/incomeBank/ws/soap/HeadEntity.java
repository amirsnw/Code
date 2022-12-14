
package ir.tamin.incomeBank.ws.soap;

import ir.tamin.incomeBank.model.financialDoc.ElmHeader;

import javax.xml.bind.annotation.XmlAccessType;
import javax.xml.bind.annotation.XmlAccessorType;
import javax.xml.bind.annotation.XmlElement;
import javax.xml.bind.annotation.XmlType;


/**
 * <p>Java class for HeadEntity complex type.
 * 
 * <p>The following schema fragment specifies the expected content contained within this class.
 * 
 * <pre>
 * &lt;complexType name="HeadEntity">
 *   &lt;complexContent>
 *     &lt;restriction base="{http://www.w3.org/2001/XMLSchema}anyType">
 *       &lt;sequence>
 *         &lt;element name="VAHEDCODE" type="{http://www.w3.org/2001/XMLSchema}string" minOccurs="0"/>
 *         &lt;element name="FADATE" type="{http://www.w3.org/2001/XMLSchema}string" minOccurs="0"/>
 *         &lt;element name="DETAIL_DESC" type="{http://www.w3.org/2001/XMLSchema}string" minOccurs="0"/>
 *         &lt;element name="SYS_TYPE" type="{http://www.w3.org/2001/XMLSchema}string" minOccurs="0"/>
 *         &lt;element name="YEAR" type="{http://www.w3.org/2001/XMLSchema}string" minOccurs="0"/>
 *       &lt;/sequence>
 *     &lt;/restriction>
 *   &lt;/complexContent>
 * &lt;/complexType>
 * </pre>
 * 
 * 
 */
@XmlAccessorType(XmlAccessType.FIELD)
@XmlType(name = "HeadEntity", propOrder = {
    "vahedCode",
    "faDate",
    "detailDesc",
    "sysType",
    "year"
})
public class HeadEntity {

    @XmlElement(name = "VAHEDCODE")
    protected String vahedCode;
    @XmlElement(name = "FADATE")
    protected String faDate;
    @XmlElement(name = "DETAIL_DESC")
    protected String detailDesc;
    @XmlElement(name = "SYS_TYPE")
    protected String sysType;
    @XmlElement(name = "YEAR")
    protected String year;

    public HeadEntity() {
    }

    public HeadEntity(ElmHeader elmHeader) {
        this.vahedCode = elmHeader.getVahedCode();
        this.faDate = elmHeader.getFaDate();
        this.detailDesc = elmHeader.getDetailDesc();
        this.sysType = elmHeader.getSysType();
        this.year = elmHeader.getYear();
    }

    /**
     * Gets the value of the vahedcode property.
     * 
     * @return
     *     possible object is
     *     {@link String }
     *     
     */
    public String getVahedCode() {
        return vahedCode;
    }

    /**
     * Sets the value of the vahedcode property.
     * 
     * @param value
     *     allowed object is
     *     {@link String }
     *     
     */
    public void setVahedCode(String value) {
        this.vahedCode = value;
    }

    /**
     * Gets the value of the fadate property.
     * 
     * @return
     *     possible object is
     *     {@link String }
     *     
     */
    public String getFaDate() {
        return faDate;
    }

    /**
     * Sets the value of the fadate property.
     * 
     * @param value
     *     allowed object is
     *     {@link String }
     *     
     */
    public void setFaDate(String value) {
        this.faDate = value;
    }

    /**
     * Gets the value of the detaildesc property.
     * 
     * @return
     *     possible object is
     *     {@link String }
     *     
     */
    public String getDetailDesc() {
        return detailDesc;
    }

    /**
     * Sets the value of the detaildesc property.
     * 
     * @param value
     *     allowed object is
     *     {@link String }
     *     
     */
    public void setDetailDesc(String value) {
        this.detailDesc = value;
    }

    /**
     * Gets the value of the systype property.
     * 
     * @return
     *     possible object is
     *     {@link String }
     *     
     */
    public String getSysType() {
        return sysType;
    }

    /**
     * Sets the value of the systype property.
     * 
     * @param value
     *     allowed object is
     *     {@link String }
     *     
     */
    public void setSysType(String value) {
        this.sysType = value;
    }

    /**
     * Gets the value of the year property.
     * 
     * @return
     *     possible object is
     *     {@link String }
     *     
     */
    public String getYear() {
        return year;
    }

    /**
     * Sets the value of the year property.
     * 
     * @param value
     *     allowed object is
     *     {@link String }
     *     
     */
    public void setyear(String value) {
        this.year = value;
    }

}
