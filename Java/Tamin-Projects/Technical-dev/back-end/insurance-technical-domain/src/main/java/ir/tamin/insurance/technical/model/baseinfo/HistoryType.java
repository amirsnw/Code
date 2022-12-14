package ir.tamin.insurance.technical.model.baseinfo;

import ir.tamin.framework.domain.AbstractEntity;
import ir.tamin.framework.ws.rest.repository.annotation.ResourceId;
import ir.tamin.framework.ws.rest.repository.annotation.ResourceIds;
import ir.tamin.framework.ws.rest.repository.annotation.ResourceOperation;
import ir.tamin.framework.ws.rest.repository.annotation.ResourceOperations;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name = "TB_HISTORYTYPE", schema = "BASEINFO")
@ResourceIds({@ResourceId(fields = {"historyTypeCode"})})
@ResourceOperations({
        @ResourceOperation(operation = "all", roles = "")
})
public class HistoryType extends AbstractEntity<String> {
    @Id
    @Column(name = "HISTORYTYPECODE")
    private String historyTypeCode;

    @Column(name = "HISTORYTYPEDESC")
    private String historyTypeDesc;

    public String getHistoryTypeCode() {
        return historyTypeCode;
    }

    public void setHistoryTypeCode(String historyTypeCode) {
        this.historyTypeCode = historyTypeCode;
    }

    public String getHistoryTypeDesc() {
        return historyTypeDesc;
    }

    public void setHistoryTypeDesc(String historyTypeDesc) {
        this.historyTypeDesc = historyTypeDesc;
    }

    @Override
    public String getIdentifierInstance() {
        return this.historyTypeCode;
    }
}
