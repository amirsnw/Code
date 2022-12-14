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
import javax.persistence.NamedQueries;
import javax.persistence.NamedQuery;
import javax.persistence.Table;
import lombok.Data;

/**
 *
 * @author e_shoghi
 */
@Entity
@Table(name = "VOUCHER")
@Data
@NamedQueries({
    @NamedQuery(name = "getCurrentVouchers", query = "select v from Voucher v where v.vouchersGroupId = :vouchersGroupId")
})
public class Voucher implements Serializable{
    @Id
    @Column(name = "SEQ_RADIF")
    private Long id; 
    @Column(name = "COD_KOL")
    private String kolCode;
    @Column(name = "COD_MOI")
    private String codMoi;
    @Column(name = "COD_TAF")
    private String tafCode;
    @Column(name = "COD_JOZ")
    private String jozCode;
    @Column(name = "COD_RIZ")
    private String rizCode;
    @Column(name = "DETAIL_DESC")
    private String detailDesc;
    @Column(name = "AMOU_BED")
    private Long debit;
    @Column(name = "AMOU_BES")
    private Long credit;
    @Column(name = "TYPE_DOC")
    private String voucherType;
    @Column(name = "VALUE")
    private String value;
    @Column(name ="CHECK_DATE")
    private String checkDate;
    @Column(name = "ACCOUNTROW")
    private String accountRow;
    @Column(name = "TMPCOMP_RADIF")
    private String rowComp;
    @Column(name = "TMPCOMP_ACCOUNTRELCODE")
    private String accountRelCode;
    @Column(name = "SOURCE")
    private String source;
    @Column(name = "VOUCHERS_GROUP_ID")
    private String vouchersGroupId;

    public Long getId() {
        return id;
    }

    public String getKolCode() {
        return kolCode;
    }

    public String getCodMoi() {
        return codMoi;
    }

    public String getTafCode() {
        return tafCode;
    }

    public String getJozCode() {
        return jozCode;
    }

    public String getRizCode() {
        return rizCode;
    }

    public String getDetailDesc() {
        return detailDesc;
    }

    public Long getDebit() {
        return debit;
    }

    public Long getCredit() {
        return credit;
    }

    public String getVoucherType() {
        return voucherType;
    }

    public String getValue() {
        return value;
    }

    public String getCheckDate() {
        return checkDate;
    }

    public String getAccountRow() {
        return accountRow;
    }

    public String getRowComp() {
        return rowComp;
    }

    public String getAccountRelCode() {
        return accountRelCode;
    }

    public String getSource() {
        return source;
    }

    public String getVouchersGroupId() {
        return vouchersGroupId;
    }
}
