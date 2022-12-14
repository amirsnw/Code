
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
 *         &lt;element name="Voucher" type="{http://tempuri.org/}AccVoucherEntity" minOccurs="0"/>
 *         &lt;element name="bAutoInsert" type="{http://www.w3.org/2001/XMLSchema}boolean"/>
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
    "voucher",
    "bAutoInsert"
})
@XmlRootElement(name = "SendDataToTemp")
public class SendDataToTemp {

    @XmlElement(name = "Voucher")
    protected AccVoucherEntity voucher;
    protected boolean bAutoInsert;

    /**
     * Gets the value of the voucher property.
     * 
     * @return
     *     possible object is
     *     {@link AccVoucherEntity }
     *     
     */
    public AccVoucherEntity getVoucher() {
        return voucher;
    }

    /**
     * Sets the value of the voucher property.
     * 
     * @param value
     *     allowed object is
     *     {@link AccVoucherEntity }
     *     
     */
    public void setVoucher(AccVoucherEntity value) {
        this.voucher = value;
    }

    /**
     * Gets the value of the bAutoInsert property.
     * 
     */
    public boolean isBAutoInsert() {
        return bAutoInsert;
    }

    /**
     * Sets the value of the bAutoInsert property.
     * 
     */
    public void setBAutoInsert(boolean value) {
        this.bAutoInsert = value;
    }

}
