
package ir.tamin.incomeBank.ws.soap;

import javax.xml.bind.annotation.XmlAccessType;
import javax.xml.bind.annotation.XmlAccessorType;
import javax.xml.bind.annotation.XmlElement;
import javax.xml.bind.annotation.XmlType;


/**
 * <p>Java class for foxDtil9220 complex type.
 * 
 * <p>The following schema fragment specifies the expected content contained within this class.
 * 
 * <pre>
 * &lt;complexType name="foxDtil9220">
 *   &lt;complexContent>
 *     &lt;restriction base="{http://www.w3.org/2001/XMLSchema}anyType">
 *       &lt;sequence>
 *         &lt;element name="desc" type="{http://www.w3.org/2001/XMLSchema}string" minOccurs="0"/>
 *         &lt;element name="bed" type="{http://www.w3.org/2001/XMLSchema}long"/>
 *         &lt;element name="bes" type="{http://www.w3.org/2001/XMLSchema}long"/>
 *         &lt;element name="hesab" type="{http://www.w3.org/2001/XMLSchema}string" minOccurs="0"/>
 *         &lt;element name="serialno" type="{http://www.w3.org/2001/XMLSchema}string" minOccurs="0"/>
 *         &lt;element name="desc1" type="{http://www.w3.org/2001/XMLSchema}string" minOccurs="0"/>
 *         &lt;element name="desc2" type="{http://www.w3.org/2001/XMLSchema}string" minOccurs="0"/>
 *         &lt;element name="atrib_no" type="{http://www.w3.org/2001/XMLSchema}string" minOccurs="0"/>
 *         &lt;element name="cheq_no" type="{http://www.w3.org/2001/XMLSchema}string" minOccurs="0"/>
 *         &lt;element name="cheq_date" type="{http://www.w3.org/2001/XMLSchema}string" minOccurs="0"/>
 *         &lt;element name="cod_amar" type="{http://www.w3.org/2001/XMLSchema}string" minOccurs="0"/>
 *       &lt;/sequence>
 *     &lt;/restriction>
 *   &lt;/complexContent>
 * &lt;/complexType>
 * </pre>
 * 
 * 
 */
@XmlAccessorType(XmlAccessType.FIELD)
@XmlType(name = "foxDtil9220", propOrder = {
    "desc",
    "bed",
    "bes",
    "hesab",
    "serialno",
    "desc1",
    "desc2",
    "atribNo",
    "cheqNo",
    "cheqDate",
    "codAmar"
})
public class FoxDtil9220 {

    protected String desc;
    protected long bed;
    protected long bes;
    protected String hesab;
    protected String serialno;
    protected String desc1;
    protected String desc2;
    @XmlElement(name = "atrib_no")
    protected String atribNo;
    @XmlElement(name = "cheq_no")
    protected String cheqNo;
    @XmlElement(name = "cheq_date")
    protected String cheqDate;
    @XmlElement(name = "cod_amar")
    protected String codAmar;

    /**
     * Gets the value of the desc property.
     * 
     * @return
     *     possible object is
     *     {@link String }
     *     
     */
    public String getDesc() {
        return desc;
    }

    /**
     * Sets the value of the desc property.
     * 
     * @param value
     *     allowed object is
     *     {@link String }
     *     
     */
    public void setDesc(String value) {
        this.desc = value;
    }

    /**
     * Gets the value of the bed property.
     * 
     */
    public long getBed() {
        return bed;
    }

    /**
     * Sets the value of the bed property.
     * 
     */
    public void setBed(long value) {
        this.bed = value;
    }

    /**
     * Gets the value of the bes property.
     * 
     */
    public long getBes() {
        return bes;
    }

    /**
     * Sets the value of the bes property.
     * 
     */
    public void setBes(long value) {
        this.bes = value;
    }

    /**
     * Gets the value of the hesab property.
     * 
     * @return
     *     possible object is
     *     {@link String }
     *     
     */
    public String getHesab() {
        return hesab;
    }

    /**
     * Sets the value of the hesab property.
     * 
     * @param value
     *     allowed object is
     *     {@link String }
     *     
     */
    public void setHesab(String value) {
        this.hesab = value;
    }

    /**
     * Gets the value of the serialno property.
     * 
     * @return
     *     possible object is
     *     {@link String }
     *     
     */
    public String getSerialno() {
        return serialno;
    }

    /**
     * Sets the value of the serialno property.
     * 
     * @param value
     *     allowed object is
     *     {@link String }
     *     
     */
    public void setSerialno(String value) {
        this.serialno = value;
    }

    /**
     * Gets the value of the desc1 property.
     * 
     * @return
     *     possible object is
     *     {@link String }
     *     
     */
    public String getDesc1() {
        return desc1;
    }

    /**
     * Sets the value of the desc1 property.
     * 
     * @param value
     *     allowed object is
     *     {@link String }
     *     
     */
    public void setDesc1(String value) {
        this.desc1 = value;
    }

    /**
     * Gets the value of the desc2 property.
     * 
     * @return
     *     possible object is
     *     {@link String }
     *     
     */
    public String getDesc2() {
        return desc2;
    }

    /**
     * Sets the value of the desc2 property.
     * 
     * @param value
     *     allowed object is
     *     {@link String }
     *     
     */
    public void setDesc2(String value) {
        this.desc2 = value;
    }

    /**
     * Gets the value of the atribNo property.
     * 
     * @return
     *     possible object is
     *     {@link String }
     *     
     */
    public String getAtribNo() {
        return atribNo;
    }

    /**
     * Sets the value of the atribNo property.
     * 
     * @param value
     *     allowed object is
     *     {@link String }
     *     
     */
    public void setAtribNo(String value) {
        this.atribNo = value;
    }

    /**
     * Gets the value of the cheqNo property.
     * 
     * @return
     *     possible object is
     *     {@link String }
     *     
     */
    public String getCheqNo() {
        return cheqNo;
    }

    /**
     * Sets the value of the cheqNo property.
     * 
     * @param value
     *     allowed object is
     *     {@link String }
     *     
     */
    public void setCheqNo(String value) {
        this.cheqNo = value;
    }

    /**
     * Gets the value of the cheqDate property.
     * 
     * @return
     *     possible object is
     *     {@link String }
     *     
     */
    public String getCheqDate() {
        return cheqDate;
    }

    /**
     * Sets the value of the cheqDate property.
     * 
     * @param value
     *     allowed object is
     *     {@link String }
     *     
     */
    public void setCheqDate(String value) {
        this.cheqDate = value;
    }

    /**
     * Gets the value of the codAmar property.
     * 
     * @return
     *     possible object is
     *     {@link String }
     *     
     */
    public String getCodAmar() {
        return codAmar;
    }

    /**
     * Sets the value of the codAmar property.
     * 
     * @param value
     *     allowed object is
     *     {@link String }
     *     
     */
    public void setCodAmar(String value) {
        this.codAmar = value;
    }

}
