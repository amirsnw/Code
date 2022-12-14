package ir.tamin.insurance.technical.model.refund;

import javax.persistence.*;
import java.io.Serializable;
import java.util.Date;

/**
 *
 * @author m_hoseini
 */
@Entity
@Table(name = "techins.REFUND_DEBIT_Paylog")
public class RefundFinanceLog implements Serializable {

    @Id
    @Column(name = "REQID", length = 20, nullable = false)
    private String requestSerial;

    @Column(name = "LOG_DATE")
    @Temporal(TemporalType.TIMESTAMP)
    private Date logDate;

    @Column(name = "PAYMENT_ID")
    private String paymentId;

    @Column(name = "CHEQUE_NO")
    private String chequeNumber;

    @Column(name = "OP_DATE")
    private String operationDate;    

    @Column(name = "STATUS")
    private String status;

    @Column(name = "STATUS_DESC")
    private String statusDesc;

    public String getRequestSerial() {
        return requestSerial;
    }

    public void setRequestSerial(String requestSerial) {
        this.requestSerial = requestSerial;
    }

    public Date getLogDate() {
        return logDate;
    }

    public void setLogDate(Date logDate) {
        this.logDate = logDate;
    }

    public String getPaymentId() {
        return paymentId;
    }

    public void setPaymentId(String paymentId) {
        this.paymentId = paymentId;
    }

    public String getChequeNumber() {
        return chequeNumber;
    }

    public void setChequeNumber(String chequeNumber) {
        this.chequeNumber = chequeNumber;
    }

    public String getOperationDate() {
        return operationDate;
    }

    public void setOperationDate(String operationDate) {
        this.operationDate = operationDate;
    } 
   
    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public String getStatusDesc() {
        return statusDesc;
    }

    public void setStatusDesc(String statusDesc) {
        this.statusDesc = statusDesc;
    }

}
