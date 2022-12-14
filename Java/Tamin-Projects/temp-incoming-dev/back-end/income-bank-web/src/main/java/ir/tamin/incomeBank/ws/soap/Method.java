
package ir.tamin.incomeBank.ws.soap;

import javax.xml.bind.annotation.XmlEnum;
import javax.xml.bind.annotation.XmlEnumValue;
import javax.xml.bind.annotation.XmlType;


/**
 * <p>Java class for Method.
 * 
 * <p>The following schema fragment specifies the expected content contained within this class.
 * <p>
 * <pre>
 * &lt;simpleType name="Method">
 *   &lt;restriction base="{http://www.w3.org/2001/XMLSchema}string">
 *     &lt;enumeration value="Post"/>
 *     &lt;enumeration value="Put"/>
 *     &lt;enumeration value="Get"/>
 *     &lt;enumeration value="Delete"/>
 *   &lt;/restriction>
 * &lt;/simpleType>
 * </pre>
 * 
 */
@XmlType(name = "Method")
@XmlEnum
public enum Method {

    @XmlEnumValue("Post")
    POST("Post"),
    @XmlEnumValue("Put")
    PUT("Put"),
    @XmlEnumValue("Get")
    GET("Get"),
    @XmlEnumValue("Delete")
    DELETE("Delete");
    private final String value;

    Method(String v) {
        value = v;
    }

    public String value() {
        return value;
    }

    public static Method fromValue(String v) {
        for (Method c: Method.values()) {
            if (c.value.equals(v)) {
                return c;
            }
        }
        throw new IllegalArgumentException(v);
    }

}
