/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package ir.tamin.incomeBank.model.daramadBank;

import ir.tamin.incomeBank.model.daramadBank.enums.RcvTypeEnum;
import java.io.Serializable;
import javax.persistence.Basic;
import javax.persistence.Column;
import javax.persistence.EmbeddedId;
import javax.persistence.Entity;
import javax.persistence.Table;
import javax.persistence.Transient;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;
import javax.xml.bind.annotation.XmlRootElement;
import lombok.Data;

/**
 *
 * @author m_salami
 */
@Entity
@Table(name = "DRMD_CARD")
@XmlRootElement
@Data
public class DrmdCard implements Serializable {

    private static final long serialVersionUID = 1L;
    @EmbeddedId
    private DrmdCardPK drmdCardPK;

    @Basic(optional = false)
    @NotNull
    @Size(min = 1, max = 8)
    @Column(name = "CARD_DATE")
    private String cardDate;
    @Size(max = 15)
    @Column(name = "CARD_ORDPAY")
    private String cardOrdpay;
    @Basic(optional = false)
    @NotNull
    @Size(min = 1, max = 1)
    @Column(name = "CARD_RCVTYPE")
    private String cardRcvtype;
    @Size(max = 15)
    @Column(name = "CARD_RCVNO")
    private String cardRcvno;
    @Basic(optional = false)
    @NotNull
    @Column(name = "CARD_PRICE")
    private long cardPrice;
    @Size(max = 1)
    @Column(name = "CARD_ATTRIB")
    private String cardAttrib;
    @Size(max = 8)
    @Column(name = "CARD_MDATE")
    private String cardMdate;
    @Size(max = 1)
    @Column(name = "CARD_RETU")
    private String cardRetu;
    @Size(max = 1)
    @Column(name = "CARD_PASS")
    private String cardPass;
    @Size(max = 50)
    @Column(name = "CARD_COMMENT")
    private String cardComment;
    @Basic(optional = false)
    @NotNull
    @Size(min = 1, max = 20)
    @Column(name = "CREATEUID")
    private String createuid;
    @Basic(optional = false)
    @NotNull
    @Size(min = 1, max = 7)
    @Column(name = "CREATEDT")
    private String createdt;
    @Size(max = 2)
    @Column(name = "CARD_RADIF")
    private String cardRadif;
    @Size(max = 1)
    @Column(name = "CARD_TYPE")
    private String cardType;
    @Size(max = 8)
    @Column(name = "CARD_EFDATE")
    private String cardEfdate;

    @Transient
    private Long cardDateTimeStamp;

    @Transient
    private Boolean allowDublicatedRcvNo;
    
    @Transient
    private String cardRcvTypeDesc;
    
    public String getCardRcvTypeDesc(){
        return RcvTypeEnum.find(this.getCardRcvtype()) != null ? RcvTypeEnum.find(this.getCardRcvtype()).getName() : null;
    }

    public static long getSerialVersionUID() {
        return serialVersionUID;
    }

    public DrmdCardPK getDrmdCardPK() {
        return drmdCardPK;
    }

    public void setDrmdCardPK(DrmdCardPK drmdCardPK) {
        this.drmdCardPK = drmdCardPK;
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

    public String getCardRcvtype() {
        return cardRcvtype;
    }

    public void setCardRcvtype(String cardRcvtype) {
        this.cardRcvtype = cardRcvtype;
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

    public String getCardMdate() {
        return cardMdate;
    }

    public void setCardMdate(String cardMdate) {
        this.cardMdate = cardMdate;
    }

    public String getCardRetu() {
        return cardRetu;
    }

    public void setCardRetu(String cardRetu) {
        this.cardRetu = cardRetu;
    }

    public String getCardPass() {
        return cardPass;
    }

    public void setCardPass(String cardPass) {
        this.cardPass = cardPass;
    }

    public String getCardComment() {
        return cardComment;
    }

    public void setCardComment(String cardComment) {
        this.cardComment = cardComment;
    }

    public String getCreateuid() {
        return createuid;
    }

    public void setCreateuid(String createuid) {
        this.createuid = createuid;
    }

    public String getCreatedt() {
        return createdt;
    }

    public void setCreatedt(String createdt) {
        this.createdt = createdt;
    }

    public String getCardRadif() {
        return cardRadif;
    }

    public void setCardRadif(String cardRadif) {
        this.cardRadif = cardRadif;
    }

    public String getCardType() {
        return cardType;
    }

    public void setCardType(String cardType) {
        this.cardType = cardType;
    }

    public String getCardEfdate() {
        return cardEfdate;
    }

    public void setCardEfdate(String cardEfdate) {
        this.cardEfdate = cardEfdate;
    }

    public Long getCardDateTimeStamp() {
        return cardDateTimeStamp;
    }

    public void setCardDateTimeStamp(Long cardDateTimeStamp) {
        this.cardDateTimeStamp = cardDateTimeStamp;
    }

    public Boolean getAllowDublicatedRcvNo() {
        return allowDublicatedRcvNo;
    }

    public void setAllowDublicatedRcvNo(Boolean allowDublicatedRcvNo) {
        this.allowDublicatedRcvNo = allowDublicatedRcvNo;
    }
}
