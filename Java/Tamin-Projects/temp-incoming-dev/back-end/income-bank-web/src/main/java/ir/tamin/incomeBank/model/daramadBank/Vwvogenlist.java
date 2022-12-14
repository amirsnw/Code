/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package ir.tamin.incomeBank.model.daramadBank;

import java.io.Serializable;
import java.math.BigInteger;
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
@Table(name = "VWVOGENLIST")
@XmlRootElement
@NamedQueries({
    @NamedQuery(name = "Vwvogenlist.findAll", query = "SELECT v FROM Vwvogenlist v"),
    @NamedQuery(name = "Vwvogenlist.findByYearmon", query = "SELECT v FROM Vwvogenlist v WHERE v.yearmon = :yearmon"),
    @NamedQuery(name = "Vwvogenlist.findByBankrcvDatcard", query = "SELECT v FROM Vwvogenlist v WHERE v.bankrcvDatcard = :bankrcvDatcard"),
    @NamedQuery(name = "Vwvogenlist.findByBankrcvNohav", query = "SELECT v FROM Vwvogenlist v WHERE v.bankrcvNohav = :bankrcvNohav"),
    @NamedQuery(name = "Vwvogenlist.findByBankrcvDathav", query = "SELECT v FROM Vwvogenlist v WHERE v.bankrcvDathav = :bankrcvDathav"),
    @NamedQuery(name = "Vwvogenlist.findByBankrcvPrice", query = "SELECT v FROM Vwvogenlist v WHERE v.bankrcvPrice = :bankrcvPrice"),
    @NamedQuery(name = "Vwvogenlist.findByBankRadif", query = "SELECT v FROM Vwvogenlist v WHERE v.bankRadif = :bankRadif")})
public class Vwvogenlist implements Serializable {
    private static final long serialVersionUID = 1L;
    
    @EmbeddedId
    private DrmdBankrcvPK drmdBankrcvPK;
    
    @Size(max = 6)
    @Column(name = "YEARMON")
    private String yearmon;
    @Basic(optional = false)
    @NotNull
    @Size(min = 1, max = 6)
    @Column(name = "BANKRCV_DATCARD")
    private String bankrcvDatcard;
    @Basic(optional = false)
    @NotNull
    @Size(min = 1, max = 15)
    @Column(name = "BANKRCV_NOHAV")
    private String bankrcvNohav;
    @Basic(optional = false)
    @NotNull
    @Size(min = 1, max = 8)
    @Column(name = "BANKRCV_DATHAV")
    private String bankrcvDathav;
    @Column(name = "BANKRCV_PRICE")
    private BigInteger bankrcvPrice;
    @Size(max = 2)
    @Column(name = "BANK_RADIF")
    private String bankRadif;
    
    @Transient
    private long datHavTimeStamp;
    
    @Transient
    private long datCardTimeStamp;

    public Vwvogenlist() {
    }

    public Vwvogenlist(DrmdBankrcvPK drmdBankrcvPK) {
        this.drmdBankrcvPK = drmdBankrcvPK;
    }


    public String getYearmon() {
        return yearmon;
    }

    public void setYearmon(String yearmon) {
        this.yearmon = yearmon;
    }

    public String getBankrcvDatcard() {
        return bankrcvDatcard;
    }

    public void setBankrcvDatcard(String bankrcvDatcard) {
        this.bankrcvDatcard = bankrcvDatcard;
    }

    public String getBankrcvNohav() {
        return bankrcvNohav;
    }

    public void setBankrcvNohav(String bankrcvNohav) {
        this.bankrcvNohav = bankrcvNohav;
    }

    public String getBankrcvDathav() {
        return bankrcvDathav;
    }

    public void setBankrcvDathav(String bankrcvDathav) {
        this.bankrcvDathav = bankrcvDathav;
    }

    public BigInteger getBankrcvPrice() {
        return bankrcvPrice;
    }

    public void setBankrcvPrice(BigInteger bankrcvPrice) {
        this.bankrcvPrice = bankrcvPrice;
    }

    public String getBankRadif() {
        return bankRadif;
    }

    public void setBankRadif(String bankRadif) {
        this.bankRadif = bankRadif;
    }

    public DrmdBankrcvPK getDrmdBankrcvPK() {
        return drmdBankrcvPK;
    }

    public void setDrmdBankrcvPK(DrmdBankrcvPK drmdBankrcvPK) {
        this.drmdBankrcvPK = drmdBankrcvPK;
    }

    public long getDatHavTimeStamp() {
        return datHavTimeStamp;
    }

    public void setDatHavTimeStamp(long datHavTimeStamp) {
        this.datHavTimeStamp = datHavTimeStamp;
    }

    public long getDatCardTimeStamp() {
        return datCardTimeStamp;
    }

    public void setDatCardTimeStamp(long datCardTimeStamp) {
        this.datCardTimeStamp = datCardTimeStamp;
    }
}
