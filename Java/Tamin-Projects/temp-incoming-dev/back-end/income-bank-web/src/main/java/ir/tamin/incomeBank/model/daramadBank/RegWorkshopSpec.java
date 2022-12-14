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
import javax.persistence.Transient;
import javax.validation.constraints.NotNull;

/**
 *
 * @author f_fotuhi
 */
@Entity
@Table(name = "REGWORKSHOPSPEC")
public class RegWorkshopSpec implements Serializable {

    private static final long serialVersionUID = 1L;
    @EmbeddedId
    private RegWorkshopSpecPK regWorkshopSpecPK;

    @Column(name = "RWSHNAME")
    private String workShopName;
    @NotNull
    @Column(name = "CREATEDT")
    private String createDet;

//    @Column(name = "BRCH_CODE")
//    private String brchCode;
//    @Column(name = "RWSHID")
//    private String workShopId;

    @Transient
    private String pk;
    @Transient
    private String codeName;
    @Transient
    private String code;

    public RegWorkshopSpec() {
    }

    public RegWorkshopSpec(RegWorkshopSpecPK regWorkshopSpecPK) {
        this.regWorkshopSpecPK = regWorkshopSpecPK;
    }

    public RegWorkshopSpecPK getRegWorkshopSpecPK() {
        return regWorkshopSpecPK;
    }

    public void setRegWorkshopSpecPK(RegWorkshopSpecPK regWorkshopSpecPK) {
        this.regWorkshopSpecPK = regWorkshopSpecPK;
    }

    public String getWorkShopName() {
        return workShopName;
    }

    public void setWorkShopName(String workShopName) {
        this.workShopName = workShopName;
    }

    public String getCreateDet() {
        return createDet;
    }

    public void setCreateDet(String createDet) {
        this.createDet = createDet;
    }

    public String getPk() {
        return regWorkshopSpecPK.getBrchCode() + regWorkshopSpecPK.getWorkShopId();
    }

    public void setPk(String pk) {
        this.pk = pk;
    }

    public String getCodeName() {
        return regWorkshopSpecPK.getWorkShopId() + " " + workShopName;
    }

    public void setCodeName(String codeName) {
        this.codeName = codeName;
    }

    public String getCode() {
        return regWorkshopSpecPK.getWorkShopId();
    }

    public void setCode(String code) {
        this.code = code;
    }

}
