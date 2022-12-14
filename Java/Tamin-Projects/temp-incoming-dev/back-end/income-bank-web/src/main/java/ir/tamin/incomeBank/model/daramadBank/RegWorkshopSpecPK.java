/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package ir.tamin.incomeBank.model.daramadBank;

import java.io.Serializable;
import javax.persistence.Column;
import javax.persistence.Embeddable;

/**
 *
 * @author f_fotuhi
 */
@Embeddable
public class RegWorkshopSpecPK implements Serializable {

    @Column(name = "BRCH_CODE")
    private String brchCode;

    @Column(name = "RWSHID")
    private String workShopId;

    public RegWorkshopSpecPK() {
    }

    public RegWorkshopSpecPK(String brchCode, String workShopId) {
        this.brchCode = brchCode;
        this.workShopId = workShopId;
    }

    public String getBrchCode() {
        return brchCode;
    }

    public void setBrchCode(String brchCode) {
        this.brchCode = brchCode;
    }

    public String getWorkShopId() {
        return workShopId;
    }

    public void setWorkShopId(String workShopId) {
        this.workShopId = workShopId;
    }

}
