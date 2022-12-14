
package ir.tamin.incomeBank.ws.soap;

import javax.xml.bind.annotation.XmlAccessType;
import javax.xml.bind.annotation.XmlAccessorType;
import javax.xml.bind.annotation.XmlElement;
import javax.xml.bind.annotation.XmlType;


/**
 * <p>Java class for foxStdtl complex type.
 * 
 * <p>The following schema fragment specifies the expected content contained within this class.
 * 
 * <pre>
 * &lt;complexType name="foxStdtl">
 *   &lt;complexContent>
 *     &lt;restriction base="{http://www.w3.org/2001/XMLSchema}anyType">
 *       &lt;sequence>
 *         &lt;element name="grp" type="{http://www.w3.org/2001/XMLSchema}string" minOccurs="0"/>
 *         &lt;element name="serial" type="{http://www.w3.org/2001/XMLSchema}long"/>
 *         &lt;element name="subgrp" type="{http://www.w3.org/2001/XMLSchema}string" minOccurs="0"/>
 *         &lt;element name="amou_amar" type="{http://www.w3.org/2001/XMLSchema}string" minOccurs="0"/>
 *         &lt;element name="no_doc" type="{http://www.w3.org/2001/XMLSchema}string" minOccurs="0"/>
 *         &lt;element name="docrow" type="{http://www.w3.org/2001/XMLSchema}long"/>
 *       &lt;/sequence>
 *     &lt;/restriction>
 *   &lt;/complexContent>
 * &lt;/complexType>
 * </pre>
 * 
 * 
 */
@XmlAccessorType(XmlAccessType.FIELD)
@XmlType(name = "foxStdtl", propOrder = {
    "grp",
    "serial",
    "subgrp",
    "amouAmar",
    "noDoc",
    "docrow"
})
public class FoxStdtl {

    protected String grp;
    protected long serial;
    protected String subgrp;
    @XmlElement(name = "amou_amar")
    protected String amouAmar;
    @XmlElement(name = "no_doc")
    protected String noDoc;
    protected long docrow;

    /**
     * Gets the value of the grp property.
     * 
     * @return
     *     possible object is
     *     {@link String }
     *     
     */
    public String getGrp() {
        return grp;
    }

    /**
     * Sets the value of the grp property.
     * 
     * @param value
     *     allowed object is
     *     {@link String }
     *     
     */
    public void setGrp(String value) {
        this.grp = value;
    }

    /**
     * Gets the value of the serial property.
     * 
     */
    public long getSerial() {
        return serial;
    }

    /**
     * Sets the value of the serial property.
     * 
     */
    public void setSerial(long value) {
        this.serial = value;
    }

    /**
     * Gets the value of the subgrp property.
     * 
     * @return
     *     possible object is
     *     {@link String }
     *     
     */
    public String getSubgrp() {
        return subgrp;
    }

    /**
     * Sets the value of the subgrp property.
     * 
     * @param value
     *     allowed object is
     *     {@link String }
     *     
     */
    public void setSubgrp(String value) {
        this.subgrp = value;
    }

    /**
     * Gets the value of the amouAmar property.
     * 
     * @return
     *     possible object is
     *     {@link String }
     *     
     */
    public String getAmouAmar() {
        return amouAmar;
    }

    /**
     * Sets the value of the amouAmar property.
     * 
     * @param value
     *     allowed object is
     *     {@link String }
     *     
     */
    public void setAmouAmar(String value) {
        this.amouAmar = value;
    }

    /**
     * Gets the value of the noDoc property.
     * 
     * @return
     *     possible object is
     *     {@link String }
     *     
     */
    public String getNoDoc() {
        return noDoc;
    }

    /**
     * Sets the value of the noDoc property.
     * 
     * @param value
     *     allowed object is
     *     {@link String }
     *     
     */
    public void setNoDoc(String value) {
        this.noDoc = value;
    }

    /**
     * Gets the value of the docrow property.
     * 
     */
    public long getDocrow() {
        return docrow;
    }

    /**
     * Sets the value of the docrow property.
     * 
     */
    public void setDocrow(long value) {
        this.docrow = value;
    }

}
