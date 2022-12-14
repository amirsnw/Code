package ir.tamin.insurance.technical.model.guardian;

import ir.tamin.framework.domain.AbstractEntity;
import ir.tamin.framework.ws.rest.repository.annotation.RESTResource;
import ir.tamin.framework.ws.rest.repository.annotation.ResourceId;
import ir.tamin.framework.ws.rest.repository.annotation.ResourceIds;

import javax.persistence.*;
import java.sql.Timestamp;

@Entity
@Table(name = "SSUP_GUARDIAN_TRANSLOG")
@RESTResource(lookupProxy = "ir.tamin.insurance.technical.business.guardian.GuardianTranslogProxy")

@NamedQueries({
    @NamedQuery(name = "GuardianTranslog.getRecord", query = "SELECT max(i.transDate) FROM GuardianTranslog i WHERE i.reqSerial =:reqSerial and i.brchSender=:branchSender and i.brchReciver=:branchReciver"),
    @NamedQuery(name = "GuardianTranslog.getRecordByBranchReciver", query = "SELECT max(i.transDate) FROM GuardianTranslog i WHERE i.reqSerial =:reqSerial and i.brchReciver=:branchReciver")
})

@ResourceIds({
        @ResourceId(fields = "transReqId")})
public class GuardianTranslog  extends AbstractEntity<String> {

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @Column(name = "TRANS_REQID")
    private String transReqId;

    @Column(name = "REQ_SERIAL", length = 20, nullable = false)
    private String reqSerial;
//    @ManyToOne
//    @JsonIgnore
//    @JoinColumn(name = "reqSerial", referencedColumnName = "reqSerial")
//    private Guardian guardian;

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

//    public Guardian getGuardian() {
//        return guardian;
//    }
//
//    public void setGuardian(Guardian guardian) {
//        this.guardian = guardian;
//    }

    public String getReqSerial() {
        return reqSerial;
    }

    public void setReqSerial(String reqSerial) {
        this.reqSerial = reqSerial;
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
