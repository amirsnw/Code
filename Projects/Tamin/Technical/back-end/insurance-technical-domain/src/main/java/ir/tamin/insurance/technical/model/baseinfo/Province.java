package ir.tamin.insurance.technical.model.baseinfo;

import ir.tamin.framework.domain.AbstractEntity;
import ir.tamin.framework.ws.rest.repository.annotation.RESTResource;
import ir.tamin.framework.ws.rest.repository.annotation.ResourceId;
import ir.tamin.framework.ws.rest.repository.annotation.ResourceIds;

import javax.persistence.*;
import javax.validation.constraints.Size;

/**
 *
 * @author Administrator
 */
@Entity
@Table(name = "TB_PROVINCE", schema = "BASEINFO")
@RESTResource()
@ResourceIds({
        @ResourceId(fields = "provinceCode")})
public class Province extends AbstractEntity<String> {

    @Id
    @Column(name = "PROVINCECODE")
    private String provinceCode;

    @Column(name = "PROVINCENAME")
    private String provinceName;

    @Column(name = "STATUS")
    @Size(max = 1)
    private String status;

    public String getProvinceCode() {
        return provinceCode;
    }

    public void setProvinceCode(String provinceCode) {
        this.provinceCode = provinceCode;
    }

    public String getProvinceName() {
        return provinceName;
    }

    public void setProvinceName(String provinceName) {
        this.provinceName = provinceName;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    @Override
    public String getIdentifierInstance() {
        return provinceCode;
    }
}
