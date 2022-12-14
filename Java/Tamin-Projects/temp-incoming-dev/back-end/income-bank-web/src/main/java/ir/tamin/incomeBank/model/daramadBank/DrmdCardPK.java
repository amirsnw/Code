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
import javax.persistence.Id;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;

/**
 *
 * @author m_salami
 */
@Embeddable
public class DrmdCardPK implements Serializable{
    
    @Basic(optional = false)
    @NotNull
    @Column(name = "CARD_ROW")
    private Integer cardRow;
    @Basic(optional = false)
    @NotNull
    @Size(min = 1, max = 4)
    @Column(name = "BRCH_CODE")
    private String brchCode;

    public DrmdCardPK(Integer cardRow, String brchCode) {
        this.cardRow = cardRow;
        this.brchCode = brchCode;
    }

    public DrmdCardPK() {
    }
    
    

    public Integer getCardRow() {
        return cardRow;
    }

    public void setCardRow(Integer cardRow) {
        this.cardRow = cardRow;
    }

    public String getBrchCode() {
        return brchCode;
    }

    public void setBrchCode(String brchCode) {
        this.brchCode = brchCode;
    }

    
}
