/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package ir.tamin.incomeBank.model.daramadBank;

import java.io.Serializable;
import javax.persistence.Basic;
import javax.persistence.Column;
import javax.persistence.EmbeddedId;
import javax.persistence.Entity;
import javax.persistence.NamedQueries;
import javax.persistence.NamedQuery;
import javax.persistence.Table;
import javax.persistence.Transient;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;
import javax.xml.bind.annotation.XmlRootElement;

/**
 *
 * @author m_salami
 */
@Entity
@Table(name = "DRMD_VWDRMDLISTCARD")
@XmlRootElement
@NamedQueries({
    @NamedQuery(name = "Vwdrmdlistcard.findAll", query = "SELECT v FROM Vwdrmdlistcard v"),
    @NamedQuery(name = "Vwdrmdlistcard.findByCardDate", query = "SELECT v FROM Vwdrmdlistcard v WHERE v.cardDate = :cardDate"),
    @NamedQuery(name = "Vwdrmdlistcard.findByCardOrdpay", query = "SELECT v FROM Vwdrmdlistcard v WHERE v.cardOrdpay = :cardOrdpay"),
    @NamedQuery(name = "Vwdrmdlistcard.findByRcvtypdesc", query = "SELECT v FROM Vwdrmdlistcard v WHERE v.rcvtypdesc = :rcvtypdesc"),
    @NamedQuery(name = "Vwdrmdlistcard.findByCardRcvno", query = "SELECT v FROM Vwdrmdlistcard v WHERE v.cardRcvno = :cardRcvno"),
    @NamedQuery(name = "Vwdrmdlistcard.findByCardPrice", query = "SELECT v FROM Vwdrmdlistcard v WHERE v.cardPrice = :cardPrice"),
    @NamedQuery(name = "Vwdrmdlistcard.findByCardAttrib", query = "SELECT v FROM Vwdrmdlistcard v WHERE v.cardAttrib = :cardAttrib"),
    @NamedQuery(name = "Vwdrmdlistcard.findByLetterSerial", query = "SELECT v FROM Vwdrmdlistcard v WHERE v.letterSerial = :letterSerial"),
    @NamedQuery(name = "Vwdrmdlistcard.findByCardComment", query = "SELECT v FROM Vwdrmdlistcard v WHERE v.cardComment = :cardComment"),
    @NamedQuery(name = "Vwdrmdlistcard.findByCardRcvtype", query = "SELECT v FROM Vwdrmdlistcard v WHERE v.cardRcvtype = :cardRcvtype"),
    @NamedQuery(name = "Vwdrmdlistcard.findByCardPass", query = "SELECT v FROM Vwdrmdlistcard v WHERE v.cardPass = :cardPass"),
    @NamedQuery(name = "Vwdrmdlistcard.findByYearmon", query = "SELECT v FROM Vwdrmdlistcard v WHERE v.yearmon = :yearmon"),
    @NamedQuery(name = "Vwdrmdlistcard.findByPassflg", query = "SELECT v FROM Vwdrmdlistcard v WHERE v.passflg = :passflg"),
    @NamedQuery(name = "Vwdrmdlistcard.findByBankRadif", query = "SELECT v FROM Vwdrmdlistcard v WHERE v.bankRadif = :bankRadif"),
    @NamedQuery(name = "Vwdrmdlistcard.findByBankHesab", query = "SELECT v FROM Vwdrmdlistcard v WHERE v.bankHesab = :bankHesab"),
    @NamedQuery(name = "Vwdrmdlistcard.findByBankname", query = "SELECT v FROM Vwdrmdlistcard v WHERE v.bankname = :bankname"),
    @NamedQuery(name = "Vwdrmdlistcard.findByBnkbrhname", query = "SELECT v FROM Vwdrmdlistcard v WHERE v.bnkbrhname = :bnkbrhname"),
    @NamedQuery(name = "Vwdrmdlistcard.findByCardType", query = "SELECT v FROM Vwdrmdlistcard v WHERE v.cardType = :cardType"),
    @NamedQuery(name = "Vwdrmdlistcard.findByOrdMastcustcode", query = "SELECT v FROM Vwdrmdlistcard v WHERE v.ordMastcustcode = :ordMastcustcode"),
    @NamedQuery(name = "Vwdrmdlistcard.findByMastcustname", query = "SELECT v FROM Vwdrmdlistcard v WHERE v.mastcustname = :mastcustname"),
    @NamedQuery(name = "Vwdrmdlistcard.findByOrdOrdno", query = "SELECT v FROM Vwdrmdlistcard v WHERE v.ordOrdno = :ordOrdno"),
    @NamedQuery(name = "Vwdrmdlistcard.findByOrpCarddate", query = "SELECT v FROM Vwdrmdlistcard v WHERE v.orpCarddate = :orpCarddate"),
    @NamedQuery(name = "Vwdrmdlistcard.findByCardEfdate", query = "SELECT v FROM Vwdrmdlistcard v WHERE v.cardEfdate = :cardEfdate")})
public class Vwdrmdlistcard implements Serializable {

    private static final long serialVersionUID = 1L;

    @EmbeddedId
    private VwdrmdlistcardPK vwdrmdlistcardPK;
    @Basic(optional = false)
    @NotNull
    @Size(min = 1, max = 8)
    @Column(name = "CARD_DATE")
    private String cardDate;
    @Size(max = 15)
    @Column(name = "CARD_ORDPAY")
    private String cardOrdpay;
    @Size(max = 5)
    @Column(name = "RCVTYPDESC")
    private String rcvtypdesc;
    @Size(max = 15)
    @Column(name = "CARD_RCVNO")
    private String cardRcvno;
    @Basic(optional = false)
    @NotNull
    @Column(name = "CARD_PRICE")
    private long cardPrice;
    @Size(max = 7)
    @Column(name = "CARD_ATTRIB")
    private String cardAttrib;
    @Size(max = 13)
    @Column(name = "LETTER_SERIAL")
    private String letterSerial;
    @Size(max = 100)
    @Column(name = "CARD_COMMENT")
    private String cardComment;
    @Basic(optional = false)
    @NotNull
    @Size(min = 1, max = 1)
    @Column(name = "CARD_RCVTYPE")
    private String cardRcvtype;
    @Size(max = 1)
    @Column(name = "CARD_PASS")
    private String cardPass;
    @Size(max = 6)
    @Column(name = "YEARMON")
    private String yearmon;
    @Size(max = 1)
    @Column(name = "PASSFLG")
    private String passflg;
    @Basic(optional = false)
    @NotNull
    @Size(min = 1, max = 2)
    @Column(name = "BANK_RADIF")
    private String bankRadif;
    @Basic(optional = false)
    @NotNull
    @Size(min = 1, max = 20)
    @Column(name = "BANK_HESAB")
    private String bankHesab;
    @Basic(optional = false)
    @NotNull
    @Size(min = 1, max = 100)
    @Column(name = "BANKNAME")
    private String bankname;
    @Basic(optional = false)
    @NotNull
    @Size(min = 1, max = 100)
    @Column(name = "BNKBRHNAME")
    private String bnkbrhname;
    @Size(max = 1)
    @Column(name = "CARD_TYPE")
    private String cardType;
    @Size(max = 10)
    @Column(name = "ORD_MASTCUSTCODE")
    private String ordMastcustcode;
    @Size(max = 4000)
    @Column(name = "MASTCUSTNAME")
    private String mastcustname;
    @Size(max = 13)
    @Column(name = "ORD_ORDNO")
    private String ordOrdno;
    @Size(max = 8)
    @Column(name = "ORP_CARDDATE")
    private String orpCarddate;
    @Size(max = 8)
    @Column(name = "CARD_EFDATE")
    private String cardEfdate;

    @Transient
    private Long cardDateTimeStamp;

    @Transient
    private String pk;

    public String getPk() {
        return vwdrmdlistcardPK.getBrchCode() + Integer.toString(vwdrmdlistcardPK.getCardRow());
    }

    public void setPk(String pk) {
        this.pk = pk;
    }

    public Long getCardDateTimeStamp() {
        return cardDateTimeStamp;
    }

    public void setCardDateTimeStamp(Long cardDateTimeStamp) {
        this.cardDateTimeStamp = cardDateTimeStamp;
    }

    public Vwdrmdlistcard() {
    }

    public VwdrmdlistcardPK getVwdrmdlistcardPK() {
        return vwdrmdlistcardPK;
    }

    public void setVwdrmdlistcardPK(VwdrmdlistcardPK vwdrmdlistcardPK) {
        this.vwdrmdlistcardPK = vwdrmdlistcardPK;
    }

    public String getCardDate() {
        return cardDate;
    }

    public void setCardDate(String cardDate) {
        this.cardDate = cardDate;
    }

    public String getCardOrdpay() {
        return cardOrdpay;
    }

    public void setCardOrdpay(String cardOrdpay) {
        this.cardOrdpay = cardOrdpay;
    }

    public String getRcvtypdesc() {
        return rcvtypdesc;
    }

    public void setRcvtypdesc(String rcvtypdesc) {
        this.rcvtypdesc = rcvtypdesc;
    }

    public String getCardRcvno() {
        return cardRcvno;
    }

    public void setCardRcvno(String cardRcvno) {
        this.cardRcvno = cardRcvno;
    }

    public long getCardPrice() {
        return cardPrice;
    }

    public void setCardPrice(long cardPrice) {
        this.cardPrice = cardPrice;
    }

    public String getCardAttrib() {
        return cardAttrib;
    }

    public void setCardAttrib(String cardAttrib) {
        this.cardAttrib = cardAttrib;
    }

    public String getLetterSerial() {
        return letterSerial;
    }

    public void setLetterSerial(String letterSerial) {
        this.letterSerial = letterSerial;
    }

    public String getCardComment() {
        return cardComment;
    }

    public void setCardComment(String cardComment) {
        this.cardComment = cardComment;
    }

    public String getCardRcvtype() {
        return cardRcvtype;
    }

    public void setCardRcvtype(String cardRcvtype) {
        this.cardRcvtype = cardRcvtype;
    }

    public String getCardPass() {
        return cardPass;
    }

    public void setCardPass(String cardPass) {
        this.cardPass = cardPass;
    }

    public String getYearmon() {
        return yearmon;
    }

    public void setYearmon(String yearmon) {
        this.yearmon = yearmon;
    }

    public String getPassflg() {
        return passflg;
    }

    public void setPassflg(String passflg) {
        this.passflg = passflg;
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

    public String getBankname() {
        return bankname;
    }

    public void setBankname(String bankname) {
        this.bankname = bankname;
    }

    public String getBnkbrhname() {
        return bnkbrhname;
    }

    public void setBnkbrhname(String bnkbrhname) {
        this.bnkbrhname = bnkbrhname;
    }

    public String getCardType() {
        return cardType;
    }

    public void setCardType(String cardType) {
        this.cardType = cardType;
    }

    public String getOrdMastcustcode() {
        return ordMastcustcode;
    }

    public void setOrdMastcustcode(String ordMastcustcode) {
        this.ordMastcustcode = ordMastcustcode;
    }

    public String getMastcustname() {
        return mastcustname;
    }

    public void setMastcustname(String mastcustname) {
        this.mastcustname = mastcustname;
    }

    public String getOrdOrdno() {
        return ordOrdno;
    }

    public void setOrdOrdno(String ordOrdno) {
        this.ordOrdno = ordOrdno;
    }

    public String getOrpCarddate() {
        return orpCarddate;
    }

    public void setOrpCarddate(String orpCarddate) {
        this.orpCarddate = orpCarddate;
    }

    public String getCardEfdate() {
        return cardEfdate;
    }

    public void setCardEfdate(String cardEfdate) {
        this.cardEfdate = cardEfdate;
    }

}
