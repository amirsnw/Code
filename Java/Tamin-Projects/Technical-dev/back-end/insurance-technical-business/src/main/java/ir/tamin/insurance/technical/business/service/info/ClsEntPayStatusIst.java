
package ir.tamin.insurance.technical.business.service.info;

import javax.xml.bind.annotation.XmlAccessType;
import javax.xml.bind.annotation.XmlAccessorType;
import javax.xml.bind.annotation.XmlElement;
import javax.xml.bind.annotation.XmlType;


/**
 * <p>Java class for clsEnt_PayStatus_Ist complex type.
 * 
 * <p>The following schema fragment specifies the expected content contained within this class.
 * 
 * <pre>
 * &lt;complexType name="clsEnt_PayStatus_Ist">
 *   &lt;complexContent>
 *     &lt;restriction base="{http://www.w3.org/2001/XMLSchema}anyType">
 *       &lt;sequence>
 *         &lt;element name="dtn_amount" type="{http://www.w3.org/2001/XMLSchema}int"/>
 *         &lt;element name="new_paydate" type="{http://www.w3.org/2001/XMLSchema}string" minOccurs="0"/>
 *         &lt;element name="entreqno" type="{http://www.w3.org/2001/XMLSchema}string" minOccurs="0"/>
 *         &lt;element name="entreqdate" type="{http://www.w3.org/2001/XMLSchema}string" minOccurs="0"/>
 *         &lt;element name="ist_reqdate" type="{http://www.w3.org/2001/XMLSchema}string" minOccurs="0"/>
 *         &lt;element name="debitsubcode" type="{http://www.w3.org/2001/XMLSchema}string" minOccurs="0"/>
 *         &lt;element name="ord_ordno" type="{http://www.w3.org/2001/XMLSchema}string" minOccurs="0"/>
 *         &lt;element name="ord_docdat" type="{http://www.w3.org/2001/XMLSchema}string" minOccurs="0"/>
 *         &lt;element name="dtn_expdat" type="{http://www.w3.org/2001/XMLSchema}string" minOccurs="0"/>
 *         &lt;element name="paydate" type="{http://www.w3.org/2001/XMLSchema}string" minOccurs="0"/>
 *         &lt;element name="cws_dbtno" type="{http://www.w3.org/2001/XMLSchema}string" minOccurs="0"/>
 *         &lt;element name="outpay" type="{http://www.w3.org/2001/XMLSchema}string" minOccurs="0"/>
 *         &lt;element name="unpay" type="{http://www.w3.org/2001/XMLSchema}string" minOccurs="0"/>
 *         &lt;element name="inpay" type="{http://www.w3.org/2001/XMLSchema}string" minOccurs="0"/>
 *         &lt;element name="new_outpay" type="{http://www.w3.org/2001/XMLSchema}string" minOccurs="0"/>
 *         &lt;element name="new_nopay" type="{http://www.w3.org/2001/XMLSchema}string" minOccurs="0"/>
 *         &lt;element name="rec_type" type="{http://www.w3.org/2001/XMLSchema}string" minOccurs="0"/>
 *       &lt;/sequence>
 *     &lt;/restriction>
 *   &lt;/complexContent>
 * &lt;/complexType>
 * </pre>
 * 
 * 
 */
@XmlAccessorType(XmlAccessType.FIELD)
@XmlType(name = "clsEnt_PayStatus_Ist", propOrder = {
    "dtnAmount",
    "newPaydate",
    "entreqno",
    "entreqdate",
    "istReqdate",
    "debitsubcode",
    "ordOrdno",
    "ordDocdat",
    "dtnExpdat",
    "paydate",
    "cwsDbtno",
    "outpay",
    "unpay",
    "inpay",
    "newOutpay",
    "newNopay",
    "recType"
})
public class ClsEntPayStatusIst {

    @XmlElement(name = "dtn_amount")
    protected int dtnAmount;
    @XmlElement(name = "new_paydate")
    protected String newPaydate;
    protected String entreqno;
    protected String entreqdate;
    @XmlElement(name = "ist_reqdate")
    protected String istReqdate;
    protected String debitsubcode;
    @XmlElement(name = "ord_ordno")
    protected String ordOrdno;
    @XmlElement(name = "ord_docdat")
    protected String ordDocdat;
    @XmlElement(name = "dtn_expdat")
    protected String dtnExpdat;
    protected String paydate;
    @XmlElement(name = "cws_dbtno")
    protected String cwsDbtno;
    protected String outpay;
    protected String unpay;
    protected String inpay;
    @XmlElement(name = "new_outpay")
    protected String newOutpay;
    @XmlElement(name = "new_nopay")
    protected String newNopay;
    @XmlElement(name = "rec_type")
    protected String recType;

    /**
     * Gets the value of the dtnAmount property.
     * 
     */
    public int getDtnAmount() {
        return dtnAmount;
    }

    /**
     * Sets the value of the dtnAmount property.
     * 
     */
    public void setDtnAmount(int value) {
        this.dtnAmount = value;
    }

    /**
     * Gets the value of the newPaydate property.
     * 
     * @return
     *     possible object is
     *     {@link String }
     *     
     */
    public String getNewPaydate() {
        return newPaydate;
    }

    /**
     * Sets the value of the newPaydate property.
     * 
     * @param value
     *     allowed object is
     *     {@link String }
     *     
     */
    public void setNewPaydate(String value) {
        this.newPaydate = value;
    }

    /**
     * Gets the value of the entreqno property.
     * 
     * @return
     *     possible object is
     *     {@link String }
     *     
     */
    public String getEntreqno() {
        return entreqno;
    }

    /**
     * Sets the value of the entreqno property.
     * 
     * @param value
     *     allowed object is
     *     {@link String }
     *     
     */
    public void setEntreqno(String value) {
        this.entreqno = value;
    }

    /**
     * Gets the value of the entreqdate property.
     * 
     * @return
     *     possible object is
     *     {@link String }
     *     
     */
    public String getEntreqdate() {
        return entreqdate;
    }

    /**
     * Sets the value of the entreqdate property.
     * 
     * @param value
     *     allowed object is
     *     {@link String }
     *     
     */
    public void setEntreqdate(String value) {
        this.entreqdate = value;
    }

    /**
     * Gets the value of the istReqdate property.
     * 
     * @return
     *     possible object is
     *     {@link String }
     *     
     */
    public String getIstReqdate() {
        return istReqdate;
    }

    /**
     * Sets the value of the istReqdate property.
     * 
     * @param value
     *     allowed object is
     *     {@link String }
     *     
     */
    public void setIstReqdate(String value) {
        this.istReqdate = value;
    }

    /**
     * Gets the value of the debitsubcode property.
     * 
     * @return
     *     possible object is
     *     {@link String }
     *     
     */
    public String getDebitsubcode() {
        return debitsubcode;
    }

    /**
     * Sets the value of the debitsubcode property.
     * 
     * @param value
     *     allowed object is
     *     {@link String }
     *     
     */
    public void setDebitsubcode(String value) {
        this.debitsubcode = value;
    }

    /**
     * Gets the value of the ordOrdno property.
     * 
     * @return
     *     possible object is
     *     {@link String }
     *     
     */
    public String getOrdOrdno() {
        return ordOrdno;
    }

    /**
     * Sets the value of the ordOrdno property.
     * 
     * @param value
     *     allowed object is
     *     {@link String }
     *     
     */
    public void setOrdOrdno(String value) {
        this.ordOrdno = value;
    }

    /**
     * Gets the value of the ordDocdat property.
     * 
     * @return
     *     possible object is
     *     {@link String }
     *     
     */
    public String getOrdDocdat() {
        return ordDocdat;
    }

    /**
     * Sets the value of the ordDocdat property.
     * 
     * @param value
     *     allowed object is
     *     {@link String }
     *     
     */
    public void setOrdDocdat(String value) {
        this.ordDocdat = value;
    }

    /**
     * Gets the value of the dtnExpdat property.
     * 
     * @return
     *     possible object is
     *     {@link String }
     *     
     */
    public String getDtnExpdat() {
        return dtnExpdat;
    }

    /**
     * Sets the value of the dtnExpdat property.
     * 
     * @param value
     *     allowed object is
     *     {@link String }
     *     
     */
    public void setDtnExpdat(String value) {
        this.dtnExpdat = value;
    }

    /**
     * Gets the value of the paydate property.
     * 
     * @return
     *     possible object is
     *     {@link String }
     *     
     */
    public String getPaydate() {
        return paydate;
    }

    /**
     * Sets the value of the paydate property.
     * 
     * @param value
     *     allowed object is
     *     {@link String }
     *     
     */
    public void setPaydate(String value) {
        this.paydate = value;
    }

    /**
     * Gets the value of the cwsDbtno property.
     * 
     * @return
     *     possible object is
     *     {@link String }
     *     
     */
    public String getCwsDbtno() {
        return cwsDbtno;
    }

    /**
     * Sets the value of the cwsDbtno property.
     * 
     * @param value
     *     allowed object is
     *     {@link String }
     *     
     */
    public void setCwsDbtno(String value) {
        this.cwsDbtno = value;
    }

    /**
     * Gets the value of the outpay property.
     * 
     * @return
     *     possible object is
     *     {@link String }
     *     
     */
    public String getOutpay() {
        return outpay;
    }

    /**
     * Sets the value of the outpay property.
     * 
     * @param value
     *     allowed object is
     *     {@link String }
     *     
     */
    public void setOutpay(String value) {
        this.outpay = value;
    }

    /**
     * Gets the value of the unpay property.
     * 
     * @return
     *     possible object is
     *     {@link String }
     *     
     */
    public String getUnpay() {
        return unpay;
    }

    /**
     * Sets the value of the unpay property.
     * 
     * @param value
     *     allowed object is
     *     {@link String }
     *     
     */
    public void setUnpay(String value) {
        this.unpay = value;
    }

    /**
     * Gets the value of the inpay property.
     * 
     * @return
     *     possible object is
     *     {@link String }
     *     
     */
    public String getInpay() {
        return inpay;
    }

    /**
     * Sets the value of the inpay property.
     * 
     * @param value
     *     allowed object is
     *     {@link String }
     *     
     */
    public void setInpay(String value) {
        this.inpay = value;
    }

    /**
     * Gets the value of the newOutpay property.
     * 
     * @return
     *     possible object is
     *     {@link String }
     *     
     */
    public String getNewOutpay() {
        return newOutpay;
    }

    /**
     * Sets the value of the newOutpay property.
     * 
     * @param value
     *     allowed object is
     *     {@link String }
     *     
     */
    public void setNewOutpay(String value) {
        this.newOutpay = value;
    }

    /**
     * Gets the value of the newNopay property.
     * 
     * @return
     *     possible object is
     *     {@link String }
     *     
     */
    public String getNewNopay() {
        return newNopay;
    }

    /**
     * Sets the value of the newNopay property.
     * 
     * @param value
     *     allowed object is
     *     {@link String }
     *     
     */
    public void setNewNopay(String value) {
        this.newNopay = value;
    }

    /**
     * Gets the value of the recType property.
     * 
     * @return
     *     possible object is
     *     {@link String }
     *     
     */
    public String getRecType() {
        return recType;
    }

    /**
     * Sets the value of the recType property.
     * 
     * @param value
     *     allowed object is
     *     {@link String }
     *     
     */
    public void setRecType(String value) {
        this.recType = value;
    }

}
