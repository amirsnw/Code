/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package ir.tamin.incomeBank.model.daramadBank;

import ir.tamin.incomeBank.model.baseinfo.Workshop;
import ir.tamin.incomeBank.util.DateUtilsFramework;
import java.io.Serializable;
import java.util.Date;
import java.util.List;
import javax.persistence.Column;
import javax.persistence.EmbeddedId;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.JoinColumn;
import javax.persistence.JoinColumns;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;
import javax.persistence.OneToOne;
import javax.persistence.Table;
import javax.persistence.Transient;
import javax.validation.constraints.NotNull;
import lombok.Data;
import org.eclipse.persistence.annotations.JoinFetch;
import org.eclipse.persistence.annotations.JoinFetchType;
import org.hibernate.annotations.Fetch;
import org.hibernate.annotations.FetchMode;

/**
 *
 * @author e_shoghi
 */
@Table(name = "BAJ_LSTHED")
@Entity
@Data
public class BajListHeader implements Serializable {

    private static final long serialVersionUID = 1l;
    @EmbeddedId
    private BajListHeaderPK bajListHeaderPK;

    @OneToOne
    @JoinColumns({
        @JoinColumn(name = "CWS_DBTNO", referencedColumnName = "CWS_DBTNO", insertable = false, updatable = false),
        @JoinColumn(name = "CTN_CLMSEQ", referencedColumnName = "CTN_CLMSEQ", insertable = false, updatable = false),
        @JoinColumn(name = "brch_code", referencedColumnName = "brch_code", insertable = false, updatable = false)
    })
    private CoWorkersPoursantaj coWorkersPoursantaj;

    @OneToMany
    @JoinColumns({
        @JoinColumn(name = "CWS_DBTNO", referencedColumnName = "CWS_DBTNO", insertable = false, updatable = false),
        @JoinColumn(name = "CTN_CLMSEQ", referencedColumnName = "CTN_CLMSEQ", insertable = false, updatable = false),
        @JoinColumn(name = "brch_code", referencedColumnName = "brch_code", insertable = false, updatable = false)
    }) 
    private List<TechnicalCalculationDetail> technicalCalculationDetail;

    @Column(name = "SNDLISTMETHODCODE")
    private String sendListMethodCode;

    @Column(name = "LISTSTATUSCODE")
    private String listStatusCode;

    @ManyToOne
    @JoinColumns({
        @JoinColumn(name = "RWSHID", referencedColumnName = "RWSHID", insertable = false, updatable = false),
        @JoinColumn(name = "BRCH_CODE", referencedColumnName = "BRCH_CODE", insertable = false, updatable = false)})
    private Workshop workshop;

    @ManyToOne()
    @JoinColumn(name = "LISTTYPECODE")
    private ListType listType;

    @Column(name = "LSH_PYMSEQ")
    private String contractNumber;

    @Column(name = "LSH_LSTYER")
    @NotNull
    private String year;

    @Column(name = "LSH_LSTMNT")
    @NotNull
    private String month;

    @Column(name = "LSH_LSTDAT")
    private String listDate;

    @Column(name = "LSH_LSTPAG")
    private Long listPage;

    @Column(name = "LSH_ISDNUM")
    private Long employeesCount;

    //دستمزد و مزایای مشمول و غیرمشمول 
    @Column(name = "LSH_TOTWAG")
    private Long totalWageAndBenefit;

    //جمع مبالغ حق بیمه
    @Column(name = "LSH_TOTAMT")
    private Long totalAmountInsurance;

    //دستمزد و مزایای  مشمول
    @Column(name = "LSH_ISVWAG")
    private Long totalInclusiveWageAndBenefit;

    //مزایای ماهانه مشمول
    @Column(name = "LSH_ISVPRM")
    private Long inclusiveBenefit;

    @Column(name = "LSH_LSTSTA")
    private String lstSTA;

    @Column(name = "CREATEUID")
    private String createdBy;

    @Column(name = "CREATEDT")
    private String creationTime;

    @Column(name = "LSH_LSTSEQ")
    @NotNull
    private String listIndex;

    @Column(name = "LSH_CLSNO")
    private String clasorNumber;

    @Column(name = "LSH_CLSCMT")
    private String clasorComment;

    @Column(name = "LSH_CONFUID")
    private String confirmedBy;

    @Column(name = "LSH_CONFDT")
    private String confirmTime;

    @Column(name = "LSH_ISDCON")
    private Long totalEmployeePremium;

    @Column(name = "LSH_EMPCON")
    private Long totalEmployerPremium;

    @Column(name = "LSH_UMPCON")
    private Long totalUnemploymentPremium;

    @Column(name = "LSH_HRDCON")
    private Long hardJobPremium;

    @ManyToOne()
    @JoinColumn(name = "DEBITSTEPCODE")
    private DebitStep debitStep;

    @ManyToOne()
    @JoinColumn(name = "DEBITSTATCODE")
    private DebitStatus debitStatus;

    @Column(name = "WORKSHOP_HISTORY_ID")
    private String workshopHistoryId;

    @Transient
    private Long price;

    @Transient
    private String vouchType;

    @Transient
    private String percent1;

    /*public String getPercent1() {
        Long p = 0l;
        for (TechnicalCalculationDetail detail : technicalCalculationDetail) {
            if ("2".equals(detail.getTecSubjectType()) && "1".equals(detail.getSpcConSubType())) {
                p += detail.getPourcenatge() != null ? detail.getPourcenatge() : 0l;
            }
        }
        long p2 = !this.getPercent8().equals("0") ? Math.round(Long.parseLong(this.getPercent8()) / 8) : 0l;
        return (p + p2) + "";
    }
    @Transient
    private String percent7;

    public String getPercent7() {
        Long p = 0l;
        for (TechnicalCalculationDetail detail : technicalCalculationDetail) {
            if ("2".equals(detail.getTecSubjectType()) && "2".equals(detail.getSpcConSubType())) {
                p += detail.getPourcenatge() != null ? detail.getPourcenatge() : 0l;
            }
        }
        long p2 = !this.getPercent8().equals("0") && !this.getPercent1().equals("0") ? Long.parseLong(this.getPercent8()) - Long.parseLong(this.getPercent1()) : 0l;
        long p3 = !this.getPercent78().equals("0") && !this.getPercent08().equals("0") ? Long.parseLong(this.getPercent78()) - Long.parseLong(this.getPercent08()) : 0l;
        long p4 = !this.getPercent76().equals("0") ? Math.round(Long.parseLong(this.getPercent76()) * 7 / 7.6) : 0l;
        return (p + p2 + p3 + p4) + "";
    }
    @Transient
    private String percent8;

    public String getPercent8() {
        Long p = 0l;
        for (TechnicalCalculationDetail detail : technicalCalculationDetail) {
            if ("2".equals(detail.getTecSubjectType()) && "3".equals(detail.getSpcConSubType())) {
                p += detail.getPourcenatge() != null ? detail.getPourcenatge() : 0l;
            }
        }
        return p + "";
    }
    @Transient
    private String percent78;

    public String getPercent78() {
        Long p = 0l;
        for (TechnicalCalculationDetail detail : technicalCalculationDetail) {
            if ("2".equals(detail.getTecSubjectType()) && "4".equals(detail.getSpcConSubType())) {
                p += detail.getPourcenatge() != null ? detail.getPourcenatge() : 0l;
            }
        }
        return p + "";
    }
    @Transient
    private String percent08;

    public String getPercent08() {
        Long p = 0l;
        for (TechnicalCalculationDetail detail : technicalCalculationDetail) {
            if ("2".equals(detail.getTecSubjectType()) && "6".equals(detail.getSpcConSubType())) {
                p += detail.getPourcenatge() != null ? detail.getPourcenatge() : 0l;
            }
        }
        long p2 = !this.getPercent78().equals("0") ? Math.round(Long.parseLong(this.getPercent78()) * 0.8 / 7.8) : 0;
        long p3 = !this.getPercent58().equals("0") ? Math.round(Long.parseLong(this.getPercent58()) * 0.8 / 5.8) : 0l;
        return (p + p2 + p3) + "";
    }
    @Transient
    private String percent5;

    public String getPercent5() {
        Long p = 0l;
        for (TechnicalCalculationDetail detail : technicalCalculationDetail) {
            if ("2".equals(detail.getTecSubjectType()) && "7".equals(detail.getSpcConSubType())) {
                p += detail.getPourcenatge() != null ? detail.getPourcenatge() : 0l;
            }
        }
        long p2 = !this.getPercent56().equals("0") ? Math.round(Long.parseLong(this.getPercent56()) * 5 / 5.6) : 0l;
        long p3 = !this.getPercent58().equals("0") && !this.getPercent08().equals("0") ? Long.parseLong(this.getPercent58()) - Long.parseLong(this.getPercent08()) : 0l;
        return (p + p2 + p3) + "";
    }
    @Transient
    private String percent56;

    public String getPercent56() {
        Long p = 0l;
        for (TechnicalCalculationDetail detail : technicalCalculationDetail) {
            if ("2".equals(detail.getTecSubjectType()) && "8".equals(detail.getSpcConSubType())) {
                p += detail.getPourcenatge() != null ? detail.getPourcenatge() : 0l;
            }
        }
        return p + "";
    }
    @Transient
    private String percent58;

    public String getPercent58() {
        Long p = 0l;
        for (TechnicalCalculationDetail detail : technicalCalculationDetail) {
            if ("2".equals(detail.getTecSubjectType()) && "9".equals(detail.getSpcConSubType())) {
                p += detail.getPourcenatge() != null ? detail.getPourcenatge() : 0l;
            }
        }
        return p + "";
    }
    @Transient
    private String percent76;

    public String getPercent76() {
        Long p = 0l;
        for (TechnicalCalculationDetail detail : technicalCalculationDetail) {
            if ("2".equals(detail.getTecSubjectType()) && "0".equals(detail.getSpcConSubType())) {
                p += detail.getPourcenatge() != null ? detail.getPourcenatge() : 0l;
            }
        }
        return p + "";
    }
    @Transient
    private String percent4;

    public String getPercent4() {
        Long p = 0l;
        for (TechnicalCalculationDetail detail : technicalCalculationDetail) {
            if ("2".equals(detail.getTecSubjectType()) && "a".equals(detail.getSpcConSubType())) {
                p += detail.getPourcenatge() != null ? detail.getPourcenatge() : 0l;
            }
        }
        long p2 = !this.getPercent46().equals("0") ? Math.round(Long.parseLong(this.getPercent46()) * 4 / 4.6) : 0l;
        return (p + p2) + "";
    }
    @Transient
    private String percent46;

    public String getPercent46() {
        Long p = 0l;
        for (TechnicalCalculationDetail detail : technicalCalculationDetail) {
            if ("2".equals(detail.getTecSubjectType()) && "b".equals(detail.getSpcConSubType())) {
                p += detail.getPourcenatge() != null ? detail.getPourcenatge() : 0l;
            }
        }
        return p + "";
    }
    @Transient
    private String percent06;

    public String getPercent06() {
        long p = !this.getPercent56().equals("0") && !this.getPercent5().equals("0") ? Long.parseLong(this.getPercent56()) - Long.parseLong(this.getPercent5()) : 0l;
        long p2 = !this.getPercent76().equals("0") && !this.getPercent7().equals("0") ? Long.parseLong(this.getPercent76()) - Long.parseLong(this.getPercent7()) : 0l;
        long p3 = !this.getPercent46().equals("0") && !this.getPercent4().equals("0") ? Long.parseLong(this.getPercent46()) - Long.parseLong(this.getPercent4()) : 0l;
        return (p + p2 + p3) + "";
    }

    public String getVouchType() {
        if (this.technicalCalculationDetail != null && this.technicalCalculationDetail.get(0) != null) {
            switch (this.technicalCalculationDetail.get(0).getTecSubjectType()) {
                case "2":
                    return "1";
                default:
                    return "2";
            }
        }
        return "";
    }

    public Date getListDate() {
        return this.listDate != null && this.listDate.trim() != "" ? DateUtilsFramework.parse(this.listDate, "yyyyMMdd") : null;
    }

    public Long getPrice() {
        Long thePrice = 0l;
        if ("2".equals(this.technicalCalculationDetail.get(0).getTecSubjectType())) {
            for (TechnicalCalculationDetail technicalCalculationDetail1 : technicalCalculationDetail) {
                thePrice += technicalCalculationDetail1.getPourcenatge();
            }
        } else {
            for (TechnicalCalculationDetail technicalCalculationDetail1 : technicalCalculationDetail) {
                thePrice += (technicalCalculationDetail1.getEmployerInsuranceCON()
                        + technicalCalculationDetail1.getEmployeePremium()
                        + technicalCalculationDetail1.getUnEmploymentInsuranceCON());
            }
        }
        return this.coWorkersPoursantaj != null && this.coWorkersPoursantaj.getAmount() != null ? this.coWorkersPoursantaj.getAmount() : thePrice;
    }*/
}
