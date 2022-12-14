package ir.tamin.insurance.technical.model.baseinfo;

import ir.tamin.framework.core.util.DateUtils;
import ir.tamin.framework.domain.AbstractEntity;
import ir.tamin.framework.ws.rest.repository.annotation.RESTResource;
import ir.tamin.framework.ws.rest.repository.annotation.ResourceId;
import ir.tamin.framework.ws.rest.repository.annotation.ResourceIds;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;
import javax.validation.constraints.NotNull;
import java.util.Date;


@Entity
@Table(name="Tb_Marjasoldeir", schema = "BASEINFO")
@RESTResource()
@ResourceIds({@ResourceId(fields = {"marjaSoldierCode" })})
public class MarjaSoldier extends AbstractEntity<String> {

    @Id
    @Column(name = "MARJASOLDIERCODE")
    @NotNull
    private String marjaSoldierCode;


    @Column(name = "MARJASOLDIERDESC")
    private String marjaSoldierDescription;

    @Column(name = "STATUS")
    private String status;

    @Column(name = "STATUSSTDATE")
    private String statusDate;

    @Column(name = "MARJASOLDIERKIND")
    private String marjaSoldierKind;

    public String getMarjaSoldierCode() {
        return marjaSoldierCode;
    }

    public void setMarjaSoldierCode(String marjaSoldierCode) {
        this.marjaSoldierCode = marjaSoldierCode;
    }

    public String getMarjaSoldierDescription() {
        return marjaSoldierDescription;
    }

    public void setMarjaSoldierDescription(String marjaSoldierDescription) {
        this.marjaSoldierDescription = marjaSoldierDescription;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public Date getStatusDate() {
        if (statusDate != null) {
            return DateUtils.parse(statusDate, "yyyyMMdd");
        } else {
            return null;
        }
    }

    public void setStatusDate(Date statusDate) {
        if (statusDate != null) {
            this.statusDate = DateUtils.format(statusDate, "yyyyMMdd");
        } else {
            this.statusDate = null;
        }
    }


    public String getMarjaSoldierKind() {
        return marjaSoldierKind;
    }

    public void setMarjaSoldierKind(String marjaSoldierKind) {
        this.marjaSoldierKind = marjaSoldierKind;
    }

    @Override
    public String getIdentifierInstance() {
        return this.marjaSoldierCode;
    }
}