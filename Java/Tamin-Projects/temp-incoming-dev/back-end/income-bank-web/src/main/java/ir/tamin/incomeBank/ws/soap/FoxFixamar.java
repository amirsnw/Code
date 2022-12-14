
package ir.tamin.incomeBank.ws.soap;

import javax.xml.bind.annotation.XmlAccessType;
import javax.xml.bind.annotation.XmlAccessorType;
import javax.xml.bind.annotation.XmlElement;
import javax.xml.bind.annotation.XmlType;


/**
 * <p>Java class for foxFixamar complex type.
 * 
 * <p>The following schema fragment specifies the expected content contained within this class.
 * 
 * <pre>
 * &lt;complexType name="foxFixamar">
 *   &lt;complexContent>
 *     &lt;restriction base="{http://www.w3.org/2001/XMLSchema}anyType">
 *       &lt;sequence>
 *         &lt;element name="amou_amar" type="{http://www.w3.org/2001/XMLSchema}string" minOccurs="0"/>
 *         &lt;element name="subgrp" type="{http://www.w3.org/2001/XMLSchema}string" minOccurs="0"/>
 *         &lt;element name="grp" type="{http://www.w3.org/2001/XMLSchema}string" minOccurs="0"/>
 *         &lt;element name="serial" type="{http://www.w3.org/2001/XMLSchema}long"/>
 *       &lt;/sequence>
 *     &lt;/restriction>
 *   &lt;/complexContent>
 * &lt;/complexType>
 * </pre>
 * 
 * 
 */
@XmlAccessorType(XmlAccessType.FIELD)
@XmlType(name = "foxFixamar", propOrder = {
    "amouAmar",
    "subgrp",
    "grp",
    "serial"
})
public class FoxFixamar {

    @XmlElement(name = "amou_amar")
    protected String amouAmar;
    protected String subgrp;
    protected String grp;
    protected long serial;

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

}
