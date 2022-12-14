
package ir.tamin.incomeBank.ws.soap;

import javax.xml.bind.annotation.XmlAccessType;
import javax.xml.bind.annotation.XmlAccessorType;
import javax.xml.bind.annotation.XmlElement;
import javax.xml.bind.annotation.XmlType;


/**
 * <p>Java class for foxHesf2100 complex type.
 * 
 * <p>The following schema fragment specifies the expected content contained within this class.
 * 
 * <pre>
 * &lt;complexType name="foxHesf2100">
 *   &lt;complexContent>
 *     &lt;restriction base="{http://www.w3.org/2001/XMLSchema}anyType">
 *       &lt;sequence>
 *         &lt;element name="no_doc" type="{http://www.w3.org/2001/XMLSchema}string" minOccurs="0"/>
 *         &lt;element name="date_doc" type="{http://www.w3.org/2001/XMLSchema}string" minOccurs="0"/>
 *         &lt;element name="cod_kol" type="{http://www.w3.org/2001/XMLSchema}string" minOccurs="0"/>
 *         &lt;element name="cod_moi" type="{http://www.w3.org/2001/XMLSchema}string" minOccurs="0"/>
 *         &lt;element name="cod_taf" type="{http://www.w3.org/2001/XMLSchema}string" minOccurs="0"/>
 *         &lt;element name="cod_joz" type="{http://www.w3.org/2001/XMLSchema}string" minOccurs="0"/>
 *         &lt;element name="cod_riz" type="{http://www.w3.org/2001/XMLSchema}string" minOccurs="0"/>
 *         &lt;element name="desc_doc" type="{http://www.w3.org/2001/XMLSchema}string" minOccurs="0"/>
 *         &lt;element name="descdoc2" type="{http://www.w3.org/2001/XMLSchema}string" minOccurs="0"/>
 *         &lt;element name="descdoc3" type="{http://www.w3.org/2001/XMLSchema}string" minOccurs="0"/>
 *         &lt;element name="amou_bed" type="{http://www.w3.org/2001/XMLSchema}long"/>
 *         &lt;element name="amou_bes" type="{http://www.w3.org/2001/XMLSchema}long"/>
 *         &lt;element name="confrm_doc" type="{http://www.w3.org/2001/XMLSchema}string" minOccurs="0"/>
 *         &lt;element name="date_rsid" type="{http://www.w3.org/2001/XMLSchema}string" minOccurs="0"/>
 *         &lt;element name="radif" type="{http://www.w3.org/2001/XMLSchema}long"/>
 *         &lt;element name="who" type="{http://www.w3.org/2001/XMLSchema}string" minOccurs="0"/>
 *         &lt;element name="cheq_no" type="{http://www.w3.org/2001/XMLSchema}string" minOccurs="0"/>
 *         &lt;element name="cheq_date" type="{http://www.w3.org/2001/XMLSchema}string" minOccurs="0"/>
 *         &lt;element name="atrib_no" type="{http://www.w3.org/2001/XMLSchema}string" minOccurs="0"/>
 *         &lt;element name="code_j" type="{http://www.w3.org/2001/XMLSchema}string" minOccurs="0"/>
 *         &lt;element name="code_r" type="{http://www.w3.org/2001/XMLSchema}string" minOccurs="0"/>
 *       &lt;/sequence>
 *     &lt;/restriction>
 *   &lt;/complexContent>
 * &lt;/complexType>
 * </pre>
 * 
 * 
 */
@XmlAccessorType(XmlAccessType.FIELD)
@XmlType(name = "foxHesf2100", propOrder = {
    "noDoc",
    "dateDoc",
    "codKol",
    "codMoi",
    "codTaf",
    "codJoz",
    "codRiz",
    "descDoc",
    "descdoc2",
    "descdoc3",
    "amouBed",
    "amouBes",
    "confrmDoc",
    "dateRsid",
    "radif",
    "who",
    "cheqNo",
    "cheqDate",
    "atribNo",
    "codeJ",
    "codeR"
})
public class FoxHesf2100 {

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
    @XmlElement(name = "cod_joz")
    protected String codJoz;
    @XmlElement(name = "cod_riz")
    protected String codRiz;
    @XmlElement(name = "desc_doc")
    protected String descDoc;
    protected String descdoc2;
    protected String descdoc3;
    @XmlElement(name = "amou_bed")
    protected long amouBed;
    @XmlElement(name = "amou_bes")
    protected long amouBes;
    @XmlElement(name = "confrm_doc")
    protected String confrmDoc;
    @XmlElement(name = "date_rsid")
    protected String dateRsid;
    protected long radif;
    protected String who;
    @XmlElement(name = "cheq_no")
    protected String cheqNo;
    @XmlElement(name = "cheq_date")
    protected String cheqDate;
    @XmlElement(name = "atrib_no")
    protected String atribNo;
    @XmlElement(name = "code_j")
    protected String codeJ;
    @XmlElement(name = "code_r")
    protected String codeR;

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
     * Gets the value of the codJoz property.
     * 
     * @return
     *     possible object is
     *     {@link String }
     *     
     */
    public String getCodJoz() {
        return codJoz;
    }

    /**
     * Sets the value of the codJoz property.
     * 
     * @param value
     *     allowed object is
     *     {@link String }
     *     
     */
    public void setCodJoz(String value) {
        this.codJoz = value;
    }

    /**
     * Gets the value of the codRiz property.
     * 
     * @return
     *     possible object is
     *     {@link String }
     *     
     */
    public String getCodRiz() {
        return codRiz;
    }

    /**
     * Sets the value of the codRiz property.
     * 
     * @param value
     *     allowed object is
     *     {@link String }
     *     
     */
    public void setCodRiz(String value) {
        this.codRiz = value;
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
     * Gets the value of the descdoc2 property.
     * 
     * @return
     *     possible object is
     *     {@link String }
     *     
     */
    public String getDescdoc2() {
        return descdoc2;
    }

    /**
     * Sets the value of the descdoc2 property.
     * 
     * @param value
     *     allowed object is
     *     {@link String }
     *     
     */
    public void setDescdoc2(String value) {
        this.descdoc2 = value;
    }

    /**
     * Gets the value of the descdoc3 property.
     * 
     * @return
     *     possible object is
     *     {@link String }
     *     
     */
    public String getDescdoc3() {
        return descdoc3;
    }

    /**
     * Sets the value of the descdoc3 property.
     * 
     * @param value
     *     allowed object is
     *     {@link String }
     *     
     */
    public void setDescdoc3(String value) {
        this.descdoc3 = value;
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
     * Gets the value of the radif property.
     * 
     */
    public long getRadif() {
        return radif;
    }

    /**
     * Sets the value of the radif property.
     * 
     */
    public void setRadif(long value) {
        this.radif = value;
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
     * Gets the value of the codeJ property.
     * 
     * @return
     *     possible object is
     *     {@link String }
     *     
     */
    public String getCodeJ() {
        return codeJ;
    }

    /**
     * Sets the value of the codeJ property.
     * 
     * @param value
     *     allowed object is
     *     {@link String }
     *     
     */
    public void setCodeJ(String value) {
        this.codeJ = value;
    }

    /**
     * Gets the value of the codeR property.
     * 
     * @return
     *     possible object is
     *     {@link String }
     *     
     */
    public String getCodeR() {
        return codeR;
    }

    /**
     * Sets the value of the codeR property.
     * 
     * @param value
     *     allowed object is
     *     {@link String }
     *     
     */
    public void setCodeR(String value) {
        this.codeR = value;
    }

}
