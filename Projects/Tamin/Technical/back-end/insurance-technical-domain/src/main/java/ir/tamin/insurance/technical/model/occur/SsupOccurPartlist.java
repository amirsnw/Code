package ir.tamin.insurance.technical.model.occur;

import com.fasterxml.jackson.annotation.JsonBackReference;
import ir.tamin.framework.domain.AbstractEntity;
import ir.tamin.framework.ws.rest.repository.annotation.RESTResource;
import ir.tamin.framework.ws.rest.repository.annotation.ResourceId;
import ir.tamin.framework.ws.rest.repository.annotation.ResourceIds;

import javax.persistence.*;

/**
 * Created by a-khalighi on 5/17/2022
*/
@Entity
@Table(name = "SSUP_OCCUR_PARTLIST")
@RESTResource(/*lookupProxy = "ir.tamin.insurance.technical.business.occur.ssupoccurpartlist.SsupOccurPartlistManager"*/)
@ResourceIds({
        @ResourceId(fields = {"brchCode", "partCode", "reqId"})})
@NamedQueries({
        @NamedQuery(name = "SsupOccurPartlist.deleteRelatedPartLists", query = "DELETE FROM SsupOccurPartlist t WHERE t.reqId = :reqId")})
public class SsupOccurPartlist extends AbstractEntity<SsupOccurPartlistPK> {

    private static final long serialVersionUID = 1L;

    public SsupOccurPartlist() {
    }

    @Column(name = "REPNO", nullable = false)
    private String repno;
    @Id
    @Column(name = "PART_CODE", nullable = false)
    private String partCode;

    @Id
        @Column(name = "REQ_ID", nullable = false)
        private Long reqId;
  /*  @JsonBackReference
    @ManyToOne
    @PrimaryKeyJoinColumn(name = "REQ_ID", referencedColumnName = "REQ_ID")
    private SsupOccurReview ssupOccurReview;*/

    @ManyToOne
    @JsonBackReference
    @JoinColumn(name = "REQ_ID", referencedColumnName = "REQ_ID", updatable = false, insertable = false)
    private SsupOccurReview ssupOccurReview;

    public Long getReqId() {
        return reqId;
    }

    public void setReqId(Long reqId) {
        this.reqId = reqId;
    }

    public SsupOccurReview getSsupOccurReview() {
        return ssupOccurReview;
    }

    public void setSsupOccurReview(SsupOccurReview ssupOccurReview) {
        this.ssupOccurReview = ssupOccurReview;
    }

    public String getPartCode() {
        return partCode;
    }

    public void setPartCode(String partCode) {
        this.partCode = partCode;
    }

    public String getRepno() {
        return repno;
    }

    public void setRepno(String repno) {
        this.repno = repno;
    }

    @Override
    public SsupOccurPartlistPK getIdentifierInstance() {
        return new SsupOccurPartlistPK(this.ssupOccurReview.getReqId(), this.partCode);
    }
}


