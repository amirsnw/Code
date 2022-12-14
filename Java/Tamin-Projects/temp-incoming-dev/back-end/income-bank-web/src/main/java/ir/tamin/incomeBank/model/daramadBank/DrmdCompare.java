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
@Table(name = "DRMD_COMPARE")
@XmlRootElement
public class DrmdCompare implements Serializable {

    private static final long serialVersionUID = 1L;
    @EmbeddedId
    protected DrmdComparePK drmdComparePK;
    @Size(max = 1)
    @Column(name = "COMP_FLAG")
    private String compFlag;
    @Column(name = "BOOK_VERIFCNT")
    private Integer bookVerifcnt;
    @Column(name = "BOOK_REMALLCNT")
    private Integer bookRemallcnt;
    @Column(name = "CARD_REMALLCNT")
    private Integer cardRemallcnt;
    @Column(name = "BOOK_REMCURCNT")
    private Integer bookRemcurcnt;
    @Column(name = "CARD_REMCURCNT")
    private Integer cardRemcurcnt;
    @Size(max = 1)
    @Column(name = "VOUCH_FLAG")
    private String vouchFlag;
    @Size(max = 7)
    @Column(name = "VOUCH_DATE")
    private String vouchDate;
    @Size(max = 20)
    @Column(name = "VOUCH_UID")
    private String vouchUid;
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

    @Transient
    private String createDate;

    @Transient
    private String decodeVouchDate;

    public DrmdCompare() {
    }

    public DrmdCompare(DrmdComparePK drmdComparePK) {
        this.drmdComparePK = drmdComparePK;
    }

    public DrmdCompare(DrmdComparePK drmdComparePK, String createuid, String createdt, String brchCode) {
        this.drmdComparePK = drmdComparePK;
        this.createuid = createuid;
        this.createdt = createdt;
    }

    public DrmdCompare(String compMdate, short compRow) {
        this.drmdComparePK = new DrmdComparePK(compMdate, compRow);
    }

    public DrmdComparePK getDrmdComparePK() {
        return drmdComparePK;
    }

    public void setDrmdComparePK(DrmdComparePK drmdComparePK) {
        this.drmdComparePK = drmdComparePK;
    }

    public String getDecodeVouchDate() {
        return decodeVouchDate;
    }

    public void setDecodeVouchDate(String decodeVouchDate) {
        this.decodeVouchDate = decodeVouchDate;
    }

    public String getCompFlag() {
        return compFlag;
    }

    public void setCompFlag(String compFlag) {
        this.compFlag = compFlag;
    }

    public Integer getBookVerifcnt() {
        return bookVerifcnt;
    }

    public void setBookVerifcnt(Integer bookVerifcnt) {
        this.bookVerifcnt = bookVerifcnt;
    }

    public Integer getBookRemallcnt() {
        return bookRemallcnt;
    }

    public void setBookRemallcnt(Integer bookRemallcnt) {
        this.bookRemallcnt = bookRemallcnt;
    }

    public Integer getCardRemallcnt() {
        return cardRemallcnt;
    }

    public void setCardRemallcnt(Integer cardRemallcnt) {
        this.cardRemallcnt = cardRemallcnt;
    }

    public Integer getBookRemcurcnt() {
        return bookRemcurcnt;
    }

    public void setBookRemcurcnt(Integer bookRemcurcnt) {
        this.bookRemcurcnt = bookRemcurcnt;
    }

    public Integer getCardRemcurcnt() {
        return cardRemcurcnt;
    }

    public void setCardRemcurcnt(Integer cardRemcurcnt) {
        this.cardRemcurcnt = cardRemcurcnt;
    }

    public String getVouchFlag() {
        return vouchFlag;
    }

    public void setVouchFlag(String vouchFlag) {
        this.vouchFlag = vouchFlag;
    }

    public String getVouchDate() {
        return vouchDate;
    }

    public void setVouchDate(String vouchDate) {
        this.vouchDate = vouchDate;
    }

    public String getVouchUid() {
        return vouchUid;
    }

    public void setVouchUid(String vouchUid) {
        this.vouchUid = vouchUid;
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

    public String getCreateDate() {
        return createDate;
    }

    public void setCreateDate(String createDate) {
        this.createDate = createDate;
    }

    @Override
    public int hashCode() {
        int hash = 0;
        hash += (drmdComparePK != null ? drmdComparePK.hashCode() : 0);
        return hash;
    }

    @Override
    public boolean equals(Object object) {
        // TODO: Warning - this method won't work in the case the id fields are not set
        if (!(object instanceof DrmdCompare)) {
            return false;
        }
        DrmdCompare other = (DrmdCompare) object;
        if ((this.drmdComparePK == null && other.drmdComparePK != null) || (this.drmdComparePK != null && !this.drmdComparePK.equals(other.drmdComparePK))) {
            return false;
        }
        return true;
    }

    @Override
    public String toString() {
        return "ir.tamin.incomeBank.model.daramadBank.DrmdCompare[ drmdComparePK=" + drmdComparePK + " ]";
    }

}
