
package ir.tamin.incomeBank.ws.soap;

import javax.xml.bind.annotation.XmlAccessType;
import javax.xml.bind.annotation.XmlAccessorType;
import javax.xml.bind.annotation.XmlElement;
import javax.xml.bind.annotation.XmlType;


/**
 * <p>Java class for foxHesf5550 complex type.
 * 
 * <p>The following schema fragment specifies the expected content contained within this class.
 * 
 * <pre>
 * &lt;complexType name="foxHesf5550">
 *   &lt;complexContent>
 *     &lt;restriction base="{http://www.w3.org/2001/XMLSchema}anyType">
 *       &lt;sequence>
 *         &lt;element name="cod_hes" type="{http://www.w3.org/2001/XMLSchema}string" minOccurs="0"/>
 *         &lt;element name="des_hes" type="{http://www.w3.org/2001/XMLSchema}string" minOccurs="0"/>
 *         &lt;element name="no_doc" type="{http://www.w3.org/2001/XMLSchema}string" minOccurs="0"/>
 *         &lt;element name="date_doc" type="{http://www.w3.org/2001/XMLSchema}string" minOccurs="0"/>
 *         &lt;element name="cod_kol" type="{http://www.w3.org/2001/XMLSchema}string" minOccurs="0"/>
 *         &lt;element name="cod_moi" type="{http://www.w3.org/2001/XMLSchema}string" minOccurs="0"/>
 *         &lt;element name="cod_taf" type="{http://www.w3.org/2001/XMLSchema}string" minOccurs="0"/>
 *         &lt;element name="kind_mad" type="{http://www.w3.org/2001/XMLSchema}string" minOccurs="0"/>
 *         &lt;element name="no_mad" type="{http://www.w3.org/2001/XMLSchema}string" minOccurs="0"/>
 *         &lt;element name="desc_doc" type="{http://www.w3.org/2001/XMLSchema}string" minOccurs="0"/>
 *         &lt;element name="amou_bed" type="{http://www.w3.org/2001/XMLSchema}long"/>
 *         &lt;element name="amou_bes" type="{http://www.w3.org/2001/XMLSchema}long"/>
 *         &lt;element name="cod_haz" type="{http://www.w3.org/2001/XMLSchema}string" minOccurs="0"/>
 *         &lt;element name="confrm_doc" type="{http://www.w3.org/2001/XMLSchema}string" minOccurs="0"/>
 *         &lt;element name="date_rsid" type="{http://www.w3.org/2001/XMLSchema}string" minOccurs="0"/>
 *         &lt;element name="amount_" type="{http://www.w3.org/2001/XMLSchema}long"/>
 *         &lt;element name="who" type="{http://www.w3.org/2001/XMLSchema}string" minOccurs="0"/>
 *         &lt;element name="cheq_no" type="{http://www.w3.org/2001/XMLSchema}string" minOccurs="0"/>
 *         &lt;element name="cheq_date" type="{http://www.w3.org/2001/XMLSchema}string" minOccurs="0"/>
 *       &lt;/sequence>
 *     &lt;/restriction>
 *   &lt;/complexContent>
 * &lt;/complexType>
 * </pre>
 * 
 * 
 */
@XmlAccessorType(XmlAccessType.FIELD)
@XmlType(name = "foxHesf5550", propOrder = {
    "codHes",
    "desHes",
    "noDoc",
    "dateDoc",
    "codKol",
    "codMoi",
    "codTaf",
    "kindMad",
    "noMad",
    "descDoc",
    "amouBed",
    "amouBes",
    "codHaz",
    "confrmDoc",
    "dateRsid",
    "amount",
    "who",
    "cheqNo",
    "cheqDate"
})
public class FoxHesf5550 {

    @XmlElement(name = "cod_hes")
    protected String codHes;
    @XmlElement(name = "des_hes")
    protected String desHes;
    @XmlElement(name = "no_doc")
    protected String noDoc;
    @XmlElement(name = "date_doc")
    protected String dateDoc;
    @XmlElement(name = "cod_kol")
    protected String codKol;
    @XmlElement(name = "cod_moi")
    protected String codMoi;
    @XmlElement(name = "cod_taf")
    protected String codTaf;
    @XmlElement(name = "kind_mad")
    protected String kindMad;
    @XmlElement(name = "no_mad")
    protected String noMad;
    @XmlElement(name = "desc_doc")
    protected String descDoc;
    @XmlElement(name = "amou_bed")
    protected long amouBed;
    @XmlElement(name = "amou_bes")
    protected long amouBes;
    @XmlElement(name = "cod_haz")
    protected String codHaz;
    @XmlElement(name = "confrm_doc")
    protected String confrmDoc;
    @XmlElement(name = "date_rsid")
    protected String dateRsid;
    @XmlElement(name = "amount_")
    protected long amount;
    protected String who;
    @XmlElement(name = "cheq_no")
    protected String cheqNo;
    @XmlElement(name = "cheq_date")
    protected String cheqDate;

    /**
     * Gets the value of the codHes property.
     * 
     * @return
     *     possible object is
     *     {@link String }
     *     
     */
    public String getCodHes() {
        return codHes;
    }

    /**
     * Sets the value of the codHes property.
     * 
     * @param value
     *     allowed object is
     *     {@link String }
     *     
     */
    public void setCodHes(String value) {
        this.codHes = value;
    }

    /**
     * Gets the value of the desHes property.
     * 
     * @return
     *     possible object is
     *     {@link String }
     *     
     */
    public String getDesHes() {
        return desHes;
    }

    /**
     * Sets the value of the desHes property.
     * 
     * @param value
     *     allowed object is
     *     {@link String }
     *     
     */
    public void setDesHes(String value) {
        this.desHes = value;
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
     * Gets the value of the dateDoc property.
     * 
     * @return
     *     possible object is
     *     {@link String }
     *     
     */
    public String getDateDoc() {
        return dateDoc;
    }

    /**
     * Sets the value of the dateDoc property.
     * 
     * @param value
     *     allowed object is
     *     {@link String }
     *     
     */
    public void setDateDoc(String value) {
        this.dateDoc = value;
    }

    /**
     * Gets the value of the codKol property.
     * 
     * @return
     *     possible object is
     *     {@link String }
     *     
     */
    public String getCodKol() {
        return codKol;
    }

    /**
     * Sets the value of the codKol property.
     * 
     * @param value
     *     allowed object is
     *     {@link String }
     *     
     */
    public void setCodKol(String value) {
        this.codKol = value;
    }

    /**
     * Gets the value of the codMoi property.
     * 
     * @return
     *     possible object is
     *     {@link String }
     *     
     */
    public String getCodMoi() {
        return codMoi;
    }

    /**
     * Sets the value of the codMoi property.
     * 
     * @param value
     *     allowed object is
     *     {@link String }
     *     
     */
    public void setCodMoi(String value) {
        this.codMoi = value;
    }

    /**
     * Gets the value of the codTaf property.
     * 
     * @return
     *     possible object is
     *     {@link String }
     *     
     */
    public String getCodTaf() {
        return codTaf;
    }

    /**
     * Sets the value of the codTaf property.
     * 
     * @param value
     *     allowed object is
     *     {@link String }
     *     
     */
    public void setCodTaf(String value) {
        this.codTaf = value;
    }

    /**
     * Gets the value of the kindMad property.
     * 
     * @return
     *     possible object is
     *     {@link String }
     *     
     */
    public String getKindMad() {
        return kindMad;
    }

    /**
     * Sets the value of the kindMad property.
     * 
     * @param value
     *     allowed object is
     *     {@link String }
     *     
     */
    public void setKindMad(String value) {
        this.kindMad = value;
    }

    /**
     * Gets the value of the noMad property.
     * 
     * @return
     *     possible object is
     *     {@link String }
     *     
     */
    public String getNoMad() {
        return noMad;
    }

    /**
     * Sets the value of the noMad property.
     * 
     * @param value
     *     allowed object is
     *     {@link String }
     *     
     */
    public void setNoMad(String value) {
        this.noMad = value;
    }

    /**
     * Gets the value of the descDoc property.
     * 
     * @return
     *     possible object is
     *     {@link String }
     *     
     */
    public String getDescDoc() {
        return descDoc;
    }

    /**
     * Sets the value of the descDoc property.
     * 
     * @param value
     *     allowed object is
     *     {@link String }
     *     
     */
    public void setDescDoc(String value) {
        this.descDoc = value;
    }

    /**
     * Gets the value of the amouBed property.
     * 
     */
    public long getAmouBed() {
        return amouBed;
    }

    /**
     * Sets the value of the amouBed property.
     * 
     */
    public void setAmouBed(long value) {
        this.amouBed = value;
    }

    /**
     * Gets the value of the amouBes property.
     * 
     */
    public long getAmouBes() {
        return amouBes;
    }

    /**
     * Sets the value of the amouBes property.
     * 
     */
    public void setAmouBes(long value) {
        this.amouBes = value;
    }

    /**
     * Gets the value of the codHaz property.
     * 
     * @return
     *     possible object is
     *     {@link String }
     *     
     */
    public String getCodHaz() {
        return codHaz;
    }

    /**
     * Sets the value of the codHaz property.
     * 
     * @param value
     *     allowed object is
     *     {@link String }
     *     
     */
    public void setCodHaz(String value) {
        this.codHaz = value;
    }

    /**
     * Gets the value of the confrmDoc property.
     * 
     * @return
     *     possible object is
     *     {@link String }
     *     
     */
    public String getConfrmDoc() {
        return confrmDoc;
    }

    /**
     * Sets the value of the confrmDoc property.
     * 
     * @param value
     *     allowed object is
     *     {@link String }
     *     
     */
    public void setConfrmDoc(String value) {
        this.confrmDoc = value;
    }

    /**
     * Gets the value of the dateRsid property.
     * 
     * @return
     *     possible object is
     *     {@link String }
     *     
     */
    public String getDateRsid() {
        return dateRsid;
    }

    /**
     * Sets the value of the dateRsid property.
     * 
     * @param value
     *     allowed object is
     *     {@link String }
     *     
     */
    public void setDateRsid(String value) {
        this.dateRsid = value;
    }

    /**
     * Gets the value of the amount property.
     * 
     */
    public long getAmount() {
        return amount;
    }

    /**
     * Sets the value of the amount property.
     * 
     */
    public void setAmount(long value) {
        this.amount = value;
    }

    /**
     * Gets the value of the who property.
     * 
     * @return
     *     possible object is
     *     {@link String }
     *     
     */
    public String getWho() {
        return who;
    }

    /**
     * Sets the value of the who property.
     * 
     * @param value
     *     allowed object is
     *     {@link String }
     *     
     */
    public void setWho(String value) {
        this.who = value;
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

}
