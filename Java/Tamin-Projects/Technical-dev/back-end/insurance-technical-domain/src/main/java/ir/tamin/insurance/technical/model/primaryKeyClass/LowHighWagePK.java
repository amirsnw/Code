/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package ir.tamin.insurance.technical.model.primaryKeyClass;

import java.io.Serializable;
import java.util.Objects;

/**
 * @author s_naghavi
 */
public class LowHighWagePK implements Serializable {

    private String year;
    private String month;

    public LowHighWagePK(String year, String month) {
        this.year = year;
        this.month = month;
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

    @Override
    public int hashCode() {
        int hash = 5;
        hash = 71 * hash + Objects.hashCode(this.year);
        hash = 71 * hash + Objects.hashCode(this.month);
        return hash;
    }

    @Override
    public boolean equals(Object obj) {
        if (this == obj) {
            return true;
        }
        if (obj == null) {
            return false;
        }
        if (getClass() != obj.getClass()) {
            return false;
        }
        final LowHighWagePK other = (LowHighWagePK) obj;
        return true;
    }

    @Override
    public String toString() {
        return "LowHighWagePK{" + "reqNo=" + year + ", month=" + month + '}';
    }

}
