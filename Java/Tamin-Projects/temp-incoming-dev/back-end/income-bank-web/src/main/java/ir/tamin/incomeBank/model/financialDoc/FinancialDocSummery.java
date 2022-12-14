package ir.tamin.incomeBank.model.financialDoc;

import java.math.BigDecimal;

public class FinancialDocSummery {

    private BigDecimal debtAmount;
    private BigDecimal creditAmount;

    public FinancialDocSummery() {
    }

    public FinancialDocSummery(BigDecimal debtAmount, BigDecimal creditAmount) {
        this.debtAmount = debtAmount;
        this.creditAmount = creditAmount;
    }

    public BigDecimal getDebtAmount() {
        return debtAmount;
    }

    public void setDebtAmount(BigDecimal debtAmount) {
        this.debtAmount = debtAmount;
    }

    public BigDecimal getCreditAmount() {
        return creditAmount;
    }

    public void setCreditAmount(BigDecimal creditAmount) {
        this.creditAmount = creditAmount;
    }
}
