package ir.tamin.incomeBank.model.baseinfo;

import com.fasterxml.jackson.annotation.JsonIgnore;
import java.io.Serializable;

import javax.persistence.*;
import java.util.List;
//import jdk.nashorn.internal.ir.annotations.Ignore;

/**
 * Created by s_maknooni
 */
@Entity
@Table(name = "TB_CITY", schema = "BASEINFO")

public class City implements Serializable {

    @Id
    @Column(name = "CITYCODE")
    private String cityCode;
    @ManyToOne
    @JoinColumn(name = "PROVINCECODE", nullable = false)
    private Province province;
    @Column(name = "CITYNAME")
    private String cityName;
    @Column(name = "CITY_GRADE")
    private Integer cityGrade;
    @Column(name = "CITY_GROUP")
    private Integer cityGroup;
    @Column(name = "STATUS")
    private String status;
    @Column(name = "STATUSSTDATE")
    private String statusDate;
    @Column(name = "CITYCODEOLD")
    private String oldCityCode;
    @OneToMany(mappedBy = "city")
    private List<Branch> branches;

    public String getCityCode() {
        return cityCode;
    }

    public void setCityCode(String citycode) {
        this.cityCode = citycode;
    }

    public Province getProvince() {
        return province;
    }

    public void setProvince(Province province) {
        this.province = province;
    }

    public String getCityName() {
        return cityName;
    }

    public void setCityName(String cityname) {
        this.cityName = cityname;
    }

    public Integer getCityGrade() {
        return cityGrade;
    }

    public void setCityGrade(Integer cityGrade) {
        this.cityGrade = cityGrade;
    }

    public Integer getCityGroup() {
        return cityGroup;
    }

    public void setCityGroup(Integer cityGroup) {
        this.cityGroup = cityGroup;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public String getStatusDate() {
        return statusDate;
    }

    public void setStatusDate(String statusstdate) {
        this.statusDate = statusstdate;
    }

    public String getOldCityCode() {
        return oldCityCode;
    }

    public void setOldCityCode(String citycodeold) {
        this.oldCityCode = citycodeold;
    }

    @JsonIgnore
    public List<Branch> getBranches() {
        return branches;
    }

    public void setBranches(List<Branch> branches) {
        this.branches = branches;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }

        City city = (City) o;

        if (!cityCode.equals(city.cityCode)) {
            return false;
        }
        return province.equals(city.province);
    }

    @Override
    public int hashCode() {
        int result = cityCode.hashCode();
        result = 31 * result + province.hashCode();
        return result;
    }

//    @Override
   // @Ignore
    public String getIdentifierInstance() {
        return this.cityCode;
    }
}
