/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package ir.tamin.incomeBank.model.accounting;

import ir.tamin.incomeBank.model.centralPayment.GlPayHead;
import java.io.Serializable;
import java.math.BigDecimal;
import java.math.BigInteger;
import java.util.Date;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;
import javax.validation.constraints.NotNull;

/**
 *
 * @author f_fotuhi
 */
@Entity
@Table(name = "CP_GL_OPERATION_RESULT")
public class GlOperationResult implements Serializable {

    private static final long serialVersionUID = 1L;
    @Id
    @NotNull
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @Column(name = "ID")
    private BigDecimal id;
    @Column(name = "SEND_DATA")
    private String sendData;
    @Column(name = "SEND_DATA_DATE")
    @Temporal(TemporalType.TIMESTAMP)
    private Date sendDataDate;
    @Column(name = "CONTROL_DATA")
    private String controlData;
    @Column(name = "CONTROL_DATA_DATA")
    @Temporal(TemporalType.TIMESTAMP)
    private Date controlDataData;
    @Column(name = "ISSU_DOC")
    private String issuDoc;
    @Column(name = "ISSU_DOC_DATE")
    @Temporal(TemporalType.TIMESTAMP)
    private Date issuDocDate;
    @Column(name = "VOUCHER_HEADER_ID")
    private BigInteger voucherHeaderId;
    @Column(name = "DOC_TYPE")
    private String docType;
    @JoinColumn(name = "PAY_HEAD_ID", referencedColumnName = "PAY_HEAD_ID")
    @ManyToOne
    private GlPayHead payHeadId;
    @Column(name = "CREATION_TIME")
    @Temporal(TemporalType.TIMESTAMP)
    private Date creationTime;
    @Column(name = "SYSTEM_TYPE_ID")
    private Integer systemTypeId;

    public GlOperationResult() {
    }

    public GlOperationResult(BigDecimal id) {
        this.id = id;
    }

    public BigDecimal getId() {
        return id;
    }

    public void setId(BigDecimal id) {
        this.id = id;
    }

    public String getSendData() {
        return sendData;
    }

    public void setSendData(String sendData) {
        this.sendData = sendData;
    }

    public Date getSendDataDate() {
        return sendDataDate;
    }

    public void setSendDataDate(Date sendDataDate) {
        this.sendDataDate = sendDataDate;
    }

    public String getControlData() {
        return controlData;
    }

    public void setControlData(String controlData) {
        this.controlData = controlData;
    }

    public Date getControlDataData() {
        return controlDataData;
    }

    public void setControlDataData(Date controlDataData) {
        this.controlDataData = controlDataData;
    }

    public String getIssuDoc() {
        return issuDoc;
    }

    public void setIssuDoc(String issuDoc) {
        this.issuDoc = issuDoc;
    }

    public Date getIssuDocDate() {
        return issuDocDate;
    }

    public void setIssuDocDate(Date issuDocDate) {
        this.issuDocDate = issuDocDate;
    }

    public BigInteger getVoucherHeaderId() {
        return voucherHeaderId;
    }

    public void setVoucherHeaderId(BigInteger voucherHeaderId) {
        this.voucherHeaderId = voucherHeaderId;
    }

    public String getDocType() {
        return docType;
    }

    public void setDocType(String docType) {
        this.docType = docType;
    }

    public GlPayHead getPayHeadId() {
        return payHeadId;
    }

    public void setPayHeadId(GlPayHead payHeadId) {
        this.payHeadId = payHeadId;
    }

    public Date getCreationTime() {
        return creationTime;
    }

    public void setCreationTime(Date creationTime) {
        this.creationTime = creationTime;
    }

    public Integer getSystemTypeId() {
        return systemTypeId;
    }

    public void setSystemTypeId(Integer systemTypeId) {
        this.systemTypeId = systemTypeId;
    }

    @Override
    public int hashCode() {
        int hash = 0;
        hash += (id != null ? id.hashCode() : 0);
        return hash;
    }

    @Override
    public boolean equals(Object object) {
        // TODO: Warning - this method won't work in the case the id fields are not set
        if (!(object instanceof GlOperationResult)) {
            return false;
        }
        GlOperationResult other = (GlOperationResult) object;
        if ((this.id == null && other.id != null) || (this.id != null && !this.id.equals(other.id))) {
            return false;
        }
        return true;
    }

    @Override
    public String toString() {
        return "ir.tamin.incomeBank.model.accounting.GlOperationResult[ id=" + id + " ]";
    }

}
