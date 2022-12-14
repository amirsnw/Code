/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package ir.tamin.incomeBank.model.baseinfo;

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
@Table(name = "baseinfo.TB_BNKBRANCH")
@XmlRootElement
public class BankBranch implements Serializable {
    private static final long serialVersionUID = 1L;
    @EmbeddedId
    protected BankBranchPK tbBnkbranchPK;
    @Basic(optional = false)
    @NotNull
    @Size(min = 1, max = 100)
    @Column(name = "BNKBRHNAME")
    private String bnkbrhname;
    @Size(max = 300)
    @Column(name = "BNKBRHADR")
    private String bnkbrhadr;
    @Size(max = 20)
    @Column(name = "BNKBRHTEL")
    private String bnkbrhtel;
    @Basic(optional = false)
    @NotNull
    @Column(name = "STATUS")
    private Character status;
    @Basic(optional = false)
    @NotNull
    @Size(min = 1, max = 8)
    @Column(name = "STATUSSTDATE")
    private String statusstdate;
    
    @Transient
    private String bankBranchCodeDesc;

    @Transient
    private String bnkbrhcode;

    @Transient
    private String bankcode;

    public BankBranch() {
    }

    public BankBranch(BankBranchPK tbBnkbranchPK) {
        this.tbBnkbranchPK = tbBnkbranchPK;
    }

    public BankBranch(BankBranchPK tbBnkbranchPK, String bnkbrhname, Character status, String statusstdate) {
        this.tbBnkbranchPK = tbBnkbranchPK;
        this.bnkbrhname = bnkbrhname;
        this.status = status;
        this.statusstdate = statusstdate;
    }

    public BankBranch(String bankcode, String bnkbrhcode) {
        this.tbBnkbranchPK = new BankBranchPK(bankcode, bnkbrhcode);
    }

    public String getBankBranchCodeDesc() {
        return bankBranchCodeDesc;
    }

    public void setBankBranchCodeDesc(String bankBranchCodeDesc) {
        this.bankBranchCodeDesc = bankBranchCodeDesc;
    }

    public String getBnkbrhcode() {
        return bnkbrhcode;
    }

    public void setBnkbrhcode(String bnkbrhcode) {
        this.bnkbrhcode = bnkbrhcode;
    }

    public String getBankcode() {
        return bankcode;
    }

    public void setBankcode(String bankcode) {
        this.bankcode = bankcode;
    }
    
    public BankBranchPK getTbBnkbranchPK() {
        return tbBnkbranchPK;
    }

    public void setTbBnkbranchPK(BankBranchPK tbBnkbranchPK) {
        this.tbBnkbranchPK = tbBnkbranchPK;
    }

    public String getBnkbrhname() {
        return bnkbrhname;
    }

    public void setBnkbrhname(String bnkbrhname) {
        this.bnkbrhname = bnkbrhname;
    }

    public String getBnkbrhadr() {
        return bnkbrhadr;
    }

    public void setBnkbrhadr(String bnkbrhadr) {
        this.bnkbrhadr = bnkbrhadr;
    }

    public String getBnkbrhtel() {
        return bnkbrhtel;
    }

    public void setBnkbrhtel(String bnkbrhtel) {
        this.bnkbrhtel = bnkbrhtel;
    }

    public Character getStatus() {
        return status;
    }

    public void setStatus(Character status) {
        this.status = status;
    }

    public String getStatusstdate() {
        return statusstdate;
    }

    public void setStatusstdate(String statusstdate) {
        this.statusstdate = statusstdate;
    }

    @Override
    public int hashCode() {
        int hash = 0;
        hash += (tbBnkbranchPK != null ? tbBnkbranchPK.hashCode() : 0);
        return hash;
    }

    @Override
    public boolean equals(Object object) {
        // TODO: Warning - this method won't work in the case the id fields are not set
        if (!(object instanceof BankBranch)) {
            return false;
        }
        BankBranch other = (BankBranch) object;
        if ((this.tbBnkbranchPK == null && other.tbBnkbranchPK != null) || (this.tbBnkbranchPK != null && !this.tbBnkbranchPK.equals(other.tbBnkbranchPK))) {
            return false;
        }
        return true;
    }

    @Override
    public String toString() {
        return "ir.tamin.incomeBank.model.baseinfo.TbBnkbranch[ tbBnkbranchPK=" + tbBnkbranchPK + " ]";
    }
    
}
