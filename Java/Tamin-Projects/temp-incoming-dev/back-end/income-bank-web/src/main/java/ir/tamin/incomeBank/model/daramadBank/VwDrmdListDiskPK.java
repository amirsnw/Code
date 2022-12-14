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
public class VwDrmdListDiskPK implements Serializable {

    @NotNull
    @Column(name = "CARD_ROW")
    private Integer cardRow;
    @Column(name = "BRCH_CODE")
    private String brchCode;

    public VwDrmdListDiskPK() {
    }

    public VwDrmdListDiskPK(Integer cardRow, String brchCode) {
        this.cardRow = cardRow;
        this.brchCode = brchCode;
    }

    public Integer getCardRow() {
        return cardRow;
    }

    public void setCardRow(Integer cardRow) {
        this.cardRow = cardRow;
    }

    public String getBrchCode() {
        return brchCode;
    }

    public void setBrchCode(String brchCode) {
        this.brchCode = brchCode;
    }

}
