/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package ir.tamin.incomeBank.model.daramadBank;

import ir.tamin.incomeBank.util.DateUtilsFramework;
import java.io.Serializable;
import java.util.Date;
import javax.persistence.Column;
import javax.persistence.EmbeddedId;
import javax.persistence.Entity;
import javax.persistence.Table;
import javax.persistence.Transient;
import lombok.Data;

/**
 *
 * @author e_shoghi
 */
@Table(name = "VWPSHAMKVCH")
@Entity
@Data
public class PoursantajView implements Serializable {

    @EmbeddedId
    private BajListHeaderPK bajListHeaderPK;
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
    private String percent1;
    @Column(name = "Psnt7")
    private String percent7;
    @Column(name = "Psnt8")
    private String percent8;
    @Column(name = "Psnt78")
    private String percent78;
    @Column(name = "Psnt08")
    private String percent08;
    @Column(name = "Psnt5")
    private String percent5;
    @Column(name = "Psnt56")
    private String percent56;
    @Column(name = "Psnt58")
    private String percent58;
    @Column(name = "Psnt76")
    private String percent76;
    @Column(name = "Psnt4")
    private String percent4;
    @Column(name = "Psnt46")
    private String percent46;
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

    public String getPercent1() {
        Long p = !this.getPercent8().equals("0") ? Math.round(Long.parseLong(this.getPercent8()) / 8) : 0l;
        return p + "";
    }

    public String getPercent7() {
        long p1 = !this.getPercent8().equals("0") && !this.getPercent1().equals("0") ? Long.parseLong(this.getPercent8()) - Long.parseLong(this.getPercent1()) : 0l;
        long p2 = !this.getPercent78().equals("0") && !this.getPercent08().equals("0") ? Long.parseLong(this.getPercent78()) - Long.parseLong(this.getPercent08()) : 0l;
        long p3 = !this.getPercent76().equals("0") ? Math.round(Long.parseLong(this.getPercent76()) * 7 / 7.6) : 0l;
        return (p1 + p2 + p3) + "";
    }

    public String getPercent8() {
        return this.percent8 != null ? this.percent8 : "0";
    }

    public String getPercent78() {
        return this.percent78 != null ? this.percent78 : "0";
    }

    public String getPercent08() {
        long p1 = !this.getPercent78().equals("0") ? Math.round(Long.parseLong(this.getPercent78()) * 0.8 / 7.8) : 0;
        long p2 = !this.getPercent58().equals("0") ? Math.round(Long.parseLong(this.getPercent58()) * 0.8 / 5.8) : 0l;
        return (p1 + p2) + "";
    }

    public String getPercent5() {
        long p1 = !this.getPercent56().equals("0") ? Math.round(Long.parseLong(this.getPercent56()) * 5 / 5.6) : 0l;
        long p2 = !this.getPercent58().equals("0") && !this.getPercent08().equals("0") ? Long.parseLong(this.getPercent58()) - Long.parseLong(this.getPercent08()) : 0l;
        return (p1 + p2) + "";
    }

    public String getPercent56() {
        return this.percent56 != null ? this.percent56 : "0";
    }

    public String getPercent58() {
        return this.percent58 != null ? this.percent58 : "0";
    }

    public String getPercent76() {
        return this.percent76 != null ? this.percent76 : "0";
    }

    public String getPercent4() {
        long p = !this.getPercent46().equals("0") ? Math.round(Long.parseLong(this.getPercent46()) * 4 / 4.6) : 0l;
        return p + "";
    }

    public String getPercent46() {
        return this.percent46 != null ? this.percent46 : "0";
    }
    @Transient
    private String percent06;

    public String getPercent06() {
        long p = !this.getPercent56().equals("0") && !this.getPercent5().equals("0") ? Long.parseLong(this.getPercent56()) - Long.parseLong(this.getPercent5()) : 0l;
        long p2 = !this.getPercent76().equals("0") && !this.getPercent7().equals("0") ? Long.parseLong(this.getPercent76()) - Long.parseLong(this.getPercent7()) : 0l;
        long p3 = !this.getPercent46().equals("0") && !this.getPercent4().equals("0") ? Long.parseLong(this.getPercent46()) - Long.parseLong(this.getPercent4()) : 0l;
        return (p + p2 + p3) + "";
    }

    public String getYear() {
        return year;
    }

    public BajListHeaderPK getBajListHeaderPK() {
        return bajListHeaderPK;
    }

    public String getDocTypeCode() {
        return docTypeCode;
    }

    public String getMonth() {
        return month;
    }

    public String getPrice() {
        return price;
    }

    public String getWorkshopId() {
        return workshopId;
    }
}
