
package ir.tamin.insurance.technical.model.baseinfo;

import java.io.Serializable;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.NamedQueries;
import javax.persistence.NamedQuery;
import javax.persistence.Table;


@Entity
@NamedQueries({
        // @NamedQuery(name = "BranchTree.findBrokerBybranchCode", query = "select c.cityName from City c  where c.cityCode = :cityCode ")
})
@Table(name = "tb_brchtree")
public class BranchTree implements Serializable {

    @Id
    @Column(name = "BRHCODE")
    private String branchCode;

    @Column(name = "PBRHCODE")
    private String pBranchCode;

    @Column(name = "POSTALCODE")
    private String postalCode;

    public String getBranchCode() {
        return branchCode;
    }

    public void setBranchCode(String branchCode) {
        this.branchCode = branchCode;
    }

    public String getpBranchCode() {
        return pBranchCode;
    }

    public void setpBranchCode(String pBranchCode) {
        this.pBranchCode = pBranchCode;
    }

    public String getPostalCode() {
        return postalCode;
    }

    public void setPostalCode(String postalCode) {
        this.postalCode = postalCode;
    }


}
