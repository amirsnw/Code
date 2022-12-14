/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package ir.tamin.incomeBank.model.daramadBank;

import java.io.Serializable;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;
import javax.validation.constraints.NotNull;

/**
 *
 * @author f_fotuhi
 */
@Entity
@Table(name = "DRMD_LETTEROK")
public class DrmdLetterOK implements Serializable {

    private static final long serialVersionUID = 1L;
    @Id
    @NotNull
    @Column(name = "LETTER_SERIAL")
    private String letterSerial;
    @Column(name = "LETTER_STAT")
    private String letterStat;
    @Column(name = "CREATEUID")
    private String createuid;
    @Column(name = "CREATEDT")
    private String createdt;
    @Column(name = "LET_ORDPAY")
    private String letOrdpay;
    @Column(name = "CONFIRMID")
    private String confirmid;
    @Column(name = "CONFIRMDT")
    private String confirmdt;
    @Column(name = "BRCH_CODE")
    private String brchCode;

    public DrmdLetterOK() {
    }

    public DrmdLetterOK(String letterSerial) {
        this.letterSerial = letterSerial;
    }

    public String getLetterSerial() {
        return letterSerial;
    }

    public void setLetterSerial(String letterSerial) {
        this.letterSerial = letterSerial;
    }

    public String getLetterStat() {
        return letterStat;
    }

    public void setLetterStat(String letterStat) {
        this.letterStat = letterStat;
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

    public String getLetOrdpay() {
        return letOrdpay;
    }

    public void setLetOrdpay(String letOrdpay) {
        this.letOrdpay = letOrdpay;
    }

    public String getConfirmid() {
        return confirmid;
    }

    public void setConfirmid(String confirmid) {
        this.confirmid = confirmid;
    }

    public String getConfirmdt() {
        return confirmdt;
    }

    public void setConfirmdt(String confirmdt) {
        this.confirmdt = confirmdt;
    }

    public String getBrchCode() {
        return brchCode;
    }

    public void setBrchCode(String brchCode) {
        this.brchCode = brchCode;
    }

    @Override
    public int hashCode() {
        int hash = 0;
        hash += (letterSerial != null ? letterSerial.hashCode() : 0);
        return hash;
    }

    @Override
    public boolean equals(Object object) {
        // TODO: Warning - this method won't work in the case the id fields are not set
        if (!(object instanceof DrmdLetterOK)) {
            return false;
        }
        DrmdLetterOK other = (DrmdLetterOK) object;
        if ((this.letterSerial == null && other.letterSerial != null) || (this.letterSerial != null && !this.letterSerial.equals(other.letterSerial))) {
            return false;
        }
        return true;
    }

    @Override
    public String toString() {
        return "ir.tamin.incomeBank.model.daramadBank.DrmdLetterOK[ letterSerial=" + letterSerial + " ]";
    }

}
