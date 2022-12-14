/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package ir.tamin.incomeBank.model.receipt;

import java.io.Serializable;
import java.math.BigDecimal;
import javax.persistence.*;
import javax.xml.bind.annotation.XmlRootElement;

/**
 *
 * @author a_khalighi
 */

@Entity
@Table(name = "VWDRMD_GL_DET")
public class ReceiptPaper implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @Column(name = "ORD_ORDNO")
    private String orderNo;

    @Column(name = "ORD_DATE")
    private String orderDate;

    @Column(name = "BRCH_CODE")
    private String branchCode;

    @Column(name = "BRCH_NAME")
    private String branchName;

    @Column(name = "CUST_ID")
    private String customerId;

    @Column(name = "CUST_NAME")
    private String customerName;

    @Column(name = "ORD_AMT")
    private BigDecimal orderAmount;

    @Column(name = "BANK_CODE")
    private String bankCode;

    @Column(name = "BANK_NAME")
    private String bankName;

    @Column(name = "GOVER_AMT")
    private BigDecimal governmentAmount;

    @Column(name = "COUNT_ISU")
    private Integer countIsu;

    @Column(name = "GOV_FLG")
    private String governmentFlag;

    @Column(name = "ADD_DT")
    private String addDate;

    @Column(name = "ORD_TYPE1")
    private String orderType1;

    @Column(name = "TYPE_AMT1")
    private String orderAmount1;

    @Column(name = "ORD_TYPE2")
    private String orderType2;

    @Column(name = "TYPE_AMT2")
    private String orderAmount2;

    @Column(name = "ORD_TYPE3")
    private String orderType3;

    @Column(name = "TYPE_AMT3")
    private String orderAmount3;

    @Column(name = "ORD_TYPE4")
    private String orderType4;

    @Column(name = "TYPE_AMT4")
    private String orderAmount4;

    public static long getSerialVersionUID() {
        return serialVersionUID;
    }

    public String getOrderNo() {
        return orderNo;
    }

    public void setOrderNo(String orderNo) {
        this.orderNo = orderNo;
    }

    public String getOrderDate() {
        return orderDate;
    }

    public void setOrderDate(String orderDate) {
        this.orderDate = orderDate;
    }

    public String getBranchCode() {
        return branchCode;
    }

    public void setBranchCode(String branchCode) {
        this.branchCode = branchCode;
    }

    public String getBranchName() {
        return branchName;
    }

    public void setBranchName(String branchName) {
        this.branchName = branchName;
    }

    public String getCustomerId() {
        return customerId;
    }

    public void setCustomerId(String customerId) {
        this.customerId = customerId;
    }

    public String getCustomerName() {
        return customerName;
    }

    public void setCustomerName(String customerName) {
        this.customerName = customerName;
    }

    public BigDecimal getOrderAmount() {
        return orderAmount;
    }

    public void setOrderAmount(BigDecimal orderAmount) {
        this.orderAmount = orderAmount;
    }

    public String getBankCode() {
        return bankCode;
    }

    public void setBankCode(String bankCode) {
        this.bankCode = bankCode;
    }

    public String getBankName() {
        return bankName;
    }

    public void setBankName(String bankName) {
        this.bankName = bankName;
    }

    public BigDecimal getGovernmentAmount() {
        return governmentAmount;
    }

    public void setGovernmentAmount(BigDecimal governmentAmount) {
        this.governmentAmount = governmentAmount;
    }

    public Integer getCountIsu() {
        return countIsu;
    }

    public void setCountIsu(Integer countIsu) {
        this.countIsu = countIsu;
    }

    public String getGovernmentFlag() {
        return governmentFlag;
    }

    public void setGovernmentFlag(String governmentFlag) {
        this.governmentFlag = governmentFlag;
    }

    public String getAddDate() {
        return addDate;
    }

    public void setAddDate(String addDate) {
        this.addDate = addDate;
    }

    public String getOrderType1() {
        return orderType1;
    }

    public void setOrderType1(String orderType1) {
        this.orderType1 = orderType1;
    }

    public String getOrderAmount1() {
        return orderAmount1;
    }

    public void setOrderAmount1(String orderAmount1) {
        this.orderAmount1 = orderAmount1;
    }

    public String getOrderType2() {
        return orderType2;
    }

    public void setOrderType2(String orderType2) {
        this.orderType2 = orderType2;
    }

    public String getOrderAmount2() {
        return orderAmount2;
    }

    public void setOrderAmount2(String orderAmount2) {
        this.orderAmount2 = orderAmount2;
    }

    public String getOrderType3() {
        return orderType3;
    }

    public void setOrderType3(String orderType3) {
        this.orderType3 = orderType3;
    }

    public String getOrderAmount3() {
        return orderAmount3;
    }

    public void setOrderAmount3(String orderAmount3) {
        this.orderAmount3 = orderAmount3;
    }

    public String getOrderType4() {
        return orderType4;
    }

    public void setOrderType4(String orderType4) {
        this.orderType4 = orderType4;
    }

    public String getOrderAmount4() {
        return orderAmount4;
    }

    public void setOrderAmount4(String orderAmount4) {
        this.orderAmount4 = orderAmount4;
    }

    @Override
    public String toString() {
        return "ReceiptPaper{" +
                "orderNo='" + orderNo + '\'' +
                ", orderDate='" + orderDate + '\'' +
                ", branchCode='" + branchCode + '\'' +
                ", branchName='" + branchName + '\'' +
                ", customerId='" + customerId + '\'' +
                ", customerName='" + customerName + '\'' +
                ", orderAmount=" + orderAmount +
                ", bankCode='" + bankCode + '\'' +
                ", bankName='" + bankName + '\'' +
                ", governmentAmount=" + governmentAmount +
                ", countIsu=" + countIsu +
                ", governmentFlag='" + governmentFlag + '\'' +
                ", addDate='" + addDate + '\'' +
                ", orderType1='" + orderType1 + '\'' +
                ", orderAmount1='" + orderAmount1 + '\'' +
                ", orderType2='" + orderType2 + '\'' +
                ", orderAmount2='" + orderAmount2 + '\'' +
                ", orderType3='" + orderType3 + '\'' +
                ", orderAmount3='" + orderAmount3 + '\'' +
                ", orderType4='" + orderType4 + '\'' +
                ", orderAmount4='" + orderAmount4 + '\'' +
                '}';
    }
}
