/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package ir.tamin.incomeBank.model.centralPayment;

import java.io.Serializable;
import java.math.BigDecimal;
import java.util.Date;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.NamedQueries;
import javax.persistence.NamedQuery;
import javax.persistence.Table;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;

/**
 *
 * @author s_maknooni
 */
@Entity
@Table(name = "CP_TEMP_BANK_CONTROL_FILE")
@NamedQueries({
    @NamedQuery(name = "TempBankControlFile.getCountByHeadId", query = "select count(d) from TempBankControlFile d where d.payHeadId=:headId") ,
    @NamedQuery(name = "TempBankControlFile.deleteByHeadId", query = "delete from TempBankControlFile d where d.payHeadId=:headId")
})

public class TempBankControlFile implements Serializable {

    private static final long serialVersionUID = 1L;
    @Id
    @Column(name = "PAY_DETAIL_ID")
    private BigDecimal payDetialId;
    @Column(name = "PAY_HEAD_ID")
    private BigDecimal payHeadId;
    @Column(name = "CREATION_TIME")
    @Temporal(TemporalType.TIMESTAMP)
    private Date creationTime;

    public TempBankControlFile() {
    }

    public BigDecimal getPayHeadId() {
        return payHeadId;
    }

    public void setPayHeadId(BigDecimal payHeadId) {
        this.payHeadId = payHeadId;
    }

    public BigDecimal getPayDetialId() {
        return payDetialId;
    }

    public void setPayDetialId(BigDecimal payDetialId) {
        this.payDetialId = payDetialId;
    }

    public Date getCreationTime() {
        return creationTime;
    }

    public void setCreationTime(Date creationTime) {
        this.creationTime = creationTime;
    }

}
