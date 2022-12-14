/**
 *
 * @author h_riazat
 */
package ir.tamin.incomeBank.model.daramadBank;

import java.io.Serializable;
import javax.persistence.Column;
import javax.persistence.Embeddable;
import javax.validation.constraints.NotNull;

@Embeddable
public class DrmdSoratPK implements Serializable {

    @NotNull
    @Column(name = "SORAT_ROW")
    private Integer soratRow;
    @Column(name = "BRCH_CODE")
    private String brchCode;

    public DrmdSoratPK() {
    }

    public DrmdSoratPK(Integer soratRow, String brchCode) {
        this.soratRow = soratRow;
        this.brchCode = brchCode;
    }

    public Integer getSoratRow() {
        return soratRow;
    }

    public void setSoratRow(Integer soratRow) {
        this.soratRow = soratRow;
    }

    public String getBrchCode() {
        return brchCode;
    }

    public void setBrchCode(String brchCode) {
        this.brchCode = brchCode;
    }

}
