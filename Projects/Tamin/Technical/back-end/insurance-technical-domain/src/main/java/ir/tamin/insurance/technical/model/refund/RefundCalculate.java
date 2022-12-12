package ir.tamin.insurance.technical.model.refund;

import java.math.BigDecimal;

/**
 *
 * @author m_hoseini
 */
public class RefundCalculate  {
   
    private BigDecimal paymentTotal;
    private BigDecimal paymentIsu;
    private BigDecimal paymentDarman;
    private Integer workDaysIsu;
    private Integer workDaysDarman;

    public BigDecimal getPaymentTotal() {
        return paymentTotal;
    }

    public void setPaymentTotal(BigDecimal paymentTotal) {
        this.paymentTotal = paymentTotal;
    }

    public BigDecimal getPaymentIsu() {
        return paymentIsu;
    }

    public void setPaymentIsu(BigDecimal paymentIsu) {
        this.paymentIsu = paymentIsu;
    }

    public BigDecimal getPaymentDarman() {
        return paymentDarman;
    }

    public void setPaymentDarman(BigDecimal paymentDarman) {
        this.paymentDarman = paymentDarman;
    }

    public Integer getWorkDaysIsu() {
        return workDaysIsu;
    }

    public void setWorkDaysIsu(Integer workDaysIsu) {
        this.workDaysIsu = workDaysIsu;
    }

    public Integer getWorkDaysDarman() {
        return workDaysDarman;
    }

    public void setWorkDaysDarman(Integer workDaysDarman) {
        this.workDaysDarman = workDaysDarman;
    }
    
    
    
}
