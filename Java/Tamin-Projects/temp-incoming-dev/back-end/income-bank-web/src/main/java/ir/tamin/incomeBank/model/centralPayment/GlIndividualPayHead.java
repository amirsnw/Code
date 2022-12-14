/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package ir.tamin.incomeBank.model.centralPayment;

import com.fasterxml.jackson.annotation.JsonIgnore;
import java.io.Serializable;
import java.math.BigDecimal;
import java.util.Date;
import java.util.List;
import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;
import javax.persistence.Table;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;
import javax.validation.constraints.NotNull;

/**
 *
 * @author s_maknooni
 */
@Entity
@Table(name = "GL_INDIVIDUAL_PAY_HEAD")
public class GlIndividualPayHead implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @NotNull
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @Column(name = "PAY_HEAD_ID")
    private BigDecimal payHeadId;

    @NotNull
    @Column(name = "TOTAL_QTY")
    private Long totalQty;

    @NotNull
    @Column(name = "TOTAL_AMOUNT")
    private BigDecimal totalAmount;

    @NotNull
    @Column(name = "CREATE_DATE")
    @Temporal(TemporalType.TIMESTAMP)
    private Date createDate;

    @NotNull
    @Column(name = "CREATE_USER")
    private String createUser;

    @JoinColumn(name = "SYSTEM_TYPE_ID", referencedColumnName = "SYSTEM_TYPE_ID")
    @ManyToOne(optional = false)
    private GlSystemType system;

    @JsonIgnore
    @OneToMany(cascade = CascadeType.ALL, mappedBy = "individualPayHead")
    private List<GlIndividualPay> individualPayDetailList;

    @Column(name = "SEND_TO_BANK_DATE")
    @Temporal(TemporalType.TIMESTAMP)
    private Date sendToBankDate;

    @Column(name = "SEND_TO_BANK_USER")
    private String sendToBankUser;

    @Column(name = "STATUS")
    private String status;

    @JoinColumn(name = "SUB_SYSTEM_ID", referencedColumnName = "SUB_SYSTEM_ID")
    @ManyToOne(optional = true)
    private GlSubsystemType subSystem;

    @Column(name = "LIST_DESC")
    private String listDesc;

    public GlIndividualPayHead() {
    }

    public GlIndividualPayHead(BigDecimal payHeadId) {
        this.payHeadId = payHeadId;
    }

    public BigDecimal getPayHeadId() {
        return payHeadId;
    }

    public void setPayHeadId(BigDecimal payHeadId) {
        this.payHeadId = payHeadId;
    }

    public Long getTotalQty() {
        return totalQty;
    }

    public void setTotalQty(Long totalQty) {
        this.totalQty = totalQty;
    }

    public BigDecimal getTotalAmount() {
        return totalAmount;
    }

    public void setTotalAmount(BigDecimal totalAmount) {
        this.totalAmount = totalAmount;
    }

    public Date getCreateDate() {
        return createDate;
    }

    public void setCreateDate(Date createDate) {
        this.createDate = createDate;
    }

    public String getCreateUser() {
        return createUser;
    }

    public void setCreateUser(String createUser) {
        this.createUser = createUser;
    }

    public GlSystemType getSystem() {
        return system;
    }

    public void setSystem(GlSystemType system) {
        this.system = system;
    }

    public List<GlIndividualPay> getIndividualPayDetailList() {
        return individualPayDetailList;
    }

    public void setIndividualPayDetailList(List<GlIndividualPay> individualPayDetailList) {
        this.individualPayDetailList = individualPayDetailList;
    }

    public Date getSendToBankDate() {
        return sendToBankDate;
    }

    public void setSendToBankDate(Date sendToBankDate) {
        this.sendToBankDate = sendToBankDate;
    }

    public String getSendToBankUser() {
        return sendToBankUser;
    }

    public void setSendToBankUser(String sendToBankUser) {
        this.sendToBankUser = sendToBankUser;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public GlSubsystemType getSubSystem() {
        return subSystem;
    }

    public void setSubSystem(GlSubsystemType subSystem) {
        this.subSystem = subSystem;
    }

    public String getListDesc() {
        return listDesc;
    }

    public void setListDesc(String listDesc) {
        this.listDesc = listDesc;
    }

}
