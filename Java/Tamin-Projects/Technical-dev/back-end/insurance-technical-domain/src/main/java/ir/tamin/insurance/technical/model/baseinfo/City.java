package ir.tamin.insurance.technical.model.baseinfo;

import ir.tamin.framework.domain.AbstractEntity;
import ir.tamin.framework.ws.rest.repository.annotation.RESTResource;
import ir.tamin.framework.ws.rest.repository.annotation.ResourceId;
import ir.tamin.framework.ws.rest.repository.annotation.ResourceIds;

import javax.persistence.*;
import java.io.Serializable;

/**
 *
 * @author Administrator
 */
@Entity
@Table(name = "TB_CITY", schema = "BASEINFO")
@RESTResource()
@ResourceIds({
        @ResourceId(fields = "cityCode")})
@NamedQueries({
    @NamedQuery(name = "City.findAll", query = "SELECT p FROM City p "),
    @NamedQuery(name = "City.findByCityCode", query = "select c.cityName from City c  where c.cityCode = :cityCode ")
})
public class City extends AbstractEntity<String> {

    @Id
    @Column(name = "CITYCODE")
    private String cityCode;
    @Column(name = "CITYNAME")
    private String cityName;
    //@ManyToOne
    //@JoinColumn(name = "PROVINCECODE")
    //private Province province;
    @Column(name = "PROVINCECODE")
    private String provinceCode;
    @Column(name = "CITYWAGESTAT")
    private String cityWageStat;
    @Column(name = "CITYCAPITAL")
    private String cityCapital;
    @Column(name = "FACILITY_CNT")
    private String facilityCnt;
    @Column(name = "CLIM_BAD_CNT")
    private String climBadCnt;
    @Column(name = "CITY_SECT")
    private String citySect;
    @Column(name = "CITY_GRADE")
    private String cityGrade;
    @Column(name = "CITY_GROUP")
    private String cityGroup;
    @Column(name = "CITY_DSTNC")
    private String cityDstnc;
    @Column(name = "STATUS")
    private String status;
    @Column(name = "STATUSSTDATE")
    private String statusStDate;
    @Column(name = "CITYCODEOLD")
    private String cityCodeOld;

    public String getCityCode() {
        return cityCode;
    }

    public void setCityCode(String cityCode) {
        this.cityCode = cityCode;
    }

    public String getCityName() {
        return cityName;
    }

    public void setCityName(String cityName) {
        this.cityName = cityName;
    }

    public String getProvinceCode() {
        return provinceCode;
    }

    public void setProvinceCode(String provinceCode) {
        this.provinceCode = provinceCode;
    }    

    public String getCityWageStat() {
        return cityWageStat;
    }

    public void setCityWageStat(String cityWageStat) {
        this.cityWageStat = cityWageStat;
    }

    public String getCityCapital() {
        return cityCapital;
    }

    public void setCityCapital(String cityCapital) {
        this.cityCapital = cityCapital;
    }

    public String getFacilityCnt() {
        return facilityCnt;
    }

    public void setFacilityCnt(String facilityCnt) {
        this.facilityCnt = facilityCnt;
    }

    public String getClimBadCnt() {
        return climBadCnt;
    }

    public void setClimBadCnt(String climBadCnt) {
        this.climBadCnt = climBadCnt;
    }

    public String getCitySect() {
        return citySect;
    }

    public void setCitySect(String citySect) {
        this.citySect = citySect;
    }

    public String getCityGrade() {
        return cityGrade;
    }

    public void setCityGrade(String cityGrade) {
        this.cityGrade = cityGrade;
    }

    public String getCityGroup() {
        return cityGroup;
    }

    public void setCityGroup(String cityGroup) {
        this.cityGroup = cityGroup;
    }

    public String getCityDstnc() {
        return cityDstnc;
    }

    public void setCityDstnc(String cityDstnc) {
        this.cityDstnc = cityDstnc;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public String getStatusStDate() {
        return statusStDate;
    }

    public void setStatusStDate(String statusStDate) {
        this.statusStDate = statusStDate;
    }

    public String getCityCodeOld() {
        return cityCodeOld;
    }

    public void setCityCodeOld(String cityCodeOld) {
        this.cityCodeOld = cityCodeOld;
    }

    @Override
    public String getIdentifierInstance() {
        return cityCode;
    }
}
