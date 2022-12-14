/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package ir.tamin.incomeBank.model.asnad;

import java.io.Serializable;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;
import javax.persistence.Transient;

/**
 *
 * @author s_maknooni
 */
@Entity
@Table(name = "DB_LINKS")
public class DBLinks implements Serializable {

    private static final long serialVersionUID = 1L;
    @Id
    @Column(name = "DB_LINKS_ID")
    private long dbLinksId;

    @Column(name = "DISPLAY_NAME")
    private String displayName;

    @Column(name = "LINK_NAME")
    private String linkName;

    @Column(name = "PROVINCECODE")
    private String provinceCode;

    @Column(name = "DB_LINKS_CODE")
    private String dbLinksCode;

    @Column(name = "LINK_STATUS")
    private Character linkStatus;

    @Column(name = "FAMILYDOCTOR")
    private Character familyDoctor;

    @Column(name = "RADIF")
    private long radif;

    @Column(name = "UNIT_CODE")
    private long unitCode;

    @Transient
    private String dblinkCodeName;

    public long getDbLinksId() {
        return dbLinksId;
    }

    public void setDbLinksId(long dbLinksId) {
        this.dbLinksId = dbLinksId;
    }

    public String getDisplayName() {
        return displayName;
    }

    public void setDisplayName(String displayName) {
        this.displayName = displayName;
    }

    public String getLinkName() {
        return linkName;
    }

    public void setLinkName(String linkName) {
        this.linkName = linkName;
    }

    public String getProvinceCode() {
        return provinceCode;
    }

    public void setProvinceCode(String provinceCode) {
        this.provinceCode = provinceCode;
    }

    public String getDbLinksCode() {
        return dbLinksCode;
    }

    public void setDbLinksCode(String dbLinksCode) {
        this.dbLinksCode = dbLinksCode;
    }

    public Character getLinkStatus() {
        return linkStatus;
    }

    public void setLinkStatus(Character linkStatus) {
        this.linkStatus = linkStatus;
    }

    public Character getFamilyDoctor() {
        return familyDoctor;
    }

    public void setFamilyDoctor(Character familyDoctor) {
        this.familyDoctor = familyDoctor;
    }

    public long getRadif() {
        return radif;
    }

    public void setRadif(long radif) {
        this.radif = radif;
    }

    public long getUnitCode() {
        return unitCode;
    }

    public void setUnitCode(long unitCode) {
        this.unitCode = unitCode;
    }

    public String getDblinkCodeName() {
        return unitCode + " - " + displayName.trim();
    }

}
