
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
 *         &lt;element name="GetFinancialStatementsResult" type="{http://tempuri.org/}FinancialStatementsEntity" minOccurs="0"/>
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
    "getFinancialStatementsResult"
})
@XmlRootElement(name = "GetFinancialStatementsResponse")
public class GetFinancialStatementsResponse {

    @XmlElement(name = "GetFinancialStatementsResult")
    protected FinancialStatementsEntity getFinancialStatementsResult;

    /**
     * Gets the value of the getFinancialStatementsResult property.
     * 
     * @return
     *     possible object is
     *     {@link FinancialStatementsEntity }
     *     
     */
    public FinancialStatementsEntity getGetFinancialStatementsResult() {
        return getFinancialStatementsResult;
    }

    /**
     * Sets the value of the getFinancialStatementsResult property.
     * 
     * @param value
     *     allowed object is
     *     {@link FinancialStatementsEntity }
     *     
     */
    public void setGetFinancialStatementsResult(FinancialStatementsEntity value) {
        this.getFinancialStatementsResult = value;
    }

}
