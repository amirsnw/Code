package ir.tamin.insurance.technical.model.occur;

import ir.tamin.framework.domain.AbstractEntity;
import ir.tamin.framework.ws.rest.repository.annotation.RESTResource;
import ir.tamin.framework.ws.rest.repository.annotation.ResourceId;
import ir.tamin.framework.ws.rest.repository.annotation.ResourceIds;

import javax.persistence.*;
import java.sql.Timestamp;

@Entity
@Table(name = "SSUP_OCCUR_TRANSLOG")
@RESTResource
@NamedQueries({
    @NamedQuery(name = "OccurTranslog.getRecord", query = "SELECT max(i.transDate) FROM OccurTranslog i" +
            " WHERE i.reqId =:reqId")
})
@ResourceIds({@ResourceId(fields = "transReqId")})
public class OccurTranslog extends AbstractEntity<String> {

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @Column(name = "TRANS_REQID")
    private String transReqId;

    @Column(name = "REQ_ID", nullable =false)
    private Long reqId;

    @Column(name = "BRCH_OWNER")
    private String brchOwner;

    @Column(name = "BRCH_SENDER")
    private String brchSender;

    @Column(name = "BRCH_RECIVER")
    private String brchReciver;

    @Column(name = "OPUID")
    private String opuId;

    @Column(name = "TRANS_DATE")
    private Timestamp transDate;

    public String getTransReqId() {
        return transReqId;
    }

    public void setTransReqId(String transReqId) {
        this.transReqId = transReqId;
    }

    public Long getReqId() {
        return reqId;
    }

    public void setReqId(Long reqId) {
        this.reqId = reqId;
    }

    public String getBrchOwner() {
        return brchOwner;
    }

    public void setBrchOwner(String brchOwner) {
        this.brchOwner = brchOwner;
    }

    public String getBrchSender() {
        return brchSender;
    }

    public void setBrchSender(String brchSender) {
        this.brchSender = brchSender;
    }

    public String getBrchReciver() {
        return brchReciver;
    }

    public void setBrchReciver(String brchReciver) {
        this.brchReciver = brchReciver;
    }

    public String getOpuId() {
        return opuId;
    }

    public void setOpuId(String opuId) {
        this.opuId = opuId;
    }

    public Timestamp getTransDate() {
        return transDate;
    }

    public void setTransDate(Timestamp transDate) {
        this.transDate = transDate;
    }

    @Override
    public String getIdentifierInstance() {
        return transReqId;
    }
}
