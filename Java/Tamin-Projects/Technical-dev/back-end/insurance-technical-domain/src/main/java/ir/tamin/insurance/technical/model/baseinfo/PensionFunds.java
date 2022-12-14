package ir.tamin.insurance.technical.model.baseinfo;

import ir.tamin.framework.domain.AbstractEntity;
import ir.tamin.framework.ws.rest.repository.annotation.RESTResource;
import ir.tamin.framework.ws.rest.repository.annotation.ResourceId;
import ir.tamin.framework.ws.rest.repository.annotation.ResourceIds;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;

/**
 * Created by e_fazli on 12/19/2018.
 */
@Entity
@Table(name = "TB_PENSIONFUNDS", schema = "baseinfo")
@ResourceIds({
        @ResourceId(fields = {"pensionFundsCode"})})
@RESTResource(lookupProxy = "ir.tamin.insurance.technical.business.transferInsuredtoOtherFunds.PensionFundsManager")
//@ResourceOperations({
//        @ResourceOperation(operation = "all", roles = "")
//})
public class PensionFunds extends AbstractEntity<String> {

    @Id
    @Size(max = 2)
    @NotNull
    @Column(name = "PENSIONFUNDSCODE")
    private String pensionFundsCode;

    @Column(name = "PENSIONFUNDSDESC")
    @Size(max = 100)
    private String pensionFundDesc;

    @Column(name = "STATUS")
    @Size(min = 1, max = 1)
    private String status;

    @Column(name = "STATUSSTDATE")
    @Size(max = 8)
    private String statusDate;

    public String getPensionFundsCode() {
        return pensionFundsCode;
    }

    public void setPensionFundsCode(String pensionFundsCode) {
        this.pensionFundsCode = pensionFundsCode;
    }

    public String getPensionFundDesc() {
        return pensionFundDesc;
    }

    public void setPensionFundDesc(String pensionFundDesc) {
        this.pensionFundDesc = pensionFundDesc;
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

    public void setStatusDate(String statusDate) {
        this.statusDate = statusDate;
    }

    @Override
    public String getIdentifierInstance() {
        return this.pensionFundsCode;
    }
}
