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
public class VwDftLetterPK implements Serializable {

    @NotNull
    @Column(name = "LETTER_SERIAL")
    private String letterSerial;
    @NotNull
    @Column(name = "LETTER_DATE")
    private String letterDate;
    @Column(name = "BRCH_CODE")
    private String brchCode;

    public VwDftLetterPK() {
    }

    public VwDftLetterPK(String letterSerial, String letterDate, String brchCode) {
        this.letterSerial = letterSerial;
        this.letterDate = letterDate;
        this.brchCode = brchCode;
    }

    public void setLetterSerial(String letterSerial) {
        this.letterSerial = letterSerial;
    }

    public void setLetterDate(String letterDate) {
        this.letterDate = letterDate;
    }

    public void setBrchCode(String brchCode) {
        this.brchCode = brchCode;
    }

    public String getLetterSerial() {
        return letterSerial;
    }

    public String getLetterDate() {
        return letterDate;
    }

    public String getBrchCode() {
        return brchCode;
    }

}
