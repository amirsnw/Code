/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package ir.tamin.incomeBank.model.daramadBank;

import java.io.Serializable;
import javax.persistence.Basic;
import javax.persistence.Column;
import javax.persistence.Embeddable;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;

/**
 *
 * @author m_salami
 */
@Embeddable
public class LetCardPK implements Serializable {
    @Basic(optional = false)
    @NotNull
    @Column(name = "CARD_ROW")
    private int cardRow;
    @Basic(optional = false)
    @NotNull
    @Size(min = 1, max = 13)
    @Column(name = "LETTER_SERIAL")
    private String letterSerial;

    public LetCardPK() {
    }

    public LetCardPK(int cardRow, String letterSerial) {
        this.cardRow = cardRow;
        this.letterSerial = letterSerial;
    }

    public int getCardRow() {
        return cardRow;
    }

    public void setCardRow(int cardRow) {
        this.cardRow = cardRow;
    }

    public String getLetterSerial() {
        return letterSerial;
    }

    public void setLetterSerial(String letterSerial) {
        this.letterSerial = letterSerial;
    }

    @Override
    public int hashCode() {
        int hash = 0;
        hash += (int) cardRow;
        hash += (letterSerial != null ? letterSerial.hashCode() : 0);
        return hash;
    }

    @Override
    public boolean equals(Object object) {
        // TODO: Warning - this method won't work in the case the id fields are not set
        if (!(object instanceof LetCardPK)) {
            return false;
        }
        LetCardPK other = (LetCardPK) object;
        if (this.cardRow != other.cardRow) {
            return false;
        }
        if ((this.letterSerial == null && other.letterSerial != null) || (this.letterSerial != null && !this.letterSerial.equals(other.letterSerial))) {
            return false;
        }
        return true;
    }

    @Override
    public String toString() {
        return "ir.tamin.incomeBank.model.daramadBank.LetCardPK[ cardRow=" + cardRow + ", letterSerial=" + letterSerial + " ]";
    }
    
}
