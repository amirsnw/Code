/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package ir.tamin.incomeBank.model.daramadBank;

import java.io.Serializable;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.NamedQueries;
import javax.persistence.NamedQuery;
import javax.persistence.SequenceGenerator;
import javax.persistence.Table;
import lombok.Data;
import org.hibernate.annotations.GenericGenerator;

/**
 *
 * @author e_shoghi
 */
@Entity
@Table(name = "DRMD_ISSUED_LETTER")
@Data
@NamedQueries({
    @NamedQuery(name = "getCurrentLetters", query = "select i from IssuedLetter i where i.lettersGroupId = :lettersGroupId")
})
public class IssuedLetter implements Serializable {

    private static final long serialVersionUID = 1l;
    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "ID_SEQU_GENERATOR")
    @SequenceGenerator(name = "ID_SEQU_GENERATOR", sequenceName = "ISSUED_LETTER_SEQ", allocationSize=1)
//    @GenericGenerator(name = "seq", strategy = "increment")
    @Column(name = "seq_voucher", unique = true, nullable = false)
    private Long voucherId;
    @Column(name = "LET_ROW")
    private String letterRow;
    @Column(name = "LETTER_SERIAL")
    private String letterSerial;
    @Column(name = "LET_KOL")
    private String letterCol;
    @Column(name = "LET_MOIN")
    private String letterMoin;
    @Column(name = "LET_DEBIT")
    private Long letterDebit;
    @Column(name = "LET_CREDIT")
    private Long letterCredit;
    @Column(name = "LET_COMMENT")
    private String letterComment;
    @Column(name = "CREATEUID")
    private String createUId;
    @Column(name = "CREATEDT")
    private String createDate;
    @Column(name = "TYPE_DOC")
    private String type;
    @Column(name = "VALUE")
    private String value;
    @Column(name = "LETTER_DATE")
    private String letterDate;
    @Column(name = "BRCH_CODE")
    private String branchCode;
    @Column(name = "LETTERS_GROUP_ID")
    private String lettersGroupId;
    
    public Long getLetterDebit(){
        return this.letterDebit != null ? this.letterDebit : 0l;
    }
    public Long getLetterCredit(){
        return this.letterCredit != null ? this.letterCredit : 0l;
    }

    public static long getSerialVersionUID() {
        return serialVersionUID;
    }

    public Long getVoucherId() {
        return voucherId;
    }

    public void setVoucherId(Long voucherId) {
        this.voucherId = voucherId;
    }

    public String getLetterRow() {
        return letterRow;
    }

    public void setLetterRow(String letterRow) {
        this.letterRow = letterRow;
    }

    public String getLetterSerial() {
        return letterSerial;
    }

    public void setLetterSerial(String letterSerial) {
        this.letterSerial = letterSerial;
    }

    public String getLetterCol() {
        return letterCol;
    }

    public void setLetterCol(String letterCol) {
        this.letterCol = letterCol;
    }

    public String getLetterMoin() {
        return letterMoin;
    }

    public void setLetterMoin(String letterMoin) {
        this.letterMoin = letterMoin;
    }

    public void setLetterDebit(Long letterDebit) {
        this.letterDebit = letterDebit;
    }

    public void setLetterCredit(Long letterCredit) {
        this.letterCredit = letterCredit;
    }

    public String getLetterComment() {
        return letterComment;
    }

    public void setLetterComment(String letterComment) {
        this.letterComment = letterComment;
    }

    public String getCreateUId() {
        return createUId;
    }

    public void setCreateUId(String createUId) {
        this.createUId = createUId;
    }

    public String getCreateDate() {
        return createDate;
    }

    public void setCreateDate(String createDate) {
        this.createDate = createDate;
    }

    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type;
    }

    public String getValue() {
        return value;
    }

    public void setValue(String value) {
        this.value = value;
    }

    public String getLetterDate() {
        return letterDate;
    }

    public void setLetterDate(String letterDate) {
        this.letterDate = letterDate;
    }

    public String getBranchCode() {
        return branchCode;
    }

    public void setBranchCode(String branchCode) {
        this.branchCode = branchCode;
    }

    public String getLettersGroupId() {
        return lettersGroupId;
    }

    public void setLettersGroupId(String lettersGroupId) {
        this.lettersGroupId = lettersGroupId;
    }
}
