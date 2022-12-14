
package ir.tamin.incomeBank.service.daramadBank.webservice;

import javax.xml.bind.JAXBElement;
import javax.xml.bind.annotation.XmlElementDecl;
import javax.xml.bind.annotation.XmlRegistry;
import javax.xml.namespace.QName;


/**
 * This object contains factory methods for each 
 * Java content interface and Java element interface 
 * generated in the ir.tamin.incomeBank.service.daramadBank.webservice package. 
 * <p>An ObjectFactory allows you to programatically 
 * construct new instances of the Java representation 
 * for XML content. The Java representation of XML 
 * content can consist of schema derived interfaces 
 * and classes representing the binding of schema 
 * type definitions, element declarations and model 
 * groups.  Factory methods for each of these are 
 * provided in this class.
 * 
 */
@XmlRegistry
public class ObjectFactory {

    private final static QName _String_QNAME = new QName("http://tempuri.org/OrdRequest/CentralOrdRequest", "string");
    private final static QName _Boolean_QNAME = new QName("http://tempuri.org/OrdRequest/CentralOrdRequest", "boolean");

    /**
     * Create a new ObjectFactory that can be used to create new instances of schema derived classes for package: ir.tamin.incomeBank.service.daramadBank.webservice
     * 
     */
    public ObjectFactory() {
    }

    /**
     * Create an instance of {@link GetTicketID }
     * 
     */
    public GetTicketID createGetTicketID() {
        return new GetTicketID();
    }

    /**
     * Create an instance of {@link GetTicketIDResponse }
     * 
     */
    public GetTicketIDResponse createGetTicketIDResponse() {
        return new GetTicketIDResponse();
    }

    /**
     * Create an instance of {@link OrdRequestTejaratChagepassResponse }
     * 
     */
    public OrdRequestTejaratChagepassResponse createOrdRequestTejaratChagepassResponse() {
        return new OrdRequestTejaratChagepassResponse();
    }

    /**
     * Create an instance of {@link OrdRequestTejaratChagepass }
     * 
     */
    public OrdRequestTejaratChagepass createOrdRequestTejaratChagepass() {
        return new OrdRequestTejaratChagepass();
    }

    /**
     * Create an instance of {@link OrdRequestRefahOld }
     * 
     */
    public OrdRequestRefahOld createOrdRequestRefahOld() {
        return new OrdRequestRefahOld();
    }

    /**
     * Create an instance of {@link OrdRequestRefahOldResponse }
     * 
     */
    public OrdRequestRefahOldResponse createOrdRequestRefahOldResponse() {
        return new OrdRequestRefahOldResponse();
    }

    /**
     * Create an instance of {@link OrdRequestRefah }
     * 
     */
    public OrdRequestRefah createOrdRequestRefah() {
        return new OrdRequestRefah();
    }

    /**
     * Create an instance of {@link OrdRequestTejarat }
     * 
     */
    public OrdRequestTejarat createOrdRequestTejarat() {
        return new OrdRequestTejarat();
    }

    /**
     * Create an instance of {@link OrdRequestRefahResponse }
     * 
     */
    public OrdRequestRefahResponse createOrdRequestRefahResponse() {
        return new OrdRequestRefahResponse();
    }

    /**
     * Create an instance of {@link OrdRequestTejaratResponse }
     * 
     */
    public OrdRequestTejaratResponse createOrdRequestTejaratResponse() {
        return new OrdRequestTejaratResponse();
    }

    /**
     * Create an instance of {@link JAXBElement }{@code <}{@link String }{@code >}}
     * 
     */
    @XmlElementDecl(namespace = "http://tempuri.org/OrdRequest/CentralOrdRequest", name = "string")
    public JAXBElement<String> createString(String value) {
        return new JAXBElement<String>(_String_QNAME, String.class, null, value);
    }

    /**
     * Create an instance of {@link JAXBElement }{@code <}{@link Boolean }{@code >}}
     * 
     */
    @XmlElementDecl(namespace = "http://tempuri.org/OrdRequest/CentralOrdRequest", name = "boolean")
    public JAXBElement<Boolean> createBoolean(Boolean value) {
        return new JAXBElement<Boolean>(_Boolean_QNAME, Boolean.class, null, value);
    }

}
