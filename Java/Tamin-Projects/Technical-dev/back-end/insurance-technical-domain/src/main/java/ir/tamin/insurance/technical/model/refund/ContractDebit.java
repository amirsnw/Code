package ir.tamin.insurance.technical.model.refund;

import ir.tamin.framework.domain.AbstractEntity;
import ir.tamin.framework.ws.rest.repository.annotation.ResourceId;
import ir.tamin.framework.ws.rest.repository.annotation.ResourceIds;

import javax.persistence.*;
import javax.validation.constraints.Pattern;
import javax.validation.constraints.Size;

/**
 *
 * @author m_hoseini
 */

@Entity
@Table(name = "techins.esis_cntrctdebit")
//@RESTResource(lookupProxy = "ir.tamin.insurance.technical.business.refund.RefundSpecProxy")
@ResourceIds({
    @ResourceId(fields = "contractNumber")})
@NamedQueries({
    @NamedQuery(name = "ContractDebit.findByResnum", query = "SELECT c FROM ContractDebit c WHERE  c.resNumber=:resNumber and c.debitReasonCode<>'18'")})
public class ContractDebit extends AbstractEntity<String> {
    @Id
    @Pattern(regexp = "[a-zA-Z_0-9]*")
    @Size(min = 13, max = 13)
    @Column(name = "CNT_CNTRCTNO")
    private String contractNumber;     
    @Column(name = "CWS_DBTNO")
    private String debitNumber; 
    @Column(name = "CWS_DBTSDATE")
    private String payStartDate; 
    @Column(name = "CWS_DBTEDATE")
    private String payEndDate; 
    @Column(name = "CREATUID")
    private String createDate; 
    @Column(name = "CREATUDT")
    private String createUserId; 
    @Column(name = "DEBITCRTREASONCODE")
    private String debitReasonCode; 
    @Column(name = "PAYDATE")
    private String paymenetDate; 
    @Column(name = "RESNUM")
    private String resNumber; 

    public String getContractNumber() {
        return contractNumber;
    }

    public void setContractNumber(String contractNumber) {
        this.contractNumber = contractNumber;
    }

    public String getDebitNumber() {
        return debitNumber;
    }

    public void setDebitNumber(String debitNumber) {
        this.debitNumber = debitNumber;
    }

    public String getPayStartDate() {
        return payStartDate;
    }

    public void setPayStartDate(String payStartDate) {
        this.payStartDate = payStartDate;
    }

    public String getPayEndDate() {
        return payEndDate;
    }

    public void setPayEndDate(String payEndDate) {
        this.payEndDate = payEndDate;
    }

    public String getCreateDate() {
        return createDate;
    }

    public void setCreateDate(String createDate) {
        this.createDate = createDate;
    }

    public String getCreateUserId() {
        return createUserId;
    }

    public void setCreateUserId(String createUserId) {
        this.createUserId = createUserId;
    }

    public String getDebitReasonCode() {
        return debitReasonCode;
    }

    public void setDebitReasonCode(String debitReasonCode) {
        this.debitReasonCode = debitReasonCode;
    }

    public String getPaymenetDate() {
        return paymenetDate;
    }

    public void setPaymenetDate(String paymenetDate) {
        this.paymenetDate = paymenetDate;
    }

    public String getResNumber() {
        return resNumber;
    }

    public void setResNumber(String resNumber) {
        this.resNumber = resNumber;
    }
    
    
    @Override
    public String getIdentifierInstance() {
        return contractNumber;
    }		

    
}
