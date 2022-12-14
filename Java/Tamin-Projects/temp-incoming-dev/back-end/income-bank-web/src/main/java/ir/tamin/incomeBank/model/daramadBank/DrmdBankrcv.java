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
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;
import javax.xml.bind.annotation.XmlRootElement;

/**
 *
 * @author f_fotuhi
 */
@Entity
@Table(name = "DRMD_BANKRCV")
@XmlRootElement
@NamedQueries({
    @NamedQuery(name = "DrmdBankrcv.findAll", query = "SELECT d FROM DrmdBankrcv d"),
    @NamedQuery(name = "DrmdBankrcv.findByBankrcvDatcard", query = "SELECT d FROM DrmdBankrcv d WHERE d.bankrcvDatcard = :bankrcvDatcard"),
    @NamedQuery(name = "DrmdBankrcv.findByBankrcvNohav", query = "SELECT d FROM DrmdBankrcv d WHERE d.bankrcvNohav = :bankrcvNohav"),
    @NamedQuery(name = "DrmdBankrcv.findByBankrcvDathav", query = "SELECT d FROM DrmdBankrcv d WHERE d.bankrcvDathav = :bankrcvDathav"),
    @NamedQuery(name = "DrmdBankrcv.findByBankrcvPrice", query = "SELECT d FROM DrmdBankrcv d WHERE d.bankrcvPrice = :bankrcvPrice"),
    @NamedQuery(name = "DrmdBankrcv.findByCreateuid", query = "SELECT d FROM DrmdBankrcv d WHERE d.createuid = :createuid"),
    @NamedQuery(name = "DrmdBankrcv.findByCreatedt", query = "SELECT d FROM DrmdBankrcv d WHERE d.createdt = :createdt"),
    @NamedQuery(name = "DrmdBankrcv.findByBankRadif", query = "SELECT d FROM DrmdBankrcv d WHERE d.bankRadif = :bankRadif")})
public class DrmdBankrcv implements Serializable {

    private static final long serialVersionUID = 1L;
    @EmbeddedId
    private DrmdBankrcvPK drmdBankrcvPK;
    
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
    @Basic(optional = false)
    @NotNull
    @Column(name = "BANKRCV_PRICE")
    private long bankrcvPrice;
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
    @Column(name = "BANK_RADIF")
    private String bankRadif;

     public DrmdBankrcv() {
    }

    public DrmdBankrcv(DrmdBankrcvPK drmdBankrcvPK) {
        this.drmdBankrcvPK = drmdBankrcvPK;
    }

    public DrmdBankrcvPK getDrmdBankrcvPK() {
        return drmdBankrcvPK;
    }

    public void setDrmdBankrcvPK(DrmdBankrcvPK drmdBankrcvPK) {
        this.drmdBankrcvPK = drmdBankrcvPK;
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

    public long getBankrcvPrice() {
        return bankrcvPrice;
    }

    public void setBankrcvPrice(long bankrcvPrice) {
        this.bankrcvPrice = bankrcvPrice;
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

    public String getBankRadif() {
        return bankRadif;
    }

    public void setBankRadif(String bankRadif) {
        this.bankRadif = bankRadif;
    }
}
