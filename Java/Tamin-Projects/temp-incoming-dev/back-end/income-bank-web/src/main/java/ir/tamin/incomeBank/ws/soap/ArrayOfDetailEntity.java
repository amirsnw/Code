
package ir.tamin.incomeBank.ws.soap;

import ir.tamin.incomeBank.model.financialDoc.ElmDetail;

import java.util.ArrayList;
import java.util.List;
import javax.xml.bind.annotation.XmlAccessType;
import javax.xml.bind.annotation.XmlAccessorType;
import javax.xml.bind.annotation.XmlElement;
import javax.xml.bind.annotation.XmlType;


/**
 * <p>Java class for ArrayOfDetailEntity complex type.
 * 
 * <p>The following schema fragment specifies the expected content contained within this class.
 * 
 * <pre>
 * &lt;complexType name="ArrayOfDetailEntity">
 *   &lt;complexContent>
 *     &lt;restriction base="{http://www.w3.org/2001/XMLSchema}anyType">
 *       &lt;sequence>
 *         &lt;element name="DetailEntity" type="{http://tempuri.org/}DetailEntity" maxOccurs="unbounded" minOccurs="0"/>
 *       &lt;/sequence>
 *     &lt;/restriction>
 *   &lt;/complexContent>
 * &lt;/complexType>
 * </pre>
 * 
 * 
 */
@XmlAccessorType(XmlAccessType.FIELD)
@XmlType(name = "ArrayOfDetailEntity", propOrder = {
    "detailEntity"
})
public class ArrayOfDetailEntity {

    @XmlElement(name = "DetailEntity", nillable = true)
    protected List<DetailEntity> detailEntity;

    public ArrayOfDetailEntity() {
    }

    public ArrayOfDetailEntity(List<ElmDetail> elmDetails) {
        List<DetailEntity> detailEntity = new ArrayList<>();
        elmDetails.forEach(item -> {
            DetailEntity detail = new DetailEntity(item);
            detailEntity.add(detail);
        });
        this.detailEntity = detailEntity;
    }

    public void setDetailEntity(List<DetailEntity> detailEntity) {
        this.detailEntity = detailEntity;
    }

    /**
     * Gets the value of the detailEntity property.
     * 
     * <p>
     * This accessor method returns a reference to the live list,
     * not a snapshot. Therefore any modification you make to the
     * returned list will be present inside the JAXB object.
     * This is why there is not a <CODE>set</CODE> method for the detailEntity property.
     * 
     * <p>
     * For example, to add a new item, do as follows:
     * <pre>
     *    getDetailEntity().add(newItem);
     * </pre>
     * 
     * 
     * <p>
     * Objects of the following type(s) are allowed in the list
     * {@link DetailEntity }
     * 
     * 
     */

    public List<DetailEntity> getDetailEntity() {
        if (detailEntity == null) {
            detailEntity = new ArrayList<DetailEntity>();
        }
        return this.detailEntity;
    }

}
