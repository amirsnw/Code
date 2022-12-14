/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package ir.tamin.incomeBank.model.daramadBank;

import com.fasterxml.jackson.annotation.JsonBackReference;
import ir.tamin.incomeBank.util.DateUtilsFramework;
import java.io.Serializable;
import java.util.Date;
import java.util.List;
import javax.persistence.Column;
import javax.persistence.EmbeddedId;
import javax.persistence.Entity;
import javax.persistence.JoinColumn;
import javax.persistence.JoinColumns;
import javax.persistence.OneToMany;
import javax.persistence.OneToOne;
import javax.persistence.Table;
import javax.persistence.Transient;
import lombok.Data;

/**
 *
 * @author e_shoghi
 */
@Table(name = "DRMD_PSNTHAMKVCH")
@Entity
@Data
public class CoWorkersPoursantaj implements Serializable {

    private static final long serialVersionUID = 1l;
    @EmbeddedId
    private BajListHeaderPK coWorkersPoursantajPK;
//    @OneToOne
//    @JsonBackReference
//    @JoinColumns({
//        @JoinColumn(name = "CWS_DBTNO", referencedColumnName = "CWS_DBTNO", insertable = false, updatable = false),
//        @JoinColumn(name = "CTN_CLMSEQ", referencedColumnName = "CTN_CLMSEQ", insertable = false, updatable = false),
//        @JoinColumn(name = "brch_code", referencedColumnName = "brch_code", insertable = false, updatable = false)
//    })
//    private BajListHeader bajListHeader;
//    @OneToMany
//    @JoinColumns({
//        @JoinColumn(name = "CWS_DBTNO", referencedColumnName = "CWS_DBTNO", insertable = false, updatable = false),
//        @JoinColumn(name = "CTN_CLMSEQ", referencedColumnName = "CTN_CLMSEQ", insertable = false, updatable = false),
//        @JoinColumn(name = "brch_code", referencedColumnName = "brch_code", insertable = false, updatable = false)
//    })
//    private List<TechnicalCalculationDetail> technicalCalculationDetail;
    @Column(name = "VCH_DATE", nullable = false)
    private String vouchDate;
    @Column(name = "VCH_AMOUNT", nullable = false)
    private Long amount;
    @Column(name = "VCH_PSNT1")
    private Long PSNT1;
    @Column(name = "VCH_PSNT7")
    private Long PSNT7;
    @Column(name = "VCH_ACCFLAG")
    private Character accFlag;
    @Column(name = "VCH_TYPE", nullable = false)
    private Character type;
    @Column(name = "CREATEUID", nullable = false)
    private String createUID;
    @Column(name = "CREATEDT", nullable = false)
    private String createDate;
    @Column(name = "VCH_PSNT08")
    private Long PSNT08;
    @Column(name = "VCH_PSNT5")
    private Long PSNT5;
    @Column(name = "VCH_PSNT06")
    private Long PSNT06;
    @Column(name = "VCH_PSNT4")
    private Long PSNT4;
    

    public Date getVouchDate(){
        return this.vouchDate != null && this.vouchDate.trim() != "" ? DateUtilsFramework.parse(vouchDate, "yyyyMM") : null;
    }

}
