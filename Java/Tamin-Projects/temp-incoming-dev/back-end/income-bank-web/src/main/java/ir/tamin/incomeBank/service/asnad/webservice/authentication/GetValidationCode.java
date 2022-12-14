
package ir.tamin.incomeBank.service.asnad.webservice.authentication;

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
 *         &lt;element name="UserName" type="{http://www.w3.org/2001/XMLSchema}string" minOccurs="0"/>
 *         &lt;element name="Pass" type="{http://www.w3.org/2001/XMLSchema}string" minOccurs="0"/>
 *         &lt;element name="VahedCode" type="{http://www.w3.org/2001/XMLSchema}string" minOccurs="0"/>
 *         &lt;element name="LoginType" type="{http://www.w3.org/2001/XMLSchema}string" minOccurs="0"/>
 *         &lt;element name="Validate_Code" type="{http://www.w3.org/2001/XMLSchema}string" minOccurs="0"/>
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
    "userName",
    "pass",
    "vahedCode",
    "loginType",
    "validateCode"
})
@XmlRootElement(name = "GetValidationCode")
public class GetValidationCode {

    @XmlElement(name = "UserName")
    protected String userName;
    @XmlElement(name = "Pass")
    protected String pass;
    @XmlElement(name = "VahedCode")
    protected String vahedCode;
    @XmlElement(name = "LoginType")
    protected String loginType;
    @XmlElement(name = "Validate_Code")
    protected String validateCode;

    /**
     * Gets the value of the userName property.
     * 
     * @return
     *     possible object is
     *     {@link String }
     *     
     */
    public String getUserName() {
        return userName;
    }

    /**
     * Sets the value of the userName property.
     * 
     * @param value
     *     allowed object is
     *     {@link String }
     *     
     */
    public void setUserName(String value) {
        this.userName = value;
    }

    /**
     * Gets the value of the pass property.
     * 
     * @return
     *     possible object is
     *     {@link String }
     *     
     */
    public String getPass() {
        return pass;
    }

    /**
     * Sets the value of the pass property.
     * 
     * @param value
     *     allowed object is
     *     {@link String }
     *     
     */
    public void setPass(String value) {
        this.pass = value;
    }

    /**
     * Gets the value of the vahedCode property.
     * 
     * @return
     *     possible object is
     *     {@link String }
     *     
     */
    public String getVahedCode() {
        return vahedCode;
    }

    /**
     * Sets the value of the vahedCode property.
     * 
     * @param value
     *     allowed object is
     *     {@link String }
     *     
     */
    public void setVahedCode(String value) {
        this.vahedCode = value;
    }

    /**
     * Gets the value of the loginType property.
     * 
     * @return
     *     possible object is
     *     {@link String }
     *     
     */
    public String getLoginType() {
        return loginType;
    }

    /**
     * Sets the value of the loginType property.
     * 
     * @param value
     *     allowed object is
     *     {@link String }
     *     
     */
    public void setLoginType(String value) {
        this.loginType = value;
    }

    /**
     * Gets the value of the validateCode property.
     * 
     * @return
     *     possible object is
     *     {@link String }
     *     
     */
    public String getValidateCode() {
        return validateCode;
    }

    /**
     * Sets the value of the validateCode property.
     * 
     * @param value
     *     allowed object is
     *     {@link String }
     *     
     */
    public void setValidateCode(String value) {
        this.validateCode = value;
    }

}
