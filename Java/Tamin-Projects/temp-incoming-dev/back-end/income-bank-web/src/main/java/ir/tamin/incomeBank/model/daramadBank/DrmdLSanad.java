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
import lombok.Data;

/**
 *
 * @author e_shoghi
 */
@Entity
@Table(name = "DRMD_LSANAD")
@Data
public class DrmdLSanad implements Serializable {

    @Id
    @Column(name = "VCH_LSMDATE")
    private String lsmDate;
//    @OneToMany(mappedBy = "sanad")
//    @JsonIgnore
//    private List<DrmdLetter> letters;
    @Column(name = "VCH_CARDKHFLG")
    private String cardKhFlag;
    @Column(name = "VCH_CARDKHDATE")
    private String cardKhDate;
    @Column(name = "VCH_CARDKHUID")
    private String cardKhUId;
    @Column(name = "VCH_CARDZIFLG")
    private String cardZiFlag;
    @Column(name = "VCH_CARDZIDATE")
    private String cardZiDate;
    @Column(name = "VCH_CARDZIUID")
    private String cardZiUId;
    @Column(name = "VCH_LSKHFLG")
    private String lsKhFlag;
    @Column(name = "VCH_LSKHDATE")
    private String lsKhDate;
    @Column(name = "VCH_LSKHUID")
    private String lsKhUId;
    @Column(name = "VCH_LSZIFLG")
    private String lsZiFlag;
    @Column(name = "VCH_LSZIDATE")
    private String lsZiDate;
    @Column(name = "VCH_LSZIUID")
    private String lsZiUId;
    @Column(name = "BRCH_CODE")
    private String branchCode;

    public String getLsmDate() {
        return lsmDate;
    }

    public void setLsmDate(String lsmDate) {
        this.lsmDate = lsmDate;
    }

    public String getCardKhFlag() {
        return cardKhFlag;
    }

    public void setCardKhFlag(String cardKhFlag) {
        this.cardKhFlag = cardKhFlag;
    }

    public String getCardKhDate() {
        return cardKhDate;
    }

    public void setCardKhDate(String cardKhDate) {
        this.cardKhDate = cardKhDate;
    }

    public String getCardKhUId() {
        return cardKhUId;
    }

    public void setCardKhUId(String cardKhUId) {
        this.cardKhUId = cardKhUId;
    }

    public String getCardZiFlag() {
        return cardZiFlag;
    }

    public void setCardZiFlag(String cardZiFlag) {
        this.cardZiFlag = cardZiFlag;
    }

    public String getCardZiDate() {
        return cardZiDate;
    }

    public void setCardZiDate(String cardZiDate) {
        this.cardZiDate = cardZiDate;
    }

    public String getCardZiUId() {
        return cardZiUId;
    }

    public void setCardZiUId(String cardZiUId) {
        this.cardZiUId = cardZiUId;
    }

    public String getLsKhFlag() {
        return lsKhFlag;
    }

    public void setLsKhFlag(String lsKhFlag) {
        this.lsKhFlag = lsKhFlag;
    }

    public String getLsKhDate() {
        return lsKhDate;
    }

    public void setLsKhDate(String lsKhDate) {
        this.lsKhDate = lsKhDate;
    }

    public String getLsKhUId() {
        return lsKhUId;
    }

    public void setLsKhUId(String lsKhUId) {
        this.lsKhUId = lsKhUId;
    }

    public String getLsZiFlag() {
        return lsZiFlag;
    }

    public void setLsZiFlag(String lsZiFlag) {
        this.lsZiFlag = lsZiFlag;
    }

    public String getLsZiDate() {
        return lsZiDate;
    }

    public void setLsZiDate(String lsZiDate) {
        this.lsZiDate = lsZiDate;
    }

    public String getLsZiUId() {
        return lsZiUId;
    }

    public void setLsZiUId(String lsZiUId) {
        this.lsZiUId = lsZiUId;
    }

    public String getBranchCode() {
        return branchCode;
    }

    public void setBranchCode(String branchCode) {
        this.branchCode = branchCode;
    }
}
