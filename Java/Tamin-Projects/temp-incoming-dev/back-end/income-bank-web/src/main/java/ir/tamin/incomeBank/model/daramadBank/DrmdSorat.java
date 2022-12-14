/**
 *
 * @author m_salami
 */
package ir.tamin.incomeBank.model.daramadBank;

import java.io.Serializable;
import java.math.BigInteger;
import javax.persistence.Column;
import javax.persistence.EmbeddedId;
import javax.persistence.Entity;
import javax.persistence.Table;
import javax.validation.constraints.NotNull;

@Entity
@Table(name = "DRMD_SORAT")
public class DrmdSorat implements Serializable {
    
    private static final long serialVersionUID = 1L;
    @EmbeddedId
    DrmdSoratPK drmdSoratPK;
    @NotNull
    @Column(name = "SORAT_ROW")
    private Integer soratRow;
    @NotNull
    @Column(name = "SORAT_DATE")
    private String soratDate;
    @NotNull
    @Column(name = "SORAT_ORDPAY")
    private String soratOrdPay;
    @NotNull
    @Column(name = "SORAT_RCVTYPE")
    private String soratRcvType;
    @NotNull
    @Column(name = "SORAT_RCVNO")
    private String soratRcvNo;
    @Column(name = "SORAT_ATTRIB")
    private String soratAttrib;
    @Column(name = "SORAT_MDATE")
    private String soratMdate;
    @Column(name = "SORAT_RETU")
    private String soratRetu;
    @Column(name = "SORAT_PASS")
    private String soratPass;
    @Column(name = "SORAT_COMMENT")
    private String soratComment;
    @Column(name = "CREATEUID")
    private String createUid;
    @Column(name = "CREATEDT")
    private String createDate;
    @Column(name = "SORAT_RADIF")
    private String soratRadif;
    @Column(name = "SORAT_MANDEH")
    private BigInteger soratMandeh;
    @Column(name = "EDITUID")
    private String editUid;
    @Column(name = "EDITDT")
    private String editDate;
    @Column(name = "SORAT_BANK")
    private String soratBank;
    @Column(name = "SORAT_PRICE1")
    private Long soratPrice1;
    @Column(name = "SORAT_PRICE2")
    private Long soratPrice2;
    @Column(name = "SORAT_DESC")
    private String soratDesc;
    @Column(name = "SORAT_EFDATE")
    private String soratEfDate;
    @Column(name = "BRCH_CODE")
    private String brchCode;
    
    public DrmdSorat() {
    }
    
    public DrmdSoratPK getDrmdSoratPK() {
        return drmdSoratPK;
    }
    
    public Integer getSoratRow() {
        return soratRow;
    }
    
    public void setSoratRow(Integer soratRow) {
        this.soratRow = soratRow;
    }
    
    public String getSoratDate() {
        return soratDate;
    }
    
    public void setSoratDate(String soratDate) {
        this.soratDate = soratDate;
    }
    
    public String getSoratAttrib() {
        return soratAttrib;
    }
    
    public void setSoratAttrib(String soratAttrib) {
        this.soratAttrib = soratAttrib;
    }
    
    public String getSoratMdate() {
        return soratMdate;
    }
    
    public void setSoratMdate(String soratMdate) {
        this.soratMdate = soratMdate;
    }
    
    public String getSoratRetu() {
        return soratRetu;
    }
    
    public void setSoratRetu(String soratRetu) {
        this.soratRetu = soratRetu;
    }
    
    public String getSoratPass() {
        return soratPass;
    }
    
    public void setSoratPass(String soratPass) {
        this.soratPass = soratPass;
    }
    
    public String getSoratComment() {
        return soratComment;
    }
    
    public void setSoratComment(String soratComment) {
        this.soratComment = soratComment;
    }
    
    public String getSoratRadif() {
        return soratRadif;
    }
    
    public void setSoratRadif(String soratRadif) {
        this.soratRadif = soratRadif;
    }
    
    public BigInteger getSoratMandeh() {
        return soratMandeh;
    }
    
    public void setSoratMandeh(BigInteger soratMandeh) {
        this.soratMandeh = soratMandeh;
    }
    
    public String getSoratBank() {
        return soratBank;
    }
    
    public void setSoratBank(String soratBank) {
        this.soratBank = soratBank;
    }
    
    public Long getSoratPrice1() {
        return soratPrice1;
    }
    
    public void setSoratPrice1(Long soratPrice1) {
        this.soratPrice1 = soratPrice1;
    }
    
    public Long getSoratPrice2() {
        return soratPrice2;
    }
    
    public void setSoratPrice2(Long soratPrice2) {
        this.soratPrice2 = soratPrice2;
    }
    
    public String getSoratDesc() {
        return soratDesc;
    }
    
    public void setSoratDesc(String soratDesc) {
        this.soratDesc = soratDesc;
    }
    
    public String getBrchCode() {
        return brchCode;
    }
    
    public void setBrchCode(String brchCode) {
        this.brchCode = brchCode;
    }
    
    public void setDrmdSoratPK(DrmdSoratPK drmdSoratPK) {
        this.drmdSoratPK = drmdSoratPK;
    }
    
    public void setSoratOrdPay(String soratOrdPay) {
        this.soratOrdPay = soratOrdPay;
    }
    
    public void setSoratRcvType(String soratRcvType) {
        this.soratRcvType = soratRcvType;
    }
    
    public void setSoratRcvNo(String soratRcvNo) {
        this.soratRcvNo = soratRcvNo;
    }
    
    public void setCreateUid(String createUid) {
        this.createUid = createUid;
    }
    
    public void setCreateDate(String createDate) {
        this.createDate = createDate;
    }
    
    public void setEditUid(String editUid) {
        this.editUid = editUid;
    }
    
    public void setEditDate(String editDate) {
        this.editDate = editDate;
    }
    
    public void setSoratEfDate(String soratEfDate) {
        this.soratEfDate = soratEfDate;
    }
    
    public String getSoratOrdPay() {
        return soratOrdPay;
    }
    
    public String getSoratRcvType() {
        return soratRcvType;
    }
    
    public String getSoratRcvNo() {
        return soratRcvNo;
    }
    
    public String getCreateUid() {
        return createUid;
    }
    
    public String getCreateDate() {
        return createDate;
    }
    
    public String getEditUid() {
        return editUid;
    }
    
    public String getEditDate() {
        return editDate;
    }
    
    public String getSoratEfDate() {
        return soratEfDate;
    }
      
}
