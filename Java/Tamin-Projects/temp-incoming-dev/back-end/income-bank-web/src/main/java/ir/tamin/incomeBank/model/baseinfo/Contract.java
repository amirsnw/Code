/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package ir.tamin.incomeBank.model.baseinfo;

import java.io.Serializable;
import javax.annotation.Nullable;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;
import javax.validation.constraints.NotNull;
import lombok.Data;

/**
 *
 * @author e_shoghi
 */
@Entity
@Table(name = "TB_CONTRACTS")
@Data
public class Contract implements Serializable {

    @Id
    @Column(name = "CONTRACTID")
    private Long contractID;
    @Column(name = "RCNTSSIGNCODE")
    private String employerCode;
    @Column(name = "BRHCODE")
    private String brhCode;
    @Column(name = "CONTRACTCODE")
    private String contractNumber;
    @Column(name = "CONTRACTDATE")
    private String contractDate;
    @Column(name = "CONTRACTDESCRIPTION")
    private String contractDesc;
    @Column(name = "CONTRACTDURATION")
    private String contractDuration;
    @Column(name = "CONTRACTFEE")
    @NotNull
    private Long contractFee;
    @Column(name = "CONTRACTROW")
    private String contractRow;
    @Column(name = "LETTERCODE")
    private String letterNumber;
    @Column(name = "LETTERDATE")
    private String letterDate;
    @Column(name = "RWSHID")
    private String workshopID;
    @Column(name = "RWSHNAME")
    private String workshopName;
    @Column(name = "RWSHADRS")
    private String workshopAddress;
    @Column(name = "CITYCODE")
    private String cityCode;
    @Column(name = "MAINCONTRACTCODE")
    private String mainContractCode;
    @Column(name = "CREATEUID")
    private String createUID;
    @Column(name = "CREATEDT")
    private String createDate;
    @Column(name = "RCVFLAG")
    private String rcvFlag;
    @Column(name = "BRCH_CODE")
    @NotNull
    private String branchCode;
}
