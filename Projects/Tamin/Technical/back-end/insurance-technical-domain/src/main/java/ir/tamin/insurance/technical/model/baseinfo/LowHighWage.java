/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package ir.tamin.insurance.technical.model.baseinfo;

import ir.tamin.framework.domain.AbstractEntity;
import ir.tamin.framework.ws.rest.repository.annotation.RESTResource;
import ir.tamin.framework.ws.rest.repository.annotation.ResourceId;
import ir.tamin.framework.ws.rest.repository.annotation.ResourceIds;
import ir.tamin.insurance.technical.model.primaryKeyClass.LowHighWagePK;

import javax.persistence.*;

/**
 *
 * @author s_naghavi
 */
@Entity
@Table(name = "TB_LOWHIGHWAGE", schema = "BASEINFO")
@IdClass(LowHighWagePK.class)
@NamedQueries({
    @NamedQuery(name = "LowHighWage.findLowHighWage", query = "SELECT i FROM LowHighWage i "),})
@RESTResource
@ResourceIds({@ResourceId(fields = {"year", "month"})})
public class LowHighWage extends AbstractEntity<LowHighWagePK>{



            @Id
            @Column(name = "HLFRYEAR")
            private String year;

            @Id
            @Column(name = "HLFRMONTH")
            private String month;

            @Column(name = "LOWDAYWAGE")
            private String lowWage;

            @Column(name = "HIGHDAYWAGE")
            private String highWage;

            @Column(name = "MAXMONTHWAGE")
            private String maxMonthWage;

            @Column(name = "YEARLYINCRATE")
            private String yearlyRate;

            @Column(name = "YEARLYINCCONST")
            private String yearlyConst;
            @Column(name = "YEARLYINCTLRC")
            private String yearlyCTLRC;

            @Column(name = "STATUS")
            private String status;

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

            public String getLowWage() {
                return lowWage;
            }

            public void setLowWage(String lowWage) {
                this.lowWage = lowWage;
            }

            public String getHighWage() {
                return highWage;
            }

            public void setHighWage(String highWage) {
                this.highWage = highWage;
            }

            public String getMaxMonthWage() {
                return maxMonthWage;
            }

            public void setMaxMonthWage(String maxMonthWage) {
                this.maxMonthWage = maxMonthWage;
            }

            public String getYearlyRate() {
                return yearlyRate;
            }

            public void setYearlyRate(String yearlyRate) {
                this.yearlyRate = yearlyRate;
            }

            public String getYearlyConst() {
                return yearlyConst;
            }

            public void setYearlyConst(String yearlyConst) {
                this.yearlyConst = yearlyConst;
            }

            public String getYearlyCTLRC() {
                return yearlyCTLRC;
            }

            public void setYearlyCTLRC(String yearlyCTLRC) {
                this.yearlyCTLRC = yearlyCTLRC;
            }

            public String getStatus() {
                return status;
            }

            public void setStatus(String status) {
                this.status = status;
            }

    @Override
    public LowHighWagePK getIdentifierInstance() {
        throw new UnsupportedOperationException("Not supported yet."); //To change body of generated methods, choose Tools | Templates.

       // return new LowHighWagePK(this.year, this.month);

    }


}
