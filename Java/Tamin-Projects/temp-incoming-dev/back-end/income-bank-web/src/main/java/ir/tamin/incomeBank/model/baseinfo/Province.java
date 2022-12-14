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
@Table(name = "TB_PROVINCE", schema = "BASEINFO")
public class Province implements Serializable {

    @Id
    @Column(name = "PROVINCECODE")
    private String provinceCode;
    @Column(name = "PROVINCENAME")
    private String provinceName;
    @Column(name = "STATUS")
    private String status;
    @Column(name = "STATUSSTDATE")
    private String statusDate;
    @OneToMany(mappedBy = "province")
    private List<City> cities;

    @Transient
    private String provinceCodeName;

    public String getProvinceCode() {
        return provinceCode;
    }

    public void setProvinceCode(String provincecode) {
        this.provinceCode = provincecode;
    }

    public String getProvinceName() {
        return provinceName;
    }

    public void setProvinceName(String provincename) {
        this.provinceName = provincename;
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

    public String getProvinceCodeName() {
        return provinceCode + " " + provinceName;
    }

    public void setProvinceCodeName(String provinceCodeName) {
        this.provinceCodeName = provinceCodeName;
    }

    @JsonIgnore
    public List<City> getCities() {
        return cities;
    }

    public void setCities(List<City> cities) {
        this.cities = cities;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }

        Province province = (Province) o;

        return provinceCode.equals(province.provinceCode);
    }

    @Override
    public int hashCode() {
        return provinceCode.hashCode();
    }

//    @Override
   // @Ignore
    public String getIdentifierInstance() {
        return this.provinceCode;
}
}
