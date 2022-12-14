package ir.tamin.incomeBank.model.contradictionReport;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;
import java.math.BigDecimal;

@Entity
@Table(name = "VWMOGHLIST")
public class ContradictionReport {

    @Id
    @Column(name = "ORD_ORDNO")
    private String orderNo;

    @Column(name = "GL_DATE")
    private String daftarDate;

    @Column(name = "SORAT_BANK")
    private String billBank;

    @Column(name = "SORAT_AMT")
    private BigDecimal billAmount;

    @Column(name = "SORAT_DATE")
    private String billDate;

    @Column(name = "GL_BANK")
    private String daftarBank;

    @Column(name = "GL_AMT")
    private BigDecimal daftarAmount;

    @Column(name = "DIFF_AMT")
    private BigDecimal diffAmount;

    @Column(name = "BRCH_CODE")
    private String branchCode;

    @Column(name = "SHOW_TYPE")
    private String type;

    @Column(name = "YEAR")
    private String year;

    @Column(name = "MON")
    private String month;

    public ContradictionReport() {
    }

    public ContradictionReport(String orderNo, String daftarDate, String billBank, BigDecimal billAmount,
                               String billDate, String daftarBank, BigDecimal daftarAmount, BigDecimal diffAmount,
                               String branchCode, String type, String year, String month) {
        this.orderNo = orderNo;
        this.daftarDate = daftarDate;
        this.billBank = billBank;
        this.billAmount = billAmount;
        this.billDate = billDate;
        this.daftarBank = daftarBank;
        this.daftarAmount = daftarAmount;
        this.diffAmount = diffAmount;
        this.branchCode = branchCode;
        this.type = type;
        this.year = year;
        this.month = month;
    }

    public String getOrderNo() {
        return orderNo;
    }

    public void setOrderNo(String orderNo) {
        this.orderNo = orderNo;
    }

    public String getDaftarDate() {
        return daftarDate;
    }

    public void setDaftarDate(String daftarDate) {
        this.daftarDate = daftarDate;
    }

    public String getBillBank() {
        return billBank;
    }

    public void setBillBank(String billBank) {
        this.billBank = billBank;
    }

    public BigDecimal getBillAmount() {
        return billAmount;
    }

    public void setBillAmount(BigDecimal billAmount) {
        this.billAmount = billAmount;
    }

    public String getBillDate() {
        return billDate;
    }

    public void setBillDate(String billDate) {
        this.billDate = billDate;
    }

    public String getDaftarBank() {
        return daftarBank;
    }

    public void setDaftarBank(String daftarBank) {
        this.daftarBank = daftarBank;
    }

    public BigDecimal getDaftarAmount() {
        return daftarAmount;
    }

    public void setDaftarAmount(BigDecimal daftarAmount) {
        this.daftarAmount = daftarAmount;
    }

    public BigDecimal getDiffAmount() {
        return diffAmount;
    }

    public void setDiffAmount(BigDecimal diffAmount) {
        this.diffAmount = diffAmount;
    }

    public String getBranchCode() {
        return branchCode;
    }

    public void setBranchCode(String branchCode) {
        this.branchCode = branchCode;
    }

    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type;
    }

    public String getYear() {
        return year;
    }

    public void setYear(String year) {
        this.year = year;
    }

    public String getMonth() {
        return month;
    }

    public void setMonth(String month) {
        this.month = month;
    }
}
