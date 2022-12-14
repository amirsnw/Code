
package ir.tamin.incomeBank.ws.soap;

import javax.xml.bind.annotation.XmlAccessType;
import javax.xml.bind.annotation.XmlAccessorType;
import javax.xml.bind.annotation.XmlElement;
import javax.xml.bind.annotation.XmlType;


/**
 * <p>Java class for foxAmarPar complex type.
 * 
 * <p>The following schema fragment specifies the expected content contained within this class.
 * 
 * <pre>
 * &lt;complexType name="foxAmarPar">
 *   &lt;complexContent>
 *     &lt;restriction base="{http://www.w3.org/2001/XMLSchema}anyType">
 *       &lt;sequence>
 *         &lt;element name="grp_code" type="{http://www.w3.org/2001/XMLSchema}string" minOccurs="0"/>
 *         &lt;element name="titl_code" type="{http://www.w3.org/2001/XMLSchema}string" minOccurs="0"/>
 *         &lt;element name="des" type="{http://www.w3.org/2001/XMLSchema}string" minOccurs="0"/>
 *         &lt;element name="type" type="{http://www.w3.org/2001/XMLSchema}string" minOccurs="0"/>
 *         &lt;element name="len" type="{http://www.w3.org/2001/XMLSchema}long"/>
 *         &lt;element name="formul" type="{http://www.w3.org/2001/XMLSchema}string" minOccurs="0"/>
 *         &lt;element name="sumflag" type="{http://www.w3.org/2001/XMLSchema}string" minOccurs="0"/>
 *         &lt;element name="fixed" type="{http://www.w3.org/2001/XMLSchema}string" minOccurs="0"/>
 *       &lt;/sequence>
 *     &lt;/restriction>
 *   &lt;/complexContent>
 * &lt;/complexType>
 * </pre>
 * 
 * 
 */
@XmlAccessorType(XmlAccessType.FIELD)
@XmlType(name = "foxAmarPar", propOrder = {
    "grpCode",
    "titlCode",
    "des",
    "type",
    "len",
    "formul",
    "sumflag",
    "fixed"
})
public class FoxAmarPar {

    @XmlElement(name = "grp_code")
    protected String grpCode;
    @XmlElement(name = "titl_code")
    protected String titlCode;
    protected String des;
    protected String type;
    protected long len;
    protected String formul;
    protected String sumflag;
    protected String fixed;

    /**
     * Gets the value of the grpCode property.
     * 
     * @return
     *     possible object is
     *     {@link String }
     *     
     */
    public String getGrpCode() {
        return grpCode;
    }

    /**
     * Sets the value of the grpCode property.
     * 
     * @param value
     *     allowed object is
     *     {@link String }
     *     
     */
    public void setGrpCode(String value) {
        this.grpCode = value;
    }

    /**
     * Gets the value of the titlCode property.
     * 
     * @return
     *     possible object is
     *     {@link String }
     *     
     */
    public String getTitlCode() {
        return titlCode;
    }

    /**
     * Sets the value of the titlCode property.
     * 
     * @param value
     *     allowed object is
     *     {@link String }
     *     
     */
    public void setTitlCode(String value) {
        this.titlCode = value;
    }

    /**
     * Gets the value of the des property.
     * 
     * @return
     *     possible object is
     *     {@link String }
     *     
     */
    public String getDes() {
        return des;
    }

    /**
     * Sets the value of the des property.
     * 
     * @param value
     *     allowed object is
     *     {@link String }
     *     
     */
    public void setDes(String value) {
        this.des = value;
    }

    /**
     * Gets the value of the type property.
     * 
     * @return
     *     possible object is
     *     {@link String }
     *     
     */
    public String getType() {
        return type;
    }

    /**
     * Sets the value of the type property.
     * 
     * @param value
     *     allowed object is
     *     {@link String }
     *     
     */
    public void setType(String value) {
        this.type = value;
    }

    /**
     * Gets the value of the len property.
     * 
     */
    public long getLen() {
        return len;
    }

    /**
     * Sets the value of the len property.
     * 
     */
    public void setLen(long value) {
        this.len = value;
    }

    /**
     * Gets the value of the formul property.
     * 
     * @return
     *     possible object is
     *     {@link String }
     *     
     */
    public String getFormul() {
        return formul;
    }

    /**
     * Sets the value of the formul property.
     * 
     * @param value
     *     allowed object is
     *     {@link String }
     *     
     */
    public void setFormul(String value) {
        this.formul = value;
    }

    /**
     * Gets the value of the sumflag property.
     * 
     * @return
     *     possible object is
     *     {@link String }
     *     
     */
    public String getSumflag() {
        return sumflag;
    }

    /**
     * Sets the value of the sumflag property.
     * 
     * @param value
     *     allowed object is
     *     {@link String }
     *     
     */
    public void setSumflag(String value) {
        this.sumflag = value;
    }

    /**
     * Gets the value of the fixed property.
     * 
     * @return
     *     possible object is
     *     {@link String }
     *     
     */
    public String getFixed() {
        return fixed;
    }

    /**
     * Sets the value of the fixed property.
     * 
     * @param value
     *     allowed object is
     *     {@link String }
     *     
     */
    public void setFixed(String value) {
        this.fixed = value;
    }

}
