/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package ir.tamin.incomeBank.model.daramadBank;

import javax.persistence.Column;
import javax.persistence.Embeddable;
import javax.validation.constraints.NotNull;

/**
 *
 * @author f_fotuhi
 */
@Embeddable
public class DrmdTelInfoPK {

    @NotNull
    @Column(name = "YY")
    private String year;
    @NotNull
    @Column(name = "MM")
    private String month;
    @NotNull
    @Column(name = "DD")
    private String day;
    @NotNull
    @Column(name = "BRCH_CODE")
    private String brhCode;

    public DrmdTelInfoPK() {
    }

    public DrmdTelInfoPK(String year, String month, String day, String brhCode) {
        this.year = year;
        this.month = month;
        this.day = day;
        this.brhCode = brhCode;
    }

    public String getYear() {
        return year;
    }

    public void setYear(String year) {
        this.year = year;
    }

    public String getMonth() {
        return month;
    }

    public void setMonth(String month) {
        this.month = month;
    }

    public String getDay() {
        return day;
    }

    public void setDay(String day) {
        this.day = day;
    }

    public String getBrhCode() {
        return brhCode;
    }

    public void setBrhCode(String brhCode) {
        this.brhCode = brhCode;
    }

}
