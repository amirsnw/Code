package ir.tamin.insurance.technical.model.baseinfo;

import ir.tamin.framework.domain.AbstractEntity;
import ir.tamin.framework.ws.rest.repository.annotation.*;
import ir.tamin.insurance.technical.model.Roles;
import ir.tamin.insurance.technical.model.primaryKeyClass.RefundRelationPK;

import javax.persistence.*;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;

/**
 *
 * @author m_hoseini
 */

@Entity
@NamedQueries({ 
// @NamedQuery(name = "RefundRelation.findAll", query = "SELECT p FROM City p "),
// @NamedQuery(name = "RefundRelation.findByCityCode", query = "select c.cityName from City c  where c.cityCode = :cityCode ")
})
@RESTResource(lookupProxy = "ir.tamin.insurance.technical.business.refund.RefundRelationManager")

@ResourceIds({
    @ResourceId(fields = {"relationTypeCode", "refundReason.reasonCode"})})
@ResourceOperations({
    @ResourceOperation(operation = "all", roles = Roles.ALL_USERS)
})
@Table(name = "tb_refund_rel")
public class RefundRelation extends AbstractEntity<RefundRelationPK> {
    
    @Id
    @NotNull
    @Column(name = "TYPECODE", length = 2)
    private String relationTypeCode;
    
//    @NotNull
//    @Size(min = 2, max = 2)
//    @Column(name = "", length = 2)
//    private String reasonCode;   
    @Id
    @OneToOne
    @JoinColumn(name = "REASON_CODE" , referencedColumnName = "REASON_CODE")
    //@JsonBackReference(value = "subDominant")
    private RefundReason refundReason;
  
    @Size(max = 1)
    @Column(name = "STATUS", length = 1)
    private String status;    
  
    @Size( max = 1)
    @Column(name = "DELETE_HISTORY", length = 1)
    private String deleteHistory;    
   
    @Size(max = 1)
    @Column(name = "REFUND_ISU", length = 1)
    private Long refundIsu;
    
    @Size(max = 1)
    @Column(name = "REFUND_DARMAN", length = 1)
    private Long refundDarman;

    public String getRelationTypeCode() {
        return relationTypeCode;
    }

    public void setRelationTypeCode(String relationTypeCode) {
        this.relationTypeCode = relationTypeCode;
    }

//    public String getReasonCode() {
//        return reasonCode;
//    }
//
//    public void setReasonCode(String reasonCode) {
//        this.reasonCode = reasonCode;
//    }
    
    public RefundReason getRefundReason() {
        return refundReason;
    }
    
    public void setRefundReason(RefundReason refundReason) {
        this.refundReason = refundReason;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public String getDeleteHistory() {
        return deleteHistory;
    }

    public void setDeleteHistory(String deleteHistory) {
        this.deleteHistory = deleteHistory;
    }

    public Long getRefundIsu() {
        return refundIsu;
    }

    public void setRefundIsu(Long refundIsu) {
        this.refundIsu = refundIsu;
    }

    public Long getRefundDarman() {
        return refundDarman;
    }

    public void setRefundDarman(Long refundDarman) {
        this.refundDarman = refundDarman;
    }   
    
    @Override
    public RefundRelationPK getIdentifierInstance() {
        return new RefundRelationPK(this.relationTypeCode, this.refundReason.getReasonCode());
    }


    
}
