
package ir.tamin.incomeBank.ws.soap;

import javax.xml.bind.annotation.XmlAccessType;
import javax.xml.bind.annotation.XmlAccessorType;
import javax.xml.bind.annotation.XmlElement;
import javax.xml.bind.annotation.XmlType;


/**
 * <p>Java class for FinancialStatementsEntity complex type.
 * 
 * <p>The following schema fragment specifies the expected content contained within this class.
 * 
 * <pre>
 * &lt;complexType name="FinancialStatementsEntity">
 *   &lt;complexContent>
 *     &lt;restriction base="{http://www.w3.org/2001/XMLSchema}anyType">
 *       &lt;sequence>
 *         &lt;element name="LstEntVWSOORATMALI" type="{http://tempuri.org/}ArrayOfEntVWSOORATMALI" minOccurs="0"/>
 *         &lt;element name="LstEntVWSOORAT_AMARAMALKARD" type="{http://tempuri.org/}ArrayOfEntVWSOORAT_AMARAMALKARD" minOccurs="0"/>
 *         &lt;element name="LstEntVWSOORAT_VAZIYAT" type="{http://tempuri.org/}ArrayOfEntVWSOORAT_VAZIYAT" minOccurs="0"/>
 *         &lt;element name="LstMsg" type="{http://tempuri.org/}ArrayOfMessege" minOccurs="0"/>
 *         &lt;element name="res" type="{http://tempuri.org/}ServiceResult" minOccurs="0"/>
 *       &lt;/sequence>
 *     &lt;/restriction>
 *   &lt;/complexContent>
 * &lt;/complexType>
 * </pre>
 * 
 * 
 */
@XmlAccessorType(XmlAccessType.FIELD)
@XmlType(name = "FinancialStatementsEntity", propOrder = {
    "lstEntVWSOORATMALI",
    "lstEntVWSOORATAMARAMALKARD",
    "lstEntVWSOORATVAZIYAT",
    "lstMsg",
    "res"
})
public class FinancialStatementsEntity {

    @XmlElement(name = "LstEntVWSOORATMALI")
    protected ArrayOfEntVWSOORATMALI lstEntVWSOORATMALI;
    @XmlElement(name = "LstEntVWSOORAT_AMARAMALKARD")
    protected ArrayOfEntVWSOORATAMARAMALKARD lstEntVWSOORATAMARAMALKARD;
    @XmlElement(name = "LstEntVWSOORAT_VAZIYAT")
    protected ArrayOfEntVWSOORATVAZIYAT lstEntVWSOORATVAZIYAT;
    @XmlElement(name = "LstMsg")
    protected ArrayOfMessege lstMsg;
    protected ServiceResult res;

    /**
     * Gets the value of the lstEntVWSOORATMALI property.
     * 
     * @return
     *     possible object is
     *     {@link ArrayOfEntVWSOORATMALI }
     *     
     */
    public ArrayOfEntVWSOORATMALI getLstEntVWSOORATMALI() {
        return lstEntVWSOORATMALI;
    }

    /**
     * Sets the value of the lstEntVWSOORATMALI property.
     * 
     * @param value
     *     allowed object is
     *     {@link ArrayOfEntVWSOORATMALI }
     *     
     */
    public void setLstEntVWSOORATMALI(ArrayOfEntVWSOORATMALI value) {
        this.lstEntVWSOORATMALI = value;
    }

    /**
     * Gets the value of the lstEntVWSOORATAMARAMALKARD property.
     * 
     * @return
     *     possible object is
     *     {@link ArrayOfEntVWSOORATAMARAMALKARD }
     *     
     */
    public ArrayOfEntVWSOORATAMARAMALKARD getLstEntVWSOORATAMARAMALKARD() {
        return lstEntVWSOORATAMARAMALKARD;
    }

    /**
     * Sets the value of the lstEntVWSOORATAMARAMALKARD property.
     * 
     * @param value
     *     allowed object is
     *     {@link ArrayOfEntVWSOORATAMARAMALKARD }
     *     
     */
    public void setLstEntVWSOORATAMARAMALKARD(ArrayOfEntVWSOORATAMARAMALKARD value) {
        this.lstEntVWSOORATAMARAMALKARD = value;
    }

    /**
     * Gets the value of the lstEntVWSOORATVAZIYAT property.
     * 
     * @return
     *     possible object is
     *     {@link ArrayOfEntVWSOORATVAZIYAT }
     *     
     */
    public ArrayOfEntVWSOORATVAZIYAT getLstEntVWSOORATVAZIYAT() {
        return lstEntVWSOORATVAZIYAT;
    }

    /**
     * Sets the value of the lstEntVWSOORATVAZIYAT property.
     * 
     * @param value
     *     allowed object is
     *     {@link ArrayOfEntVWSOORATVAZIYAT }
     *     
     */
    public void setLstEntVWSOORATVAZIYAT(ArrayOfEntVWSOORATVAZIYAT value) {
        this.lstEntVWSOORATVAZIYAT = value;
    }

    /**
     * Gets the value of the lstMsg property.
     * 
     * @return
     *     possible object is
     *     {@link ArrayOfMessege }
     *     
     */
    public ArrayOfMessege getLstMsg() {
        return lstMsg;
    }

    /**
     * Sets the value of the lstMsg property.
     * 
     * @param value
     *     allowed object is
     *     {@link ArrayOfMessege }
     *     
     */
    public void setLstMsg(ArrayOfMessege value) {
        this.lstMsg = value;
    }

    /**
     * Gets the value of the res property.
     * 
     * @return
     *     possible object is
     *     {@link ServiceResult }
     *     
     */
    public ServiceResult getRes() {
        return res;
    }

    /**
     * Sets the value of the res property.
     * 
     * @param value
     *     allowed object is
     *     {@link ServiceResult }
     *     
     */
    public void setRes(ServiceResult value) {
        this.res = value;
    }

}
