/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package ir.tamin.incomeBank.model;

import ir.tamin.incomeBank.model.daramadBank.BajListHeaderPK;
import ir.tamin.incomeBank.util.DateUtilsFramework;
import java.io.Serializable;
import java.util.Date;
import javax.persistence.Column;
import javax.persistence.EmbeddedId;
import javax.persistence.Entity;
import javax.persistence.Table;
import lombok.Data;

/**
 *
 * @author e_shoghi
 */
@Table(name = "VWPSHAMKVCH")
@Entity
@Data
public class PorsantajView implements Serializable {

    @EmbeddedId
    private BajListHeaderPK coWorkersPoursantajPK;
    @Column(name = "Vch_Date")
    private String vouchDate;
    @Column(name = "Rwshid")
    private String workshopId;
    @Column(name = "Lsh_Pymseq")
    private String peymanRow;
    @Column(name = "Lsh_Lstyer")
    private String year;
    @Column(name = "Lsh_Lstmnt")
    private String month;
    @Column(name = "Lsh_Lstseq")
    private String listNumber;
    @Column(name = "lsh_lstdat")
    private String listDate;
    @Column(name = "Lsh_yermntR")
    private String yearMonth;
    @Column(name = "Vch_Prc")
    private String price;
    @Column(name = "Vch_TypeDesc")
    private String docTypeDesc;
    @Column(name = "Vch_Type")
    private String docTypeCode;
    @Column(name = "Psnt1")
    private String psnt1;
    @Column(name = "Psnt7")
    private String psnt7;
    @Column(name = "Psnt8")
    private String psnt8;
    @Column(name = "Psnt78")
    private String psnt78;
    @Column(name = "Psnt08")
    private String psnt08;
    @Column(name = "Psnt5")
    private String psnt5;
    @Column(name = "Psnt56")
    private String psnt56;
    @Column(name = "Psnt58")
    private String psnt58;
    @Column(name = "Psnt76")
    private String psnt76;
    @Column(name = "Psnt4")
    private String psnt4;
    @Column(name = "Psnt46")
    private String psnt46;
    @Column(name = "VchStat")
    private String status;
    @Column(name = "rwshname")
    private String workshopName;
    @Column(name = "createuid")
    private String createUID;
//    @Column(name = "createuname")
//    private String createUName;
    @Column(name = "createdt")
    private String createDate;

    public Date getVouchDate() {
        return this.vouchDate != null && this.vouchDate.trim() != "" ? DateUtilsFramework.parse(vouchDate, "yyyyMM") : null;
    }
    
     public Date getListDate() {
        return this.listDate != null && this.listDate.trim() != "" ? DateUtilsFramework.parse(listDate, "yyyyMMdd") : null;
    }
}
