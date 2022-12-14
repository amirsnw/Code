/**
 *
 * @author h_riazat
 */
package ir.tamin.incomeBank.model.daramadBank;

import java.io.Serializable;
import javax.persistence.Column;
import javax.persistence.EmbeddedId;
import javax.persistence.Entity;
import javax.persistence.Table;
import javax.persistence.Transient;

@Entity
@Table(name = "VWDRMDLISTDISK")
public class VwDrmdListDisk implements Serializable {

    private static final long serialVersionUID = 1L;
    @EmbeddedId
    VwDrmdListDiskPK vwDrmdListDiskPK;
    @Column(name = "CARD_DATE")
    private String cardDate;
    @Column(name = "CARD_ORDPAY")
    private String cardOrdPay;
    @Column(name = "RCVTYPDESC")
    private String rcvTypDesc;
    @Column(name = "CARD_RCVNO")
    private String cardRcvNo;
    @Column(name = "SORAT_PRICE1")
    private Long soratPrice1;
    @Column(name = "SORAT_PRICE2")
    private Long soratPrice2;
    @Column(name = "SORAT_MANDEH")
    private Long soratMandeh;
    @Column(name = "SORAT_BANK")
    private String soratBank;
    @Column(name = "SORAT_DESC")
    private String soratDesc;
    @Column(name = "SORAT_COMMENT")
    private String soratComment;
    @Column(name = "CARD_RCVTYPE")
    private String cardRcvType;
    @Column(name = "CARD_PASS")
    private String cardPass;
    @Column(name = "YEARMON")
    private String yearMon;
    @Column(name = "PASSFLG")
    private String passFlg;
    @Column(name = "CARD_TYPE")
    private String cardType;
    @Column(name = "BANK_RADIF")
    private String bankRadif;
    @Column(name = "BANK_HESAB")
    private String bankHesab;
    @Column(name = "REPETFLG")
    private Character repetFlg;
    @Column(name = "SORAT_EFDATE")
    private String soratEfDate;
    @Column(name = "BRCH_CODE")
    private String brchCode;
    @Transient
    private String pk;
    @Transient
    private String dateCardDate;
    @Transient
    private String dateSoratEfDate;

    @Transient
    private String sumPrice1;
    @Transient
    private String sumPrice2;
    @Transient
    private String sumRest;
    
    public VwDrmdListDisk() {
    }

    public VwDrmdListDiskPK getVwDrmdListDiskPK() {
        return vwDrmdListDiskPK;
    }

    public String getSumPrice1() {
        return sumPrice1;
    }

    public void setSumPrice1(String sumPrice1) {
        this.sumPrice1 = sumPrice1;
    }

    public String getSumPrice2() {
        return sumPrice2;
    }

    public void setSumPrice2(String sumPrice2) {
        this.sumPrice2 = sumPrice2;
    }

    public String getSumRest() {
        return sumRest;
    }

    public void setSumRest(String sumRest) {
        this.sumRest = sumRest;
    }

    public String getPK() {
        return vwDrmdListDiskPK.getBrchCode() + vwDrmdListDiskPK.getCardRow();
    }

    public void setCardOrdPay(String cardOrdPay) {
        this.cardOrdPay = cardOrdPay;
    }

    public void setRcvTypDesc(String rcvTypDesc) {
        this.rcvTypDesc = rcvTypDesc;
    }

    public void setCardRcvNo(String cardRcvNo) {
        this.cardRcvNo = cardRcvNo;
    }

    public void setCardRcvType(String cardRcvType) {
        this.cardRcvType = cardRcvType;
    }

    public void setYearMon(String yearMon) {
        this.yearMon = yearMon;
    }

    public void setPassFlg(String passFlg) {
        this.passFlg = passFlg;
    }

    public void setSoratEfDate(String soratEfDate) {
        this.soratEfDate = soratEfDate;
    }

    public String getCardOrdPay() {
        return cardOrdPay;
    }

    public String getRcvTypDesc() {
        return rcvTypDesc;
    }

    public String getCardRcvNo() {
        return cardRcvNo;
    }

    public String getCardRcvType() {
        return cardRcvType;
    }

    public String getYearMon() {
        return yearMon;
    }

    public String getPassFlg() {
        return passFlg;
    }

    public Character getRepetFlg() {
        return repetFlg;
    }

    public String getSoratEfDate() {
        return soratEfDate;
    }

    public String getCardDate() {
        return cardDate;
    }

    public void setCardDate(String cardDate) {
        this.cardDate = cardDate;
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

    public Long getSoratMandeh() {
        return soratMandeh;
    }

    public void setSoratMandeh(Long soratMandeh) {
        this.soratMandeh = soratMandeh;
    }

    public String getSoratBank() {
        return soratBank;
    }

    public void setSoratBank(String soratBank) {
        this.soratBank = soratBank;
    }

    public String getSoratDesc() {
        return soratDesc;
    }

    public void setSoratDesc(String soratDesc) {
        this.soratDesc = soratDesc;
    }

    public String getSoratComment() {
        return soratComment;
    }

    public void setSoratComment(String soratComment) {
        this.soratComment = soratComment;
    }

    public String getCardPass() {
        return cardPass;
    }

    public void setCardPass(String cardPass) {
        this.cardPass = cardPass;
    }

    public String getCardType() {
        return cardType;
    }

    public void setCardType(String cardType) {
        this.cardType = cardType;
    }

    public String getBankRadif() {
        return bankRadif;
    }

    public void setBankRadif(String bankRadif) {
        this.bankRadif = bankRadif;
    }

    public String getBankHesab() {
        return bankHesab;
    }

    public void setBankHesab(String bankHesab) {
        this.bankHesab = bankHesab;
    }

    public String getBrchCode() {
        return brchCode;
    }

    public void setBrchCode(String brchCode) {
        this.brchCode = brchCode;
    }

    public void setRepetFlg(Character repetFlg) {
        this.repetFlg = repetFlg;
    }
    
    public String getDateCardDate() {
        if (getCardDate() != null && getCardDate().length() == 8) {
            String dateCardDate = getCardDate().substring(0, 4) + "/"
                    + getCardDate().substring(4, 6) + "/"
                    + getCardDate().substring(6, 8);
            return dateCardDate;
        } else {
            return null;
        }
    }

    public String getDateSoratEfDate() {
        if (getSoratEfDate() != null && getSoratEfDate().length() == 8) {
            String dateSoratEfDate = getSoratEfDate().substring(0, 4) + "/"
                    + getSoratEfDate().substring(4, 6) + "/"
                    + getSoratEfDate().substring(6, 8);
            return dateSoratEfDate;
        } else {
            return null;
        }
    }

}
