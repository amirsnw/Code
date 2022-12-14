
package ir.tamin.incomeBank.ws.soap;

import javax.xml.bind.annotation.XmlAccessType;
import javax.xml.bind.annotation.XmlAccessorType;
import javax.xml.bind.annotation.XmlElement;
import javax.xml.bind.annotation.XmlSchemaType;
import javax.xml.bind.annotation.XmlType;


/**
 * <p>Java class for httpsRequestEntity complex type.
 * 
 * <p>The following schema fragment specifies the expected content contained within this class.
 * 
 * <pre>
 * &lt;complexType name="httpsRequestEntity">
 *   &lt;complexContent>
 *     &lt;restriction base="{http://www.w3.org/2001/XMLSchema}anyType">
 *       &lt;sequence>
 *         &lt;element name="Url" type="{http://www.w3.org/2001/XMLSchema}string" minOccurs="0"/>
 *         &lt;element name="PostData" type="{http://www.w3.org/2001/XMLSchema}string" minOccurs="0"/>
 *         &lt;element name="ReqMethod" type="{http://tempuri.org/}Method"/>
 *         &lt;element name="Headers" type="{http://tempuri.org/}ArrayOfEntHead" minOccurs="0"/>
 *         &lt;element name="ContentType" type="{http://www.w3.org/2001/XMLSchema}string" minOccurs="0"/>
 *         &lt;element name="RestServiceTimeOut" type="{http://www.w3.org/2001/XMLSchema}int"/>
 *       &lt;/sequence>
 *     &lt;/restriction>
 *   &lt;/complexContent>
 * &lt;/complexType>
 * </pre>
 * 
 * 
 */
@XmlAccessorType(XmlAccessType.FIELD)
@XmlType(name = "httpsRequestEntity", propOrder = {
    "url",
    "postData",
    "reqMethod",
    "headers",
    "contentType",
    "restServiceTimeOut"
})
public class HttpsRequestEntity {

    @XmlElement(name = "Url")
    protected String url;
    @XmlElement(name = "PostData")
    protected String postData;
    @XmlElement(name = "ReqMethod", required = true)
    @XmlSchemaType(name = "string")
    protected Method reqMethod;
    @XmlElement(name = "Headers")
    protected ArrayOfEntHead headers;
    @XmlElement(name = "ContentType")
    protected String contentType;
    @XmlElement(name = "RestServiceTimeOut")
    protected int restServiceTimeOut;

    /**
     * Gets the value of the url property.
     * 
     * @return
     *     possible object is
     *     {@link String }
     *     
     */
    public String getUrl() {
        return url;
    }

    /**
     * Sets the value of the url property.
     * 
     * @param value
     *     allowed object is
     *     {@link String }
     *     
     */
    public void setUrl(String value) {
        this.url = value;
    }

    /**
     * Gets the value of the postData property.
     * 
     * @return
     *     possible object is
     *     {@link String }
     *     
     */
    public String getPostData() {
        return postData;
    }

    /**
     * Sets the value of the postData property.
     * 
     * @param value
     *     allowed object is
     *     {@link String }
     *     
     */
    public void setPostData(String value) {
        this.postData = value;
    }

    /**
     * Gets the value of the reqMethod property.
     * 
     * @return
     *     possible object is
     *     {@link Method }
     *     
     */
    public Method getReqMethod() {
        return reqMethod;
    }

    /**
     * Sets the value of the reqMethod property.
     * 
     * @param value
     *     allowed object is
     *     {@link Method }
     *     
     */
    public void setReqMethod(Method value) {
        this.reqMethod = value;
    }

    /**
     * Gets the value of the headers property.
     * 
     * @return
     *     possible object is
     *     {@link ArrayOfEntHead }
     *     
     */
    public ArrayOfEntHead getHeaders() {
        return headers;
    }

    /**
     * Sets the value of the headers property.
     * 
     * @param value
     *     allowed object is
     *     {@link ArrayOfEntHead }
     *     
     */
    public void setHeaders(ArrayOfEntHead value) {
        this.headers = value;
    }

    /**
     * Gets the value of the contentType property.
     * 
     * @return
     *     possible object is
     *     {@link String }
     *     
     */
    public String getContentType() {
        return contentType;
    }

    /**
     * Sets the value of the contentType property.
     * 
     * @param value
     *     allowed object is
     *     {@link String }
     *     
     */
    public void setContentType(String value) {
        this.contentType = value;
    }

    /**
     * Gets the value of the restServiceTimeOut property.
     * 
     */
    public int getRestServiceTimeOut() {
        return restServiceTimeOut;
    }

    /**
     * Sets the value of the restServiceTimeOut property.
     * 
     */
    public void setRestServiceTimeOut(int value) {
        this.restServiceTimeOut = value;
    }

}
