/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package ir.tamin.incomeBank.model.identityManager;

/**
 *
 * @author s_maknooni
 */
public class OrganizationDetail {

    private Integer id;

    private String oimOrganizationId;

    private GeoUnit geoUnit;

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getOimOrganizationId() {
        return oimOrganizationId;
    }

    public void setOimOrganizationId(String oimOrganizationId) {
        this.oimOrganizationId = oimOrganizationId;
    }

    public GeoUnit getGeoUnit() {
        return geoUnit;
    }

    public void setGeoUnit(GeoUnit geoUnit) {
        this.geoUnit = geoUnit;
    }
}
