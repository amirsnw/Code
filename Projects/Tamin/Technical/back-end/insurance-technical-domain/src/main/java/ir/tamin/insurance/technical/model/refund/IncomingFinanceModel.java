package ir.tamin.insurance.technical.model.refund;

/**
 *
 * @author m_hoseini
 */
public class IncomingFinanceModel {
    
    private String paymentId;
    private String chequeNumber;
    private String chequeDate;
    private String reasonDesc;
    private String sendBank;
    private String status;

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

    public String getChequeDate() {
        return chequeDate;
    }

    public void setChequeDate(String chequeDate) {
        this.chequeDate = chequeDate;
    }

    public String getReasonDesc() {
        return reasonDesc;
    }

    public void setReasonDesc(String reasonDesc) {
        this.reasonDesc = reasonDesc;
    }

    public String getSendBank() {
        return sendBank;
    }

    public void setSendBank(String sendBank) {
        this.sendBank = sendBank;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }
    
    
    
}
