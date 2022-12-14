
package ir.tamin.incomeBank.ws.soap;

import javax.xml.bind.annotation.XmlAccessType;
import javax.xml.bind.annotation.XmlAccessorType;
import javax.xml.bind.annotation.XmlElement;
import javax.xml.bind.annotation.XmlType;


/**
 * <p>Java class for foxChkPaper complex type.
 * 
 * <p>The following schema fragment specifies the expected content contained within this class.
 * 
 * <pre>
 * &lt;complexType name="foxChkPaper">
 *   &lt;complexContent>
 *     &lt;restriction base="{http://www.w3.org/2001/XMLSchema}anyType">
 *       &lt;sequence>
 *         &lt;element name="book" type="{http://www.w3.org/2001/XMLSchema}string" minOccurs="0"/>
 *         &lt;element name="accnum" type="{http://www.w3.org/2001/XMLSchema}string" minOccurs="0"/>
 *         &lt;element name="chkno" type="{http://www.w3.org/2001/XMLSchema}string" minOccurs="0"/>
 *         &lt;element name="desc_doc" type="{http://www.w3.org/2001/XMLSchema}string" minOccurs="0"/>
 *         &lt;element name="no_doc" type="{http://www.w3.org/2001/XMLSchema}string" minOccurs="0"/>
 *         &lt;element name="radif" type="{http://www.w3.org/2001/XMLSchema}long"/>
 *       &lt;/sequence>
 *     &lt;/restriction>
 *   &lt;/complexContent>
 * &lt;/complexType>
 * </pre>
 * 
 * 
 */
@XmlAccessorType(XmlAccessType.FIELD)
@XmlType(name = "foxChkPaper", propOrder = {
    "book",
    "accnum",
    "chkno",
    "descDoc",
    "noDoc",
    "radif"
})
public class FoxChkPaper {

    protected String book;
    protected String accnum;
    protected String chkno;
    @XmlElement(name = "desc_doc")
    protected String descDoc;
    @XmlElement(name = "no_doc")
    protected String noDoc;
    protected long radif;

    /**
     * Gets the value of the book property.
     * 
     * @return
     *     possible object is
     *     {@link String }
     *     
     */
    public String getBook() {
        return book;
    }

    /**
     * Sets the value of the book property.
     * 
     * @param value
     *     allowed object is
     *     {@link String }
     *     
     */
    public void setBook(String value) {
        this.book = value;
    }

    /**
     * Gets the value of the accnum property.
     * 
     * @return
     *     possible object is
     *     {@link String }
     *     
     */
    public String getAccnum() {
        return accnum;
    }

    /**
     * Sets the value of the accnum property.
     * 
     * @param value
     *     allowed object is
     *     {@link String }
     *     
     */
    public void setAccnum(String value) {
        this.accnum = value;
    }

    /**
     * Gets the value of the chkno property.
     * 
     * @return
     *     possible object is
     *     {@link String }
     *     
     */
    public String getChkno() {
        return chkno;
    }

    /**
     * Sets the value of the chkno property.
     * 
     * @param value
     *     allowed object is
     *     {@link String }
     *     
     */
    public void setChkno(String value) {
        this.chkno = value;
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

}
