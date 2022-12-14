/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package ir.tamin.incomeBank.model.daramadBank;

import java.io.Serializable;
import javax.persistence.Column;
import javax.persistence.EmbeddedId;
import javax.persistence.Entity;
import javax.persistence.Table;
import javax.validation.constraints.NotNull;
import lombok.Data;

/**
 *
 * @author e_shoghi
 */
@Entity
@Table(name = "BAJ_THDDET")
@Data
//@AdditionalCriteria("this.tecSubjectType = '2' or this.workshopIdentity = '686'")//.substring(3,6)
public class TechnicalCalculationDetail implements Serializable {

    private static final long serialVersionUID = 1l;
    @EmbeddedId
    private TechnicalCalculationDetailPK technicalCalculationDetailPK;

    @Column(name = "RWSHID")
    @NotNull
    private String workshopIdentity;  //   CHAR(10) not null,

    @Column(name = "THD_PYMSEQ")
    private String contractNumber;  //      VARCHAR2(8),

    @Column(name = "THD_LSTYER")
    @NotNull
    private String year;             //    CHAR(4) not null,

    @Column(name = "THD_LSTMNT")
    @NotNull
    private String month;            //    CHAR(2) not null,

    @Column(name = "THD_LSTSEQ")
    @NotNull
    private String THD_LSTSEQ;         //    CHAR(2) not null,

    @Column(name = "DEBITTYPECODE")
    @NotNull
    private String debitTypeCode;     // VARCHAR2(3) not null,

    @Column(name = "SPCCONDTYPE")
    @NotNull
    private String tecSubjectType;     //   CHAR(1) not null,

    @Column(name = "SPCCONDSUBTYPE")
    @NotNull
    private String spcConSubType;       // CHAR(1) not null,

    @Column(name = "THD_ISDNUM")
    private Long employeesCount;      //  NUMBER(5),

    @Column(name = "THD_ISVWAG")
    private Long inclusiveWageAndBenefit;     //   NUMBER(12),

    @Column(name = "THD_EMPCON")
    private Long employerInsuranceCON;                //  NUMBER(12),///////////////////////////////

    @Column(name = "THD_GOVHELP")
    private Long govermentHelp;                       //  NUMBER(12),

    @Column(name = "THD_PSNT")
    private Long pourcenatge;                            //  NUMBER(12),

    @Column(name = "THD_ISDCON")
    private Long employeePremium;                   //  NUMBER(12),

    @Column(name = "THD_UMPCON")
    private Long unEmploymentInsuranceCON;          //   NUMBER(12),

    @Column(name = "THD_GOVHELPISD")
    private Long govermentHelpWorkers;                  //NUMBER(12)
}
