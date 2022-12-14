
package ir.tamin.incomeBank.ws.soap;

import javax.xml.bind.annotation.XmlAccessType;
import javax.xml.bind.annotation.XmlAccessorType;
import javax.xml.bind.annotation.XmlElement;
import javax.xml.bind.annotation.XmlType;


/**
 * <p>Java class for foxHesf3100 complex type.
 * 
 * <p>The following schema fragment specifies the expected content contained within this class.
 * 
 * <pre>
 * &lt;complexType name="foxHesf3100">
 *   &lt;complexContent>
 *     &lt;restriction base="{http://www.w3.org/2001/XMLSchema}anyType">
 *       &lt;sequence>
 *         &lt;element name="cod_kol" type="{http://www.w3.org/2001/XMLSchema}string" minOccurs="0"/>
 *         &lt;element name="cod_moi" type="{http://www.w3.org/2001/XMLSchema}string" minOccurs="0"/>
 *         &lt;element name="cod_taf" type="{http://www.w3.org/2001/XMLSchema}string" minOccurs="0"/>
 *         &lt;element name="hes_name" type="{http://www.w3.org/2001/XMLSchema}string" minOccurs="0"/>
 *         &lt;element name="mandeh_bd" type="{http://www.w3.org/2001/XMLSchema}long"/>
 *         &lt;element name="mandeh_bs" type="{http://www.w3.org/2001/XMLSchema}long"/>
 *         &lt;element name="jari_bd" type="{http://www.w3.org/2001/XMLSchema}long"/>
 *         &lt;element name="jari_bs" type="{http://www.w3.org/2001/XMLSchema}long"/>
 *         &lt;element name="kind_act" type="{http://www.w3.org/2001/XMLSchema}string" minOccurs="0"/>
 *         &lt;element name="cod_indep" type="{http://www.w3.org/2001/XMLSchema}string" minOccurs="0"/>
 *         &lt;element name="kind_hes" type="{http://www.w3.org/2001/XMLSchema}string" minOccurs="0"/>
 *         &lt;element name="flag" type="{http://www.w3.org/2001/XMLSchema}string" minOccurs="0"/>
 *         &lt;element name="c_source" type="{http://www.w3.org/2001/XMLSchema}string" minOccurs="0"/>
 *         &lt;element name="close" type="{http://www.w3.org/2001/XMLSchema}string" minOccurs="0"/>
 *         &lt;element name="cod_amar" type="{http://www.w3.org/2001/XMLSchema}string" minOccurs="0"/>
 *         &lt;element name="bdjamnt" type="{http://www.w3.org/2001/XMLSchema}string" minOccurs="0"/>
 *       &lt;/sequence>
 *     &lt;/restriction>
 *   &lt;/complexContent>
 * &lt;/complexType>
 * </pre>
 * 
 * 
 */
@XmlAccessorType(XmlAccessType.FIELD)
@XmlType(name = "foxHesf3100", propOrder = {
    "codKol",
    "codMoi",
    "codTaf",
    "hesName",
    "mandehBd",
    "mandehBs",
    "jariBd",
    "jariBs",
    "kindAct",
    "codIndep",
    "kindHes",
    "flag",
    "cSource",
    "close",
    "codAmar",
    "bdjamnt"
})
public class FoxHesf3100 {

    @XmlElement(name = "cod_kol")
    protected String codKol;
    @XmlElement(name = "cod_moi")
    protected String codMoi;
    @XmlElement(name = "cod_taf")
    protected String codTaf;
    @XmlElement(name = "hes_name")
    protected String hesName;
    @XmlElement(name = "mandeh_bd")
    protected long mandehBd;
    @XmlElement(name = "mandeh_bs")
    protected long mandehBs;
    @XmlElement(name = "jari_bd")
    protected long jariBd;
    @XmlElement(name = "jari_bs")
    protected long jariBs;
    @XmlElement(name = "kind_act")
    protected String kindAct;
    @XmlElement(name = "cod_indep")
    protected String codIndep;
    @XmlElement(name = "kind_hes")
    protected String kindHes;
    protected String flag;
    @XmlElement(name = "c_source")
    protected String cSource;
    protected String close;
    @XmlElement(name = "cod_amar")
    protected String codAmar;
    protected String bdjamnt;

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
     * Gets the value of the hesName property.
     * 
     * @return
     *     possible object is
     *     {@link String }
     *     
     */
    public String getHesName() {
        return hesName;
    }

    /**
     * Sets the value of the hesName property.
     * 
     * @param value
     *     allowed object is
     *     {@link String }
     *     
     */
    public void setHesName(String value) {
        this.hesName = value;
    }

    /**
     * Gets the value of the mandehBd property.
     * 
     */
    public long getMandehBd() {
        return mandehBd;
    }

    /**
     * Sets the value of the mandehBd property.
     * 
     */
    public void setMandehBd(long value) {
        this.mandehBd = value;
    }

    /**
     * Gets the value of the mandehBs property.
     * 
     */
    public long getMandehBs() {
        return mandehBs;
    }

    /**
     * Sets the value of the mandehBs property.
     * 
     */
    public void setMandehBs(long value) {
        this.mandehBs = value;
    }

    /**
     * Gets the value of the jariBd property.
     * 
     */
    public long getJariBd() {
        return jariBd;
    }

    /**
     * Sets the value of the jariBd property.
     * 
     */
    public void setJariBd(long value) {
        this.jariBd = value;
    }

    /**
     * Gets the value of the jariBs property.
     * 
     */
    public long getJariBs() {
        return jariBs;
    }

    /**
     * Sets the value of the jariBs property.
     * 
     */
    public void setJariBs(long value) {
        this.jariBs = value;
    }

    /**
     * Gets the value of the kindAct property.
     * 
     * @return
     *     possible object is
     *     {@link String }
     *     
     */
    public String getKindAct() {
        return kindAct;
    }

    /**
     * Sets the value of the kindAct property.
     * 
     * @param value
     *     allowed object is
     *     {@link String }
     *     
     */
    public void setKindAct(String value) {
        this.kindAct = value;
    }

    /**
     * Gets the value of the codIndep property.
     * 
     * @return
     *     possible object is
     *     {@link String }
     *     
     */
    public String getCodIndep() {
        return codIndep;
    }

    /**
     * Sets the value of the codIndep property.
     * 
     * @param value
     *     allowed object is
     *     {@link String }
     *     
     */
    public void setCodIndep(String value) {
        this.codIndep = value;
    }

    /**
     * Gets the value of the kindHes property.
     * 
     * @return
     *     possible object is
     *     {@link String }
     *     
     */
    public String getKindHes() {
        return kindHes;
    }

    /**
     * Sets the value of the kindHes property.
     * 
     * @param value
     *     allowed object is
     *     {@link String }
     *     
     */
    public void setKindHes(String value) {
        this.kindHes = value;
    }

    /**
     * Gets the value of the flag property.
     * 
     * @return
     *     possible object is
     *     {@link String }
     *     
     */
    public String getFlag() {
        return flag;
    }

    /**
     * Sets the value of the flag property.
     * 
     * @param value
     *     allowed object is
     *     {@link String }
     *     
     */
    public void setFlag(String value) {
        this.flag = value;
    }

    /**
     * Gets the value of the cSource property.
     * 
     * @return
     *     possible object is
     *     {@link String }
     *     
     */
    public String getCSource() {
        return cSource;
    }

    /**
     * Sets the value of the cSource property.
     * 
     * @param value
     *     allowed object is
     *     {@link String }
     *     
     */
    public void setCSource(String value) {
        this.cSource = value;
    }

    /**
     * Gets the value of the close property.
     * 
     * @return
     *     possible object is
     *     {@link String }
     *     
     */
    public String getClose() {
        return close;
    }

    /**
     * Sets the value of the close property.
     * 
     * @param value
     *     allowed object is
     *     {@link String }
     *     
     */
    public void setClose(String value) {
        this.close = value;
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

    /**
     * Gets the value of the bdjamnt property.
     * 
     * @return
     *     possible object is
     *     {@link String }
     *     
     */
    public String getBdjamnt() {
        return bdjamnt;
    }

    /**
     * Sets the value of the bdjamnt property.
     * 
     * @param value
     *     allowed object is
     *     {@link String }
     *     
     */
    public void setBdjamnt(String value) {
        this.bdjamnt = value;
    }

}
