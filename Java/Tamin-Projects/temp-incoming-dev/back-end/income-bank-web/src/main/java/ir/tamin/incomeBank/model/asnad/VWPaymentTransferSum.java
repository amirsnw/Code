package ir.tamin.incomeBank.model.asnad;

import java.io.Serializable;
import java.math.BigDecimal;
import java.math.BigInteger;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.NamedQueries;
import javax.persistence.NamedQuery;
import javax.persistence.Table;

/**
 *
 * @author s_maknooni
 */
@Entity
@Table(name = "VW_PAYMENTTRANSFER_SUM")
@NamedQueries({
    @NamedQuery(name = "VWPaymentTransferSum.getSelectedRecords", query = "select t from VWPaymentTransferSum t where t.sumId in :sumIds ")    
})
public class VWPaymentTransferSum implements Serializable {

    private static final long serialVersionUID = 1L;
    @Id
    @Column(name = "SUM_ID")
    private BigDecimal sumId;
    @Column(name = "CUST_TYPE")
    private Character custType;
    @Column(name = "CUST_NO")
    private String custNo;
    @Column(name = "AMOUNT")
    private BigInteger amount;
    @Column(name = "EFFECTIVEDATE")
    private String effectivedate;
    @Column(name = "SHENASEPAYMENT")
    private String shenasepayment;
    @Column(name = "UNIT_CODE")
    private String unitCode;
    @Column(name = "NOS_MONTH")
    private String nosMonth;
    @Column(name = "NOS_YEAR")
    private String nosYear;
    @Column(name = "SHENASEH_NO")
    private String shenaseNo;
    @Column(name = "SHEBA")
    private String destinationAccNo;
    @Column(name = "FNAME")
    private String destinationFName;
    @Column(name = "LNAME")
    private String destinationLName;
    @Column(name = "FATHERNAME")
    private String destinationFatherName;
    @Column(name = "IDNO")
    private String destinationIDNo;
    @Column(name = "NATIONALCODE")
    private String destinationNationCode;
    @Column(name = "MOBILEPHONE")
    private String destinationMobileNo;
    @Column(name = "ALALAMOUNT")
    private BigInteger alalamount;
    @Column(name = "STATUS")
    private String status;

    public BigDecimal getSumId() {
        return sumId;
    }

    public void setSumId(BigDecimal sumId) {
        this.sumId = sumId;
    }

    public Character getCustType() {
        return custType;
    }

    public void setCustType(Character custType) {
        this.custType = custType;
    }

    public String getCustNo() {
        return custNo;
    }

    public void setCustNo(String custNo) {
        this.custNo = custNo;
    }

    public BigInteger getAmount() {
        return amount;
    }

    public void setAmount(BigInteger amount) {
        this.amount = amount;
    }

    public String getEffectivedate() {
        return effectivedate;
    }

    public void setEffectivedate(String effectivedate) {
        this.effectivedate = effectivedate;
    }

    public String getShenasepayment() {
        return shenasepayment;
    }

    public void setShenasepayment(String shenasepayment) {
        this.shenasepayment = shenasepayment;
    }

    public String getUnitCode() {
        return unitCode;
    }

    public void setUnitCode(String unitCode) {
        this.unitCode = unitCode;
    }

    public String getNosMonth() {
        return nosMonth;
    }

    public void setNosMonth(String nosMonth) {
        this.nosMonth = nosMonth;
    }

    public String getNosYear() {
        return nosYear;
    }

    public void setNosYear(String nosYear) {
        this.nosYear = nosYear;
    }

    public String getShenaseNo() {
        return shenaseNo;
    }

    public void setShenaseNo(String shenaseNo) {
        this.shenaseNo = shenaseNo;
    }

    public String getDestinationAccNo() {
        return destinationAccNo;
    }

    public void setDestinationAccNo(String destinationAccNo) {
        this.destinationAccNo = destinationAccNo;
    }

    public String getDestinationFName() {
        return destinationFName;
    }

    public void setDestinationFName(String destinationFName) {
        this.destinationFName = destinationFName;
    }

    public String getDestinationLName() {
        return destinationLName;
    }

    public void setDestinationLName(String destinationLName) {
        this.destinationLName = destinationLName;
    }

    public String getDestinationFatherName() {
        return destinationFatherName;
    }

    public void setDestinationFatherName(String destinationFatherName) {
        this.destinationFatherName = destinationFatherName;
    }

    public String getDestinationIDNo() {
        return destinationIDNo;
    }

    public void setDestinationIDNo(String destinationIDNo) {
        this.destinationIDNo = destinationIDNo;
    }

    public String getDestinationNationCode() {
        return destinationNationCode;
    }

    public void setDestinationNationCode(String destinationNationCode) {
        this.destinationNationCode = destinationNationCode;
    }

    public String getDestinationMobileNo() {
        return destinationMobileNo;
    }

    public void setDestinationMobileNo(String destinationMobileNo) {
        this.destinationMobileNo = destinationMobileNo;
    }

    public BigInteger getAlalamount() {
        return alalamount;
    }

    public void setAlalamount(BigInteger alalamount) {
        this.alalamount = alalamount;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

}
