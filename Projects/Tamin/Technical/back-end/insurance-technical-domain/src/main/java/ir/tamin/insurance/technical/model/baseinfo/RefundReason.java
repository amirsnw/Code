package ir.tamin.insurance.technical.model.baseinfo;

import ir.tamin.framework.domain.AbstractEntity;
import ir.tamin.framework.ws.rest.repository.annotation.RESTResource;
import ir.tamin.framework.ws.rest.repository.annotation.ResourceId;
import ir.tamin.framework.ws.rest.repository.annotation.ResourceIds;

import javax.persistence.*;

/**
 *
 * @author m_hoseini
 */
@Entity
@RESTResource(lookupProxy = "ir.tamin.insurance.technical.business.refund.RefundReasonManager")
@NamedQueries({ 
// @NamedQuery(name = "RefundReason.findAll", query = "SELECT p FROM City p "),
// @NamedQuery(name = "RefundReason.findByCityCode", query = "select c.cityName from City c  where c.cityCode = :cityCode ")
})
@ResourceIds({
    @ResourceId(fields = {"reasonCode"})})
@Table(name = "tb_refund_reasons")
public class RefundReason extends AbstractEntity<String> {

    @Id
    @Column(name = "REASON_CODE")
    private String reasonCode;

    @Column(name = "REASON_DESC")
    private String reasonDesc;

    @Column(name = "STATUS")
    private String reasonStatus;

    public String getReasonCode() {
        return reasonCode;
    }

    public void setReasonCode(String reasonCode) {
        this.reasonCode = reasonCode;
    }

    public String getReasonDesc() {
        return reasonDesc;
    }

    public void setReasonDesc(String reasonDesc) {
        this.reasonDesc = reasonDesc;
    }

    public String getReasonStatus() {
        return reasonStatus;
    }

    public void setReasonStatus(String reasonStatus) {
        this.reasonStatus = reasonStatus;
    }

    @Override
    public String getIdentifierInstance() {
        return this.reasonCode;
    }

}
