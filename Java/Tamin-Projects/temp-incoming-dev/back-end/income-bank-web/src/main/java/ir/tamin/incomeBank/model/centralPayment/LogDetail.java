/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package ir.tamin.incomeBank.model.centralPayment;

import java.io.Serializable;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

/**
 *
 * @author s_maknooni
 */
@Entity
@Table(name = "GL_LOG_DETAIL")
public class LogDetail implements Serializable {

    private static final long serialVersionUID = 1L;
    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @Column(name = "LOG_DETAIL_ID")
    private Long logDetailId;
    @ManyToOne
    @JoinColumn(name = "LOG_ID")
    private Log log;

    @Column(name = "SHENASEPAYMENT")
    private String shenasePayment;
    @Column(name = "ERROR_CODE")
    private String errorCode;
    @Column(name = "ERROR_MESSAGE")
    private String errorMessage;

    public Long getLogDetailId() {
        return logDetailId;
    }

    public void setLogDetailId(Long logDetailId) {
        this.logDetailId = logDetailId;
    }

    public String getShenasePayment() {
        return shenasePayment;
    }

    public void setShenasePayment(String shenasePayment) {
        this.shenasePayment = shenasePayment;
    }

    public String getErrorCode() {
        return errorCode;
    }

    public void setErrorCode(String errorCode) {
        this.errorCode = errorCode;
    }

    public String getErrorMessage() {
        return errorMessage;
    }

    public void setErrorMessage(String errorMessage) {
        this.errorMessage = errorMessage;
    }

    public Log getLog() {
        return log;
    }

    public void setLog(Log log) {
        this.log = log;
    }

}
